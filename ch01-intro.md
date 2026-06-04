---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
title: Git 版本控制簡介
routeAlias: ch01
style: |
  .slidev-layout p,
  .slidev-layout li,
  .slidev-layout td,
  .slidev-layout th,
  .slidev-layout div {
    font-size: max(16px, 1em);
  }
  table {
    width: 100%;
    margin: 1rem 0;
    border-collapse: collapse;
  }
  th, td {
    padding: 8px !important;
    border: 1px solid #e2e8f0 !important;
  }
  .index-table td {
    text-align: center;
    font-family: monospace;
  }
---

<div class="flex flex-col justify-center items-center h-full" style="background: #ffffff;">
  <p style="color: #d97706; font-size: 1rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 1.2rem;">Git 版本控制課程</p>
  <h1 style="color: #92400e; font-size: 3.8rem; font-weight: 900; line-height: 1.15; margin-bottom: 1.5rem;">Git 版本控制簡介</h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #d97706, #fbbf24); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #b45309; font-size: 1.15rem; font-style: italic;">
    「讓每一次改變都可追蹤、可回溯、可協作」
  </p>
  <Link to="home" style="margin-top: 2rem; color: #d97706; font-size: 0.9rem;">← 返回目錄</Link>
</div>

---
layout: default
---

# Outline

- **版本控制概念** — 為什麼需要版本控制？VCS 的演進歷史
- **Git 是什麼** — 分散式架構、核心設計哲學
- **Git 三大區域** — Working Directory / Staging Area / Repository
- **Git 物件模型** — Blob、Tree、Commit、Tag
- **安裝 Git** — Windows / macOS / Linux 安裝方式
- **初始設定** — `git config` 使用者資訊、編輯器、換行符號
- **取得說明** — `git help`、man page

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 1
# 版本控制概念

---

# 沒有版本控制時的世界

<div class="grid grid-cols-2 gap-8">
<div>

**你的專案資料夾長這樣：**

```
report_final.docx
report_final2.docx
report_final_v3.docx
report_final_v3_真的最終版.docx
report_final_v3_真的最終版2.docx
report_老闆說這版.docx
```

</div>
<div>

**常見痛點：**


- 不知道哪個才是最新版
- 改壞了卻回不去
- 多人協作互相覆蓋
- 無法知道誰改了什麼
- 合併修改困難耗時


</div>
</div>

---

# 版本控制系統（VCS）演進

| 世代 | 代表工具 | 架構 | 特點 |
| --- | --- | --- | --- |
| 本地端 VCS | RCS、SCCS | 單機 | 僅記錄 diff，無法協作 |
| 集中式 VCS | CVS、SVN | Client-Server | 單一伺服器，斷線無法提交 |
| 分散式 VCS | **Git**、Mercurial | Peer-to-Peer | 每人都有完整歷史，可離線工作 |


<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fff8f0; border-left: 4px solid #d97706; border-radius: 4px;">

**Git** 由 Linus Torvalds 於 2005 年為管理 Linux 核心原始碼而開發，目標是速度、簡單設計、非線性開發（數千個並行分支）的完整支援。

</div>


---

# 為什麼選擇 Git？

<div class="grid grid-cols-3 gap-6" style="margin-top: 1rem;">

<div style="background: #fff8f0; border: 2px solid #d97706; border-radius: 12px; padding: 1.2rem;">
  <div style="font-size: 1.8rem; margin-bottom: 0.5rem;">🚀</div>
  <div style="font-weight: 700; color: #92400e; margin-bottom: 0.4rem;">速度極快</div>
  <div style="font-size: 0.9rem; color: #78350f;">大多數操作在本機執行，幾乎不需要網路</div>
</div>

<div style="background: #fff8f0; border: 2px solid #d97706; border-radius: 12px; padding: 1.2rem;">
  <div style="font-size: 1.8rem; margin-bottom: 0.5rem;">🔒</div>
  <div style="font-weight: 700; color: #92400e; margin-bottom: 0.4rem;">資料完整性</div>
  <div style="font-size: 0.9rem; color: #78350f;">每個物件以 SHA-1 雜湊值識別，無法竄改歷史</div>
</div>

<div style="background: #fff8f0; border: 2px solid #d97706; border-radius: 12px; padding: 1.2rem;">
  <div style="font-size: 1.8rem; margin-bottom: 0.5rem;">🌿</div>
  <div style="font-weight: 700; color: #92400e; margin-bottom: 0.4rem;">強大分支</div>
  <div style="font-size: 0.9rem; color: #78350f;">建立 / 切換分支極輕量，支援非線性開發流程</div>
</div>

</div>


<div class="grid grid-cols-3 gap-6" style="margin-top: 1rem;">

<div style="background: #fff8f0; border: 2px solid #d97706; border-radius: 12px; padding: 1.2rem;">
  <div style="font-size: 1.8rem; margin-bottom: 0.5rem;">📦</div>
  <div style="font-weight: 700; color: #92400e; margin-bottom: 0.4rem;">離線工作</div>
  <div style="font-size: 0.9rem; color: #78350f;">完整歷史在本機，隨時 commit，上線後再同步</div>
</div>

<div style="background: #fff8f0; border: 2px solid #d97706; border-radius: 12px; padding: 1.2rem;">
  <div style="font-size: 1.8rem; margin-bottom: 0.5rem;">🌐</div>
  <div style="font-weight: 700; color: #92400e; margin-bottom: 0.4rem;">開源生態</div>
  <div style="font-size: 0.9rem; color: #78350f;">GitHub / GitLab / Bitbucket 皆以 Git 為核心</div>
</div>

<div style="background: #fff8f0; border: 2px solid #d97706; border-radius: 12px; padding: 1.2rem;">
  <div style="font-size: 1.8rem; margin-bottom: 0.5rem;">👥</div>
  <div style="font-weight: 700; color: #92400e; margin-bottom: 0.4rem;">業界標準</div>
  <div style="font-size: 0.9rem; color: #78350f;">超過 90% 的軟體開發團隊使用 Git 管理程式碼</div>
</div>

</div>


---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 2
# Git 三大區域

---

# Git 三大工作區域

<div style="border: 2px solid #d97706; border-radius: 12px; padding: 1.2rem 1.5rem; margin-top: 0.5rem; background: #fff8f0;">
  <div style="text-align:center; font-size:0.8rem; color:#92400e; font-weight:600; margin-bottom:1rem;">你的電腦</div>
  <div style="display:flex; align-items:center; justify-content:center; gap:0;">

  <div style="border: 2px solid #d97706; border-radius:8px; padding:0.8rem 1rem; background:#ffffff; min-width:130px; text-align:center;">
    <div style="font-weight:700; color:#92400e;">Working Directory</div>
    <div style="font-size:0.8rem; color:#b45309;">工作目錄</div>
  </div>

  <div style="display:flex; flex-direction:column; align-items:center; margin:0 0.6rem;">
    <div style="display:flex; align-items:center; gap:0.3rem; margin-bottom:0.3rem;">
      <div style="font-size:0.72rem; color:#d97706; font-family:monospace;">git add</div>
      <div style="color:#d97706; font-size:1.2rem;">→</div>
    </div>
    <div style="display:flex; align-items:center; gap:0.3rem;">
      <div style="color:#d97706; font-size:1.2rem;">←</div>
      <div style="font-size:0.72rem; color:#d97706; font-family:monospace;">git restore</div>
    </div>
  </div>

  <div style="border: 2px solid #d97706; border-radius:8px; padding:0.8rem 1rem; background:#ffffff; min-width:130px; text-align:center;">
    <div style="font-weight:700; color:#92400e;">Staging Area</div>
    <div style="font-size:0.8rem; color:#b45309;">Index / 暫存區</div>
  </div>

  <div style="display:flex; flex-direction:column; align-items:center; margin:0 0.6rem;">
    <div style="display:flex; align-items:center; gap:0.3rem;">
      <div style="font-size:0.72rem; color:#d97706; font-family:monospace;">git commit</div>
      <div style="color:#d97706; font-size:1.2rem;">→</div>
    </div>
  </div>

  <div style="border: 2px solid #d97706; border-radius:8px; padding:0.8rem 1rem; background:#ffffff; min-width:130px; text-align:center;">
    <div style="font-weight:700; color:#92400e;">Repository</div>
    <div style="font-size:0.8rem; color:#b45309;">.git 目錄</div>
  </div>

  </div>
</div>

---

# 三大區域詳解

| 區域 | 別名 | 說明 | 狀態關鍵字 |
| --- | --- | --- | --- |
| Working Directory | 工作目錄 | 你實際編輯檔案的地方 | `modified`、`untracked` |
| Staging Area | Index / 暫存區 | 準備納入下次 commit 的快照 | `staged` |
| Repository | .git 目錄 | 所有歷史 commit 的永久儲存 | `committed` |


**檔案狀態流程：**

```
Untracked  ──git add──►  Staged  ──git commit──►  Committed
                         (Index)                   (.git)

Committed  ──(修改)──►  Modified  ──git add──►  Staged
```


---

# 查看目前狀態

```bash
# 查看工作目錄與暫存區的狀態
git status

# 簡短模式
git status -s
```


**輸出範例：**

```
On branch main
Changes to be committed:        ← 已暫存（綠色）
  (use "git restore --staged <file>..." to unstage)
        new file:   hello.txt

Changes not staged for commit:  ← 已修改但未暫存（紅色）
  (use "git add <file>..." to update what will be committed)
        modified:   README.md

Untracked files:                ← 未追蹤（紅色）
  (use "git add <file>..." to include in what will be committed)
        notes.txt
```


---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 3
# Git 物件模型

---

# Git 的四種物件

Git 以「內容定址儲存（Content-Addressable Storage）」管理所有資料，每個物件以 **SHA-1 雜湊值**命名。


| 物件類型 | 說明 | 類比 |
| --- | --- | --- |
| **Blob** | 儲存檔案內容（不含檔名） | 檔案本身 |
| **Tree** | 儲存目錄結構（檔名 + blob/tree 參照） | 資料夾 |
| **Commit** | 指向一個 tree，記錄作者、時間、訊息、parent | 快照 + 標籤 |
| **Tag** | 指向特定 commit 的具名參照 | 書籤 |



```
Commit  ──► Tree (root)
                ├── blob: README.md
                ├── blob: main.py
                └── tree: src/
                          ├── blob: app.py
                          └── blob: utils.py
```


---

# Commit 物件內容

每個 commit 儲存以下資訊：

```bash
# 查看 commit 物件原始內容
git cat-file -p HEAD
```


**輸出範例：**

```
tree 4b825dc642cb6eb9a060e54bf8d69288fbee4904
parent a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2
author  Jane Doe <jane@example.com> 1717430400 +0800
committer Jane Doe <jane@example.com> 1717430400 +0800

Add login feature

Implement JWT-based authentication with refresh token support.
```



> **重點：** parent 欄位使 commit 形成有向無環圖（DAG），這就是 Git 歷史的核心結構。


---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 4
# 安裝 Git

---

# 各平台安裝方式

<div class="grid grid-cols-3 gap-6">

<div style="background: #f0f9ff; border: 2px solid #0284c7; border-radius: 12px; padding: 1.2rem;">
  <div style="font-weight: 700; color: #0c4a6e; font-size: 1.1rem; margin-bottom: 0.8rem;">Windows</div>

```powershell
# 方法一：官方安裝包
# https://git-scm.com/download/win

# 方法二：winget
winget install Git.Git

# 方法三：Chocolatey
choco install git
```

</div>

<div style="background: #f0fdf4; border: 2px solid #16a34a; border-radius: 12px; padding: 1.2rem;">
  <div style="font-weight: 700; color: #14532d; font-size: 1.1rem; margin-bottom: 0.8rem;">macOS</div>

```bash
# 方法一：Homebrew（推薦）
brew install git

# 方法二：Xcode Command Line Tools
xcode-select --install

# 方法三：官方 pkg
# https://git-scm.com/download/mac
```

</div>

<div style="background: #fff8f0; border: 2px solid #d97706; border-radius: 12px; padding: 1.2rem;">
  <div style="font-weight: 700; color: #92400e; font-size: 1.1rem; margin-bottom: 0.8rem;">Linux</div>

```bash
# Debian / Ubuntu
sudo apt update
sudo apt install git

# Fedora / RHEL
sudo dnf install git

# Arch Linux
sudo pacman -S git
```

</div>

</div>

---

# 確認安裝成功

安裝完成後，開啟終端機驗證：

```bash
# 查看 Git 版本
git --version
# git version 2.45.2

# 查看 Git 安裝路徑
which git          # macOS / Linux
where git          # Windows
```


**建議安裝版本：** Git 2.30 以上（支援 `git switch`、`git restore` 等現代指令）



> **Windows 使用者注意：** 安裝 Git for Windows 後會附帶 **Git Bash**（模擬 Unix shell），建議使用 Git Bash 或 Windows Terminal 操作。


---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 5
# 初始設定

---

# git config 設定層級

Git 設定分為三個層級，越下層優先級越高：

| 層級 | 範圍 | 設定檔位置 | 旗標 |
| --- | --- | --- | --- |
| System | 所有使用者 | `/etc/gitconfig` | `--system` |
| Global | 目前使用者 | `~/.gitconfig` | `--global` |
| Local | 目前儲存庫 | `.git/config` | `--local` |


```bash
# 查看所有設定（顯示來源層級）
git config --list --show-origin
```


---

# 必做的首次設定

安裝後**第一件事**：告訴 Git 你是誰

```bash
# 設定使用者名稱（Global，影響所有 repo）
git config --global user.name "Your Name"

# 設定 Email
git config --global user.email "you@example.com"

# 確認設定
git config --global user.name
git config --global user.email
```


> **為什麼重要？** 每個 commit 都會記錄這兩個資訊，一旦推送到遠端就難以修改。


---

# 其他實用設定

```bash
# 設定預設編輯器（撰寫 commit 訊息時使用）
git config --global core.editor "code --wait"   # VS Code
git config --global core.editor "vim"            # Vim
git config --global core.editor "nano"           # Nano

# 設定預設分支名稱（Git 2.28+）
git config --global init.defaultBranch main

# Windows 換行符號處理（避免跨平台問題）
git config --global core.autocrlf true           # Windows
git config --global core.autocrlf input          # macOS / Linux

# 設定彩色輸出
git config --global color.ui auto
```

---

# 設定命令別名（Alias）

讓常用指令變得更短更方便：

```bash
# 常用別名設定
git config --global alias.st   status
git config --global alias.co   checkout
git config --global alias.br   branch
git config --global alias.lg   "log --oneline --graph --all --decorate"
```


**使用方式：**

```bash
git st          # 等同 git status
git co main     # 等同 git checkout main
git br          # 等同 git branch
git lg          # 精簡圖形化歷史
```



**查看目前所有別名：**

```bash
git config --global --list | grep alias
```


---

# 查看與編輯設定檔

```bash
# 直接用編輯器開啟 global 設定檔
git config --global --edit

# 查看特定設定值
git config user.name
git config user.email

# 刪除設定
git config --global --unset user.email

# 查看設定檔完整內容
cat ~/.gitconfig
```


**~/.gitconfig 範例內容：**

```ini
[user]
    name = Jane Doe
    email = jane@example.com
[core]
    editor = code --wait
    autocrlf = input
[init]
    defaultBranch = main
[alias]
    st = status
    lg = log --oneline --graph --all --decorate
```


---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 6
# 取得說明

---

# git help — 三種查詢方式

遇到不熟悉的指令時，不用死記，善用說明文件：

```bash
# 方法一：開啟完整 man page（HTML 格式，瀏覽器）
git help <verb>
git help config

# 方法二：在終端機顯示簡短說明
git <verb> --help
git config --help

# 方法三：顯示快速選項清單（-h 小寫）
git <verb> -h
git config -h
```


**範例輸出（git config -h）：**

```
usage: git config [<options>]

Config file location
    --global              use global config file
    --system              use system config file
    --local               use repository config file
    -f, --file <file>     use given config file
```


---

# 本章重點回顧


- **版本控制** 讓每次修改可追蹤、可回溯、可協作
- Git 屬於**分散式 VCS**，每人都有完整歷史，速度快、可離線工作
- Git 三大區域：**Working Directory → Staging Area → Repository**
- Git 以 **SHA-1 物件（Blob / Tree / Commit / Tag）** 儲存所有資料
- 安裝後必做：`git config --global user.name / user.email`
- 設定分三層：**system < global < local**，越下層優先
- 遇到問題善用 `git help <command>` 或 `git <command> -h`



<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fff8f0; border-left: 4px solid #d97706; border-radius: 4px;">

**下一章：** Ch 2 基本操作 — `git init` / `git add` / `git commit` / `git status` / `git log`

<Link to="ch02" style="color: #d97706; font-weight: 600;">前往 Ch 2 →</Link>

</div>


---
layout: end
---

# Ch 1 結束

### 版本控制，從 Git 開始

<Link to="home" style="margin-top: 1.5rem; display: inline-block; color: #d97706;">← 返回目錄</Link>
