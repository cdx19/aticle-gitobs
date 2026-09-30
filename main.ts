import {
    App,
    FileSystemAdapter,
    Modal,
    ItemView,
    Notice,
    Plugin,
    PluginSettingTab,
    Setting,
    TFile,
    WorkspaceLeaf,
} from "obsidian";
import { simpleGit } from "simple-git";
import * as fs from "fs";
import * as fsp from "fs/promises";
import * as path from "path";
import * as os from "os";

import {
    RemoteArticle,
    confirmSyncConflict,
    syncArticle,
    syncArticleAsCopy,
} from "./src/sync";
import { downloadArticle } from "./src/download";
import { UploadArticleModal, uploadLocalArticle } from "./src/upload";
import { refreshArticlesView } from "./src/refresh";

export type { RemoteArticle };

const VIEW_TYPE_ARTICLES = "git-articles-view";

interface GitRepository {
    id: string;
    name: string;
    repoUrl: string;
    sshKey: string;
    targetFolder: string;
}

interface GitSyncSettings {
    repositories: GitRepository[];
    selectedRepoIds: string[];

    // 兼容旧版单仓库字段。Git 操作前会切换为当前仓库。
    repoUrl: string;
    sshKey: string;
    targetFolder: string;

    /** 自动刷新间隔（毫秒），0 表示关闭 */
    autoRefreshInterval: number;
}

const DEFAULT_SETTINGS: GitSyncSettings = {
    repositories: [],
    selectedRepoIds: [],
    repoUrl: "",
    sshKey: "",
    targetFolder: "Git文章",
    autoRefreshInterval: 0,
};

class GitArticlesView extends ItemView {
    plugin: MySimplePlugin;
    articles: RemoteArticle[] = [];
    localTitles = new Map<string, TFile>();
    contentEl: HTMLElement;
    private isLoading = false;

    // 新增：搜索关键词
    private searchQuery = "";
    // 新增：本地区是否折叠
    private localSectionCollapsed = false;
    // 新增：远程分组折叠状态
    private collapsedRemoteGroups = new Set<string>();
    private repositoryPickerOpen = false;
    private activeRepoId: string | null = null;

    constructor(leaf: WorkspaceLeaf, plugin: MySimplePlugin) {
        super(leaf);
        this.plugin = plugin;
        this.contentEl = this.containerEl.children[1] as HTMLElement;
    }

    getViewType(): string {
        return VIEW_TYPE_ARTICLES;
    }

    getDisplayText(): string {
        return "Git 文章";
    }

    getIcon(): string {
        return "book-open";
    }

    async onOpen() {
        await this.render();
    }

    async render() {
        await this.plugin.ensureSettingsLoaded();

        this.contentEl.empty();
        this.contentEl.addClass("git-articles-container");

        const header = this.contentEl.createDiv({ cls: "git-articles-header" });
        const titleBox = header.createDiv({ cls: "git-articles-header-title" });
        titleBox.createEl("h2", { text: "Git 文章" });
        titleBox.createEl("div", {
            text: this.plugin.settings.repositories.length
                ? "从已配置的 Git 仓库读取 Markdown 文章"
                : "请先在设置中配置 Git 仓库",
            cls: "git-articles-subtitle",
        });

        const actions = header.createDiv({ cls: "git-articles-header-actions" });
        this.renderRepositoryPicker(actions);

        // 新增：搜索框
        const searchWrap = actions.createDiv({ cls: "git-articles-search" });
        const searchInput = searchWrap.createEl("input", {
            type: "search",
            placeholder: "搜索标题或路径…",
            cls: "git-articles-search-input",
        });
        searchInput.value = this.searchQuery;
        searchInput.oninput = () => {
            this.searchQuery = searchInput.value.trim().toLowerCase();
            this.applyFilter();
        };

        const refreshButton = actions.createEl("button", {
            text: "刷新",
            cls: "git-articles-refresh",
        });
        refreshButton.onclick = async () => {
            refreshButton.disabled = true;
            refreshButton.textContent = "刷新中…";
            try {
                await this.loadArticles();
            } finally {
                refreshButton.disabled = false;
                refreshButton.textContent = "刷新";
            }
        };

        if (this.plugin.settings.repositories.length === 0) {
            const empty = this.contentEl.createDiv({ cls: "git-articles-empty" });
            empty.createDiv({ cls: "git-articles-empty-icon", text: "⚙️" });
            empty.createEl("h3", { text: "还没有配置 Git 仓库" });
            empty.createEl("p", {
                text: "打开 Obsidian 设置 → Git 文章同步，添加一个或多个笔记仓库。",
            });
            return;
        }

        if (this.plugin.getSelectedRepositories().length === 0) {
            const empty = this.contentEl.createDiv({ cls: "git-articles-empty" });
            empty.createDiv({ cls: "git-articles-empty-icon", text: "📚" });
            empty.createEl("h3", { text: "请选择至少一个笔记仓库" });
            empty.createEl("p", { text: "点击上方“笔记仓库”选择要显示的仓库。" });
            return;
        }

        const loading = this.contentEl.createDiv({ cls: "git-articles-loading" });
        loading.createDiv({ cls: "git-articles-spinner" });
        loading.createSpan({ text: "正在读取 Git 仓库…" });

        try {
            await this.loadArticles();
        } catch (error) {
            loading.remove();
            const errorEl = this.contentEl.createDiv({ cls: "git-articles-error" });
            errorEl.createEl("strong", { text: "读取仓库失败" });
            errorEl.createEl("div", {
                text: error instanceof Error ? error.message : String(error),
            });
        }
    }

    /** 对外公开的刷新入口，供 refresh.ts 调用 */
    async refresh() {
        if (
            this.plugin.settings.repositories.length === 0 ||
            this.plugin.getSelectedRepositories().length === 0
        ) {
            return;
        }

        if (this.isLoading) return;
        this.isLoading = true;

        try {
            await this.loadArticles();
        } catch (error) {
            new Notice(
                `刷新失败：${error instanceof Error ? error.message : String(error)
                }`
            );
        } finally {
            this.isLoading = false;
        }
    }

    async loadArticles() {
        const selectedRepos = this.plugin.getSelectedRepositories();
        const allArticles: Array<RemoteArticle & { repoId: string; repoName: string }> = [];

        for (const repo of selectedRepos) {
            this.plugin.activateRepository(repo);
            const tempDir = await this.plugin.cloneToTemp();
            try {
                const repoArticles = await this.plugin.getRemoteArticles(tempDir);
                allArticles.push(
                    ...repoArticles.map((article) => ({
                        ...article,
                        repoId: repo.id,
                        repoName: repo.name || repo.repoUrl,
                    }))
                );
            } finally {
                await this.plugin.removeTempDir(tempDir);
            }
        }

        this.articles = allArticles.sort((a, b) => {
            const repoCompare = a.repoName.localeCompare(b.repoName, "zh-CN");
            return repoCompare || a.title.localeCompare(b.title, "zh-CN");
        });

        this.localTitles.clear();
        const localFiles = this.app.vault.getMarkdownFiles();

        for (let i = 0; i < localFiles.length; i++) {
            const file = localFiles[i];
            if (!this.localTitles.has(file.name)) {
                this.localTitles.set(file.name, file);
            }
            if (i % 200 === 0) {
                await new Promise((r) => setTimeout(r, 0));
            }
        }

        const oldList = this.contentEl.querySelector(".git-articles-list");
        oldList?.remove();

        const loading = this.contentEl.querySelector(".git-articles-loading");
        loading?.remove();

        const list = this.contentEl.createDiv({ cls: "git-articles-list" });

        if (this.articles.length === 0) {
            const empty = list.createDiv({ cls: "git-articles-empty" });
            empty.createEl("h3", { text: "仓库中没有 Markdown 文章" });
            empty.createEl("p", { text: "当前只显示 .md 文件。" });
            return;
        }

        const summary = list.createDiv({ cls: "git-articles-summary" });
        summary.setText(
            `已选择 ${selectedRepos.length} 个仓库，共 ${this.articles.length} 篇文章`
        );

        const remoteGroups = list.createDiv({ cls: "git-articles-groups" });
        const groupMap = new Map<string, Array<RemoteArticle & { repoId: string; repoName: string }>>();

        for (const article of this.articles as Array<RemoteArticle & { repoId: string; repoName: string }>) {
            const dir = article.relativePath.includes("/")
                ? article.relativePath.slice(0, article.relativePath.lastIndexOf("/"))
                : "根目录";
            const groupKey = `${article.repoId}::${dir}`;
            if (!groupMap.has(groupKey)) {
                groupMap.set(groupKey, []);
            }
            groupMap.get(groupKey)!.push(article);
        }

        const sortedGroups = Array.from(groupMap.entries()).sort((a, b) =>
            a[1][0].repoName.localeCompare(b[1][0].repoName, "zh-CN") ||
            a[0].localeCompare(b[0], "zh-CN")
        );

        for (const [groupKey, items] of sortedGroups) {
            const dir = groupKey.split("::").slice(1).join("::");
            this.renderRemoteGroup(
                remoteGroups,
                `${items[0].repoName} / ${dir}`,
                items
            );
        }

        await this.renderLocalArticles();
        this.applyFilter();
    }

    applyFilter() {
        const query = this.searchQuery;

        // 远程分组
        const groups = this.contentEl.querySelectorAll(".git-remote-group");
        groups.forEach((groupEl) => {
            const el = groupEl as HTMLElement;
            const cards = el.querySelectorAll(".git-article-card");
            let visibleCount = 0;

            cards.forEach((cardEl) => {
                const card = cardEl as HTMLElement;
                const text = card.dataset.search ?? "";
                const match = !query || text.includes(query);
                card.style.display = match ? "" : "none";
                if (match) visibleCount++;
            });

            // 分组标题也要能匹配
            const groupName = el
                .querySelector(".git-remote-group-name")
                ?.textContent?.toLowerCase() ?? "";
            const groupMatch = !query || groupName.includes(query);

            el.style.display = visibleCount > 0 || groupMatch ? "" : "none";

            // 如果搜索命中分组名，展开该分组
            const body = el.querySelector(".git-remote-group-body") as HTMLElement;
            const toggle = el.querySelector(".git-remote-group-toggle");
            if (body && toggle) {
                if (query && groupMatch && visibleCount > 0) {
                    body.style.display = "";
                    toggle.textContent = "▼";
                } else {
                    const dir = el
                        .querySelector(".git-remote-group-name")
                        ?.textContent ?? "";
                    const collapsed = this.collapsedRemoteGroups.has(dir);
                    body.style.display = collapsed ? "none" : "";
                    toggle.textContent = collapsed ? "▶" : "▼";
                }
            }
        });

        // 本地文章
        const localSection = this.contentEl.querySelector(
            ".git-local-articles-section"
        ) as HTMLElement | null;

        if (localSection) {
            const localCards = localSection.querySelectorAll(".git-local-article-card");
            let visibleLocal = 0;

            localCards.forEach((cardEl) => {
                const card = cardEl as HTMLElement;
                const text = card.dataset.search ?? "";
                const match = !query || text.includes(query);
                card.style.display = match ? "" : "none";
                if (match) visibleLocal++;
            });

            // 本地列表容器
            const localList = localSection.querySelector(
                ".git-local-articles-list"
            ) as HTMLElement | null;

            if (localList) {
                if (query) {
                    localList.style.display = visibleLocal > 0 ? "" : "none";
                } else {
                    localList.style.display = this.localSectionCollapsed ? "none" : "";
                }
            }

            // 本地整个区域：搜索时如果没结果，可以隐藏
            if (query && visibleLocal === 0) {
                localSection.style.display = "none";
            } else {
                localSection.style.display = "";
            }
        }

        // 搜索无结果提示
        let noResult = this.contentEl.querySelector(".git-articles-no-result");
        const remoteVisible = Array.from(
            this.contentEl.querySelectorAll(".git-remote-group")
        ).some((el) => (el as HTMLElement).style.display !== "none");

        const localVisible =
            localSection &&
            localSection.style.display !== "none" &&
            Array.from(
                localSection.querySelectorAll(".git-local-article-card")
            ).some((el) => (el as HTMLElement).style.display !== "none");

        if (query && !remoteVisible && !localVisible) {
            if (!noResult) {
                noResult = this.contentEl.createDiv({
                    cls: "git-articles-no-result",
                    text: `没有找到包含“${this.searchQuery}”的文章`,
                });
            }
        } else {
            noResult?.remove();
        }
    }

    renderRepositoryPicker(container: HTMLElement) {
        const wrap = container.createDiv({ cls: "git-repo-picker" });
        const selectedCount = this.plugin.getSelectedRepositories().length;
        const totalCount = this.plugin.settings.repositories.length;

        const button = wrap.createEl("button", {
            text: `笔记仓库（${selectedCount}/${totalCount}）`,
            cls: "git-repo-picker-button",
        });

        const panel = wrap.createDiv({ cls: "git-repo-picker-panel" });
        panel.style.display = this.repositoryPickerOpen ? "" : "none";

        const toolbar = panel.createDiv({ cls: "git-repo-picker-toolbar" });
        const selectAll = toolbar.createEl("button", { text: "全选" });
        const selectNone = toolbar.createEl("button", { text: "清空" });

        const list = panel.createDiv({ cls: "git-repo-picker-list" });
        for (const repo of this.plugin.settings.repositories) {
            const label = list.createEl("label", { cls: "git-repo-picker-item" });
            const checkbox = label.createEl("input", { type: "checkbox" });
            checkbox.checked = this.plugin.settings.selectedRepoIds.includes(repo.id);
            label.createSpan({ text: repo.name || repo.repoUrl || "未命名仓库" });

            checkbox.onchange = async () => {
                const ids = new Set(this.plugin.settings.selectedRepoIds);
                if (checkbox.checked) ids.add(repo.id);
                else ids.delete(repo.id);

                this.plugin.settings.selectedRepoIds = Array.from(ids);
                await this.plugin.saveSettings();
                this.repositoryPickerOpen = true;
                await this.render();
            };
        }

        selectAll.onclick = async () => {
            this.plugin.settings.selectedRepoIds =
                this.plugin.settings.repositories.map((repo) => repo.id);
            await this.plugin.saveSettings();
            this.repositoryPickerOpen = true;
            await this.render();
        };

        selectNone.onclick = async () => {
            this.plugin.settings.selectedRepoIds = [];
            await this.plugin.saveSettings();
            this.repositoryPickerOpen = true;
            await this.render();
        };

        button.onclick = () => {
            this.repositoryPickerOpen = !this.repositoryPickerOpen;
            panel.style.display = this.repositoryPickerOpen ? "" : "none";
        };
    }

    renderRemoteGroup(container: HTMLElement, dir: string, articles: Array<RemoteArticle & { repoId: string; repoName: string }>) {
        const group = container.createDiv({ cls: "git-remote-group" });

        const collapsed = this.collapsedRemoteGroups.has(dir);

        const header = group.createDiv({ cls: "git-remote-group-header" });
        const left = header.createDiv({ cls: "git-remote-group-title" });

        const toggle = left.createEl("span", {
            text: collapsed ? "▶" : "▼",
            cls: "git-remote-group-toggle",
        });

        left.createEl("span", {
            text: dir,
            cls: "git-remote-group-name",
        });

        left.createEl("span", {
            text: `(${articles.length})`,
            cls: "git-remote-group-count",
        });

        header.onclick = () => {
            if (this.collapsedRemoteGroups.has(dir)) {
                this.collapsedRemoteGroups.delete(dir);
            } else {
                this.collapsedRemoteGroups.add(dir);
            }
            this.applyFilter();
        };

        const body = group.createDiv({ cls: "git-remote-group-body" });
        if (collapsed) {
            body.style.display = "none";
        }

        for (const article of articles) {
            this.renderArticleCard(body, article);
        }
    }

    renderArticleCard(
        list: HTMLElement,
        article: RemoteArticle & { repoId: string; repoName: string }
    ) {
        const remoteFileName = article.relativePath.split("/").pop() ?? "";
        const localFile = this.localTitles.get(remoteFileName);
        const card = list.createDiv({ cls: "git-article-card" });

        // 搜索用
        card.dataset.search =
            `${article.repoName} ${article.title} ${article.relativePath}`.toLowerCase();

        const info = card.createDiv({ cls: "git-article-info" });

        const titleRow = info.createDiv({ cls: "git-article-title-row" });
        titleRow.createEl("div", {
            text: article.title,
            cls: "git-article-title",
        });

        // 新增：状态标签
        const badge = titleRow.createEl("span", {
            text: localFile ? "已同步" : "未下载",
            cls: localFile
                ? "git-article-badge is-synced"
                : "git-article-badge is-remote",
        });

        info.createEl("div", {
            text: `${article.repoName} · ${article.relativePath}`,
            cls: "git-article-path",
        });

        const action = card.createEl("button", {
            cls: localFile ? "git-article-action is-synced" : "git-article-action",
            text: localFile ? "同步" : "下载",
        });

        action.setAttribute(
            "aria-label",
            localFile
                ? `同步《${article.title}》`
                : `下载《${article.title}》`
        );

        action.onclick = async () => {
            action.disabled = true;
            action.textContent = localFile ? "同步中…" : "下载中…";

            try {
                this.plugin.activateRepositoryById(article.repoId);

                if (localFile) {
                    const result = await confirmSyncConflict(
                        this.plugin,
                        article,
                        localFile
                    );

                    if (result === "cancel") {
                        return;
                    }

                    if (result === "overwrite") {
                        await syncArticle(this.plugin, article, localFile);
                        new Notice(`《${article.title}》已覆盖并同步`);
                        await refreshArticlesView(this.plugin, { silent: true });
                    } else if (result === "copy") {
                        const copyFile = await syncArticleAsCopy(
                            this.plugin,
                            article,
                            localFile
                        );
                        new Notice(`已保存为副件：${copyFile.path}`);
                        await refreshArticlesView(this.plugin, { silent: true });
                    }
                } else {
                    const newFile = await downloadArticle(this.plugin, article);
                    this.localTitles.set(newFile.name, newFile);
                    action.textContent = "同步";
                    action.classList.add("is-synced");
                    new Notice(`《${article.title}》已下载`);
                    await refreshArticlesView(this.plugin, { silent: true });
                }
            } catch (error) {
                new Notice(
                    `${localFile ? "同步" : "下载"}失败：${error instanceof Error ? error.message : String(error)
                    }`
                );
            } finally {
                action.disabled = false;
                if (localFile) action.textContent = "同步";
            }
        };
    }

    async renderLocalArticles() {
        this.contentEl.querySelector(".git-local-articles-section")?.remove();
        this.contentEl.querySelector(".git-articles-loading")?.remove();
        this.contentEl.querySelector(".git-articles-empty")?.remove();
        this.contentEl.querySelector(".git-articles-error")?.remove();

        const section = this.contentEl.createDiv({ cls: "git-local-articles-section" });

        const header = section.createDiv({ cls: "git-local-articles-header" });

        const titleBox = header.createDiv({ cls: "git-local-articles-title" });
        titleBox.createEl("h3", { text: "本地文章上传" });
        titleBox.createEl("div", {
            text: "读取当前 Vault 中的 Markdown 文件，选择 Git 仓库文件夹后上传。",
            cls: "git-articles-subtitle",
        });

        // 新增：折叠按钮
        const collapseBtn = header.createEl("button", {
            text: this.localSectionCollapsed ? "展开" : "收起",
            cls: "git-local-collapse-btn",
        });
        collapseBtn.onclick = () => {
            this.localSectionCollapsed = !this.localSectionCollapsed;
            this.applyFilter();
        };

        const localFiles = this.app.vault
            .getMarkdownFiles()
            .sort((a, b) => a.path.localeCompare(b.path, "zh-CN"));

        if (localFiles.length === 0) {
            section.createDiv({
                text: "当前 Vault 中没有 Markdown 文章。",
                cls: "git-local-empty",
            });
            return;
        }

        const list = section.createDiv({ cls: "git-local-articles-list" });

        if (this.localSectionCollapsed) {
            list.style.display = "none";
        }

        for (const file of localFiles) {
            const card = list.createDiv({ cls: "git-local-article-card" });
            card.dataset.search = `${file.basename} ${file.path}`.toLowerCase();

            const info = card.createDiv({ cls: "git-article-info" });
            info.createEl("div", {
                text: file.basename,
                cls: "git-article-title",
            });
            info.createEl("div", {
                text: file.path,
                cls: "git-article-path",
            });

            const action = card.createEl("button", {
                text: "上传",
                cls: "git-article-action",
            });

            action.onclick = async () => {
                const modal = new UploadArticleModal(this.app, this.plugin, file);
                modal.open();
            };
        }
    }

    async onClose() {
        this.contentEl.empty();
    }
}

class DeleteRepositoryConfirmModal extends Modal {
    private repoName: string;
    private onConfirm: () => Promise<void>;

    constructor(app: App, repoName: string, onConfirm: () => Promise<void>) {
        super(app);
        this.repoName = repoName;
        this.onConfirm = onConfirm;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.empty();
        contentEl.addClass("git-delete-repo-modal");

        contentEl.createEl("h2", { text: "确认删除笔记仓库" });

        const description = contentEl.createDiv({ cls: "git-delete-repo-description" });
        description.createEl("div", { text: "确定要删除这个笔记仓库配置吗？" });
        description.createEl("strong", { text: this.repoName || "未命名仓库" });
        description.createEl("div", {
            text: "此操作只会移除插件中的仓库配置，不会删除远程 Git 仓库，也不会删除本地文章。",
            cls: "git-delete-repo-warning",
        });

        const footer = contentEl.createDiv({ cls: "git-delete-repo-footer" });
        const cancelButton = footer.createEl("button", { text: "取消", cls: "git-delete-repo-cancel" });
        const confirmButton = footer.createEl("button", { text: "确认删除", cls: "git-delete-repo-confirm" });

        cancelButton.onclick = () => this.close();
        confirmButton.onclick = async () => {
            confirmButton.disabled = true;
            cancelButton.disabled = true;
            confirmButton.textContent = "删除中…";
            try {
                await this.onConfirm();
                this.close();
            } catch (error) {
                new Notice(`删除仓库失败：${error instanceof Error ? error.message : String(error)}`);
                confirmButton.disabled = false;
                cancelButton.disabled = false;
                confirmButton.textContent = "确认删除";
            }
        };
    }

    onClose() {
        this.contentEl.empty();
    }
}

class GitSyncSettingTab extends PluginSettingTab {
    plugin: MySimplePlugin;

    constructor(app: App, plugin: MySimplePlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display() {
        const { containerEl } = this;
        containerEl.empty();

        containerEl.createEl("h2", { text: "Git 文章同步" });
        containerEl.createEl("p", {
            text: "在这里管理多个 Git 笔记仓库。文章页面可以同时选择多个仓库。",
            cls: "setting-item-description",
        });

        const repositories = this.plugin.settings.repositories;

        if (repositories.length === 0) {
            containerEl.createDiv({
                text: "暂无笔记仓库，请点击下面的“添加笔记仓库”。",
                cls: "git-repo-settings-empty",
            });
        }

        repositories.forEach((repo, index) => {
            const card = containerEl.createDiv({ cls: "git-repo-settings-card" });

            const heading = card.createDiv({ cls: "git-repo-settings-heading" });
            heading.createEl("strong", { text: repo.name || `笔记仓库 ${index + 1}` });

            new Setting(card)
                .setName("仓库名称")
                .setDesc("输入完成后，离开编辑框时才会保存名称。")
                .addText((text) => {
                    text
                        .setValue(repo.name)
                        .setPlaceholder(`笔记仓库 ${index + 1}`)
                        .onChange((value) => {
                            // 只更新内存中的值，不在输入过程中保存或重建设置页面。
                            repo.name = value;
                        });

                    text.inputEl.addEventListener("blur", async () => {
                        const newName =
                            text.inputEl.value.trim() || `笔记仓库 ${index + 1}`;

                        repo.name = newName;
                        text.inputEl.value = newName;

                        await this.plugin.saveSettings();

                        // 只更新标题，不重新 display()，避免设置页面闪烁或输入状态丢失。
                        const title = heading.querySelector("strong");
                        if (title) {
                            title.textContent = newName;
                        }
                    });
                });

            new Setting(card)
                .setName("Git 仓库地址")
                .setDesc("支持 HTTPS 和 SSH，例如 git@github.com:user/repo.git")
                .addText((text) =>
                    text
                        .setPlaceholder("git@github.com:user/repo.git")
                        .setValue(repo.repoUrl)
                        .onChange(async (value) => {
                            repo.repoUrl = value.trim();
                            await this.plugin.saveSettings();
                        })
                );

            new Setting(card)
                .setName("SSH 私钥")
                .setDesc("可选。留空时使用系统默认 SSH 配置。")
                .addTextArea((text) => {
                    text
                        .setPlaceholder("粘贴 SSH 私钥")
                        .setValue(repo.sshKey)
                        .onChange(async (value) => {
                            repo.sshKey = value;
                            await this.plugin.saveSettings();
                        });
                    text.inputEl.rows = 6;
                    text.inputEl.addClass("git-sync-settings-key");
                });

            new Setting(card)
                .setName("文章保存目录")
                .setDesc("下载新文章时使用的 Vault 相对路径，例如 Git文章")
                .addText((text) =>
                    text
                        .setPlaceholder("Git文章")
                        .setValue(repo.targetFolder)
                        .onChange(async (value) => {
                            repo.targetFolder =
                                value.trim().replace(/^\/+|\/+$/g, "") || "Git文章";
                            await this.plugin.saveSettings();
                        })
                );

            new Setting(card)
                .addButton((button) =>
                    button
                        .setButtonText("删除仓库")
                        .setWarning()
                        .onClick(() => {
                            const modal = new DeleteRepositoryConfirmModal(
                                this.app,
                                repo.name || `笔记仓库 ${index + 1}`,
                                async () => {
                                    this.plugin.settings.repositories =
                                        this.plugin.settings.repositories.filter((item) => item.id !== repo.id);
                                    this.plugin.settings.selectedRepoIds =
                                        this.plugin.settings.selectedRepoIds.filter((id) => id !== repo.id);
                                    await this.plugin.saveSettings();
                                    this.display();
                                }
                            );
                            modal.open();
                        })
                );
        });

        new Setting(containerEl)
            .setName("添加笔记仓库")
            .setDesc("可以添加多个仓库，文章页面再按需选择一个或多个仓库。")
            .addButton((button) =>
                button.setButtonText("添加").setCta().onClick(async () => {
                    const repo: GitRepository = {
                        id: `repo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                        name: `笔记仓库 ${this.plugin.settings.repositories.length + 1}`,
                        repoUrl: "",
                        sshKey: "",
                        targetFolder: "Git文章",
                    };
                    this.plugin.settings.repositories.push(repo);
                    this.plugin.settings.selectedRepoIds.push(repo.id);
                    await this.plugin.saveSettings();
                    this.display();
                })
            );

        new Setting(containerEl)
            .setName("打开文章列表")
            .setDesc("打开一个新的 Obsidian 标签页，选择并查看一个或多个仓库中的文章。")
            .addButton((button) =>
                button.setButtonText("打开").onClick(async () => {
                    await this.plugin.activateArticlesView();
                })
            );

        new Setting(containerEl)
            .setName("自动刷新间隔（毫秒）")
            .setDesc(
                "按设定间隔自动拉取已选择 Git 仓库的信息并刷新列表。设为 0 表示关闭自动刷新。建议不小于 5000 毫秒。"
            )
            .addText((text) => {
                text
                    .setPlaceholder("0")
                    .setValue(String(this.plugin.settings.autoRefreshInterval ?? 0))
                    .onChange(async (value) => {
                        const num = Number(value.trim());
                        this.plugin.settings.autoRefreshInterval =
                            Number.isFinite(num) && num > 0 ? Math.floor(num) : 0;
                        await this.plugin.saveSettings();
                        this.plugin.restartAutoRefresh();
                    });
                text.inputEl.type = "number";
                text.inputEl.min = "0";
                text.inputEl.step = "1000";
            });
    }
}

export default class MySimplePlugin extends Plugin {
    settings: GitSyncSettings;
    private settingsReady: Promise<void> | null = null;
    private autoRefreshTimer: number | null = null;

    /** 供 refresh.ts 使用，避免循环依赖 */
    readonly viewTypeArticles = VIEW_TYPE_ARTICLES;

    async onload() {
        // 先注册视图 / 命令 / 菜单，保证插件 UI 立即可用
        this.registerView(
            VIEW_TYPE_ARTICLES,
            (leaf) => new GitArticlesView(leaf, this)
        );

        this.addSettingTab(new GitSyncSettingTab(this.app, this));

        this.addCommand({
            id: "open-git-articles",
            name: "打开 Git 文章",
            callback: () => this.activateArticlesView(),
        });

        this.addRibbonIcon("book-open", "打开 Git 文章", () =>
            this.activateArticlesView()
        );

        // 异步加载设置，不阻塞插件加载
        this.ensureSettingsLoaded()
            .then(() => {
                this.restartAutoRefresh();
                console.log("Git 文章同步插件已加载");
            })
            .catch((err) => console.error("加载 Git 文章同步设置失败：", err));
    }

    async ensureSettingsLoaded(): Promise<void> {
        if (this.settings) return;
        if (!this.settingsReady) {
            this.settingsReady = this.loadSettings();
        }
        await this.settingsReady;
    }

    async loadSettings() {
        const data = await this.loadData();
        this.settings = Object.assign({}, DEFAULT_SETTINGS, data);

        if (!Array.isArray(this.settings.repositories)) {
            this.settings.repositories = [];
        }

        // 自动把旧版本的单仓库配置迁移成第一个笔记仓库。
        if (
            this.settings.repositories.length === 0 &&
            typeof data?.repoUrl === "string" &&
            data.repoUrl.trim()
        ) {
            const repo: GitRepository = {
                id: `repo-${Date.now()}`,
                name: "默认笔记仓库",
                repoUrl: data.repoUrl.trim(),
                sshKey: typeof data.sshKey === "string" ? data.sshKey : "",
                targetFolder:
                    typeof data.targetFolder === "string" && data.targetFolder.trim()
                        ? data.targetFolder
                        : "Git文章",
            };
            this.settings.repositories = [repo];
            this.settings.selectedRepoIds = [repo.id];
        }

        const validIds = new Set(this.settings.repositories.map((repo) => repo.id));
        this.settings.selectedRepoIds = Array.isArray(this.settings.selectedRepoIds)
            ? this.settings.selectedRepoIds.filter((id) => validIds.has(id))
            : [];

        if (this.settings.repositories.length > 0 && this.settings.selectedRepoIds.length === 0) {
            this.settings.selectedRepoIds = this.settings.repositories.map((repo) => repo.id);
        }

        if (this.settings.repositories.length > 0) {
            this.activateRepository(this.settings.repositories[0]);
        }
    }

    getSelectedRepositories(): GitRepository[] {
        const selected = new Set(this.settings.selectedRepoIds ?? []);
        return this.settings.repositories.filter((repo) => selected.has(repo.id));
    }

    activateRepository(repo: GitRepository) {
        this.activeRepoId = repo.id;
        // 兼容现有 src/sync、src/download、src/upload 模块。
        this.settings.repoUrl = repo.repoUrl;
        this.settings.sshKey = repo.sshKey;
        this.settings.targetFolder = repo.targetFolder;
    }

    activateRepositoryById(repoId: string): GitRepository {
        const repo = this.settings.repositories.find((item) => item.id === repoId);
        if (!repo) throw new Error("找不到对应的 Git 笔记仓库");
        this.activateRepository(repo);
        return repo;
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    async activateArticlesView() {
        const { workspace } = this.app;
        let leaf = workspace.getLeavesOfType(VIEW_TYPE_ARTICLES)[0];

        if (!leaf) {
            leaf = workspace.getLeaf("tab");
            await leaf.setViewState({
                type: VIEW_TYPE_ARTICLES,
                active: true,
            });
        }

        workspace.revealLeaf(leaf);
    }

    /** 根据当前设置重建自动刷新定时器 */
    async restartAutoRefresh() {
        this.stopAutoRefresh();

        const interval = this.settings?.autoRefreshInterval ?? 0;
        if (!interval || interval <= 0) {
            return;
        }

        this.autoRefreshTimer = window.setInterval(() => {
            // 没配置仓库就跳过
            if (
                !this.settings?.repositories?.length ||
                !this.getSelectedRepositories().length
            ) return;
            refreshArticlesView(this, { silent: true }).catch((err) =>
                console.warn("自动刷新文章列表失败：", err)
            );
        }, interval);

        // 注册到插件生命周期，卸载时自动清理
        this.registerInterval(this.autoRefreshTimer);
    }

    async stopAutoRefresh() {
        if (this.autoRefreshTimer !== null) {
            window.clearInterval(this.autoRefreshTimer);
            this.autoRefreshTimer = null;
        }
    }

    async cloneToTemp(): Promise<string> {
        await this.ensureSettingsLoaded();

        if (!this.settings.repoUrl) {
            throw new Error("请先在设置中填写 Git 仓库地址");
        }

        const tempDir = path.join(
            os.tmpdir(),
            `obsidian-git-articles-${Date.now()}`
        );

        let tempKeyPath: string | null = null;

        try {
            const git = simpleGit();

            if (this.settings.sshKey.trim()) {
                tempKeyPath = path.join(
                    os.tmpdir(),
                    `obsidian-git-key-${Date.now()}`
                );

                await fsp.writeFile(
                    tempKeyPath,
                    this.settings.sshKey.trim() + "\n",
                    { mode: 0o600 }
                );

                git.env({
                    ...process.env,
                    GIT_SSH_COMMAND:
                        `ssh -i "${tempKeyPath}" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null`,
                });
            }

            await git.clone(this.settings.repoUrl, tempDir, [
                "--depth",
                "1",
            ]);

            return tempDir;
        } catch (error) {
            await this.removeTempDir(tempDir);
            throw error;
        } finally {
            if (tempKeyPath) {
                try {
                    await fsp.unlink(tempKeyPath);
                } catch {
                    // 忽略临时密钥清理失败
                }
            }
        }
    }

    async getRemoteArticles(repoDir: string): Promise<RemoteArticle[]> {
        const articles: RemoteArticle[] = [];

        const walk = async (currentDir: string): Promise<void> => {
            const entries = await fsp.readdir(currentDir, {
                withFileTypes: true,
            });

            for (const entry of entries) {
                if (entry.name === ".git") continue;

                const absolutePath = path.join(currentDir, entry.name);

                if (entry.isDirectory()) {
                    await walk(absolutePath);
                    continue;
                }

                if (
                    !entry.isFile() ||
                    path.extname(entry.name).toLowerCase() !== ".md"
                ) {
                    continue;
                }

                const relativePath = path
                    .relative(repoDir, absolutePath)
                    .split(path.sep)
                    .join("/");

                const [content, stat] = await Promise.all([
                    fsp.readFile(absolutePath, "utf8"),
                    fsp.stat(absolutePath),
                ]);

                articles.push({
                    title: path.basename(entry.name, path.extname(entry.name)),
                    relativePath,
                    absolutePath,
                    content,
                    size: stat.size,
                });

                // 每处理一批让出事件循环，避免长任务阻塞 UI
                if (articles.length % 50 === 0) {
                    await new Promise((r) => setTimeout(r, 0));
                }
            }
        };

        await walk(repoDir);

        return articles.sort((a, b) =>
            a.title.localeCompare(b.title, "zh-CN")
        );
    }

    async getRemoteFolders(): Promise<string[]> {
        const tempDir = await this.cloneToTemp();

        try {
            const folders = new Set<string>();

            const walk = async (
                currentDir: string,
                relativeBase = ""
            ): Promise<void> => {
                const entries = await fsp.readdir(currentDir, {
                    withFileTypes: true,
                });

                for (const entry of entries) {
                    if (entry.name === ".git") continue;

                    const absolutePath = path.join(currentDir, entry.name);
                    const relativePath = relativeBase
                        ? path.join(relativeBase, entry.name)
                        : entry.name;

                    if (entry.isDirectory()) {
                        folders.add(relativePath.split(path.sep).join("/"));
                        await walk(absolutePath, relativePath);
                    }
                }
            };

            await walk(tempDir);

            return Array.from(folders).sort((a, b) =>
                a.localeCompare(b, "zh-CN")
            );
        } finally {
            await this.removeTempDir(tempDir);
        }
    }

    async removeTempDir(dir: string): Promise<void> {
        if (!dir) return;

        try {
            await fsp.rm(dir, { recursive: true, force: true });
        } catch (error) {
            console.warn("清理 Git 临时目录失败：", error);
        }
    }

    onunload() {
        this.stopAutoRefresh();
        this.app.workspace.detachLeavesOfType(VIEW_TYPE_ARTICLES);
    }
}