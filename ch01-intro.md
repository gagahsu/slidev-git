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

<!--
歡迎來到 Git 版本控制課程的第一章。這章的目標很簡單：打好觀念基礎，讓大家知道 Git 是什麼、為什麼要用它。很多同學開始學 Git 是因為工作需要，被前輩說「去裝個 Git」，但沒人解釋背後的原因。今天我們就從最根本的痛點出發，搞清楚了「為什麼需要」，後面學工具才會快。接下來我們來看今天的大綱。
-->

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

<!--
今天一共有七個主題，前兩個是觀念層面的，後五個是實作層面的。第一次學 Git 最重要的不是背下所有指令，而是理解 Git 的思考方式——指令忘了可以查，但觀念搞通了，以後學任何進階功能都會輕鬆很多。我們先從「沒有版本控制的世界」開始。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 1
# 版本控制概念

<!--
第一個主題，我們來談版本控制概念。在介紹 Git 之前，先請大家回想一下，還沒有版本控制工具的時候，你們是怎麼管理自己的檔案的？這個問題聽起來很基本，但這些痛點太真實了，正因為如此版本控制才變得不可或缺。接下來我們看看沒有版本控制時，資料夾長什麼樣。
-->

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

<!--
這個資料夾的命名，大家看了有沒有一種熟悉感？這不是在嘲笑任何人，幾乎每個工程師都走過這段。最有趣的是「老闆說這版」——它說明什麼？說明版本已經亂到連序號都沒辦法用了，只能靠「誰要的」來命名。版本控制要解決的，就是這些每天在發生的問題：誰改了什麼、什麼時候改的、改壞了怎麼還原。接下來我們看版本控制系統是怎麼演進來的。
-->

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


<!--
版本控制系統的演進走了三個世代。最早是單機版，只能一個人用；後來出現集中式像 SVN，有中央伺服器統一管理，但伺服器掛掉大家就都沒辦法工作了。Git 屬於第三代分散式架構，每個人的電腦上都有完整歷史，不需要依賴中央伺服器也能正常工作。Linus 當年開發 Git 是因為 Linux 社群太大，需要支援數千個同時進行的開發分支，這個背景也解釋了為什麼 Git 在處理分支上這麼強。接下來我們看 Git 有哪些具體優點。
-->

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


<!--
六個優點裡，我最想強調「業界標準」這項。現在不管你去哪家公司面試，版本控制幾乎百分之百是用 Git，GitHub 和 GitLab 也都建立在 Git 上，學 Git 其實是在學整個現代開發的共同語言。「資料完整性」也很重要：用 SHA-1 雜湊值識別每個物件，任何一個位元被竄改雜湊值就不對了，歷史記錄幾乎無法偽造。接下來我們進入今天最核心的概念：Git 三大區域。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 2
# Git 三大區域

<!--
接下來進入今天最核心的概念之一：Git 的三大工作區域。這個模型一旦搞清楚，很多 Git 指令的行為就會突然變得很合理。很多同學學 Git 卡關，通常都是因為這個概念沒有真正理解，所以我們花多一點時間在這裡。
-->

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

<!--
想像一下你在整理東西準備搬家。Working Directory 就是你現在住的房間，檔案散落各處；Staging Area 是你打包好要搬走的箱子，只有你刻意放進去的東西才在裡面；Repository 就是新家的倉庫，是最終存放的地方。三個區域全部在你自己的電腦上，不需要網路。這個「房間→箱子→倉庫」的流程，就是 git add 再 git commit 的意思。接下來我們看三個區域的詳細說明。
-->

---

# 三大區域詳解

| 區域 | 別名 | 說明 | 狀態關鍵字 |
| --- | --- | --- | --- |
| Working Directory | 工作目錄 | 你實際編輯檔案的地方 | `modified`、`untracked` |
| Staging Area | Index / 暫存區 | 準備納入下次 commit 的快照 | `staged` |
| Repository | .git 目錄 | 所有歷史 commit 的永久儲存 | `committed` |


<div style="border: 2px solid #d97706; border-radius: 12px; padding: 1.2rem 1.5rem; margin-top: 0.5rem; background: #fff8f0;">

  <div style="display:flex; align-items:center; justify-content:center; gap:0; margin-bottom:0.8rem;">
    <div style="border: 2px solid #d97706; border-radius:8px; padding:0.8rem 1rem; background:#ffffff; min-width:130px; text-align:center;">
      <div style="font-weight:700; color:#92400e;">Untracked</div>
      <div style="font-size:0.8rem; color:#b45309;">未追蹤</div>
    </div>
    <div style="display:flex; flex-direction:column; align-items:center; margin:0 0.6rem;">
      <div style="display:flex; align-items:center; gap:0.3rem;">
        <div style="font-size:0.72rem; color:#d97706; font-family:monospace;">git add</div>
        <div style="color:#d97706; font-size:1.2rem;">→</div>
      </div>
    </div>
    <div style="border: 2px solid #d97706; border-radius:8px; padding:0.8rem 1rem; background:#ffffff; min-width:130px; text-align:center;">
      <div style="font-weight:700; color:#92400e;">Staged</div>
      <div style="font-size:0.8rem; color:#b45309;">Index / 暫存區</div>
    </div>
    <div style="display:flex; flex-direction:column; align-items:center; margin:0 0.6rem;">
      <div style="display:flex; align-items:center; gap:0.3rem;">
        <div style="font-size:0.72rem; color:#d97706; font-family:monospace;">git commit</div>
        <div style="color:#d97706; font-size:1.2rem;">→</div>
      </div>
    </div>
    <div style="border: 2px solid #d97706; border-radius:8px; padding:0.8rem 1rem; background:#ffffff; min-width:130px; text-align:center;">
      <div style="font-weight:700; color:#92400e;">Committed</div>
      <div style="font-size:0.8rem; color:#b45309;">.git 目錄</div>
    </div>
  </div>

  <div style="display:flex; align-items:center; justify-content:center; gap:0;">
    <div style="border: 2px solid #d97706; border-radius:8px; padding:0.8rem 1rem; background:#ffffff; min-width:130px; text-align:center;">
      <div style="font-weight:700; color:#92400e;">Committed</div>
      <div style="font-size:0.8rem; color:#b45309;">.git 目錄</div>
    </div>
    <div style="display:flex; flex-direction:column; align-items:center; margin:0 0.6rem;">
      <div style="display:flex; align-items:center; gap:0.3rem;">
        <div style="font-size:0.72rem; color:#d97706; font-family:monospace;">修改檔案</div>
        <div style="color:#d97706; font-size:1.2rem;">→</div>
      </div>
    </div>
    <div style="border: 2px solid #d97706; border-radius:8px; padding:0.8rem 1rem; background:#ffffff; min-width:130px; text-align:center;">
      <div style="font-weight:700; color:#92400e;">Modified</div>
      <div style="font-size:0.8rem; color:#b45309;">已修改</div>
    </div>
    <div style="display:flex; flex-direction:column; align-items:center; margin:0 0.6rem;">
      <div style="display:flex; align-items:center; gap:0.3rem;">
        <div style="font-size:0.72rem; color:#d97706; font-family:monospace;">git add</div>
        <div style="color:#d97706; font-size:1.2rem;">→</div>
      </div>
    </div>
    <div style="border: 2px solid #d97706; border-radius:8px; padding:0.8rem 1rem; background:#ffffff; min-width:130px; text-align:center;">
      <div style="font-weight:700; color:#92400e;">Staged</div>
      <div style="font-size:0.8rem; color:#b45309;">Index / 暫存區</div>
    </div>
  </div>

</div>


<!--
這張表格把三個區域對應到 git status 輸出的關鍵字，建議先記下來。執行 git status 看到 modified 代表檔案在工作目錄被改了但還沒 add；staged 代表已經 add 進暫存區等待 commit；committed 代表安全存入 .git 歷史庫。下面的流程圖要特別注意那個循環：commit 之後如果你又改了檔案，它會變成 modified，得再走一次 add 到 commit 的流程，這是很多新手容易忽略的地方。接下來看 git status 的實際輸出。
-->

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


<!--
git status 是我們在用 Git 時最常執行的指令，沒有之一。不管做任何操作之前，先跑一下 git status 確認狀態，這個習慣能幫我們避免很多失誤。輸出分三個區塊：Changes to be committed 是暫存區的內容，顯示綠色；Changes not staged 是改了但還沒 add 的，紅色；Untracked files 是 Git 完全不認識的新檔案，也是紅色。Git 還很貼心地在每個區塊下方寫了下一步該執行什麼指令，非常適合新手參考。接下來進入 Git 物件模型。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 3
# Git 物件模型

<!--
第三個主題進入比較底層的概念：Git 的物件模型。很多同學會問「這個要學嗎？我只是想用 Git 管程式碼啊。」了解物件模型不是要讓大家變成 Git 工程師，而是當你遇到奇怪問題、或看到那串 SHA-1 亂碼時，你會知道它是什麼、代表什麼，不會完全摸不著頭緒。接下來看 Git 的四種物件。
-->

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


<!--
Git 把所有東西存成四種物件，每個物件用 SHA-1 雜湊值識別。Blob 只存檔案「內容」，不管檔名叫什麼；Tree 儲存目錄結構，把檔名和對應 Blob 綁在一起；Commit 是一個快照，指向當下的整棵 Tree，同時記錄作者、時間和父 commit；Tag 就像書籤，讓你用有意義的名字指向某個 commit。這個結構圖展示了 Git 怎麼用四種物件的組合還原專案的任何歷史狀態，接下來我們再仔細看 Commit 物件裡面存了什麼。
-->

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

<!--
用 git cat-file -p HEAD 可以直接看到 commit 物件的原始內容，是個很好的理解工具。你有沒有注意到 parent 這個欄位？每個 commit 都記得自己的上一個是誰，這個鏈結讓所有 commit 形成一條歷史線，在圖論上叫做有向無環圖。tree 指向這次快照的根目錄；author 和 committer 記錄誰在什麼時候建立這個 commit；最底下才是 commit 訊息。接下來我們來實際把 Git 裝起來。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 4
# 安裝 Git

<!--
理解了概念之後，讓我們來做第一件實際的事：安裝 Git。不同作業系統的安裝方式略有不同，我們三個平台都覆蓋到。如果大家已經裝好了，可以趁這個時間確認版本夠不夠新——Git 2.30 以上才有一些比較現代的指令，接下來看各平台的安裝方式。
-->

---

# 各平台安裝方式 — Windows / macOS

<div class="grid grid-cols-2 gap-8" style="margin-top: 1rem;">

<div style="background: #f0f9ff; border: 2px solid #0284c7; border-radius: 12px; padding: 1.4rem;">
  <div style="font-weight: 700; color: #0c4a6e; font-size: 1.1rem; margin-bottom: 0.8rem;">🪟 Windows</div>

```powershell
# 方法一：官方安裝包
# https://git-scm.com/download/win

# 方法二：winget（推薦）
winget install Git.Git

# 方法三：Chocolatey
choco install git
```

<div style="margin-top: 0.8rem; font-size: 0.85rem; color: #1e40af;">
💡 官方包附帶 <strong>Git Bash</strong>，後續課程會用到
</div>
</div>

<div style="background: #f0fdf4; border: 2px solid #16a34a; border-radius: 12px; padding: 1.4rem;">
  <div style="font-weight: 700; color: #14532d; font-size: 1.1rem; margin-bottom: 0.8rem;">🍎 macOS</div>

```bash
# 方法一：Homebrew（推薦）
brew install git

# 方法二：Xcode Command Line Tools
xcode-select --install

# 方法三：官方 pkg
# https://git-scm.com/download/mac
```

<div style="margin-top: 0.8rem; font-size: 0.85rem; color: #166534;">
💡 Homebrew 也管其他開發工具，值得一次裝好
</div>
</div>

</div>

<!--
Windows 推薦用 winget 或直接下載官方安裝包，官方包會順便幫你裝好 Git Bash，後面課程很常用到。macOS 推薦用 Homebrew，因為之後管理其他開發工具也會用到它，一次投資報酬率很高。安裝完記得開一個新的終端機視窗，讓環境變數生效，接下來看 Linux 的安裝方式。
-->

---

# 各平台安裝方式 — Linux

<div style="max-width: 600px; margin: 1.5rem auto 0;">
<div style="background: #fff8f0; border: 2px solid #d97706; border-radius: 12px; padding: 1.6rem;">
  <div style="font-weight: 700; color: #92400e; font-size: 1.1rem; margin-bottom: 1rem;">🐧 Linux</div>

```bash
# Debian / Ubuntu
sudo apt update && sudo apt install git

# Fedora / RHEL
sudo dnf install git

# Arch Linux
sudo pacman -S git
```

</div>
</div>

<div style="margin-top: 1.5rem; padding: 0.9rem 1.2rem; background: #fefce8; border-left: 4px solid #ca8a04; border-radius: 4px; max-width: 600px; margin-left: auto; margin-right: auto;">

根據你的發行版選對應的套件管理器即可。安裝完後開新終端機讓環境變數生效。

</div>

<!--
Linux 根據你的發行版選對應的套件管理器就好，通常預設版本就已經夠新了。安裝完之後記得打開新的終端機視窗讓環境變數生效，接下來看怎麼確認安裝成功。
-->

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


<!--
安裝好之後第一件事就是跑 git --version，確認指令可以執行而且版本夠新。版本太舊（低於 2.23）的話，像 git switch 和 git restore 這些現代指令就沒有辦法用，建議更新。Windows 使用者特別注意：Git for Windows 包含 Git Bash，這是一個模擬 Linux 終端機的工具，讓 Windows 也能執行 Unix 風格的指令。本課程之後的示範主要用 Git Bash 或 macOS Terminal，大家請確認自己的環境能執行相同指令。接下來做安裝後最重要的初始設定。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 5
# 初始設定

<!--
Git 裝好了之後，不能馬上就開始用，還有一件很重要的事要做：告訴 Git 我們是誰。這個設定只需要做一次，但如果跳過，之後每次 commit 都會出現警告，而且留下錯誤的作者資訊。讓我們花幾分鐘把它設好，接下來先看設定的三個層級。
-->

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


<!--
Git 的設定有三個層級，這個設計很實用。System 層級影響整台電腦的所有使用者，通常不動它；Global 層級影響你這個使用者的所有 repo，放姓名和 email 這類個人設定；Local 層級只影響當前這個 repo，適合放特定專案的個別設定，比如公司 repo 要用公司 email。三個層級有衝突時，越具體的設定優先。用 --list --show-origin 可以一次看到所有設定值以及來自哪個層級，對除錯很有用。接下來看安裝後一定要做的兩個設定。
-->

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


<!--
你有沒有遇過 commit 完之後發現作者寫錯了、email 是舊的公司信箱？這兩個設定是記錄在每一個 commit 物件裡面的，一旦 push 到 GitHub 或 GitLab 就變成公開紀錄，要修改非常麻煩。所以第一次設定就要設正確，包括大小寫和 email 格式都要注意。用 --global 是因為大多數情況下我們想讓所有 repo 都用同一個身份；如果特定專案要用不同 email，在那個 repo 裡用 --local 另外覆蓋就好。接下來看其他實用設定。
-->

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

<!--
設定好 user.name 和 email 之後，這幾個設定也強烈建議一起做。core.editor 決定執行 git commit 不加 -m 時會打開哪個編輯器，建議設成你熟悉的工具，不然預設可能會跳出 Vim 讓你不知道怎麼離開。init.defaultBranch main 讓新建的 repo 預設分支叫 main，這是現在業界的主流命名。core.autocrlf 是解決 Windows 和 Mac/Linux 換行符號差異的重要設定，跨平台協作一定要設對，不然每次 pull/push 都會有一堆假 diff。接下來看 alias 設定。
-->

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


<!--
Alias 是個小功能但很實用，讓你把常打的長指令縮短成幾個字母。其中 alias.lg 設定的那串 log 指令是很多老手都在用的組合：--oneline 讓每個 commit 只佔一行、--graph 畫出分支圖、--all 顯示所有分支、--decorate 顯示分支和 tag 名稱，視覺非常清楚。你也可以根據自己的習慣設定更多 alias，打造屬於自己的工作環境。接下來看怎麼查看和編輯設定檔。
-->

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


<!--
Git 設定檔是純文字 .ini 格式，用 --edit 直接用編輯器打開。設定設錯了用 --unset 刪除。
-->

---

# ~/.gitconfig 範例內容

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

<div style="margin-top: 1rem; padding: 0.8rem 1.2rem; background: #fff8f0; border-left: 4px solid #d97706; border-radius: 4px;">

設定檔用 <code>[section]</code> 分組、<code>key = value</code> 設定值。可直接手動編輯，不必透過 <code>git config</code> 指令。

</div>

<!--
看到這個範例設定檔，應該就能確認你的設定是否都到位了。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 6
# 取得說明

<!--
最後一個主題是「如何取得說明」。Git 有幾百個指令和參數，沒有人能全部記住，所以知道怎麼查文件是個很重要的技能。授人以魚不如授人以漁，學會查文件，以後自己就能探索任何不熟悉的指令。
-->

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

---

# git help — 範例輸出

**`git config -h` 輸出範例：**

```
usage: git config [<options>]

Config file location
    --global              use global config file
    --system              use system config file
    --local               use repository config file
    -f, --file <file>     use given config file
```

<div style="margin-top: 1rem; padding: 0.8rem 1.2rem; background: #fff8f0; border-left: 4px solid #d97706; border-radius: 4px;">

平常最常用 <code>-h</code>（快速查選項）；深入研究用 <code>git help</code>（完整文件）。

</div>


<!--
三種查詢方式對應不同需求。git help 會打開瀏覽器顯示完整官方文件，適合深入研究一個指令的所有用法；--help 在終端機裡顯示 man page，功能一樣但不用切換到瀏覽器；小寫的 -h 最快速，只顯示常用選項清單，適合「我大概記得這指令，只是忘了某個旗標叫什麼」的情況。平常最常用的其實是 -h，因為它快而且通常就夠了。遇到真的不熟悉的指令，再用 git help 打開完整文件細讀。接下來做個本章重點回顧。
-->

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


<!--
我們快速回顧今天學到的七個重點。版本控制解決了「檔案命名災難」和「多人協作混亂」兩大痛點；Git 的分散式架構讓每個人有完整歷史，即使離線也能工作；三大區域是理解所有 Git 操作的基礎；物件模型讓你知道 Git 怎麼儲存資料；安裝後的必要設定不要跳過；設定的三個層級讓你按需求靈活控制；遇到問題先查文件，不要猜。下一章我們就要開始動手做，把今天學到的觀念轉化成實際操作的技能！
-->

---
layout: end
---

# Ch 1 結束

### 版本控制，從 Git 開始

<Link to="home" style="margin-top: 1.5rem; display: inline-block; color: #d97706;">← 返回目錄</Link>

<!--
第一章到這裡告一段落。今天的內容偏觀念多一點，很多同學可能會覺得「還沒有動手做好像還不踏實」，這是正常的感覺。觀念紮實了，後面章節的學習效率會快很多。回去之後可以把安裝和初始設定做好，確認 git --version 可以執行、git config --global user.name 有設正確，這樣下次上課就能直接從操作開始。有任何問題歡迎隨時提問，我們下一章見！
-->
