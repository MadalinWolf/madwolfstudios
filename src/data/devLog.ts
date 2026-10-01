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
     id: 'stusys-v0-2-5-calendar',   // unique, url-safe
     date: '2026-01-31',             // YYYY-MM-DD
     project: 'STUSYS',              // project chip label
     projectSlug: 'stusys',          // optional: links the chip
                                      // to /projects/stusys
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
  src: string
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
  // ← no entries published yet. Paste your first real update here
  //   (template in the file header above).
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
