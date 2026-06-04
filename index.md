---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: Git 版本控制課程
routeAlias: home
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
  padding: 1.2rem 0.8rem;
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
.chapter-num {
  font-size: 1.6rem;
  font-weight: 900;
  margin-bottom: 0.3rem;
}
.chapter-subtitle {
  font-size: max(13px, 0.88rem);
  color: #b45309;
  margin-top: 0.3rem;
}
</style>

<div class="flex flex-col items-center h-full" style="background: #ffffff; overflow-y: auto; padding: 1.5rem 0;">
  <p style="color: #d97706; font-size: 1rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 1rem;">Git 版本控制課程</p>
  <h1 style="color: #92400e; font-size: 2.8rem; font-weight: 900; line-height: 1.2; margin-bottom: 0.5rem;">課程目錄</h1>
  <div style="height: 4px; width: 240px; background: linear-gradient(90deg, #d97706, #fbbf24); border-radius: 2px; margin-bottom: 0.5rem;"></div>
  <p style="color: #fbbf24; font-size: 0.9rem; margin-bottom: 0;">點擊章節卡片開始學習</p>
  <div class="chapter-grid">
    <Link to="ch01" class="chapter-card">
      <div class="chapter-num">Ch 1</div>
      <div>Git 版本控制簡介</div>
      <div class="chapter-subtitle">版本控制概念 / Git 架構 / 安裝設定</div>
    </Link>
    <Link to="ch02" class="chapter-card">
      <div class="chapter-num">Ch 2</div>
      <div>基本操作</div>
      <div class="chapter-subtitle">init / add / commit / status / log</div>
    </Link>
    <Link to="ch03" class="chapter-card">
      <div class="chapter-num">Ch 3</div>
      <div>分支與合併</div>
      <div class="chapter-subtitle">branch / checkout / merge / fast-forward</div>
    </Link>
    <Link to="ch04" class="chapter-card">
      <div class="chapter-num">Ch 4</div>
      <div>遠端儲存庫</div>
      <div class="chapter-subtitle">remote / clone / push / pull / fetch</div>
    </Link>
    <Link to="ch05" class="chapter-card">
      <div class="chapter-num">Ch 5</div>
      <div>進階指令</div>
      <div class="chapter-subtitle">rebase / cherry-pick / stash / reset</div>
    </Link>
    <Link to="ch06" class="chapter-card">
      <div class="chapter-num">Ch 6</div>
      <div>Git 工作流程</div>
      <div class="chapter-subtitle">GitFlow / GitHub Flow / Trunk-based</div>
    </Link>
    <Link to="ch07" class="chapter-card">
      <div class="chapter-num">Ch 7</div>
      <div>衝突解決與協作</div>
      <div class="chapter-subtitle">conflict / PR / code review</div>
    </Link>
  </div>
</div>

---
src: ./ch01-intro.md
---

---
src: ./ch02-basic.md
---
