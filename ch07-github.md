---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
title: 遠端共同協作 - 使用 GitHub
routeAlias: ch07
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
  <h1 style="color: #92400e; font-size: 3.8rem; font-weight: 900; line-height: 1.15; margin-bottom: 1.5rem;">遠端共同協作</h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #d97706, #fbbf24); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #b45309; font-size: 1.15rem; font-style: italic;">「使用 GitHub，讓世界各地的開發者一起協作」</p>
  <Link to="home" style="margin-top: 2rem; color: #d97706; font-size: 0.9rem;">← 返回目錄</Link>
</div>

<!--
前幾章我們都在自己的電腦上獨自作業，但真實的工作場景幾乎都是多人協作。這章要進入 GitHub，學習怎麼把本機的 repo 推上去、怎麼拿別人的更新、怎麼開 PR 讓同事審查程式碼。接下來我們會從基礎的 push 和 pull 開始，一步步帶大家掌握遠端協作的完整流程。
-->

---
layout: default
---

# Outline

- **GitHub 是什麼？** — 遠端 Repository 服務 / 社群平台
- **Push 上傳到 GitHub** — git remote / git push / 身份驗證
- **Pull 下載更新** — git pull / git fetch 的差別
- **【狀況題】怎麼有時候推不上去** — 遠端有新 commit / non-fast-forward
- **從伺服器上取得 Repository** — git clone
- **【常見問題】Clone 跟 Pull 有什麼不一樣？** — 首次取得 vs 更新
- **與其它開發者互動 - Pull Request** — Fork / PR 流程
- **【狀況題】怎麼跟上 fork 專案的進度** — upstream remote
- **【狀況題】怎麼刪除遠端的分支** — git push origin --delete
- **【狀況題】git push -f 可怕嗎？** — force push 的風險與使用時機
- **使用 GitHub 免費製作個人網站** — GitHub Pages
- **【冷知識】一定要有 GitHub 才能得到別人更新的檔案嗎？** — 純 Git 協作

<!--
這是本章的整體大綱，總共 12 個主題。我們會先搞清楚 Git 和 GitHub 的差別，然後學 push 和 pull 這兩個最基本的操作，接著處理幾個大家一定會踩到的狀況題，再來介紹 PR 這個協作核心，最後收尾幾個實用的延伸主題。接下來我們來看第一個主題。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 1
## GitHub 是什麼？

<!--
很多人學 Git 的第一步就是去申請 GitHub 帳號，所以常常把 Git 和 GitHub 當成同一件事。我們先把這個誤解釐清，這對後面的學習很重要。
-->

---

# GitHub 是什麼？

**Git** 是版本控制工具（本機程式），**GitHub** 是提供 Git 遠端託管的**平台服務**。

<br>

| | Git | GitHub |
| --- | --- | --- |
| 本質 | 版本控制軟體 | 雲端託管平台 |
| 安裝 | 需要安裝在本機 | 網頁服務，不需安裝 |
| 離線使用 | 可以 | 不行 |
| 擁有者 | Linux 社群（開源） | Microsoft（2018 年收購） |

<br>

<div style="background: #fff8f0; border-left: 4px solid #d97706; padding: 1rem 1.5rem; border-radius: 4px;">

**一句話總結：** Git 是工具，GitHub 是使用這個工具的協作平台。就像 Email 協定（SMTP）和 Gmail 的關係。

</div>

<!--
想像一下：Gmail 壞掉了，不代表 Email 這個東西不存在，我們還是可以用其他信箱。同理，就算沒有 GitHub，Git 還是可以正常運作。Git 在 2005 年就有了，GitHub 是 2008 年才成立的。理解這個差別，才能知道為什麼有時候「離線也能 commit」，但「推不上去可能是 GitHub 的問題」。接下來我們來看 GitHub 還提供了哪些功能。
-->

---

# GitHub 的核心功能

GitHub 除了存放 Repository，還提供了完整的**開發協作生態系**：

<div class="grid grid-cols-2 gap-6 mt-4">
<div>

**協作功能**

- **Issues** — 問題追蹤、任務管理
- **Pull Requests** — 程式碼審查與合併
- **Projects** — 看板式專案管理
- **Wiki** — 文件撰寫

</div>
<div>

**自動化與部署**

- **Actions** — CI/CD 工作流程自動化
- **Pages** — 靜態網站免費托管
- **Releases** — 版本發布管理
- **Packages** — 套件發布（npm, Docker 等）

</div>
</div>

<br>

**競爭對手：**

| 平台 | 特色 |
| --- | --- |
| GitLab | 開源版可自架、內建 CI/CD 功能強大 |
| Bitbucket | Atlassian 生態系（Jira、Confluence）整合佳 |
| Azure DevOps | 微軟企業環境整合 |

<!--
GitHub 現在幾乎是整個開發生命週期的平台，從需求追蹤、程式碼審查、自動化部署，到文件管理都包辦了。如果你是開源愛好者，GitHub 是首選；公司已經用 Atlassian 工具的話，Bitbucket 整合比較好；偏向 DevOps 的企業環境，GitLab 或 Azure DevOps 也很有競爭力。不過對大多數人來說，先把 GitHub 學好就夠用了。
-->

---

# 開始使用 GitHub — SSH Key 設定

使用 **SSH** 連線 GitHub 是最方便且安全的方式，設定一次就不需要每次輸入密碼。

```bash
# 第一步：產生 SSH 金鑰對
ssh-keygen -t ed25519 -C "your_email@example.com"
# 按 Enter 接受預設路徑，可設定 passphrase（建議設定）

# 第二步：複製公鑰
# macOS / Linux
cat ~/.ssh/id_ed25519.pub

# Windows (PowerShell)
Get-Content "$env:USERPROFILE\.ssh\id_ed25519.pub"
```

<br>

第三步：到 GitHub → **Settings** → **SSH and GPG keys** → **New SSH key**，貼上公鑰內容。

```bash
# 第四步：測試連線
ssh -T git@github.com
# 成功訊息：Hi <username>! You've successfully authenticated...
```

<!--
SSH Key 的設定只需要做一次，但很多同學在這步會卡住。重點是：你產生的是一對金鑰，私鑰（id_ed25519）就像家裡的鑰匙，絕對不能給別人；公鑰（id_ed25519.pub）才是放到 GitHub 上的，就像你家門上的鎖。ed25519 是目前推薦的演算法，比舊的 rsa 更安全也更快。設定好之後，以後 push 和 pull 都不用再輸入密碼了。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 2
## Push 上傳到 GitHub

<!--
帳號有了，SSH 也設定好了。現在來學最核心的操作：怎麼把本機的 repo 推送到 GitHub，讓別人也看得到你的程式碼。
-->

---

# 關聯遠端 Repository

要把本機 repo 連結到 GitHub，需要先「告訴」Git 遠端的位址。

```bash
# 查看目前已設定的遠端
git remote -v

# 新增遠端（origin 是慣用名稱，代表「主要遠端」）
git remote add origin git@github.com:username/repo-name.git

# 修改遠端 URL（例如從 HTTPS 改成 SSH）
git remote set-url origin git@github.com:username/repo-name.git

# 移除遠端設定
git remote remove origin
```

<br>

<div style="background: #fff8f0; border-left: 4px solid #d97706; padding: 1rem 1.5rem; border-radius: 4px;">

**origin** 只是個名稱（慣例），你可以改成任何名字，但整個 Git 社群都用 origin，建議不要打破慣例。

</div>

<!--
你有沒有注意到，git remote -v 後面那個 v 代表 verbose，就是「顯示詳細資訊」的意思，會同時列出 fetch 和 push 的 URL。origin 這個名字是慣例，當你執行 git clone 的時候，Git 會自動把遠端命名為 origin。大家都用這個名字，所以看到別人的教學或文章，大家都知道 origin 是什麼，不用再解釋。接下來我們來看怎麼第一次推送。
-->

---

# 第一次推送 `git push`

```bash
# 第一次推送，同時設定 upstream tracking
git push -u origin main

# 之後的推送（因為 upstream 已設定）
git push

# 推送指定分支
git push origin feature/login

# 推送所有分支
git push --all origin
```

<br>

**`-u` 旗標（--set-upstream）做了什麼？**

| 執行前 | 執行後 |
| --- | --- |
| `git push` 不知道要推到哪 | `git push` 自動推到 `origin/main` |
| `git pull` 不知道要從哪拉 | `git pull` 自動從 `origin/main` 拉 |

<!--
-u 這個旗標很重要，它幫本機分支和遠端分支建立了「追蹤關係」。想像一下你跟同事說「我的報告就放在那個共用資料夾裡」，之後你們就知道固定去那個地方找，不用每次都說地址。-u 就是在做這件事，讓 Git 知道這個本機的 main 對應到 origin 的 main。設定好之後，之後直接 git push 就行了，不用再加 origin main。
-->

---

# 身份驗證：HTTPS vs SSH

GitHub 支援兩種連線方式，各有優劣：

<div class="grid grid-cols-2 gap-6">
<div>

**HTTPS 方式**

```bash
# Clone URL 格式
https://github.com/user/repo.git

# 每次操作需要驗證
# 建議使用 Personal Access Token（PAT）
# GitHub 已停用帳號密碼驗證
```

- 防火牆友善（port 443）
- Token 需要定期更新
- 適合：公司網路有限制的環境

</div>
<div>

**SSH 方式**

```bash
# Clone URL 格式
git@github.com:user/repo.git

# 設定好 SSH Key 後完全免密碼
# 使用 port 22（或 443 via ssh.github.com）
```

- 設定一次，長期免密碼
- 安全性高（非對稱加密）
- 適合：個人開發者的首選

</div>
</div>

<br>

<div style="background: #fef3c7; border-left: 4px solid #d97706; padding: 1rem 1.2rem; border-radius: 4px;">

**注意：** GitHub 自 2021 年起已停用「帳號密碼」的 HTTPS 驗證。若使用 HTTPS，必須用 **Personal Access Token（PAT）** 代替密碼。

</div>

<!--
2021 年 8 月 GitHub 停用密碼驗證之後，很多人突然發現 git push 推不上去了，原因就是他們一直用帳號密碼登入。現在如果你要用 HTTPS，必須到 GitHub 設定頁面產生 Personal Access Token，把它當密碼貼上去。PAT 可以設定有效期限和權限，比舊密碼更安全。但說實話，如果可以選，SSH 真的方便很多，一次設定就好了。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 3
## Pull 下載更新

<!--
推上去了，那怎麼把別人的更新下載回來？這是 push 的反向操作，但其實有兩個指令可以做到：fetch 和 pull，我們來搞清楚差別在哪。
-->

---

# `git fetch` vs `git pull`

這是很多人搞混的地方，先用圖來理解：

```
遠端（origin/main）:  A → B → C → D
本機（main）:         A → B
```

<br>

**`git fetch origin`** — 只下載，不改動工作目錄

```bash
git fetch origin
# 現在本機有 origin/main 指向 D，但 main 還在 B
# 可以用 git log origin/main 查看遠端的新 commit
git log origin/main --oneline
```

**`git pull`** = `git fetch` + `git merge`

```bash
git pull
# 等同於：git fetch origin && git merge origin/main
# 直接把 main 推進到 D，工作目錄也跟著更新
```

<!--
fetch 和 pull 的差別可以這樣想：fetch 就像去信箱拿信，但先放在玄關桌上，還沒有拆開；pull 是直接拿進去、拆開、讀完。fetch 只把遠端的資訊同步到本機的「遠端追蹤分支」origin/main，不會動到你正在工作的 main 分支。pull 則是直接合併進來。建議養成先 fetch、看一下有什麼更新再決定要不要 merge 的習慣，特別是在共享分支上工作的時候。
-->

---

# `git pull --rebase` — 更乾淨的歷史

如果你本機也有新 commit，pull 後歷史會產生一個「合併 commit」：

```
# 用 git pull（merge）後的歷史
A → B → E（merge commit）
      ↗ ↘
    C   D（遠端的 commit）

# 用 git pull --rebase 後的歷史
A → B → C → D → E（你的 commit 接在最後，歷史是線性的）
```

<br>

```bash
# 使用 rebase 策略拉取
git pull --rebase

# 設定為預設行為（推薦）
git config --global pull.rebase true
```

<div style="background: #fff8f0; border-left: 4px solid #d97706; padding: 1rem 1.5rem; border-radius: 4px; margin-top: 1rem;">

**建議：** 個人分支使用 `--rebase` 保持線性歷史。共享分支視團隊規範而定。

</div>

<!--
--rebase 的好處是歷史很乾淨，線性一條，git log --oneline 看起來賞心悅目。壞處是如果 rebase 過程有衝突，需要解決完再繼續，對初學者來說多了一個步驟。設定 pull.rebase true 是我個人很推薦的全域設定，可以讓你的 git log 更好看，code review 的時候也更容易追蹤每個 commit 的意義。接下來我們來看一個很常見的狀況題。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 狀況題
## 怎麼有時候推不上去？

<!--
你有沒有遇過這種情況：明明 git push 用了很多次都成功，但某天突然失敗，跳出一堆英文錯誤訊息？這是多人協作裡最常見的狀況，我們來看看發生了什麼事。
-->

---

# 推不上去！non-fast-forward 錯誤

```bash
$ git push origin main
To github.com:username/repo.git
 ! [rejected]        main -> main (non-fast-forward)
error: failed to push some refs to 'github.com:username/repo.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
```

<br>

**原因：** 遠端有你沒有的 commit，你的歷史已經「落後」了。

```
遠端（origin/main）:  A → B → C（別人 push 的）
你的本機（main）:      A → B → D（你自己的）
```

Git 拒絕這次 push，因為這樣會**覆蓋掉** C。

<!--
non-fast-forward 這個錯誤訊息看起來很嚇人，但其實是 Git 在保護我們和同事。想像一下，你和同事都在編輯同一份 Google 文件，他剛存檔了一個版本，你如果直接把你的版本蓋上去，他的修改就不見了。Git 拒絕這次 push，就是在說「你少了別人的東西，先把那些東西整合進來再說」。接下來我們來看怎麼解決。
-->

---

# 解決 non-fast-forward

**正確做法：先拉取整合，再推送**

```bash
# 方法一：pull（fetch + merge），產生一個 merge commit
git pull origin main
git push origin main

# 方法二：pull --rebase（推薦），保持線性歷史
git pull --rebase origin main
git push origin main

# 如果 rebase 過程中有衝突，解完之後
git add .
git rebase --continue
git push origin main
```

<br>

<div style="background: #fef3c7; border-left: 4px solid #d97706; padding: 1rem 1.2rem; border-radius: 4px;">

**警告：** 不要對共享分支（main、develop）執行 `git push --force` 來「強制」解決這個問題！這會讓其他人的本機歷史和遠端不一致，造成更大的麻煩。

</div>

<!--
解法其實很直觀，就是先把遠端的東西拉回來整合，再推上去。用 merge 的話，你和同事的 commit 都會保留，但會多一個 merge commit。用 rebase 的話，你的 commit 會接到遠端最新的後面，歷史比較乾淨。初學者建議先用 pull merge，比較直覺，不容易出錯。千萬不要用 force push 來硬解這個問題，那會造成更大的麻煩，force push 的細節我們後面會專門討論。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 5
## 從伺服器上取得 Repository

<!--
前面學的是「已有本機 repo，推到 GitHub」。現在反過來：如果你是新加入一個專案，或者在一台新電腦上工作，怎麼從 GitHub 把完整的 repo 拿下來？答案就是 git clone。
-->

---

# `git clone` — 複製遠端 Repository

```bash
# 基本用法：clone 到當前目錄（會建立 repo-name 資料夾）
git clone git@github.com:username/repo-name.git

# 指定目標目錄名稱
git clone git@github.com:username/repo-name.git my-project

# Clone 後自動進入目錄
git clone git@github.com:username/repo-name.git && cd repo-name
```

<br>

**Clone 後 Git 自動幫你做好的事：**

| 動作 | 說明 |
| --- | --- |
| 下載完整歷史 | 所有 commit、分支、tag 都複製過來 |
| 設定 origin | `git remote -v` 就能看到 origin 指向來源 |
| checkout main | 自動切換到預設分支 |
| 設定 tracking | 本機 main 自動追蹤 origin/main |

<!--
git clone 是進入一個新專案最常用的第一步。它背後其實做了好幾件事：建立空的 repo、設定遠端、下載所有資料、切換到預設分支，但你只需要一行指令就搞定了。Clone 下來的是完整歷史，不是只有最新的快照，所以你可以查看所有的 log 和 diff，就像這個專案的所有檔案記錄都在你的電腦裡一樣。接下來看一個進階用法。
-->

---

# Shallow Clone — 只取最新快照

當 Repository 的歷史非常龐大時，可以用 `--depth` 只取最近幾個 commit：

```bash
# 只取最新 1 個 commit 的快照（最常用）
git clone --depth 1 git@github.com:username/repo-name.git

# 取最近 10 個 commit
git clone --depth 10 git@github.com:username/repo-name.git

# CI/CD 環境常用（速度快，節省空間）
git clone --depth 1 --single-branch --branch main <url>
```

<br>

| | 完整 Clone | Shallow Clone |
| --- | --- | --- |
| 歷史記錄 | 完整 | 只有指定深度 |
| 下載大小 | 較大 | 較小，速度快 |
| `git log` | 完整歷史 | 有限歷史 |
| 適合場景 | 開發工作 | CI/CD、單純部署 |

<!--
Shallow clone 在 CI/CD 場景非常有用。想像一下，如果你用 GitHub Actions 做自動部署，每次 build 都要完整 clone 一個有幾千個 commit 的大型專案，光下載就浪費很多時間和頻寬。--depth 1 只取最新的一個快照，通常 build 只需要最新的程式碼，完全夠用。但如果你要做 git blame 或查歷史 log，就要用完整的 clone，這點要注意一下。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 常見問題
## Clone 跟 Pull 有什麼不一樣？

<!--
很多同學會問：我已經用 clone 把 repo 拿回來了，為什麼還需要 pull？讓我們來說清楚這兩個指令分別在什麼時候用。
-->

---

# Clone vs Pull — 適用場景完全不同

<div class="grid grid-cols-2 gap-6">
<div>

**`git clone`**

- **第一次**取得 repository
- 從無到有，建立完整的本機 repo
- 包含所有歷史、分支、設定
- 每個 repo 只用一次

```bash
# 第一次加入新專案
git clone git@github.com:company/project.git
```

</div>
<div>

**`git pull`**

- **已有**本機 repo，取得最新更新
- 只下載「差異」的部分
- 更新你的工作目錄
- 每次開始工作前都應該執行

```bash
# 每天開始工作的第一件事
git pull
```

</div>
</div>

<br>

<div style="background: #fff8f0; border-left: 4px solid #d97706; padding: 1rem 1.5rem; border-radius: 4px;">

**類比：** Clone 就像搬進新辦公室（一次性），Pull 就像每天早上看最新的公告（定期執行）。

</div>

<!--
搬進新辦公室是一次性的動作，你不會每天早上「重新搬一次」；但你每天早上進辦公室會看看公告板有沒有新消息。clone 和 pull 的關係就是這樣，clone 是「建立」副本，只做一次；pull 是「更新」副本，每次別人有新的東西都要做。好習慣是：每次開始工作前先 git pull，確保自己在最新狀態上工作，之後合併的麻煩就少很多。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 7
## 與其它開發者互動 — Pull Request

<!--
現在來到協作的核心：Pull Request。不管你是參與開源專案還是公司內部開發，PR 都是你最常用的協作工具之一。我們來看它解決了什麼問題。
-->

---

# 為什麼需要 Pull Request？

**直接 push 到 main 的問題：**
- 沒有人審查你的程式碼
- 一個人的錯誤直接影響所有人
- 無法討論、無法提問
- 不知道為什麼要做這個改動

<br>

**Pull Request（PR）解決了這些問題：**

| 功能 | 說明 |
| --- | --- |
| Code Review | 其他人可以看你的改動、留下評論 |
| 討論 | 可以在 PR 上討論設計決策 |
| CI 驗證 | 自動跑測試，確保不會 break 主幹 |
| 歷史留存 | 每個功能為什麼這樣做都有記錄 |
| 合併控制 | 只有通過審查的程式碼才能進 main |

<!--
想像一下，四個人同時在修改同一個系統，沒有人知道別人在改什麼，也沒有人在確認「這樣改有沒有問題」。直接 push 到 main 就是這種狀況。Pull Request 的「Pull」是有意義的，你在請求別人把你的改動「拉」進去主幹，這個機制讓每次程式碼進到主幹之前都有人確認過，大大降低 bug 進到生產環境的機率。接下來看 Fork 工作流程。
-->

---

# Fork 工作流程

**參與開源專案或外部 Repository 的標準流程：**

```
1. Fork：在 GitHub 網頁上，按「Fork」按鈕
   → 把別人的 repo 複製一份到你自己的帳號下

2. Clone：把你自己的 fork 下載到本機
   git clone git@github.com:YOUR_USERNAME/repo.git

3. 建立功能分支（不要直接在 main 上開發）
   git checkout -b feature/my-feature

4. 開發、commit
   git add . && git commit -m "feat: add my feature"

5. 推送到你的 fork
   git push origin feature/my-feature

6. 在 GitHub 上開 Pull Request
   → 從你的 fork/feature/my-feature → 原始 repo/main
```

<!--
Fork 讓你有一個完整的副本可以自由修改，不會影響原始 repo，這也是開源協作的標準做法。建立功能分支是個好習慣，讓每個 PR 只做一件事，審查者比較容易理解你在改什麼。推送到你的 fork 之後，GitHub 通常會自動跳出提示「這個分支有新的 push，要開 PR 嗎？」，非常方便。接下來看 merge PR 的三種方式。
-->

---

# Merge PR 的三種方式

在 GitHub 上 merge PR 時，有三個選項，選擇不同，歷史的呈現方式也不同：

| 方式 | 歷史呈現 | 適合場景 |
| --- | --- | --- |
| **Create merge commit** | 保留所有 commit + 加一個 merge commit | 想保留完整開發歷史 |
| **Squash and merge** | 把所有 commit 壓成一個 commit | PR 裡有很多「fix typo」等雜 commit |
| **Rebase and merge** | 把 commit 線性接到 main 上 | 想要乾淨的線性歷史 |

<br>

<div style="background: #fff8f0; border-left: 4px solid #d97706; padding: 1rem 1.5rem; border-radius: 4px;">

**團隊建議：** 統一使用一種方式，寫進 `CONTRIBUTING.md`，避免風格混亂。許多團隊使用 **Squash and merge**，確保 main 上每個 commit 對應一個完整功能。

</div>

<!--
三種合併方式都有人用，沒有絕對的對錯。Squash 的好處是讓 main 的歷史很乾淨，每個 commit 對應一個功能；Rebase 保留線性歷史但重寫了 commit SHA；Merge commit 最保守，歷史完整但會有很多 merge commit。重點是團隊統一規範，大家都用同一種，不要讓 main 的歷史風格混亂，未來查 log 會很痛苦。
-->

---

# PR 最佳實踐

**讓你的 PR 更容易被 review：**

<div class="grid grid-cols-2 gap-6">
<div>

**Do ✅**

- 一個 PR 只做一件事
- 清楚的標題（動詞開頭）
- 描述「為什麼」，不只是「做了什麼」
- 附上相關 Issue 連結（`Fixes #123`）
- PR 大小合理（< 400 行改動）
- 先自己 review 一遍再送出

</div>
<div>

**Don't ❌**

- 一個 PR 夾帶多個不相關功能
- 標題寫「update」、「fix」等模糊文字
- 沒有描述就送出
- PR 改動超過 1000 行
- 解決衝突時用「accept all mine」
- 沒有跑過測試就推

</div>
</div>

<!--
PR 是一個溝通工具，寫好 PR 描述是對 reviewer 的尊重。「Fixes #123」這個語法在 merge 之後會自動關閉對應的 Issue，非常方便。小 PR 原則很重要，超過 400 行的改動，reviewer 很難仔細看，review 品質就下降了。如果功能很大，考慮拆成多個 PR 分步驟合併，每個 PR 做一件事，審查起來輕鬆很多。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 狀況題
## 怎麼跟上當初 fork 專案的進度？

<!--
你有沒有遇過這種情況：三個月前 fork 了一個開源專案，現在原始專案已經有幾十個新的 commit，你的 fork 落後很多，想提 PR 卻有一堆衝突。怎麼把原始專案的更新同步回來？
-->

---

# 同步 Fork 與原始 Repo

**核心概念：** 除了 `origin`（你的 fork），還要加一個 `upstream`（原始 repo）遠端。

```bash
# 第一步：加入 upstream 遠端（只需要設定一次）
git remote add upstream git@github.com:original-owner/repo.git

# 確認兩個遠端都設定好了
git remote -v
# origin    git@github.com:YOUR_USERNAME/repo.git (fetch)
# origin    git@github.com:YOUR_USERNAME/repo.git (push)
# upstream  git@github.com:original-owner/repo.git (fetch)
# upstream  git@github.com:original-owner/repo.git (push)

# 第二步：從 upstream 取得最新資料
git fetch upstream

# 第三步：把 upstream/main 的更新合併到本機 main
git checkout main
git merge upstream/main
# 或是用 rebase 保持線性歷史
git rebase upstream/main

# 第四步：推回你自己的 fork（讓 GitHub 上的 fork 也更新）
git push origin main
```

<!--
upstream 這個名字代表「上游」，也就是原始的 repo。這個 sync fork 的流程在開源貢獻中非常常用。如果你的 fork 落後太多，提出的 PR 就可能有很多衝突，維護者要花很多時間處理，你的 PR 被合併的機率也會降低。保持 fork 和 upstream 同步是個好習慣，GitHub 現在也在網頁上提供了「Sync fork」按鈕，一鍵就能同步，非常方便。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 狀況題
## 怎麼刪除遠端的分支？

<!--
分支合併完之後，遠端上的分支不會自動消失。久了 GitHub 上會有一堆廢棄的 feature 分支，看起來很亂。怎麼把它們清掉？
-->

---

# 刪除遠端分支

```bash
# 方法一：現代語法（推薦）
git push origin --delete feature/login

# 方法二：舊語法（效果相同）
git push origin :feature/login
# 注意：分支名前面有個冒號，意思是「推送空的內容到遠端分支」

# 刪除本機的遠端追蹤分支（清理已不存在的遠端分支引用）
git remote prune origin
# 或是在 fetch 時順便清理
git fetch --prune
```

<br>

<div style="background: #fff8f0; border-left: 4px solid #d97706; padding: 1rem 1.5rem; border-radius: 4px;">

**注意：** 刪除遠端分支**不會**影響你的本機分支，只是把 GitHub 上的分支移除。如果你想同時刪除本機分支：`git branch -d feature/login`

</div>

<br>

**GitHub 自動刪除設定：** Repo Settings → General → 勾選 **Automatically delete head branches**，PR merge 後自動刪除遠端分支。

<!--
git push origin :branchname 這個舊語法很難直覺理解，但你在舊教材裡常看到，要知道它的意思：「推送空的內容到 feature/login，等於刪掉它」。現代的 --delete 語法更易讀，建議用這個。prune 的意思是「修剪」，執行後會把本機記錄的「已刪除遠端分支引用」清掉，讓 git branch -r 的結果清爽一些。GitHub 的自動刪除設定非常推薦開啟，省去手動清理的麻煩。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 狀況題
## git push -f 很可怕嗎？

<!--
force push 是 Git 裡讓很多人又愛又怕的指令。它到底做了什麼？什麼時候能用？什麼時候絕對不能用？我們來把這件事說清楚。
-->

---

# `git push --force` 的危險

**force push 做了什麼：** 強制讓遠端歷史和你的本機歷史一致，**覆蓋掉**遠端的歷史。

```
遠端（origin/main）: A → B → C → D
你的本機（main）:     A → B → X → Y（你做了 rebase，改寫了歷史）

git push --force
→ 遠端變成： A → B → X → Y
→ C 和 D 在遠端「消失」了
```

**同事 Alice 的本機：**
```
Alice 的 main: A → B → C → D → E（她基於 D 繼續開發了 E）
現在遠端沒有 D 了，Alice 的歷史和遠端不一致
git pull 會出現大量衝突，甚至讓 Alice 很困惑
```

<!--
force push 的問題在於，它是以「你的版本為主」強制覆蓋遠端，不管遠端有沒有別人的 commit。別人的工作可能就這樣在遠端消失，雖然他們本機還有，但下次 pull 的時候會出現很複雜的衝突。最嚴重的情況是，如果同事不注意，可能用 git reset --hard 把自己本機的 commit 也搞丟了。這就是為什麼 force push 到 main 是很多公司明文禁止的行為。
-->

---

# Force Push 的正確使用時機

**`git push --force-with-lease` — 更安全的 force push**

```bash
# 不安全：直接覆蓋遠端，不管有沒有別人的新 commit
git push --force

# 較安全：先確認遠端沒有你不知道的新 commit，再 force push
git push --force-with-lease
# 如果遠端有新 commit（別人 push 了），這個指令會失敗，保護你不誤刪別人的工作
```

<br>

**何時可以 force push：**

| 情境 | 可以？ | 說明 |
| --- | --- | --- |
| 個人的 feature 分支 | ✅ | 只有你一個人在用 |
| 修正 PR 後重新推 | ✅ | 還沒有人 merge，沒問題 |
| 共享的 develop 分支 | ⚠️ | 事先溝通，大家停工再做 |
| main / master 分支 | ❌ | 嚴格禁止 |

<!--
--force-with-lease 是個非常好的設計，給 force push 加了一個安全網。它的原理是：記住你上次 fetch 時遠端分支的位置，如果現在遠端的位置和你記錄的不一樣，代表有人 push 了新 commit，就拒絕 force push。不是百分之百安全，但比無腦 --force 安全很多。很多公司的規範是「可以用 --force-with-lease，但禁止用 --force」。接下來換個輕鬆的主題。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 11
## 使用 GitHub 免費製作個人網站

<!--
來介紹一個很實用的 GitHub 功能：GitHub Pages。你可以免費把靜態網站部署到網路上，非常適合做個人作品集或技術部落格，而且設定不難。
-->

---

# GitHub Pages — 免費靜態網站托管

**兩種使用方式：**

<div class="grid grid-cols-2 gap-6">
<div>

**個人 / 組織網站**

建立名稱為 `<username>.github.io` 的 repo

```bash
# 例如 GitHub 帳號是 johndoe
# 建立 repo：johndoe.github.io

git clone git@github.com:johndoe/johndoe.github.io.git
cd johndoe.github.io

# 建立首頁
echo "<h1>Hello World</h1>" > index.html

git add index.html
git commit -m "init: first page"
git push origin main
```

網址：`https://johndoe.github.io`

</div>
<div>

**專案網站**

任何 repo 都可以在 Settings 開啟 Pages

- Settings → Pages
- Source: Deploy from a branch
- Branch: `gh-pages` 或 `main`（可選 `/docs` 資料夾）

```bash
# 推送到 gh-pages 分支
git checkout -b gh-pages
git push origin gh-pages
```

網址：`https://johndoe.github.io/repo-name`

</div>
</div>

<!--
GitHub Pages 是完全免費的靜態網站托管，由 GitHub 的 CDN 提供服務，速度不差。限制是只能托管靜態內容（HTML、CSS、JavaScript），沒辦法跑後端程式。對前端開發者、學生做作品集、技術文件網站來說非常夠用。很多開源專案的官網就是用 GitHub Pages 架的，個人域名也可以設定 CNAME 指向它。接下來看進階的用法。
-->

---

# GitHub Pages 進階：搭配靜態網站生成器

```bash
# 搭配 Jekyll（GitHub 原生支援，無需 Actions）
# 只要 repo 根目錄有 _config.yml，GitHub 自動 build

# 搭配 Hugo 或其他框架，用 GitHub Actions 自動部署
# .github/workflows/deploy.yml 範例：
```

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build
        run: npm run build  # 或 hugo、mkdocs build 等
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

<!--
靜態網站生成器搭配 GitHub Pages 是技術部落格的主流方案。Jekyll 是 GitHub 原生支援的，push markdown 就自動編譯，不需要額外設定。但 Jekyll 比較慢，現在更多人用 Hugo（Go 寫的，build 超快）或 Astro。搭配 GitHub Actions，每次 push 到 main 就自動 build 和部署，完全自動化，免費又穩定，是個人作品集的好選擇。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 冷知識
## 一定要有 GitHub 才能得到別人更新的檔案嗎？

<!--
我們學了這麼多 GitHub 相關的東西，最後來重新思考 Git 的本質：Git 其實不需要 GitHub 也能做到遠端協作，因為 Git 本身是分散式的設計。
-->

---

# Git 的分散式本質

GitHub 只是協調多人協作最方便的工具，但 Git 本身是**分散式**的，不需要中央伺服器。

```bash
# 把本機的某個目錄設定為「遠端」（同一台電腦的不同路徑）
git remote add local-backup /Users/alice/Backups/my-project.git

# 推送到本機路徑
git push local-backup main

# 用本機路徑 clone
git clone /path/to/another/repo my-copy

# 用 file:// 協定（強制使用 Git 協定，不走捷徑）
git clone file:///path/to/another/repo my-copy
```

<br>

**在區域網路內架設 Git 伺服器：**

```bash
# 用 git daemon 在區網提供 Git 服務（唯讀）
git daemon --reuseaddr --base-path=/srv/git/ /srv/git/

# 其他人可以 clone
git clone git://192.168.1.100/my-project.git
```

<!--
這個冷知識讓我們更深刻地理解 Git 的設計哲學。Git 是去中心化的，每個人的本機都是一個完整的 repo，GitHub 只是大家約定好的「協調點」。在公司內網不通外網、或保密專案不能放雲端的情境下，就可以用 git daemon 或在自己的伺服器上架設 Git 服務。兩台電腦在同一個 WiFi 下，甚至可以直接互相 push/pull，完全不需要任何伺服器。接下來我們來看各種替代方案的總覽。
-->

---

# 沒有 GitHub 的協作方式總覽

| 方式 | 工具 | 適合場景 |
| --- | --- | --- |
| 本機路徑 | `git remote add` + 路徑 | 同一台電腦的備份 |
| USB 隨身碟 | `git clone /media/usb/repo.git` | 離線環境 |
| 區網 Git daemon | `git daemon` | 辦公室內網 |
| SSH 伺服器 | `git clone user@host:/path/repo.git` | 自架 SSH 服務器 |
| 自架 GitLab | GitLab Community Edition | 需要完整 GitHub 功能但要自架 |
| Gitea | 輕量 Go 寫的自架方案 | 低資源需求的私有 Git 服務 |

<br>

<div style="background: #fff8f0; border-left: 4px solid #d97706; padding: 1rem 1.5rem; border-radius: 4px;">

**結論：** GitHub 提供的是**便利性**和**社群**，不是 Git 的必要元件。理解這一點，才能真正理解 Git 的架構設計。

</div>

<!--
需要私有 Git 服務時，Gitea 是個很輕量的選擇，用 Go 寫的，一個 binary 就能跑，可以部署在樹莓派上。GitLab Community Edition 功能更完整，有內建 CI/CD，但資源需求也更高。如果只是個人小團隊，Gitea 就夠用了。當然，如果不需要完整的 web UI，直接用 bare git repository 加 SSH 是最簡單的方案，什麼都不用安裝。
-->

---
layout: end
---

# Ch 7 結束

### 開始用 GitHub 與世界各地的開發者協作

<Link to="home" style="margin-top: 1.5rem; display: inline-block; color: #d97706;">← 返回目錄</Link>

<!--
第七章到這裡結束。這章涵蓋了遠端協作最重要的概念：remote、push、pull、clone、PR、fork，以及幾個常見的疑難狀況。接下來的第八章，我們會介紹 Git Flow，一套讓團隊協作更有規範的分支管理策略，大家可以繼續往下看。
-->
