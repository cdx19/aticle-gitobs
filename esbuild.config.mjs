import esbuild from "esbuild";
import builtins from "builtin-modules";

const isWatch = process.argv.includes("--watch");

const context = await esbuild.context({
    entryPoints: ["main.ts"],
    bundle: true,
    external: [
        "obsidian",
        "electron",
        "@codemirror/autocomplete",
        "@codemirror/collab",
        "@codemirror/commands",
        "@codemirror/language",
        "@codemirror/lint",
        "@codemirror/search",
        "@codemirror/state",
        "@codemirror/view",
        "@codemirror/closebrackets",
        "@codemirror/highlight",
        "@codemirror/history",
        "@codemirror/stream-parser",
        "@codemirror/text",
        "@codemirror/tooltip",
        "@lezer/common",
        "@lezer/highlight",
        "@lezer/lr",
        // ⭐ 所有 Node 内置模块（fs、path、os、child_process...）
        ...builtins
    ],
    format: "cjs",
    target: "es2018",
    logLevel: "info",
    sourcemap: "inline",
    outfile: "main.js",
    // ⭐ 关键：Electron / Node 环境
    platform: "node"
});

if (isWatch) {
    await context.watch();
    console.log("正在监听文件变化...");
} else {
    await context.rebuild();
    await context.dispose();
    console.log("构建完成！");
}