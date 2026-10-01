import { DEV_LOG } from './data/devLog'
import { GAMES, getGame } from './data/games'
import { PROJECTS, getProject } from './data/projects'
import { SITE } from './data/site'

/* =========================================================
   ROUTE METADATA  —  the single source of truth for SEO.
   ---------------------------------------------------------
   Used in two places:
     - src/entry-server.tsx → static <head> tags written into
       every prerendered HTML file at build time (what
       crawlers and social scrapers read)
     - src/App.tsx → keeps those tags in sync after
       client-side navigation
   Add a route by extending PRERENDER_PATHS / the data files;
   titles and descriptions live next to their data.
   ========================================================= */

export interface RouteMeta {
  /** Router path (no trailing slash, '/' for home). */
  path: string
  /** Full <title> text. */
  title: string
  description: string
  /** 'noindex' → keeps unfinished pages out of search results. */
  robots: 'index' | 'noindex'
}

const NAME = SITE.namePlain

/**
 * TODO(madalin): social preview image.
 * When a real 1200×630 share image exists (studio card or artwork — no fake
 * screenshots), drop a PNG in /public and set OG_IMAGE = '/og-image.png'.
 * og:image + twitter:image are generated automatically from this value.
 */
export const OG_IMAGE: string | null = null

/** Canonical site origin (no trailing slash). */
export const SITE_URL = SITE.domain

/**
 * Canonical URL for a route.
 * Netlify (Pretty URLs, on by default) serves folder routes as /path/,
 * so canonical URLs carry the trailing slash. The router tolerates both.
 */
export function canonicalUrl(path: string): string {
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}/`
}

const NOT_FOUND: RouteMeta = {
  path: '/',
  title: `Page Not Found — ${NAME}`,
  description: 'The route you requested does not exist or has been moved.',
  robots: 'noindex',
}

/** Static section routes. Detail routes (/projects/:slug, /games/:slug) derive from data. */
const SECTION_META: RouteMeta[] = [
  {
    path: '/',
    title: `${NAME} — Independent Software & Game Studio`,
    description: SITE.description,
    robots: 'index',
  },
  {
    path: '/projects',
    title: `Projects — ${NAME}`,
    description:
      'Projects from Madwolf Studios: WOLFCANI, an OnFocus Workspace for students, and No Respawn in War, a game — both currently in development.',
    robots: 'index',
  },
  {
    path: '/games',
    title: `Games — ${NAME}`,
    description:
      'Games by Madwolf Studios. In development: No Respawn in War — concept, screenshots and links will be published as they are announced.',
    robots: 'index',
  },
  {
    path: '/about',
    title: `About — ${NAME}`,
    description:
      'Madwolf Studios is a one-person studio run by Madalin Dinu, building apps, games and software from idea to reality.',
    robots: 'index',
  },
  {
    path: '/dev-log',
    title: `Dev Log — ${NAME}`,
    description:
      "Development journal from Madwolf Studios — what changed, what was learned and what's next on WOLFCANI and No Respawn in War.",
    // No entries published yet → keep the empty page out of search results.
    // Flips back to 'index' automatically on the next build after the first
    // entry is added to src/data/devLog.ts.
    robots: DEV_LOG.length > 0 ? 'index' : 'noindex',
  },
  {
    path: '/contact',
    title: `Contact — ${NAME}`,
    description:
      'Ways to reach Madwolf Studios. More channels open as the studio grows.',
    robots: 'index',
  },
]

/**
 * Every route rendered to static HTML at build time.
 * Derived from the data files so a new project/game is picked up automatically.
 */
export const PRERENDER_PATHS: string[] = [
  '/',
  '/projects',
  ...PROJECTS.map((p) => `/projects/${p.slug}`),
  '/games',
  ...GAMES.map((g) => `/games/${g.slug}`),
  '/about',
  '/dev-log',
  '/contact',
]

interface DetailEntry {
  slug: string
  name: string
  tagline: string
  seoTitle?: string
  seoDescription?: string
}

function detailMeta(kind: 'project' | 'game', entry: DetailEntry): RouteMeta {
  const base = entry.seoTitle ?? entry.name
  const title = base.includes(NAME) ? base : `${base} | ${NAME}`
  const description =
    entry.seoDescription ?? `${entry.name} — ${entry.tagline} Currently in development at ${NAME}.`
  return { path: `/${kind}s/${entry.slug}`, title, description, robots: 'index' }
}

/** Metadata for any path — exact routes, data-driven detail routes, or 404. */
export function getRouteMeta(path: string): RouteMeta {
  const exact = SECTION_META.find((r) => r.path === path)
  if (exact) return exact

  const projectSlug = path.startsWith('/projects/')
    ? path.slice('/projects/'.length)
    : null
  if (projectSlug !== null) {
    const project = getProject(projectSlug)
    if (!project) return NOT_FOUND
    return detailMeta('project', project)
  }

  const gameSlug = path.startsWith('/games/') ? path.slice('/games/'.length) : null
  if (gameSlug !== null) {
    const game = getGame(gameSlug)
    if (!game) return NOT_FOUND
    return detailMeta('game', game)
  }

  return NOT_FOUND
}

/* ---------------------------------------------------------
   Head tag generation (build time)
   --------------------------------------------------------- */

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function metaTag(name: string, content: string): string {
  return `<meta name="${name}" content="${escapeAttr(content)}" />`
}

function ogTag(property: string, content: string): string {
  return `<meta property="${property}" content="${escapeAttr(content)}" />`
}

/** Organization + Person structured data for the homepage (verified facts only). */
function homeJsonLd(): string {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE.namePlain,
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/favicon.svg`,
        founder: { '@id': `${SITE_URL}/#madalin-dinu` },
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#madalin-dinu`,
        name: SITE.founder.name,
        sameAs: ['https://github.com/MadalinWolf'],
      },
    ],
  }
  // '<' escaped so the JSON can never terminate the script block early.
  return `<script type="application/ld+json">${JSON.stringify(graph).replace(/</g, '\\u003c')}</script>`
}

/** Full static <head> block for a prerendered page. */
export function buildHeadHtml(path: string): string {
  const meta = getRouteMeta(path)
  const url = canonicalUrl(meta.path)
  const tags: string[] = [
    `<title>${escapeAttr(meta.title)}</title>`,
    metaTag('description', meta.description),
    metaTag('robots', meta.robots === 'noindex' ? 'noindex' : 'index, follow'),
  ]

  if (meta.robots === 'index') {
    tags.push(`<link rel="canonical" href="${escapeAttr(url)}" />`)
  }

  tags.push(
    ogTag('og:type', 'website'),
    ogTag('og:site_name', SITE.namePlain),
    ogTag('og:title', meta.title),
    ogTag('og:description', meta.description),
    ogTag('og:url', url),
    ogTag('og:locale', 'en_US'),
    metaTag('twitter:card', OG_IMAGE ? 'summary_large_image' : 'summary'),
    metaTag('twitter:title', meta.title),
    metaTag('twitter:description', meta.description),
  )
  if (OG_IMAGE) {
    tags.push(ogTag('og:image', `${SITE_URL}${OG_IMAGE}`), metaTag('twitter:image', `${SITE_URL}${OG_IMAGE}`))
  }

  if (meta.path === '/') tags.push(homeJsonLd())

  return tags.join('\n    ')
}

/* ---------------------------------------------------------
   Sitemap (build time)
   --------------------------------------------------------- */

/** sitemap.xml covering every indexable prerendered route. */
export function buildSitemapXml(): string {
  const urls = PRERENDER_PATHS.filter(
    (path) => getRouteMeta(path).robots === 'index',
  )
    .map((path) => `  <url><loc>${escapeAttr(canonicalUrl(path))}</loc></url>`)
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

/* ---------------------------------------------------------
   Client-side sync (after SPA navigation)
   --------------------------------------------------------- */

function upsertMeta(attr: 'name' | 'property', key: string, content: string): void {
  const selector = `meta[${attr}="${key}"]`
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * Keeps document metadata in sync after client-side navigation.
 * Crawlers read the static prerendered tags; this keeps the live DOM
 * accurate for the current page.
 */
export function applyDocumentMeta(meta: RouteMeta): void {
  if (typeof document === 'undefined') return
  const url = canonicalUrl(meta.path)

  document.title = meta.title
  upsertMeta('name', 'description', meta.description)
  upsertMeta('name', 'robots', meta.robots === 'noindex' ? 'noindex' : 'index, follow')

  // Canonical only for indexable pages — removed when navigating to a noindex page.
  const canonicalSelector = 'link[rel="canonical"]'
  const existingCanonical = document.head.querySelector<HTMLLinkElement>(canonicalSelector)
  if (meta.robots === 'index') {
    let canonical = existingCanonical
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
  } else {
    existingCanonical?.remove()
  }

  upsertMeta('property', 'og:type', 'website')
  upsertMeta('property', 'og:site_name', SITE.namePlain)
  upsertMeta('property', 'og:title', meta.title)
  upsertMeta('property', 'og:description', meta.description)
  upsertMeta('property', 'og:url', url)
  upsertMeta('property', 'og:locale', 'en_US')
  upsertMeta('name', 'twitter:card', OG_IMAGE ? 'summary_large_image' : 'summary')
  upsertMeta('name', 'twitter:title', meta.title)
  upsertMeta('name', 'twitter:description', meta.description)
}
