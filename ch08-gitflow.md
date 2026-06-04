---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
title: 使用 Git Flow
routeAlias: ch08
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
  <h1 style="color: #92400e; font-size: 3.8rem; font-weight: 900; line-height: 1.15; margin-bottom: 1.5rem;">使用 Git Flow</h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #d97706, #fbbf24); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #b45309; font-size: 1.15rem; font-style: italic;">「讓團隊協作有規則可循」</p>
  <Link to="home" style="margin-top: 2rem; color: #d97706; font-size: 0.9rem;">← 返回目錄</Link>
</div>

<!--
上一章我們學了 GitHub 上的協作工具，但光有工具還不夠——多人團隊還需要「規則」。什麼時候該開新分支？功能做完要合併到哪裡？怎麼準備一個正式上線版本？Git Flow 就是一套回答這些問題的分支管理規範，由 Vincent Driessen 在 2010 年提出，至今仍是業界廣泛採用的標準之一。接下來我們來看它解決了什麼問題。
-->

---
layout: default
---

# Outline

- **Git Flow 是什麼？為什麼需要？** — 分支策略 / 團隊協作規範
- **使用 Git Flow** — 五種分支 / 工作流程示範

<!--
這章比較精煉，兩個大主題。第一個是概念：為什麼需要 Git Flow，它解決了什麼問題，五種分支各自的角色是什麼。第二個是實作：怎麼用 git-flow 工具執行完整的開發、發布、緊急修復流程，以及和其他工作流程的比較。接下來我們從第一個主題開始。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 1
## Git Flow 是什麼？為什麼需要這種東西？

<!--
先從問題出發：如果沒有 Git Flow，沒有任何分支規範，多人團隊協作會有什麼狀況？我們來看一個很真實的情境。
-->

---

# 沒有分支規範的混亂

想像一個 5 人開發團隊，沒有任何分支策略：

<div class="grid grid-cols-2 gap-6">
<div>

**常見的混亂情境：**

- 小明把做到一半的功能 push 到 main，整個 build 壞掉
- 小美說「我的機器上是好的啊？」
- 客戶明天要看 demo，但 main 上有三個功能都做到一半
- 線上緊急 bug，但 main 上有五個未測試的功能不能上
- 三個月後想找「上一個版本」，不知道是哪個 commit

</div>
<div>

**問題的根源：**

- 沒有「哪裡永遠是可上線版本」的共識
- 功能開發和發布準備混在一起
- 緊急修復沒有獨立的管道
- 不知道什麼叫做「完成」

</div>
</div>

<br>

<div style="background: #fef3c7; border-left: 4px solid #d97706; padding: 1rem 1.2rem; border-radius: 4px;">

**分支策略解決的核心問題：** 讓團隊對「現在什麼狀態的程式碼在哪裡」有共同的認識。

</div>

<!--
你有沒有遇過這種情況：明明昨天還好好的，今天早上 pull 下來整個壞掉，因為有人把半成品推上去了。特別是「線上緊急 bug 但 main 上一堆未完成功能」這個問題，在沒有規範的團隊裡是真正的噩夢。你需要把那些未完成的功能先 revert，修完 bug，再把 revert 還原，稍不注意就出錯。Git Flow 的設計就是從根本上解決這類問題。
-->

---

# Git Flow 的起源與設計理念

**Vincent Driessen** 於 2010 年在部落格文章「A successful Git branching model」中提出，至今仍是業界最廣為人知的分支策略。

<br>

**核心理念：每種分支有明確的生命週期和責任**

```
main ──────────────────────────────────────────────► （永遠可上線）
  │                                    ↑  ↑
  │                              release  hotfix
  │                                  ↑      ↑
develop ──────────────────────────────────────────► （整合開發）
  │          ↑         ↑        ↑
feature/A  feature/B  feature/C  ...
```

<br>

**適用條件：**
- 有明確版本號（v1.0、v2.0、v1.2.3）的產品
- 需要同時維護多個版本的專案
- 發布週期較長（週發布或月發布）

<!--
Vincent Driessen 這篇文章一發出來就在開發者社群引起廣大迴響，因為它完美地用文字描述了很多團隊當時在痛苦摸索的東西。有趣的是，他自己在 2020 年於文章底部加了說明，表示這個模型適合有版本號的套件，但對持續交付的 web app 可能 GitHub Flow 更適合。能在十年後坦然補充，說明這個作者很有誠信。接下來看五種分支各自的角色。
-->

---

# Git Flow 的五種分支角色

<div class="grid grid-cols-2 gap-6">
<div>

**長期存在的分支（永久分支）**

| 分支 | 角色 |
| --- | --- |
| `main` | 永遠是可上線的穩定版本，每個 commit 都有 tag |
| `develop` | 所有功能的整合分支，下一版本的預備狀態 |

</div>
<div>

**短期分支（完成任務後刪除）**

| 分支 | 角色 |
| --- | --- |
| `feature/*` | 個別功能開發 |
| `release/*` | 準備正式發布 |
| `hotfix/*` | 生產環境緊急修復 |

</div>
</div>

<br>

**分支命名慣例範例：**

```
feature/user-authentication
feature/shopping-cart
release/1.2.0
hotfix/fix-payment-null-pointer
```

<!--
五種分支的設計非常有道理。main 是「對外」的門面，永遠代表已上線的版本，不接受直接 push，只接受 release 和 hotfix 的合併。develop 是「對內」的整合點，所有功能做完都先合進來，確認沒問題再整理成 release 準備上線。feature 分支最多，每個功能獨立一個，互不干擾。release 和 hotfix 是有時效性的，完成任務就要刪掉，不會長期留著。接下來看合併規則。
-->

---

# 各分支的合併規則

**嚴格的合併方向確保程式碼品質：**

```
feature/* ──► develop
release/* ──► main  AND  develop
hotfix/*  ──► main  AND  develop
```

<br>

| 分支 | 從哪裡建立 | 合併回哪裡 | 目的 |
| --- | --- | --- | --- |
| `feature/*` | `develop` | `develop` | 新功能開發 |
| `release/*` | `develop` | `main` + `develop` | 發布準備、小 bug 修正 |
| `hotfix/*` | `main` | `main` + `develop` | 緊急 bug 修復 |

<br>

<div style="background: #fff8f0; border-left: 4px solid #d97706; padding: 1rem 1.5rem; border-radius: 4px;">

**關鍵規則：** `feature` 分支永遠不直接合到 `main`。`main` 只接受來自 `release` 和 `hotfix` 的合併，並且每次合併都要打上版本 tag。

</div>

<!--
這個合併規則是 Git Flow 的骨幹。feature 不能直接進 main，確保 main 的程式碼永遠是穩定的。release 和 hotfix 都要同時合到 main 和 develop，這點很重要：如果只合到 main 而沒有合回 develop，下個版本就會漏掉這次的修正，等於白修了。這個「雙向合併」的機制確保修復不會在版本之間失蹤。
-->

---

# Git Flow 的適用時機

**適合 Git Flow：**

- 有明確版本號（SemVer：v1.2.3）的產品或套件
- 需要同時維護 v1.x 和 v2.x 的情境
- 發布週期較長（bi-weekly 或更長）
- 需要嚴格的 QA 流程，發布前有專屬的測試期

<br>

**不適合 Git Flow，考慮其他策略：**

| 情境 | 建議策略 |
| --- | --- |
| Web 應用，每天部署多次 | GitHub Flow（只有 main + feature） |
| 大型單體 repo，大量小改動 | Trunk-based Development |
| 小團隊，快速迭代 | GitHub Flow 或直接 push main |

<br>

<div style="background: #fef3c7; border-left: 4px solid #d97706; padding: 1rem 1.2rem; border-radius: 4px;">

Git Flow 的複雜度有其代價，不是所有專案都需要這麼完整的規範。選擇最適合團隊的工作流程才是最重要的。

</div>

<!--
這是很多人沒想到的一點：Git Flow 並不適合所有場景。如果我們在做一個 web app，每天部署好幾次，用 Git Flow 的 release 流程會讓大家覺得很麻煩。GitHub Flow 這種更輕量的策略反而更適合：只有 main 和 feature 兩種分支，feature 完成後開 PR，merge 後直接部署。不是說 Git Flow 不好，是要選適合自己團隊的工具。接下來我們來看怎麼實際操作 Git Flow。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 2
## 使用 Git Flow

<!--
概念理解了，現在來看怎麼實際操作。我們先介紹 git-flow 這個輔助工具，再逐一示範三大工作流程：新功能開發、版本發布、緊急修復。
-->

---

# 安裝與初始化 git-flow

`git-flow` 是一個 CLI 工具，把 Git Flow 的多步驟操作封裝成簡單的指令：

```bash
# 安裝 git-flow
# macOS（Homebrew）
brew install git-flow-avh

# Windows（Git for Windows 已內建，或用 Chocolatey）
choco install gitflow-avh

# Ubuntu / Debian
apt-get install git-flow
```

```bash
# 在專案根目錄初始化（互動式，通常全部按 Enter 接受預設）
git flow init

# 或非互動式，接受所有預設值
git flow init -d
```

```
Which branch should be used for bringing forth production releases?
   - main
Branch name for production releases: [main]

Which branch should be used for integration of the "next release"?
   - develop
Branch name for "next release" development: [develop]
```

<!--
git-flow 工具不是必要的，你完全可以用原生的 git 指令手動做 Git Flow 的所有步驟。但 git-flow 把這些操作包裝起來，減少出錯的機會，也讓流程更容易記憶。git flow init 會問你各種分支的命名，預設值就是 Git Flow 的標準命名，一般直接按 Enter 就好。初始化之後，它會自動建立 develop 分支並切換過去。接下來看新功能開發流程。
-->

---

# 新功能開發流程

**使用 git-flow 工具：**

```bash
# 開始開發新功能（從 develop 建立 feature/login 分支）
git flow feature start login
# 相當於：git checkout -b feature/login develop

# ... 開發中，正常 commit ...
git add login.py
git commit -m "feat: implement user login form"
git commit -m "feat: add login validation"
git commit -m "test: add unit tests for login"

# 完成功能（合併到 develop，刪除 feature 分支）
git flow feature finish login
# 相當於：
#   git checkout develop
#   git merge --no-ff feature/login
#   git branch -d feature/login
```

<br>

<div style="background: #fff8f0; border-left: 4px solid #d97706; padding: 1rem 1.5rem; border-radius: 4px;">

`--no-ff`（no fast-forward）確保合併時一定會產生 merge commit，保留「這些 commit 屬於 feature/login」的歷史資訊。

</div>

<!--
--no-ff 在 Git Flow 中很重要。如果用 fast-forward 合併，feature 分支的 commit 會直接「接」在 develop 上，看起來就像是直接在 develop 上開發的，你無法從 git log 看出這些 commit 屬於哪個功能。--no-ff 強制產生一個 merge commit，讓歷史圖形中可以清楚看到 feature 分支的起點和終點，對追蹤功能歷史很有幫助。接下來看純 git 指令的版本。
-->

---

# 新功能開發流程（純 Git 指令版）

如果沒有 git-flow 工具，用原生 git 指令也完全可以：

```bash
# 確保 develop 是最新的
git checkout develop
git pull origin develop

# 建立功能分支
git checkout -b feature/shopping-cart

# 開發中...
git add .
git commit -m "feat: add shopping cart model"

# 推送到 GitHub（讓其他人可以看到或協作）
git push -u origin feature/shopping-cart

# 功能完成，合回 develop（--no-ff 保留分支歷史）
git checkout develop
git merge --no-ff feature/shopping-cart -m "Merge feature/shopping-cart into develop"

# 刪除本機和遠端的 feature 分支
git branch -d feature/shopping-cart
git push origin --delete feature/shopping-cart

# 推送 develop 到遠端
git push origin develop
```

<!--
純 Git 指令版本步驟多一點，但讓我們更清楚每一步在做什麼。在實際工作中，通常會用 GitHub 的 PR 功能來做 feature 到 develop 的合併，而不是在 command line 直接 merge，因為 PR 提供了 code review 的機制。git-flow 工具的優勢主要在不用 PR 的場景，例如小團隊或個人專案，讓操作更便利。接下來看版本發布流程。
-->

---

# 版本發布流程

**當 develop 上的功能都準備好，要準備發布新版本：**

```bash
# 開始準備 1.0.0 版本（從 develop 建立 release/1.0.0 分支）
git flow release start 1.0.0
# 相當於：git checkout -b release/1.0.0 develop

# 在 release 分支上做最後的調整：
# - 更新版本號（package.json, pom.xml, version.py...）
# - 修正小 bug（不加新功能！）
# - 更新 CHANGELOG
git commit -m "chore: bump version to 1.0.0"
git commit -m "fix: fix edge case in payment flow"

# 完成發布（合到 main 和 develop，打 tag，刪除 release 分支）
git flow release finish 1.0.0
# 相當於：
#   git checkout main && git merge --no-ff release/1.0.0
#   git tag -a 1.0.0 -m "Release version 1.0.0"
#   git checkout develop && git merge --no-ff release/1.0.0
#   git branch -d release/1.0.0

# 推送 main、develop 和 tag 到遠端
git push origin main develop --tags
```

<!--
release 分支的重點是「只修不加」——在這個分支上只能做小 bug 修正、版本號更新、文件更新，不能加任何新功能。新功能要排到下一個版本的 develop 去。這個規則確保 release 分支的穩定性。git flow release finish 會同時合到 main、打 tag、合回 develop，是個複合操作，用純 git 指令要手動做好幾步，所以這裡 git-flow 工具的優勢特別明顯。接下來看緊急修復流程。
-->

---

# 緊急修復流程

**線上版本有嚴重 bug，需要立即修復，不能等下個 release：**

```bash
# 從 main（也就是線上版本）建立 hotfix 分支
git flow hotfix start fix-login-crash
# 相當於：git checkout -b hotfix/fix-login-crash main

# 修復 bug
git add login.py
git commit -m "fix: prevent null pointer in login when user is inactive"

# 完成 hotfix（合到 main 和 develop，打 tag，刪除 hotfix 分支）
git flow hotfix finish fix-login-crash
# 相當於：
#   git checkout main && git merge --no-ff hotfix/fix-login-crash
#   git tag -a 1.0.1 -m "Hotfix: fix login crash for inactive users"
#   git checkout develop && git merge --no-ff hotfix/fix-login-crash
#   git branch -d hotfix/fix-login-crash

# 推送
git push origin main develop --tags
```

<br>

<div style="background: #fef3c7; border-left: 4px solid #d97706; padding: 1rem 1.2rem; border-radius: 4px;">

**注意：** hotfix 從 `main` 建立，不是從 `develop`，這樣才能確保只包含線上版本的程式碼，不夾帶 develop 上未完成的功能。

</div>

<!--
hotfix 流程是 Git Flow 設計中最精彩的部分。它完美解決了「線上有 bug 但 develop 上有未完成功能」的困境。hotfix 從 main 建立，基礎是乾淨的線上版本，修完 bug 合到 main 就立刻可以上線，不需要擔心 develop 上的東西會跟著出去。同時合到 develop，確保這個修復在下個版本也有，不會再出現同樣的 bug。接下來看完整的流程圖。
-->

---

# Git Flow 完整流程圖

```
main:     ──●─────────────────────────────●─────────►
              │                    release/1.0.0↗  │hotfix/1.0.1
              ↓                          ↗          ↓
develop:  ────●─────●────●───────────────●──────────●──►
                    ↑    ↑         ↑    ↑↑          ↑
              feature/A  │   feature/C  ↑↑     hotfix合回
                    feature/B    release合回    ↑
                                               hotfix/1.0.1

tags:              v0.9.0             v1.0.0    v1.0.1
```

<br>

**每個 commit 的來源都清晰可追溯：**

| 在 main 的 commit | 代表 |
| --- | --- |
| `Merge release/1.0.0` | 正式發布 1.0.0 |
| `Merge hotfix/fix-login` | 緊急修復，產生 1.0.1 |

<!--
這張流程圖展示了 Git Flow 的全貌。main 和 develop 是兩條平行的長期分支，其他分支都是短暫的，完成任務就消失。main 上的每個合併 commit 都對應一個版本號，代表一個正式發布。看 main 的 git log，就能清楚知道「1.0.0 是什麼時候發布的，1.0.1 是修了什麼緊急 bug」。這種可追溯性對維護和審計非常有價值。接下來我們來比較三種工作流程。
-->

---

# Git Flow vs GitHub Flow vs Trunk-based

| 特性 | Git Flow | GitHub Flow | Trunk-based |
| --- | --- | --- | --- |
| 長期分支數量 | 2（main + develop） | 1（main） | 1（main/trunk） |
| 短期分支 | feature / release / hotfix | feature | 短暫功能分支（可選） |
| 發布流程 | release 分支 | merge 即部署 | 持續部署 |
| 適合發布頻率 | 週期性發布 | 隨時部署 | 每日多次部署 |
| 複雜度 | 高 | 低 | 中（需要 feature flags） |
| 適合場景 | 有版本號的產品 | Web 應用、SaaS | 大型持續交付 |
| 代表公司 | 傳統軟體公司 | GitHub 本身 | Google、Facebook |

<br>

<div style="background: #fff8f0; border-left: 4px solid #d97706; padding: 1rem 1.5rem; border-radius: 4px;">

**建議：** 先了解 Git Flow 打好基礎，再根據團隊的實際需求選擇或客製化最適合的工作流程。

</div>

<!--
這個比較表是整章最重要的一個總結。沒有哪個工作流程是完美的，關鍵是要跟你的團隊、你的產品類型、你的部署頻率相匹配。GitHub Flow 最簡單，門檻低，適合快速迭代的 web 應用。Git Flow 最完整，適合需要嚴格版本管理的產品。Trunk-based 最激進，需要強大的自動化測試和 feature flags 基礎設施作為支撐，很多大公司其實用的是介於這三者之間的客製化版本。
-->

---

# 實戰建議：導入 Git Flow 的注意事項

<div class="grid grid-cols-2 gap-6">
<div>

**導入前準備**

- 團隊成員都要理解五種分支的意義
- 在 GitHub repo 設定分支保護規則：
  - main 和 develop 禁止直接 push
  - 要求 PR + Code Review
  - 要求 CI 通過才能 merge
- 撰寫 `CONTRIBUTING.md` 記錄團隊的工作流程

</div>
<div>

**常見陷阱**

- develop 累積太多功能、長期沒有 release → 「merge 地獄」
- hotfix 修完忘記合回 develop → 下個版本 bug 又出現
- feature 分支存活太久 → 和 develop 差異太大，merge 衝突嚴重
- release 分支上加了新功能 → 打破 release 只能修 bug 的規則

</div>
</div>

<br>

<div style="background: #fff8f0; border-left: 4px solid #d97706; padding: 1rem 1.5rem; border-radius: 4px;">

**黃金法則：** feature 分支盡量小而短暫（建議不超過 2 週）。分支存活越久，和 develop 的差距越大，合併的痛苦就越多。

</div>

<!--
這些是導入 Git Flow 時最常踩到的坑。分支保護規則是很重要的技術保障，可以防止大家在疲勞或緊張時不小心直接 push 到 main。feature 分支太長壽是另一個大問題，有人開了分支去忙其他事，兩個月後回來發現 develop 已經差了幾十個 commit，解衝突就花了一整天。如果功能很大，考慮拆成多個小的 feature 分批合進 develop，這樣每次 merge 都輕鬆很多。
-->

---
layout: end
---

# Ch 8 結束

### 選擇適合團隊的工作流程，讓協作更順暢

<Link to="home" style="margin-top: 1.5rem; display: inline-block; color: #d97706;">← 返回目錄</Link>

<!--
第八章到這裡結束，也是整個 Git 版本控制課程的最後一章。從第一章的版本控制概念，到最後的 Git Flow 工作策略，我們走過了 Git 從本機使用到多人協作的完整旅程。希望這堂課讓大家在工作中用 Git 更有信心，遇到狀況不再慌亂，也能根據團隊需求選擇最合適的協作方式。
-->
