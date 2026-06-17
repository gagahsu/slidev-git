# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Commands

```bash
pnpm dev              # Start dev server at localhost:3030
pnpm build            # Build to dist/ for deployment
pnpm export           # Export slides to PDF
```

Package manager is **pnpm** (not npm/yarn). The `.npmrc` sets `shamefully-hoist=true` required by Slidev.

## Architecture

This is a **Slidev** presentation project for Git curriculum. All slide files live at the root level.

### Entry Point
- `index.md` — Portal page (目錄頁) with chapter navigation cards. Imports all chapter decks via `src:`.

### Slide Decks
- `ch01-*.md`, `ch02-*.md`, … — Chapter slide files

### Vue Components
- `global-bottom.vue` — Footer rendered on every slide showing page X/Y

### Templates
- `_template/` — Blueprint for new chapters (slides.md, global-bottom.vue, package.json, style.css)

## Navigation

```yaml
# In slide frontmatter:
routeAlias: ch01
```

```html
<Link to="ch01">Go to Ch01</Link>
<Link to="home">← 返回目錄</Link>
```

## Adding a New Chapter

1. Copy `_template/slides.md` → `<chXX-name>.md` at root
2. Set `routeAlias: chXX` and `title:` in frontmatter
3. Add `src: ./<chXX-name>.md` block at end of `index.md`
4. Add `<Link to="chXX" class="chapter-card">` card to `index.md`'s `.chapter-grid`
5. Run `pnpm dev` — no additional installs needed

## Chapters

### Basic

| Ch | File | Topic |
| -- | ---- | ----- |
| 1 | ch01-intro.md | Git 版本控制簡介 |
| 2 | ch02-basic.md | 開始使用 Git |
| 3 | ch03-branch.md | 使用分支 |
| 4 | ch04-github.md | 遠端共同協作 - 使用 GitHub |

### Advanced

| Ch | File | Topic |
| -- | ---- | ----- |
| 5 | ch05-tag.md | 標籤 |
| 6 | ch06-situations.md | 其它常見狀況題 |
| 7 | ch07-history.md | 修改歷史紀錄 |
| 8 | ch08-gitflow.md | 使用 Git Flow |

## Slidev Conventions

- Theme: `penguin` for all decks
- Color accent: `#d97706` (amber/orange)
- Per-slide layouts: `layout:` in slide front-matter (`section`, `two-cols`, `cover`, `default`)
- Progressive reveal: `v-click` / `v-clicks`
- Custom styles: inline in frontmatter `style:` block
- Tailwind utility classes work directly in slide markdown
