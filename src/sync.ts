import { App, Modal, Notice, TFile } from "obsidian";
import type MySimplePlugin from "../main";

export interface RemoteArticle {
    title: string;
    relativePath: string;
    absolutePath: string;
    content: string;
    size: number;
}

export class SyncConflictModal extends Modal {
    article: RemoteArticle;
    localFile: TFile;
    plugin: MySimplePlugin;
    onResult: (result: "overwrite" | "copy" | "cancel") => void;

    constructor(
        app: App,
        plugin: MySimplePlugin,
        article: RemoteArticle,
        localFile: TFile,
        onResult: (result: "overwrite" | "copy" | "cancel") => void
    ) {
        super(app);
        this.plugin = plugin;
        this.article = article;
        this.localFile = localFile;
        this.onResult = onResult;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.empty();
        contentEl.addClass("git-sync-conflict-modal");

        contentEl.createEl("h2", { text: "发现同名文章" });

        contentEl.createEl("p", {
            text: `Git 仓库中的《${this.article.title}》与本地文章同名。请选择同步方式。`,
            cls: "git-sync-conflict-description",
        });

        const info = contentEl.createDiv({ cls: "git-sync-conflict-info" });
        info.createEl("div", {
            text: `本地文件：${this.localFile.path}`,
        });
        info.createEl("div", {
            text: `Git 文件：${this.article.relativePath}`,
        });

        const options = contentEl.createDiv({ cls: "git-sync-conflict-options" });

        const overwrite = options.createEl("button", {
            text: "覆盖本地文章",
            cls: "git-sync-conflict-overwrite",
        });
        overwrite.createDiv({
            text: "使用 Git 仓库中的内容替换当前本地文章。",
            cls: "git-sync-conflict-option-desc",
        });
        overwrite.onclick = () => {
            this.onResult("overwrite");
            this.close();
        };

        const copy = options.createEl("button", {
            text: "另存为副件",
            cls: "git-sync-conflict-copy",
        });
        copy.createDiv({
            text: "保留本地文章，并将 Git 文章另存为“副件”。",
            cls: "git-sync-conflict-option-desc",
        });
        copy.onclick = () => {
            this.onResult("copy");
            this.close();
        };

        const cancel = contentEl.createEl("button", {
            text: "取消",
            cls: "git-sync-conflict-cancel",
        });
        cancel.onclick = () => {
            this.onResult("cancel");
            this.close();
        };
    }

    onClose() {
        // 如果用户直接按 Esc 关闭，也视为取消。
        this.onResult("cancel");
    }
}

export async function confirmSyncConflict(
    plugin: MySimplePlugin,
    article: RemoteArticle,
    localFile: TFile
): Promise<"overwrite" | "copy" | "cancel"> {
    return new Promise((resolve) => {
        let resolved = false;

        const finish = (result: "overwrite" | "copy" | "cancel") => {
            if (resolved) return;
            resolved = true;
            resolve(result);
        };

        const modal = new SyncConflictModal(
            plugin.app,
            plugin,
            article,
            localFile,
            finish
        );

        modal.open();
    });
}

export async function syncArticle(
    plugin: MySimplePlugin,
    article: RemoteArticle,
    localFile: TFile
) {
    await plugin.app.vault.modify(localFile, article.content);
}

export async function syncArticleAsCopy(
    plugin: MySimplePlugin,
    article: RemoteArticle,
    localFile: TFile
): Promise<TFile> {
    const parentPath = localFile.parent?.path ?? "";
    const extension = ".md";
    const baseTitle = article.title;

    let copyName = `${baseTitle}（副件）${extension}`;
    let copyPath = parentPath && parentPath !== "/"
        ? `${parentPath}/${copyName}`
        : copyName;

    let index = 2;
    while (plugin.app.vault.getAbstractFileByPath(copyPath)) {
        copyName = `${baseTitle}（副件 ${index}）${extension}`;
        copyPath = parentPath && parentPath !== "/"
            ? `${parentPath}/${copyName}`
            : copyName;
        index++;
    }

    await plugin.app.vault.create(copyPath, article.content);

    const copyFile = plugin.app.vault.getAbstractFileByPath(copyPath);
    if (!(copyFile instanceof TFile)) {
        throw new Error("副件已写入，但 Obsidian 未能识别新文件");
    }

    return copyFile;
}