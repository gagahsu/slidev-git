---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
title: 其它常見狀況題
routeAlias: ch06
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
  <h1 style="color: #92400e; font-size: 3.8rem; font-weight: 900; line-height: 1.15; margin-bottom: 1.5rem;">其它常見狀況題</h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #d97706, #fbbf24); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #b45309; font-size: 1.15rem; font-style: italic;">「工作中最常踩的坑，一次全解決」</p>
  <Link to="home" style="margin-top: 2rem; color: #d97706; font-size: 0.9rem;">← 返回目錄</Link>
</div>

<!--
前面幾章我們學的是「正常操作」Git。這章要來看的是「出事了怎麼辦」。這些都是工作中真的很常碰到的情境，學完之後，你就有底氣說：遇到狀況，先深呼吸，Git 幾乎都有解法。
-->

---
layout: default
---

# Outline

- **【狀況題】手邊工作做到一半，要切換任務** — git stash
- **【狀況題】帳號密碼放進 Git 了** — git filter-branch / BFG / 修改 remote
- **【狀況題】只想要某個分支的某幾個 Commit** — git cherry-pick
- **【冷知識】把檔案真正從 Git 裡移掉** — git filter-branch / git filter-repo
- **【冷知識】斷頭（detached HEAD）是怎麼一回事？** — HEAD 指向 commit 而非分支

<!--
這章有五個主題，前三個是「狀況題」——工作中真的很可能碰到的緊急場景。後兩個是「冷知識」——理解這些，下次遇到奇怪現象就不會慌張了。我們從第一個狀況題開始。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 1
## 【狀況題】手邊的工作做到一半，臨時要切換到別的任務

<!--
想像一下：你正在加一個新功能，做到一半，主管突然說「生產環境有個緊急 bug，你先去修！」這時候功能還沒做完，不能 commit，但切換分支又可能出問題，怎麼辦？
-->

---

# 問題：未 commit 的改動切換分支會發生什麼？

```bash
# 你正在 feature/login 分支上開發，改了一堆檔案但還沒 commit
$ git status
Changes not staged for commit:
  modified: src/login.js
  modified: src/auth.js
Untracked files:
  src/new-component.js

# 突然需要切換到 main 去修緊急 bug
$ git checkout main
error: Your local changes to the following files would be overwritten by checkout:
        src/login.js
Please commit your changes or stash them before you switch branches.
```

<br>

<div style="background: #fef3c7; border-left: 4px solid #d97706; padding: 1rem 1.2rem; border-radius: 4px;">
  Git 保護了你：它<strong>拒絕切換分支</strong>，避免你的改動被覆蓋或遺失。解法是 <code>git stash</code>。
</div>

<!--
Git 在這裡其實是在保護我們。目標分支那個檔案和你現在的改動可能有衝突，切換後就覆蓋掉了，所以 Git 乾脆拒絕。就算沒有衝突，習慣上也不應該把半成品帶到別的分支。這就是 `git stash` 登場的時機——接下來看它怎麼用。
-->

---

# `git stash` — 把工作進度暫存起來

```bash
# 把目前所有未 commit 的改動暫存（不含 untracked 檔案）
$ git stash
Saved working directory and index state WIP on feature/login: a4b8c2d 上一個commit訊息

# 連 untracked 的新檔案也一起暫存
$ git stash -u

# 暫存時加上說明，方便之後識別
$ git stash push -m "login 頁面做到一半，表單驗證未完成"

# 暫存後工作目錄變乾淨了，可以自由切換分支
$ git status
nothing to commit, working tree clean

$ git checkout main
# 去修 bug...
$ git checkout feature/login
```

<!--
`git stash` 就像辦公桌旁邊有個臨時抽屜：把做到一半的東西全丟進去，桌面瞬間清空，你就可以去做別的事了。`-u` 旗標很重要，沒加的話新建還沒追蹤的檔案不會被暫存。`push -m` 給暫存加個說明，清單多的時候比較好辨識，強烈建議養成這個習慣。接下來看怎麼把暫存取回來。
-->

---

# 取回暫存的工作進度

```bash
# 查看所有暫存項目
$ git stash list
stash@{0}: On feature/login: login 頁面做到一半，表單驗證未完成
stash@{1}: WIP on develop: 購物車半成品

# 套用最新的暫存，並從清單中刪除（最常用）
$ git stash pop

# 套用指定的暫存，但保留在清單中
$ git stash apply stash@{1}

# 刪除指定的暫存
$ git stash drop stash@{1}

# 一次清空全部暫存
$ git stash clear
```

<!--
`stash pop` 是最常用的，用完就刪，不留雜物。`stash@{N}` 的 N 從 0 開始，0 是最新的。`stash clear` 要謹慎，刪了就真的找不回來了。接下來看指令差異速查。
-->

---

# 取回暫存：指令差異

| 指令 | 效果 |
| --- | --- |
| `stash pop` | 取回 + 從清單刪除 |
| `stash apply` | 取回 + 保留在清單 |
| `stash drop` | 只刪除，不取回 |
| `stash clear` | 清空全部（謹慎！） |

<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fff8f0; border-left: 4px solid #d97706; border-radius: 4px;">

如果想把同一份暫存套到多個分支，用 `stash apply`（不刪除清單）。一般情況用 `stash pop` 就夠了。

</div>

<!--
如果你想把同一份暫存套到多個地方，就用 `stash apply`，它不會刪除暫存。接下來進入第二個狀況題，也是最嚴重的一個。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 2
## 【狀況題】不小心把帳號密碼放在 Git 裡了

<!--
這個狀況比你想像的更常見。很多人第一個反應是「我再 commit 一次把密碼刪掉就好了」，但這樣做是錯的！讓我們看看正確的應對方式。
-->

---

# 為什麼「刪掉再 commit」是不夠的？

```bash
# ❌ 錯誤做法：只是再加一個 commit 把密碼移除
$ git log --oneline
f8a9b2c 移除密碼（亡羊補牢）  ← 密碼「看起來」不見了
a3c5d7e 新增資料庫設定        ← 但這個 commit 裡密碼還在！
```

<br>

<div style="background: #fef3c7; border-left: 4px solid #d97706; padding: 1rem 1.2rem; border-radius: 4px; margin-bottom: 1rem;">
  <strong>⚠️ 歷史記錄永遠都在！</strong>任何人只要 clone 你的 repo，都可以用 <code>git checkout a3c5d7e</code> 回到那個 commit，看到你的密碼。
</div>

<br>

只要 push 到公開 repository，就有機器人在爬：
- GitHub 上的爬蟲幾乎在 **commit 後幾秒內**就會收集到洩漏的金鑰
- 被收集到之後，即使你之後清理了也為時已晚

<!--
Git 保留完整歷史是它的優點，但在這個情境下就變成問題了。「刪掉再 commit」只是在歷史最上層加了一筆刪除記錄，舊的那筆 commit 還在，任何人都看得到。曾有安全研究者掃描 GitHub 上的 commit 歷史，找到大量仍然有效的 AWS 金鑰，那些主人以為刪掉就沒事了，結果已經被用掉幾萬美元了。接下來看正確的處理流程。
-->

---

# 正確的應對流程

<div style="background: #fef3c7; border-left: 4px solid #d97706; padding: 1rem 1.2rem; border-radius: 4px; margin-bottom: 1.2rem;">
  <strong>第一步永遠是：立即撤銷（Revoke）洩漏的金鑰！</strong><br>
  在清理 Git 歷史之前，先去撤銷那個 API key / 密碼，讓它失效。這才是最關鍵的一步。
</div>

完整處理流程：

1. **立即撤銷洩漏的金鑰**（去 AWS / GitHub / 服務提供商的設定頁面）
2. **產生新的金鑰**，放到環境變數或 Secrets Manager
3. **清理 Git 歷史**（使用 BFG Repo Cleaner 或 `git filter-repo`）
4. **Force push** 更新遠端 repository
5. **通知所有協作者**重新 `git clone`，因為大家本地的歷史都已過時
6. **事後預防**：加 `.gitignore`、用 `git-secrets` 等工具

<!--
處理順序很重要：一定要先撤銷金鑰，再清理歷史。不要先花時間清理歷史，因為爬蟲可能已經抓走了，多等一秒都是風險。撤銷金鑰讓舊的立即失效，即使有人抓到也沒用了。清理歷史是後續讓 repo 乾淨的動作。接下來看清理工具怎麼用。
-->

---

# 清理歷史的工具

```bash
# 方法一：使用 git filter-repo（現代推薦做法，需另外安裝）
$ pip install git-filter-repo

# 從所有歷史中移除包含密碼的檔案
$ git filter-repo --path config/database.yml --invert-paths

# 或者把特定字串（例如真實的密碼）替換成佔位符
$ git filter-repo --replace-text <(echo "實際密碼==>REDACTED")

# 方法二：BFG Repo Cleaner（Java 工具，速度很快）
$ java -jar bfg.jar --delete-files id_rsa  # 刪除特定檔案
$ java -jar bfg.jar --replace-text passwords.txt  # 取代特定字串

# 清理完畢後，強制推送更新遠端
$ git push --force --all
$ git push --force --tags
```

<br>

<div style="background: #fff8f0; border-left: 4px solid #d97706; padding: 1rem 1.5rem; border-radius: 4px;">
  <strong>推薦：</strong>使用 <code>git filter-repo</code>，它是 Git 官方推薦的替代 <code>filter-branch</code> 的工具，速度更快、更安全。
</div>

<!--
`git filter-branch` 是舊的做法，官方已不推薦，因為它慢且有已知問題。`git filter-repo` 是目前推薦的替代品，需要用 pip 安裝。BFG Repo Cleaner 是 Java 工具，操作比較直覺，適合用來刪整個檔案或取代特定字串。清理完歷史之後必須 force push，因為我們改寫了歷史，遠端和本地已經不一樣了。接下來看預防措施。
-->

---

# 預防勝於治療

```bash
# .gitignore 是第一道防線
# 把含有敏感資訊的檔案加入 .gitignore
.env
.env.local
config/secrets.yml
*.pem
*.key
credentials.json

# 使用環境變數，不要把值硬寫在程式碼裡
# ❌ 不好的做法
DB_PASSWORD = "my-super-secret-password"

# ✅ 好的做法
DB_PASSWORD = os.environ.get("DB_PASSWORD")
```

<br>

<div style="background: #fff8f0; border-left: 4px solid #d97706; padding: 1rem 1.5rem; border-radius: 4px;">
  推薦工具：<strong>git-secrets</strong>（AWS 出品）或 <strong>pre-commit hooks</strong>，在 commit 時自動掃描是否含有敏感資訊，有的話直接阻止 commit。
</div>

<!--
最好的方式當然是預防。`.gitignore` 要在專案一開始就設定好，不要等出事了才加。GitHub 在建立新 repo 時就有各種語言的 `.gitignore` 模板可以直接選。`git-secrets` 可以設定 pre-commit hook，在你嘗試 commit 時自動掃描有沒有符合敏感資訊格式的內容，有的話直接阻止，習慣養起來之後幾乎不用擔心這類問題。接下來進入第三個狀況題。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 3
## 【狀況題】只想要某個分支的某幾個 Commit

<!--
有時候 develop 分支上有一個修 bug 的 commit，但我們只想把這個 commit 帶到 main，不想把整個 develop merge 過去。這時候就要用 cherry-pick 了。
-->

---

# 什麼是 Cherry-pick？

Cherry-pick 字面意思是「摘櫻桃」——從一堆 commit 中，精準挑選你想要的那幾個，套用到目前的分支。

<br>

```text
develop: A ── B ── C ── D ── E
                   ↑
              只想要這個 hotfix commit

main:    A ── B ──────────────── C'
                  cherry-pick 之後，C 的變更被套用到 main
                  （但這是一個全新的 commit，hash 不同）
```

<br>

<div style="background: #fff8f0; border-left: 4px solid #d97706; padding: 1rem 1.5rem; border-radius: 4px;">
  <strong>重要：</strong>Cherry-pick 會產生一個<strong>全新的 commit</strong>，變更內容相同，但 commit hash、日期等資訊都不同。這不是「移動」原本的 commit，而是「複製一份改動」。
</div>

<!--
Cherry-pick 的概念其實不複雜：它把某個 commit 裡的「改動差異（diff）」抓出來，重新套用到目前的分支。所以新產生的 commit hash 和原本的不同，因為日期變了、parent commit 也不一樣了。記住這一點，之後如果兩個分支 merge，就不會對「同樣的改動出現兩次」感到困惑了。接下來看實際指令。
-->

---

# Cherry-pick 實戰

```bash
# 先查看你想要的 commit 在哪
$ git log --oneline develop
e5f6a7b 修正購物車金額計算錯誤（這個！）
d4c3b2a 新增結帳頁面 UI
c2b1a09 整合金流 API

# 切換到目標分支
$ git checkout main

# 套用指定的 commit
$ git cherry-pick e5f6a7b

# 套用一段範圍的 commits（不含起始，含結尾）
$ git cherry-pick c2b1a09..e5f6a7b

# 套用但不立即 commit（先看看改動再決定）
$ git cherry-pick e5f6a7b --no-commit
```

<!--
`git cherry-pick <hash>` 是最基本的用法，套用後會立即產生新的 commit。範圍語法 `a..b` 注意是「不含 a，含 b」，跟 `git log a..b` 的語意一樣。`--no-commit`（或 `-n`）很有用，它把改動套用到工作目錄但不自動 commit，讓你有機會調整後再一起 commit。接下來看遇到衝突怎麼處理。
-->

---

# Cherry-pick 遇到衝突怎麼辦？

```bash
# cherry-pick 時遇到衝突
$ git cherry-pick e5f6a7b
CONFLICT (content): Merge conflict in src/cart.js
error: could not apply e5f6a7b... 修正購物車金額計算錯誤

# 手動解決衝突後，繼續 cherry-pick
$ git add src/cart.js
$ git cherry-pick --continue

# 如果想放棄，回到 cherry-pick 之前的狀態
$ git cherry-pick --abort
```

<!--
Cherry-pick 的衝突處理流程跟 merge 衝突幾乎一樣：手動解決、`git add` 標記已解決、然後 `--continue` 繼續。接下來看三個控制指令的時機。
-->

---

# Cherry-pick 衝突：控制指令

| 指令 | 時機 |
| --- | --- |
| `git cherry-pick --continue` | 解決衝突後繼續 |
| `git cherry-pick --skip` | 跳過這個 commit（當改動已存在時） |
| `git cherry-pick --abort` | 完全放棄，回到操作前狀態 |

<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fff8f0; border-left: 4px solid #d97706; border-radius: 4px;">

**`--skip` 使用時機：** 一系列 cherry-pick 中，某個 commit 的改動在目標分支已存在，用 `--skip` 跳過避免重複套用。

</div>

<!--
`--skip` 比較少用，是在一系列 cherry-pick 中，某個 commit 的改動在目標分支已經存在了，用 `--skip` 跳過。後悔了可以 `--abort` 完全取消，回到操作前的乾淨狀態。接下來進入冷知識的第一個主題。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 4
## 【冷知識】怎麼樣把檔案真正的從 Git 裡移掉

<!--
前面「帳號密碼」那個主題提到過 git filter-repo，這裡我們更完整地討論「從 Git 歷史中徹底移除檔案」。這個需求不只是密碼問題，有時候是誤放了大型二進制檔案，讓 repo 越來越肥，拖慢 clone 速度。
-->

---

# `git rm` 只是「不再追蹤」，不是真正刪除

```bash
# git rm 把檔案從追蹤清單中移除，並刪除工作目錄裡的檔案
$ git rm secret.txt
$ git commit -m "移除 secret.txt"

# 但是！這個檔案在之前的 commit 裡仍然存在
$ git log --all --oneline
f9b3c1d 移除 secret.txt    ← 這個 commit 以後看不到了
a4e2b8f 新增 secret.txt    ← 但這個 commit 裡，secret.txt 還在！

# 任何人都可以這樣找回來
$ git show a4e2b8f:secret.txt
（顯示 secret.txt 的內容）
```

<br>

<div style="background: #fef3c7; border-left: 4px solid #d97706; padding: 1rem 1.2rem; border-radius: 4px;">
  要真正從 Git 歷史中移除一個檔案，必須<strong>重寫整個 commit 歷史</strong>。
</div>

<!--
`git rm` 做的事只是：從下一個 commit 開始，Git 不再追蹤這個檔案。但所有之前的 commit 原封不動，那些 commit 裡的檔案內容永遠都在。要真正移除，必須重寫歷史，這是一件嚴肅的事，因為所有後續 commit 的 hash 都會改變，所有協作者都會受影響。接下來看怎麼用 filter-repo 做這件事。
-->

---

# 使用 `git filter-repo` 真正移除檔案

```bash
# 安裝 git-filter-repo
$ pip install git-filter-repo
# 或 brew install git-filter-repo（macOS）

# 從所有歷史中完全移除指定檔案
$ git filter-repo --path secret.txt --invert-paths

# 移除整個目錄
$ git filter-repo --path config/credentials/ --invert-paths

# 移除所有超過 10MB 的大檔案（處理 repo 臃腫問題）
$ git filter-repo --strip-blobs-bigger-than 10M

# 完成後，清理殘留物件並強制推送
$ git gc --prune=now --aggressive
$ git push --force --all
$ git push --force --tags
```

<!--
`--invert-paths` 的意思是「保留除了這個路徑以外的所有東西」，也就是把指定路徑從每個 commit 裡移掉。`git filter-repo` 比舊的 `git filter-branch` 快上幾十倍，而且操作前會自動做安全檢查。`git gc` 是垃圾回收，把清理後產生的孤立物件真正從磁碟移除。接下來看操作後要做哪些事。
-->

---

# 操作後的注意事項

<div style="background: #fef3c7; border-left: 4px solid #d97706; padding: 1rem 1.2rem; border-radius: 4px; margin-bottom: 1rem;">
  <strong>⚠️ 重寫歷史會影響所有協作者！</strong>他們的本地端 clone 會和遠端產生分歧，必須重新 clone。
</div>

操作後的標準流程：

```bash
# 1. 備份（強烈建議操作前先備份整個 repo）
$ cp -r my-project my-project-backup

# 2. 執行 filter-repo，清理完成

# 3. Force push
$ git push --force --all && git push --force --tags

# 4. 通知所有協作者
# "大家注意：我剛剛重寫了 Git 歷史，請把你們的本地 clone 刪掉重新 clone"

# 5. 協作者的操作
$ cd ..
$ rm -rf my-project
$ git clone <remote-url>
```

<!--
Force push 之後，所有人本地的歷史都過時了。如果直接 git pull，會看到大量衝突，因為 commit hash 全變了。正確做法是通知大家重新 clone。這個操作最好在協作者最少的時間進行，例如下班後，並提前告知。做之前備份是個好習慣，萬一操作失誤還有退路。接下來看最後一個冷知識。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 5
## 【冷知識】斷頭（detached HEAD）是怎麼一回事？

<!--
你有沒有執行某個 Git 指令之後，突然看到「HEAD detached at xxxxxxx」這個訊息，然後有點不知所措？這不是 Git 壞掉了，讓我們搞清楚它是什麼、以及該怎麼處理。
-->

---

# 正常狀態下的 HEAD

在正常狀態下，HEAD 是這樣的：

```text
HEAD → main → commit A → commit B → commit C（最新）
```

HEAD 指向「目前所在的分支」，分支再指向「最新的 commit」。

```bash
# 查看 HEAD 指向哪裡
$ cat .git/HEAD
ref: refs/heads/main    ← HEAD 指向 main 分支（正常狀態）

# 查看目前在哪個分支
$ git branch
* main    ← 星號代表目前所在位置
  develop
```

<!--
HEAD 是 Git 裡最重要的指標，代表「你現在在哪裡」。正常情況下，HEAD 是一個符號參照，指向某個分支，分支再指向某個 commit。這樣的設計讓每次新增 commit 時，HEAD 透過分支自動往前移到最新的 commit。那什麼時候 HEAD 會不正常呢？接下來看。
-->

---

# Detached HEAD：HEAD 直接指向 Commit

Detached HEAD 就是 HEAD 不再指向分支，而是**直接指向某個 commit**。

```bash
# 觸發方式：checkout 一個 commit hash（而非分支名稱）
$ git checkout 3c7d2b1

Note: switching to '3c7d2b1'.
You are in 'detached HEAD' state.
（以下 Git 會詳細說明目前的狀況和你可以做什麼）

# 此時 HEAD 的內容
$ cat .git/HEAD
3c7d2b1a5e8b9f2...（直接是一個 hash，不是 ref）

# git branch 顯示
$ git branch
* (HEAD detached at 3c7d2b1)
  main
  develop
```

<!--
`git checkout 3c7d2b1` 讓 Git 把工作目錄切換到那個 commit 的狀態，但因為你沒有指定分支，HEAD 就只好直接指著那個 commit。除了 `git checkout <hash>`，`git checkout <tag>` 也會進入 detached HEAD，因為 tag 是固定的，不是分支。接下來看為什麼這個狀態要小心。
-->

---

# Detached HEAD 的危險：新 Commit 容易遺失

```text
在 detached HEAD 狀態下新增 commit：

main:     A ── B ── C ── D（main 還在這裡）
                    ↑
                   HEAD（你在這裡開始工作）

做了幾個 commit 之後：
          A ── B ── C ── D（main）
                    ↑
                    E ── F（這些 commit 沒有任何分支指向它們！）

一旦你切換回 main 或其他分支，E 和 F 就沒有任何東西指向它們了。
Git 的 garbage collection 最終會把它們清掉。
```

<!--
這是 detached HEAD 最需要注意的地方。沒有分支「保護」這些 commit，一旦你移動了 HEAD，這些 commit 就變成孤立的了。它們不會立刻消失——Git 預設 30 天後才執行 GC，這段時間內還可以透過 reflog 找回來——但超過期限或執行 `git gc` 之後就真的沒了。接下來看怎麼解決。
-->

---

# Detached HEAD 的解決方式

```bash
# 方法一：建立新分支，把當前狀態保存下來（最常用）
$ git checkout -b new-feature-branch
# 或 Git 2.23+ 的新語法
$ git switch -c new-feature-branch

# 方法二：如果在 detached HEAD 狀態做了一些 commit 想保留
$ git branch save-my-work    # 先建立分支指向目前位置
$ git checkout main          # 再切回去

# 方法三：如果什麼都沒做，只是來「看看」舊的版本
$ git checkout main          # 直接切回去就好，沒有任何損失

# 查看是否還在 detached HEAD 狀態
$ git status
HEAD detached at 3c7d2b1    ← 還在
On branch main               ← 已回到正常狀態
```

<!--
遇到 detached HEAD 最重要的判斷是：我有沒有在這個狀態下做了新的 commit？如果有，立刻用 `git branch <name>` 或 `git checkout -b <name>` 建立分支，讓這些 commit 有人「保管」。如果什麼都沒做只是來看看歷史，直接切回正常分支就好，完全沒有問題。接下來我們看什麼操作會觸發這個狀態。
-->

---

# 什麼時候會進入 Detached HEAD？

| 操作 | 是否進入 Detached HEAD |
| --- | --- |
| `git checkout <branch-name>` | 否，正常切換分支 |
| `git checkout <commit-hash>` | 是 |
| `git checkout <tag-name>` | 是（tag 不是分支） |
| `git rebase` 進行中 | 是（rebase 的內部機制） |
| `git bisect` 進行中 | 是（二分搜尋的內部機制） |

<br>

<div style="background: #fff8f0; border-left: 4px solid #d97706; padding: 1rem 1.5rem; border-radius: 4px;">
  <strong>記住：</strong>Detached HEAD 不是錯誤，只是「沒有分支保護」的狀態。只要你知道自己在做什麼，它是完全安全的。
</div>

<!--
了解哪些操作會觸發 detached HEAD，下次看到這個訊息就不會慌了。rebase 和 bisect 會暫時進入 detached HEAD 是它們內部機制需要的，完成後 Git 會自動帶你回到正常的分支狀態，不需要特別處理。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Q & A

<!--
這一章涵蓋了工作中常見的情境：stash 暫存工作、帳號密碼洩漏的正確處理、cherry-pick 精準挑選 commit、從歷史移除檔案，以及 detached HEAD 的成因與處理。有任何問題嗎？
-->
