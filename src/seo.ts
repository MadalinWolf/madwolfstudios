import { DEV_LOG } from './data/devLog'
import { GAMES, getGame } from './data/games'
import { PROJECTS, getProject, type Project } from './data/projects'
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
      'Projects from Madwolf Studios: WOLFCANI, an OnFocus Workspace for students, MadScope, a released open-source responsive testing tool, and No Respawn in War, a game in development.',
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
      "Development journal from Madwolf Studios — what changed, what was learned and what's next on MadScope, WOLFCANI and No Respawn in War.",
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

type Thing = Record<string, unknown>

const ORG_ID = `${SITE_URL}/#organization`
const PERSON_ID = `${SITE_URL}/#madalin-dinu`
const SITE_ID = `${SITE_URL}/#website`

/** Studio identity — same node is referenced from every page's graph. */
function organization(): Thing {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.namePlain,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/favicon.svg`,
    founder: { '@id': PERSON_ID },
  }
}

function person(): Thing {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE.founder.name,
    sameAs: ['https://github.com/MadalinWolf'],
  }
}

/** WebSite node for the homepage (no SearchAction — the site has no search). */
function website(): Thing {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    name: SITE.namePlain,
    url: `${SITE_URL}/`,
    inLanguage: 'en',
    publisher: { '@id': ORG_ID },
  }
}

function breadcrumb(trail: { name: string; url: string }[]): Thing {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((step, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: step.name,
      item: step.url,
    })),
  }
}

/**
 * SoftwareApplication for a project that actually ships downloads, built from
 * the data in src/data/projects.ts (version, installers, screenshots) so it can
 * never drift from what the page says. Only emitted when the project has real
 * release artifacts — no schema for pages that have nothing concrete to describe.
 */
function softwareApplication(project: Project): Thing | null {
  const downloads = project.downloads ?? []
  if (downloads.length === 0 || !project.releaseVersion) return null
  const operatingSystem = [...new Set(downloads.map((d) => d.os))].join(', ')
  const data: Thing = {
    '@type': 'SoftwareApplication',
    '@id': `${canonicalUrl(`/projects/${project.slug}`)}#software`,
    name: project.name,
    description: project.seoDescription ?? project.tagline,
    url: canonicalUrl(`/projects/${project.slug}`),
    inLanguage: 'en',
    operatingSystem,
    softwareVersion: project.releaseVersion.replace(/^v/, ''),
    license: 'https://spdx.org/licenses/MIT.html',
    isAccessibleForFree: true,
    downloadUrl: downloads.map((d) => d.url),
    publisher: { '@id': ORG_ID },
  }
  if (project.hero?.src) data.screenshot = `${SITE_URL}${project.hero.src}`
  if (project.applicationCategory) data.applicationCategory = project.applicationCategory
  return data
}

/**
 * Structured data for a route — plain objects, serialised into
 * <script type="application/ld+json"> by buildHeadHtml (build time) and by
 * applyDocumentMeta (after client-side navigation). Every value comes from the
 * same data files that render the page, so the schema cannot claim anything
 * the visible page does not.
 */
export function structuredData(path: string): Thing[] {
  const project = path.startsWith('/projects/') ? getProject(path.slice('/projects/'.length)) : null
  const game = path.startsWith('/games/') ? getGame(path.slice('/games/'.length)) : null

  if (path === '/') {
    return [{ '@context': 'https://schema.org', '@graph': [organization(), person(), website()] }]
  }

  if (project) {
    const graph: Thing[] = [
      organization(),
      person(),
      breadcrumb([
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'Projects', url: canonicalUrl('/projects') },
        { name: project.name, url: canonicalUrl(path) },
      ]),
    ]
    const software = softwareApplication(project)
    if (software) graph.push(software)
    return [{ '@context': 'https://schema.org', '@graph': graph }]
  }

  if (game) {
    return [
      {
        '@context': 'https://schema.org',
        '@graph': [
          organization(),
          person(),
          breadcrumb([
            { name: 'Home', url: `${SITE_URL}/` },
            { name: 'Games', url: canonicalUrl('/games') },
            { name: game.name, url: canonicalUrl(path) },
          ]),
        ],
      },
    ]
  }

  return []
}

/** One JSON-LD script tag per graph — '<' escaped so JSON cannot end the tag early. */
function jsonLdScripts(path: string): string {
  return structuredData(path)
    .map(
      (data) =>
        `<script type="application/ld+json" data-seo-jsonld>${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`,
    )
    .join('\n    ')
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

  // JSON-LD for routes that have something concrete to describe (homepage
  // identity, released software, detail-page breadcrumbs). Routes without
  // accurate schema get none — never markup that overstates the page.
  const jsonLd = jsonLdScripts(meta.path)
  if (jsonLd) tags.push(jsonLd)

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

  // JSON-LD follows the current route too, so the live DOM never carries a
  // previous page's schema after an SPA navigation (crawlers get the
  // prerendered tags; this keeps client-rendered state truthful).
  document.head.querySelectorAll('script[type="application/ld+json"]').forEach((el) => el.remove())
  for (const data of structuredData(meta.path)) {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-seo-jsonld', '')
    script.textContent = JSON.stringify(data).replace(/</g, '\\u003c')
    document.head.appendChild(script)
  }
}
