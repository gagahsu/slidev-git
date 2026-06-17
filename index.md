---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
title: Git 版本控制課程
routeAlias: home
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
.chapter-card-adv {
  display: block;
  background: #fffbeb;
  border: 2px dashed #d97706;
  border-radius: 12px;
  padding: 1.2rem 0.8rem;
  text-decoration: none !important;
  color: #92400e !important;
  transition: all 0.2s ease;
}
.chapter-card-adv:hover {
  background: #fef3c7;
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(217, 119, 6, 0.2);
}
.chapter-card-adv:hover .chapter-subtitle {
  color: #78350f !important;
}
.adv-badge {
  font-size: 0.72rem;
  color: #d97706;
  font-weight: 700;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
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
  <p style="color: #b45309; font-size: 0.9rem; margin-bottom: 0;">點擊章節卡片開始學習</p>

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
      <div>使用分支</div>
      <div class="chapter-subtitle">branch / merge / conflict</div>
    </Link>
    <Link to="ch04" class="chapter-card">
      <div class="chapter-num">Ch 4</div>
      <div>遠端共同協作</div>
      <div class="chapter-subtitle">GitHub / push / pull / PR</div>
    </Link>
  </div>

  <div style="display:flex; align-items:center; width:100%; max-width:960px; margin:1.6rem 0 0; gap:1rem;">
    <div style="flex:1; height:1px; background:linear-gradient(90deg, transparent, #d97706);"></div>
    <span style="color:#d97706; font-weight:700; font-size:0.95rem; white-space:nowrap; letter-spacing:0.05em;">▶ 進階／自學內容</span>
    <div style="flex:1; height:1px; background:linear-gradient(90deg, #d97706, transparent);"></div>
  </div>

  <div class="chapter-grid">
    <Link to="ch05" class="chapter-card-adv">
      <div class="adv-badge">進階・自學</div>
      <div class="chapter-num">Ch 5</div>
      <div>標籤</div>
      <div class="chapter-subtitle">git tag / lightweight / annotated</div>
    </Link>
    <Link to="ch06" class="chapter-card-adv">
      <div class="adv-badge">進階・自學</div>
      <div class="chapter-num">Ch 6</div>
      <div>其它常見狀況題</div>
      <div class="chapter-subtitle">stash / cherry-pick / filter-repo</div>
    </Link>
    <Link to="ch07" class="chapter-card-adv">
      <div class="adv-badge">進階・自學</div>
      <div class="chapter-num">Ch 7</div>
      <div>修改歷史紀錄</div>
      <div class="chapter-subtitle">rebase -i / reset / revert</div>
    </Link>
    <Link to="ch08" class="chapter-card-adv">
      <div class="adv-badge">進階・自學</div>
      <div class="chapter-num">Ch 8</div>
      <div>使用 Git Flow</div>
      <div class="chapter-subtitle">feature / release / hotfix</div>
    </Link>
  </div>
</div>

---
src: ./ch01-intro.md
---
---
src: ./ch02-basic.md
---
---
src: ./ch03-branch.md
---
---
src: ./ch04-github.md
---
---
src: ./ch05-tag.md
---
---
src: ./ch06-situations.md
---
---
src: ./ch07-history.md
---
---
src: ./ch08-gitflow.md
---
