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
    id: 'cofretabs-website-launch',
    date: '2026-10-26',
    project: 'COFRETABS',
    projectSlug: 'cofretabs',
    version: 'v1.1.0',
    title: 'CofreTabs lands on madwolfstudios.com',
    summary:
      'The studio’s tab-saving browser extension now has a full product page, a homepage launch section and a verified download that points straight at the v1.1.0 release.',
    details: [
      'Added a dedicated CofreTabs product page at /projects/cofretabs — overview, 17 features, gallery, FAQs, technology and roadmap, all driven by the site’s shared PROJECTS data like every other project',
      'The homepage opens with a “New Release — CofreTabs v1.1.0” section: what the extension does, where your data lives, and links to the product page and the GitHub release',
      'The download block offers Windows, macOS and Linux groups that all serve the same verified asset — one ZIP packaged as CofreTabs-v1.1.0.zip (SHA-256 2599b341…10a365, matching the local build byte for byte) — because a single archive installs in any Chromium browser',
      'Store status is stated honestly: CofreTabs is not on the Chrome Web Store yet — the listing in the repository’s store docs is a draft, not a published one — so the GitHub release is currently the only official download',
      'Every gallery frame is a genuine capture: three v1.0.0 screenshots from the repository plus nine v1.1.0 captures taken through the project’s own documented harness (real panel/library code over a demo vault), recorded in public/screenshots/cofretabs-MANIFEST.md',
      'This dev log gains three evidence-based CofreTabs entries dated from the actual git history (2026-10-23 → 2026-10-26) — the repository’s public history begins with the v1.0.0 release candidate',
    ],
    images: [
      {
        src: '/screenshots/cofretabs-panel-v110.png',
        alt: 'CofreTabs save panel on the v1.1.0 build — tab ready to save with the 3×3 folder grid beneath it',
        caption: 'COFRETABS v1.1.0 — SAVE PANEL',
      },
    ],
    links: [
      { label: 'GITHUB REPO', url: 'https://github.com/MadalinWolf/CofreTabs' },
      { label: 'RELEASE v1.1.0', url: 'https://github.com/MadalinWolf/CofreTabs/releases/tag/v1.1.0' },
    ],
  },
  {
    id: 'cofretabs-v1-1-0-favorites-folders-themes',
    date: '2026-10-25',
    project: 'COFRETABS',
    projectSlug: 'cofretabs',
    version: 'v1.1.0',
    title: 'Favorites, custom folders, a folder grid and themes',
    summary:
      'CofreTabs v1.1.0 turns the library into a real organiser — favorites, custom folders, light and dark themes, an update notice and 98 passing tests.',
    details: [
      'Shipped favorites (heart any saved tab in the library or the panel without moving it), custom folders you can create, rename and move tabs into, and a 3×3 folder grid in the panel',
      'Added light and dark themes with a switch in the library sidebar, persisted across launches and defaulting to the system preference',
      'Deleting a folder now moves its saved tabs to Trash instead of destroying them; Favorites can’t be deleted',
      'Added an update notice that checks the GitHub releases feed at most once every 12 hours — no vault data ever leaves the browser',
      'Full suite: 98/98 tests pass under node:test; tagged v1.1.0 and published as a GitHub Release with the packaged extension ZIP',
    ],
    images: [
      {
        src: '/screenshots/cofretabs-library-v110.png',
        alt: 'CofreTabs library on the v1.1.0 build — saved tabs, folders and the sidebar with favorites and trash',
        caption: 'COFRETABS v1.1.0 — LIBRARY',
      },
    ],
    links: [
      { label: 'RELEASE v1.1.0', url: 'https://github.com/MadalinWolf/CofreTabs/releases/tag/v1.1.0' },
      { label: 'GITHUB REPO', url: 'https://github.com/MadalinWolf/CofreTabs' },
    ],
  },
  {
    id: 'cofretabs-v1-0-0-first-public-build',
    date: '2026-10-23',
    project: 'COFRETABS',
    projectSlug: 'cofretabs',
    version: 'v1.0.0',
    title: 'First public build of the tab-saving extension',
    summary:
      'CofreTabs’ public history starts here: the initial v1.0.0 release candidate — explicit, review-first saving into a local IndexedDB vault, with search, trash and backups.',
    details: [
      'Initial CofreTabs v1.0.0 release candidate — Manifest V3 extension with the sliding save panel, the library, automatic folders from the real domain (bundled Public Suffix List) and JSON backups (commit c8c9d1b)',
      'Added the CI workflow and final README notes the same day (commit ff59fcf)',
      'Everything is local-first by design: saved tabs, folders and notes live in IndexedDB in the browser profile — no backend, no account, no sync, no analytics',
      'Note: the repository’s public git history begins with this commit — there is no earlier published history to cite',
    ],
    images: [
      {
        src: '/screenshots/cofretabs-library.png',
        alt: 'CofreTabs library from the original v1.0.0 repository screenshot — saved tabs grouped by folder',
        caption: 'COFRETABS v1.0.0 — LIBRARY',
      },
    ],
    links: [
      { label: 'GITHUB REPO', url: 'https://github.com/MadalinWolf/CofreTabs' },
    ],
  },
  {
    id: 'madscope-preview-download',
    date: '2026-10-11',
    project: 'MADSCOPE',
    projectSlug: 'madscope',
    title: 'All downloads now serve the preview build',
    summary:
      'Windows, macOS and Linux downloads on the MadScope project page now point at the v1.1.1-preview.1 prerelease — the first build that contains the Default theme rename and the About panel.',
    details: [
      'Every installer link (Windows MSI/EXE, macOS Apple Silicon + Intel DMG, Linux AppImage/DEB) now targets the v1.1.1-preview.1 prerelease (source commit 0141abc, built end-to-end by the repository’s own Release pipeline in GitHub Actions run 38164006725, full SHA-256 hashes published on the release page)',
      'A notice above the download grid states the current build (v1.1.1-preview.1) and explains that the antivirus report concerned the older v1.1.0 installer only — a behavioral-heuristic trigger, not a malware signature, believed to be a false positive; with the current build that issue is gone (clean Kaspersky scans, 0 detections across 807 objects) and it runs without alerts on the maintainer’s Windows 11 PC with Kaspersky active, with a SHA-256 check offered for extra assurance',
      'The previous v1.1.0 release, its seven assets and every existing tag remain untouched on GitHub — one click away via the notice’s previous-release link',
    ],
    images: [],
    links: [
      { label: 'PREVIEW RELEASE', url: 'https://github.com/MadalinWolf/MadScope/releases/tag/v1.1.1-preview.1' },
      { label: 'PREVIOUS v1.1.0', url: 'https://github.com/MadalinWolf/MadScope/releases/tag/v1.1.0' },
    ],
  },
  {
    id: 'madscope-screenshot-gallery',
    date: '2026-10-11',
    project: 'MADSCOPE',
    projectSlug: 'madscope',
    title: 'A screenshot gallery where every image names its build',
    summary:
      'The MadScope project page gained a “MadScope in action” gallery — a scrollable, swipeable carousel of genuine captures, grouped and labelled by the exact build each frame came from.',
    details: [
      'Added a “MadScope in action” section with two build-labelled groups: a preview build (commit 0141abc) captured from the real running application, and the published v1.1.0 release build',
      'Every slide carries a visible version label and the group heading states the build, so a preview frame can never be mistaken for a released one — the two builds are never mixed in one group',
      'The ten preview captures were taken from the actual app running at this commit (1440×900, real Chromium renders of this public page): main interface, diagnostics, mobile findings, copy-all and AI-report feedback, a genuine connection-refused error, all three themes and the About panel',
      'Accessibility and behaviour are verified in a real browser: previous/next with correct disabled states, arrow-key and Home/End browsing on the focused track, a neon-green focus ring, a polite live counter, click-to-enlarge lightbox with keyboard navigation and focus return, honouring of prefers-reduced-motion, no autoplay, and touch swipe on a 390px viewport with no page overflow',
      'Provenance is auditable: public/screenshots/preview-0141abc/MANIFEST.md records the source commit, capture environment and per-file captions, and scripts/verify-gallery.mjs fails the build if any filename, caption or version label drifts from that manifest',
      'No new application version or release was cut — the preview frames represent an unreleased build and are labelled as such',
    ],
    images: [
      {
        src: '/screenshots/preview-0141abc/01-main-interface.png',
        alt: 'MadScope main interface after a scan — health score 72/100 with three live viewport renders, labelled preview build',
        caption: 'PREVIEW BUILD · COMMIT 0141ABC',
      },
    ],
    links: [
      { label: 'GITHUB REPO', url: 'https://github.com/MadalinWolf/MadScope' },
    ],
  },
  {
    id: 'madscope-default-theme-about',
    date: '2026-10-11',
    project: 'MADSCOPE',
    projectSlug: 'madscope',
    title: 'Default by name, About panel by design',
    summary:
      'The original theme is now called Default, and the app gained an About panel with the real version, license and project links.',
    details: [
      'Renamed the original theme’s visible label from Existing to Default — the internal id and the localStorage key are untouched, so preferences saved by earlier releases keep working',
      'Added an About MadScope panel above the footer: short description, Madwolf Studios with a link to the official website, source on GitHub, the actual app version (1.1.0), the MIT license with a link to the license text, and acknowledgments for Playwright, Chromium, React, Vite, Tauri and Tailwind CSS',
      'Every value in the panel is sourced from the repository itself and guarded by unit tests, so the version or license can never silently drift',
      'Verified in a real browser: the selector shows exactly Default, Terminal and Light; the panel renders correctly in all three themes; the theme survives reloads; and legacy saved ids still apply — 19/19 live checks and 62/62 automated tests pass',
      'Small polish only: no new version or release was cut for this change',
    ],
    images: [
      {
        src: '/screenshots/madscope-about-panel.png',
        alt: 'MadScope About panel — version, MIT license, Madwolf Studios and GitHub links in the Default theme',
        caption: 'ABOUT MADSCOPE',
      },
    ],
    links: [
      { label: 'GITHUB REPO', url: 'https://github.com/MadalinWolf/MadScope' },
    ],
  },
  {
    id: 'madscope-v1-1-0-themes-diagnostics',
    date: '2026-10-09',
    project: 'MADSCOPE',
    projectSlug: 'madscope',
    version: 'v1.1.0',
    title: 'Three themes and diagnostics you can hand to an AI agent',
    summary:
      'MadScope v1.1.0 adds three selectable themes and turns diagnostics into plain, copyable text — including a structured AI-ready inspection report.',
    details: [
      'Added a theme selector with exactly three themes: Existing (the original dark design, still the default), Terminal (near-black green-tinted, monospaced technical elements) and Light — instant switching, persisted across restarts, no flash of the default theme',
      'Diagnostics are now plain selectable text listing every finding per viewport, with copy buttons on each row plus copy-all and copy-selected actions',
      'Added an AI-ready inspection report: structured plain text with only fields the engine really knows (URL, viewport, device profile, timestamp, health score, diagnostics source, per-finding severity/selector/evidence) — paste it straight into a coding agent',
      'Copy feedback reports success only after the clipboard write actually succeeded, with a fallback for browsers that block the async Clipboard API',
      'Validated live against this project page in a real browser: all three themes, persistence across reload, a real mobile inspection, and every copy path; screenshots in the MadScope repo are genuine captures',
      'CI now runs a production build in addition to typecheck, lint and the full test suite (57/57 passing)',
    ],
    images: [
      {
        src: '/screenshots/madscope-mobile-diagnostics.png',
        alt: 'MadScope mobile inspection — real diagnostics with copy controls and the AI-ready report button',
        caption: 'MADSCOPE v1.1.0 — DIAGNOSTICS',
      },
    ],
    links: [
      { label: 'GITHUB REPO', url: 'https://github.com/MadalinWolf/MadScope' },
      { label: 'RELEASE v1.1.0', url: 'https://github.com/MadalinWolf/MadScope/releases/tag/v1.1.0' },
    ],
  },
  {
    id: 'madscope-v1-0-1-launch',
    date: '2026-10-08',
    project: 'MADSCOPE',
    projectSlug: 'madscope',
    version: 'v1.0.1',
    title: 'Public launch with cross-platform builds and CI integration',
    summary:
      'MadScope is out as a public MIT-licensed tool: installers for Windows, macOS and Linux, a tested GitHub Action, and downloads on the project page.',
    details: [
      'Published the MadScope repository with the full engine: Chromium rendering, screenshots, issue detection, health score and visual regression',
      'Shipped v1.0.1 desktop installers built on CI — Windows MSI/EXE, macOS ARM64 + Intel DMG, Linux AppImage/DEB — with the engine bundled so nothing extra needs installing',
      'Verified the packaged Windows build end to end: install, launch, engine startup and a real scan',
      'Added the madscope-action with screenshot, baseline and test modes plus JSON outputs; its own CI covers capture, passing and intentionally failing runs',
      'Added real release downloads and an automation section to the MadScope project page, with checksums on every release',
      'macOS builds are unsigned for now — Gatekeeper needs a right-click Open until signing is set up',
    ],
    images: [
      {
        src: '/screenshots/madscope-overview.png',
        alt: 'MadScope main interface — a responsive scan at mobile, tablet and desktop sizes',
        caption: 'MADSCOPE v1.0.1',
      },
    ],
    links: [
      { label: 'GITHUB REPO', url: 'https://github.com/MadalinWolf/MadScope' },
      { label: 'RELEASE v1.0.1', url: 'https://github.com/MadalinWolf/MadScope/releases/tag/v1.0.1' },
    ],
  },
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
