import { FileSystemAdapter, TFile } from "obsidian";
import * as fs from "fs";
import * as path from "path";
import type MySimplePlugin from "../main";
import type { RemoteArticle } from "./sync";

export async function downloadArticle(
    plugin: MySimplePlugin,
    article: RemoteArticle
): Promise<TFile> {
    const adapter = plugin.app.vault.adapter;

    if (!(adapter instanceof FileSystemAdapter)) {
        throw new Error("当前 Vault 不是本地文件系统，无法下载文章");
    }

    const targetFolder = plugin.settings.targetFolder || "Git文章";
    const relativeTarget = path
        .join(targetFolder, article.relativePath)
        .split(path.sep)
        .join("/");

    const absoluteTarget = path.join(
        adapter.getBasePath(),
        relativeTarget
    );

    fs.mkdirSync(path.dirname(absoluteTarget), { recursive: true });

    await adapter.write(relativeTarget, article.content);

    const file = plugin.app.vault.getAbstractFileByPath(relativeTarget);
    if (!(file instanceof TFile)) {
        throw new Error("文章已写入，但 Obsidian 未能识别新文件");
    }

    return file;
}