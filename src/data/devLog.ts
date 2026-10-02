/* =========================================================
   DEV LOG  —  the development journal
   ---------------------------------------------------------
   To publish an update, copy the TEMPLATE below, paste it
   into the DEV_LOG array and fill in your real information.
   Nothing else needs to be edited — the /dev-log page, the
   home page "Latest Dev Log" section and the "Development
   updates" blocks on project/game pages all read from here.
   Entries are sorted by date automatically (newest first).

   TEMPLATE ------------------------------------------------
   {
     id: 'wolfcani-v0-2-5-calendar',  // unique, url-safe
     date: '2026-01-31',             // YYYY-MM-DD
     project: 'WOLFCANI',            // project chip label
     projectSlug: 'wolfcani',        // optional: links the chip
                                     // to /projects/wolfcani
     version: 'v0.2.5',              // optional
     title: 'Calendar System',
     summary: 'One-line summary of the update.',
     details: [
       'Added the new calendar system',
       'Added event creation',
       'Improved navigation',
       'Next: continue improving the student workflow',
     ],
     images: [                        // optional
       { src: '/dev-log/calendar.png', alt: 'Calendar UI', caption: 'New calendar' },
     ],
     links: [                         // optional
       { label: 'READ MORE', url: 'https://…' },
     ],
   },
   ---------------------------------------------------------
   Example entries live in the comment above — do not publish
   examples as if they were real updates.
   ========================================================= */

export interface DevLogImage {
  /** Path to a real image. Omit to render a clearly marked placeholder
   *  frame (no fake screenshots, ever). */
  src?: string
  alt: string
  caption?: string
}

export interface DevLogLink {
  label: string
  url: string
}

export interface DevLogEntry {
  id: string
  date: string
  project: string
  projectSlug?: string
  version?: string
  title: string
  summary: string
  details: string[]
  images?: DevLogImage[]
  links?: DevLogLink[]
}

/** Published entries, newest first. Add yours here. */
export const DEV_LOG: DevLogEntry[] = [
  {
    id: 'wolfcani-dashboard-calendar-reminders',
    date: '2026-10-01',
    project: 'WOLFCANI',
    projectSlug: 'wolfcani',
    version: 'v2.1',
    title: 'Dashboard, calendar navigation and advance reminders',
    summary:
      'WOLFCANI gained a dashboard overview, a calendar that reaches beyond the current month and reminders that fire ahead of an event.',
    details: [
      'Calendar navigation now steps month by month or year by year, with direct jumps to any month and a one-click return to today',
      'Events can repeat every number of days, weeks or months and carry an optional start time',
      'Reminders are set per event — minutes, hours, days or weeks in advance, with the exact fire date and time previewed before saving',
      'Upcoming events surface as in-app reminder toasts; browser notifications stay behind an explicit permission button',
      'The Pomodoro timer moved onto the dashboard and keeps running while you switch sections or reload the page',
      'Added a clock widget with digital and analog modes plus accent, glow and size settings',
      'The Focus screen was removed from the navigation — its timer and settings now live on the dashboard',
    ],
    images: [
      {
        src: '/screenshots/wolfcani-dashboard.png',
        alt: "WOLFCANI dashboard — live clock, focus timer, today's tasks and the month calendar",
        caption: 'DASHBOARD',
      },
    ],
  },
  {
    id: 'site-production-readiness',
    date: '2026-10-01',
    project: 'WEBSITE',
    title: 'Search, performance & production readiness',
    summary:
      'A technical pass across metadata, page delivery, loading behaviour and production configuration.',
    details: [
      'Every page now ships its own title, description and social sharing tags',
      'Pages render to static HTML at build time — crawlers and link previews receive full content without JavaScript, backed by a sitemap and canonical URLs',
      'Unknown URLs now return a real 404 instead of a placeholder page',
      'The typeface loads from our own domain — one less third-party request on every page',
      'Production configuration strengthened: security headers and long-lived caching for static assets',
      'Project pages gained a quick-answers section with factual summaries (starting with WOLFCANI)',
      'Launched this development log — future WOLFCANI and No Respawn in War updates land here',
    ],
  },
  // …next real update goes here (sorted by date automatically).
]

/** Latest entries first (optionally limited). */
export function getLatestEntries(limit?: number): DevLogEntry[] {
  const sorted = [...DEV_LOG].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
  return limit ? sorted.slice(0, limit) : sorted
}

/** Entries belonging to a project/game slug, newest first. */
export function getEntriesForProject(projectSlug: string): DevLogEntry[] {
  return getLatestEntries().filter((entry) => entry.projectSlug === projectSlug)
}
