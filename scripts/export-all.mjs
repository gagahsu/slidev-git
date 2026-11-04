// Export each chapter to its own PDF: pnpm export:all [prefix]
// Default prefix is "b0" (beginner course); use "ch" for the advanced chapters or "b03" for one chapter.
import { execSync } from 'node:child_process'
import { mkdirSync, readdirSync } from 'node:fs'
import { basename, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const prefix = process.argv[2] ?? 'b0'
const sha = execSync('git rev-parse --short HEAD', { cwd: root, encoding: 'utf8' }).trim()
const outDir = join(root, `pdf-release-${sha}`)

const chapters = readdirSync(root)
  .filter(f => /^(b|ch)\d+.*\.md$/.test(f) && f.startsWith(prefix))
  .sort()

if (chapters.length === 0) {
  console.error(`No chapters match prefix "${prefix}"`)
  process.exit(1)
}

mkdirSync(outDir, { recursive: true })
console.log(`Exporting ${chapters.length} chapters to ${outDir}\n`)

const failed = []
for (const file of chapters) {
  const output = join(outDir, `${basename(file, '.md')}.pdf`)
  try {
    // --per-slide: printing all slides at once lets one over-wide element shrink
    // the whole deck, which leaves black margins and drops slides.
    execSync(`pnpm exec slidev export "${file}" --per-slide --wait 2000 --timeout 60000 --output "${output}"`, {
      cwd: root,
      stdio: 'inherit',
      env: { ...process.env, SLIDEV_EXPORT: '1' },
    })
  } catch (err) {
    console.error(`Failed: ${file}\n${err.message}`)
    failed.push(file)
  }
}

if (failed.length > 0) {
  console.error(`\nFailed chapters: ${failed.join(', ')}`)
  process.exit(1)
}
