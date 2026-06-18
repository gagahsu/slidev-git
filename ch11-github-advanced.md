---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
title: 進階 GitHub 操作
routeAlias: ch11
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
  <h1 style="color: #92400e; font-size: 3.8rem; font-weight: 900; line-height: 1.15; margin-bottom: 1.5rem;">進階 GitHub 操作</h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #d97706, #fbbf24); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #b45309; font-size: 1.15rem; font-style: italic;">「GitHub 是工具，Git 才是核心」</p>
  <Link to="home" style="margin-top: 2rem; color: #d97706; font-size: 0.9rem;">← 返回目錄</Link>
</div>

<!--
這個章節涵蓋幾個 GitHub 上的進階操作：同步 Fork、刪除遠端分支、正確使用 force push，以及 GitHub Pages 靜態網站托管。最後也會聊聊 Git 的分散式本質——不是一定要有 GitHub 才能協作。
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
# origin    git@github.com:YOUR_USERNAME/repo.git
# upstream  git@github.com:original-owner/repo.git

# 第二步：從 upstream 取得最新資料
git fetch upstream
```

<!--
upstream 這個名字代表「上游」，也就是原始的 repo。接下來看合併與推回的步驟。
-->

---

# 同步 Fork 與原始 Repo：合併與推回

```bash
# 第三步：把 upstream/main 的更新合併到本機 main
git checkout main
git merge upstream/main
# 或是用 rebase 保持線性歷史
git rebase upstream/main

# 第四步：推回你自己的 fork（讓 GitHub 上的 fork 也更新）
git push origin main
```

<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fff8f0; border-left: 4px solid #d97706; border-radius: 4px;">

**快捷方式：** GitHub 網頁上提供「Sync fork」按鈕，一鍵同步，不需要手動執行以上指令。保持 fork 與 upstream 同步，PR 被合併的機率也會更高。

</div>

<!--
這個 sync fork 的流程在開源貢獻中非常常用。如果你的 fork 落後太多，提出的 PR 就可能有很多衝突，維護者要花很多時間處理，你的 PR 被合併的機率也會降低。
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
# 分支名前面有個冒號，意思是「推送空的內容到遠端分支」

# 清理已不存在的遠端分支引用
git remote prune origin
# 或是在 fetch 時順便清理
git fetch --prune
```

<!--
現代的 --delete 語法更易讀，建議用這個。prune 執行後會把本機記錄的「已刪除遠端分支引用」清掉，讓 git branch -r 的結果清爽。接下來看注意事項和自動刪除設定。
-->

---

# 刪除遠端分支：注意事項

<div style="background: #fff8f0; border-left: 4px solid #d97706; padding: 1rem 1.5rem; border-radius: 4px; margin-bottom: 1.2rem;">

**注意：** 刪除遠端分支**不會**影響你的本機分支，只是把 GitHub 上的分支移除。如果你想同時刪除本機分支：`git branch -d feature/login`

</div>

**GitHub 自動刪除設定：**

Repo **Settings → General** → 勾選 **Automatically delete head branches**

PR merge 後自動刪除遠端分支，省去手動清理的麻煩，強烈推薦開啟。

<!--
GitHub 的自動刪除設定非常推薦開啟，省去手動清理的麻煩。
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

**`--force-with-lease` — 更安全的 force push**

```bash
# 不安全：直接覆蓋遠端，不管有沒有別人的新 commit
git push --force

# 較安全：先確認遠端沒有你不知道的新 commit，再 force push
git push --force-with-lease
# 如果遠端有新 commit（別人 push 了），這個指令會失敗
```

<div style="margin-top: 1rem; padding: 0.8rem 1.2rem; background: #fff8f0; border-left: 4px solid #d97706; border-radius: 4px;">

`--force-with-lease` 記住你上次 fetch 時遠端的位置，若有人在你之後 push 了新 commit，就拒絕 force push，保護你不誤刪別人的工作。

</div>

<!--
--force-with-lease 是個非常好的設計，給 force push 加了一個安全網。接下來看何時可以 force push。
-->

---

# Force Push：何時可以用？

| 情境 | 可以？ | 說明 |
| --- | --- | --- |
| 個人的 feature 分支 | ✅ | 只有你一個人在用 |
| 修正 PR 後重新推 | ✅ | 還沒有人 merge，沒問題 |
| 共享的 develop 分支 | ⚠️ | 事先溝通，大家停工再做 |
| main / master 分支 | ❌ | 嚴格禁止 |

<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fef3c7; border-left: 4px solid #d97706; border-radius: 4px;">

很多公司的規範：可以用 `--force-with-lease`，但禁止用 `--force`。

</div>

<!--
不是百分之百安全，但比無腦 --force 安全很多。接下來換個輕鬆的主題。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Part 4
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

| 框架 | 說明 |
| --- | --- |
| **Jekyll** | GitHub 原生支援，只要有 `_config.yml` 就自動 build，無需 Actions |
| **Hugo** | Go 寫的，build 速度極快，需搭配 Actions 部署 |
| **Astro / VitePress** | 現代前端生態，需搭配 Actions 部署 |

<div style="margin-top: 1.2rem; padding: 0.8rem 1.2rem; background: #fff8f0; border-left: 4px solid #d97706; border-radius: 4px;">

搭配 GitHub Actions：每次 push 到 main 自動 build + deploy，完全自動化，免費又穩定。

</div>

<!--
Jekyll 是 GitHub 原生支援的，push markdown 就自動編譯，不需要額外設定。但 Jekyll 比較慢，現在更多人用 Hugo 或 Astro。接下來看 Actions 的設定範例。
-->

---

# GitHub Pages 進階：Actions 自動部署範例

```yaml
# .github/workflows/deploy.yml
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
搭配 GitHub Actions，每次 push 到 main 就自動 build 和部署，完全自動化，免費又穩定，是個人作品集的好選擇。
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
# 把本機的某個目錄設定為「遠端」
git remote add local-backup /Users/alice/Backups/my-project.git
git push local-backup main

# 用本機路徑 clone
git clone /path/to/another/repo my-copy
```

<!--
Git 是去中心化的，每個人的本機都是一個完整的 repo，GitHub 只是大家約定好的「協調點」。接下來看區網架設方式。
-->

---

# Git 的分散式本質：區網架設

```bash
# 用 git daemon 在區網提供 Git 服務（唯讀）
git daemon --reuseaddr --base-path=/srv/git/ /srv/git/

# 其他人可以 clone
git clone git://192.168.1.100/my-project.git
```

<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fff8f0; border-left: 4px solid #d97706; border-radius: 4px;">

在公司內網不通外網、或保密專案不能放雲端的情境下，可以用 `git daemon` 或在自己的伺服器上架設 Git 服務。兩台電腦在同一個 WiFi 下，甚至可以直接互相 push/pull，完全不需要任何伺服器。

</div>

<!--
接下來我們來看各種替代方案的總覽。
-->

---

# 沒有 GitHub 的協作方式總覽

| 方式 | 工具 | 適合場景 |
| --- | --- | --- |
| 本機路徑 | `git remote add` + 路徑 | 同一台電腦的備份 |
| USB 隨身碟 | `git clone /media/usb/repo.git` | 離線環境 |
| 區網 Git daemon | `git daemon` | 辦公室內網 |
| SSH 伺服器 | `git clone user@host:/path/repo.git` | 自架 SSH 服務器 |

<!--
不需要完整的 web UI，直接用 bare git repository 加 SSH 是最簡單的方案，什麼都不用安裝。接下來看自架 Git 服務的選項。
-->

---

# 沒有 GitHub 的協作方式：自架 Git 服務

| 方案 | 說明 | 適合場景 |
| --- | --- | --- |
| **Gitea** | 輕量 Go 寫的自架方案，一個 binary 就能跑 | 低資源需求的私有 Git 服務，可部署在樹莓派 |
| **GitLab CE** | 功能完整，有內建 CI/CD | 需要完整 GitHub 功能但要自架 |

<div style="margin-top: 1.5rem; padding: 1rem 1.5rem; background: #fff8f0; border-left: 4px solid #d97706; border-radius: 4px;">

**結論：** GitHub 提供的是**便利性**和**社群**，不是 Git 的必要元件。理解這一點，才能真正理解 Git 的架構設計。

</div>

<!--
需要私有 Git 服務時，Gitea 是個很輕量的選擇，用 Go 寫的，一個 binary 就能跑，可以部署在樹莓派上。GitLab Community Edition 功能更完整，有內建 CI/CD，但資源需求也更高。如果只是個人小團隊，Gitea 就夠用了。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Q & A

<!--
這一章看了 GitHub 的進階功能，從 GitHub Actions CI/CD、protected branches，到 fork 工作流程，以及理解 Git 和 GitHub 的本質差異。如果有任何問題，歡迎提出來！
-->
