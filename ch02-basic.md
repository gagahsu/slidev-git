---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
title: 開始使用 Git
routeAlias: ch02
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
  <h1 style="color: #92400e; font-size: 3.8rem; font-weight: 900; line-height: 1.15; margin-bottom: 1.5rem;">開始使用 Git</h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #d97706, #fbbf24); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #b45309; font-size: 1.15rem; font-style: italic;">
    「把你的程式碼，交給 Git 來守護」
  </p>
  <Link to="home" style="margin-top: 2rem; color: #d97706; font-size: 0.9rem;">← 返回目錄</Link>
</div>

<!--
歡迎來到「開始使用 Git」這章。很多同學學 Git 都是從公司前輩說「你去裝個 Git，然後 git clone 一下」開始的，但 Git 的概念其實並不難，只是需要有人帶著你把基礎打穩。這章我們會從建立 Repository 開始，一步一步把最常用的指令和觀念都搞清楚。接下來我們先看今天的大綱。
-->

---
layout: default
---

# Outline

- **新增 Repository** — `git init`
- **基本工作流程** — `git add` / `git commit` / `git status`
- **三大工作區域** — Working Directory / Staging Area / Repository
- **檢視紀錄** — `git log`
- **【狀況題】刪除與改名** — `git rm` / `git mv`
- **【狀況題】修改 Commit** — `--amend` / `.gitkeep`
- **【狀況題】檔案忽略與查詢** — `.gitignore` / `git log -p` / `git blame`
- **【狀況題】還原與修復** — `git restore` / `git reset` / `reflog`

<!--
今天的大綱分兩大塊：前半段四個主題是最基本的工作流程，後半段是實際工作中常遇到的狀況題。為什麼要設計狀況題？因為實際工作幾乎不會每次都按照理想流程走，先把這些常見情境的應對方式學起來，會讓大家對 Git 的使用更有信心。接下來先從建立 Repository 開始。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 1
## 新增、初始 Repository

<!--
第一個主題：如何建立一個新的 Git Repository。這是所有事情的起點，沒有 Repository 就什麼都做不了。接下來我們先搞清楚 Repository 是什麼。
-->

---

# 什麼是 Repository？

Git 用一個隱藏目錄 `.git` 來記錄**所有的版本歷史**。

這個 `.git` 目錄就是所謂的「儲存庫（Repository）」。

<br>

> **整個 Git 的精華，就都在這個 `.git` 目錄裡。**

<br>

| 你看到的 | Git 實際儲存在 |
| --- | --- |
| 你的專案檔案（工作目錄） | `.git/` 隱藏目錄 |
| 每一次的 Commit 紀錄 | `.git/objects/` |
| 分支、標籤資訊 | `.git/refs/` |

<!--
很多同學會以為 Git 是把版本資料放到雲端或某個神秘的地方，其實不然。Git 所有的歷史、物件、設定，全部都在你專案目錄裡的 .git 隱藏資料夾裡面。這個設計讓 Git 可以在完全離線的狀態下運作。要注意的是，這個目錄在 macOS 和 Linux 預設是隱藏的，Windows 上需要開啟「顯示隱藏項目」才看得到。接下來我們來實際建立一個 repo。
-->

---

# `git init` — 初始化 Repository

| 指令 | 說明 |
| --- | --- |
| `git init` | 在目前目錄初始化，建立 `.git/` |
| `mkdir 目錄名 && cd 目錄名 && git init` | 建立新目錄並初始化 |

```bash
$ mkdir git-practice
$ cd git-practice
$ git init
Initialized empty Git repository in /tmp/git-practice/.git/
```

<!--
git init 就是對這個目錄說：「從現在起，你被 Git 管理了！」執行後會看到 "Initialized empty Git repository" 的訊息，代表 .git 目錄已建立成功。對於已經存在的專案，直接在專案根目錄執行 git init 就可以，Git 不會動到你現有的任何檔案。建議用 /tmp 練習，因為重開機就會自動清掉，不會留下一堆測試用的垃圾資料夾。接下來有一件事要特別叮嚀大家。
-->

---

# ⚠️ `.git` 目錄千萬不能刪除

<br>

<div style="background: #fef3c7; border-left: 4px solid #d97706; padding: 1rem 1.2rem; border-radius: 4px; margin-bottom: 1rem;">
  <strong>整個專案目錄裡，什麼檔案或目錄刪了都救得回來，<br>但 <code>.git</code> 目錄只要刪了就沒辦法了。</strong>
</div>

<br>

| 情境 | 結果 |
| --- | --- |
| 刪除專案中的一般檔案 | ✅ 可透過 Git 復原 |
| 刪除 `.git/` 目錄 | ❌ 所有版本歷史永久消失 |

<!--
.git 目錄就是整個版本控制系統的心臟，一旦刪除，所有的 commit 歷史、分支、標籤全部消失，沒有任何辦法可以復原。你有沒有聽過有人在整理目錄時誤刪了 .git 的慘劇？這種事真的發生過，請大家務必對這個目錄保持敬畏之心，永遠不要手動修改裡面的內容，除非你非常清楚自己在做什麼。接下來進入第二個主題：把檔案交給 Git。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 2
## 把檔案交給 Git 控管

<!--
有了 Repository 之後，下一步就是把我們的檔案「交給」Git 管理。這個過程比很多同學想像的多一個步驟，讓我們來看看為什麼。
-->

---

# 為什麼需要 `git add`？

Git 不會自動追蹤你的每一個改動。你需要**明確告訴 Git**哪些變更要被記錄下來。

<br>

這個「先 add 再 commit」的兩步驟設計，讓你可以：
- 把相關的改動**打包在一起**提交
- 同時修改了 5 個檔案，但只 commit 其中 3 個有意義的
- 讓每一個 Commit 都有**清楚的意義**

<br>

> 新建立的檔案在 Git 眼中是「**Untracked**（未追蹤）」狀態。

<!--
很多同學剛學 Git 時會覺得「為什麼不能直接 commit，還要多一個 add 的步驟？」其實這個設計是為了讓你有機會「精心挑選」這次要提交什麼。想像一下你同時在修 bug 和加新功能，但你希望這兩件事的 commit 是分開的——透過暫存區，你就可以先 add bug fix 的檔案 commit 一次，再 add 新功能的檔案再 commit 一次，讓歷史記錄更清楚。接下來看核心指令的對照表。
-->

---

# 核心指令：`git status` / `git add` / `git commit`

| 指令 | 說明 |
| --- | --- |
| `git status` | 查看目前工作目錄狀態 |
| `git add <檔案>` | 將指定檔案加入暫存區 |
| `git add *.html` | 用萬用字元加入多個檔案 |
| `git add .` | 加入當前目錄所有變更（最常用） |
| `git add --all` | 加入整個 repo 所有變更（含刪除） |
| `git commit -m "訊息"` | 將暫存區內容提交到儲存庫 |

<!--
這三個指令是 Git 日常使用的核心，幾乎每次 commit 都會用到。git status 是我們最好的朋友，隨時確認現在的狀態；git add 把改動「放進暫存區」；git commit 才是真正的「提交」。

這裡特別說明 git add . 和 git add --all 的差異，因為很多人搞混。git add . 只影響「目前目錄及其子目錄」的變更；git add --all（等同 git add -A）則影響整個 repo，不管你現在在哪個子目錄裡。舉個例子：你在 src/ 目錄下執行 git add .，根目錄的改動不會被加進去；但執行 git add --all 就會。在 repo 根目錄操作時兩者效果相同，但在子目錄操作時行為就不一樣了，這是最常被踩到的坑。日常開發建議用 git add .，語意清楚而且夠用；需要確認涵蓋整個 repo 時才用 --all。

commit 訊息請寫清楚，未來的你或同事看歷史記錄時會感謝現在的你。接下來看實際操作範例。
-->

---

# 核心指令：實際操作範例

```bash
$ git status
# On branch main — Untracked files: welcome.html

$ git add welcome.html
$ git commit -m "初始化專案，新增 welcome.html"
```

<!--
接下來我們專門講 commit message 的寫法，這是很多人學 Git 時忽略的一塊，但在團隊協作時非常重要。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Commit Message
# 怎麼寫才對？

<!--
Commit message 是寫給「未來的自己」和「同事」看的。它記錄了「為什麼做這個改動」，而不只是「改了什麼」——改了什麼，看 diff 就知道，message 的價值在於說明背後的原因和脈絡。
-->

---

# 為什麼 Commit Message 很重要？

<div class="grid grid-cols-2 gap-8" style="margin-top: 1rem;">
<div>

**爛 message 的 git log：**

```
* fix
* 改東西
* 測試一下
* aaa
* wip
* 終於好了
```

</div>
<div>

**好 message 的 git log：**

```
* fix: 修正登入頁 token 過期不跳轉的問題
* feat: 新增使用者頭像上傳功能
* refactor: 拆分 AuthService 降低耦合
* docs: 更新 API 認證流程說明
* chore: 升級 axios 至 1.6.0
```

</div>
</div>

<!--
大家看左邊那個 log，六個月後你能知道「fix」修了什麼嗎？「aaa」又是什麼？這些 message 在當下寫的時候覺得夠用，但只要過了一個禮拜，就算是你自己寫的也看不懂。右邊的 log 每一行都清楚說明了「做了什麼類型的改動、改了什麼、為什麼改」，這才是對自己和團隊負責任的 commit message。
-->

---

# Commit Message 格式規範

業界通用格式（Conventional Commits）：

```
<type>(<scope>): <subject>

<body>

<footer>
```

<div class="grid grid-cols-3 gap-4" style="margin-top: 1rem;">

<div style="background: #fff8f0; border: 2px solid #d97706; border-radius: 8px; padding: 0.8rem;">
  <div style="font-weight:700; color:#92400e; margin-bottom:0.4rem;">第一行（必填）</div>
  <div style="font-size:0.85rem; color:#78350f;">type + scope + subject<br>50 字以內，不加句點</div>
</div>

<div style="background: #f0fdf4; border: 2px solid #16a34a; border-radius: 8px; padding: 0.8rem;">
  <div style="font-weight:700; color:#14532d; margin-bottom:0.4rem;">Body（選填）</div>
  <div style="font-size:0.85rem; color:#166534;">空一行後說明<br>「為什麼」和「做了什麼」</div>
</div>

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 8px; padding: 0.8rem;">
  <div style="font-weight:700; color:#1e40af; margin-bottom:0.4rem;">Footer（選填）</div>
  <div style="font-size:0.85rem; color:#1d4ed8;">關聯 issue、<br>BREAKING CHANGE</div>
</div>

</div>

<!--
這個格式是從 Angular 團隊的規範演化而來，現在叫做 Conventional Commits，已經被非常多開源專案和企業團隊採用。三個部分只有第一行是必填的，body 和 footer 視情況加。第一行的格式是「type(scope): subject」，type 說明這次改動的類型，scope 說明影響範圍（可以省略），subject 是簡短描述。接下來我們看 type 有哪些選項。
-->

---

# Type 類型對照表

| Type | 說明 | 是否改程式碼 |
| --- | --- | --- |
| `feat` | 新功能 | ✅ |
| `modify` | 調整既有功能（非 bug） | ✅ |
| `fix` | 修復 Bug | ✅ |
| `refactor` | 重構（不新增功能也不修 bug） | ✅ |
| `revert` | 還原先前的 commit | ✅ |
| `docs` | 文件變更 | ❌ |
| `style` | 格式調整（不影響邏輯） | ❌ |
| `test` | 新增或修改測試 | ❌ |
| `chore` | 雜務（依賴更新、設定檔） | ❌ |

<!--
這九個 type 涵蓋了日常開發的大部分情境。其中最常用的是 feat、fix、docs、refactor 和 chore。特別注意 style 是指「程式碼格式」的調整，不是 CSS 樣式；refactor 是指在不改變功能的前提下重整程式結構。有了這個分類，光看 git log 就能快速過濾出想找的類型，比如只看 fix 的 commit 來追查 bug 引入時間。
-->

---

# Subject 第一行：寫作原則

<div style="margin-bottom: 1rem;">

| 原則 | 說明 | 範例 |
| --- | --- | --- |
| 限 50 字內 | 超過會被 GitHub 截斷 | ✅ `fix: 修正登入頁 token 驗證` |
| 用祈使句 | 描述「這個 commit 做了什麼」 | ✅ `新增` 而非 `新增了` |
| 不加句點 | 標題不需要句號 | ✅ `feat: 新增搜尋功能` |
| 用中文或英文統一 | 團隊一致即可 | 避免中英文混搭 |

</div>

<div class="grid grid-cols-2 gap-6">
<div style="background: #fef2f2; border-left: 4px solid #ef4444; border-radius: 4px; padding: 0.8rem;">

**❌ 不好的寫法**
```
fixed the bug
改了一些登入相關的東西
update
wip: 還沒完成
```

</div>
<div style="background: #f0fdf4; border-left: 4px solid #16a34a; border-radius: 4px; padding: 0.8rem;">

**✅ 好的寫法**
```
fix: 修正登入頁 token 過期不跳轉
feat: 新增第三方 OAuth 登入流程
refactor: 拆分 AuthController
```

</div>
</div>

<!--
Subject 是最重要的部分，因為這是 git log --oneline 唯一會顯示的內容。50 字的限制不是硬規定，但 GitHub 和大多數工具超過 72 字就會截斷，所以養成精簡的習慣很重要。「祈使句」的意思是：假設每個 commit message 前面都有一個隱形的「這個 commit 會…」——所以是「新增搜尋功能」而不是「新增了搜尋功能」或「我加了搜尋功能」。
-->

---

# Body 和 Footer：何時需要？

**Body — 說明「為什麼」和「怎麼做」**

```
fix: 修正使用者登出後仍可存取私有頁面的問題

原本的 JWT 驗證只檢查 token 是否存在，
沒有驗證 token 是否已被列入黑名單（登出後加入）。
改為每次請求都對 Redis 黑名單做一次查詢。

影響範圍：所有需要認證的 API endpoint。
```

**Footer — 關聯 issue 或標記破壞性變更**

```
feat: 重構使用者認證模組

BREAKING CHANGE: auth() 方法簽名改變，
需更新所有呼叫端傳入 options 物件。

Closes #142
Refs #138
```

<!--
Body 不是每次都需要寫，但遇到以下情況建議加：改動的原因不明顯、有多個方案選擇其一、有需要特別說明的副作用或影響範圍。Footer 裡的 Closes #142 在 GitHub 上有特殊效果：當這個 commit 被 merge 進主分支，對應的 issue 會自動關閉，非常方便。BREAKING CHANGE 是讓工具和協作者知道這次升級可能需要調整呼叫端的寫法。
-->

---

# 完整範例對比

<div class="grid grid-cols-2 gap-6">
<div style="background: #fef2f2; border: 2px solid #ef4444; border-radius: 8px; padding: 1rem;">

**❌ 糟糕的 commit**

```bash
git commit -m "fix bug"
git commit -m "update"  
git commit -m "ok now"
git commit -m "改了密碼功能"
git commit -m "WIP"
```

問題：
- 不知道 fix 了什麼 bug
- 不知道 update 了什麼
- 無法追蹤問題來源

</div>
<div style="background: #f0fdf4; border: 2px solid #16a34a; border-radius: 8px; padding: 1rem;">

**✅ 專業的 commit**

```bash
git commit -m \
  "fix: 修正密碼重設信件未發送的問題

  SMTP 設定在 staging 環境少了 TLS 設定，
  導致信件靜默失敗。已補上環境變數。

  Closes #87"
```

優點：
- 類型清楚（fix）
- 說明了根本原因
- 關聯對應 issue

</div>
</div>

<!--
看這個對比最直觀。左邊的 log 一個月後沒有任何參考價值；右邊的 commit 即使過了一年，你也能從訊息裡知道當時發生了什麼、為什麼這樣改、對應哪個 issue。對團隊來說，好的 commit message 是比程式碼本身更難取代的知識資產——程式碼可以重寫，但「為什麼這樣設計」的脈絡一旦遺失就很難還原。
-->

---

# 團隊實踐建議

<div style="margin-top: 0.5rem;">

| 建議 | 說明 |
| --- | --- |
| 統一語言 | 全中文或全英文，不混用 |
| 引入 commitlint | 自動檢查格式，CI 不通過就不讓 push |
| 搭配 Git hook | `commit-msg` hook 在本機就攔截不符規範的 message |
| 善用 GitHub Desktop + Copilot | GitHub Desktop 內建 Copilot 可根據 diff 自動產生 commit message |
| WIP commit 要整理 | feature branch 上可以有 WIP，merge 前用 `rebase -i` 整理 |

</div>

<div style="margin-top: 1rem; padding: 0.8rem 1.2rem; background: #fff8f0; border-left: 4px solid #d97706; border-radius: 4px;">

**一句話原則：** 寫 commit message 時，假設你的讀者是「六個月後第一次看這段歷史、完全不知道當時發生什麼的自己」。

</div>

<!--
把規範落地最有效的方式是工具化，不要靠人工自律。commitlint 可以在 CI pipeline 裡自動檢查格式，不符合就讓 PR 無法 merge；commit-msg hook 則在本機提交時就直接攔截。VS Code 的 Conventional Commits 擴充套件讓你用圖形介面選 type 和填 scope，不用記格式。WIP commit 是開發過程中的草稿，只要在合入主分支前用 rebase -i 整理成有意義的 commit，並不是問題。
-->

---

# ⚠️ `git add` 後又修改了怎麼辦？

<div style="background: #fef3c7; border-left: 4px solid #d97706; padding: 1rem 1.2rem; border-radius: 4px; margin-bottom: 1rem;">
  <strong>Git 每次 Commit 只處理「暫存區」的內容。</strong><br>
  如果 <code>git add</code> 之後又修改了檔案，必須<strong>再次 <code>git add</code></strong> 才能提交最新版本。
</div>

```bash
$ echo "Hello" > welcome.html
$ git add welcome.html       # 加入暫存區

$ echo "World" >> welcome.html  # 又修改了！

$ git commit -m "新增 welcome"
# 此時 commit 的是 "Hello" 版本，不是 "Hello\nWorld"
```

<!--
這是新手最常踩的坑。git add 之後，Git 只記住「當下那個時間點」的檔案內容，之後再改的東西不會自動進暫存區。所以 commit 之前養成習慣先跑一下 git status，看看有沒有「Changes not staged for commit」的警告，確認所有想提交的改動都已經 add 進去了。接下來正式進入三大區域的完整說明。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 3
## 工作區、暫存區與儲存庫

<!--
前面我們用了「暫存區」和「儲存庫」這些詞，現在讓我們正式介紹 Git 的三個核心區域。搞清楚這個模型之後，後面所有的指令都會豁然開朗。
-->

---

# Git 的三個區域

Git 把你的工作分成三個獨立的「空間」：

<br>

| 區域 | 英文名稱 | 說明 |
| --- | --- | --- |
| 工作目錄 | Working Directory | 你實際編輯檔案的地方 |
| 暫存區 | Staging Area / Index | 準備提交的「候車室」 |
| 儲存庫 | Repository | 正式儲存版本歷史的地方 |

<!--
三個區域是理解 Git 的最重要概念。可以這樣想：工作目錄是你家，暫存區是門口的整理箱，Repository 是正式的倉庫。你在家裡改好東西，挑選要帶出門的放進整理箱（git add），確認裝好了再搬進倉庫（git commit）。很多同學搞不懂為什麼要執行兩個指令，就是因為跳過了「整理箱」這個環節。接下來看三個區域的流動關係。
-->

---

# 三個區域的流動關係

<div style="display:flex; align-items:center; gap:0; margin:1.5em 0;">
  <div style="text-align:center; padding:0.6em 1.2em; background:#1e3a5f; border-radius:6px; border:2px solid #4a9eff; min-width:130px;">
    <div style="font-weight:700; font-size:1em; color:#fff;">工作目錄</div>
    <div style="font-size:0.75em; color:#bfdbfe; margin-top:2px;">Working Dir</div>
  </div>
  <div style="display:flex; flex-direction:column; align-items:center; flex:1; padding:0 0.3em; font-family:monospace; font-size:0.85em;">
    <div style="color:#10b981; white-space:nowrap;">── git add ──▶</div>
    <div style="color:#f59e0b; white-space:nowrap; margin-top:6px;">◀── git restore ──</div>
  </div>
  <div style="text-align:center; padding:0.6em 1.2em; background:#1e3a5f; border-radius:6px; border:2px solid #4a9eff; min-width:110px;">
    <div style="font-weight:700; font-size:1em; color:#fff;">暫存區</div>
    <div style="font-size:0.75em; color:#bfdbfe; margin-top:2px;">Staging</div>
  </div>
  <div style="display:flex; flex-direction:column; align-items:center; flex:1; padding:0 0.3em; font-family:monospace; font-size:0.85em;">
    <div style="color:#10b981; white-space:nowrap;">── git commit ──▶</div>
    <div style="color:#f59e0b; white-space:nowrap; margin-top:6px;">◀── git restore --staged ──</div>
  </div>
  <div style="text-align:center; padding:0.6em 1.2em; background:#1e3a5f; border-radius:6px; border:2px solid #4a9eff; min-width:120px;">
    <div style="font-weight:700; font-size:1em; color:#fff;">儲存庫</div>
    <div style="font-size:0.75em; color:#bfdbfe; margin-top:2px;">Repository</div>
  </div>
</div>

<br>

| 指令 | 方向 | 說明 |
| --- | --- | --- |
| `git add` | 工作目錄 → 暫存區 | 將改動放入候車室 |
| `git commit` | 暫存區 → 儲存庫 | 正式建立版本快照 |
| `git commit -a -m "msg"` | 工作目錄 → 儲存庫 | 跳過暫存區（僅限已追蹤檔案） |

<!--
從左到右是「往前走」（新增版本），從右到左是「往後退」（撤銷改動）。特別注意 git commit -a 這個捷徑：它可以跳過 git add 直接 commit，但只對「已經被 Git 追蹤過」的檔案有效，全新建立的 Untracked 檔案還是必須先 git add。建議大家平時老老實實用兩步驟，讓自己對每次 commit 的內容更有掌控感。接下來看什麼時候是 commit 的好時機。
-->

---

# 什麼時候該 Commit？

<br>

<div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 1rem 1.2rem; border-radius: 4px;">
  沒有標準答案，但以下是常見的好時機：
</div>

<br>

| 時機 | 說明 |
| --- | --- |
| 完成一個功能或修復一個 Bug | 有明確意義的改動單元 |
| 下班或離開電腦前 | 確保工作不遺失 |
| 準備嘗試風險性改動前 | 先建立安全點，方便後退 |
| 程式碼可以正常執行時 | 避免 commit 壞掉的程式 |

<!--
「什麼時候 commit」是很多同學會問的問題。沒有標準答案，但大原則是：commit 應該代表一個有意義的「工作單元」。不要一個 commit 裡面混雜了修 bug、加功能、改格式三件事；也不要每改一行就 commit 一次。一個好的 commit 讓人光看訊息就能知道這個版本做了什麼。如果你發現自己的 commit 訊息越來越難寫，可能就是改動太雜了，應該拆分。接下來進入第四個主題：檢視 commit 紀錄。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 4
## 檢視紀錄

<!--
有了 commit 之後，我們要能「回顧」這些紀錄。git log 就是 Git 的歷史書，讓我們看到專案從誕生到現在的每一個版本。
-->

---

# `git log` — 查看 Commit 歷史

| 指令 | 說明 |
| --- | --- |
| `git log` | 顯示完整 commit 歷史（新 → 舊） |
| `git log --oneline` | 每個 commit 只顯示一行（精簡） |
| `git log --graph` | 以 ASCII 圖形顯示分支結構 |
| `git log --all` | 顯示所有分支的 commit（含遠端） |
| `git log --oneline --graph --all` | 最常用的完整概覽組合 |

<!--
git log 預設從最新到最舊，每個 commit 顯示完整 SHA-1、作者、時間和 commit 訊息。但預設輸出很佔版面，所以大家常用 --oneline 來精簡顯示。--graph 在有分支的時候非常好用，可以直觀看出分支的合流關係。這三個參數組合 --oneline --graph --all 是日常工作中最常用的查看方式。接下來看實際的輸出範例。
-->

---

# `git log` 實際輸出範例

```text
$ git log --oneline --graph --all
* a3f8c12 (HEAD -> main) 修正登入頁面的 CSS 排版
* 7bd2e45 新增使用者認證功能
* 3c91f08 初始化專案結構
```

```text
$ git log
commit a3f8c12d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b (HEAD -> main)
Author: 小明 <ming@example.com>
Date:   Wed Jun 4 10:30:00 2026 +0800

    修正登入頁面的 CSS 排版
```

<!--
上面是兩種輸出格式的比較。完整 git log 包含 40 字元的 SHA-1、作者、日期和 commit 訊息；--oneline 只顯示前 7 碼的短 SHA-1 和第一行訊息，適合快速瀏覽。注意 HEAD -> main 這個標記，它告訴你目前工作在哪個 commit 上。SHA-1 是由 commit 的內容計算出來的，碰撞機率極低，幾乎可以視為唯一 ID。接下來看 git log 的進階篩選功能。
-->

---

# `git log` 進階篩選

| 指令 | 說明 |
| --- | --- |
| `git log --author="小明"` | 篩選特定作者的 commit |
| `git log --grep="登入"` | 搜尋 commit 訊息含關鍵字 |
| `git log -S "function login"` | 搜尋改動了特定程式碼的 commit |
| `git log --since="2026-01-01"` | 篩選特定日期之後的 commit |
| `git log --until="12pm"` | 篩選特定時間之前的 commit |

```bash
# 找出「誰」在「什麼時候」動了「登入」相關的程式碼
$ git log --oneline --author="小明" --grep="登入" --since="2026-01-01"
```

<style>
pre.shiki { font-size: 0.72rem !important; overflow-x: visible; white-space: pre-wrap; }
</style>

<!--
git log 其實是個功能非常強大的查詢工具，在大型專案中能快速定位「這個 bug 是誰在什麼時候引入的」。-S "keyword" 不是搜尋 commit 訊息，而是搜尋哪些 commit 實際改動了含有該字串的程式碼，debug 時非常有用。多個篩選條件可以組合使用，縮小查詢範圍。接下來進入狀況題：如何刪除檔案或變更檔名。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 5
## 【狀況題】如何在 Git 裡刪除檔案或變更檔名？

<!--
工作中常常需要刪除檔案或改名，但如果只用作業系統的指令來做，Git 可能會「看不懂」發生了什麼事。讓我們來看看正確的做法。
-->

---

# 核心觀念：刪除和改名都是「修改」

<br>

<div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 1rem 1.2rem; border-radius: 4px; margin-bottom: 1rem;">
  在 Git 裡，不管是刪除檔案或是變更檔名，對 Git 來說都是一種「<strong>修改（Modification）</strong>」，同樣需要 <code>git add</code> 後才能 <code>commit</code>。
</div>

<br>

| 動作 | Git 的解讀 |
| --- | --- |
| 刪除檔案 | 「這個檔案被移除了」→ 需要提交這個變更 |
| 改名/移動檔案 | 「舊檔案刪了 + 新檔案新增了」→ Git 會偵測為 renamed |

<!--
很多同學以為刪掉一個被 Git 追蹤的檔案，這個改動就自動被記錄了，其實不然。刪除操作跟新增、修改一樣，都需要走 add 到 commit 的流程，Git 才不管你用什麼方式刪除或改名。Git 判斷改名的方式是看「內容」：新檔案的內容跟舊檔案相似度夠高，Git 就會自動識別為 renamed，而不是 deleted + created。接下來看刪除的兩種方法。
-->

---

# 刪除檔案的兩種方法

| 方法 | 指令 | 說明 |
| --- | --- | --- |
| 方法一：OS 刪除後手動 add | `rm welcome.html` → `git add welcome.html` | 兩個步驟 |
| 方法二：直接用 git rm | `git rm welcome.html` | 一步完成，自動暫存 |
| 停止追蹤但保留檔案 | `git rm welcome.html --cached` | 從 Git 移除但不刪實體檔案 |

```bash
# 方法二（推薦）：一步到位
$ git rm welcome.html
rm 'welcome.html'

$ git status
# Changes to be committed: deleted: welcome.html

$ git commit -m "移除 welcome.html"
```

<!--
git rm 是 Git 原生的刪除指令，同時做兩件事：從工作目錄刪除實體檔案，並把刪除動作加入暫存區。比起 rm 再 git add 的兩步，用 git rm 更方便。--cached 參數特別有用，它只把檔案從 Git 追蹤中移除（讓它變成 Untracked），但不刪除實體檔案。這在你想把某個已 commit 的檔案加進 .gitignore 時非常有用：先 git rm --cached，再把它加到 .gitignore。接下來看改名的做法。
-->

---

# 變更檔名的兩種方法

| 方法 | 指令 | 說明 |
| --- | --- | --- |
| 方法一：OS mv 後 add all | `mv hello.html world.html` → `git add --all` | 兩步，Git 自動偵測為 renamed |
| 方法二：直接用 git mv | `git mv hello.html world.html` | 一步完成，直接顯示 renamed |

```bash
# 方法二（推薦）：一步到位
$ git mv hello.html world.html

$ git status
# Changes to be committed: renamed: hello.html -> world.html

$ git commit -m "將 hello.html 重新命名為 world.html"
```

<!--
改名的邏輯跟刪除一樣，git mv 是 Git 原生的移動和改名指令，效果等同於先 mv 再 git add --all。一個有趣的冷知識：Git 其實不在乎檔案叫什麼名字，它是根據「內容」來計算 SHA-1 的，所以改名的時候不會產生新的 Blob 物件，只會更新 Tree 物件。這也是為什麼 Git 能識別出改名操作。如果你既改名又改了很多內容，Git 可能識別不出來，會當成 delete + new。接下來進入狀況題：修改 commit 紀錄。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 6
## 【狀況題】修改 Commit 紀錄

<!--
你有沒有 commit 完之後發現訊息打錯字，或是寫了一些不該寫的東西想改掉？這個狀況題就是為這種時刻準備的。
-->

---

# 為什麼需要修改 Commit 紀錄？

常見情境：

<br>

| 情境 | 說明 |
| --- | --- |
| Commit 訊息打錯字 | 手殘 `git commit -m "修復登入BUf"` |
| 訊息不夠清楚 | 想補充更多說明 |
| 訊息包含不當內容 | 下班前心情差，訊息寫了情緒性字眼 |
| 格式不符合團隊規範 | 事後才發現需要加 issue 編號 |

<br>

> **修改 Commit 紀錄有多種方式，最簡單的是 `--amend`（只適用於最近一次）**

<!--
工程師有時候心情不好，會在 commit 訊息裡打出情緒性的字眼，等到要 push 之前才發現。這個狀況比想像的常見，不用問我怎麼知道。修改 commit 的方式有好幾種：--amend、git rebase -i、git reset 拆掉重 commit，還有一種非常不正確的方式——刪掉整個 .git 目錄重來，對，真的有人這樣做過。接下來看最簡單的 --amend 用法。
-->

---

# `git commit --amend` — 修改最近一次 Commit

| 指令 | 說明 |
| --- | --- |
| `git commit --amend -m "新訊息"` | 直接在指令列修改訊息 |
| `git commit --amend` | 開啟 Vim 編輯器修改訊息 |

```bash
# 發現最後一次 commit 訊息打錯了
$ git log --oneline
4879515 (HEAD -> main) 修復登入BUf   ← 這裡打錯了

$ git commit --amend -m "修復登入 Bug"
[main 614a90c] 修復登入 Bug

$ git log --oneline
614a90c (HEAD -> main) 修復登入 Bug  ← 新的 SHA-1！
```

<!--
--amend 是修改最近一次 commit 最簡單的方式。執行之後你會注意到一件事：SHA-1 值變了！這不是 bug，因為 commit 的 SHA-1 是由 commit 內容（包含訊息）計算出來的，訊息改了 SHA-1 當然也跟著變。這代表 --amend 實際上是「丟掉舊 commit、建立新 commit」，而不是真的「修改」舊的。如果這個 commit 已經 push 到遠端，修改後要 push 就必須用 force push，這會影響其他協作者，請非常謹慎。接下來看什麼情況下不應該修改 commit。
-->

---

# ⚠️ 修改已推送的 Commit 請謹慎

<br>

<div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 1rem 1.2rem; border-radius: 4px; margin-bottom: 1rem;">
  <strong>修改歷史請盡量不要使用在已經 Push 出去的 Commit 上。</strong><br>
  這可能會造成其他協作者的困擾，甚至導致他們的工作遺失。
</div>

<br>

| 狀況 | 建議做法 |
| --- | --- |
| Commit 還沒 push | 可以放心使用 `--amend` |
| Commit 已 push，只有你一個人的 repo | 可以 force push，但注意風險 |
| Commit 已 push，多人協作 | **不建議修改**，改用新 commit 補充說明 |

<!--
--amend 的黃金原則是：只對還沒有 push 出去的 commit 使用。一旦 push 到遠端，其他人可能已經在你的 commit 基礎上繼續工作了，這時候 amend 並 force push，對方在下次 pull 時就會遇到衝突，甚至搞不清楚發生了什麼事。如果是個人的 repo 而且確認沒有人用你的分支，force push 是可以接受的；多人協作的情況下，建議直接建一個新的 commit 來補充或修正。接下來看「追加檔案到最後一次 commit」這個技巧。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 7
## 【狀況題】追加檔案到最近一次的 Commit

<!--
Commit 之後才發現少 add 了一個檔案，不想為了一個小遺漏多開一個 commit 讓歷史看起來很亂？這個狀況超級常見，我們有很優雅的解法。
-->

---

# 情境：Commit 後才發現漏了檔案

<br>

<div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 1rem 1.2rem; border-radius: 4px; margin-bottom: 1rem;">
  剛完成一次 Commit，卻發現有個相關檔案忘記加進去了。<br>
  不想再開一個新的 Commit，因為這樣歷史紀錄會很瑣碎。
</div>

<br>

| 解決方案 | 說明 |
| --- | --- |
| 方案一：`git reset` | 拆掉最後一次 commit，加入後重新 commit |
| 方案二：`git commit --amend --no-edit` | 將新檔案「合併」進最後一次 commit（推薦） |

<!--
這個情境幾乎每個工程師都遇過：剛 commit 了「新增灰姑娘故事」，結果發現圖片檔案忘記 add 了。這時候有兩條路：用 git reset 把 commit 拆掉加入圖片後重新 commit，或是直接用 --amend --no-edit 把圖片追加進剛才的 commit、不改訊息。第二個方法更優雅，不需要重新輸入訊息，是我個人最推薦的做法。接下來看實際操作的指令。
-->

---

# 使用 `--amend --no-edit` 追加檔案

| 指令 | 說明 |
| --- | --- |
| `git add <遺漏的檔案>` | 把忘記加的檔案放入暫存區 |
| `git commit --amend --no-edit` | 將暫存區內容併入最後一次 commit，不修改訊息 |

```bash
# 發現漏加了 cinderella.html
$ git add cinderella.html

# 不開編輯器，訊息沿用上一次
$ git commit --amend --no-edit
[main 8a3f219] 新增灰姑娘故事

# 確認 cinderella.html 已包含在最後一次 commit
$ git show --stat HEAD
```

<!--
--no-edit 的意思是「沿用上一次的 commit 訊息，不要打開編輯器」。沒有這個參數的話，--amend 會打開 Vim 讓你修改訊息，加了就可以跳過這一步。執行後 SHA-1 同樣會改變，這是正常的。git show --stat HEAD 可以確認最新一次 commit 包含了哪些檔案的改動。同樣地，這個操作僅適用於還沒有 push 的 commit。接下來看一個大家可能沒想到的 Git 限制：空目錄的問題。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 8
## 【狀況題】新增目錄？

<!--
最後一個狀況題，也是很多同學第一次遇到時會感到困惑的問題：為什麼我建了一個空資料夾，git status 完全看不到它？
-->

---

# Git 不追蹤空目錄

<br>

<div style="background: #fef3c7; border-left: 4px solid #d97706; padding: 1rem 1.2rem; border-radius: 4px; margin-bottom: 1rem;">
  <strong>Git 只追蹤「檔案」，不追蹤「目錄」本身。</strong><br>
  一個空的目錄對 Git 來說等於「不存在」。
</div>

<br>

```bash
$ mkdir images/       # 建立空目錄

$ git status
# nothing to commit, working tree clean  ← Git 完全看不到 images/
```

<!--
Git 的物件模型中，目錄（Tree 物件）是由它包含的檔案和子目錄組成的。如果一個目錄裡面什麼都沒有，就沒辦法建立對應的 Tree 物件，所以 Git 根本不認識空目錄。這讓很多人第一次碰到時很困惑——他們建了一個 logs/ 或 uploads/ 目錄想 commit 進去，結果 git status 完全沒有反應。這是 Git 的限制，但社群有個約定俗成的解決方案，接下來我們來看。
-->

---

# 解法：在目錄內放一個 `.gitkeep` 檔案

| 步驟 | 指令 | 說明 |
| --- | --- | --- |
| 1 | `mkdir images` | 建立目錄 |
| 2 | `touch images/.gitkeep` | 在目錄內放一個空的佔位檔 |
| 3 | `git add images/.gitkeep` | 讓 Git 追蹤這個檔案（連帶追蹤目錄） |
| 4 | `git commit -m "新增 images 目錄"` | 提交 |

```bash
$ mkdir images
$ touch images/.gitkeep
$ git add images/.gitkeep
$ git commit -m "新增 images 目錄結構"

$ git status
# On branch main — nothing to commit, working tree clean ✓
```

<!--
.gitkeep 是社群約定的慣例檔名，它不是 Git 的官方功能，只是大家都同意用這個名字代表「這個目錄是空的，我只是放個佔位符讓 Git 追蹤到它」。你也可以放 .keep 或任何名字的空檔案，效果一樣。這個技巧在需要預先建立目錄結構的專案（如 logs/、uploads/、tmp/）中非常實用，讓新 clone 的人可以直接有正確的目錄結構。接下來做個小結。
-->

---

# 小結：`.gitkeep` 慣例

<br>

| 問題 | Git 的回答 |
| --- | --- |
| Git 能追蹤空目錄嗎？ | 不行，Git 只追蹤檔案 |
| 那怎麼把空目錄 commit 進去？ | 在目錄裡放一個 `.gitkeep` 空檔案 |
| `.gitkeep` 是 Git 的官方功能嗎？ | 不是，這只是社群約定的命名慣例 |
| `.gitkeep` 的檔名一定要這樣嗎？ | 不一定，任何空檔案都可以，但 `.gitkeep` 是最被廣泛接受的命名 |

<!--
空目錄問題是 Git 一個有點讓人出乎意料的行為，但了解之後就很好應對了。.gitkeep 這個名字語義清楚，任何看到它的工程師都會立刻明白「這個目錄應該被保留，只是現在是空的」。在 .gitignore 裡你也可以搭配例外規則，先 ignore 整個目錄的內容，但讓 .gitkeep 不被 ignore，這樣目錄結構就會保留、實際內容不會被 commit，是個很實用的進階技巧。接下來進入第五部分：檔案忽略與查詢。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 5
## 狀況題：檔案忽略與查詢

<!--
進入第五部分。開發過程中，有些檔案根本不該進版本庫——密碼、暫存檔、IDE 設定。另外，當我們想追查「這段程式是誰寫的」、「這個檔案改過什麼」，Git 也有專屬工具。這部分用三個實際狀況來介紹 .gitignore、git log 檔案篩選、以及 git blame，每個指令背後都有一個真實的痛點，接下來我們從第一個狀況開始。
-->

---
layout: default
---

# 狀況 9：有些檔案我不想放在 Git 裡…

### 問題場景

開發專案時，有些東西我們不希望被追蹤：

| 類型 | 例子 |
| ---- | ---- |
| 機密設定 | `secret.yml`、`.env`、`config/database.yml` |
| 編譯產物 | `*.class`、`dist/`、`__pycache__/` |
| IDE 設定 | `.idea/`、`.vscode/`、`*.suo` |
| 作業系統 | `.DS_Store`、`Thumbs.db` |
| 套件目錄 | `node_modules/`、`vendor/` |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">💡 <b>提示：</b> 把資料庫密碼或 AWS 金鑰 commit 進去是很常見的資安事故，.gitignore 是第一道防線。</div>

<!--
機密設定檔一旦推上 GitHub，就算之後刪掉，有心人還是可以從 commit 歷史撈回來，這是很常見的資安事故。IDE 產生的設定檔讓每次 git status 都亂七八糟；node_modules 動輒幾百 MB，根本不需要版控。.gitignore 就是解法，它不是在「騙」Git，而是明確告訴 Git「這些我知道，不用管它們」。接下來看 .gitignore 的語法規則。
-->

---
layout: default
---

# .gitignore 設定規則

### 語法對照

| 寫法 | 說明 |
| ---- | ---- |
| `secret.yml` | 忽略根目錄下的 secret.yml |
| `config/database.yml` | 忽略特定路徑下的檔案 |
| `*.tmp` | 忽略所有 .tmp 副檔名 |
| `/db/*.sqlite3` | 忽略 /db 目錄下所有 .sqlite3 |
| `node_modules/` | 忽略整個目錄（含子目錄） |
| `!important.log` | 例外：不忽略這個檔案 |
| `#` 開頭 | 這是註解行 |

```bash
# 建立 .gitignore
touch .gitignore

# 把 .gitignore 本身也加入版控，讓團隊共享規則
git add .gitignore
git commit -m "Add .gitignore"
```

<!--
.gitignore 的語法很直覺，但有幾個地方值得注意。目錄結尾要加斜線，這樣 Git 才知道是整個目錄；! 開頭可以做例外，比如 *.log 忽略所有 log，但 !error.log 保留 error log。.gitignore 本身一定要 commit 進去，這樣整個團隊都享有相同的忽略規則，不然每個人本地跑 git status 的結果都不一樣。接下來看各語言的常用樣板。
-->

---
layout: default
---

# .gitignore 常用樣板

### Node.js / Python / IDE 常見設定

```text
# Node.js
node_modules/
dist/
.env
.env.local
npm-debug.log*

# Python
__pycache__/
*.py[cod]
*.egg-info/
.venv/
.pytest_cache/

# IDE
.idea/
.vscode/
*.suo
.DS_Store
Thumbs.db
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">💡 <b>提示：</b> 建立新專案時，GitHub 會在 repo 建立時提供選擇 .gitignore 樣板的選項，直接套用即可。</div>

<!--
與其從零開始寫 .gitignore，直接用現成樣板更省事。GitHub 建立新 repo 時就可以直接選語言的 .gitignore 樣板，套用即可。一個好習慣是建立全域的 .gitignore_global，設定在 git config --global core.excludesfile，處理 .DS_Store 這類「因為我用 Mac」的垃圾，不用污染每個專案的 .gitignore。接下來看已追蹤的檔案怎麼處理。
-->

---
layout: default
---

# 已追蹤的檔案怎麼辦？

### .gitignore 只對「還沒被追蹤」的檔案有效

如果檔案已經被 commit 過，.gitignore 加了規則也沒用——需要手動從追蹤清單移除：

| 情境 | 指令 |
| ---- | ---- |
| 停止追蹤但保留本地檔案 | `git rm --cached <filename>` |
| 停止追蹤整個目錄 | `git rm --cached -r <dirname>/` |
| 強制加入被忽略的檔案 | `git add -f <filename>` |
| 清除所有被忽略的檔案 | `git clean -fX` |

```bash
# 假設 secret.yml 已經被 commit 過了
git rm --cached secret.yml
# 然後確認 .gitignore 裡有 secret.yml
echo "secret.yml" >> .gitignore
git commit -m "Stop tracking secret.yml"
```

<div class="mt-4 p-3 bg-red-50 border-l-4 border-red-400 text-gray-700 text-sm text-left">⚠️ <b>注意：</b> git rm --cached 只是讓 Git 「忘記」追蹤這個檔案，不會刪除你本地的實際檔案。但其他人 pull 之後，他們本地的那份檔案會被刪除。</div>

<!--
這是很多初學者踩過的坑：加了 .gitignore，但 node_modules 早就 commit 進去了，結果規則完全沒效。關鍵是：.gitignore 只對「尚未被追蹤」的檔案生效。已經在版本庫裡的檔案，要先用 git rm --cached 把它從追蹤清單移除，之後 .gitignore 才會生效。--cached 的意思是「只從 Git 索引裡刪除，不動本地檔案」，非常重要，否則你的密碼設定檔就真的不見了。接下來看怎麼查詢特定檔案的 commit 紀錄。
-->

---
layout: default
---

# 狀況 10：檢視特定檔案的 Commit 紀錄

### 問題場景

某個檔案突然壞掉，我想知道這個檔案最近改了什麼、誰改的、什麼時候改的。

### 篩選特定檔案的 Log

| 指令 | 說明 |
| ---- | ---- |
| `git log -- <file>` | 只顯示影響該檔案的 commits |
| `git log -p -- <file>` | 同上，並顯示每次的 diff |
| `git log --oneline -- <file>` | 精簡格式顯示 |
| `git log --follow -- <file>` | 追蹤檔案重新命名前的歷史 |
| `git log -S "keyword" -- <file>` | 找到新增/刪除特定字串的 commit |

```bash
# 查看 index.html 的完整修改歷史（含 diff）
git log -p --oneline -- index.html
```

<!--
當 bug 出現，第一步不是亂猜，而是查歷史。git log -- filename 的雙橫線是刻意的，告訴 Git「後面的是檔案路徑，不是分支名稱」，避免歧義。-p 選項（patch 的縮寫）把每次 commit 的實際 diff 一起秀出來，非常適合追蹤「這行是什麼時候加進來的」。--follow 處理檔案改過名字的情況，沒有它的話改名之前的歷史就查不到。接下來看實際的輸出範例。
-->

---
layout: default
---

# git log -- 實際範例

```bash
# 只列出改過 index.html 的 commits
$ git log --oneline -- index.html
a3f9d2c Update hero section layout
81bce44 Fix navigation links
d7a22b1 Initial commit
```

```bash
# 加上 -p 顯示每次改了什麼（diff）
$ git log -p -- index.html
commit a3f9d2c
Author: Alice <alice@example.com>
Date:   Mon Jun 1 10:30:00 2026

    Update hero section layout

diff --git a/index.html b/index.html
-  <h1>Welcome</h1>
+  <h1>Welcome to Our Site</h1>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">💡 <b>提示：</b> 搭配 <code>--since</code> 縮小範圍，例如 <code>git log --since="2 weeks ago" -- index.html</code>，快速鎖定最近的改動。</div>

<!--
看輸出範例讓大家知道要讀什麼。--oneline 格式是 hash + 訊息，很清楚；加上 -p 後每個 commit 會附上標準 diff 格式，- 是刪掉的行，+ 是新增的行。如果一個檔案改動次數很多，可以先用 --oneline 瀏覽清單，找到可疑的 commit 後再單獨用 git show <hash> 看完整 diff，比在海量的 -p 輸出裡翻頁有效率多了。接下來看 git blame 怎麼找到每行程式的作者。
-->

---
layout: default
---

# 狀況 11：這行程式是誰寫的？

### 問題場景

code review 發現一段奇怪的邏輯，想知道這行是誰、什麼時候加的，以便當面討論。

### git blame 指令

| 指令 | 說明 |
| ---- | ---- |
| `git blame <file>` | 顯示每行的作者與 commit 資訊 |
| `git blame -L 10,20 <file>` | 只看第 10 到 20 行 |
| `git blame -w <file>` | 忽略空白字元的改動 |
| `git blame --since="2 weeks" <file>` | 只看近期的改動 |

```bash
# 查看 index.html 每一行的來源
git blame index.html

# 只查 5 到 10 行
git blame -L 5,10 index.html
```

<!--
git blame 的名字聽起來像是在「推卸責任」，其實它的本意是「找到這行的責任人」，好讓你知道該去找誰討論。有個有趣的統計：用 git blame 最常發現的「兇手」，其實是你自己。這不是在嘲諷，而是說版本控制讓每個人的決策都有跡可循，是一種很好的自我覆盤工具。-L 選項只查特定幾行，不需要把整個檔案都列出來。接下來我們看怎麼讀 git blame 的輸出。
-->

---
layout: default
---

# 讀懂 git blame 的輸出

```text
$ git blame -L 5,10 index.html
a3f9d2c (Alice  2026-06-01 10:30:00 +0800  5)   <title>My Site</title>
81bce44 (Bob    2026-05-20 14:22:10 +0800  6)   <meta charset="UTF-8">
81bce44 (Bob    2026-05-20 14:22:10 +0800  7)   <link rel="stylesheet" href="style.css">
d7a22b1 (Alice  2026-04-10 09:15:00 +0800  8)   <script src="app.js"></script>
^d7a22b1 (Alice 2026-04-10 09:15:00 +0800  9) </head>
a3f9d2c (Alice  2026-06-01 10:30:00 +0800  10)  <body>
```

### 欄位說明

| 欄位 | 說明 |
| ---- | ---- |
| `a3f9d2c` | Commit hash（前 8 碼） |
| `(Alice ...)` | 作者姓名 + 時間 |
| `5)` | 檔案中的行號 |
| `^` 前綴 | 這行來自第一次 commit |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">💡 <b>提示：</b> 找到 commit hash 後，可以用 <code>git show a3f9d2c</code> 查看當時完整的改動脈絡，更了解為什麼這樣寫。</div>

<!--
git blame 的輸出格式很固定：最左邊是 commit hash，括號裡是作者和時間，最右邊才是實際程式碼。^ 開頭的 hash 代表這行從第一個 commit 就存在，從來沒被改動過。找到 hash 之後，用 git show <hash> 可以看到完整的 commit，包括其他檔案的改動和 commit 訊息，通常光看訊息就能理解當初為什麼這樣寫，省去很多猜測。接下來進入第六部分：還原與修復。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 6
## 狀況題：還原與修復

<!--
進入第六部分，很多同學學 Git 最想知道的就是「出錯了怎麼辦」。誤刪檔案、commit 了不想要的東西、用 --hard 把東西清掉了……這些情況幾乎都有對應的救援方式。Git 的設計讓幾乎所有的操作都是可逆的，關鍵是要知道用什麼工具。我們從最簡單的誤刪檔案開始。
-->

---
layout: default
---

# 狀況 12：啊！不小心把檔案刪掉了…

### 問題場景

執行 `rm important.html` 之後才發現刪錯了，或是用 `git rm` 不小心把已追蹤的檔案刪掉。

### 兩種誤刪情境

| 情境 | 狀態 | 救援方式 |
| ---- | ---- | -------- |
| 在 Working Directory 刪除 | Git 看到「已刪除但未暫存」 | `git restore <file>` |
| 已執行 `git rm`（進入暫存區） | Git 看到「已暫存的刪除」 | `git restore --staged <file>` 再 `git restore <file>` |
| 已 commit 的刪除 | 在歷史紀錄裡 | `git checkout HEAD~1 -- <file>` |

```bash
# 最常見：只是在工作目錄刪掉
git restore welcome.html

# 從兩個 commit 前救回
git checkout HEAD~2 welcome.html
```

<!--
誤刪檔案是最常見的「啊！」時刻之一。好消息是：只要 .git 目錄還在，幾乎都救得回來。git restore 是 Git 2.23 之後推薦的新指令，功能和以前的 git checkout -- 一樣但語意更清楚。重點是先搞清楚「刪到哪一步了」——只是用 rm 刪掉本地檔案，還是已經 git rm 進暫存區，還是已經 commit 了？不同情境的救法不一樣，不確定的話先跑 git status 看看。接下來看實際操作。
-->

---
layout: default
---

# 救回誤刪檔案：實際操作

```bash
# 情境 A：用 rm 刪掉了（只在工作目錄）
$ rm welcome.html
$ git status
    deleted: welcome.html  # 未暫存

$ git restore welcome.html  # 立刻救回
```

```bash
# 情境 B：已經 git rm（進暫存區了）
$ git rm welcome.html
$ git status
    deleted: welcome.html  # 已暫存

$ git restore --staged welcome.html  # 先退出暫存
$ git restore welcome.html           # 再還原檔案
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">💡 <b>提示：</b> 也可以用舊語法 <code>git checkout -- welcome.html</code>，效果相同。新版 Git 推薦用 <code>git restore</code>，語意更明確。</div>

<!--
兩個情境並排看會更清楚。情境 A 最簡單，一個 git restore 就解決；情境 B 稍微麻煩，要兩步：先把刪除動作從暫存區撤回（--staged），再把檔案從工作目錄還原。因為 Git 的三個區域是獨立的，救援也要對應區域來操作。如果要從更早的 commit 救回，git checkout HEAD~N -- filename 可以精準指定要取哪個版本。接下來看 git reset 的三種模式。
-->

---
layout: default
---

# 狀況 13：剛才的 Commit 後悔了，想拆掉重做

### 問題場景

commit 完才發現少了一個檔案、訊息寫錯，或是整個 commit 的內容都不對，想重來。

### git reset 的三種模式

| 模式 | 工作目錄 | 暫存區 | 說明 |
| ---- | -------- | ------ | ---- |
| `--soft` | 保留 | 保留 | 只撤銷 commit，檔案改動還在暫存區，可直接重新 commit |
| `--mixed`（預設） | 保留 | 清除 | 撤銷 commit + 清空暫存區，改動退回工作目錄 |
| `--hard` | 清除 | 清除 | 完全丟棄，commit 和所有改動都不見 |

```bash
git reset HEAD~1           # --mixed 模式（預設）
git reset HEAD~1 --soft    # 保留暫存狀態
git reset HEAD~1 --hard    # 完全清除（危險！）
```

<!--
git reset 是 Git 裡讓人又愛又怕的指令。愛是因為它很強大；怕是因為 --hard 模式真的會把東西清掉。一個記憶方式：想成「回到哪個狀態」。--soft 就是回到「剛 git add 完，準備 commit 的狀態」；--mixed 就是回到「剛改完程式碼，還沒 git add 的狀態」；--hard 就是回到「這個 commit 之前，什麼都沒做的狀態」。HEAD~1 是前一個 commit，HEAD~2 就是前兩個。接下來看實際範例。
-->

---
layout: default
---

# git reset 實際範例

```bash
# 情境：commit 完發現訊息寫錯，想重寫
$ git log --oneline
a3f9d2c (HEAD) fix bug         # 想拆掉這個
81bce44 Add new feature

# 撤銷最後一個 commit，改動退回暫存區（--soft）
$ git reset HEAD~1 --soft

# 現在可以重新 commit
$ git commit -m "修正: 正確的 commit 訊息"
```

```bash
# 情境：commit 了不該 commit 的東西，要重新整理
$ git reset HEAD~1           # --mixed，改動退回工作目錄
# 重新整理後...
$ git add 正確的檔案.txt
$ git commit -m "只 commit 該 commit 的東西"
```

<div class="mt-4 p-3 bg-red-50 border-l-4 border-red-400 text-gray-700 text-sm text-left">⚠️ <b>注意：</b> 如果這個 commit 已經 push 到遠端，reset 之後要強制 push（<code>git push --force</code>），這會影響到其他人。公共分支上慎用。</div>

<!--
--soft 最常用在「我想把最後幾個小 commit 合成一個大 commit」的情境；--mixed 適合「commit 了但發現還有東西要改」；--hard 要特別小心，改動的程式碼確實會不見，如果還沒 add 進去的修改就真的救不回來了。大原則：有 push 過的 commit，盡量不要 reset，改用 git revert 反向 commit 比較安全。接下來看 reflog，這是 Git 的終極安全網。
-->

---
layout: default
---

# 狀況 14：不小心用 --hard Reset 了，救得回來嗎？

### 好消息：Git 有 reflog 這個安全網

`git reflog` 記錄了 HEAD 的每一次移動——包括 reset、checkout、commit 等操作。

```bash
$ git reflog
657fce7 (HEAD -> master) HEAD@{0}: reset: moving to HEAD~2
e12d8ef (origin/master)  HEAD@{1}: commit: Add login feature
85e7e30                  HEAD@{2}: commit: Fix navbar style
d3c1a9b                  HEAD@{3}: commit: Initial commit
```

```bash
# 從 reflog 找到要救回的 commit hash
# 用 --hard reset 回去
$ git reset e12d8ef --hard
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">💡 <b>提示：</b> reflog 預設保留 90 天的紀錄。在這個時間內，幾乎所有的「誤操作」都有機會救回來。</div>

<!--
這是很多同學第一次看到會有種「這也行？」的驚喜感。git reset --hard 聽起來很可怕，但 Git 其實沒有真的刪掉 commit，它只是「移動了 branch 指向的位置」，讓那些 commit 暫時看不見而已。reflog 就是記錄 HEAD 每次移動的日記，透過它找到被「遺忘」的 commit hash，再用 git reset --hard 跳回去，一切就恢復了。只要在 90 天內想到要救，幾乎都沒問題。接下來看完整的救援流程。
-->

---
layout: default
---

# reflog 救援完整流程

```bash
# Step 1：確認現在狀況（發現東西不見了）
$ git log --oneline
657fce7 (HEAD -> master) Old commit  # 最新的兩個 commit 不見了！

# Step 2：查看 reflog 找到失蹤的 commit
$ git reflog
657fce7 HEAD@{0}: reset: moving to HEAD~2
e12d8ef HEAD@{1}: commit: Add login feature  # 這是我要的！
85e7e30 HEAD@{2}: commit: Fix navbar style   # 這個也要

# Step 3：reset 回去
$ git reset e12d8ef --hard

# Step 4：確認救回成功
$ git log --oneline
e12d8ef (HEAD -> master) Add login feature   # 回來了！
85e7e30 Fix navbar style
657fce7 Old commit
```

<!--
把完整流程一次秀出來，讓大家照著操作。Step 1 先確認問題，log 顯示的 commit 數量不對；Step 2 開 reflog，找到 HEAD 移動的紀錄，定位到「reset 之前」的那個 hash；Step 3 用 --hard reset 回去；Step 4 用 log 驗證。整個過程的關鍵是要冷靜，先查 reflog，不要又亂操作一通。接下來進入第七部分：兩個進階概念。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 7
## 進階概念

<!--
進入最後一部分，兩個比較底層的主題。HEAD 是 Git 中最核心的概念之一，很多指令的行為都和它有關，理解 HEAD 可以讓你真正看懂 Git 在做什麼。git add -p 則是讓 commit 更乾淨的利器，每次只 commit 一個邏輯上完整的改動，是很多有經驗的工程師共同的習慣。
-->

---
layout: default
---

# 冷知識 15：HEAD 是什麼東西？

### HEAD = Git 的「你現在在哪裡」指標

HEAD 是一個指向「目前所在位置」的指標，通常指向某個分支，而那個分支再指向最新的 commit。

```bash
# 查看 HEAD 目前指向哪裡
$ cat .git/HEAD
ref: refs/heads/master

# 切換分支後，HEAD 也跟著動
$ git checkout develop
$ cat .git/HEAD
ref: refs/heads/develop
```

| 表示法 | 意思 |
| ------ | ---- |
| `HEAD` | 目前的 commit |
| `HEAD~1` 或 `HEAD^` | 前一個 commit |
| `HEAD~3` | 前三個 commit |
| `HEAD^2` | 合併 commit 的第二個父節點 |

<!--
HEAD 值得花時間好好理解，因為很多 Git 指令都用到它——git reset HEAD~1、git diff HEAD、git log HEAD 等等。可以把 HEAD 想成是書籤：你現在翻到哪一頁，HEAD 就指向哪一頁。通常 HEAD 是間接指向 commit 的：HEAD -> 分支 -> commit hash。.git/HEAD 這個檔案就是實際存放這個指標的地方，直接 cat 出來看會讓概念更具體。接下來看 Detached HEAD 是怎麼回事。
-->

---
layout: default
---

# Detached HEAD：HEAD 脫離分支的狀態

### 什麼時候會發生？

當你直接 `git checkout <commit-hash>` 到某個具體的 commit（而不是分支名稱），HEAD 就不再指向分支，而是直接指向那個 commit——這叫做 **detached HEAD**。

```bash
# 觸發 detached HEAD
$ git checkout d7a22b1
Warning: You are in 'detached HEAD' state.

# 這時 .git/HEAD 會直接存 hash，不是 ref
$ cat .git/HEAD
d7a22b1a3f9c2e5b...

# 回到正常狀態：切回分支
$ git checkout master
# 或建立新分支來保留在這個 commit 上的改動
$ git checkout -b new-feature
```

<div class="mt-4 p-3 bg-red-50 border-l-4 border-red-400 text-gray-700 text-sm text-left">⚠️ <b>注意：</b> 在 detached HEAD 狀態下做的 commit，切回分支後會「孤立」，之後可能被 Git 的垃圾回收清掉。若要保留，記得先建立分支。</div>

<!--
Detached HEAD 是很多同學第一次遇到時會嚇一跳的狀態，Git 的警告訊息也確實有點嚇人。其實概念很單純：正常情況下 HEAD 附著在某個分支上，分支再指向 commit；Detached HEAD 就是 HEAD 直接指向 commit，跳過了分支這一層。這個狀態很適合拿來看歷史——checkout 到舊 commit 看看當時的程式碼，但不要在這個狀態下做新的 commit，否則切回分支後那些 commit 就孤立了。接下來看 git add -p 這個進階技巧。
-->

---
layout: default
---

# 狀況 16：可以只 Commit 一個檔案的部份內容嗎？

### 問題場景

你在 `index.html` 裡同時修改了 header 和 footer，但想把它們分成兩次 commit，讓歷史更清晰。

### git add -p：互動式分批暫存

```bash
# 啟動互動式分塊選擇
git add -p index.html

# 或一次對所有改動過的檔案做選擇
git add -p
```

| 選項 | 說明 |
| ---- | ---- |
| `y` | Stage 這個 hunk（變更區塊） |
| `n` | 跳過這個 hunk |
| `s` | 把這個 hunk 切成更小塊 |
| `e` | 手動編輯 hunk 內容 |
| `q` | 離開，不再詢問剩餘的 hunk |
| `?` | 顯示說明 |

<!--
這是讓 Git 歷史保持乾淨的秘密武器。開發時我們常常同時改了好幾個不相關的東西，懶得分次 commit。但等到 code review 或要找某個 bug 的時候，混在一起的 commit 就很惱人。git add -p 讓你在 add 的時候做選擇，Git 把檔案改動切成一塊一塊的 hunk，逐一問你要不要 stage。特別實用的是 s（split）可以把大 hunk 再切小，e（edit）可以精細到行。接下來看實際操作示範。
-->

---
layout: default
---

# git add -p 實際操作示範

```text
$ git add -p index.html
diff --git a/index.html b/index.html
@@ -1,5 +1,5 @@
-<h1>Welcome</h1>
+<h1>Welcome to Our Site</h1>
 <nav>...</nav>

Stage this hunk [y,n,q,a,d,s,e,?]? y   ← 選 y，stage 這塊

@@ -20,4 +20,4 @@
-<footer>Copyright 2025</footer>
+<footer>Copyright 2026</footer>

Stage this hunk [y,n,q,a,d,s,e,?]? n   ← 選 n，跳過
```

```bash
# 第一次 commit：只有 header 的改動
$ git commit -m "Update hero heading copy"

# 第二次 commit：footer 的改動
$ git add index.html
$ git commit -m "Update footer copyright year"
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">💡 <b>提示：</b> 用 <code>git diff --staged</code> 確認暫存區的內容後再 commit，確保只有想要的改動被加進去。</div>

<!--
把互動的過程視覺化展示出來，讓大家知道長什麼樣子。Git 逐一顯示每個 hunk，你只要按一個字母做選擇，非常直覺。這個習慣養成之後，git log 會變得非常漂亮：每個 commit 都是一個完整的「意圖」，以後要 cherry-pick 或 revert 某個功能也容易很多。不習慣 CLI 的同學，SourceTree 在 diff 視圖裡也支援用滑鼠選擇要 stage 的行，一樣好用。接下來我們做第一個練習。
-->

---
layout: default
---

# 練習 1：設定 .gitignore 並救回誤刪檔案

### 任務說明

建立一個練習用的 Git repo，體驗 .gitignore 和 git restore 的實際效果。

1. 建立新目錄並初始化 Git：`mkdir git-practice && cd git-practice && git init`
2. 建立兩個檔案：`touch app.js secret.yml`
3. 建立 `.gitignore`，在裡面加入 `secret.yml`
4. 執行 `git add .` 後確認 `secret.yml` 沒有被加進去（用 `git status`）
5. 只 commit `app.js` 和 `.gitignore`
6. 刪除 `app.js`：`rm app.js`
7. 用 `git restore app.js` 救回它
8. 加入 `node_modules/` 到 .gitignore，然後建立 `node_modules/test.txt`，確認它被忽略

<!--
這個練習的目的是讓大家從零開始體驗完整流程，不是只看指令。建立 repo、設定 .gitignore、commit、模擬誤刪，每個步驟都對應今天學到的概念。特別注意步驟 4：git add . 之後，git status 應該不會看到 secret.yml，如果看到了就是 .gitignore 沒設對。步驟 7 的 git restore 應該瞬間把 app.js 救回來，那個感覺會讓大家對 Git 的信心大增。接下來是解題提示。
-->

---
layout: default
---

# 練習 1：解題提示

### 提示說明

1. 建立 `.gitignore` 之前就已經存在的檔案，git add 還是會追蹤，要先確認沒有 `git add secret.yml`
2. `git status` 的輸出分三區：「要 commit 的改動」、「未暫存的改動」、「未追蹤的檔案」——學會分辨
3. `rm app.js` 之後，`git status` 應顯示 `deleted: app.js`（未暫存），這時 `git restore app.js` 就能救回
4. 建立 `node_modules/test.txt` 後，執行 `git status` 應該看不到它——如果看到，表示 `node_modules/` 規則沒生效
5. 可以用 `git check-ignore -v node_modules/test.txt` 驗證哪條規則生效了

```bash
# 驗證指令
git status                        # 確認追蹤狀態
git check-ignore -v secret.yml    # 確認忽略規則
git ls-files                      # 列出所有被追蹤的檔案
```

<!--
解題提示的重點是「怎麼驗證自己做對了」，而不是直接給答案。git check-ignore -v 是個很少人知道的好工具，可以直接告訴你哪條 .gitignore 規則讓這個檔案被忽略，以及規則在第幾行。git ls-files 列出所有被 Git 追蹤的檔案，比 git status 更直接，用它可以確認 secret.yml 真的沒有在追蹤清單裡。接下來做第二個練習：reset 和 reflog。
-->

---
layout: default
---

# 練習 2：用 reset 和 reflog 練習救援

### 任務說明

體驗 git reset 的三種模式，並練習用 reflog 救回被 --hard 掉的 commit。

1. 在上一個練習的 repo 裡，連續建立三個 commit（每次改一行 app.js）
2. 確認 `git log --oneline` 有三個 commits
3. 執行 `git reset HEAD~1 --soft`，觀察 git status 的輸出——改動應在暫存區
4. 執行 `git reset HEAD~1 --mixed`，觀察 git status——改動應在工作目錄
5. 執行 `git reset HEAD~1 --hard`，觀察 git status——改動應全部消失
6. 執行 `git reflog`，找到第三個 commit 的 hash
7. 用 `git reset <hash> --hard` 把它救回來
8. 用 `git log --oneline` 確認三個 commits 都回來了

<!--
這個練習讓大家直接感受三種 reset 模式的差異，最好的學習方式就是親自操作並觀察 git status 的變化。每次 reset 前後看一下 git log 和 git status，就能理解「commit 去哪了、改動去哪了」。步驟 6-8 的 reflog 救援是重頭戲，成功救回的瞬間會讓大家對 Git 安全性的信心大增。接下來是解題提示。
-->

---
layout: default
---

# 練習 2：解題提示

### 提示說明

1. 快速建立三個 commit 的方法：

```bash
echo "v1" > app.js && git add app.js && git commit -m "v1"
echo "v2" > app.js && git add app.js && git commit -m "v2"
echo "v3" > app.js && git add app.js && git commit -m "v3"
```

2. 每次 reset 後，記得用 `git status` 和 `cat app.js` 雙重確認
3. reflog 輸出的格式是 `<hash> HEAD@{N}: <動作描述>`，找到「commit: v3」對應的 hash
4. `git reset <hash> --hard` 後，`cat app.js` 應該顯示 `v3`，`git log --oneline` 應看到三個 commits

```bash
# 確認救援成功
$ git log --oneline
<hash3> (HEAD -> master) v3   # 應該看到這三行
<hash2> v2
<hash1> v1
```

<!--
提供快速建立三個 commit 的 one-liner，讓大家專注在練習 reset 和 reflog，而不是卡在建立測試資料。特別強調「雙重確認」——git log 看 commit 歷史，cat app.js 看實際內容，兩個一起驗證才完整。reflog 找 hash 的時候，看「動作描述」欄位最直觀，commit: v3 就是我們要找的那個。接下來做個本章總結。
-->

---
layout: default
---

# 本章總結

### 開始使用 Git：後半段重點回顧


- **.gitignore 保護機密**：建立之前就追蹤的檔案，要用 `git rm --cached` 才能停止追蹤；.gitignore 本身要 commit 進 repo 讓團隊共享

- **git log 查歷史、git blame 找責任人**：`git log -p -- <file>` 看檔案完整改動歷史；`git blame -L` 定位每行程式碼的作者與 commit

- **誤刪檔案不要慌**：`git restore <file>` 救工作目錄；`git restore --staged` 先退暫存區，再從版本庫取回

- **git reset 三種模式要記清楚**：--soft 保留暫存、--mixed 退回工作目錄、--hard 全部清除；大原則是 push 過的 commit 不要 reset

- **reflog 是終極安全網**：幾乎所有「誤操作」都能在 90 天內透過 reflog 找回；HEAD 是 Git 的位置指標，理解它讓你讀懂所有 Git 操作


<!--
總結的時候，重點不是重複每個指令，而是讓大家帶走幾個核心心態：Git 幾乎不可能搞爛，因為有 reflog；.gitignore 要越早設越好，機密絕對不能進 repo；git log 和 git blame 是調查工具，出 bug 先查歷史；reset 的三種模式理解清楚，就不會再用錯。git add -p 這個習慣養成之後，commit 歷史會乾淨很多，未來的你和你的同事都會感謝現在的你。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 附錄
# Commit Message 工具實戰

<!--
這部分是補充內容，把團隊實踐建議裡提到的四個工具一一示範安裝和使用方式：commitlint、commit-msg hook、GitHub Desktop Copilot、git rebase -i。
-->

---
layout: default
---

# commitlint — 自動檢查 message 格式

### 安裝

```bash
# 安裝 commitlint 和 Angular 規範設定
npm install --save-dev @commitlint/cli @commitlint/config-conventional
```

```js
// commitlint.config.js（建立在專案根目錄）
export default {
  extends: ['@commitlint/config-conventional'],
};
```

### 手動測試

```bash
# 測試一條 message 是否合格
echo "feat: 新增搜尋功能" | npx commitlint   # ✅ 通過
echo "update"              | npx commitlint   # ❌ 錯誤
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">💡 <b>提示：</b> commitlint 通常搭配 husky 的 commit-msg hook 一起使用，下一頁說明。</div>

<!--
commitlint 本身只是一個檢查工具，它不會主動攔截任何東西。要讓它在每次 git commit 時自動執行，需要搭配 Git hook。最常見的搭配是 husky，它負責把 commitlint 掛到 commit-msg 這個 hook 上。如果你的專案還沒有 husky，下一頁會說明怎麼設定。
-->

---
layout: default
---

# commit-msg Hook — 本機攔截不合規 message

### 使用 husky 安裝

```bash
# 安裝 husky 並初始化
npm install --save-dev husky
npx husky init

# 新增 commit-msg hook，呼叫 commitlint
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
```

### 效果示範

```bash
$ git commit -m "update something"
⧗   input: update something
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]

✖   found 2 problems, 0 warnings
husky - commit-msg script failed (code 1)
# ← commit 被攔截，未建立
```

<!--
husky 把 hook 腳本放在 .husky/ 目錄，commit-msg hook 在 git commit 建立 message 之後、正式寫入 .git 之前觸發，如果腳本回傳非 0 exit code 就攔截整個 commit。效果是：message 格式不對 → commit 直接失敗 → 開發者必須修正才能繼續。記得把 .husky/ 目錄和 commitlint.config.js 都 commit 進 repo，讓整個團隊都套用同一套規則。
-->

---
layout: default
---

# GitHub Desktop + Copilot — AI 產生 commit message

### 操作步驟

<div style="margin-top: 0.8rem;">

| 步驟 | 說明 |
| ---- | ---- |
| 1. 安裝 GitHub Desktop | 從 [desktop.github.com](https://desktop.github.com) 下載安裝 |
| 2. 登入 GitHub 帳號 | 需有 GitHub Copilot 訂閱（或 Free tier） |
| 3. 在 Changes 頁面 | 勾選要 commit 的檔案 |
| 4. 點擊 ✨ 圖示 | Summary 欄位右側的 Copilot 按鈕 |
| 5. 審閱並調整 | Copilot 根據 diff 自動產生 message，確認後 commit |

</div>

### 客製化：設定 Copilot message 風格

在 GitHub Desktop → Preferences → Integrations → Copilot 可設定：
- 語言偏好（中文 / 英文）
- 是否遵循 Conventional Commits 格式

<!--
GitHub Desktop 的 Copilot 整合是近期加入的功能，它會讀取你這次 diff 的完整內容，用 AI 推斷出一條描述準確的 commit message。對於不熟悉 Conventional Commits 格式的同學，這是一個很好的輔助工具——不只省時間，還可以拿 Copilot 產生的 message 作為範本，慢慢培養出自己寫好 message 的直覺。注意：AI 產生的 message 不是百分之百準確，一定要審閱後再 commit，不要盲目採用。
-->

---
layout: default
---

# git rebase -i — 整理 commit 歷史

在 merge 前把 WIP commits 整理成乾淨的歷史：

```bash
# 整理最近 3 個 commit
git rebase -i HEAD~3
```

### 互動介面指令

```text
pick a1b2c3 WIP: 先做到這裡
pick d4e5f6 fix typo
pick 7g8h9i 完成功能

# 常用指令：
# pick   = 保留這個 commit
# squash = 合併進上一個 commit（保留訊息）
# fixup  = 合併進上一個 commit（丟棄訊息）
# reword = 保留 commit 但修改訊息
# drop   = 完全刪除這個 commit
```

<div class="mt-4 p-3 bg-red-50 border-l-4 border-red-400 text-gray-700 text-sm text-left">⚠️ <b>注意：</b> rebase 會改寫 SHA-1，只對「還沒 push 的 commit」操作。已推送的分支不要 rebase。</div>

<!--
git rebase -i 是整理 commit 歷史最強大的工具。開發功能時在 feature branch 上可以隨意 commit，wip、fix typo、再試一次……全都沒關係，等到要 merge 或 PR review 之前，用 rebase -i 把這些草稿整理成一兩個有意義的 commit。squash 是最常用的操作，它把多個小 commit 合成一個，訊息也可以重新寫過。再次強調：只對未 push 的 commit 做 rebase，已 push 的分支 rebase 後 push 需要 force push，多人協作時會造成很大的麻煩。
-->

---
layout: default
---

# git rebase -i — squash 實際範例

```bash
$ git rebase -i HEAD~3
# 編輯器開啟，將後兩個 pick 改為 squash：

pick   a1b2c3 feat: 開始實作搜尋功能
squash d4e5f6 fix typo in search
squash 7g8h9i 補上 unit test

# 存檔關閉後，Git 會再開一次編輯器讓你寫最終 message：
# feat: 新增全文搜尋功能
#
# 實作關鍵字搜尋，支援模糊比對。
# 補上對應 unit test。
```

```bash
# 結果：三個 commit 合成一個
$ git log --oneline
b9c1d2e (HEAD -> feature/search) feat: 新增全文搜尋功能
81bce44 Add new feature
```

<!--
把流程視覺化：原本三個草稿 commit，經過 rebase -i squash 之後變成一個乾淨的 commit，message 也可以完整重寫。這是很多有經驗的工程師在做 PR 前的標準步驟，讓 reviewer 可以更清楚地理解這個 PR 做了什麼，而不是看到一堆 "wip" 和 "fix typo"。搭配前面學到的 Conventional Commits 格式，最後這個 commit 的 message 就會是標準格式，非常漂亮。
-->

---
layout: default
---

# Q & A

<div class="flex flex-col justify-center items-center h-64">
  <p style="color: #d97706; font-size: 2rem; font-weight: 700; margin-bottom: 1rem;">有任何問題嗎？</p>
  <div style="height: 3px; width: 200px; background: linear-gradient(90deg, #d97706, #fbbf24); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #78716c; font-size: 1rem;">把你的疑問都拋出來吧</p>
</div>

### 常見問題快速參考

| 問題 | 答案 |
| ---- | ---- |
| .gitignore 設了但沒效果？ | 檔案已被追蹤，用 `git rm --cached` 移除 |
| --hard reset 後悔了？ | `git reflog` 找 hash，再 reset 回去 |
| git blame 輸出太多行？ | 用 `-L 起始,結束` 限制行數範圍 |
| HEAD 跑掉了（detached）？ | `git checkout master` 或 `git checkout -b 新分支` |

<!--
Q&A 環節是很重要的消化時間，在這裡停下來讓大家把剛才操作時遇到的問題提出來。FAQ 表格是預防性的——這幾個問題在每次課都會有人問，先列出來可以節省時間，也讓沒有開口問的同學看到答案。這個環節也很適合 demo 真實遇到的錯誤，現場一起排解是很好的學習機會。
-->

---
layout: end
---
