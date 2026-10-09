/* =========================================================
   EXTERNAL / PLATFORM LINKS  —  EDIT THIS FILE ONLY
   ---------------------------------------------------------
   Set `url` to the real destination and the link goes live
   everywhere on the site at once (navbar, footer, contact
   page, project/game pages).

   Keep `url: null` and every component renders the link as
   "<LABEL> — SOON" (clearly marked, not clickable).

   Examples:
     email:   { label: 'EMAIL', url: 'mailto:you@madwolfstudios.com' },
     steam:   { label: 'STEAM', url: 'https://steamprofiles.com/...' },
     discord: { label: 'DISCORD', url: 'https://discord.gg/...' },
     itch:    { label: 'ITCH.IO', url: 'https://madwolfstudios.itch.io/...' },
   ========================================================= */

export interface ExternalLink {
  label: string
  /** null → the UI shows "<LABEL> — SOON" */
  url: string | null
}

export const LINKS = {
  github: { label: 'GITHUB', url: 'https://github.com/MadalinWolf' },
  // Real GitHub Sponsors profile — used by the "Feed the Cat" section only
  // (deliberately not in CONTACT_LINK_IDS / FOOTER_LINK_IDS).
  sponsors: { label: 'SPONSORS', url: 'https://github.com/sponsors/MadalinWolf' },
  email: { label: 'EMAIL', url: null }, // ← put your real address here (mailto:...)
  steam: { label: 'STEAM', url: null }, // ← SOON
  discord: { label: 'DISCORD', url: null }, // ← SOON
  itch: { label: 'ITCH.IO', url: null }, // ← SOON
  x: { label: 'X / TWITTER', url: null }, // ← SOON
  youtube: { label: 'YOUTUBE', url: null }, // ← SOON
} satisfies Record<string, ExternalLink>

export type LinkId = keyof typeof LINKS

/** Contact page rows, in order. */
export const CONTACT_LINK_IDS: LinkId[] = [
  'email',
  'github',
  'discord',
  'steam',
  'itch',
  'x',
  'youtube',
]

/** Footer platform links, in order. */
export const FOOTER_LINK_IDS: LinkId[] = ['steam', 'discord', 'itch']
