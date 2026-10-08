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

// Deployment base path — must match the VITE_BASE value used for `vite build`
// (see vite.config.ts). '/' on a domain root, '/madwolfstudios/' on the
// temporary GitHub Pages project URL.
const BASE = `/${(process.env.VITE_BASE || '/').replace(/^\/+|\/+$/g, '')}/`.replace(/\/\/+$/, '/')

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
  // Vite rewrites the entry script with the configured base path — if the two
  // halves of the build ran with different VITE_BASE values, stop here instead
  // of publishing a site whose assets do not resolve.
  if (!template.includes(`src="${BASE}assets/`)) {
    throw new Error(
      `base mismatch: dist/index.html has no entry script under "${BASE}assets/" — ` +
        'VITE_BASE must be identical for "vite build" and this script',
    )
  }

  // Preload the primary (latin) font file. Its name is only known after the
  // build because Vite content-hashes assets, so the link is injected here.
  let fontPreload = ''
  const assets = await readdir(path.join(DIST, 'assets')).catch(() => [])
  const latinFont = assets.find(
    (file) => file.includes('-latin-wght-') && file.endsWith('.woff2') && !file.includes('italic'),
  )
  if (latinFont) {
    fontPreload = `<link rel="preload" href="${BASE}assets/${latinFont}" as="font" type="font/woff2" crossorigin />\n    `
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

  // --- Legacy redirects ----------------------------------------------------
  // netlify.toml answers these with HTTP 301; GitHub Pages has no redirect
  // configuration, so they ship as tiny static pages that bounce the browser
  // (meta refresh covers crawlers/no-JS, location.replace covers everyone
  // else). Keep the list in sync with netlify.toml [[redirects]].
  const { canonicalUrl } = await vite.ssrLoadModule('/src/seo.ts')
  const REDIRECTS = [{ from: '/projects/stusys', to: '/projects/wolfcani' }]

  for (const { from, to } of REDIRECTS) {
    const target = `${BASE}${to.replace(/^\/+/, '')}/`
    const canonical = canonicalUrl(to)
    const outPath = path.join(DIST, ...from.slice(1).split('/'), 'index.html')
    const stub = [
      '<!DOCTYPE html>',
      '<html lang="en">',
      '  <head>',
      '    <meta charset="UTF-8" />',
      '    <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
      '    <title>Redirecting…</title>',
      '    <meta name="robots" content="noindex" />',
      `    <link rel="canonical" href="${canonical}" />`,
      `    <meta http-equiv="refresh" content="0; url=${target}" />`,
      '  </head>',
      '  <body>',
      `    <p>This page has moved to <a href="${target}">${canonical}</a>.</p>`,
      `    <script>location.replace(${JSON.stringify(target)})</script>`,
      '  </body>',
      '</html>',
      '',
    ].join('\n')
    await mkdir(path.dirname(outPath), { recursive: true })
    await writeFile(outPath, stub, 'utf8')
    console.log(`prerender: ${from} → ${to}`)
  }

  // Tell GitHub Pages to serve the artifact as plain static files (belt and
  // braces — Actions deployments are already static, Jekyll never runs).
  await writeFile(path.join(DIST, '.nojekyll'), '', 'utf8')
} finally {
  await vite.close()
}
