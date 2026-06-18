---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
title: 標籤
routeAlias: ch05
layout: default
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
  .slidev-layout:not(.new-section) {
    background: #ffffff !important;
  }
---

<div class="flex flex-col justify-center items-center h-full" style="background: #ffffff;">
  <p style="color: #d97706; font-size: 1rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 1.2rem;">Git 版本控制課程</p>
  <h1 style="color: #92400e; font-size: 3.8rem; font-weight: 900; line-height: 1.15; margin-bottom: 1.5rem;">標籤</h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #d97706, #fbbf24); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #b45309; font-size: 1.15rem; font-style: italic;">「為重要的時刻留下永久的書籤」</p>
  <Link to="home" style="margin-top: 2rem; color: #d97706; font-size: 0.9rem;">← 返回目錄</Link>
</div>

<!--
想像一下書架上那本你最喜歡的書，你在最精彩的那一頁夾了一張書籤。標籤在 Git 裡做的就是這件事——幫特定的 commit 留下一個永久的記號。這章節不長，但在實務上非常重要，接下來我們一起看。
-->

---
layout: default
---

# Outline

- **使用標籤** — git tag / lightweight tag / annotated tag / 推送標籤
- **【冷知識】標籤跟分支有什麼不一樣？** — 固定指標 vs 移動指標

<!--
這章分兩塊。第一塊是實作：怎麼建立、查看、刪除標籤，以及推送到遠端。第二塊是原理：標籤和分支在 Git 底層的差異。第二個主題很多教學跳過不講，但搞懂了你對 Git 的掌握度會直接拉高一個層次。接下來我們從第一塊開始。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 1
## 使用標籤

<!--
第一個主題：標籤的實際使用。我們會從標籤是什麼開始，然後認識兩種標籤類型，最後看怎麼跟遠端同步。
-->

---

# 什麼是 Tag？

Tag 就像是在特定的 Commit 上貼一張**永久的便利貼**。

<br>

最常見的用途就是**標記版本號**：

| Tag 名稱 | 代表意義 |
| --- | --- |
| `v1.0.0` | 第一個正式版本 |
| `v2.1.3` | 第二個主版本的第一個次版本的第三個修補版本 |
| `v3.0.0-beta.1` | 第三個主版本的第一個 beta 測試版 |

<br>

<div style="background: #fff8f0; border-left: 4px solid #d97706; padding: 1rem 1.5rem; border-radius: 4px;">
  版本號通常遵循 <strong>Semantic Versioning（語意化版本）</strong>規範：<br>
  <code>主版本號.次版本號.修補版本號</code>（Breaking.Feature.Patch）
</div>

<!--
你有沒有在下載軟體時看過 v1.2.3 這樣的版本號？這就是 Semantic Versioning——主版本號代表有破壞性變更，次版本號代表新功能但向下相容，修補版本號代表 bug fix。很多開源套件和 npm 套件都用這個規範。我們打標籤的時候，通常就是在標記這些正式發布的版本號。接下來我們看 Git 提供哪兩種標籤類型。
-->

---

# 兩種標籤類型

Git 有兩種標籤，差別在於儲存的資訊量：

<br>

| 類型 | 指令 | 儲存內容 |
| --- | --- | --- |
| **Lightweight Tag**（輕量標籤） | `git tag v1.0` | 只是一個指向 commit 的指標 |
| **Annotated Tag**（附註標籤） | `git tag -a v1.0 -m "..."` | 獨立的 Git 物件，含作者、日期、訊息 |

<br>

```bash
# Lightweight Tag — 快速打個標籤，不需要附加說明
$ git tag v1.0

# Annotated Tag — 正式版本發布，建議一律用這種
$ git tag -a v1.0 -m "Release v1.0: 第一個正式版本"
```

<br>

<div style="background: #fff8f0; border-left: 4px solid #d97706; padding: 1rem 1.5rem; border-radius: 4px;">
  正式發布版本請使用 <strong>Annotated Tag</strong>，它記錄了「誰」在「何時」打了這個標籤，對追蹤負責人非常有用。
</div>

<!--
兩種標籤的差別就像在書頁上夾便利貼跟直接蓋印章。Lightweight tag 很輕，就是 `.git/refs/tags/` 裡一個只有一行 hash 的純文字檔。Annotated tag 是完整的 Git 物件，記錄了打標籤者的姓名、email、日期和說明。GitHub 的 Releases 頁面顯示的就是 annotated tag 的資訊，所以要正式發版，請養成用 annotated tag 的習慣。
-->

---

# 對過去的 Commit 打標籤

不一定要對「最新的」Commit 打標籤，可以補打歷史上任意一個。

<br>

```bash
# 先查看歷史，找到你想標記的 commit
$ git log --oneline
a4b8c2d (HEAD -> main) 修正登入頁面 bug
9f3e1a5 新增購物車功能
3c7d2b1 完成使用者認證
1a2b3c4 初始化專案

# 對過去的 commit 補打標籤
$ git tag v1.0 3c7d2b1
$ git tag -a v0.9 1a2b3c4 -m "Beta release"
```

<br>

<div style="background: #fff8f0; border-left: 4px solid #d97706; padding: 1rem 1.5rem; border-radius: 4px;">
  指定 commit hash 時可以只寫前幾個字元，Git 會自動找到對應的 commit（通常 7 個字元就夠了）。
</div>

<!--
你有沒有遇過發布當天太忙，忘記打標籤，事後才想到的情況？沒關係，只要知道那個 commit 的 hash，隨時都可以補打。`git log --oneline` 先找到目標，然後把 hash 加在 tag 指令後面就行了。hash 不用寫完整的 40 個字元，通常前 7-8 個字元就夠 Git 唯一識別了。接下來看怎麼查看和管理這些標籤。
-->

---

# 查看標籤

```bash
# 列出所有標籤（按字母順序排列）
$ git tag
v0.9
v1.0
v1.1
v2.0

# 用萬用字元篩選
$ git tag -l "v1.*"
v1.0
v1.1

# 查看 annotated tag 的詳細資訊
$ git show v1.0
tag v1.0
Tagger: Alice <alice@example.com>
Date:   Mon Jun  1 10:30:00 2026 +0800

Release v1.0: 第一個正式版本
```

<!--
`git tag` 不帶參數就列出全部標籤。`git tag -l` 加萬用字元可以篩選，例如只看 v1.x 系列。`git show <tag>` 對 annotated tag 很有用，可以看到完整的打標籤資訊。接下來看刪除標籤的方式。
-->

---

# 刪除標籤

```bash
# 刪除本地標籤
$ git tag -d v0.9
Deleted tag 'v0.9' (was 1a2b3c4)

# 刪除遠端標籤
$ git push origin --delete v0.9
```

<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fef3c7; border-left: 4px solid #d97706; border-radius: 4px;">

**注意：** `git tag -d` 只刪除本地端。遠端的標籤要另外用 `git push origin --delete <tag>` 處理，兩步驟缺一不可。

</div>

<!--
注意 `git tag -d` 只刪除本地端，遠端的標籤要另外處理。接下來我們看推送標籤的部分。
-->

---

# 推送標籤到遠端

<div style="background: #fef3c7; border-left: 4px solid #d97706; padding: 1rem 1.2rem; border-radius: 4px; margin-bottom: 1rem;">
  <strong>⚠️ 注意：</strong><code>git push</code> 預設<strong>不會</strong>推送標籤！必須明確指定。
</div>

```bash
# 推送單一標籤
$ git push origin v1.0

# 一次推送所有本地端有但遠端沒有的標籤
$ git push origin --tags
```

<!--
這是很多人第一次要發版時會卡的地方——`git push` 之後去 GitHub 找不到 Tag。原因就是 Git 預設不推送標籤，必須明確指定。接下來看指令速查表。
-->

---

# 推送標籤到遠端：指令速查

| 動作 | 指令 |
| --- | --- |
| 推送單一標籤 | `git push origin <tag>` |
| 推送全部標籤 | `git push origin --tags` |
| 刪除遠端標籤 | `git push origin --delete <tag>` |

```bash
# 刪除遠端標籤
$ git push origin --delete v0.9
```

<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fff8f0; border-left: 4px solid #d97706; border-radius: 4px;">

**建議：** 刪除遠端標籤後，還要執行 `git tag -d <tag>` 把本地端的也一起清掉，保持同步。

</div>

<!--
`--tags` 旗標一次把本地有但遠端沒有的全部推過去，很方便。刪除遠端標籤的 `--delete` 寫法比較直覺，推薦用這個。接下來進入第二個主題，看標籤和分支在底層有什麼不同。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 2
## 【冷知識】標籤跟分支有什麼不一樣？

<!--
這個冷知識我很喜歡，因為它把 Git 最核心的物件模型講清楚了。搞懂這個，你看 Git 的眼光會完全不一樣。
-->

---

# 相同點：都是「指標」

分支和標籤在 Git 內部都是指向某個 Commit 的**指標（reference）**。

<br>

```text
.git/refs/
├── heads/          ← 分支存在這裡
│   ├── main        （內容：某個 commit hash）
│   └── develop     （內容：某個 commit hash）
└── tags/           ← 標籤存在這裡
    ├── v1.0        （內容：某個 commit/tag hash）
    └── v2.0        （內容：某個 commit/tag hash）
```

<br>

```bash
# 可以直接查看這些純文字檔的內容
$ cat .git/refs/heads/main
a4b8c2d9e1f2...（一個 40 字元的 commit hash）

$ cat .git/refs/tags/v1.0
3c7d2b1a5e8...（lightweight tag 也是一個 commit hash）
```

<!--
我們可以打破神秘感來看一下：分支和標籤在 Git 的檔案系統裡，其實就是 `.git/refs/` 底下的純文字小檔案，每個檔案裡面只有一行 hash。建立一個分支或標籤，Git 只是在硬碟上多了一個幾十 bytes 的小文字檔，設計非常輕量。那分支和標籤的差異到底在哪裡？下一頁告訴大家。
-->

---

# 最大不同：移動 vs 固定

<br>

| | 分支（Branch） | 標籤（Tag） |
| --- | --- | --- |
| **指向** | 目前分支最新的 Commit | 建立時指定的那個 Commit |
| **會不會移動** | 每次新增 Commit 就自動往前移 | 永遠固定，不會移動 |
| **用途** | 標示「目前的開發位置」 | 標示「這個歷史節點很重要」 |

<br>

```text
新增一個 commit 之後：

分支：  A ── B ── C ── D ← main（自動移到最新）
              ↑
             v1.0（標籤永遠留在 B）
```

<!--
想像分支是一個會自動往前滾的球，每次新增 commit 它就滾一格；標籤則是在路面上刻的記號，刻完就永遠在那裡了。這個設計讓 v1.0 標籤永遠就是那個版本，不管你之後繼續開發多少次，它都不會跑掉。除非你刻意刪除重建，否則標籤的指向是不可變的。
-->

---

# Annotated Tag 的特殊性

Annotated tag 不只是一個指標，它本身是一個**獨立的 Git 物件（Tag Object）**。

<br>

```text
Lightweight tag 的結構：
  v1.0 ──────────────────────▶  Commit Object

Annotated tag 的結構：
  v1.0 ──▶  Tag Object  ──▶  Commit Object
              ├── tagger: Alice
              ├── date: 2026-06-01
              └── message: "Release v1.0"
```

<br>

```bash
# 查看 annotated tag 的底層物件類型
$ git cat-file -t v1.0
tag       ← 這是一個 tag 物件

$ git cat-file -t main
commit    ← 分支直接指向 commit 物件
```

<!--
Git 有四種物件類型：Blob、Tree、Commit、Tag。Annotated tag 是獨立的一種，它有自己的 hash，裡面包著打標籤者的資訊，再指向目標 commit。Lightweight tag 沒有這層包裝，直接指向 commit。`git cat-file -t` 可以查任何 Git 物件的類型，有興趣的同學可以自己玩玩看。接下來我們做個整理。
-->

---

# 使用情境整理

<br>

| 需求 | 用什麼 | 原因 |
| --- | --- | --- |
| 正在開發某個功能 | 分支（Branch） | 需要隨著開發持續移動 |
| 標記正式版本發布 | Annotated Tag | 固定且有完整的發布資訊 |
| 本地端快速做個標記 | Lightweight Tag | 輕量、快速、不需要附加說明 |
| CI/CD 自動觸發部署 | Annotated Tag | 有明確的版本語意，工具容易識別 |

<br>

<div style="background: #fff8f0; border-left: 4px solid #d97706; padding: 1rem 1.5rem; border-radius: 4px;">
  <strong>一句話總結：</strong>分支用於「開發流程」，標籤用於「版本發布」。分支是動態的，標籤是靜態的。
</div>

<!--
用這個表格幫大家整理一下什麼時候用分支、什麼時候用標籤。在現代 DevOps 的設計裡，CI/CD 系統通常監聽 tag 的推送事件來觸發正式部署——有人推了 `v1.2.3`，就自動部署到生產環境。這樣的設計讓版本控制和部署流程緊密結合，不需要人工去判斷。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Q & A

<!--
這一章學了兩種標籤類型、如何對過去的 commit 補打標籤、推送標籤到遠端，以及標籤和分支的根本差異——標籤是靜態的，分支是動態的。如果還有任何疑問，歡迎提出來！
-->
