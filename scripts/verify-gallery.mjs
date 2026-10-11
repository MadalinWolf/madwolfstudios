/**
 * verify-gallery — cross-checks the screenshot gallery data against the
 * capture manifest and the files on disk:
 *   1. every gallery slide file exists in public/
 *   2. every slide has alt text, a title and an explanation
 *   3. the preview group's slides and titles exactly match the rows in
 *      public/screenshots/preview-0141abc/MANIFEST.md
 *   4. version labels: preview slides only in the preview group, release
 *      slides only in the release group (no cross-build mixing)
 *   5. the in-image version badge label matches the preview group label
 *
 * Usage: node scripts/verify-gallery.mjs   (exit 1 on any failure)
 */
import { readFileSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dataSrc = readFileSync(resolve(root, 'src/data/madscopeGallery.ts'), 'utf8')
const manifestPath = resolve(
  root,
  'public/screenshots/preview-0141abc/MANIFEST.md',
)

const errors = []

// ---- parse groups (indentation-based: slides live under versionLabel) ----
const groups = []
for (const block of dataSrc.split(/^  \{$/m).slice(1)) {
  const id = block.match(/^\s+id: '([^']+)'/m)?.[1]
  const versionLabel = block.match(/^\s+versionLabel: '([^']+)'/m)?.[1]
  if (!id || !versionLabel) continue
  const slides = []
  const slideRe = /\{\s*src: '([^']+)',\s*title: '([^']*(?:\\'[^']*)*)',\s*text: '([^']+)',\s*alt: '([^']+)',\s*\}/g
  let m
  while ((m = slideRe.exec(block)) !== null) {
    slides.push({ src: m[1], title: m[2], text: m[3], alt: m[4] })
  }
  groups.push({ id, versionLabel, slides })
}

if (groups.length !== 2) errors.push(`expected 2 groups, parsed ${groups.length}`)

const preview = groups.find((g) => g.id === 'preview-0141abc')
const release = groups.find((g) => g.id === 'release-v1.1.0')
if (!preview) errors.push('preview-0141abc group missing')
if (!release) errors.push('release-v1.1.0 group missing')

for (const g of groups) {
  if (g.slides.length === 0) errors.push(`${g.id}: no slides parsed`)
  for (const s of g.slides) {
    const diskPath = resolve(root, 'public', s.src.replace(/^\//, ''))
    if (!existsSync(diskPath))
      errors.push(`${g.id}: missing file ${s.src}`)
    if (!s.alt || s.alt.length < 20)
      errors.push(`${g.id}: weak alt text for ${s.src}`)
    if (!s.title) errors.push(`${g.id}: missing title for ${s.src}`)
    if (!s.text) errors.push(`${g.id}: missing explanation for ${s.src}`)
    if (s.src.startsWith('/screenshots/preview-') && g.id !== 'preview-0141abc')
      errors.push(`${g.id}: preview image in wrong group: ${s.src}`)
    if (
      g.id === 'release-v1.1.0' &&
      s.src.startsWith('/screenshots/preview-')
    )
      errors.push(`release group contains preview image: ${s.src}`)
  }
}

// ---- manifest cross-check ----
if (!existsSync(manifestPath)) {
  errors.push('MANIFEST.md missing')
} else {
  const manifest = readFileSync(manifestPath, 'utf8')
  const manifestLabel = manifest.match(/preview build · commit [0-9a-f]{7}/i)?.[0]
  if (!manifestLabel || manifestLabel.toLowerCase() !== preview.versionLabel.toLowerCase())
    errors.push(
      `manifest label "${manifestLabel}" != gallery label "${preview.versionLabel}"`,
    )
  const rows = [...manifest.matchAll(/^\| `([^`]+\.png)` \| ([^|]+) \|/gm)].map(
    (r) => ({ file: r[1].trim(), title: r[2].trim() }),
  )
  const previewFiles = preview.slides.map((s) => s.src.split('/').pop())
  const manifestFiles = rows.map((r) => r.file)
  for (const f of manifestFiles)
    if (!previewFiles.includes(f)) errors.push(`manifest file not in gallery: ${f}`)
  for (const f of previewFiles)
    if (!manifestFiles.includes(f)) errors.push(`gallery file not in manifest: ${f}`)
  for (const row of rows) {
    const slide = preview.slides.find((s) => s.src.endsWith(row.file))
    if (slide && slide.title !== row.title)
      errors.push(
        `title mismatch for ${row.file}: gallery "${slide.title}" vs manifest "${row.title}"`,
      )
  }
  // in-image badge label consistency
  const badge = manifest.match(/PREVIEW BUILD · ([0-9a-f]{7})/)?.[0]
  if (badge !== `PREVIEW BUILD · ${preview.versionLabel.split(' ').pop()}`)
    errors.push(`badge "${badge}" does not match gallery label`)
}

if (errors.length) {
  console.error('verify-gallery FAILED:')
  for (const e of errors) console.error(' -', e)
  process.exit(1)
}
console.log(
  `verify-gallery OK: ${groups.length} groups, ${groups.reduce((n, g) => n + g.slides.length, 0)} slides, manifest in sync`,
)
