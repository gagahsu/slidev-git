# Git 初學者版課程規劃

> 對象：完全沒用過 Git 的初學者
> 目標：學完能獨立完成 init / commit / push / pull / merge 解衝突 / 開 branch & PR
> 操作介面：**GitHub Desktop 為主，CLI 語法作為補充**（UI 抗拒感較低）

---

## 設計原則

1. **主線用 GitHub Desktop**：每張操作投影片左側為 Desktop 步驟 + 截圖，右下角放小框「💻 CLI 對照」，CLI 只求認得、不要求操作。
2. **一個專案貫穿全課**（例：自我介紹網頁），每章往前推一步，不換範例。
3. **每個動作只教一種做法**，不列舊語法、替代方案。
4. **每章結尾一個檢查點**：用 History 分頁對照投影片上的圖，確認自己做出來的歷史一樣。
5. **全課 CLI 指令控制在約 15 個**，附錄放一張可列印的小抄。
6. **衝突解決搭配 VS Code**：Desktop 本身不能編輯衝突，需在 Options → Integrations 設定外部編輯器為 VS Code。

---

## 章節規劃

| 章 | 主題 | GitHub Desktop 操作（主線） | CLI 對照（補充） |
|---|---|---|---|
| **B1** | Git 與 GitHub 是什麼 | 存檔點比喻、三大區域（對應 Changes 打勾）、註冊 GitHub、安裝 Desktop + VS Code、登入、Options → Git 設定身份、Integrations 設定編輯器 | `git config user.name / user.email` |
| **B2** | 本機存檔 | File → New repository、Changes 分頁、勾選檔案、Summary → Commit、History 分頁、右鍵 → Ignore | `init` / `status` / `add` / `commit` / `log --oneline` / `.gitignore` |
| **B3** | 放上 GitHub | Publish repository、Push origin、Fetch / Pull origin、Clone repository | `remote add` / `push -u` / `pull` / `clone` |
| **B4** | 開分支 | Current branch → New branch、切換分支、Branch → Merge into current branch、刪除分支 | `switch -c` / `switch` / `merge` / `branch -d` |
| **B5** | 解衝突 ⭐ | Desktop 衝突對話框 → Open in Visual Studio Code → Accept Current / Incoming / Both → 回 Desktop Continue merge；另練 Pull 時發生衝突 | 衝突標記 `<<<<<<<` `=======` `>>>>>>>`、`add` + `commit` |
| **B6** | Pull Request | Push 分支 → Create Pull Request（跳網頁）→ 寫描述 → 隊友 review / 留言 → GitHub 上 Merge → Desktop 切回 main + Pull → 刪分支 | `push -u origin feature/x` |
| **總練習** | 兩人一組協作 | 用 Desktop 走完整流程，故意製造一次衝突並解決 | — |
| **附錄** | 後悔藥 + CLI 小抄 | Discard changes、Undo（最後一次 commit）、Revert | `restore`、指令總表 |

**時數估計**：約 6 小時（1 天，或 2 個半天：B1–B3 / B4–B6 + 總練習）

---

## 從現有教材取材

| 來源 | 取用內容 |
|---|---|
| ch01-intro.md | 沒有版本控制的世界、三大區域觀念圖 |
| ch02-basic.md | Repository 概念、add/commit 為什麼要分兩步、Commit Message 3 條原則、.gitignore 基本 |
| ch03-github.md | GitHub 是什麼、Clone vs Pull 場景、push 被拒（non-fast-forward）→ pull → merge、為什麼需要 PR |
| ch04-github-desktop.md | **主要來源**：安裝、登入、主畫面三區域、Clone、Changes、Commit、Push/Pull、分支、建立 PR、練習 2 |
| ch05-branch.md | 為什麼要分支、Fast-forward / 3-Way 示意圖、衝突原因與標記、分支生命週期 |

## 不放入初學者版（保留於進階課程）

- 安裝多種方式、Linux 安裝、alias、autocrlf、`git help`、設定層級
- SSH / PAT / GCM 身份驗證（Desktop 登入後自動處理）
- blame、log 進階篩選、Conventional Commit 對照表、`git rm` / `mv`、`.gitkeep`
- reset、reflog、shallow clone、`pull --rebase`、remote 增刪改
- `checkout` 舊語法、`--no-ff`、小耳朵、批次清理分支
- Fork、三種 PR merge 方式
- ch06–ch12 全部（tag、stash、cherry-pick、rebase -i、Git Flow、底層原理、force push、Pages）

---

## 檔案結構

```
beginner.md              # 初學者版目錄頁（獨立入口，pnpm dev beginner.md）
b01-intro.md             # routeAlias: b01
b02-local.md             # routeAlias: b02
b03-github.md            # routeAlias: b03
b04-branch.md            # routeAlias: b04
b05-conflict.md          # routeAlias: b05
b06-pr.md                # routeAlias: b06
public/beginner/         # 截圖
```

- 原 ch01–ch12 與 index.md **不動**。

---

## 截圖策略

- **GitHub 網頁畫面**（建 repo、PR、Merge）：用 Claude in Chrome 截圖。
- **GitHub Desktop 畫面**：用 Claude Cowork（computer use）或手動，依下方清單截圖。
- 命名規則：`b<章>-<序號>-<描述>.png`，放 `public/beginner/`。
- 建議用**教學專用 GitHub 帳號**與示範 repo，避免截到個人 email / 私人 repo。
- 視窗大小固定（例：1280×800），淺色主題，確保每張一致。

### 截圖清單（初稿，製作投影片時再補齊）

| 檔名 | 畫面 | 來源 |
|---|---|---|
| b01-01-desktop-download.png | desktop.github.com 下載頁 | 網頁 |
| b01-02-desktop-welcome.png | Desktop 首次開啟歡迎畫面 | Desktop |
| b01-03-desktop-signin.png | 登入 GitHub 授權畫面 | Desktop + 網頁 |
| b01-04-options-git.png | Options → Git 身份設定 | Desktop |
| b01-05-options-integrations.png | Options → Integrations 設定 VS Code | Desktop |
| b02-01-new-repo-dialog.png | File → New repository 對話框 | Desktop |
| b02-02-changes-tab.png | Changes 分頁有未提交檔案 | Desktop |
| b02-03-commit-summary.png | 勾選檔案 + 填 Summary + Commit 按鈕 | Desktop |
| b02-04-history-tab.png | History 分頁顯示多個 commit | Desktop |
| b02-05-ignore-menu.png | 檔案右鍵 → Ignore file | Desktop |
| b03-01-publish-repo.png | Publish repository 對話框 | Desktop |
| b03-02-repo-on-github.png | 推上去後的 GitHub repo 頁面 | 網頁 |
| b03-03-push-origin.png | 頂部列 Push origin 按鈕 | Desktop |
| b03-04-pull-origin.png | 頂部列 Pull origin（有新 commit） | Desktop |
| b03-05-clone-dialog.png | File → Clone repository | Desktop |
| b04-01-new-branch.png | Current branch → New branch | Desktop |
| b04-02-branch-list.png | 分支下拉清單 | Desktop |
| b04-03-merge-into-current.png | Branch → Merge into current branch 對話框 | Desktop |
| b04-04-delete-branch.png | 刪除分支確認 | Desktop |
| b05-01-conflict-dialog.png | 合併衝突對話框 | Desktop |
| b05-02-vscode-conflict.png | VS Code 顯示衝突 + Accept 按鈕 | VS Code |
| b05-03-vscode-resolved.png | 解完後的檔案 | VS Code |
| b05-04-continue-merge.png | 回 Desktop 按 Continue merge | Desktop |
| b06-01-create-pr-button.png | Desktop 上 Create Pull Request 按鈕 | Desktop |
| b06-02-open-pr-page.png | GitHub 開 PR 頁面 | 網頁 |
| b06-03-pr-review.png | PR 留言 / Review 畫面 | 網頁 |
| b06-04-merge-pr.png | Merge pull request 按鈕 | 網頁 |
| b06-05-delete-branch-web.png | Merge 後 Delete branch | 網頁 |
| bA-01-discard-changes.png | 右鍵 Discard changes | Desktop |
| bA-02-undo-commit.png | Undo 最後一次 commit | Desktop |

---

## 下一步

1. 建立 `beginner.md` + B1、B2（含截圖占位框）
2. 截 B1、B2 截圖，確認版面
3. 依序完成 B3–B6、總練習、附錄
