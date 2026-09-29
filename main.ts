import {
    App,
    FileSystemAdapter,
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

interface GitSyncSettings {
    repoUrl: string;
    sshKey: string;
    targetFolder: string;
}

const DEFAULT_SETTINGS: GitSyncSettings = {
    repoUrl: "",
    sshKey: "",
    targetFolder: "Git文章",
};

class GitArticlesView extends ItemView {
    plugin: MySimplePlugin;
    articles: RemoteArticle[] = [];
    localTitles = new Map<string, TFile>();
    contentEl: HTMLElement;
    private isLoading = false;

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
            text: this.plugin.settings.repoUrl
                ? "从已配置的 Git 仓库读取 Markdown 文章"
                : "请先在设置中配置 Git 仓库",
            cls: "git-articles-subtitle",
        });

        const refreshButton = header.createEl("button", {
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

        if (!this.plugin.settings.repoUrl) {
            const empty = this.contentEl.createDiv({ cls: "git-articles-empty" });
            empty.createDiv({ cls: "git-articles-empty-icon", text: "⚙️" });
            empty.createEl("h3", { text: "还没有配置 Git 仓库" });
            empty.createEl("p", {
                text: "打开 Obsidian 设置 → Git 文章同步，填写仓库地址后返回此标签页。",
            });
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
        if (!this.plugin.settings.repoUrl) {
            return;
        }

        if (this.isLoading) return;
        this.isLoading = true;

        try {
            await this.loadArticles();
        } catch (error) {
            new Notice(
                `刷新失败：${
                    error instanceof Error ? error.message : String(error)
                }`
            );
        } finally {
            this.isLoading = false;
        }
    }

    async loadArticles() {
        const tempDir = await this.plugin.cloneToTemp();
        try {
            this.articles = await this.plugin.getRemoteArticles(tempDir);

            this.localTitles.clear();
            const localFiles = this.app.vault.getMarkdownFiles();

            for (let i = 0; i < localFiles.length; i++) {
                const file = localFiles[i];
                if (!this.localTitles.has(file.name)) {
                    this.localTitles.set(file.name, file);
                }
                // 每处理一批让出事件循环，避免长时间阻塞 UI
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
            summary.setText(`共 ${this.articles.length} 篇文章`);

            for (const article of this.articles) {
                this.renderArticleCard(list, article);
            }

            await this.renderLocalArticles();
        } finally {
            await this.plugin.removeTempDir(tempDir);
        }
    }

    renderArticleCard(list: HTMLElement, article: RemoteArticle) {
        const remoteFileName = article.relativePath.split("/").pop() ?? "";
        const localFile = this.localTitles.get(remoteFileName);
        const card = list.createDiv({ cls: "git-article-card" });

        const info = card.createDiv({ cls: "git-article-info" });
        info.createEl("div", {
            text: article.title,
            cls: "git-article-title",
        });
        info.createEl("div", {
            text: article.relativePath,
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
                    `${localFile ? "同步" : "下载"}失败：${
                        error instanceof Error ? error.message : String(error)
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
        const titleBox = header.createDiv();
        titleBox.createEl("h3", { text: "本地文章上传" });
        titleBox.createEl("div", {
            text: "读取当前 Vault 中的 Markdown 文件，选择 Git 仓库文件夹后上传。",
            cls: "git-articles-subtitle",
        });

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

        for (const file of localFiles) {
            const card = list.createDiv({ cls: "git-local-article-card" });

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
            text: "在这里配置 Git 仓库环境，文章列表会在“Git 文章”标签页中显示。",
            cls: "setting-item-description",
        });

        new Setting(containerEl)
            .setName("Git 仓库地址")
            .setDesc("支持 HTTPS 和 SSH，例如 git@github.com:user/repo.git")
            .addText((text) =>
                text
                    .setPlaceholder("git@github.com:user/repo.git")
                    .setValue(this.plugin.settings.repoUrl)
                    .onChange(async (value) => {
                        this.plugin.settings.repoUrl = value.trim();
                        await this.plugin.saveSettings();
                    })
            );

        new Setting(containerEl)
            .setName("SSH 私钥")
            .setDesc("可选。留空时使用系统默认 SSH 配置。私钥只用于当前 Git 操作。")
            .addTextArea((text) => {
                text
                    .setPlaceholder("粘贴 SSH 私钥")
                    .setValue(this.plugin.settings.sshKey)
                    .onChange(async (value) => {
                        this.plugin.settings.sshKey = value;
                        await this.plugin.saveSettings();
                    });
                text.inputEl.rows = 7;
                text.inputEl.addClass("git-sync-settings-key");
            });

        new Setting(containerEl)
            .setName("文章保存目录")
            .setDesc("下载新文章时使用的 Vault 相对路径，例如 Git文章")
            .addText((text) =>
                text
                    .setPlaceholder("Git文章")
                    .setValue(this.plugin.settings.targetFolder)
                    .onChange(async (value) => {
                        this.plugin.settings.targetFolder =
                            value.trim().replace(/^\/+|\/+$/g, "") || "Git文章";
                        await this.plugin.saveSettings();
                    })
            );

        new Setting(containerEl)
            .setName("打开文章列表")
            .setDesc("打开一个新的 Obsidian 标签页，查看仓库中的文章。")
            .addButton((button) =>
                button.setButtonText("打开").onClick(async () => {
                    await this.plugin.activateArticlesView();
                })
            );
    }
}

export default class MySimplePlugin extends Plugin {
    settings: GitSyncSettings;
    private settingsReady: Promise<void> | null = null;

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
            .then(() => console.log("Git 文章同步插件已加载"))
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
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
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
        this.app.workspace.detachLeavesOfType(VIEW_TYPE_ARTICLES);
    }
}