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
    'Madwolf Studios is an independent software and game studio. Current projects: Stusys (student productivity / Student OS) and No Respawn in War.',
  founder: {
    name: 'Madalin Dinu',
    role: 'FOUNDER / DEVELOPER',
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
