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
歡迎來到第七章「遠端共同協作」。前幾章我們都在本機獨自作業，但現在要進入更真實的工作場景——多人協作。GitHub 是目前最主流的 Git 遠端平台，不管你是個人開發者想展示作品集，還是在公司跟同事協作，都離不開它。這章我們會從基礎的推送拉取，到 Pull Request 工作流程，一步步帶大家掌握遠端協作的精髓。
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
這是本章的整體大綱。我們會先介紹 GitHub 平台本身，然後學習最基礎的 push 和 pull，接著處理幾個常見的疑難狀況，再來介紹 Pull Request 這個多人協作的核心機制，最後收尾幾個實用的延伸主題。大約 12 個主題，內容相當豐富，讓我們開始吧。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 1
## GitHub 是什麼？

<!--
第一個主題：GitHub 是什麼？很多初學者會把 Git 和 GitHub 混為一談，這是非常常見的誤解，我們先把這個概念釐清。
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
很多人學 Git 的第一步就是去申請 GitHub 帳號，所以會誤以為它們是同一件事。其實 Git 在 2005 年由 Linus Torvalds 開發，GitHub 則是 2008 年才成立的公司。你完全可以在沒有 GitHub 的情況下使用 Git，反過來，GitHub 上也可以使用其他 VCS（雖然不常見）。理解這個差別，對之後的學習會很有幫助。
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
GitHub 現在已經不只是個「放程式碼的地方」了。它幾乎是整個開發生命週期的平台：從需求追蹤（Issues）、程式碼審查（PR）、自動化測試部署（Actions），到文件管理（Wiki、Pages）都包辦了。如果你是開源愛好者，GitHub 是首選；如果公司已經用 Atlassian 工具，Bitbucket 整合較好；如果是偏向 DevOps 的企業環境，GitLab 或 Azure DevOps 也很有競爭力。
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
SSH Key 的設定是一次性的工作，但很多初學者在這步卡住。重點是：你產生的是一對金鑰，私鑰（id_ed25519）絕對不能分享給任何人，公鑰（id_ed25519.pub）才是放到 GitHub 上的。ed25519 是目前推薦的演算法，比舊的 rsa 更安全且效能更好。如果在公司電腦，記得問 IT 是否有相關政策限制。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 2
## Push 上傳到 GitHub

<!--
好，帳號有了，SSH 也設定好了。現在來學最核心的操作：如何把本機的 Repository 推送到 GitHub。
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
origin 這個名字純粹是慣例，但是個根深蒂固的慣例。當你執行 git clone 的時候，Git 會自動把遠端命名為 origin。git remote -v 裡那個 v 代表 verbose，也就是顯示詳細資訊，會同時顯示 fetch 和 push 的 URL。大部分情況下這兩個 URL 是相同的，但進階使用情境可以設定不同。
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
-u 這個旗標很重要，它幫本機分支和遠端分支建立了追蹤關係（tracking relationship）。設定之後，Git 就知道這個本機 main 分支對應到 origin 的 main 分支。之後執行 git status 的時候，也會顯示「你的分支超前 origin/main 2 個 commit」這類資訊，非常實用。-u 只需要第一次推送時加，之後就不用了。
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
2021 年 8 月 GitHub 停用密碼驗證之後，很多人突然發現 git push 推不上去了，原因就是他們一直用帳號密碼驗證。現在 HTTPS 方式必須到 GitHub 設定頁面產生 Personal Access Token，然後把 token 當密碼輸入。PAT 可以設定有效期限和權限範圍，比舊的密碼更安全。不過說實話，如果可以選，SSH 真的方便很多。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 3
## Pull 下載更新

<!--
推上去了，那怎麼把別人的更新下載回來？這是 push 的反向操作，但其實有兩個指令：fetch 和 pull，我們來搞清楚差別。
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
fetch 和 pull 的差別是面試常考題，也是實際工作中的重要概念。fetch 只是把遠端的資訊同步到本機的「遠端追蹤分支」（remote tracking branch）上，也就是 origin/main 這個東西，不會動到你正在工作的 main 分支。pull 則是直接拿下來合併，速度快但比較激進。建議養成先 fetch、看一下有什麼更新再決定要不要 merge 的習慣。
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
--rebase 的好處是歷史很乾淨，線性一條，比較好 git log 查看。壞處是如果 rebase 過程有衝突，需要解決完再繼續，對初學者來說多了一個步驟。設定 pull.rebase true 是我個人很推薦的設定，可以讓你的 git log --oneline 更好看，也讓 code review 的時候更容易追蹤每個 commit 的意義。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 狀況題
## 怎麼有時候推不上去？

<!--
進入狀況題環節。第一個常見問題：明明 git push 用了很多次都成功，但有時候突然失敗，看到一堆英文錯誤訊息。來看看是怎麼回事。
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
non-fast-forward 這個錯誤訊息看起來很嚇人，但其實是 Git 在保護你（和你的同事）。fast-forward 代表「只是往前移動指標」的合併，不會有分叉。當遠端已經有你沒有的 commit 時，你的 push 不是 fast-forward，Git 預設會拒絕，要求你先整合遠端的變更。這是多人協作最常遇到的情境。
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
解法其實很簡單，就是先把遠端的東西拉回來。如果用 merge，你們兩個人的 commit 都會保留，但會多一個 merge commit。如果用 rebase，會把你的 commit 接到遠端最新 commit 的後面，歷史很乾淨。初學者建議用 pull merge 就好，比較直覺。force push 是萬不得已的手段，而且只能在個人分支上用，在下個主題我們會詳細討論。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 5
## 從伺服器上取得 Repository

<!--
前面學的是「已有本機 repo，推到 GitHub」。現在反過來：如何從 GitHub 把一個 repo 完整取回到本機？答案就是 git clone。
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
git clone 是進入一個新專案最常用的第一步。它做的事情其實相當於好幾個指令：git init 建立空的 repo，然後 git remote add origin 設定遠端，接著 git fetch 下載所有資料，最後 git checkout 切到預設分支。但你只需要一行指令，非常方便。Clone 下來的是完整的歷史，不是只有最新的快照，所以你可以查看所有的 log 和 diff。
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
Shallow clone 在 CI/CD 場景非常有用。如果你用 GitHub Actions 或 Jenkins 做持續整合，每次 build 都要 clone 整個 repo 的歷史，對於有幾千個 commit 的大型專案，這會浪費很多時間和頻寬。--depth 1 只取最新一個快照，通常 build 只需要最新的程式碼，完全夠用。但如果你要做 git blame 或查歷史 log，就需要完整的 clone。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 常見問題
## Clone 跟 Pull 有什麼不一樣？

<!--
很多初學者會問：我已經用 clone 把 repo 拿回來了，為什麼還需要 pull？讓我們來解釋這兩個指令的使用時機。
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
這個問題問到的人其實是因為還不夠熟悉 Git 的狀態模型。clone 是「建立」一個本機 repo 的副本，這個動作只會做一次。pull 是「更新」這個副本，每次別人有新的提交，或者你在別的電腦推了東西上去，都要 pull 才能把最新的狀態同步到當前的機器。好的工作習慣是：每次開始工作前先 git pull，確保自己在最新的狀態上工作，減少之後 merge 的痛苦。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 7
## 與其它開發者互動 — Pull Request

<!--
現在來到協作的核心功能：Pull Request。這是現代軟體開發中最重要的協作機制之一，不管你是參與開源專案還是公司內部開發，都會大量用到。
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
Pull Request 的「Pull」是有意義的：你在請求別人把你的改動「拉」進去主幹。這個機制讓團隊協作有了品質控制的關卡。在開源專案裡，任何人都可以 fork 後提交 PR，維護者有權決定要不要合併。在公司內部，通常會設定至少要一個或兩個人的 approve 才能 merge，這大大降低了 bug 進到生產環境的機率。
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
Fork 工作流程是開源協作的標準做法。Fork 讓你有一個完整的副本可以自由修改，不會影響原始 repo。建立功能分支是個好習慣，讓每個 PR 只做一件事，審查者比較容易理解。推送到你的 fork 之後，GitHub 通常會自動提示你「這個分支有新的 push，要開 PR 嗎？」，非常方便。
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
三種合併方式都有人用，沒有絕對的對錯。Squash 的好處是讓 main 的歷史非常乾淨，每個 commit 對應一個功能，缺點是你在 PR 裡做了哪些小步驟就看不到了。Rebase 的好處是線性歷史，缺點是重寫了 commit SHA，如果有其他人基於這些 commit 開發就麻煩了。Merge commit 最保守，歷史完整但會有很多 merge commit 讓 log 變複雜。重點是團隊統一規範，大家都用同一種。
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
PR 是一個溝通工具，寫好 PR 描述是對 reviewer 的尊重，也幫助未來的人理解這個改動。「Fixes #123」這個語法在 merge 之後會自動關閉對應的 Issue，非常方便。小 PR 原則很重要，超過 400 行的改動，reviewer 通常很難仔細看，review 品質就下降了。如果一個功能很大，考慮拆成多個 PR 分步驟合併。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 狀況題
## 怎麼跟上當初 fork 專案的進度？

<!--
你 fork 了一個開源專案，三個月後，原始專案有了很多新的 commit，你的 fork 已經落後很多。怎麼把原始專案的更新同步過來？
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
upstream 這個名字也是慣例，代表「上游」，也就是原始的 repo。這個 sync fork 的流程在開源貢獻中非常常用。如果你的 fork 落後太多，提出的 PR 就可能有很多衝突，維護者要花很多時間處理，這會讓你的 PR 被合併的機率降低。保持你的 fork 和 upstream 同步是個好習慣，尤其在你積極貢獻的專案上。GitHub 現在也在網頁上提供了「Sync fork」按鈕，可以一鍵同步。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 狀況題
## 怎麼刪除遠端的分支？

<!--
分支合併完之後，遠端上的分支不會自動消失，久了 GitHub 上會有一堆廢棄的分支。怎麼清理它們？
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
git push origin :branchname 這個舊語法很難直覺理解，但你在舊教程裡常看到，要知道它的意思。「推送空的內容到 feature/login」等於刪除該分支。現代的 --delete 語法更易讀。prune 的意思是「修剪」，執行後會把本機記錄的「已刪除的遠端分支引用」清掉，讓你的 git branch -r 清爽一些。GitHub 的自動刪除設定非常推薦開啟，省去手動清理的麻煩。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 狀況題
## git push -f 很可怕嗎？

<!--
force push 是 Git 裡讓很多人聞風喪膽的指令。它到底是什麼？什麼時候能用？什麼時候絕對不能用？
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
force push 的問題在於，它是以「你的版本為主」強制覆蓋遠端，不管遠端有沒有別人的 commit。如果是共享分支，別人的 commit 可能就這樣消失在遠端，雖然他們本機還有，但下次 pull 的時候會有很複雜的衝突。最嚴重的情況是，如果他們不注意，可能會用 git reset --hard 把自己本機的 commit 也搞丟。這就是為什麼 force push 到 main 是很多公司明文禁止的行為。
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
--force-with-lease 是個非常好的設計，它讓 force push 有了一個安全網。它的原理是：記住你上次 fetch 時遠端分支的位置，如果現在遠端的位置和你記錄的不一樣（代表有人 push 了新 commit），就拒絕 force push。不是百分之百安全（如果你剛 fetch 過但還沒看，就可能漏掉），但比無腦 --force 安全很多。現在很多公司的規範是「可以用 --force-with-lease，但禁止用 --force」。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 11
## 使用 GitHub 免費製作個人網站

<!--
輕鬆一下，來介紹一個很實用的 GitHub 功能：GitHub Pages。你可以免費把靜態網站部署到網路上，非常適合做個人作品集或技術部落格。
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
GitHub Pages 是完全免費的靜態網站托管，而且是由 GitHub 的 CDN 提供服務，速度不差。限制是只能托管靜態內容（HTML、CSS、JavaScript），沒辦法跑後端程式。對前端開發者、學生做作品集、技術文件網站來說非常夠用。很多開源專案的官網就是用 GitHub Pages 架的。個人域名也可以設定 CNAME 記錄指向 GitHub Pages。
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
靜態網站生成器搭配 GitHub Pages 是技術部落格的主流方案。Jekyll 是 GitHub 原生支援的，push markdown 就會自動編譯，不需要任何額外設定。但 Jekyll 比較慢，現在更多人用 Hugo（Go 寫的，超快）、Gatsby（React）或 Astro。搭配 GitHub Actions，每次 push 到 main 就自動 build 和部署，完全自動化，免費且穩定。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 冷知識
## 一定要有 GitHub 才能得到別人更新的檔案嗎？

<!--
最後一個主題，帶大家重新思考 Git 的本質。我們學了這麼多 GitHub 相關的東西，但其實 Git 本身不需要 GitHub 也能做到遠端協作。
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
這個冷知識讓大家更深刻地理解 Git 的設計哲學。Git 是去中心化的，每個人的本機都是一個完整的 repo，GitHub 只是大家約定好的「協調點」。在某些特殊情境下，例如公司內網不通外網、保密專案不能放雲端，就可以用 git daemon 或 gitolite 在自己的伺服器上架設 Git 服務。另外，兩台電腦在同一個 WiFi 下，甚至可以直接互相 push/pull，完全不需要經過任何伺服器。
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
當你需要私有 Git 服務時，Gitea 是個很輕量的選擇，用 Go 寫的，一個 binary 就能跑，可以部署在樹莓派上。GitLab Community Edition 功能更完整，有內建 CI/CD，但資源需求也更高。如果只是個人小團隊，Gitea + GitHub Actions（或 Gitea 自己的 Actions）就夠用了。當然，如果不需要完整的 web UI，直接用 bare git repository + SSH 是最簡單的方案。
-->

---
layout: end
---

# Ch 7 結束

### 開始用 GitHub 與世界各地的開發者協作

<Link to="home" style="margin-top: 1.5rem; display: inline-block; color: #d97706;">← 返回目錄</Link>

<!--
第七章到這裡結束。這章涵蓋了遠端協作最重要的概念：remote、push、pull、clone、PR、fork，以及幾個常見的疑難狀況。接下來的第八章，我們會介紹 Git Flow，一套讓團隊協作更有規範的分支管理策略。
-->
