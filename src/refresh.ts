import { Notice } from "obsidian";
import type MySimplePlugin from "./main";

/**
 * 刷新“Git 文章”视图。
 * - 若视图已打开，则调用其公开的 refresh 方法重新加载文章列表。
 * - 若视图未打开，则不做任何事。
 */
export async function refreshArticlesView(
    plugin: MySimplePlugin,
    options: { silent?: boolean } = {}
): Promise<void> {
    const { silent = false } = options;

    try {
        const leaves = plugin.app.workspace.getLeavesOfType(
            plugin.viewTypeArticles
        );

        if (leaves.length === 0) {
            // 视图没开，无需刷新
            return;
        }

        for (const leaf of leaves) {
            const view = leaf.view as { refresh?: () => Promise<void> } | null;
            if (view && typeof view.refresh === "function") {
                await view.refresh();
            }
        }
    } catch (error) {
        if (!silent) {
            new Notice(
                `刷新文章列表失败：${
                    error instanceof Error ? error.message : String(error)
                }`
            );
        } else {
            console.warn("刷新文章列表失败：", error);
        }
    }
}