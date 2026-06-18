---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
title: 進階操作技巧
routeAlias: ch10
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
  <h1 style="color: #92400e; font-size: 3.8rem; font-weight: 900; line-height: 1.15; margin-bottom: 1.5rem;">進階操作技巧</h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #d97706, #fbbf24); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #b45309; font-size: 1.15rem; font-style: italic;">「讓工作流更專業、歷史更乾淨」</p>
  <Link to="home" style="margin-top: 2rem; color: #d97706; font-size: 0.9rem;">← 返回目錄</Link>
</div>

<!--
這個章節涵蓋三個實用的進階主題：Rebase（讓歷史保持線性）、從過去的 Commit 長新分支（hotfix 的核心技能），以及 Commit 工具鏈（commitlint、husky、rebase -i）。掌握這些技能可以讓你的 Git 工作流更專業、歷史更乾淨。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 1
# Rebase：另一種合併方式

<!--
除了 merge 之外，還有另一種整合分支的方式叫做 rebase。它的哲學和 merge 不同，各有適合的使用場景，我們來比較一下。
-->

---

# git rebase 是什麼？

**Rebase 的概念：重新播放 commit**

```text
rebase 前：
main:    A --- B --- E
                \
feature:         C --- D

git switch feature
git rebase main

rebase 後：
main:    A --- B --- E
                      \
feature:               C' --- D'  (C、D 被重新播放在 E 之後)
```

```bash
git switch feature/login
git rebase main          # 把 feature 的 commit 重新接在 main 最新處
```

Rebase 讓 feature 的歷史「看起來像是從 main 最新版本開始開發的」。

<!--
Rebase 的字面意思是「重新設定基礎」。想像一下，你把自己的 commit 從原來的位置拔起來，重新接在新的基礎上。C 變成了 C'，D 變成了 D'，內容相同，但 hash 不同，因為它們的父節點已經改變了。這個設計讓歷史看起來非常乾淨，但也有需要注意的風險。接下來我們來比較 rebase 和 merge。
-->

---

# Rebase vs Merge 比較

| | Merge | Rebase |
|--|-------|--------|
| **歷史形狀** | 分叉（有小耳朵） | 線性（沒有分叉） |
| **原始 commit 保留** | 是（保留完整歷史） | 否（重新建立 commit） |
| **適合情境** | 功能完成後整合 | 整理本地 commit、同步主線 |
| **衝突處理** | 一次解決 | 每個 commit 逐一解決 |
| **公開分支** | 安全 | **避免用在已 push 的分支** |

<!--
Rebase 最大的優點是歷史線性，看起來乾淨；最大的風險是它修改了 commit hash，如果已經 push 到遠端就會造成歷史分歧。接下來看 log 比較。
-->

---

# Rebase vs Merge：log 形狀比較

```text
merge 的 log：    rebase 的 log：
* merge commit    * feature commit D
|\                * feature commit C
| * D             * main commit E
| * C             * main commit B
|/                * main commit A
* E
```

<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fef3c7; border-left: 4px solid #d97706; border-radius: 4px;">

**黃金原則：只對還沒有 push 的本地 commit 做 rebase。** 已 push 的 commit 被 rebase 後，hash 改變，其他人拉取後會造成歷史分歧，非常麻煩。

</div>

<!--
記住黃金原則：只對還沒有推上去的本地 commit 做 rebase。接下來看 rebase 的操作細節。
-->

---

# Rebase 的操作與中止

```bash
git switch feature/login
git rebase main           # 開始 rebase

# 如果中途發生衝突：
# 1. 解決衝突
# 2. git add <file>
# 3. git rebase --continue  # 繼續 rebase
# 或
# 3. git rebase --skip      # 跳過這個 commit（少用）

# 完全放棄，回到 rebase 開始之前的狀態
git rebase --abort
```

<!--
Rebase 中途發生衝突時，要逐個 commit 解決，每解完一個就 `git rebase --continue` 繼續。如果覺得太複雜，隨時可以 `git rebase --abort` 放棄，不會有任何副作用。接下來看 rebase 後怎麼合回 main。
-->

---

# Rebase 後合併回 main

```bash
# Rebase 完，合回 main（此時會 fast-forward）
git switch main
git merge feature/login    # 線性歷史，自動 fast-forward
```

<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fff8f0; border-left: 4px solid #d97706; border-radius: 4px;">

**為什麼會 fast-forward？** Rebase 之後，feature 的 commit 已經接在 main 最新點之後，兩者之間沒有分歧，merge 時只需要移動指標，不需要建立 merge commit。

</div>

<!--
Rebase 完之後再 merge，因為歷史已經是線性的，會自動 fast-forward。接下來進入第二部分。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 2
# 從過去的 Commit 長新分支

<!--
有時候我們需要從歷史中的某個特定點開始新工作，例如從一個舊版本做 hotfix，或是從某個穩定點開始做實驗。這個狀況題示範怎麼做。
-->

---

# 找到目標 Commit

**使用 git log 找到你要的 commit：**

```bash
git log --oneline
```

輸出範例：

```text
a1b2c3d (HEAD -> main) 新增使用者權限管理
e5f6g7h 更新依賴套件版本
d4e5f6g 修正登入驗證邏輯
c3d4e5f 發布 v1.2.0
b2c3d4e 新增購物車功能
9a8b7c6 發布 v1.0.0  ← 假設你要從這裡開始 hotfix
```

**找到 hash 後，就可以從那個點建立分支。**

<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fff8f0; border-left: 4px solid #d97706; border-radius: 4px;">

**技巧：** 用 `git log --oneline --graph --all` 可以同時看到所有分支的歷史，更容易找到目標點。

</div>

<!--
`git log --oneline` 把每個 commit 精簡成一行，讓你快速瀏覽歷史。找到目標 commit 後，只需要前幾位 hash（通常 7 位就夠用），不需要全部 40 位。如果有打 tag，也可以直接用 tag 名稱代替 hash，例如 `v1.0.0`，更直觀。接下來看怎麼從那個點建立分支。
-->

---

# 從指定 Commit 建立分支

```bash
# 新語法（推薦）
git switch -c hotfix/v1.0.1 9a8b7c6

# 舊語法（效果相同）
git checkout -b hotfix/v1.0.1 9a8b7c6
```

```text
                         ← 目前在這裡
                         ↓
main:   9a8b7c6 --- ... --- a1b2c3d (HEAD -> main)

執行後：

hotfix: 9a8b7c6 (HEAD -> hotfix/v1.0.1)
         ↑ 從這裡開始
main:   9a8b7c6 --- ... --- a1b2c3d
```

<!--
從特定 commit 建立分支，本質上就是在建立分支的同時指定起點。如果不指定，預設起點就是 HEAD。接下來看完整的 hotfix 流程。
-->

---

# 從指定 Commit 建立分支：完整 Hotfix 流程（一）

```bash
# 1. 找到舊版本的 commit hash
git log --oneline
# 9a8b7c6 發布 v1.0.0

# 2. 從舊版本建立 hotfix 分支
git switch -c hotfix/v1.0.1 9a8b7c6

# 3. 修 bug，提交
git add fix.js
git commit -m "修正 v1.0 的安全漏洞"
```

<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fff8f0; border-left: 4px solid #d97706; border-radius: 4px;">

bug 在舊版本，要從舊版本的 commit 點開始修，不能從 main 最新點建立，否則會夾帶未上線的功能。

</div>

<!--
接下來看合併、同步與清理的步驟。
-->

---

# 從指定 Commit 建立分支：完整 Hotfix 流程（二）

```bash
# 4. 合併回 main（帶回修正）
git switch main
git merge hotfix/v1.0.1

# 5. cherry-pick 回開發分支（確保下個版本也有此修正）
git switch develop
git cherry-pick <hotfix-commit-hash>

# 6. 清理
git branch -d hotfix/v1.0.1
```

<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fff8f0; border-left: 4px solid #d97706; border-radius: 4px;">

**步驟 5 的意義：** hotfix 修完後用 cherry-pick 把修正帶回 develop，確保下個版本不會再出現同樣的 bug。

</div>

<!--
注意第 5 步：hotfix 修完之後，可能需要把這個修正帶回開發分支，這時候用 cherry-pick 是最精準的方式，只把那個修正的 commit 搬過來，不帶其他改動。接下來進入第三部分。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 3
# Commit 工具鏈實戰

<!--
這部分把團隊實踐建議裡提到的四個工具一一示範安裝和使用方式：commitlint、commit-msg hook、GitHub Desktop Copilot、git rebase -i。
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

| 步驟 | 說明 |
| ---- | ---- |
| 1. 安裝 GitHub Desktop | 從 desktop.github.com 下載安裝 |
| 2. 登入 GitHub 帳號 | 需有 GitHub Copilot 訂閱（或 Free tier） |
| 3. 在 Changes 頁面 | 勾選要 commit 的檔案 |
| 4. 點擊 ✨ 圖示 | Summary 欄位右側的 Copilot 按鈕 |
| 5. 審閱並調整 | Copilot 根據 diff 自動產生 message，確認後 commit |

<!--
GitHub Desktop 的 Copilot 整合會讀取這次 diff 的完整內容，用 AI 推斷出一條描述準確的 commit message。接下來看如何客製化設定。
-->

---

# GitHub Desktop + Copilot：客製化設定

在 **GitHub Desktop → Preferences → Integrations → Copilot** 可設定：

- 語言偏好（中文 / 英文）
- 是否遵循 Conventional Commits 格式

<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fef3c7; border-left: 4px solid #d97706; border-radius: 4px;">

**注意：** AI 產生的 message 不是百分之百準確，一定要審閱後再 commit，不要盲目採用。對不熟悉 Conventional Commits 的人，可以拿 Copilot 的輸出當範本，慢慢培養出寫好 message 的直覺。

</div>

<!--
對於不熟悉 Conventional Commits 格式的同學，這是一個很好的輔助工具——不只省時間，還可以拿 Copilot 產生的 message 作為範本，慢慢培養出自己寫好 message 的直覺。
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
layout: section
class: flex flex-col justify-center items-center text-center
---

# Q & A

<!--
這一章涵蓋了幾個進階操作技巧：worktree 同時處理多個分支、rebase -i squash 整理 commit，以及 Conventional Commits 規範。有任何問題嗎？
-->
