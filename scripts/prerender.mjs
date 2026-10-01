/**
 * Build-time prerenderer.
 *
 * Runs after `vite build` and turns the single empty-shell dist/index.html
 * into a real HTML file for every route in src/seo.ts:
 *
 *   dist/index.html                    → /
 *   dist/projects/index.html           → /projects
 *   dist/projects/wolfcani/index.html  → /projects/wolfcani
 *   ...
 *   dist/404.html                      → unknown paths (Netlify serves it with HTTP 404)
 *   dist/sitemap.xml                   → indexable routes only
 *
 * Each file carries its own <title>, meta description, canonical, Open Graph
 * tags and (on the homepage) Organization + Person JSON-LD — all generated
 * from the single source in src/seo.ts. Crawlers and social scrapers get
 * meaningful HTML without running JavaScript.
 *
 * The React code is executed through Vite's SSR module loader — no extra
 * dependencies, no framework migration.
 */
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { createServer } from 'vite'

const ROOT = process.cwd()
const DIST = path.join(ROOT, 'dist')
const HEAD_RE = /<!--seo-head-start-->[\s\S]*?<!--seo-head-end-->/
const ROOT_DIV = '<div id="root"></div>'

const vite = await createServer({
  root: ROOT,
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'warn',
})

try {
  const { render, PRERENDER_PATHS, buildSitemapXml } = await vite.ssrLoadModule(
    '/src/entry-server.tsx',
  )

  const template = await readFile(path.join(DIST, 'index.html'), 'utf8')
  if (!HEAD_RE.test(template)) {
    throw new Error('seo-head markers not found in dist/index.html')
  }
  if (!template.includes(ROOT_DIV)) {
    throw new Error('prerender root div not found in dist/index.html')
  }

  // Preload the primary (latin) font file. Its name is only known after the
  // build because Vite content-hashes assets, so the link is injected here.
  let fontPreload = ''
  const assets = await readdir(path.join(DIST, 'assets')).catch(() => [])
  const latinFont = assets.find(
    (file) => file.includes('-latin-wght-') && file.endsWith('.woff2') && !file.includes('italic'),
  )
  if (latinFont) {
    fontPreload = `<link rel="preload" href="/assets/${latinFont}" as="font" type="font/woff2" crossorigin />\n    `
  } else {
    console.warn('prerender: latin font file not found — skipping preload')
  }

  /** Render one route into the built template. */
  const buildPage = (url, { notFound = false } = {}) => {
    const { html, head } = render(url)
    if (!html.includes('<h1')) {
      throw new Error(`prerendered page for "${url}" has no <h1>`)
    }
    const page = template
      .replace(HEAD_RE, `${fontPreload}${head}`)
      .replace(ROOT_DIV, `<div id="root"${notFound ? ' data-prerender="404"' : ''}>${html}</div>`)
    if (page === template) throw new Error(`nothing was injected for "${url}"`)
    return page
  }

  for (const url of PRERENDER_PATHS) {
    const outPath =
      url === '/'
        ? path.join(DIST, 'index.html')
        : path.join(DIST, ...url.slice(1).split('/'), 'index.html')
    await mkdir(path.dirname(outPath), { recursive: true })
    await writeFile(outPath, buildPage(url), 'utf8')
    console.log(`prerender: ${url}`)
  }

  // Real 404 page — Netlify serves dist/404.html with HTTP 404 automatically.
  await writeFile(path.join(DIST, '404.html'), buildPage('/404-page-not-found', { notFound: true }), 'utf8')
  console.log('prerender: /404.html')

  await writeFile(path.join(DIST, 'sitemap.xml'), buildSitemapXml(), 'utf8')
  console.log('prerender: sitemap.xml')
} finally {
  await vite.close()
}
