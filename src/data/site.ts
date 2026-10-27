/* =========================================================
   SITE-WIDE INFORMATION
   Everything about the studio identity lives here.
   ========================================================= */

export const SITE = {
  name: 'MADWOLF STUDIOS',
  /** Sentence-case form used in <title>/meta tags (all-caps reads poorly in search results). */
  namePlain: 'Madwolf Studios',
  shortName: 'MADWOLF',
  monogram: 'MW',
  domain: 'https://madwolfstudios.com',
  tagline: 'Independent developer building apps, games and software from idea to reality.',
  description:
    'Madwolf Studios is an independent software and game studio. Current projects: CofreTabs (privacy-first tab-saving browser extension), WOLFCANI (OnFocus Workspace), MadScope (open-source responsive testing) and No Respawn in War.',
  founder: {
    name: 'Madalin Dinu',
    role: 'FOUNDER / DEVELOPER',
  },
  /**
   * Webmaster-tool verification codes — emitted as <meta> tags in the head of
   * every prerendered page (src/seo.ts). A null slot emits nothing.
   * Where to get each code:
   *   google:  Search Console → Settings → Verification method → "HTML tag"
   *   bing:    Bing Webmaster Tools → Settings → Site verification (msvalidate.01)
   *   yandex:  Yandex Webmaster → Properties → Meta tag
   *   brave:   Brave Search Webmasters → Settings → Site verification
   * (DuckDuckGo and Yahoo have no separate tools — they follow Bing.)
   */
  verification: {
    google: null as string | null,
    bing: null as string | null,
    yandex: null as string | null,
    brave: null as string | null,
  },
} as const

export interface NavItem {
  label: string
  path: string
}

/** Main navigation — edit here to add or rename a section. */
export const NAV_ITEMS: NavItem[] = [
  { label: 'HOME', path: '/' },
  { label: 'PROJECTS', path: '/projects' },
  { label: 'GAMES', path: '/games' },
  { label: 'ABOUT', path: '/about' },
  { label: 'DEV LOG', path: '/dev-log' },
  { label: 'CONTACT', path: '/contact' },
]
