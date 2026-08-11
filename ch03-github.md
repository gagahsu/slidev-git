---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
title: 遠端共同協作 - 使用 GitHub
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
  <h1 style="color: #92400e; font-size: 3.8rem; font-weight: 900; line-height: 1.15; margin-bottom: 1.5rem;">遠端共同協作</h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #d97706, #fbbf24); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #b45309; font-size: 1.15rem; font-style: italic;">「使用 GitHub，讓世界各地的開發者一起協作」</p>
  <Link to="home" style="margin-top: 2rem; color: #d97706; font-size: 0.9rem;">← 返回目錄</Link>
</div>

<!--
上一章我們已經會在自己的電腦上 init、add、commit 了，但真實的工作場景幾乎都是多人協作，光在本機作業不夠用。這章要進入 GitHub，把上一章做好的 commit 推上雲端、學會拿別人的更新，以及怎麼開 PR 讓同事審查程式碼。因為 add 和 commit 都學過了，這章可以直接把重點放在「本機 ↔ 遠端」這條線上。接下來我們會從基礎的 push 和 pull 開始，一步步帶大家掌握遠端協作的完整流程。
-->

---
layout: default
---

# Outline

- **GitHub 是什麼？** — 遠端 Repository 服務 / 社群平台
- **註冊 GitHub 帳號** — 用 Google 帳號一鍵註冊 / 帳號安全設定
- **Push 上傳到 GitHub** — git remote / git push / 身份驗證
- **Pull 下載更新** — git pull / git fetch 的差別
- **【狀況題】怎麼有時候推不上去** — 遠端有新 commit / non-fast-forward
- **從伺服器上取得 Repository** — git clone
- **【常見問題】Clone 跟 Pull 有什麼不一樣？** — 首次取得 vs 更新
- **與其它開發者互動 - Pull Request** — Fork / PR 流程


<!--
這是本章的整體大綱，總共七個主題。我們會先搞清楚 Git 和 GitHub 的差別，然後學 push 和 pull 這兩個最基本的操作，接著處理幾個大家一定會踩到的狀況題，再來介紹 PR 這個協作核心，最後收尾幾個實用的延伸主題。接下來我們來看第一個主題。
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

<!--
GitHub 現在幾乎是整個開發生命週期的平台，從需求追蹤、程式碼審查、自動化部署，到文件管理都包辦了。接下來看主要競爭對手的比較。
-->

---

# GitHub 的競爭對手

| 平台 | 特色 |
| --- | --- |
| GitLab | 開源版可自架、內建 CI/CD 功能強大 |
| Bitbucket | Atlassian 生態系（Jira、Confluence）整合佳 |
| Azure DevOps | 微軟企業環境整合 |

<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fff8f0; border-left: 4px solid #d97706; border-radius: 4px;">

**選擇建議：** 開源愛好者首選 GitHub；已用 Atlassian 工具的公司 Bitbucket 整合較佳；偏 DevOps 的企業環境可考慮 GitLab 或 Azure DevOps。對大多數人來說，先把 GitHub 學好就夠用了。

</div>

<!--
如果你是開源愛好者，GitHub 是首選；公司已經用 Atlassian 工具的話，Bitbucket 整合比較好；偏向 DevOps 的企業環境，GitLab 或 Azure DevOps 也很有競爭力。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 註冊 GitHub 帳號

<!--
講完平台的差別，接下來就要真的動手了。第一件事就是要有一個 GitHub 帳號。這一段我們會用最省事的方式——直接用 Google 帳號註冊，全程不用記新密碼。
-->

---

# 註冊 GitHub 帳號 — 兩種方式

打開 [github.com/signup](https://github.com/signup)，最上方就有兩種註冊路徑：

<div class="grid grid-cols-2 gap-6 mt-4">
<div style="background: #f0fdf4; border-left: 4px solid #16a34a; padding: 1rem 1.2rem; border-radius: 4px; height: 100%;">

**方式 A：Continue with Google** ✅ 推薦

- 一鍵帶入 Google 的 Email
- **不用**自己設密碼
- 不用等信箱收驗證碼
- 之後登入按一下 Google 就進去

</div>
<div style="background: #f8fafc; border-left: 4px solid #94a3b8; padding: 1rem 1.2rem; border-radius: 4px; height: 100%;">

**方式 B：填表單註冊**

- 輸入 Email → 設定密碼
- 取 Username
- 收信箱驗證碼（8 碼）
- 通過裝置驗證

</div>
</div>

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 GitHub 從 2025 年 7 月起正式支援 Google 社群登入（Social Login），課堂上我們統一用這個方式，省下最多時間。
</div>

<!--
以前註冊 GitHub 一定要填表單、設密碼、等驗證信，班上永遠會有幾個人卡在收不到信。GitHub 在 2025 年正式開放 Google 社群登入之後，這件事變得非常簡單：按一下 Continue with Google，選你的 Gmail，帳號就開好了。所以等一下大家統一走這條路，我們把時間留給 Git 本身。要注意的是，這是「註冊新帳號」的方式，如果你已經有 GitHub 帳號了，目前還沒辦法直接把 Google 綁上去當登入方式，這點後面會再提。
-->

---

# 用 Google 帳號註冊 — 操作步驟

<div class="text-sm">

| 步驟 | 你會看到 | 要做什麼 |
| --- | --- | --- |
| 1 | GitHub 註冊頁 | 點最上方的 **Continue with Google** |
| 2 | Google「選擇帳戶」畫面 | 點你要用的 Gmail（建議用長期會用的信箱） |
| 3 | Google 授權說明 | 確認要分享姓名／Email，按 **繼續 / Continue** |
| 4 | 回到 GitHub 建立帳號頁 | 取一個 **Username**（全站唯一，會出現在網址上） |
| 5 | 出生年月日 / 電子報訂閱 | 填生日、電子報可不勾，按 **Create account** |
| 6 | 完成 | 直接進入 GitHub 首頁，帳號已可使用 |

</div>

<div class="mt-4 p-3 bg-amber-50 border-l-4 border-amber-400 text-gray-700 text-sm text-left">
📝 <b>Username 命名建議：</b> 用英文小寫 + 數字或短橫線，例如 <code>mike-chen</code>、<code>ada2026</code>。這會變成你的個人頁網址 <code>github.com/你的帳號</code>，也會印在每個 commit 上，取一個以後放履歷不會尷尬的名字。
</div>

<!--
整個流程大概三十秒。要特別提醒兩件事。第一是第二步選帳號時，請選一個你長期會用的信箱，不要選學校或公司可能之後會被停用的帳號，不然以後拿不回帳號會很麻煩。第二是第四步的 Username，這個名字之後會出現在你的個人頁網址上，也會跟著你每一個 commit，能不能改？可以改，但改了之後舊網址會失效，別人的連結會壞掉，所以第一次就取好比較省事。不要取 xxx520、qwerty123 這種，之後放在履歷上會很尷尬。
-->

---

# 用 Google 註冊後 — 兩個一定要補的設定

用 Google 註冊時，GitHub **不會**幫你設密碼，所以要補上這兩步當作備援：

**① 補設一組 GitHub 密碼**

```text
右上角頭像 → Settings → Password and authentication
→ Change password（用「忘記密碼」流程設定新密碼）
```

**② 開啟兩步驟驗證（2FA）**

```text
Settings → Password and authentication
→ Two-factor authentication → 用手機 App（如 Google Authenticator）掃 QR Code
```

<div class="mt-4 p-3 bg-red-50 border-l-4 border-red-400 text-gray-700 text-sm text-left">
⚠️ 如果哪天 Google 帳號被停用或忘記密碼，沒設 GitHub 密碼就等於<b>整個 GitHub 帳號進不去</b>。花兩分鐘補起來。
</div>

<!--
這頁是最容易被跳過、但最重要的一頁。用 Google 註冊很方便，但代價是你的 GitHub 帳號完全掛在 Google 上。萬一 Google 帳號被鎖、被停用、或是你換了公司信箱，GitHub 就一起進不去了，裡面的專案也拿不回來。所以註冊完請馬上做兩件事：補一組 GitHub 自己的密碼當備援，還有開兩步驟驗證。GitHub 上放的是你的程式碼資產，值得這兩分鐘。另外補充一個常見問題：如果你早就有 GitHub 帳號了，能不能事後把 Google 綁上去當登入方式？目前官方還不支援，社群討論串裡也是一樣的答案，所以已有帳號的同學就繼續用原本的帳密登入就好。
-->

---

# 註冊後回頭確認 `git config`

Ch 1 設定過 `user.name` / `user.email`，現在有 GitHub 帳號了，要回頭對一下：

| 設定 | 要不要跟 GitHub 一致？ | 原因 |
| --- | --- | --- |
| `user.name` | ❌ 不用 | 純顯示名稱，GitHub 不靠它認人 |
| `user.email` | ✅ **要** | GitHub 用 email 把 commit 對應到你的帳號 |

```bash
# 先確認目前設的是什麼
git config --global user.email

# 對不上就改成 GitHub 帳號裡「已驗證」的 email
git config --global user.email "你註冊 GitHub 的 email"
```

<div class="mt-4 p-3 bg-red-50 border-l-4 border-red-400 text-gray-700 text-sm text-left">
⚠️ email 對不上的後果：commit 顯示灰色頭像、點作者連不到你的 profile、<b>貢獻牆一片空白</b>。
</div>

<!--
這頁很多課程都會漏掉。我們在 Ch 1 一開始就設了 user.name 和 user.email，但那時候大家還沒有 GitHub 帳號，很多人隨手填了一個信箱。現在帳號有了，要回頭對一下。

重點是要分清楚這兩個設定的角色。user.name 只是顯示名稱，寫在 commit 裡給人看的，你要叫小明、叫 Ming、叫什麼都可以，GitHub 完全不看這個欄位來認人。真正的關鍵是 user.email，GitHub 是拿 commit 裡的 email 去比對帳號綁定的信箱，比對到了才會把這個 commit 算在你頭上。

對不上會怎樣？commit 的作者頭像會是灰色的預設圖，點下去也連不到你的 GitHub 個人頁，最有感的是貢獻牆——你明明每天都在 commit，但 GitHub 上那面綠格子牆一片空白，因為 GitHub 根本不知道那些 commit 是你做的。接下來看兩個相關的補充。
-->

---

# `git config` email 的兩個補充

**① 不想公開真實 email → 用 GitHub 的 noreply 位址**

```bash
# Settings → Emails → 勾選 Keep my email addresses private
# GitHub 會給你一組專屬位址
git config --global user.email "12345678+username@users.noreply.github.com"
```

**② 之前用舊 email commit 的紀錄想救回來**

不用改歷史，把**舊 email 加進 GitHub 帳號並驗證**即可自動歸戶：

```text
Settings → Emails → Add email address → 收信點驗證連結
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">💡 <b>驗證：</b> <code>git log -1 --format='%an &lt;%ae&gt;'</code> 可以看最後一個 commit 實際記錄的作者與 email。</div>

<!--
補充兩件事。第一，如果你不想讓真實信箱出現在每一個公開 commit 裡——這是會被爬蟲抓去發垃圾信的——GitHub 提供一組 noreply 位址，格式是「數字 + username @users.noreply.github.com」，在 Settings 的 Emails 頁面勾選 Keep my email addresses private 就會給你。用這組位址一樣會正確歸戶，貢獻牆照樣有綠格子，但真實信箱不會外流。

第二，很多同學會問：那我之前用舊信箱 commit 的那一堆紀錄怎麼辦，要改歷史嗎？不用。改歷史是很麻煩而且危險的事。正確做法是反過來——把那個舊 email 加進 GitHub 帳號並完成驗證，GitHub 就會回頭把那些 commit 全部認回來，貢獻牆會直接補上去。一個帳號可以綁很多個 email，這也是為什麼建議公司信箱、個人信箱都加進去，這樣不管在哪台電腦 commit 都算得到。

最後給大家一個驗證指令，git log 加上 format 參數可以直接看到最後一個 commit 實際記錄的作者名字和 email，設定完跑一下就知道有沒有生效。
-->

---

# 開始使用 GitHub — 電腦怎麼證明「我是我」

帳號註冊好了，但你的**電腦**還沒被 GitHub 認識。第一次 push 時要通過一次身分驗證。

<div class="text-sm mt-4">

| 方式 | 怎麼運作 | 適用情境 |
| --- | --- | --- |
| **① 瀏覽器授權（GCM）** ✅ | 跳出瀏覽器按 Authorize，憑證由工具自動保管 | **一般人的預設做法**，什麼都不用產生 |
| ② Personal Access Token | 自己到網頁產生一組長字串當密碼 | 沒有瀏覽器的環境、CI/CD、遠端主機 |
| ③ SSH Key | 產生金鑰對，公鑰貼到 GitHub | 進階使用者、長期不想再驗證 |

</div>

<div class="mt-4 p-3 bg-green-50 border-l-4 border-green-500 text-gray-700 text-sm text-left">
💡 <b>好消息：</b> 現在安裝 Git for Windows / macOS 版都會一起裝 <b>Git Credential Manager（GCM）</b>，它會自動幫你走方式 ①。所以你多半<b>不需要</b>手動產生 Token。
</div>

<!--
這頁要先把觀念講清楚，不然同學會很混亂：有人說要 Token，有人說要 SSH Key，但自己什麼都沒做也能 push。其實這三個是同一個問題的三種答案——GitHub 要確認「敲這台電腦的人真的是帳號主人」，差別只在憑證從哪來、誰幫你保管。現在的 Git 安裝檔會順便裝一個叫 Git Credential Manager 的小工具，它會直接幫你走瀏覽器授權，Token 也是它自動去申請、自動存進 Windows 認證管理員或 macOS 鑰匙圈的，你根本不會看到那串字。所以如果你安裝完 Git 直接 push 就成功了，那不是你漏做什麼，而是工具已經幫你做完了。
-->

---

# 方式 ①：第一次 push 會發生什麼事

```bash
git push origin main
```

<div class="text-sm">

| | 畫面 | 你要做的事 |
| --- | --- | --- |
| 1 | 跳出 GCM 視窗，有 **Sign in with your browser** | 按下去 |
| 2 | 瀏覽器開啟 GitHub 登入頁 | 已登入直接下一步；沒登入就按 **Continue with Google** |
| 3 | **Authorize Git Credential Manager** 授權頁 | 按 **Authorize** |
| 4 | 顯示 Authentication Succeeded | 關掉分頁，回終端機看，push 已完成 |

</div>

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>只會做一次：</b> 憑證存進 <b>Windows 認證管理員</b> / <b>macOS 鑰匙圈</b>，之後 push、pull、clone 都不再詢問。
</div>

<!--
這就是為什麼很多人根本沒聽過 Personal Access Token，也一路用得很順。整個流程就是：打了 push、跳出小視窗、按「用瀏覽器登入」、瀏覽器問要不要授權、按 Authorize、關掉，結束，大概十秒。背後其實 GCM 幫你申請了一組 OAuth token 存起來，只是你看不到。想確認的同學可以打開 Windows 的「認證管理員」搜尋 git，就會看到 github.com 那一筆。順帶一提，哪天想登出或換帳號，就是去那裡把那筆刪掉，下次 push 會重新問一次。
-->

---

# 方式 ②：什麼時候才需要 Personal Access Token

<div class="grid grid-cols-2 gap-6 mt-2 text-sm">
<div>

**需要自己產 Token 的情況**

- 遠端 Linux 主機、Docker 容器（開不了瀏覽器）
- CI/CD 腳本、自動化流程
- 公司環境沒有裝 GCM
- 要用 GitHub API 存取資料

</div>
<div>

**產生方式**

```text
頭像 → Settings
→ Developer settings
→ Personal access tokens
→ Tokens (classic)
→ Generate new token
→ 勾 repo → Generate
```

</div>
</div>

此時 Git 會用文字提示要帳密，**密碼欄貼 Token**（不是登入密碼）：

```bash
Username: your-github-id
Password: ghp_xxxxxxxxxxxxxxxxxxxx   # ← 貼 Token
```

<div class="mt-3 p-3 bg-red-50 border-l-4 border-red-400 text-gray-700 text-sm text-left">
⚠️ Token 只顯示一次，關掉頁面就看不到；GitHub 自 2021 年起已不接受用登入密碼做 git 操作。
</div>

<!--
Token 不是被淘汰，只是從「每個人都要做」變成「特定情況才要做」。最常見的是你 SSH 連到一台遠端 Linux 主機要 git pull，那台機器沒有桌面、開不了瀏覽器，GCM 那套就用不了，就得自己產一組 Token 貼上去。CI/CD 腳本也是同樣道理，機器不會幫你按 Authorize。所以這頁大家知道有這個東西、知道去哪產就好，真的遇到再回來看。要記得 Token 等同你的密碼，千萬不要不小心 commit 進程式碼，GitHub 掃到會直接把它作廢。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 2
## Push 上傳到 GitHub

<!--
帳號有了，驗證方式也搞清楚了。現在來學最核心的操作：怎麼在 GitHub 建一個新 Repository，然後把本機的 repo 推上去，讓別人也看得到你的程式碼。
-->

---

# 在 GitHub 建立新 Repository

到 GitHub 網頁右上角的 **+** → **New repository**，填寫以下資訊：

| 欄位 | 說明 |
| --- | --- |
| Repository name | repo 名稱，例如 `my-project` |
| Public / Private | 公開（誰都能看）或私人（只有你和受邀者能看） |
| Initialize this repository with a README | **不要勾選** |

<div class="mt-4 p-3 bg-red-50 border-l-4 border-red-400 text-gray-700 text-sm text-left">
⚠️ <b>重點：</b> 如果本機已經有 <code>git init</code> 過的專案，Initialize 系列選項（README / .gitignore / license）全部不要勾，勾了會讓遠端多出一個本機沒有的 commit，等一下 push 會失敗。
</div>

<!--
建立空 repo 這一步很多同學會被 README 那個勾選框坑到。GitHub 很貼心，會問你要不要順便幫你建一個 README，但如果你本機已經有東西了，勾了這個選項，遠端就會多一個「初始化 commit」，跟你本機的歷史對不起來，等一下第一次 push 就會被拒絕。所以記住：本機已經有內容，遠端就建全空的 repo，什麼都不要勾。
-->

---

# 把本機專案 Push 上去

Repo 建好後，GitHub 會顯示一段指令，把它貼到本機專案的終端機裡執行：

```bash
# 如果本機專案還沒有 git（沒做過 git init）
git init
git add .
git commit -m "Initial commit"

# 關聯剛剛建立的遠端 repo，並推送
git remote add origin https://github.com/username/repo-name.git
git branch -M main
git push -u origin main
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>第一次會跳出登入視窗：</b> 按「Sign in with your browser」→ 在瀏覽器按 Authorize 即可；若是沒有瀏覽器的環境，才需要在密碼欄貼 Personal Access Token。
</div>

<!--
GitHub 建完空 repo 之後，網頁上會直接給你一段「…or push an existing repository from the command line」的指令，把它整段複製貼上就行，不用自己一行一行背。如果本機專案本來就有在用 Git 了（已經 git init 過），就跳過 init、add、commit 這幾行，直接從 remote add 開始接著做。push 完之後重新整理 GitHub 頁面，就能看到你的檔案已經在雲端上了。
-->

---

# `git remote` — 遠端設定補充

剛剛的 `git remote add` 只是其中一個用法，`git remote` 這個指令還能查看、修改、移除遠端設定。

```bash
# 查看目前已設定的遠端
git remote -v

# 新增遠端（origin 是慣用名稱，代表「主要遠端」）
git remote add origin https://github.com/username/repo-name.git

# 修改遠端 URL
git remote set-url origin https://github.com/username/repo-name.git

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

<!--
-u 這個旗標很重要，它幫本機分支和遠端分支建立了「追蹤關係」。設定好之後，之後直接 git push 就行了，不用再加 origin main。接下來看 -u 具體做了什麼。
-->

---

# 第一次推送：`-u` 旗標做了什麼？

**`-u`（--set-upstream）** 幫本機分支和遠端分支建立追蹤關係：

| | 執行前 | 執行後 |
| --- | --- | --- |
| push | `git push` 不知道要推到哪 | `git push` 自動推到 `origin/main` |
| pull | `git pull` 不知道要從哪拉 | `git pull` 自動從 `origin/main` 拉 |

<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fff8f0; border-left: 4px solid #d97706; border-radius: 4px;">

**記住：** 第一次推送加 `-u`，之後直接 `git push` 即可。只需要設定一次。

</div>

<!--
想像一下你跟同事說「我的報告就放在那個共用資料夾裡」，之後你們就知道固定去那個地方找，不用每次都說地址。-u 就是在做這件事，讓 Git 知道這個本機的 main 對應到 origin 的 main。
-->

---

# 身份驗證：HTTPS 方式

GitHub 支援兩種連線方式，先看我們一路在用的 HTTPS：

```bash
# Clone URL 格式
https://github.com/user/repo.git

# 驗證：GCM 瀏覽器授權（預設）
# 或 Personal Access Token（無瀏覽器時）
```

- 防火牆友善（port 443）
- 有 GCM 就自動處理，免手動設定
- 適合：新手、公司網路有限制的環境

<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fff8f0; border-left: 4px solid #d97706; border-radius: 4px;">

**本課程用的就是這種：** URL 開頭是 `https://`，驗證交給 Git Credential Manager 自動處理，對新手最省事。

</div>

<!--
先看 HTTPS。我們前面 clone、push 用的都是這個方式，URL 開頭是 https://。它走 port 443，跟一般瀏覽器上網同一個通道，所以公司防火牆幾乎不會擋。驗證這件事都交給 Git Credential Manager 自動處理，第一次按一下 Authorize 之後就不用再管了，對新手最省事。
-->

---

# 身份驗證：SSH 方式

另一條路是 SSH，設定一次金鑰之後完全免密碼：

```bash
# Clone URL 格式
git@github.com:user/repo.git

# 設定好 SSH Key 後完全免密碼
# 使用 port 22（或 443 via ssh.github.com）
```

- 設定一次，長期免密碼
- 安全性高（非對稱加密）
- 適合：個人開發者的首選

<div style="margin-top: 1.5rem; background: #fef3c7; border-left: 4px solid #d97706; padding: 1rem 1.2rem; border-radius: 4px;">

**選擇建議：** 本課程一路用的是 HTTPS，由 Git Credential Manager 自動處理驗證。等你對 Git 更熟悉，可以再改用 SSH，設定一次金鑰之後就完全免密碼。

</div>

<!--
SSH 是另一條路，URL 長得不一樣，是 git@github.com 開頭。設定好金鑰之後完全不用再輸入任何東西，長期用起來更順手，安全性也高，但第一次要產生金鑰、把公鑰貼到 GitHub，步驟比較繁瑣。等你對 Git 更熟悉之後，可以再回頭研究要不要換成 SSH。
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
      C
     ↗ ↘
A → B    E（merge commit，parent 是 C 和 D）
     ↘ ↗
      D（遠端的 commit）

# 用 git pull --rebase 後的歷史
A → B → D → C'（你的 commit 重放接在最後，歷史是線性的）
```

<!--
用 pull（預設是 merge）的話，你的 commit C 跟遠端的 commit D 會各自從共同祖先 B 分岔出去，pull 完 Git 會自動產生一個新的 merge commit E，同時接住 C 和 D 兩條線。用 pull --rebase 的話，Git 會先把你的 C 拿掉，把本機同步到遠端最新的 D，再把 C 重新放到 D 後面重放一次，變成新的 commit C'，整條歷史就是一直線，沒有 merge commit。接下來看指令怎麼下。
-->

---

# `git pull --rebase` — 指令與建議

```bash
# 使用 rebase 策略拉取
git pull --rebase

# 設定為預設行為（推薦）
git config --global pull.rebase true
```

<div style="background: #fff8f0; border-left: 4px solid #d97706; padding: 1rem 1.5rem; border-radius: 4px; margin-top: 1.5rem;">

**建議：** 個人分支使用 `--rebase` 保持線性歷史。共享分支視團隊規範而定。

</div>

<!--
--rebase 的好處是歷史很乾淨，線性一條，git log --oneline 看起來賞心悅目。壞處是如果 rebase 過程有衝突，需要解決完再繼續，對初學者來說多了一個步驟。設定 pull.rebase true 是我個人很推薦的全域設定，可以讓你的 git log 更好看，code review 的時候也更容易追蹤每個 commit 的意義。接下來我們來看一個很常見的狀況題。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 4
## 【狀況題】怎麼有時候推不上去？

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
git clone https://github.com/username/repo-name.git

# 指定目標目錄名稱
git clone https://github.com/username/repo-name.git my-project

# Clone 後自動進入目錄
git clone https://github.com/username/repo-name.git && cd repo-name
```

<!--
git clone 是進入一個新專案最常用的第一步。你只需要一行指令，背後 Git 幫你做了好幾件事。接下來看 clone 完 Git 自動做了什麼。
-->

---

# `git clone` — Clone 後 Git 自動做的事

| 動作 | 說明 |
| --- | --- |
| 下載完整歷史 | 所有 commit、分支、tag 都複製過來 |
| 設定 origin | `git remote -v` 就能看到 origin 指向來源 |
| checkout main | 自動切換到預設分支 |
| 設定 tracking | 本機 main 自動追蹤 origin/main |

<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fff8f0; border-left: 4px solid #d97706; border-radius: 4px;">

Clone 下來的是**完整歷史**，不是只有最新快照。所有 log 和 diff 都在你的電腦裡，可以離線查看。

</div>

<!--
它背後其實做了好幾件事：建立空的 repo、設定遠端、下載所有資料、切換到預設分支，但你只需要一行指令就搞定了。接下來看一個進階用法。
-->

---

# Shallow Clone — 只取最新快照

當 Repository 的歷史非常龐大時，可以用 `--depth` 只取最近幾個 commit：

```bash
# 只取最新 1 個 commit 的快照（最常用）
git clone --depth 1 https://github.com/username/repo-name.git

# 取最近 10 個 commit
git clone --depth 10 https://github.com/username/repo-name.git

# CI/CD 環境常用（速度快，節省空間）
git clone --depth 1 --single-branch --branch main <url>
```

<!--
Shallow clone 在 CI/CD 場景非常有用。每次 build 只需要最新的程式碼，--depth 1 完全夠用。接下來看完整 clone 和 shallow clone 的比較。
-->

---

# Shallow Clone — 完整 vs Shallow 比較

| | 完整 Clone | Shallow Clone |
| --- | --- | --- |
| 歷史記錄 | 完整 | 只有指定深度 |
| 下載大小 | 較大 | 較小，速度快 |
| `git log` | 完整歷史 | 有限歷史 |
| 適合場景 | 開發工作 | CI/CD、單純部署 |

<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fef3c7; border-left: 4px solid #d97706; border-radius: 4px;">

**注意：** 如果需要執行 `git blame` 或查完整 log，要用完整 clone。Shallow clone 查不到指定深度以前的歷史。

</div>

<!--
如果你用 GitHub Actions 做自動部署，每次 build 都要完整 clone 一個有幾千個 commit 的大型專案，光下載就浪費很多時間和頻寬。--depth 1 只取最新的一個快照，通常 build 只需要最新的程式碼，完全夠用。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 6
## 【常見問題】Clone 跟 Pull 有什麼不一樣？

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
git clone https://github.com/company/project.git
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

<!--
想像一下，四個人同時在修改同一個系統，沒有人知道別人在改什麼，也沒有人在確認「這樣改有沒有問題」。直接 push 到 main 就是這種狀況。接下來看 PR 如何解決這些問題。
-->

---

# Pull Request 解決了什麼？

| 功能 | 說明 |
| --- | --- |
| Code Review | 其他人可以看你的改動、留下評論 |
| 討論 | 可以在 PR 上討論設計決策 |
| CI 驗證 | 自動跑測試，確保不會 break 主幹 |
| 歷史留存 | 每個功能為什麼這樣做都有記錄 |
| 合併控制 | 只有通過審查的程式碼才能進 main |

<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fff8f0; border-left: 4px solid #d97706; border-radius: 4px;">

**Pull Request 的「Pull」：** 你在請求別人把你的改動「拉」進主幹。每次程式碼進 main 之前都有人確認過，大大降低 bug 進生產環境的機率。

</div>

<!--
Pull Request 的「Pull」是有意義的，你在請求別人把你的改動「拉」進去主幹，這個機制讓每次程式碼進到主幹之前都有人確認過，大大降低 bug 進到生產環境的機率。接下來看 Fork 工作流程。
-->

---

# Fork 工作流程

**參與開源專案或外部 Repository 的標準流程：**

```
1. Fork：在 GitHub 網頁上，按「Fork」按鈕
   → 把別人的 repo 複製一份到你自己的帳號下

2. Clone：把你自己的 fork 下載到本機
   git clone https://github.com/YOUR_USERNAME/repo.git

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
流程裡的 `git checkout -b` 是建立分支，分支的完整用法我們在 Ch 5 會專門講，這裡先照著做就好。Fork 讓你有一個完整的副本可以自由修改，不會影響原始 repo，這也是開源協作的標準做法。建立功能分支是個好習慣，讓每個 PR 只做一件事，審查者比較容易理解你在改什麼。推送到你的 fork 之後，GitHub 通常會自動跳出提示「這個分支有新的 push，要開 PR 嗎？」，非常方便。接下來看 merge PR 的三種方式。
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

# 本章重點回顧


- **Git 是工具，GitHub 是平台** — 沒有 GitHub，Git 一樣能運作
- **HTTPS 驗證預設走瀏覽器授權（GCM）**，只需按一次 Authorize；無瀏覽器環境才改用 Personal Access Token（絕不是登入密碼）
- **`git remote add origin <url>` + `git push -u origin main`** — 第一次推送要加 `-u` 建立追蹤關係
- **`git fetch` 只下載，`git pull` = fetch + merge**；想要線性歷史用 `git pull --rebase`
- **推不上去（non-fast-forward）** — 遠端有你沒有的 commit，先 pull 整合再 push，別用 `--force`
- **`git clone` 是第一次取得，`git pull` 是後續更新**
- **Pull Request 是協作核心** — 一個 PR 只做一件事，說明「為什麼」


<div style="margin-top: 1rem; padding: 0.8rem 1.2rem; background: #fff8f0; border-left: 4px solid #d97706; border-radius: 4px;">

**下一章：** Ch 4 GitHub Desktop — 用圖形化介面完成同樣這些操作

<Link to="ch04" style="color: #d97706; font-weight: 600;">前往 Ch 4 →</Link>

</div>

<!--
這一章的核心其實只有一條線：本機和遠端是兩份各自獨立的歷史，push 和 pull 就是在同步它們。理解了這條線，non-fast-forward 為什麼會發生、為什麼要先 pull 再 push，就都說得通了。PAT 的部分如果之後過期了，回到 GitHub 網頁重新產生一組就好。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Q & A

<!--
這一章涵蓋了遠端協作的核心：remote、push、pull、clone，以及 PR 和 fork 的工作流程。如果有任何問題，歡迎提出來討論。下一章我們換個角度，看看這些操作用 GitHub Desktop 點滑鼠怎麼完成。
-->
