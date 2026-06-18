---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
title: 使用分支
routeAlias: ch03
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
  <h1 style="color: #92400e; font-size: 3.8rem; font-weight: 900; line-height: 1.15; margin-bottom: 1.5rem;">使用分支</h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #d97706, #fbbf24); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #b45309; font-size: 1.15rem; font-style: italic;">「讓開發脈絡清晰，讓協作更加順暢」</p>
  <Link to="home" style="margin-top: 2rem; color: #d97706; font-size: 0.9rem;">← 返回目錄</Link>
</div>

<!--
歡迎來到第三章：使用分支。分支可以說是 Git 最讓人驚艷的特性，也是很多人從其他版本控制工具換過來之後第一個愛上的功能。這一章我們會從「為什麼需要分支」開始，一路帶大家學建立、切換、合併，以及遇到問題時怎麼解決。接下來我們先來看本章大綱。
-->

---
layout: default
---

# Outline

- **為什麼要使用分支？** — 分支的用途與使用時機
- **開始使用分支** — git branch / git checkout / git switch
- **合併分支** — git merge / fast-forward / 3-way merge
- **【狀況題】分支沒有小耳朵** — HEAD 與分支指標
- **【常見問題】合併過的分支要留著嗎？** — 分支清理策略
- **【狀況題】不小心砍掉未合併的分支** — git reflog 救援
- **合併發生衝突了** — 衝突解決流程

<!--
這是本章的大綱。前三個是核心操作，中間幾個是大家在實際開發中很常遇到的情境，最後是衝突解決的完整流程。接下來我們來看第一部分。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 1
# 為什麼要使用分支？

<!--
我們從最根本的問題開始：分支到底解決了什麼問題？為什麼幾乎所有的開發流程都強調要開分支？大家先想一想，如果沒有分支，我們平常的開發工作會遇到什麼困難？
-->

---

# 沒有分支的世界

沒有分支時，所有人都在同一條線上工作：

```text
A --- B --- C --- D --- E  (main)
      ↑           ↑
   你在做功能    同事提交了修改，打亂你的進度
```

常見的問題：

- 你正在開發新功能，寫了一半，突然需要緊急修 bug
- 你把實驗性的程式碼 commit 進去，搞壞了主線
- 兩個人同時修改同一個檔案，提交互相覆蓋
- 想回到「昨天還能動的版本」，但找不到乾淨的節點

<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fff8f0; border-left: 4px solid #d97706; border-radius: 4px;">

**核心問題：** 主線開發與實驗性開發混在一起，隨時都可能互相干擾。

</div>

<!--
想像一下，你正在寫一個新功能，程式碼寫到一半，突然客戶說有個嚴重的 bug 要馬上修。這時候你怎麼辦？現有的改動還沒辦法提交，但又必須切換狀態去修 bug。沒有分支的話，這個情境就很難處理，輕則手忙腳亂，重則把主線搞壞。這就是我們需要分支的原因。接下來我們來看分支能帶來什麼改變。
-->

---

# 分支的用途與使用時機

有了分支，每條線可以獨立發展：

```text
          feature/login
         /               \
A --- B --- C --- D --- E --- F  (main)
              \
               hotfix/bug-123
```

<!--
有了分支，我們可以同時在多條時間線上工作。功能 A 在自己的線上，hotfix 又是另一條，它們互相不干擾。接下來看常見的使用情境。
-->

---

# 分支的常見使用情境

| 情境 | 說明 |
|------|------|
| 開發新功能 | 在獨立分支開發，完成後再合併回主線 |
| 修復 bug | 從穩定版本長出 hotfix 分支，修完合回去 |
| 實驗性嘗試 | 想試試新技術或架構，不影響主線 |
| 多人協作 | 每個人在自己的分支開發，減少衝突 |
| 版本發布 | 維護多個版本（v1.x、v2.x）各自的分支 |

<!--
這就是為什麼現代開發流程，不管是 Git Flow、GitHub Flow 還是 trunk-based development，都以分支作為基礎。接下來看分支對多人協作的影響。
-->

---

# 分支讓多人協作不互相干擾

**沒有分支的協作：**

```text
Alice: A --- B --- C
                    ↑ 常常踩到 Bob 的修改
Bob:            D --- E --- (conflict!)
```

**有分支的協作：**

```text
Alice: --- feature/payment ---→ merge
      /                          \
main ------------------------------- main
      \                          /
Bob:   --- feature/checkout ---→ merge
```

每個人在自己的分支開發，完成後才合併，**衝突集中在合併時處理**，而不是隨時都在搶。

<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fef3c7; border-left: 4px solid #d97706; border-radius: 4px;">

**協作原則：** 分支不代表沒有衝突，而是讓衝突在**可控的時間點**發生，而不是隨機干擾開發節奏。

</div>

<!--
用分支的重點不是說「從此沒有衝突」，而是讓衝突變得可預測、可管理。Alice 和 Bob 各自在自己的分支工作，合併的時候再一起解決差異。這樣的流程遠比大家搶著提交同一份程式碼要清晰得多。好，了解了為什麼需要分支，接下來我們來學怎麼操作。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 2
# 開始使用分支

<!--
了解了為什麼需要分支之後，我們來看實際的操作指令。Git 有幾個指令可以管理分支，我們從最基本的查看和建立開始。
-->

---

# 查看分支

**查看所有分支：**

```bash
git branch          # 列出本地分支
git branch -a       # 列出本地 + 遠端分支
git branch -v       # 列出分支並顯示最新 commit
```

輸出範例：

```text
* main              a1b2c3d 初始 commit
  feature/login     d4e5f6g 新增登入頁面
  hotfix/bug-123    h7i8j9k 修正驗證邏輯
```

<!--
`git branch -v` 這個參數特別好用，可以一眼看出每個分支現在指向哪個 commit，不用另外查 log。接下來看怎麼建立分支。
-->

---

# 建立分支

**建立新分支：**

```bash
git branch feature/payment    # 建立分支（停在目前位置，不切換）
```

<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fff8f0; border-left: 4px solid #d97706; border-radius: 4px;">

**注意：** `git branch <name>` 只是建立分支，不會自動切換過去。`*` 號代表目前所在的分支。

</div>

<!--
要注意一個初學者常犯的錯：`git branch` 只是建立分支，不會自動切換過去，HEAD 還是停在原本的位置。想要切換過去的話，要再下一個指令，接下來我們就來看切換的方式。
-->

---

# 切換分支

**兩種切換方式（擇一即可）：**

```bash
# 舊語法（Git 2.23 以前常用）
git checkout feature/login

# 新語法（Git 2.23+ 推薦）
git switch feature/login
```

**建立並立即切換（最常用）：**

```bash
# 舊語法
git checkout -b feature/payment

# 新語法
git switch -c feature/payment
```

切換後，工作目錄的檔案會自動變成該分支的狀態。

<!--
Git 2.23 版把 `git checkout` 的功能拆成了 `git switch` 和 `git restore` 兩個指令，語意更清楚。`switch` 專門切換分支，`restore` 專門還原檔案。接下來看使用建議。
-->

---

# 切換分支：使用建議

<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fef3c7; border-left: 4px solid #d97706; border-radius: 4px;">

**建議：** 新專案或新版 Git 使用 `git switch`，語意更清楚。`git checkout` 功能太多（切分支、還原檔案都是它），容易混淆。

</div>

| 指令 | 用途 |
|------|------|
| `git switch <branch>` | 切換到既有分支 |
| `git switch -c <branch>` | 建立並切換（最常用） |
| `git checkout <branch>` | 舊語法，同 switch |
| `git checkout -b <branch>` | 舊語法，同 switch -c |

<!--
我們建議新手優先學 `git switch`，比較不容易搞混。「建立並切換」是最常見的操作，每次開新功能都會用到。接下來看怎麼刪除分支。
-->

---

# 刪除分支

**刪除已合併的分支（安全）：**

```bash
git branch -d feature/login    # 如果已合併，可以刪除
```

**強制刪除（不論有沒有合併）：**

```bash
git branch -D feature/experiment    # 強制刪除，慎用！
```

**刪除遠端分支：**

```bash
git push origin --delete feature/login
```

<!--
記住小寫 `-d` 有保護機制，如果分支還沒合併會拒絕刪除；大寫 `-D` 則是強制刪除，不管有沒有合併都直接砍掉。接下來看完整操作流程。
-->

---

# 刪除分支：完整操作流程

```bash
git switch -c feature/payment    # 建立並切換
# ... 開發、commit ...
git switch main                  # 切回主線
git merge feature/payment        # 合併
git branch -d feature/payment   # 刪除已合併的分支
```

| 指令 | 說明 |
|------|------|
| `git branch -d` | 安全刪除（已合併才能刪） |
| `git branch -D` | 強制刪除（慎用！） |
| `git push origin --delete` | 刪除遠端分支 |

<!--
分支的生命週期通常是：建立 → 開發 → 合併 → 刪除。後面有一個狀況題會說明萬一用 `-D` 刪錯了怎麼救回來。接下來我們來看合併的操作。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 3
# 合併分支

<!--
分支開發完成之後，要把改動合併回去。Git 的合併有兩種主要模式，理解它們的差異，對後面理解「小耳朵」的問題很有幫助，我們一起來看。
-->

---

# git merge 基本用法

**合併的基本語法：**

```bash
git switch main             # 先切換到要被合入的分支
git merge feature/login     # 把 feature/login 合併進來
```

<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fff8f0; border-left: 4px solid #d97706; border-radius: 4px;">

**重點：** 合併時永遠是「切換到目標分支，再 merge 來源分支」。

</div>

<!--
合併的方向很容易搞混，我們記住一個原則：你現在在哪個分支，就是把別人合進來。要把 feature 合進 main，就先切換到 main，再 merge feature。接下來看合併後怎麼確認結果。
-->

---

# git merge 基本用法：確認結果

**查看合併後的歷史：**

```bash
git log --oneline --graph --all
```

輸出範例：

```text
*   a1b2c3d (HEAD -> main) Merge branch 'feature/login'
|\
| * d4e5f6g (feature/login) 新增登入表單驗證
| * e5f6g7h 新增登入頁面 HTML
|/
* b2c3d4e 初始化專案
```

<!--
`git log --oneline --graph` 是確認合併結果的好工具，養成用這個指令確認的習慣之後，對分支結構的掌握度會提升很多。接下來看第一種合併模式：fast-forward。
-->

---

# Fast-forward Merge

當分支之間**沒有分歧**時（main 沒有新的 commit），Git 會使用 fast-forward：

```text
合併前：
main:    A --- B
                \
feature:         C --- D

合併後（fast-forward）：
main:    A --- B --- C --- D
                           ↑ (HEAD, main, feature)
```

```bash
git switch main
git merge feature/login
# 輸出：Updating b2c3d4e..d4e5f6g
# Fast-forward
```

<!--
想像一下，你開了一個分支去開發，這段時間 main 上什麼事都沒發生。這時候合併，Git 只需要把 main 的指標往前移動到 feature 的最新 commit 就好，不需要做任何額外的合併動作。接下來看 fast-forward 的特性。
-->

---

# Fast-forward Merge：特性

**Fast-forward 的特性：**

- 不會產生新的合併 commit
- 歷史線是線性的，看起來像從來沒有分支過
- 如果不想要線性歷史，可以加 `--no-ff`

```bash
# 強制產生合併 commit（保留分支歷史）
git merge --no-ff feature/login
```

<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fff8f0; border-left: 4px solid #d97706; border-radius: 4px;">

**何時用 --no-ff：** 希望從 log 圖上清楚看出這個功能是在獨立分支開發的，尤其適合團隊協作。

</div>

<!--
結果是歷史看起來很乾淨，但也看不出來「曾經有個分支」。接下來看另一種情境：兩邊都有新 commit 的時候。
-->

---

# 3-Way Merge

當 main 和 feature **都有新的 commit** 時，Git 使用 3-way merge：

```text
合併前：
main:    A --- B --- E
                \
feature:         C --- D

三個參考點：B（共同祖先）、E（main 最新）、D（feature 最新）

合併後：
main:    A --- B --- E --- M  (M = merge commit)
                \       /
feature:         C --- D
```

```bash
git switch main
git merge feature/login
# 輸出：Merge made by the 'ort' strategy.
```

<!--
3-way merge 的「3」指的是三個節點：兩個分支各自的最新 commit，以及它們的共同祖先。接下來看 3-way merge 的特性。
-->

---

# 3-Way Merge：特性

**特性：**
- 產生一個新的合併 commit M
- 保留了分支歷史（有「小耳朵」）
- 歷史圖上可以看出曾經有哪些分支

<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fff8f0; border-left: 4px solid #d97706; border-radius: 4px;">

**為什麼叫 3-way：** Git 用三個版本做比較——兩個分支的最新 commit，加上它們的共同祖先 B。這樣才能正確判斷「這個改動是哪邊加的」，避免誤刪另一邊的修改。

</div>

<!--
不只看兩個版本的差，還要知道「從哪裡開始分開的」，這就是 3-way 的關鍵。接下來我們來看「小耳朵」的問題。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 4
# 【狀況題】分支沒有小耳朵

<!--
很多人剛開始用 Git 圖形化工具時，會發現有時候 log 圖上有分叉，有時候沒有，搞不清楚原因。這個「小耳朵」的問題，其實跟剛才講的 fast-forward 和 3-way merge 直接相關。
-->

---

# 什麼是「小耳朵」？

在 `git log --graph` 中，**分叉的圖形**就是「小耳朵」：

```text
有小耳朵（3-way merge）：
*   a1b2c3d Merge branch 'feature'
|\
| * d4e5f6g feature 的 commit
|/
* b2c3d4e main 的 commit

沒有小耳朵（fast-forward）：
* d4e5f6g feature 的 commit
* b2c3d4e main 的 commit
* a1b2c3d 初始 commit
```

**為什麼沒有小耳朵？**

Fast-forward 只是移動指標，不產生合併 commit，所以在 log 圖上看不出來曾經有分支。

<!--
你有沒有遇過，明明用了分支開發，但 `git log --graph` 看起來卻是一條直線？這就是 fast-forward 造成的，因為它只是把指標移動過去，不會留下合併的痕跡。有沒有小耳朵，完全取決於合併時有沒有產生合併 commit。如果你希望永遠保留分支歷史，可以用 `--no-ff`，接下來我們來看。
-->

---

# 用 --no-ff 強制保留分支歷史

如果你希望**永遠保留分支歷史**，可以加上 `--no-ff`：

```bash
git switch main
git merge --no-ff feature/login
# 即使可以 fast-forward，也會強制產生合併 commit
```

<!--
要不要加 `--no-ff` 是一個團隊風格的選擇，有些人喜歡線性的乾淨歷史，有些人喜歡保留分支痕跡。接下來看三種合併方式的比較。
-->

---

# 三種合併方式比較

| 合併方式 | 指令 | 產生合併 commit | 保留分支歷史 |
|----------|------|:-:|:-:|
| Fast-forward | `git merge` | 否（如果可以的話） | 否 |
| 強制合併 commit | `git merge --no-ff` | 是 | 是 |
| 3-way merge | `git merge`（有分歧時自動） | 是 | 是 |

<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fef3c7; border-left: 4px solid #d97706; border-radius: 4px;">

**團隊慣例：** 許多團隊規定 `merge --no-ff`，這樣從 log 上可以清楚看出每個功能分支的起訖。沒有絕對對錯，但整個團隊要統一規則。

</div>

<!--
沒有絕對的對錯，但整個團隊要統一規則，否則 log 圖會很混亂。接下來我們來處理一個常見問題：合併後的分支要怎麼清理？
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 5
# 【常見問題】合併過的分支要留著嗎？

<!--
開發久了，分支列表可能會越來越長，看起來很亂。什麼分支可以刪、什麼不能刪，是很多人的疑問。我們來看怎麼判斷。
-->

---

# 已合併 vs 未合併的分支

**查看哪些分支已合併進目前分支：**

```bash
git branch --merged       # 已合併（可以安全刪除）
git branch --no-merged    # 尚未合併（刪除要謹慎）
```

輸出範例：

```text
$ git branch --merged
* main
  feature/login      ← 已合併，可以刪
  hotfix/bug-123     ← 已合併，可以刪

$ git branch --no-merged
  feature/payment    ← 還沒合併，刪了會遺失工作！
  experiment/new-ui  ← 還沒合併
```

<!--
已合併的分支即使刪掉，commit 還在，只是少了一個名字而已，所以可以放心刪。未合併的分支刪掉就是真的遺失那些 commit，需要謹慎。接下來看批次清理方式。
-->

---

# 已合併 vs 未合併的分支：批次清理

**批次刪除已合併分支（排除 main）：**

```bash
git branch --merged | grep -v "main" | xargs git branch -d
```

<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fff8f0; border-left: 4px solid #d97706; border-radius: 4px;">

**建議：** 定期執行 `git branch --merged` 確認清單，再批次刪除，保持分支列表乾淨。已合併的分支刪掉只是少了名字，commit 本體還在。

</div>

<!--
`git branch --merged` 非常好用，定期執行可以保持分支列表乾淨。接下來看遠端分支的清理方式。
-->

---

# 分支清理策略：本地

**本地分支清理：**

```bash
git branch -d feature/login     # 刪除已合併的本地分支
git branch -D experiment/failed # 強制刪除（不論合併狀態）
```

**建議的清理流程：**

| 時機 | 動作 |
|------|------|
| 功能完成、PR 合併後 | 立即刪除功能分支（本地 + 遠端） |
| 定期維護 | `git branch --merged` 批次清理 |
| 同步遠端 | `git fetch --prune` 清除失效的遠端引用 |

<!--
分支用完就刪是個好習慣，避免分支列表越來越長。接下來看遠端分支的清理方式。
-->

---

# 分支清理策略：遠端

**遠端分支清理：**

```bash
git push origin --delete feature/login   # 刪除遠端分支

# 清理已被刪除的遠端追蹤引用
git fetch --prune
git remote prune origin
```

<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fff8f0; border-left: 4px solid #d97706; border-radius: 4px;">

**說明：** 當同事在 GitHub 上刪除了分支，你本地還是會有 `origin/feature-xxx` 的追蹤引用。`git fetch --prune` 可以清掉這些失效引用，讓 `git branch -a` 的輸出更整潔。

</div>

<!--
遠端分支的清理是很多人忽略的地方。`git fetch --prune` 可以把這些失效的引用清掉，讓 `git branch -a` 的輸出更整潔。接下來我們來處理一個比較緊張的狀況：手滑刪掉了還沒合併的分支。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 6
# 【狀況題】不小心砍掉未合併的分支

<!--
這是很多人都遇過的情況：手滑打了 `git branch -D`，或者搞錯分支名稱，把還沒合併的分支給刪掉了。別慌，Git 有辦法救回來，我們來看怎麼做。
-->

---

# 問題：分支被強制刪除了！

情境：你在 `feature/payment` 開發了幾天，沒有合併，手滑刪掉了：

```bash
git branch -D feature/payment
# Deleted branch feature/payment (was a1b2c3d).
```

**分支刪除後發生了什麼？**

```text
刪除前：
main:           A --- B
                       \
feature/payment:        C --- D --- E  ← 分支指標指向 E

刪除後：
main:           A --- B
                       \
                        C --- D --- E  ← 指標消失！commit 還在，只是沒有名字了
```

Git 的分支本質上只是一個**指標**——一個指向某個 commit 的名字。刪除分支只是把這個名字移除，commits C-D-E 本體仍安全地存放在 `.git/objects` 裡，只是變成「孤兒 commit」，沒有名字就找不到它們了。

<!--
Git 的分支只是一個指標，刪除分支只是刪掉那個指標，commit 本身還留在 Git 的物件資料庫裡。Git 有垃圾回收機制，只有「孤立」超過一段時間後才會真正清除，所以刪除後趕快找，通常都救得回來。接下來看怎麼找回來。
-->

---

# 用 git reflog 找回被刪的分支

**reflog 記錄了所有 HEAD 的移動歷史：**

```bash
git reflog
```

輸出範例：

```text
a1b2c3d HEAD@{0}: checkout: moving from feature/payment to main
e5f6g7h HEAD@{1}: commit: 新增金流串接
d4e5f6g HEAD@{2}: commit: 新增購物車 API
c3d4e5f HEAD@{3}: commit: 建立 payment 模組
b2c3d4e HEAD@{4}: checkout: moving from main to feature/payment
```

<!--
reflog 記錄了每一次 HEAD 移動的快照，只要操作在本地端發生，幾乎都可以用 reflog 找回來。找到分支最後一次的 commit hash，接下來就能重建分支。
-->

---

# 用 git reflog 找回被刪的分支：重建

找到最後一次在那個分支的 commit hash（這裡是 `e5f6g7h`），重新建立分支：

```bash
git branch feature/payment e5f6g7h
# Branch 'feature/payment' set up to track commit e5f6g7h.
```

<div style="margin-top: 1rem; padding: 1rem 1.5rem; background: #fff8f0; border-left: 4px solid #d97706; border-radius: 4px;">

**reflog 是你的後悔藥：** 它記錄了最近 90 天的所有 HEAD 變動，reset、刪分支、甚至 amend 都找得回來。整個過程大概一分鐘內可以搞定。

</div>

<!--
找到分支最後一次的 commit hash，再用 `git branch` 重新建立指標就好了。接下來我們來看合併衝突怎麼解決。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 8
# 合併發生衝突了，怎麼辦？

<!--
衝突是每個開發者遲早都會遇到的事。它不是錯誤，而是 Git 在說：「這兩個版本我沒辦法自動決定要哪個，請你來判斷。」其實只要了解流程，衝突並不可怕。
-->

---

# 衝突發生的原因

**兩個分支修改了同一個檔案的同一行：**

```text
main 分支的 greeting.js：
  console.log("Hello, World!");

feature 分支的 greeting.js：
  console.log("Hello, Git!");

合併時：Git 不知道要選哪個！→ 衝突
```

<!--
衝突只在 Git 無法確定「要保留哪個版本」的時候才會發生。接下來看哪些情況不會衝突。
-->

---

# 哪些情況會衝突？

| 情境 | 結果 |
|------|------|
| 兩個分支修改**不同檔案** | 自動合併，無衝突 |
| 兩個分支修改**同一檔案的不同行** | 自動合併，無衝突 |
| 兩個分支修改**同一行** | 衝突！需要手動解決 |
| 一方刪除、另一方修改同一檔案 | 衝突！需要手動決定 |

<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fef3c7; border-left: 4px solid #d97706; border-radius: 4px;">

**提醒：** 合併後最好確認結果，不要完全依賴 Git 的自動判斷——不同行自動合併了，不代表邏輯上沒問題。

</div>

<!--
你有沒有遇過，改了同一個檔案，merge 之後發現對方的改動消失了？那很可能是修改了不同行，Git 自動合併了，但結果不是你預期的。接下來看衝突標記長什麼樣子。
-->

---

# Git 衝突標記

發生衝突時，Git 會修改檔案，插入標記：

```text
<<<<<<< HEAD
console.log("Hello, World!");
=======
console.log("Hello, Git!");
>>>>>>> feature/greeting
```

<!--
衝突標記是 Git 留給你的提示，不是程式的一部分，千萬不要直接拿去執行。接下來看各區段的意義。
-->

---

# Git 衝突標記：區段說明

| 標記 | 說明 |
|------|------|
| `<<<<<<< HEAD` | 目前分支（你在的那邊）的內容 |
| `=======` | 分隔線 |
| `>>>>>>> feature/greeting` | 要合併進來的分支的內容 |

**你的任務：** 編輯這個檔案，決定最終要留什麼，然後**刪掉所有標記**。

<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fff8f0; border-left: 4px solid #d97706; border-radius: 4px;">

可以選其中一個版本，也可以兩個都留，甚至寫全新版本——完全由你決定。

</div>

<!--
你需要把這三個區段的標記全部刪掉，留下你想要的最終內容。接下來看完整的解決流程。
-->

---

# 衝突解決流程

**步驟一：觀察哪些檔案有衝突：**

```bash
git status
# both modified: src/greeting.js
```

**步驟二：編輯衝突檔案，決定最終內容：**

```text
# 修改後（刪除所有標記，保留想要的內容）：
console.log("Hello, Git World!");
```

**步驟三：標記已解決，然後完成合併：**

```bash
git add src/greeting.js     # 標記這個檔案已解決
git commit                  # 完成合併 commit（訊息已預填）
```

<!--
解決衝突的核心流程就三步：編輯、`git add`、`git commit`。接下來看用 VS Code 解決衝突的方式。
-->

---

# 衝突解決流程：使用 VS Code（推薦）

```bash
# 在 VS Code 中開啟有衝突的檔案
code src/greeting.js
```

VS Code 的 merge editor 會用顏色區分雙方改動，有按鈕可以直接選擇：

- **Accept Current Change** — 保留 HEAD（你的）版本
- **Accept Incoming Change** — 保留合併進來的版本
- **Accept Both Changes** — 兩個都保留

<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fff8f0; border-left: 4px solid #d97706; border-radius: 4px;">

不需要手動刪除標記符號，點按鈕即可。其他工具也可透過 `git mergetool` 配置。

</div>

<!--
VS Code 的 merge editor 特別好用，有按鈕可以直接選擇要哪個版本，不需要手動刪除標記符號。如果你習慣用其他工具，也可以透過 `git mergetool` 配置。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Q & A

<!--
這一章學了分支的建立與切換、Fast-forward 與 3-way merge 的差異，以及如何解決合併衝突。如果對分支操作或 merge 策略還有疑問，現在是個好時機。下一章我們把本地的 Git 連上 GitHub，進入遠端協作！
-->
