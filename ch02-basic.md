---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
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
  <p style="color: #5eada0; font-size: 1rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 1.2rem;">
    Git 版本控制教學
  </p>
  <h1 style="color: #1a5c5c; font-size: 3.8rem; font-weight: 900; line-height: 1.15; margin-bottom: 1.5rem;">
    開始使用 Git
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「把你的程式碼，交給 Git 來守護」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
歡迎來到「開始使用 Git」這個章節。很多人學 Git 都是從公司前輩說「你去裝個 Git，然後 git clone 一下」開始的，但其實 Git 的概念並不難，只是需要有人帶著你把基礎打穩。這一章我們會從建立 Repository 開始，一步一步帶大家把最常用的指令和觀念都搞清楚。準備好了嗎？讓我們開始！
-->

---
layout: default
---

# Outline

**Part 1 — 基礎操作**

| # | 主題 |
| --- | --- |
| 1 | 新增、初始 Repository |
| 2 | 把檔案交給 Git 控管 |
| 3 | 工作區、暫存區與儲存庫 |
| 4 | 檢視紀錄 |
| 5 | 【狀況題】如何在 Git 裡刪除檔案或變更檔名？ |
| 6 | 【狀況題】修改 Commit 紀錄 |
| 7 | 【狀況題】追加檔案到最近一次的 Commit |
| 8 | 【狀況題】新增目錄？ |

**Part 2 — 進階操作**（下半部）

| # | 主題 |
| --- | --- |
| 9 | 【狀況題】有些檔案不想被 Git 控管？ |
| 10 | 查看特定檔案的修改記錄 |
| 11 | 【狀況題】等等，這行程式碼是誰寫的？ |
| 12 | 使用標籤 Tag |
| 13 | 【狀況題】SHA-1 是什麼？為什麼看起來那麼奇怪？ |
| 14 | Git 物件：Blob、Tree、Commit、Tag |
| 15 | 【狀況題】不小心 git add 了不該加的檔案？ |
| 16 | 【狀況題】Commit 之後發現有個檔案修改錯了？ |

<!--
這張是本章的整體大綱。我們今天會把前半段的 8 個主題走完。前 4 個是最基本的工作流程，後 4 個是實際工作中常遇到的「狀況題」。狀況題的設計是因為工作中常常會遇到各種突發狀況，不可能每次都按照理想流程走。先把這些常見狀況的應對方式學起來，會讓大家對 Git 的使用更有信心。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 1
## 新增、初始 Repository

<!--
第一個主題：如何建立一個新的 Git Repository。這是所有事情的起點，沒有 Repository 就什麼都做不了。
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
很多人會以為 Git 是把版本資料放到雲端或某個神秘的地方，其實不然。Git 所有的歷史、物件、設定，全部都在你專案目錄裡的 `.git` 隱藏資料夾裡。這個設計讓 Git 可以在完全離線的狀態下運作。要注意的是，這個目錄在 macOS 和 Linux 預設是隱藏的，Windows 上需要開啟「顯示隱藏項目」才看得到。
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
`git init` 就是對這個目錄說：「從現在起，你被 Git 管理了！」執行後會看到 "Initialized empty Git repository" 的訊息，代表 `.git` 目錄已建立成功。對於已經存在的專案，直接在專案根目錄執行 `git init` 就可以，Git 不會動到你現有的任何檔案。作者建議用 `/tmp` 練習，因為重開機就會自動清掉，不會留下一堆測試用的垃圾資料夾。
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
這是這個章節最重要的警告。`.git` 目錄就是整個版本控制系統的心臟，一旦刪除，所有的 Commit 歷史、分支、標籤全部灰飛煙滅，沒有任何辦法可以復原。有些人在整理目錄時誤刪了 `.git`，或是把整個 `.git` 目錄壓縮搬移時出了問題，這都是非常慘的狀況。請大家務必對這個目錄保持敬畏之心。⚠️ 永遠不要手動修改 `.git` 裡面的內容，除非你非常清楚自己在做什麼。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 2
## 把檔案交給 Git 控管

<!--
有了 Repository 之後，下一步就是把你的檔案「交給」Git 管理。這個過程比很多人想像的多一個步驟，讓我們來看看。
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
很多 Git 新手會覺得「為什麼不能直接 commit，還要多一個 add 的步驟？」這是個好問題。兩步驟的設計其實是為了讓你有機會「精心策劃」你的 commit。想像你同時在做兩件事，修 bug 和加新功能，但你希望這兩件事的 commit 是分開的。透過 staging area，你就可以先 add 跟 bug fix 相關的檔案，commit 一次，再 add 新功能的檔案，再 commit 一次，讓歷史記錄更清楚。
-->

---

# 核心指令：`git status` / `git add` / `git commit`

| 指令 | 說明 |
| --- | --- |
| `git status` | 查看目前工作目錄狀態 |
| `git add <檔案>` | 將指定檔案加入暫存區 |
| `git add *.html` | 用萬用字元加入多個檔案 |
| `git add --all` | 將所有變更（包含刪除）加入暫存區 |
| `git commit -m "訊息"` | 將暫存區內容提交到儲存庫 |

```bash
$ git status
# On branch main — Untracked files: welcome.html

$ git add welcome.html
$ git commit -m "初始化專案，新增 welcome.html"
```

<!--
這三個指令是 Git 日常使用的核心三角形，幾乎每次 commit 都會用到。`git status` 是你最好的朋友，隨時都可以用它來確認現在的狀態。`git add` 把改動「放進購物車（暫存區）」，`git commit` 才是真正的「結帳（提交）」。commit 訊息請寫清楚，未來的你（或同事）看到歷史記錄時會感謝現在的你。避免寫「改了一些東西」、「測試」這類沒有意義的訊息。
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
這是 Git 新手最常踩的坑！執行 `git add` 之後，Git 只記住了「當下那個時間點」的檔案內容。如果你之後又改了，那個改動不會自動進入暫存區。所以 commit 之前養成習慣執行 `git status`，看看有沒有「Changes not staged for commit」的警告，確認所有你想提交的改動都已經 add 進去了。⚠️ `git add .` 和 `--all` 在 Git 2.x 之後效果相同，但 `.` 的作用範圍是目前目錄，而 `--all` 是整個 repo，使用時注意位置。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 3
## 工作區、暫存區與儲存庫

<!--
前面我們用了「暫存區」和「儲存庫」這些詞，現在讓我們正式介紹 Git 的三個核心區域，搞清楚這個模型之後，後面所有的指令都會豁然開朗。
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
這個三區域模型是理解 Git 的最重要概念。作者在書中用了一個很好的比喻：暫存區像是一個「廣場」，你把想要提交的東西先搬到廣場集合，集合好了之後再一起搬進「倉庫（Repository）」。工作目錄就是你家，倉庫就是正式存放的地方，廣場（暫存區）在中間做緩衝。很多人跳過了廣場這個概念，直接想把東西從家搬到倉庫，結果就會搞不懂為什麼要執行兩個指令。
-->

---

# 三個區域的流動關係

```text
工作目錄              暫存區               儲存庫
(Working Dir)  ──git add──▶  (Staging)  ──git commit──▶  (Repository)
               ◀──git restore──          ◀──git restore --staged──
```

<br>

| 指令 | 方向 | 說明 |
| --- | --- | --- |
| `git add` | 工作目錄 → 暫存區 | 將改動放入候車室 |
| `git commit` | 暫存區 → 儲存庫 | 正式建立版本快照 |
| `git commit -a -m "msg"` | 工作目錄 → 儲存庫 | 跳過暫存區（僅限已追蹤檔案） |

<!--
這張圖是整個 Git 基本工作流程的精髓。從左到右是「往前走」（新增版本），從右到左是「往後退」（撤銷改動）。特別注意 `git commit -a` 這個捷徑：它可以跳過 `git add` 直接 commit，但只對「已經被 Git 追蹤過」的檔案有效，對全新建立的 Untracked 檔案無效。所以剛加入的新檔案還是必須先 `git add`。建議大家平時還是老老實實用兩步驟，讓自己對每次 commit 的內容更有掌控感。
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
「什麼時候 commit」是很多人會問的問題，尤其是新手。作者在書中說「這個問題沒有標準答案」，但大原則是：commit 應該代表一個有意義的「工作單元」。不要一個 commit 裡面混雜了修 bug、加功能、改格式三件事；也不要每改一行就 commit 一次。一個好的 commit 讓人光看訊息就能知道這個版本做了什麼。如果你發現自己的 commit 訊息越來越難寫，可能就是改動太雜了，應該拆分。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 4
## 檢視紀錄

<!--
有了 commit 之後，我們要能「回顧」這些紀錄。`git log` 就是 Git 的時光機目錄，讓你看到專案的完整歷史。
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
`git log` 是 Git 的「歷史書」，你可以透過它看到專案從誕生到現在每一個版本的快照。預設顯示是從最新到最舊，每個 commit 會顯示：完整的 SHA-1 雜湊值、作者、時間、以及 commit 訊息。但預設的輸出其實蠻佔版面的，所以大家常用 `--oneline` 來精簡顯示。`--graph` 則是在有分支的時候非常好用，可以直觀看出分支的合流關係。這三個參數組合在一起 `--oneline --graph --all` 是日常工作中最常用的查看方式。
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
上面是兩種輸出格式的比較。完整的 `git log` 輸出包含完整的 SHA-1（40個字元）、作者資訊、日期和完整訊息。`--oneline` 版本只顯示前 7 個字元的短 SHA-1 和第一行 commit 訊息，適合快速瀏覽。注意 `HEAD -> main` 這個標記，它告訴你目前工作在哪個 commit 上。SHA-1 雜湊值是由 commit 的內容（作者、時間、父 commit、檔案樹）計算出來的，碰撞機率極低，幾乎可以視為唯一 ID。
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

<!--
`git log` 其實是個功能非常強大的查詢工具，尤其是在大型專案中，能快速定位「這個 bug 是誰在什麼時候引入的」非常關鍵。`-S "keyword"` 俗稱「pickaxe」，它不是搜尋 commit 訊息，而是搜尋哪些 commit 實際改動了含有該字串的程式碼，在 debug 時超好用。⚠️ 小提示：多個作者篩選可以用 `--author="小明\|小華"` 的格式，在不同 shell 環境下斜線的數量可能不同，需要留意。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 5
## 【狀況題】如何在 Git 裡刪除檔案或變更檔名？

<!--
工作中常常需要刪除檔案或把檔案改名，但如果只用作業系統的指令來做，Git 可能會「看不懂」發生了什麼事。讓我們來看看正確的做法。
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
很多人以為刪掉一個被 Git 追蹤的檔案，這個改動就自動被記錄了。其實不然，刪除操作跟新增、修改一樣，都需要走「add → commit」的流程。Git 才不管你用什麼方式刪除或改名，它只關心「工作目錄的狀態」有沒有被放進暫存區。Git 判斷改名的方式其實是看「內容」：如果新檔案的內容跟被刪除的舊檔案相似度夠高，Git 就會自動識別為 renamed，而不是 deleted + created。
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
`git rm` 是 Git 原生的刪除指令，它會同時做兩件事：從工作目錄刪除實體檔案，並把這個刪除動作加入暫存區。所以比起 `rm` + `git add` 的兩步，用 `git rm` 更方便。`--cached` 參數特別有用，它只把檔案從 Git 追蹤中移除（讓它變成 Untracked），但不刪除實體檔案。這在你想把某個已 commit 的檔案加進 `.gitignore` 時非常有用：先 `git rm --cached`，再把它加到 `.gitignore`。
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
改名的邏輯跟刪除一樣，`git mv` 是 Git 原生的移動/改名指令，效果等同於先 `mv` 再 `git add --all`。一個有趣的冷知識：Git 其實不在乎檔案叫什麼名字，它是根據「內容」來計算 SHA-1 的。所以改名的時候不會產生新的 Blob 物件，只會更新 Tree 物件（目錄結構）。這也是為什麼 Git 能「識別」出改名操作，因為它看到舊內容消失、同樣的內容出現在新名字下，就判斷這是 rename。⚠️ 如果你既改名又改了很多內容，Git 可能就識別不出來，會當成 delete + new。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 6
## 【狀況題】修改 Commit 紀錄

<!--
Commit 之後才發現訊息打錯了？或者之前心情不好，在 commit 訊息裡面發洩了情緒，現在想改掉？這個狀況題就是為你準備的。
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
作者在書中用了一個很有趣的情境開場：工程師有時候心情不好，會在 commit 訊息裡打出一些情緒性的字眼，等到隔天冷靜下來或是要 push 之前才發現。這個狀況比你想像的常見，別問我怎麼知道（笑）。修改 commit 的方式有好幾種，包括 `--amend`、`git rebase -i`、`git reset` 拆掉重 commit，還有一種非常不正確的方式：刪掉整個 `.git` 目錄重來。對，真的有人這樣做。
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
`--amend` 是修改最近一次 commit 最簡單的方式。執行之後你會注意到一件事：SHA-1 值變了！從 `4879515` 變成了 `614a90c`。這不是 bug，這是 Git 的設計。因為 commit 的 SHA-1 是由「commit 內容（包含訊息）」計算出來的，訊息改了，SHA-1 當然也會跟著變。這代表 `--amend` 實際上是「丟掉舊 commit、建立一個新 commit」，而不是真的「修改」舊的 commit。⚠️ 如果這個 commit 已經 push 到遠端，修改後要 push 就必須用 force push，這會影響其他協作者，請非常謹慎！
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
`--amend` 的使用時機非常重要。黃金原則是：「只對還沒有 push 出去的 commit 使用」。一旦你把 commit push 到 GitHub 或其他遠端，其他人可能已經在你的 commit 基礎上繼續工作了。如果你這時候 amend 並 force push，對方在下次 pull 時會遭遇 conflict，甚至可能搞不清楚發生了什麼事。如果你有一個人獨立開發的個人倉庫，或是確認沒有人 clone 你的 branch，那 force push 是可以接受的。否則，建議直接建一個新的 commit 來補充說明或修正。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 7
## 【狀況題】追加檔案到最近一次的 Commit

<!--
Commit 之後才發現少 add 了一個檔案？不想為了一個小遺漏多開一個 commit 讓歷史看起來很亂？這個狀況超級常見，我們有優雅的解法。
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
這個狀況真的非常常見，幾乎每個工程師都遇過。你剛 commit 了「新增灰姑娘故事」，結果發現圖片檔案忘記 add 了。這時候有兩條路：一是用 git reset 把 commit 拆掉，加入圖片後重新 commit；二是直接用 `--amend --no-edit` 把圖片「追加」進剛才的 commit，不改訊息，乾淨俐落。第二個方法更優雅，而且不需要重新輸入 commit 訊息，是我個人最推薦的做法。
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
`--no-edit` 參數的意思是「我不想修改 commit 訊息，直接沿用上一次的」。沒有這個參數的話，執行 `--amend` 會打開 Vim 編輯器讓你修改訊息。加了 `--no-edit` 就可以跳過這一步，直接完成。執行後 SHA-1 同樣會改變（因為 commit 內容變了），這是正常的。`git show --stat HEAD` 可以用來確認最新一次 commit 包含了哪些檔案的改動。⚠️ 同樣地，這個操作僅適用於還沒有 push 的 commit，已 push 的 commit 請避免使用。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 8
## 【狀況題】新增目錄？

<!--
最後一個狀況題，也是很多人第一次遇到時會感到困惑的問題：為什麼我建了一個空資料夾，`git status` 完全看不到它？
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
這是 Git 的一個設計決策，Git 的物件模型中，目錄（Tree 物件）是由它包含的檔案和子目錄組成的。如果一個目錄裡面什麼都沒有，就沒辦法建立對應的 Tree 物件。所以 Git 根本「不認識」空目錄。這個設計讓很多人第一次碰到時很困惑，因為他們建了一個 `logs/` 或 `uploads/` 目錄，想 commit 進去，結果 `git status` 完全沒有反應。這是 Git 的「限制」，但社群有個約定俗成的解決方案。
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
`.gitkeep` 是社群約定的慣例檔名，它不是 Git 的官方功能，只是大家都同意用這個名字來代表「這個目錄是空的，我只是放個佔位符讓 Git 追蹤到它」。你其實也可以放 `.keep`、`.placeholder` 或任何名字的空檔案，效果一樣。`touch` 指令（Linux/macOS）可以建立空檔案；Windows 上可以用 `New-Item images\.gitkeep` 或 `echo $null > images\.gitkeep`。這個技巧在需要預先建立目錄結構的專案（如 `logs/`、`uploads/`、`tmp/`）中非常實用，讓新 clone 的人可以直接有正確的目錄結構。
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
我們用一張表格來做個小結。空目錄問題是 Git 一個有點讓人出乎意料的行為，但了解之後就很好應對了。`.gitkeep` 這個名字的好處是語義清楚：任何看到這個檔案的工程師都立刻明白「這個目錄應該被保留，只是現在是空的」。在 `.gitignore` 中，你可能也會需要做類似的事：先把整個目錄 ignore 掉，然後用例外規則讓 `.gitkeep` 不被 ignore，這樣目錄結構就會保留，但裡面的實際內容（如 log 檔）不會被 commit。這是個進階技巧，有機會再深入討論。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 5
## 狀況題：檔案忽略與查詢

<!-- 歡迎來到第五部分。開發過程中，有些檔案根本不該進版本庫——像是密碼、暫存檔、IDE 設定。另外，當我們想追查「這段程式是誰寫的」、「這個檔案改過什麼」，Git 也有專屬工具。這部分我們用三個實際狀況，介紹 .gitignore、git log 檔案篩選、以及 git blame。每個指令背後都有一個真實的痛點，先理解痛點，工具才會用得自然。 -->

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

<!-- 每個開發者都遇過這個問題：專案裡有太多「不該版控」的東西。機密設定檔一旦推上 GitHub，就算之後刪掉，有心人還是可以從 commit 歷史撈回來。IDE 產生的設定檔讓每次 git status 都亂七八糟。node_modules 動輒幾百 MB，根本不需要版控。解法就是 .gitignore。這不是在「騙」Git，而是明確告訴 Git：「這些我知道，不用管它們。」 -->

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

<!-- .gitignore 的語法很直覺，但有幾個地方值得注意。目錄結尾要加斜線，這樣 Git 才知道是整個目錄。! 開頭可以做例外——例如 *.log 忽略所有 log，但 !error.log 保留 error log。.gitignore 本身要 commit 進去，這樣整個團隊都享有相同的忽略規則，不然每個人本地亂跑 git status 的結果都不一樣。GitHub 有整理好各語言的 .gitignore 樣板，可以直接去 github.com/github/gitignore 取用。 -->

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

<!-- 與其從零開始寫 .gitignore，直接用現成樣板更省事。以 Node.js 為例，node_modules 幾乎每個專案都要忽略，還有各種 log 檔跟 .env 環境變數。Python 的話要忽略 __pycache__ 和虛擬環境目錄。IDE 的設定每個人不同，通常不應該版控。一個好習慣是建立全域的 .gitignore_global（設定在 git config --global core.excludesfile），處理 .DS_Store 這類「因為我用 Mac」的垃圾，不用污染專案的 .gitignore。 -->

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

<!-- 這是很多初學者踩過的坑。他們加了 .gitignore，但 node_modules 早就 commit 進去了，結果規則完全沒效。關鍵是：.gitignore 的規則只對「尚未被追蹤」的檔案生效。已經在版本庫裡的檔案，要先用 git rm --cached 把它從追蹤清單移除，之後 .gitignore 才會生效。--cached 的意思是「只從 Git 的索引裡刪除，不動本地檔案」——這很重要，否則你的密碼設定檔就真的不見了。 -->

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

<!-- 當 bug 出現，第一步不是亂猜，而是查歷史。git log -- filename 的雙橫線是刻意的：它告訴 Git「後面的是檔案路徑，不是分支名稱」，避免歧義。-p 選項（patch 的縮寫）會把每次 commit 的實際 diff 一起秀出來，等於是把所有變更一次攤開來看，非常適合追蹤「這行是什麼時候加進來的」。--follow 則是處理檔案改過名字的情況，沒有它的話，改名之前的歷史就查不到。 -->

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

<!-- 實際示範一下輸出長相，這樣大家才知道要讀什麼。git log --oneline 輸出的格式是 hash + 訊息，非常清楚。加上 -p 之後，每個 commit 後面會附上標準的 diff 格式：- 是刪掉的行，+ 是新增的行。如果一個檔案改動次數非常多，可以先用 --oneline 瀏覽 commit 清單，找到可疑的 commit 後，再單獨用 git show <hash> 看那次的完整 diff。這比在海量的 -p 輸出裡翻頁有效率多了。 -->

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

<!-- git blame 的名字聽起來很有趣，像是在「推卸責任」——其實它的本意是「找到這行的責任人」，好讓你知道該去找誰討論。輸出的每一行都會顯示 commit hash、作者名稱、時間戳記、行號和實際程式碼。-L 選項非常實用，因為你通常只想查特定幾行，不需要把整個檔案都列出來。有個有趣的事實：用 git blame 最常發現的「兇手」，其實是你自己。這不是在嘲諷，而是說版本控制讓每個人的決策都有跡可循，是一種自我成長的工具。 -->

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

<!-- 讀 git blame 的輸出需要一點練習，但格式其實很固定。最左邊是 commit hash，後面括號裡是作者和時間，最右邊才是實際的程式碼。^ 開頭的 hash 代表這行從第一個 commit 就存在，從來沒有被改動過。找到 hash 之後，用 git show <hash> 可以看到完整的 commit——包括這次改動的其他檔案、commit 訊息，以及完整的 diff。通常光是看 commit 訊息就能理解當初為什麼這樣寫，省去很多猜測。 -->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 6
## 狀況題：還原與修復

<!-- 進入第六部分——很多人學 Git 最想知道的就是「出錯了怎麼辦」。誤刪檔案、commit 了不想要的東西、用 --hard 把東西清掉了…這些情況都有對應的救援方式。Git 的設計讓幾乎所有的操作都是可逆的，關鍵是要知道用什麼工具。我們從最簡單的誤刪檔案開始，逐步到更複雜的情境。 -->

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

<!-- 誤刪檔案是最常見的「啊！」時刻之一。好消息是：只要 .git 目錄還在，幾乎都救得回來。git restore 是 Git 2.23 之後推薦的新指令，功能和以前的 git checkout -- 一樣，但語意更清楚。重點是先搞清楚「刪到哪一步了」——只是用 rm 刪掉本地檔案，還是已經 git rm 進暫存區，還是已經 commit 了？不同情境的救法不一樣。如果你不確定，git status 先看一下。 -->

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

<!-- 把兩個情境並排看會更清楚。情境 A 最簡單，一個 git restore 就解決。情境 B 稍微麻煩，要兩步：先把刪除動作從暫存區撤回（--staged），再把檔案從工作目錄還原。這是因為 Git 的三個區域（工作目錄、暫存區、版本庫）是獨立的，救援也要對應區域來操作。如果要從更早的 commit 救回，git checkout HEAD~N -- filename 讓你精準指定要取哪個版本，非常有用。 -->

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

<!-- git reset 是 Git 裡讓人又愛又怕的指令。愛是因為它很強大，可以靈活調整 commit 歷史；怕是因為 --hard 模式真的會把東西清掉。這裡教大家一個記憶方式：可以想成「回到哪個狀態」。--soft 就是回到「剛 git add 完，準備 commit 的狀態」；--mixed 就是回到「剛改完程式碼，還沒 git add 的狀態」；--hard 就是回到「這個 commit 之前，什麼都沒做的狀態」。HEAD~1 表示「回到前一個 commit」，HEAD~2 就是前兩個。 -->

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

<!-- --soft 是最安全的模式，很常用在「我想把最後幾個小 commit 合成一個大 commit」的情境。--mixed 適合「我 commit 了但發現還有東西要改」。--hard 則要特別小心——它不是真的刪除 commit（後面會說 reflog 可以救回），但改動的程式碼確實不見了，如果還沒 add 進去的修改，就真的救不回來。大原則：有 push 過的 commit，盡量不要 reset，改用 git revert 反向 commit 比較安全。 -->

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

<!-- 這是很多人第一次看到會有種「這也行？」的驚喜感。git reset --hard 聽起來很可怕，但 Git 其實沒有真的刪掉 commit——它只是「移動了 branch 指向的位置」，讓那些 commit 暫時變得「看不見」而已。reflog 就是記錄 HEAD 每次移動的日記。透過 reflog 找到被「遺忘」的 commit hash，再用 git reset --hard 跳回去，一切就恢復了。這就是為什麼說 Git 幾乎無法真正地「把東西搞爛」——只要你在 90 天內想到要救。 -->

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

<!-- 把完整流程一次秀出來，讓大家照著操作。Step 1 先確認問題——log 顯示的 commit 不對。Step 2 開 reflog，找到 HEAD 移動的紀錄，定位到「reset 之前」的那個 commit hash。Step 3 用 --hard reset 回去。Step 4 用 log 驗證。整個過程很簡單，但關鍵是要冷靜，先查 reflog，不要又亂操作一通。另外補充：git log -g 可以用接近 log 的格式顯示 reflog，也是一個選項。 -->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 7
## 進階概念

<!-- 進入最後一部分，兩個比較底層的主題。HEAD 是 Git 中最核心的概念之一，很多指令的行為都和 HEAD 有關，理解它可以讓你真正看懂 Git 在做什麼。git add -p 則是一個讓你的 commit 更乾淨、更有意義的利器——每次只 commit 一個「邏輯上完整的改動」，是 Git 高手的共同習慣。 -->

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

<!-- HEAD 這個概念值得花時間好好理解，因為很多 Git 指令都用到它——git reset HEAD~1、git diff HEAD、git log HEAD 等等。可以把 HEAD 想成是書籤：你現在翻到哪一頁，HEAD 就指向哪一頁。通常 HEAD 是間接指向 commit 的：HEAD -> master branch -> commit hash。.git/HEAD 這個檔案就是實際存放這個指標的地方，直接 cat 出來看會讓概念更具體。HEAD~1 和 HEAD^ 都是「前一個 commit」的意思，日常使用基本上等價。 -->

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

<!-- Detached HEAD 是很多人第一次遇到時會嚇一跳的狀態，Git 的警告訊息也確實有點嚇人。但其實概念很單純：正常情況下 HEAD 是「附著」在某個分支上的，分支再指向 commit。Detached HEAD 就是 HEAD 直接指向 commit，跳過了分支這一層。這個狀態很適合拿來「看歷史」——你可以 checkout 到某個舊 commit 看看當時的程式碼是什麼樣，但不要在這個狀態下做新的 commit，除非你記得先 git checkout -b 開一個新分支來承接它。 -->

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

<!-- 這是讓 Git 歷史保持乾淨的秘密武器。開發時我們常常同時改了好幾個不相關的東西，懶得分次 commit。但等到 code review 或要找某個 bug 的時候，混在一起的 commit 就很惱人。git add -p 讓你在 add 的時候就做選擇——Git 會把檔案的改動切成一塊一塊的 hunk，逐一問你要不要 stage。特別實用的是 s（split）選項，可以把一個大 hunk 再切小；還有 e（edit）可以精細到行，手動決定要 stage 哪幾行。 -->

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

<!-- 把互動的過程視覺化展示出來，這樣大家就知道長什麼樣子。Git 會逐一顯示每個 hunk，你只要按一個字母做選擇，非常直覺。這個習慣養成之後，你的 git log 會變得非常漂亮：每個 commit 都是一個完整的「意圖」，以後要 cherry-pick 或 revert 某個功能也容易很多。SourceTree 也支援類似的操作，在 diff 視圖裡可以用滑鼠選擇要 stage 的行，對不習慣 CLI 的人很友好。 -->

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

<!-- 這個練習的目的是讓大家從零開始體驗完整流程，不是只看指令。建立 repo、設定 .gitignore、commit、然後模擬誤刪——每個步驟都對應今天學到的概念。特別注意步驟 4：git add . 之後，git status 應該不會看到 secret.yml。如果看到了，就是 .gitignore 沒設對，要回去確認。步驟 7 的 git restore 應該瞬間把 app.js 救回來，這個「魔法瞬間」會讓大家對 Git 的信心大增。 -->

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

<!-- 解題提示的重點是「怎麼驗證自己做對了」，而不是直接給答案。git check-ignore -v 是個很少人知道的好工具，可以直接告訴你哪條 .gitignore 規則讓這個檔案被忽略，以及規則在第幾行。git ls-files 列出所有被 Git 追蹤的檔案，比 git status 更直接——用它可以確認「secret.yml 真的沒有在追蹤清單裡」。 -->

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

<!-- 這個練習設計來讓大家直接感受三種 reset 模式的差異——最好的學習方式就是親自操作並觀察 git status 的變化。每次 reset 前後都看一下 git log 和 git status，就能理解「commit 去哪了、改動去哪了」。步驟 6-8 的 reflog 救援是重頭戲，成功救回的瞬間會讓大家對 Git 安全性的信心大增。這也是本章最重要的心理建設：Git 幾乎是不可能真的搞爛的。 -->

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

<!-- 提供快速建立三個 commit 的 one-liner，讓大家專注在練習 reset 和 reflog，而不是卡在建立測試資料。強調「雙重確認」——git log 看 commit 歷史，cat app.js 看實際內容，兩個一起驗證才完整。reflog 找 hash 的時候，看「動作描述」欄位最直觀：commit: v3 就是我們要找的那個。 -->

---
layout: default
---

# 本章總結

### 開始使用 Git：後半段重點回顧

<v-clicks>

- **.gitignore 保護機密**：建立之前就追蹤的檔案，要用 `git rm --cached` 才能停止追蹤；.gitignore 本身要 commit 進 repo 讓團隊共享

- **git log 查歷史、git blame 找責任人**：`git log -p -- <file>` 看檔案完整改動歷史；`git blame -L` 定位每行程式碼的作者與 commit

- **誤刪檔案不要慌**：`git restore <file>` 救工作目錄；`git restore --staged` 先退暫存區，再從版本庫取回

- **git reset 三種模式要記清楚**：--soft 保留暫存、--mixed 退回工作目錄、--hard 全部清除；大原則是 push 過的 commit 不要 reset

- **reflog 是終極安全網**：幾乎所有「誤操作」都能在 90 天內透過 reflog 找回；HEAD 是 Git 的位置指標，理解它讓你讀懂所有 Git 操作

</v-clicks>

<!-- 總結的時候，重點不是重複每個指令，而是讓大家帶走幾個核心心態：Git 幾乎不可能搞爛，因為有 reflog。.gitignore 要越早設越好，機密絕對不能進 repo。git log 和 git blame 是調查工具，出 bug 先查歷史。reset 的三種模式理解清楚，就不會再用錯。還有 git add -p 這個習慣，養成之後你的 commit 歷史會乾淨很多，以後的自己（和你的同事）都會感謝你。 -->

---
layout: default
---

# Q & A

<div class="flex flex-col justify-center items-center h-64">
  <p style="color: #5eada0; font-size: 2rem; font-weight: 700; margin-bottom: 1rem;">有任何問題嗎？</p>
  <div style="height: 3px; width: 200px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #78716c; font-size: 1rem;">把你的疑問都拋出來吧</p>
</div>

### 常見問題快速參考

| 問題 | 答案 |
| ---- | ---- |
| .gitignore 設了但沒效果？ | 檔案已被追蹤，用 `git rm --cached` 移除 |
| --hard reset 後悔了？ | `git reflog` 找 hash，再 reset 回去 |
| git blame 輸出太多行？ | 用 `-L 起始,結束` 限制行數範圍 |
| HEAD 跑掉了（detached）？ | `git checkout master` 或 `git checkout -b 新分支` |

<!-- Q&A 環節是很重要的消化時間。建議在這裡停下來，讓學員把剛才操作時遇到的問題提出來。FAQ 表格是預防性的——這幾個問題在每次上課都會有人問，先列出來可以節省時間，也讓沒有開口問的人看到答案。這個環節也適合 demo 學員遇到的真實錯誤，現場排解是很好的學習機會。 -->

---
layout: end
---
