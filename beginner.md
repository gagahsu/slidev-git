---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
title: Git 初學者課程
routeAlias: bhome
routerMode: hash
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
---

<style>
.chapter-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 960px;
  margin-top: 1.2rem;
}
.chapter-card {
  display: block;
  background: #fff8f0;
  border: 2px solid #d97706;
  border-radius: 12px;
  padding: 0.5rem 0.6rem;
  text-decoration: none !important;
  color: #92400e !important;
  transition: all 0.2s ease;
}
.chapter-card:hover {
  background: #d97706;
  color: white !important;
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(217, 119, 6, 0.35);
}
.chapter-card:hover .chapter-subtitle {
  color: rgba(255,255,255,0.85) !important;
}
.chapter-card-todo {
  display: block;
  background: #f9fafb;
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  padding: 0.5rem 0.6rem;
  color: #9ca3af;
}
.chapter-card-todo .chapter-subtitle {
  color: #9ca3af;
}
.chapter-num {
  font-size: 1.2rem;
  font-weight: 900;
  margin-bottom: 0.1rem;
}
.chapter-subtitle {
  font-size: max(13px, 0.85rem);
  color: #b45309;
  margin-top: 0.15rem;
}
.half-label {
  font-size: 0.8rem;
  color: #d97706;
  font-weight: 700;
  letter-spacing: 0.1em;
  width: 100%;
  max-width: 960px;
  text-align: left;
  margin-top: 0.7rem;
}
</style>

<div class="flex flex-col items-center h-full" style="background: #ffffff; overflow-y: auto; padding: 0 0;">
  <p style="color: #d97706; font-size: 1rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 0.4rem;">Git 版本控制課程 · 初學者版</p>
  <h1 style="color: #92400e; font-size: 2.2rem; font-weight: 900; line-height: 1.2; margin-bottom: 0.5rem;">用 GitHub Desktop 學 Git</h1>
  <div style="height: 4px; width: 240px; background: linear-gradient(90deg, #d97706, #fbbf24); border-radius: 2px; margin-bottom: 0.5rem;"></div>
  <p style="color: #b45309; font-size: 0.9rem; margin-bottom: 0;">一個自我介紹網頁，從第一個存檔點做到跟隊友協作</p>

  <div class="half-label">上半天</div>
  <div class="chapter-grid" style="margin-top: 0.5rem;">
    <Link to="b01" class="chapter-card">
      <div class="chapter-num">B1</div>
      <div>Git 與 GitHub 是什麼</div>
      <div class="chapter-subtitle">存檔點 / 三大區域 / 安裝設定</div>
    </Link>
    <Link to="b02" class="chapter-card">
      <div class="chapter-num">B2</div>
      <div>本機存檔</div>
      <div class="chapter-subtitle">New repository / Commit / History</div>
    </Link>
    <Link to="b03" class="chapter-card">
      <div class="chapter-num">B3</div>
      <div>放上 GitHub</div>
      <div class="chapter-subtitle">Publish / Push / Pull / Clone</div>
    </Link>
  </div>

  <div class="half-label">下半天</div>
  <div class="chapter-grid" style="margin-top: 0.5rem; grid-template-columns: repeat(5, 1fr);">
    <Link to="b04" class="chapter-card">
      <div class="chapter-num">B4</div>
      <div>開分支</div>
      <div class="chapter-subtitle">New branch / Merge</div>
    </Link>
    <Link to="b05" class="chapter-card">
      <div class="chapter-num">B5</div>
      <div>解衝突 ⭐</div>
      <div class="chapter-subtitle">衝突標記 / VS Code</div>
    </Link>
    <Link to="b06" class="chapter-card">
      <div class="chapter-num">B6</div>
      <div>Pull Request</div>
      <div class="chapter-subtitle">協作者 / Review / Merge</div>
    </Link>
    <Link to="b07" class="chapter-card">
      <div class="chapter-num">練習</div>
      <div>兩人一組協作</div>
      <div class="chapter-subtitle">完整流程 + 一次衝突</div>
    </Link>
    <Link to="b08" class="chapter-card">
      <div class="chapter-num">附錄</div>
      <div>後悔藥 + 小抄</div>
      <div class="chapter-subtitle">Discard / Undo / Revert</div>
    </Link>
  </div>
</div>

<!--
這是初學者版的目錄。
整門課我們只做一個專案：自己的自我介紹網頁。
每一章都在上一章的基礎上往前推一步，所以請大家依照順序上，不要跳章。
上半天做到把網頁放上 GitHub，下半天學分支、解衝突，最後兩人一組協作開 PR。
-->

---
src: ./b01-intro.md
---
---
src: ./b02-local.md
---
---
src: ./b03-github.md
---
---
src: ./b04-branch.md
---
---
src: ./b05-conflict.md
---
---
src: ./b06-pr.md
---
---
src: ./b07-practice.md
---
---
src: ./b08-appendix.md
---
