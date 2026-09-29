# Git 文章同步

一个用于 **Obsidian** 的 Git Markdown 文章同步插件。
**支持git复用，浏览器登录GitHub以后无需再登陆**

## 功能

### Git 仓库配置
在 Obsidian 设置中配置：

- Git 仓库地址
- SSH 私钥（可选）
- 本地文章保存目录

### Git 文章
打开「Git 文章」标签页后，可以读取 Git 仓库中的 Markdown 文章。

根据本地是否存在同名文章自动显示：

- **下载**：本地不存在同名文章
- **同步**：本地已经存在同名文章

### 同名文章冲突

点击「同步」时，如果检测到本地存在同名文章，会先询问：

- **覆盖本地文章**：使用 Git 文章覆盖本地文章
- **另存为副件**：保留本地文章，将 Git 文章保存为副件
- **取消**：取消本次操作

副件命名示例：

```text
Linux学习笔记.md
Linux学习笔记（副件）.md
Linux学习笔记（副件 2）.md
```

### 本地文章上传

Git 文章页面提供「本地文章上传」区域，可以读取当前 Vault 中的 Markdown 文件。

点击「上传」后，可以：

1. 选择 Git 仓库已有文件夹
2. 输入新的文件夹路径
3. 自动创建不存在的多级目录
4. 将 Markdown 上传到 Git
5. 自动执行 `git add`
6. 自动执行 `git commit`
7. 自动执行 `git push`

例如输入：

```text
技术/AI/Ollama
```

上传后：

```text
技术/
└── AI/
    └── Ollama/
        └── 文章.md
```

## 工作流程

```text
                    Git 仓库设置
                         │
                         ▼
                    Git 文章页面
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
        下载           同步          本地上传
                         │              │
                    ┌────┴────┐         │
                    ▼         ▼         │
                  覆盖      另存副件      │
                    │         │         │
                    └────┬────┘         │
                         │              │
                         └──────┬───────┘
                                ▼
                           Git commit
                                │
                                ▼
                            Git push
```

## 技术实现

主要使用：

- Obsidian Plugin API
- TypeScript
- `simple-git`
- Node.js `fs`
- Node.js `path`
- Node.js `os`

Git 操作通过 `simple-git` 完成。

## 项目结构

```text
.
├── main.ts
├── styles.css
├── manifest.json
├── package.json
└── README.md
```

### `main.ts`

负责：

- Git 文章列表
- Git 仓库读取
- Markdown 下载
- Markdown 同步
- 同名文章冲突处理
- 本地文章上传
- Git 文件夹读取
- Git commit / push
- 插件设置

### `styles.css`

负责：

- Git 文章列表样式
- 文章卡片
- 下载 / 同步按钮
- 本地文章上传区域
- 上传弹窗
- 设置页面样式
- 小屏适配

## 使用方法

### 1. 配置 Git

打开：

```text
设置 → Git 文章同步
```

填写 Git 仓库地址。

如果使用 SSH，可以填写 SSH 私钥。

### 2. 打开 Git 文章

通过插件命令、Ribbon 图标或设置页面打开「Git 文章」。

### 3. 下载

本地不存在同名文章时，点击「下载」。

### 4. 同步

本地已经存在同名文章时，点击「同步」。

如果发生冲突，会先选择：

```text
覆盖本地文章
```

或者：

```text
另存为副件
```

### 5. 上传

在「本地文章上传」中选择文章，选择 Git 文件夹，然后点击「上传到 Git」。

## 注意事项

- Git 仓库需要具有相应的访问权限。
- SSH 私钥仅用于 Git 操作。
- 当前同名判断主要依据 Markdown 文件名（basename）。
- 不同目录下的同名 Markdown 文件可能被判断为同一篇文章。
- 上传时如果目标 Git 文件已经存在，会更新该文件。
- Git 操作需要能够访问 Git 服务器。

## 开发

安装依赖：

```bash
npm install
```

开发构建：

```bash
npm run dev
```

生产构建：

```bash
npm run build
```

具体命令以项目中的 `package.json` 为准。

## 许可证

当前项目未指定具体开源许可证。
