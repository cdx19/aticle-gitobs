import { App, FileSystemAdapter, Modal, Notice, TFile } from "obsidian";
import { simpleGit } from "simple-git";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import type MySimplePlugin from "./main";

export class UploadArticleModal extends Modal {
    plugin: MySimplePlugin;
    file: TFile;
    folders: string[] = [];
    selectedFolder = "";
    folderInput!: HTMLInputElement;
    selectEl!: HTMLSelectElement;
    uploadButton!: HTMLButtonElement;

    constructor(app: App, plugin: MySimplePlugin, file: TFile) {
        super(app);
        this.plugin = plugin;
        this.file = file;
    }

    async onOpen() {
        const { contentEl } = this;
        contentEl.empty();
        contentEl.addClass("git-upload-modal");

        contentEl.createEl("h2", { text: `上传：${this.file.basename}` });
        contentEl.createEl("p", {
            text: "选择 Git 仓库中的目标文件夹。文件夹不存在时会自动创建。",
            cls: "git-upload-description",
        });

        const loading = contentEl.createDiv({
            text: "正在读取 Git 仓库文件夹…",
            cls: "git-upload-loading",
        });

        try {
            this.folders = await this.plugin.getRemoteFolders();
            loading.remove();
            this.renderForm();
        } catch (error) {
            loading.remove();
            contentEl.createDiv({
                text: `读取仓库失败：${error instanceof Error ? error.message : String(error)}`,
                cls: "git-upload-error",
            });
        }
    }

    renderForm() {
        const { contentEl } = this;

        const field = contentEl.createDiv({ cls: "git-upload-field" });
        field.createEl("label", {
            text: "已有文件夹",
            cls: "git-upload-label",
        });

        this.selectEl = field.createEl("select", {
            cls: "git-upload-select",
        });

        this.selectEl.createEl("option", {
            text: "仓库根目录",
            value: "",
        });

        for (const folder of this.folders) {
            this.selectEl.createEl("option", {
                text: folder || "仓库根目录",
                value: folder,
            });
        }

        this.selectEl.onchange = () => {
            this.selectedFolder = this.selectEl.value;
            if (this.selectEl.value) {
                this.folderInput.value = "";
            }
        };

        const newField = contentEl.createDiv({ cls: "git-upload-field" });
        newField.createEl("label", {
            text: "或创建新文件夹",
            cls: "git-upload-label",
        });

        this.folderInput = newField.createEl("input", {
            type: "text",
            placeholder: "例如：AI/模型笔记",
            cls: "git-upload-input",
        });

        newField.createDiv({
            text: "支持多级目录，例如：技术/AI/Ollama",
            cls: "git-upload-hint",
        });

        this.folderInput.oninput = () => {
            if (this.folderInput.value.trim()) {
                this.selectEl.value = "";
                this.selectedFolder = "";
            }
        };

        const footer = contentEl.createDiv({ cls: "git-upload-footer" });

        const cancel = footer.createEl("button", {
            text: "取消",
            cls: "git-upload-cancel",
        });
        cancel.onclick = () => this.close();

        this.uploadButton = footer.createEl("button", {
            text: "上传到 Git",
            cls: "git-upload-submit",
        });
        this.uploadButton.onclick = async () => {
            const customFolder = this.folderInput.value.trim();
            const folder = customFolder || this.selectEl.value;

            this.uploadButton.disabled = true;
            this.uploadButton.textContent = "上传中…";

            try {
                await uploadLocalArticle(this.plugin, this.file, folder);
                new Notice(`《${this.file.basename}》已上传到 ${folder || "仓库根目录"}`);
                this.close();
            } catch (error) {
                new Notice(
                    `上传失败：${error instanceof Error ? error.message : String(error)}`
                );
            } finally {
                this.uploadButton.disabled = false;
                this.uploadButton.textContent = "上传到 Git";
            }
        };
    }
}

export async function uploadLocalArticle(
    plugin: MySimplePlugin,
    file: TFile,
    folder: string
) {
    const adapter = plugin.app.vault.adapter;

    if (!(adapter instanceof FileSystemAdapter)) {
        throw new Error("当前 Vault 不是本地文件系统，无法上传文章");
    }

    const tempDir = await plugin.cloneToTemp();

    try {
        let cleanFolder = folder
            .trim()
            .replace(/\\/g, "/")
            .replace(/^\/+|\/+$/g, "");

        // 防止通过文件夹输入跳出 Git 临时仓库。
        const folderParts = cleanFolder
            ? cleanFolder.split("/").filter((part) => part && part !== "." && part !== "..")
            : [];

        cleanFolder = folderParts.join("/");

        const content = await plugin.app.vault.read(file);
        const targetRelative = cleanFolder
            ? `${cleanFolder}/${file.basename}.md`
            : `${file.basename}.md`;

        const targetAbsolute = path.resolve(tempDir, targetRelative);

        // 确保目标路径仍然位于临时仓库内部。
        const normalizedTemp = path.resolve(tempDir) + path.sep;
        if (!targetAbsolute.startsWith(normalizedTemp)) {
            throw new Error("无效的 Git 文件夹路径");
        }

        fs.mkdirSync(path.dirname(targetAbsolute), { recursive: true });

        const exists = fs.existsSync(targetAbsolute);
        fs.writeFileSync(targetAbsolute, content, "utf8");

        const git = simpleGit({
            baseDir: tempDir,
            trimmed: true,
        });

        if (plugin.settings.sshKey.trim()) {
            const keyPath = path.join(
                os.tmpdir(),
                `obsidian-git-key-${Date.now()}`
            );

            try {
                fs.writeFileSync(
                    keyPath,
                    plugin.settings.sshKey.trim() + "\n",
                    { mode: 0o600 }
                );

                git.env({
                    ...process.env,
                    GIT_SSH_COMMAND:
                        `ssh -i "${keyPath}" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null`,
                });

                await commitAndPushArticle(
                    git,
                    targetRelative,
                    file.basename,
                    exists
                );
            } finally {
                if (fs.existsSync(keyPath)) {
                    try {
                        fs.unlinkSync(keyPath);
                    } catch {
                        // 忽略临时密钥清理失败
                    }
                }
            }
        } else {
            await commitAndPushArticle(
                git,
                targetRelative,
                file.basename,
                exists
            );
        }
    } finally {
        plugin.removeTempDir(tempDir);
    }
}

async function commitAndPushArticle(
    git: ReturnType<typeof simpleGit>,
    targetRelative: string,
    title: string,
    existed: boolean
) {
    await git.add(targetRelative);

    const status = await git.status();
    if (!status.staged.length) {
        throw new Error("文章内容没有变化，无需上传");
    }

    const action = existed ? "更新" : "上传";
    await git.commit(`docs: ${action} ${title}`);
    await git.push();

    console.log(`Git ${action}完成：${targetRelative}`);
}