import type { LinkId } from './links'
import type { DevelopmentStatus } from './status'
import type { MediaSlot } from './projects'

/* =========================================================
   GAMES  —  add a new game by adding an object to the
   GAMES array. The /games page and the /games/:slug route
   pick it up automatically.

   Any field set to null renders as a clearly marked
   placeholder — fill it in when you have the information.
   ========================================================= */

export interface GameInfoRow {
  label: string
  /** null → "[ TO BE PROVIDED ]" placeholder */
  value: string | null
}

export interface Game {
  slug: string
  name: string
  status: DevelopmentStatus
  featured: boolean
  tagline: string
  /** Optional search-title override (otherwise the game name is used). */
  seoTitle?: string
  /** Optional meta description (1–2 plain sentences, factual only). */
  seoDescription?: string
  /** null → placeholder panel */
  concept: string | null
  /** null → placeholder panel */
  gameplay: string | null
  info: GameInfoRow[]
  screenshots: MediaSlot[]
  artwork: MediaSlot | null
  /** null / url null → placeholder frame marked SOON */
  trailer: { url: string | null } | null
  /** Ids from src/data/links.ts shown as buttons (null urls → "— SOON"). */
  links: LinkId[]
}

export const GAMES: Game[] = [
  {
    slug: 'no-respawn-in-war',
    name: 'No Respawn in War',
    status: 'in-development',
    featured: true,
    tagline: 'Game currently in development.',
    seoTitle: 'No Respawn in War — Game in Development',
    seoDescription:
      'No Respawn in War is a game currently in development at Madwolf Studios. Concept, gameplay, platforms, screenshots and release details will be published here as they are announced.',
    concept: null,
    gameplay: null,
    info: [
      { label: 'GENRE', value: null },
      { label: 'MODE', value: null }, // single-player / multiplayer
      { label: 'ENGINE', value: null },
      { label: 'PLATFORMS', value: null },
      { label: 'STAGE', value: null }, // current development stage
    ],
    screenshots: [
      { alt: 'No Respawn in War screenshot — to be provided', caption: 'SCREENSHOT' },
      { alt: 'No Respawn in War screenshot — to be provided', caption: 'SCREENSHOT' },
    ],
    artwork: { alt: 'No Respawn in War key artwork — to be provided', caption: 'KEY ARTWORK' },
    trailer: { url: null },
    links: ['steam', 'itch', 'discord'],
  },
]

export function getGame(slug: string): Game | undefined {
  return GAMES.find((g) => g.slug === slug)
}

export function getFeaturedGames(): Game[] {
  return GAMES.filter((g) => g.featured)
}
