---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
title: Git 底層原理
routeAlias: ch09
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
layout: default
---

<div class="flex flex-col justify-center items-center h-full" style="background: #ffffff;">
  <p style="color: #d97706; font-size: 1rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 1.2rem;">Git 版本控制課程</p>
  <h1 style="color: #92400e; font-size: 3.8rem; font-weight: 900; line-height: 1.15; margin-bottom: 1.5rem;">Git 底層原理</h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #d97706, #fbbf24); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #b45309; font-size: 1.15rem; font-style: italic;">「理解底層，讓操作更有把握」</p>
  <Link to="home" style="margin-top: 2rem; color: #d97706; font-size: 0.9rem;">← 返回目錄</Link>
</div>

<!--
這個章節把 Git 底層的核心概念拉出來單獨講清楚：物件模型、HEAD 指標、互動式暫存，以及分支的底層設計。這些知識不是操作 Git 的必要條件，但理解它們之後，很多「為什麼 Git 這樣運作」的問題就有了答案。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 1
# Git 物件模型

<!--
第一個主題進入比較底層的概念：Git 的物件模型。很多同學會問「這個要學嗎？我只是想用 Git 管程式碼啊。」了解物件模型不是要讓大家變成 Git 工程師，而是當你遇到奇怪問題、或看到那串 SHA-1 亂碼時，你會知道它是什麼、代表什麼，不會完全摸不著頭緒。
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
用 git cat-file -p HEAD 可以直接看到 commit 物件的原始內容，是個很好的理解工具。你有沒有注意到 parent 這個欄位？每個 commit 都記得自己的上一個是誰，這個鏈結讓所有 commit 形成一條歷史線，在圖論上叫做有向無環圖。tree 指向這次快照的根目錄；author 和 committer 記錄誰在什麼時候建立這個 commit；最底下才是 commit 訊息。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 2
# HEAD 指標深入解析

<!--
HEAD 是 Git 中最核心的概念之一，很多指令的行為都和它有關，理解 HEAD 可以讓你真正看懂 Git 在做什麼。
-->

---
layout: default
---

# HEAD 是什麼東西？

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

<!--
可以把 HEAD 想成是書籤：你現在翻到哪一頁，HEAD 就指向哪一頁。通常 HEAD 是間接指向 commit 的：HEAD → 分支 → commit hash。接下來看 HEAD 的相對表示法。
-->

---

# HEAD 的相對表示法

| 表示法 | 意思 |
| ------ | ---- |
| `HEAD` | 目前的 commit |
| `HEAD~1` 或 `HEAD^` | 前一個 commit |
| `HEAD~3` | 前三個 commit |
| `HEAD^2` | 合併 commit 的第二個父節點 |

<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fff8f0; border-left: 4px solid #d97706; border-radius: 4px;">

很多 Git 指令都用到它：`git reset HEAD~1`、`git diff HEAD`、`git log HEAD`。`.git/HEAD` 這個檔案就是實際存放這個指標的地方，直接 `cat` 出來看會讓概念更具體。

</div>

<!--
HEAD 值得花時間好好理解，因為很多 Git 指令都用到它。接下來看 Detached HEAD 是怎麼回事。
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
Detached HEAD 是很多同學第一次遇到時會嚇一跳的狀態，Git 的警告訊息也確實有點嚇人。其實概念很單純：正常情況下 HEAD 附著在某個分支上，分支再指向 commit；Detached HEAD 就是 HEAD 直接指向 commit，跳過了分支這一層。這個狀態很適合拿來看歷史——checkout 到舊 commit 看看當時的程式碼，但不要在這個狀態下做新的 commit，否則切回分支後那些 commit 就孤立了。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 3
# 互動式暫存 git add -p

<!--
git add -p 是讓 commit 更乾淨的利器，每次只 commit 一個邏輯上完整的改動，是很多有經驗的工程師共同的習慣。
-->

---
layout: default
---

# 可以只 Commit 一個檔案的部份內容嗎？

### 問題場景

你在 `index.html` 裡同時修改了 header 和 footer，但想把它們分成兩次 commit，讓歷史更清晰。

```bash
# 啟動互動式分塊選擇
git add -p index.html

# 或一次對所有改動過的檔案做選擇
git add -p
```

<!--
這是讓 Git 歷史保持乾淨的秘密武器。Git 把檔案改動切成一塊一塊的 hunk，逐一問你要不要 stage。接下來看各選項的說明。
-->

---

# git add -p：互動式分批暫存

| 選項 | 說明 |
| ---- | ---- |
| `y` | Stage 這個 hunk（變更區塊） |
| `n` | 跳過這個 hunk |
| `s` | 把這個 hunk 切成更小塊 |
| `e` | 手動編輯 hunk 內容 |
| `q` | 離開，不再詢問剩餘的 hunk |
| `?` | 顯示說明 |

<!--
開發時我們常常同時改了好幾個不相關的東西，懶得分次 commit。接下來看實際操作示範。
-->

---
layout: default
---

# git add -p 實際操作示範

<div style="margin-bottom: 1rem; padding: 0.8rem 1.2rem; background: #fff8f0; border-left: 4px solid #d97706; border-radius: 4px;">

💡 特別實用：`s`（split）可以把大 hunk 再切小，`e`（edit）可以精細到行。

</div>

```text
$ git add -p index.html
@@ -1,5 +1,5 @@
-<h1>Welcome</h1>
+<h1>Welcome to Our Site</h1>
Stage this hunk [y,n,q,a,d,s,e,?]? y   ← 選 y，stage 這塊

@@ -20,4 +20,4 @@
-<footer>Copyright 2025</footer>
+<footer>Copyright 2026</footer>
Stage this hunk [y,n,q,a,d,s,e,?]? n   ← 選 n，跳過
```

<!--
Git 逐一顯示每個 hunk，你只要按一個字母做選擇，非常直覺。接下來看兩次分開 commit 的方式。
-->

---
layout: default
---

# git add -p 實際操作示範：分次 commit

```bash
# 第一次 commit：只有 header 的改動
$ git commit -m "Update hero heading copy"

# 第二次 commit：footer 的改動
$ git add index.html
$ git commit -m "Update footer copyright year"
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">💡 <b>提示：</b> 用 <code>git diff --staged</code> 確認暫存區的內容後再 commit，確保只有想要的改動被加進去。</div>

<!--
這個習慣養成之後，git log 會變得非常漂亮：每個 commit 都是一個完整的「意圖」，以後要 cherry-pick 或 revert 某個功能也容易很多。不習慣 CLI 的同學，SourceTree 在 diff 視圖裡也支援用滑鼠選擇要 stage 的行，一樣好用。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 4
# 分支底層設計

<!--
很多人從 SVN 或其他版本控制系統轉過來，第一個驚訝的就是：Git 的分支竟然這麼快、這麼輕量。這背後有個非常優雅的設計，我們來揭開它。
-->

---

# 分支只是一個指標檔案

**Git 的分支本質上是：一個存著 commit hash 的文字檔。**

```bash
# 查看分支指標檔案
cat .git/refs/heads/main
# 輸出：a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2

cat .git/refs/heads/feature/login
# 輸出：d4e5f6g7h8i9d4e5f6g7h8i9d4e5f6g7h8i9d4e5
```

**.git/refs/heads/ 目錄結構：**

```text
.git/
└── refs/
    └── heads/
        ├── main          (40 bytes 的 SHA-1 hash)
        ├── feature/
        │   ├── login     (40 bytes)
        │   └── payment   (40 bytes)
        └── hotfix/
            └── bug-123   (40 bytes)
```

<!--
你可以打開 `.git/refs/heads/` 目錄，真的去看看那些檔案。每一個分支就是一個小文字檔，裡面只有一行：那個分支最新 commit 的 SHA-1 hash。就這樣，沒有別的了。所以所謂「建立分支」，其實就是建立一個 40 bytes 的文字檔而已。接下來我們來比較一下 Git 和 SVN 的差異。
-->

---

# 建立分支不複製任何檔案

**建立分支的代價：建立一個 40 bytes 的檔案。**

```bash
time git branch experiment/try-new-algo
# real    0m0.001s   ← 1 毫秒！
```

<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fff8f0; border-left: 4px solid #d97706; border-radius: 4px;">

**設計哲學：** Git 的分支如此輕量，正是為了讓你**毫無心理負擔地開分支**。每個小功能、每個實驗，都值得開一個分支。

</div>

<!--
SVN 的 branch 是真的複製一份目錄，大型專案建立分支可能要等很久，也占用大量空間。接下來看 Git vs SVN 的比較。
-->

---

# 建立分支：Git vs SVN

| | Git | SVN |
|--|-----|-----|
| **分支實作** | 40 bytes 的指標檔 | 複製整個目錄樹 |
| **建立速度** | 毫秒級 | 隨專案大小，可能數分鐘 |
| **儲存空間** | 幾乎零成本 | 完整複製一份 |
| **切換速度** | 快（只更新工作目錄差異） | 慢 |

<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fef3c7; border-left: 4px solid #d97706; border-radius: 4px;">

理解這一點之後，就不會再有「這個改動太小，不值得開分支」的心理負擔了。Git 的分支只是移動一個指標，這個設計讓「頻繁開分支」變成可能。

</div>

<!--
Git 的分支只是移動一個指標，這個設計讓「頻繁開分支」變成可能，也是現代開發流程的基礎。接下來看 HEAD 在分支中的角色。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 5
# HEAD 與分支追蹤

<!--
我們在切換分支的時候，Git 怎麼知道「現在在哪裡」？答案就在 `.git/HEAD` 這個檔案裡，我們來看看它是什麼。
-->

---

# HEAD 指標：你現在的位置

**HEAD 是一個特殊指標，永遠指向「你現在的位置」。**

```bash
cat .git/HEAD
# 輸出：ref: refs/heads/main
```

切換分支後：

```bash
git switch feature/login
cat .git/HEAD
# 輸出：ref: refs/heads/feature/login
```

**三層指向關係：**

```text
HEAD → refs/heads/main → a1b2c3d (commit hash)

HEAD 說：「我在 main 分支」
main 說：「我指向 commit a1b2c3d」
commit 說：「我包含這個時間點的所有檔案快照」
```

<!--
HEAD 就像是 GPS 上的「你在這裡」標記。通常 HEAD 指向一個分支名稱，那個分支名稱再指向一個 commit。這樣的設計讓 Git 知道：當你提交新 commit 時，要更新哪個分支的指標。接下來看一個特殊情況：detached HEAD。
-->

---

# Detached HEAD 簡介

**當 HEAD 直接指向一個 commit（而非分支）時，就是 detached HEAD：**

```bash
git checkout a1b2c3d    # 直接 checkout 一個 commit hash

cat .git/HEAD
# 輸出：a1b2c3d4e5f6...  ← 直接是 hash，不是 ref: refs/heads/...
```

**Git 會警告你：**

```text
You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by switching back to a branch.
```

<div style="margin-top: 1rem; padding: 1rem 1.5rem; background: #fef3c7; border-left: 4px solid #d97706; border-radius: 4px;">

**Detached HEAD 的風險：** 在此狀態下 commit，不屬於任何分支，切換分支後就「迷失」了。遇到這個警告，記得先開一個分支再操作。

</div>

<!--
Detached HEAD 聽起來很恐怖，但其實只是一種特殊狀態。在這個狀態下你可以自由瀏覽歷史，也可以做實驗性的 commit，但如果不先建立分支就切走，那些 commit 就找不到了。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Q & A

<!--
這一章深入了 Git 的底層原理，從四種物件類型（blob、tree、commit、tag）到 HEAD 和 refs 的運作機制。理解底層讓你在操作 Git 時更有把握。如果有任何疑問歡迎提出！
-->
