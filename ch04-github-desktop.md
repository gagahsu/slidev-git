---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: GitHub Desktop 入門
routeAlias: ch04
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
  <h1 style="color: #92400e; font-size: 3.8rem; font-weight: 900; line-height: 1.15; margin-bottom: 1.5rem;">GitHub Desktop</h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #d97706, #fbbf24); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #b45309; font-size: 1.15rem; font-style: italic;">
    「不用背指令，也能好好用 Git」
  </p>
  <Link to="home" style="margin-top: 2rem; color: #d97706; font-size: 0.9rem;">← 返回目錄</Link>
</div>

<!--
大家好，前三章我們認識了版本控制的核心觀念，用指令列學了 init、add、commit、log，也學會了怎麼 push 上 GitHub、clone 別人的專案下來。這章要介紹另一條路：用滑鼠點一點就能做這些 Git 操作的圖形化工具——GitHub Desktop。因為指令的意思大家都懂了，這章看畫面會特別有感覺——每個按鈕背後對應哪個指令，一眼就能對上。對還不熟悉終端機的同學來說，這也是個很好的日常工具。我們會從「它是什麼」開始，一路講到下載安裝、登入設定，最後動手做一次 clone、commit、push、開分支、開 PR 的完整流程。
-->

---
layout: default
---

# Outline

- **什麼是 GitHub Desktop？** — GUI 工具 / 適合的使用情境
- **下載與安裝** — 系統需求 / Windows / macOS
- **初次設定** — 登入帳號 / 設定 Git 身份
- **介面導覽** — Changes / History / Current Branch
- **基本操作：Clone** — 從 GitHub 取得專案
- **基本操作：Commit** — 暫存、撰寫訊息、送出
- **基本操作：Push / Pull** — 與遠端同步
- **基本操作：分支與 Pull Request** — 建立分支、開 PR

<!--
這章總共八個主題，我們會照著「認識工具 → 裝好工具 → 設定帳號 → 看懂介面 → 實際操作」的順序走。操作的部分會順便提到每個按鈕背後對應的 git 指令是什麼——add、commit、log 是 Ch 2 學過的，push、pull、clone 是 Ch 3 學過的，這章等於把前面的指令再用另一種介面走一遍。分支的部分先有個印象就好，Ch 5 會正式教。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 1
## 什麼是 GitHub Desktop？

<!--
先來搞清楚這個工具到底是什麼、為什麼會有它存在。
-->

---

# 為什麼需要 GitHub Desktop？

想像一下：你接下來要開始學 Git 的指令，`add`、`commit`、`push` 這些名詞聽起來還很陌生，打指令又怕打錯字、漏參數，光是這樣就先卻步了。

<br>

**純指令操作對新手常見的門檻：**
- 指令要背，參數要記，一開始很容易卡在「打不出正確指令」
- 想看「這次到底改了哪些檔案、哪幾行」，純文字輸出不好比對
- 分支一多，全部用文字列出來，容易選錯

<!--
不是說指令不好，指令永遠是最強大、最完整的操作方式。但當你想快速瀏覽「這次改了什麼」，或是要帶新同學上手，一個看得到檔案顏色、看得到分支圖的視窗，會直覺很多。這就是 GitHub Desktop 存在的原因。
-->

---

# 什麼是 GitHub Desktop？

**GitHub Desktop** 是 GitHub 官方推出的**免費、開源**桌面應用程式，讓你用圖形化介面完成 Git 操作。

<br>

| | 特性 |
| --- | --- |
| 開發者 | GitHub（Microsoft） |
| 授權 | 免費、開源 |
| 支援平台 | Windows、macOS |
| 支援服務 | GitHub.com / GitHub Enterprise / 一般 Git remote |
| 核心概念 | 每個按鈕背後都對應一個 git 指令 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>重點：</b> GitHub Desktop 不是「取代」Git，它只是把 Git 的操作用視窗包起來。底層跑的還是同一套 git 指令。
</div>

<!--
GitHub Desktop 跟我們裝的 Git 本身是兩個東西：Git 是版本控制引擎，GitHub Desktop 是蓋在它上面的操作介面。你在 Desktop 裡按下「Commit」，它背後做的事情，跟終端機打 `git commit` 是一樣的。理解這一點很重要，因為代表 Ch 1、Ch 2 學過的 Git 觀念——三大區域、暫存區、commit——在這裡完全通用，只是換了一種操作方式。
-->

---

# 什麼情境適合用 GitHub Desktop？

<div class="grid grid-cols-2 gap-6 mt-4">
<div>

**適合的情境 ✅**

- 想快速瀏覽變更內容、逐行比對
- 團隊裡有不熟終端機的成員
- 想用「勾選檔案」的方式決定要 commit 什麼
- 需要視覺化的分支歷史圖

</div>
<div>

**仍建議用指令的情境**

- 需要精細控制（如 `rebase -i` 互動式操作）
- 寫自動化腳本、CI/CD 流程
- 遠端伺服器上沒有圖形介面

</div>
</div>

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>建議：</b> 兩者不是二選一。很多工程師日常瀏覽變更、commit 用 Desktop，遇到複雜操作再切回終端機，兩邊搭配使用。
</div>

<!--
不用糾結「該學指令還是該學 Desktop」，這兩個是互補的工具。日常最頻繁的操作——看變更、commit、push、pull、切分支——用 Desktop 會又快又不容易出錯；但遇到比較進階的操作，像是我們後面章節會教的互動式 rebase，終端機還是比較有彈性。接下來我們就動手把它裝起來。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 2
## 下載與安裝

<!--
工具認識完了，接下來實際把它裝到電腦上。
-->

---

# 下載前：系統需求

| 作業系統 | 最低版本需求 |
| --- | --- |
| Windows | Windows 10 64-bit 或以上版本 |
| macOS | macOS 12.0 或以上版本 |

<br>

前往官方網站下載安裝檔：[desktop.github.com](https://desktop.github.com/)

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>提醒：</b> 官網會自動偵測你的作業系統，直接顯示對應的下載按鈕，不用自己選版本。
</div>

<!--
安裝之前先確認一下系統版本符不符合需求，尤其是公司配發的舊電腦，Windows 10 64-bit 是最低門檻。官網很貼心，打開網址就會自動顯示「Download for Windows」或「Download for macOS」，不用自己找連結。
-->

---

# 安裝步驟 — Windows

| 步驟 | 操作 |
| --- | --- |
| 1 | 打開瀏覽器，前往 https://desktop.github.com/ |
| 2 | 點擊「Download for Windows」 |
| 3 | 到下載資料夾，執行 GitHubDesktopSetup.exe |
| 4 | 等待安裝完成，程式會自動開啟 |

<!--
Windows 的安裝很單純，沒有什麼需要特別設定的選項，跟一般裝軟體一樣，一路「下一步」到底。執行的是標準的 .exe 安裝檔，安裝完成後程式會自動幫你打開，準備進入下一步：登入帳號。接下來看 macOS 的安裝方式。
-->

---

# 安裝步驟 — macOS

| 步驟 | 操作 |
| --- | --- |
| 1 | 打開瀏覽器，前往 https://desktop.github.com/ |
| 2 | 點擊「Download for macOS」 |
| 3 | 在下載資料夾找到壓縮檔，解壓縮 |
| 4 | 開啟 GitHub Desktop 應用程式 |

<!--
macOS 版下載下來是壓縮檔，解壓縮後直接執行應用程式即可，不需要額外拖到 Applications 資料夾（雖然這樣做也可以）。安裝完成後，程式會自動幫你打開，準備進入下一步：登入帳號。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 3
## 初次設定

<!--
軟體裝好了，第一次打開需要做兩件事：登入帳號、設定身份。
-->

---

# 登入 GitHub 帳號

首次開啟 GitHub Desktop，需要先登入你的 GitHub 帳號，之後 clone、push、開 PR 才能對應到你的身份。

<br>

| 平台 | 登入路徑 |
| --- | --- |
| macOS | 選單列 → GitHub Desktop → Settings → Accounts |
| Windows | File → Options → Accounts |

<!--
GitHub Desktop 第一次打開就要先登入帳號，之後不管是 clone、push、還是開 PR，才能正確對應到你的身份。登入的入口在 Settings 或 Options 裡的 Accounts 分頁，macOS 跟 Windows 的選單路徑不太一樣，照這張表找就對了。接下來看實際登入的操作步驟。
-->

---

# 登入 GitHub 帳號：操作步驟

| 步驟 | 操作 |
| --- | --- |
| 1 | 點選「Sign In」 |
| 2 | 瀏覽器會自動跳出，導向 GitHub 登入頁 |
| 3 | 輸入帳號密碼（或使用瀏覽器已登入的 session） |
| 4 | 授權完成後，瀏覽器會導回 GitHub Desktop |

<!--
登入的流程走的是瀏覽器授權（OAuth），不是直接在 Desktop 裡打帳號密碼。這樣的好處是，如果你開了兩步驟驗證，也能順順地在瀏覽器完成驗證，不會卡住。如果你同時有 GitHub.com 帳號和公司的 GitHub Enterprise 帳號，這兩個設定頁面都可以分別登入，互不影響。
-->

---

# 設定 Git 身份

登入 GitHub 帳號之後，GitHub Desktop 通常會自動帶入你的 **name** 和 **email** 設定，這對應到 Ch 1 學過的：

```bash
git config --global user.name "你的名字"
git config --global user.email "你的信箱"
```

<br>

**手動確認 / 修改：**

| 平台 | 路徑 |
| --- | --- |
| Windows | File → Options → Git |
| macOS | GitHub Desktop → Settings → Git |

<div class="mt-4 p-3 bg-red-50 border-l-4 border-red-400 text-gray-700 text-sm text-left">
⚠️ <b>注意：</b> 如果這裡的 email 跟你 commit 用的 email 不一致，GitHub 網頁上可能不會把 commit 記到你的貢獻紀錄裡。
</div>

<!--
這一步跟 Ch 1 講的 git config 其實是同一件事，只是 Desktop 幫你在介面上包了一層。特別要提醒的是 email 一致性問題：很多同學在公司電腦跟個人電腦設定了不同的 email，結果 GitHub 網頁上的貢獻牆一片空白，追根究柢就是這裡的 email 沒對上 GitHub 帳號綁定的 email。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 4
## 介面導覽

<!--
設定好了，打開主畫面。我們先花一點時間認識幾個最常用的區域，之後操作起來才知道要點哪裡。
-->

---

# 主畫面的三個重點區域

| 區域 | 位置 | 功能 |
| --- | --- | --- |
| **Current Repository** | 左上角 | 切換目前正在操作的專案 |
| **Current Branch** | 上方中間 | 切換 / 建立分支 |
| **Changes / History** | 左側分頁 | Changes：目前未 commit 的變更；History：commit 歷史紀錄 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>對照指令：</b> Changes 分頁對應 <code>git status</code> + <code>git diff</code>；History 分頁對應 <code>git log</code>。
</div>

<!--
把畫面拆成三塊來記就很好懂：左上角管「現在打開哪個 repo」，中間管「現在在哪個分支」，左側兩個分頁管「還沒 commit 的東西」跟「已經 commit 的歷史」。這三塊幾乎涵蓋了我們日常最常查看的資訊，跟指令列比起來，這裡是「看得到」而不用「打指令查」。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 5
## 基本操作：Clone

<!--
介面認識完了，開始動手。第一步當然是把一個專案的程式碼拿到本機。
-->

---

# Clone 一個 Repository — 方法一

**從 GitHub 網頁**

| 步驟 | 操作 |
| --- | --- |
| 1 | 到目標 repo 的 GitHub 頁面 |
| 2 | 點擊綠色的「Code」按鈕 |
| 3 | 選擇「Open with GitHub Desktop」 |
| 4 | GitHub Desktop 會自動開啟，帶入 repo 資訊 |
| 5 | 選擇本機儲存路徑，點「Clone」 |

<!--
先看方法一：從瀏覽器逛到想要的 repo，直接一鍵帶進 Desktop，很適合平常就是逛 GitHub 找專案的情境。這個動作背後對應的指令，就是 Ch 3 學過的 git clone，只是 Desktop 幫你把網址帶好了。接下來看方法二。
-->

---

# Clone 一個 Repository — 方法二

**直接在 GitHub Desktop 操作**

| 步驟 | 操作 |
| --- | --- |
| 1 | 選單列 File → Clone Repository |
| 2 | 三個分頁可選：GitHub.com / GitHub Enterprise / URL |
| 3 | 選好 repo 或貼上網址，指定本機路徑 |
| 4 | 點「Clone」 |

<!--
方法二是在 Desktop 裡直接操作，如果對方給你的是一個 Git URL（不一定在 GitHub 上），就用第三個分頁貼上網址。兩種方式殊途同歸，背後對應的都是 Ch 3 學過的 git clone。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 6
## 基本操作：Commit

<!--
Clone 下來之後，開始修改檔案，接著就要學怎麼在 Desktop 裡送出一次 commit。
-->

---

# 查看變更 — Changes 分頁

修改完檔案後，切到左側的 **Changes** 分頁，會看到：

| 顏色標記 | 意義 |
| --- | --- |
| 綠色 | 新增的檔案 |
| 黃色 | 修改過的檔案 |
| 紅色 | 刪除的檔案 |

<br>

點選任一檔案，右側會顯示逐行的差異（diff），點齒輪圖示可以切換 **Unified**（合併顯示）或 **Split**（左右並排）檢視模式。

<!--
這個畫面對應的就是我們熟悉的 <code>git status</code> 加上 <code>git diff</code>，只是用顏色取代了文字符號。綠黃紅三色一眼就能看出這次改動的規模，比起在終端機裡捲動一長串 diff 文字，直覺很多。
-->

---

# 暫存要 Commit 的檔案

每個檔案前面都有一個**核取方塊（checkbox）**，這就是 Desktop 版的「暫存區」操作：

| 操作 | 效果 |
| --- | --- |
| 核取方塊打勾 | 這個檔案會被加入這次 commit（等同 `git add`） |
| 取消打勾 | 這個檔案不會被加進這次 commit |
| 列表最上方的總開關 | 全選 / 全不選 |

<br>

**只想 commit 檔案裡的部分幾行？**

點選 diff 畫面裡想排除的行，該行會變成灰色（不勾選），保持藍色的行才會被 commit。

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>對照指令：</b> 這個功能對應到指令列的「部分暫存（patch mode）」，也就是 <code>git add -p</code>，這個技巧我們之後會在進階章節詳細介紹。
</div>

<!--
這一步在指令列要用 <code>git add -p</code> 才能做到「只暫存某幾行」，操作起來要一直按 y/n/s 選擇，新手很容易搞混。Desktop 裡直接點一下滑鼠就能決定要不要包含某一行，是這個工具最好用的功能之一。
-->

---

# 送出 Commit

在左側清單最下方，填寫兩個欄位：

| 欄位 | 用途 |
| --- | --- |
| **Summary** | 一句話說明這次改了什麼（必填，等同 commit message 第一行） |
| **Description** | 補充說明，選填（等同 commit message 的詳細內容） |

<!--
送出 commit 前要填的兩個欄位，Summary 是必填，Description 選填。接下來看實際送出的操作步驟。
-->

---

# 送出 Commit：操作步驟

| 步驟 | 操作 |
| --- | --- |
| 1 | 勾選要 commit 的檔案 |
| 2 | 填寫 Summary（例如：「新增登入頁面」） |
| 3 | 需要的話填寫 Description |
| 4 | 點擊「Commit to &lt;分支名稱&gt;」按鈕 |

<!--
Summary 跟 Description 其實就是 <code>git commit -m "標題" -m "內文"</code> 拆成兩個輸入框。養成寫清楚 Summary 的習慣，之後在 History 分頁瀏覽歷史紀錄的時候會很有感——一行清楚的 Summary 比十行模糊的敘述有用多了。接下來看一個能省去打字的功能：用 Copilot 自動產生 commit message。
-->

---

# 用 Copilot 自動產生 Commit Message

Summary 輸入框右側有一個 **✨ 圖示**，點下去會呼叫 GitHub Copilot 根據目前的 diff 自動產生 message：

| 步驟 | 操作 |
| --- | --- |
| 1 | 先勾選要 commit 的檔案（決定 diff 範圍） |
| 2 | 點擊 Summary 欄位旁的 ✨ 圖示 |
| 3 | Copilot 分析 diff，自動填入 Summary（必要時也會填 Description） |
| 4 | 檢查內容是否正確，可手動修改後再送出 |

<div class="mt-4 p-3 bg-red-50 border-l-4 border-red-400 text-gray-700 text-sm text-left">
⚠️ <b>注意：</b> 需要有效的 Copilot 授權（個人版或組織版）才能使用；Copilot 只看得到「已勾選」要 commit 的 diff，勾錯檔案會產生錯誤的訊息。
</div>

<!--
GitHub Desktop 內建 Copilot 整合，Summary 欄位旁邊那個星星圖示就是入口。它的原理是把你目前勾選要 commit 的 diff 送給 Copilot 分析，自動生成一句話的 Summary，改動比較複雜時還會順便填 Description。這對「不知道怎麼描述這次改了什麼」的情況特別有用，尤其是改動很雜、一時想不出精準用詞的時候。

但兩件事要提醒：第一，這需要你的帳號有 Copilot 授權，免費帳號通常沒有這個功能；第二，Copilot 只看得到你「已經勾選」的檔案的 diff，如果勾選範圍不對，生成的訊息也會文不對題，所以務必先確認勾選的檔案正確，再點星星生成，最後也要親自檢查一遍生成的內容再送出，不要照單全收。
-->
---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 7
## 基本操作：Push / Pull

<!--
Commit 完只在本機，還要跟遠端同步，這一段來看怎麼推上去、拉下來。
-->

---

# 推送與拉取

commit 完成後，畫面上方會出現對應的按鈕：

| 按鈕 | 對應指令 | 說明 |
| --- | --- | --- |
| **Push origin** | `git push` | 把本機的 commit 推送到 GitHub |
| **Fetch origin** | `git fetch` | 檢查遠端有沒有新的更新 |
| **Pull origin** | `git pull` | 把遠端的新 commit 拉回本機 |

<br>

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>小技巧：</b> 按鈕上方通常會顯示數字，例如「Push origin (2)」代表有 2 個 commit 還沒推上去，一眼就能看出本機和遠端的落差。
</div>

<!--
這個按鈕會隨著狀態變化：沒有新 commit 時顯示「Fetch origin」，本機領先遠端時顯示「Push origin」並附上數字，遠端領先本機時顯示「Pull origin」。這個數字提示背後的意思是「本機和遠端的 commit 歷史差了幾筆」，也就是 Ch 3 講的「本機領先／遠端領先」，Desktop 幫你先算好了，不用自己用 <code>git log</code> 一筆一筆數。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 8
## 基本操作：分支與 Pull Request

<!--
最後這段來看怎麼在 Desktop 裡建立分支、切換分支，以及開 Pull Request 跟同事協作。
-->

---

# 建立新分支

| 步驟 | 操作 |
| --- | --- |
| 1 | 點擊上方的 Current Branch 下拉選單 |
| 2 | 點擊「New Branch」 |
| 3 | 輸入分支名稱，確認「Create branch based on...」的基準分支 |
| 4 | 點擊「Create Branch」 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>對照指令：</b> 對應到 <code>git branch</code> / <code>git checkout -b</code>，這個指令我們會在使用分支那一章詳細介紹。
</div>

<!--
新增分支時記得確認「based on」那個基準分支選對了，這個小地方很容易點錯，尤其手上同時開著好幾個分支的時候。接下來看怎麼切換分支。
-->

---

# 切換分支

| 步驟 | 操作 |
| --- | --- |
| 1 | 點擊 Current Branch 下拉選單 |
| 2 | 選擇要切換的分支 |
| 3 | 若有未 commit 的變更，選擇「留在原分支」或「帶到新分支」 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>對照指令：</b> 對應到 <code>git switch</code>，這個指令我們會在使用分支那一章詳細介紹。
</div>

<!--
切換分支時如果手上還有沒 commit 的變更，Desktop 會很貼心地問你要不要一起帶過去，這一點比純指令列友善，指令列預設是直接擋下來，要求你先處理乾淨。
-->

---

# 建立 Pull Request

分支推上遠端之後（點擊 **Publish branch**），就能直接在 Desktop 裡開 PR：

| 步驟 | 操作 |
| --- | --- |
| 1 | 確認目前在功能分支上，且已經 Push 過 |
| 2 | 點擊選單列 Branch → Create Pull Request（或畫面上的「Create Pull Request」按鈕） |
| 3 | 瀏覽器會自動開啟 GitHub 網頁，帶入分支資訊 |
| 4 | 在網頁上填寫標題、描述，選擇要合併到的目標分支 |
| 5 | 點擊「Create Pull Request」送出 |

<div class="mt-4 p-3 bg-red-50 border-l-4 border-red-400 text-gray-700 text-sm text-left">
⚠️ <b>注意：</b> 開 PR 跟合併 PR 需要對該 repository 有寫入權限，否則需要先 Fork 一份到自己帳號下。
</div>

<!--
Desktop 幫你做的是「準備」的部分——確認分支已經推上去，並且一鍵帶你到瀏覽器的開 PR 頁面，實際填寫標題、描述、選擇合併目標，還是在 GitHub 網頁上完成。這跟我們稍後會學到的 Fork 工作流程是同一套邏輯，只是省去了自己找 repo 網址、自己點 Compare & pull request 按鈕的步驟。
-->

---
layout: default
---

# 練習 1：安裝並登入 GitHub Desktop
### 任務說明

在自己的電腦上完成以下操作：
1. 前往官網下載並安裝 GitHub Desktop
2. 登入自己的 GitHub 帳號
3. 確認 Git 身份設定裡的 name / email 與 GitHub 帳號一致

---

# 練習 1：解題提示
### 提示說明

1. 依照系統需求表確認自己的作業系統版本符合安裝條件
2. 忘記登入路徑的話，回頭看「初次設定」那一頁的表格
3. email 對不上時，直接在 Git 設定頁面手動修改，或到 GitHub 網頁的 Settings → Emails 確認帳號綁定的信箱

---
layout: default
---

# 練習 2：完整走一次協作流程
### 任務說明

用 GitHub Desktop 完成一次完整流程：
1. Clone 一個你有權限的 repository（或自己建立一個新的）
2. 建立一個新分支
3. 修改一個檔案並 commit
4. Push 到遠端
5. 建立一個 Pull Request

---

# 練習 2：解題提示
### 提示說明

1. 沒有現成 repo 的話，先在 GitHub 網頁上建立一個新的空 repository 再 clone 下來
2. 建立分支時記得確認基準分支是 main
3. commit 前先在 Changes 分頁確認 diff 內容，只勾選你真的要送出的檔案
4. Push 完成後，畫面上或選單列會出現「Create Pull Request」的入口

---
layout: default
---

# 本章重點回顧


- **Desktop 不是取代 Git**，底層跑的還是同一套指令；Ch 1 的三大區域觀念完全通用
- **Changes 分頁 = `git status` + `git diff`；History 分頁 = `git log`**
- **核取方塊 = `git add`**，勾選單行 = `git add -p`
- **Summary / Description = `git commit -m "標題" -m "內文"`**
- **Push / Fetch / Pull 按鈕上的數字**，就是本機和遠端相差幾個 commit
- **email 要跟 GitHub 帳號一致**，否則貢獻紀錄不會算進去
- **複雜操作（互動式 rebase、腳本、遠端主機）還是回終端機**


<div style="margin-top: 1rem; padding: 0.8rem 1.2rem; background: #fff8f0; border-left: 4px solid #d97706; border-radius: 4px;">

**下一章：** Ch 5 使用分支 — branch / switch / merge / 衝突解決

<Link to="ch05" style="color: #d97706; font-weight: 600;">前往 Ch 5 →</Link>

</div>

<!--
這一章沒有新的 Git 觀念，全部都是前三章學過的東西換一個介面呈現。真正要帶走的是那張「按鈕 ↔ 指令」的對照關係——知道自己按下去的是哪個指令，出問題的時候才知道要查什麼。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Q & A

<!--
這一章我們認識了 GitHub Desktop 這個圖形化工具：它是什麼、怎麼下載安裝、怎麼登入設定，以及 clone、commit、push、pull、開分支、開 PR 這一整套日常操作在介面上怎麼做。記得它跟指令列不是取代關係，而是互補——日常操作可以用 Desktop 加快速度，遇到複雜情境再切回終端機。有任何問題都歡迎現在提出來，下一章我們要進入分支的世界，學會怎麼讓多條開發線並行而不互相干擾。
-->
