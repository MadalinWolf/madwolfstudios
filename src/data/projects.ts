import type { DevelopmentStatus, FeatureState } from './status'
import { MADSCOPE_GALLERY } from './madscopeGallery'

/* =========================================================
   PROJECTS  —  add a new software project by adding an
   object to the PROJECTS array below. The /projects page
   and the /projects/:slug route pick it up automatically.
   ========================================================= */

export interface ProjectFeature {
  name: string
  state: FeatureState
  note?: string
}

export interface MediaSlot {
  /** Path to a real screenshot (e.g. '/screenshots/wolfcani-dashboard.png').
   *  Leave undefined to render a clearly marked placeholder frame. */
  src?: string
  alt: string
  caption?: string
}

export interface ShowcaseBlock {
  /** Small label shown as the block eyebrow, e.g. 'PLANNING'. */
  label: string
  title: string
  text: string
  images: MediaSlot[]
}

/** One screenshot in the browsable gallery — always tied to a version. */
export interface GallerySlide {
  src: string
  alt: string
  /** Short heading shown with the image. */
  title: string
  /** One-line explanation shown with the image. */
  text: string
}

/** A set of screenshots captured from ONE build, shown as one carousel. */
export interface GalleryGroup {
  /** Stable id, e.g. 'preview-0141abc' or 'release-v1.1.0'. */
  id: string
  /** Exact version label shown with every image of this group. */
  versionLabel: string
  /** Optional provenance note displayed under the group heading. */
  note?: string
  slides: GallerySlide[]
}

export interface RoadmapBlock {
  title: string
  items: string[]
}

export interface ProjectFaq {
  question: string
  /** Factual answer only — never a placeholder. */
  answer: string
}

export interface Project {
  slug: string
  name: string
  kind: 'software'
  status: DevelopmentStatus
  featured: boolean
  tagline: string
  /** Optional search-title override (otherwise the project name is used). */
  seoTitle?: string
  /** Optional meta description (1–2 plain sentences, factual only). */
  seoDescription?: string
  /** Optional external links (e.g. GitHub) rendered as buttons in the header. */
  links?: { label: string; url: string }[]
  /** Optional latest release tag shown on the page (static, updated per release). */
  releaseVersion?: string
  /** Optional URL of the release page (checksums + all files). */
  releaseUrl?: string
  /** Optional GitHub Actions integration link (action repo or Marketplace). */
  actionUrl?: string
  /** Optional schema.org SoftwareApplication category, emitted as JSON-LD on the
   *  project page alongside `releaseVersion`/`downloads` (e.g. 'DeveloperApplication'). */
  applicationCategory?: string
  /** Optional downloadable artifacts, grouped by operating system. */
  downloads?: { os: 'Windows' | 'macOS' | 'Linux'; arch: string; label: string; url: string; note?: string }[]
  /** Optional notice rendered directly under the download heading — e.g. a
   *  preview-build warning with a link to a different release page. */
  downloadNotice?: { text: string; linkLabel: string; linkUrl: string }
  /** Optional small-caps heading above the download notice text. Defaults to
   *  "Preview build — testing" (the MadScope preview wording). */
  downloadNoticeHeading?: string
  /** Optional donation destination. When set, the download area shows a
   *  support button and download clicks open a pay-what-you-want prompt first
   *  (the free download stays one click away inside it). */
  supportUrl?: string
  /** Optional "Support & Pricing" block rendered under the download section. */
  support?: {
    /** The pricing model in one or two plain sentences. */
    statement: string
    /** Channels — `url: null` renders a clearly marked "SOON" chip. */
    channels: { label: string; url: string | null; note?: string }[]
  }
  /** Label shown instead of "Latest release: {releaseVersion}" when the
   *  download table serves a newer build than the latest stable release. */
  downloadVersionLabel?: string
  overview: string[]
  /** Optional factual status paragraph — falls back to a generic one. */
  statusNote?: string
  features: ProjectFeature[]
  /** Q&A block for search/AI answer engines — factual answers only, null = TODO. */
  faq?: ProjectFaq[]
  screenshots: MediaSlot[]
  /** Large product screenshot shown right after the overview. Requires a real `src`. */
  hero?: MediaSlot
  /** Themed screenshot groups rendered in the "Inside <project>" section. */
  showcase?: ShowcaseBlock[]
  /** Optional browsable screenshot gallery, grouped by build/version. */
  gallery?: {
    title: string
    intro?: string
    groups: GalleryGroup[]
  }
  technology: string[]
  /** Empty array → the roadmap section is hidden (no placeholder). */
  roadmap: RoadmapBlock[]
}

export const PROJECTS: Project[] = [
  {
    slug: 'cofretabs',
    name: 'CofreTabs',
    kind: 'software',
    status: 'released',
    featured: true,
    tagline: 'Your tabs. Your vault. Your device. A retro terminal vault for the tabs you want to keep.',
    seoTitle: 'CofreTabs — Local-Only Browser Tab Vault Extension',
    seoDescription:
      'CofreTabs is a privacy-first Manifest V3 browser extension that saves, organizes, searches and restores your tabs in a local IndexedDB vault. No accounts, no cloud, no tracking. MIT licensed, free download.',
    links: [
      { label: 'VIEW ON GITHUB', url: 'https://github.com/MadalinWolf/CofreTabs' },
      { label: 'DOWNLOAD v1.1.0', url: 'https://github.com/MadalinWolf/CofreTabs/releases/download/v1.1.0/CofreTabs-v1.1.0.zip' },
    ],
    releaseVersion: 'v1.1.0',
    releaseUrl: 'https://github.com/MadalinWolf/CofreTabs/releases/tag/v1.1.0',
    applicationCategory: 'BrowserApplication',
    downloads: [
      { os: 'Windows', arch: 'Chrome / Edge / Brave / Vivaldi / Opera', label: 'Extension ZIP', url: 'https://github.com/MadalinWolf/CofreTabs/releases/download/v1.1.0/CofreTabs-v1.1.0.zip', note: 'Unzip, then “Load unpacked” in chrome://extensions (developer mode).' },
      { os: 'macOS', arch: 'Chrome / Edge / Brave / Vivaldi / Opera', label: 'Extension ZIP', url: 'https://github.com/MadalinWolf/CofreTabs/releases/download/v1.1.0/CofreTabs-v1.1.0.zip', note: 'Unzip, then “Load unpacked” in chrome://extensions (developer mode).' },
      { os: 'Linux', arch: 'Chrome / Edge / Brave / Vivaldi / Opera', label: 'Extension ZIP', url: 'https://github.com/MadalinWolf/CofreTabs/releases/download/v1.1.0/CofreTabs-v1.1.0.zip', note: 'Unzip, then “Load unpacked” in chrome://extensions (developer mode).' },
    ],
    downloadNoticeHeading: 'Official release — not in any browser store yet',
    downloadNotice: {
      text: 'CofreTabs is not distributed through a browser store yet — it is installed from this official GitHub release. Extract the ZIP and load the extracted folder as an unpacked extension (one-time developer mode). The release page shows the ZIP’s SHA-256 digest, and existing installs check the same GitHub releases feed for updates.',
      linkLabel: 'All CofreTabs releases →',
      linkUrl: 'https://github.com/MadalinWolf/CofreTabs/releases',
    },
    supportUrl: 'https://github.com/sponsors/MadalinWolf',
    support: {
      statement:
        'CofreTabs is free — every download, every store listing, forever, for everyone. Nothing is behind a paywall and paying unlocks no extra features: if the extension saves you time, you can support the studio with a pay-what-you-want donation — 1, 2.99, 5 or 10 — or simply keep it free and star the repository instead.',
      channels: [
        { label: 'GITHUB SPONSORS', url: 'https://github.com/sponsors/MadalinWolf', note: 'Pay what you want' },
        { label: 'STAR THE PROJECT', url: 'https://github.com/MadalinWolf/CofreTabs', note: 'Free, takes one click' },
        { label: 'FOLLOW THE STUDIO', url: 'https://github.com/MadalinWolf', note: 'News and releases' },
        { label: 'KO-FI', url: null, note: 'Pay what you want' },
        { label: 'ITCH.IO', url: null, note: 'Pay what you want' },
        { label: 'GUMROAD', url: null, note: 'Pay what you want' },
      ],
    },
    overview: [
      'CofreTabs is a Manifest V3 browser extension that turns the tab you are reading into a permanent, searchable entry in a private local vault. It is built for people who hoard “read later” tabs, research sessions and rabbit holes — without handing their browsing history to a bookmark service.',
      'Everything lives in IndexedDB inside your browser profile. There is no backend, no account, no sync, no analytics and no remote code. CofreTabs never saves a page automatically: the slide-over panel shows exactly what will be saved, and nothing is written until you press SAVE THIS TAB.',
      'Version 1.1.0 completes the original roadmap — Favorites, custom folders, a compact folder grid, light and dark themes and in-app update notifications — all verified by a 98-test automated suite that runs against the real storage and UI code.',
    ],
    statusNote:
      'CofreTabs v1.1.0 was released on 25 October 2026 and is free everywhere — the download links on this page serve that exact release, and future store listings will be free too. The source, tests (98/98 passing at release), build pipeline and release packaging are complete. The Chrome Web Store is a planned distribution channel — store listing copy is prepared in the repository, but the extension has not been submitted or published to any browser store yet. Until then, installation is from the GitHub release via “Load unpacked”. Development is documented on the dev log; donations are optional and never unlock features.',
    features: [
      { name: 'Explicit save panel', state: 'implemented', note: 'A right-side slide-over shows the page title, host, automatic folder and duplicate status before you commit — nothing is written until you press SAVE THIS TAB' },
      { name: 'Truthful save states', state: 'implemented', note: 'Progress is tied to the real database write: double-clicks are rejected, and success is shown only after IndexedDB confirms the write — failures are shown as failures' },
      { name: 'Automatic website folders', state: 'implemented', note: 'A bundled ICANN Public Suffix List (6,949 rules) files pages by registrable domain — news.bbc.co.uk goes under BBC, not co.uk — with www, subdomains, IP literals and malformed URLs handled' },
      { name: 'Full-page library', state: 'implemented', note: 'Search across title, URL, hostname, folder and notes; sort by newest, oldest, title, domain or folder; filter by folder' },
      { name: 'Favorites', state: 'implemented', note: 'Heart any saved tab to collect it in the built-in Favorites view, in both the library and the panel — favoriting is a non-destructive tag, the tab stays in its folder' },
      { name: 'Custom folders', state: 'implemented', note: 'Create, rename and delete your own folders from the library sidebar — deleting a folder moves its tabs to Trash instead of destroying them' },
      { name: 'Move tabs between folders', state: 'implemented', note: 'An inline MOVE selector on every row re-files a saved tab immediately, preserving title, URL, favicon and notes' },
      { name: 'Compact folder grid', state: 'implemented', note: 'The panel shows up to nine folders in a 3×3 grid with icons, names and counts; accessible up/down controls step one row at a time when you have more' },
      { name: 'Trash with a way back', state: 'implemented', note: 'Move entries to Trash, restore them, or permanently delete them from Trash with confirmation — restored tabs return to their original folder when it still exists, otherwise they are re-filed by domain' },
      { name: 'Editable titles and notes', state: 'implemented', note: 'Add context to a tab, fix a noisy page title, or add a URL manually when a page cannot be injected' },
      { name: 'Portable JSON backups', state: 'implemented', note: 'Export active and trashed entries with a versioned schema; import supports merge and replace, validates the entire file before writing, and reports duplicate/invalid counts' },
      { name: 'Light and dark themes', state: 'implemented', note: 'A theme switch in the library sidebar, applied to the library and the injected panel, persisted across launches, defaulting to your system preference' },
      { name: 'Update notifications', state: 'implemented', note: 'The library checks the official GitHub releases feed at most once every 12 hours and shows a dismissible banner when a newer version exists — nothing is downloaded or installed without you' },
      { name: 'Restricted pages handled honestly', state: 'implemented', note: 'On browser-internal pages (chrome://, the Web Store, PDF viewers) Chromium blocks injection — CofreTabs opens the library with an explanation and a manual-add option instead' },
      { name: 'Keyboard and screen-reader friendly', state: 'implemented', note: 'Escape closes the panel or dialogs, focus is moved in and restored on close, status uses polite live regions, and animations respect prefers-reduced-motion' },
      { name: 'Minimal permissions', state: 'implemented', note: 'Only activeTab and scripting — no tabs, history, bookmarks, host permissions or background network access' },
      { name: 'Sync between devices', state: 'planned', note: 'Deliberately absent today — JSON export/import is the supported way to move a vault manually' },
    ],
    faq: [
      {
        question: 'What is CofreTabs?',
        answer:
          'CofreTabs is a Manifest V3 browser extension that saves the current tab into a private, searchable vault with one explicit click. Saved tabs, folders and notes live in IndexedDB inside your browser profile — no account, no server, no sync.',
      },
      {
        question: 'Does CofreTabs save my browsing automatically?',
        answer:
          'No. CofreTabs never saves a page automatically — not on install, not on toolbar click, not on navigation. The panel shows what would be saved, and only the explicit SAVE THIS TAB button writes a record to the local vault.',
      },
      {
        question: 'Does my data leave my device?',
        answer:
          'The extension uploads nothing: no analytics, no telemetry, no accounts, no cloud. Saved tabs never leave your browser profile. The single network request CofreTabs can make is an optional update check against the public GitHub releases feed (at most once every 12 hours) that contains no vault data; the check only powers a dismissible "update available" banner.',
      },
      {
        question: 'Is CofreTabs on the Chrome Web Store?',
        answer:
          'Not yet — it has not been submitted to the Chrome Web Store or any other browser store. It is installed today from the official GitHub release: download the ZIP, extract it and load the folder as an unpacked extension with developer mode enabled. Store listing copy is prepared in the repository for a future submission.',
      },
      {
        question: 'Which browsers does CofreTabs support?',
        answer:
          'Chromium-based browsers with Manifest V3 support: Chrome 102+, Edge, Brave, Vivaldi and Opera. Firefox is not currently supported — the extension uses the Chromium extension APIs.',
      },
      {
        question: 'Can it save chrome:// pages or the Web Store?',
        answer:
          'No — Chromium blocks extension injection on browser-internal pages, the Web Store and PDF viewers. On those pages CofreTabs opens the library with an explanation and lets you add a valid http(s) URL manually.',
      },
      {
        question: 'Where is my data and what happens when I delete it?',
        answer:
          'Your data lives in IndexedDB inside your browser profile, stored unencrypted — anyone with access to your unlocked profile could read it, so export a backup before clearing browser data. Trash hides entries without deleting them; Delete Forever and Empty Trash remove them from the database; uninstalling the extension removes the vault. There is no server-side copy because none is ever created.',
      },
    ],
    screenshots: [
      {
        src: '/screenshots/cofretabs-panel-v110.png',
        alt: 'CofreTabs slide-over save panel on a web page — detected page card, SAVE THIS TAB button, 3×3 folder grid with Favorites, custom folders and recent saved tabs',
        caption: 'SAVE PANEL',
      },
      {
        src: '/screenshots/cofretabs-library-v110.png',
        alt: 'CofreTabs library in the dark theme — sidebar with Favorites and custom folders, saved tabs with notes, heart toggles, MOVE controls and the theme switch',
        caption: 'LIBRARY — DARK',
      },
      {
        src: '/screenshots/cofretabs-library-light.png',
        alt: 'CofreTabs library in the light theme with the same saved tabs, folders and controls on bright surfaces',
        caption: 'LIBRARY — LIGHT',
      },
    ],
    gallery: {
      title: 'CofreTabs in action',
      intro:
        'Real captures of the extension, grouped by build — every slide carries the exact version it represents. Browse with Previous/Next, arrow keys or swipe; click any screenshot to enlarge it. Provenance for each file is recorded in public/screenshots/cofretabs-MANIFEST.md.',
      groups: [
        {
          id: 'release-v1.1.0',
          versionLabel: 'v1.1.0 — released 25 October 2026',
          note:
            'Captured 2026-10-26 from the packaged v1.1.0 build (tag v1.1.0, commit 729c500): the real library page with real IndexedDB (three chrome.* APIs stubbed) and the real, unmodified panel script saving through the real vault write path — the same documented method the repository uses for its own screenshots. Demo fixture data only.',
          slides: [
            {
              src: '/screenshots/cofretabs-panel-v110.png',
              title: 'Save panel',
              text: 'Slide-over panel over an article: detected page, SAVE THIS TAB, and the 3×3 folder grid with Favorites and recent saved tabs.',
              alt: 'CofreTabs v1.1.0 save panel — detected page, SAVE THIS TAB button and the 3×3 folder grid',
            },
            {
              src: '/screenshots/cofretabs-panel-saved-v110.png',
              title: 'Write acknowledged',
              text: 'After a real save: the success state appears only once IndexedDB confirms the write, with the duplicate notice and updated vault count.',
              alt: 'CofreTabs v1.1.0 panel after saving — write acknowledged, save complete and updated vault',
            },
            {
              src: '/screenshots/cofretabs-panel-light.png',
              title: 'Panel in light theme',
              text: 'The same panel in the light theme — an already-saved page is flagged as a duplicate before you commit.',
              alt: 'CofreTabs v1.1.0 panel in the light theme showing duplicate detection on an already-saved page',
            },
            {
              src: '/screenshots/cofretabs-library-v110.png',
              title: 'Library — dark theme',
              text: 'Favorites, custom folders, MOVE controls, notes, the theme switch and the Trash count in the dark theme.',
              alt: 'CofreTabs v1.1.0 library in the dark theme with folders, saved tabs, notes and MOVE controls',
            },
            {
              src: '/screenshots/cofretabs-library-light.png',
              title: 'Library — light theme',
              text: 'The identical vault in the light theme — the switch persists across launches and defaults to your system preference.',
              alt: 'CofreTabs v1.1.0 library in the light theme with the same saved tabs and folders',
            },
            {
              src: '/screenshots/cofretabs-favorites.png',
              title: 'Favorites view',
              text: 'Heart any saved tab to collect it here — favoriting is a tag, so the tab stays in its original folder and is never duplicated.',
              alt: 'CofreTabs v1.1.0 Favorites collection showing three favorited saved tabs',
            },
            {
              src: '/screenshots/cofretabs-search.png',
              title: 'Search across the vault',
              text: 'Search matches title, URL, hostname, folder and notes — three hits for “vault” across different fields.',
              alt: 'CofreTabs v1.1.0 library search results for “vault” matching title, URL and notes',
            },
            {
              src: '/screenshots/cofretabs-trash.png',
              title: 'Trash with a way back',
              text: 'Restore a trashed tab to its folder, delete it forever, or empty the Trash — nothing disappears by accident.',
              alt: 'CofreTabs v1.1.0 Trash view with RESTORE, DELETE and EMPTY TRASH actions',
            },
            {
              src: '/screenshots/cofretabs-import.png',
              title: 'Import a backup',
              text: 'The import dialog validates the whole file first and previews it before you choose merge or replace mode.',
              alt: 'CofreTabs v1.1.0 import backup dialog with validation preview and MERGE and REPLACE modes',
            },
          ],
        },
        {
          id: 'release-v1.0.0',
          versionLabel: 'v1.0.0 — original repository screenshots',
          note:
            'Copied unchanged from the CofreTabs repository (docs/screenshots/): captured in headless Chrome via CDP Extensions.loadUnpacked against the v1.0.0 build.',
          slides: [
            {
              src: '/screenshots/cofretabs-panel.png',
              title: 'v1.0.0 save panel',
              text: 'The original review-before-save state — title, host and automatic folder shown before anything is written.',
              alt: 'CofreTabs v1.0.0 save panel in the review-before-save state',
            },
            {
              src: '/screenshots/cofretabs-panel-saved.png',
              title: 'v1.0.0 save acknowledged',
              text: 'The panel after a save acknowledgement, with the updated vault beneath it.',
              alt: 'CofreTabs v1.0.0 panel after a save acknowledgement',
            },
            {
              src: '/screenshots/cofretabs-library.png',
              title: 'v1.0.0 library',
              text: 'The original full-page library with demo tabs grouped by folder.',
              alt: 'CofreTabs v1.0.0 library with demo tabs grouped by folder',
            },
          ],
        },
      ],
    },
    hero: {
      src: '/screenshots/cofretabs-panel-v110.png',
      alt: 'CofreTabs v1.1.0 slide-over panel over an article — page ready to save, 3×3 folder grid with Favorites and custom folders, recent saved tabs with heart toggles',
      caption: 'COFRETABS v1.1.0 — SAVE PANEL',
    },
    showcase: [
      {
        label: 'SAVE',
        title: 'Review first, then press save',
        text: 'Click the toolbar icon and a slide-over panel shows the page title, host, the automatic folder it will be filed under, and a warning if the exact URL is already in your vault. The progress animation is tied to the real database write — a failed save is reported as a failure, never as success.',
        images: [
          {
            src: '/screenshots/cofretabs-panel-v110.png',
            alt: 'CofreTabs panel showing the detected page and the SAVE THIS TAB button above the folder grid',
            caption: 'REVIEW BEFORE SAVE',
          },
          {
            src: '/screenshots/cofretabs-panel-saved-v110.png',
            alt: 'CofreTabs panel after saving — write acknowledged, save complete into the folder, duplicate notice and the updated vault',
            caption: 'WRITE ACKNOWLEDGED',
          },
        ],
      },
      {
        label: 'ORGANIZE',
        title: 'A library that stays usable at scale',
        text: 'The full-page library is your vault: every saved tab with its folder, note and time. Website folders are created automatically from the real domain using a bundled ICANN Public Suffix List, and you can create your own folders, rename them, and move tabs between them with the inline MOVE selector.',
        images: [
          {
            src: '/screenshots/cofretabs-library-v110.png',
            alt: 'CofreTabs library listing saved tabs with domain folders, custom folders, notes and per-row EDIT, MOVE and TRASH controls',
            caption: 'LIBRARY — FOLDERS + MOVE',
          },
        ],
      },
      {
        label: 'FAVORITES',
        title: 'Keep the best within one click',
        text: 'Heart any saved tab to collect it in the built-in Favorites view, in both the library and the panel. Favoriting never moves or duplicates the tab — it stays in its folder and is only tagged, and the Favorites collection itself can’t be deleted.',
        images: [
          {
            src: '/screenshots/cofretabs-favorites.png',
            alt: 'CofreTabs Favorites view listing three favorited tabs with filled heart toggles',
            caption: 'FAVORITES VIEW',
          },
        ],
      },
      {
        label: 'SEARCH',
        title: 'Find any saved tab instantly',
        text: 'Search across title, URL, hostname, folder and notes; sort by newest, oldest, title, domain or folder; and filter by any folder or the Trash. Results update as you type, so a vault with hundreds of entries stays navigable.',
        images: [
          {
            src: '/screenshots/cofretabs-search.png',
            alt: 'CofreTabs search results for the query “vault” — three matches across titles and notes',
            caption: 'SEARCH RESULTS',
          },
        ],
      },
      {
        label: 'TRASH',
        title: 'Nothing is lost by accident',
        text: 'Moving a tab to Trash hides it without destroying it. From the Trash you can restore entries — they return to their original folder when it still exists, otherwise they are re-filed by domain — or delete them permanently with confirmation. Deleting a folder also moves its tabs to Trash instead of wiping them.',
        images: [
          {
            src: '/screenshots/cofretabs-trash.png',
            alt: 'CofreTabs Trash view with a trashed tab offering RESTORE and DELETE actions and an EMPTY TRASH button',
            caption: 'TRASH — RESTORE OR DELETE',
          },
        ],
      },
      {
        label: 'BACKUPS',
        title: 'Your vault, as a file you control',
        text: 'Export the whole vault — active and trashed entries, folders, notes and favorites — as plain JSON. Import validates the entire file before anything is written, then merges into your current vault or replaces it, reporting duplicate and invalid counts. Backups never leave your machine unless you move the file yourself.',
        images: [
          {
            src: '/screenshots/cofretabs-import.png',
            alt: 'CofreTabs import backup dialog — local file selected, validation preview with tab and folder counts, MERGE and REPLACE import modes',
            caption: 'IMPORT — MERGE OR REPLACE',
          },
        ],
      },
      {
        label: 'THEMES',
        title: 'Retro terminal, day or night',
        text: 'The whole interface — panel and library — comes in dark and light themes. The default follows your system preference until you choose, and the choice persists across launches. Both themes keep the phosphor-green terminal identity the vault was designed around.',
        images: [
          {
            src: '/screenshots/cofretabs-library-light.png',
            alt: 'CofreTabs library in the light theme — bright surfaces, dark readable terminal text',
            caption: 'LIGHT THEME — LIBRARY',
          },
          {
            src: '/screenshots/cofretabs-panel-light.png',
            alt: 'CofreTabs panel in the light theme over a page, with the folder grid and an already-saved notice',
            caption: 'LIGHT THEME — PANEL',
          },
        ],
      },
    ],
    technology: [
      'Manifest V3',
      'JavaScript (ES modules)',
      'IndexedDB',
      'Shadow DOM',
      'ICANN Public Suffix List',
      'Node.js test runner',
      'GitHub Actions',
    ],
    roadmap: [
      {
        title: 'Next',
        items: [
          'Chrome Web Store submission — listing copy is prepared in the repository, the extension is not submitted yet',
          'Evaluate other browser stores and Firefox support',
        ],
      },
      {
        title: 'By design (not planned)',
        items: [
          'No accounts, servers or cloud sync — vaults stay on the device; JSON backups are the supported way to move one',
          'No automatic saving — every vault entry is an explicit user action',
        ],
      },
    ],
  },
  {
    slug: 'wolfcani',
    name: 'WOLFCANI',
    kind: 'software',
    status: 'in-development',
    featured: true,
    tagline: 'OnFocus Workspace — everything you need, in one place.',
    seoTitle: 'WOLFCANI — OnFocus Workspace',
    seoDescription:
      'WOLFCANI is an OnFocus Workspace — an all-in-one study workspace for students with tasks, subjects, calendar, exams and a focus timer, organized per profile.',
    overview: [
      'WOLFCANI is an all-in-one study workspace designed to help students stay focused: tasks, subjects, topics, exams, calendar events and focused work sessions live together in one place, instead of scattered across different applications.',
      'It is built around profiles: every student gets their own workspace, so several people can use it with completely separate tasks, subjects, calendars and exams.',
      'The aim is a personalized student workspace, not just a todo list.',
    ],
    statusNote:
      'WOLFCANI is in active development. The core workspace is implemented and usable — dashboard, tasks, subjects, calendar, exams, the focus timer and profiles all work today. Notes, tests & quizzes and resource links are planned next, and new features and improvements land on the dev log as they ship.',
    features: [
      { name: 'Multiple profiles with isolated data', state: 'implemented', note: 'Profile selection with per-profile tasks, subjects, calendar, exams, focus sessions and settings' },
      { name: 'Task management', state: 'implemented', note: 'Priorities, due dates, categories, tags, subtasks and completion tracking' },
      { name: 'Subjects with topics & progress', state: 'implemented' },
      { name: 'Calendar with events', state: 'implemented', note: 'Month view with study, exam, deadline and reminder events' },
      { name: 'Advance reminders', state: 'implemented', note: 'Lead time per event, with in-app toasts and optional browser notifications' },
      { name: 'Exams with countdowns', state: 'implemented' },
      { name: 'Focus / Pomodoro timer', state: 'implemented', note: 'Pomodoro-style focus/break timer with session history' },
      { name: 'Clock widget', state: 'implemented', note: 'Digital and analog modes with accent, glow and size settings' },
      { name: 'Study statistics', state: 'implemented' },
      { name: 'Dashboard overview', state: 'implemented', note: "Today's tasks, overdue items, focus time and upcoming work" },
      { name: 'Night / light themes', state: 'implemented', note: 'Both follow the same three-color brand palette' },
      { name: 'Personalised student workspace', state: 'implemented', note: 'Everything is namespaced per profile' },
      { name: 'Notes', state: 'planned' },
      { name: 'Tests & quizzes', state: 'planned' },
      { name: 'Resource links', state: 'planned' },
    ],
    /* FAQ for search engines / AI answer engines.
       ANSWERS MUST BE FACTUAL — derived only from the app README and the
       feature list above. Questions we cannot answer factually yet are
       removed entirely rather than shipped as visible "TO BE PROVIDED"
       slots — re-add them the moment the answer is confirmed. */
    faq: [
      {
        question: 'What is WOLFCANI?',
        answer:
          'WOLFCANI is an OnFocus Workspace — an all-in-one study workspace built to hold everything a student juggles in one place: tasks, subjects, topics, exams, calendar events and focused work sessions.',
      },
      {
        question: 'Does WOLFCANI have a focus timer?',
        answer:
          'Yes — a Pomodoro-style focus and break timer runs from the dashboard and keeps counting while you work. Completed sessions are tracked toward your focus-time statistics.',
      },
    ],
    screenshots: [
      {
        src: '/screenshots/wolfcani-dashboard.png',
        alt: "WOLFCANI dashboard — live clock, focus timer, today's tasks, upcoming exams and the month calendar",
        caption: 'DASHBOARD',
      },
    ],
    hero: {
      src: '/screenshots/wolfcani-dashboard.png',
      alt: "WOLFCANI dashboard — live clock, running focus timer, today's tasks, upcoming exams and the month calendar",
      caption: 'DASHBOARD // WOLFCANI v2.1',
    },
    showcase: [
      {
        label: 'DASHBOARD',
        title: 'The workspace at a glance',
        text: "The home screen opens on a live clock and a Pomodoro timer that keeps counting while you work, next to today's tasks, upcoming exams, focus-time and progress stats — with the month calendar, upcoming events and quick access right below.",
        images: [
          {
            src: '/screenshots/wolfcani-dashboard-full.png',
            alt: 'Full WOLFCANI dashboard page — clock, focus timer, tasks, exams, month calendar, upcoming events and quick access',
            caption: 'DASHBOARD — FULL PAGE',
          },
        ],
      },
      {
        label: 'PLANNING',
        title: 'Tasks, calendar and exams',
        text: 'Tasks carry priorities, due dates and completion tracking. The calendar lays study sessions, exams, deadlines and reminders out on a month grid. Exams stay in view with priority badges and a live countdown to test day.',
        images: [
          {
            src: '/screenshots/wolfcani-tasks.png',
            alt: 'WOLFCANI task list with priorities, due dates and completed items',
            caption: 'TASKS',
          },
          {
            src: '/screenshots/wolfcani-calendar.png',
            alt: 'WOLFCANI calendar month view with study, exam, deadline and reminder events',
            caption: 'CALENDAR',
          },
          {
            src: '/screenshots/wolfcani-exams.png',
            alt: 'WOLFCANI exams list with subject, priority badge and countdown',
            caption: 'EXAMS',
          },
        ],
      },
      {
        label: 'ORGANIZATION',
        title: 'Subjects and profiles',
        text: 'Subjects group topics and progress per course. Profiles give each student their own isolated workspace — separate tasks, calendar, exams and settings on the same installation.',
        images: [
          {
            src: '/screenshots/wolfcani-subjects.png',
            alt: 'WOLFCANI subjects — course cards with topics, pending items and progress',
            caption: 'SUBJECTS',
          },
          {
            src: '/screenshots/wolfcani-profile-select.png',
            alt: 'WOLFCANI profile selection screen with a slot per student',
            caption: 'PROFILES',
          },
        ],
      },
    ],
    technology: [
      'React 18',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'React Context',
    ],
    roadmap: [],
  },
  {
    slug: 'madscope',
    name: 'MadScope',
    kind: 'software',
    status: 'released',
    featured: true,
    tagline: 'Local-first responsive testing and visual regression for developers.',
    seoTitle: 'MadScope — Responsive Website Testing & Visual Regression',
    seoDescription:
      'MadScope is a local-first responsive website testing and visual regression tool built with Playwright, Chromium, React, TypeScript and Tauri. Free and open source (MIT).',
    links: [
      { label: 'VIEW ON GITHUB', url: 'https://github.com/MadalinWolf/MadScope' },
      { label: 'PREVIEW RELEASE', url: 'https://github.com/MadalinWolf/MadScope/releases/tag/v1.1.1-preview.1' },
    ],
    releaseVersion: 'v1.1.0',
    releaseUrl: 'https://github.com/MadalinWolf/MadScope/releases/tag/v1.1.0',
    actionUrl: 'https://github.com/MadalinWolf/madscope-action',
    applicationCategory: 'DeveloperApplication',
    downloads: [
      { os: 'Windows', arch: 'x64', label: 'MSI installer', url: 'https://github.com/MadalinWolf/MadScope/releases/download/v1.1.1-preview.1/MadScope-1.1.1-preview.1-windows-x64.msi', note: 'Preview build v1.1.1-preview.1 — testing' },
      { os: 'Windows', arch: 'x64', label: 'Setup wizard (EXE)', url: 'https://github.com/MadalinWolf/MadScope/releases/download/v1.1.1-preview.1/MadScope-1.1.1-preview.1-windows-x64-setup.exe', note: 'Preview build v1.1.1-preview.1 — testing' },
      { os: 'macOS', arch: 'Apple Silicon', label: 'DMG', url: 'https://github.com/MadalinWolf/MadScope/releases/download/v1.1.1-preview.1/MadScope-1.1.1-preview.1-macos-arm64.dmg', note: 'Preview build v1.1.1-preview.1 — testing; unsigned: right-click → Open on first launch.' },
      { os: 'macOS', arch: 'Intel', label: 'DMG', url: 'https://github.com/MadalinWolf/MadScope/releases/download/v1.1.1-preview.1/MadScope-1.1.1-preview.1-macos-x64.dmg', note: 'Preview build v1.1.1-preview.1 — testing; unsigned: right-click → Open on first launch.' },
      { os: 'Linux', arch: 'x64', label: 'AppImage', url: 'https://github.com/MadalinWolf/MadScope/releases/download/v1.1.1-preview.1/MadScope-1.1.1-preview.1-linux-x64.AppImage', note: 'Preview build v1.1.1-preview.1 — testing; portable: chmod +x, then run.' },
      { os: 'Linux', arch: 'x64', label: 'DEB package', url: 'https://github.com/MadalinWolf/MadScope/releases/download/v1.1.1-preview.1/MadScope-1.1.1-preview.1-linux-x64.deb', note: 'Preview build v1.1.1-preview.1 — testing; Debian / Ubuntu.' },
    ],
    downloadNotice: {
      text: 'Current build: v1.1.1-preview.1 — the downloads above serve it. The antivirus report concerned the older v1.1.0 Windows installer: it was triggered by Kaspersky’s behavioral heuristics — not a malware signature — and we believe it is a false positive. The issue ended with the update: v1.1.1 is installed and tested on our Windows 11 PC with Kaspersky active, with no detections, warnings or alerts, and the installers scan clean with Kaspersky (0 detections across 807 objects). For extra assurance, compare each file’s SHA-256 against SHA256SUMS.txt on the release page. macOS builds are unsigned: on first launch, right-click → Open.',
      linkLabel: 'Previous release: v1.1.0 →',
      linkUrl: 'https://github.com/MadalinWolf/MadScope/releases/tag/v1.1.0',
    },
    downloadVersionLabel: 'v1.1.1-preview.1',
    overview: [
      'MadScope renders any URL in real Chromium across multiple viewport sizes, captures screenshots, flags potential responsive issues, scores the page, and catches visual regressions — all locally, with no account and no telemetry.',
      'It was built to replace the manual routine of resizing the browser and eyeballing layouts: enter a URL (including localhost while you develop), pick viewports, and get real renders, screenshots, findings and a deterministic health score in seconds.',
      'The same core engine powers three surfaces: a desktop UI, a command-line interface for terminals and CI, and a local render server. Baselines saved today can be re-tested tomorrow — or on every pull request — with pixel-level diffs and a pass/fail exit code.',
    ],
    statusNote:
      'MadScope v1.1.0 is released as free open-source software (MIT) at github.com/MadalinWolf/MadScope, with installers for Windows, macOS (ARM64 + Intel) and Linux. New in this release: three selectable themes (Default, Terminal, Light) with persistence, and diagnostics you can select and copy — including an AI-ready inspection report for handing findings to a coding agent. Next up: parallel viewport rendering, Firefox/WebKit engines and notarized macOS builds. The website’s downloads serve the build v1.1.1-preview.1 for Windows, macOS and Linux (theme renamed Existing → Default, new About panel). About the antivirus report: it concerned the older v1.1.0 Windows installer and was triggered by Kaspersky’s behavioral heuristics — not a malware signature — and we believe it is a false positive; the issue ended with the update. v1.1.1 is installed and tested on the maintainer’s Windows 11 PC with Kaspersky active with no alerts, and the installers scan clean (0 detections across 807 objects). The previous v1.1.0 release remains available on its release page. See SECURITY_AUDIT.md in the repository for verified facts and next steps.',
    features: [
      { name: 'Real Chromium rendering', state: 'implemented', note: 'Playwright + Chromium with a dedicated browser context per viewport (device scale, isMobile, touch)' },
      { name: '8 viewport presets + custom sizes', state: 'implemented', note: 'Mobile Small 320×568 up to Large Desktop 1920×1080, plus any custom width/height' },
      { name: 'Localhost testing', state: 'implemented', note: 'Test http://localhost and 127.0.0.1 dev servers directly' },
      { name: 'Responsive issue detection', state: 'implemented', note: 'Horizontal overflow, element overflow, text clipping, image overflow, small touch targets, overlaps, off-screen elements — all reported as potential issues' },
      { name: 'Deterministic health score', state: 'implemented', note: 'Transparent 0–100 formula documented in the repo — same page, same score' },
      { name: 'Screenshot capture + history', state: 'implemented', note: 'PNG/JPEG, viewport or full-page, stored locally with metadata and history' },
      { name: 'Visual comparison', state: 'implemented', note: 'Side-by-side, overlay with opacity, before/after slider, deterministic diff image' },
      { name: 'Baselines + regression tests', state: 'implemented', note: 'Save baselines, re-test later or in CI with changed-pixel percentage and exit codes' },
      { name: 'CLI for terminal + CI', state: 'implemented', note: 'madscope screenshot / baseline / test / config — same engine as the desktop app' },
      { name: 'GitHub Action', state: 'implemented', note: 'Docker action with screenshot/baseline/test modes and JSON outputs; self-tested in CI, Marketplace listing pending' },
      { name: 'Native installers', state: 'implemented', note: 'v1.1.0: Windows MSI/EXE, macOS ARM64 + Intel DMG, Linux AppImage/DEB built on CI' },
      { name: 'Three themes', state: 'implemented', note: 'Default (the original design — its label was renamed from “Existing”, internal id and saved preferences unchanged), Terminal and Light — instant switching, persisted across restarts, all colors driven by CSS custom properties' },
      { name: 'In-app About panel', state: 'implemented', note: 'App version, MIT license, Madwolf Studios website, GitHub repository and acknowledgments — verified in all three themes' },
      { name: 'Shareable diagnostics + AI-ready report', state: 'implemented', note: 'Selectable, copyable findings with copy-all/copy-selected, plus a structured plain-text inspection report for handing to an AI coding agent' },
      { name: 'Type-safe configuration', state: 'implemented', note: 'madscope.config.ts with validation and human-readable errors' },
      { name: 'Breakpoint ruler', state: 'implemented', note: 'Common breakpoints shown under every scan' },
      { name: 'Authenticated sessions', state: 'planned', note: 'Storage state / cookies with secret redaction' },
      { name: 'Firefox + WebKit engines', state: 'planned' },
    ],
    faq: [
      {
        question: 'What is MadScope?',
        answer:
          'MadScope is a local-first responsive website testing and visual regression tool. It renders a URL in real Chromium at multiple viewport sizes, captures screenshots, detects potential responsive issues, computes a deterministic health score, and compares renders against saved baselines.',
      },
      {
        question: 'Is MadScope free and open source?',
        answer:
          'Yes — MadScope is MIT licensed and free for personal and commercial use. The source is published at github.com/MadalinWolf/MadScope.',
      },
      {
        question: 'Does MadScope upload my websites or screenshots anywhere?',
        answer:
          'No. MadScope runs entirely on your machine: the render server binds to 127.0.0.1, screenshots are written to a local .madscope directory, and the codebase contains no telemetry, analytics, accounts or upload code.',
      },
    ],
    screenshots: [
      {
        src: '/screenshots/madscope-overview.png',
        alt: 'MadScope main interface — URL bar, viewport picker, responsive health 100/100 and three live viewport renders',
        caption: 'MAIN INTERFACE',
      },
      {
        src: '/screenshots/madscope-existing-theme.png',
        alt: 'MadScope Existing theme — the original dark design, still the default in v1.1.0',
        caption: 'EXISTING THEME (v1.1.0)',
      },
      {
        src: '/screenshots/madscope-terminal-theme.png',
        alt: 'MadScope Terminal theme — near-black green-tinted surfaces, terminal-green accents and monospaced technical elements',
        caption: 'TERMINAL THEME (v1.1.0)',
      },
      {
        src: '/screenshots/madscope-light-theme.png',
        alt: 'MadScope Light theme — bright white surfaces with dark readable text and subtle borders',
        caption: 'LIGHT THEME (v1.1.0)',
      },
      {
        src: '/screenshots/madscope-issues.png',
        alt: 'MadScope issue detection — health 54/100 with overflow, clipping and touch-target findings per viewport',
        caption: 'ISSUE DETECTION',
      },
      {
        src: '/screenshots/madscope-mobile-diagnostics.png',
        alt: 'MadScope mobile inspection — real diagnostics listed per viewport with copy controls and an AI-ready report button',
        caption: 'DIAGNOSTICS + AI REPORT (v1.1.0)',
      },
      {
        src: '/screenshots/madscope-copy-report.png',
        alt: 'MadScope copy report — status feedback after copying the structured AI-ready inspection report',
        caption: 'AI-READY REPORT (v1.1.0)',
      },
      {
        src: '/screenshots/madscope-compare.png',
        alt: 'MadScope visual comparison — side-by-side, overlay opacity and before/after slider between viewport renders',
        caption: 'VISUAL COMPARISON',
      },
    ],
    gallery: {
      title: 'MadScope in action',
      intro: 'Screenshots from the real running application, grouped by build. Every image carries the exact version it represents — browse with Previous/Next, arrow keys or swipe, and click any screenshot to enlarge it.',
      groups: MADSCOPE_GALLERY,
    },
    hero: {
      src: '/screenshots/madscope-overview.png',
      alt: 'MadScope main interface — a responsive scan at mobile, tablet and desktop sizes with health score 100/100',
      caption: 'MADSCOPE v1.1.0',
    },
    showcase: [
      {
        label: 'SCAN',
        title: 'Enter URL, pick viewports, render',
        text: 'Type any URL — production or localhost — select presets or add a custom size, and MadScope renders each viewport in real Chromium with screenshots, timings and per-viewport results. The breakpoint ruler underneath shows where layout behavior is expected to change.',
        images: [
          {
            src: '/screenshots/madscope-overview.png',
            alt: 'MadScope scan results — three viewport renders with OK badges and load times',
            caption: 'SCAN — THREE VIEWPORTS',
          },
        ],
      },
      {
        label: 'ANALYZE',
        title: 'Potential issues and health score',
        text: 'Every render is analyzed for horizontal overflow, element overflow, clipped text, oversized images, small touch targets, overlaps and off-screen elements. Findings are honestly labeled as potential issues, and the deterministic 0–100 health score makes regressions obvious at a glance.',
        images: [
          {
            src: '/screenshots/madscope-issues.png',
            alt: 'MadScope issue list — six potential findings on mobile with severity labels and selectors',
            caption: 'ANALYZE — FINDINGS',
          },
        ],
      },
      {
        label: 'COMPARE',
        title: 'Diffs, baselines and regression',
        text: 'Compare renders side-by-side, as an overlay, or with a before/after slider. Save a baseline, change the site, and run the visual test: MadScope reports the changed-pixel percentage per viewport and fails the run — with a CI-friendly exit code — when the threshold is exceeded.',
        images: [
          {
            src: '/screenshots/madscope-compare.png',
            alt: 'MadScope comparison dialog with overlay opacity and slider controls',
            caption: 'COMPARE — OVERLAY + SLIDER',
          },
        ],
      },
      {
        label: 'THEMES',
        title: 'Three themes, yours to pick',
        text: 'A theme selector with exactly three choices: Default (the original dark design — its visible label was renamed from “Existing” in the post-v1.1.0 polish, while the internal id and saved preferences stay untouched), Terminal (near-black green-tinted charcoal, terminal-green accents, monospaced technical elements) and Light (bright surfaces, dark readable text, subtle borders). Switching is instant and the choice persists across restarts.',
        images: [
          {
            src: '/screenshots/madscope-existing-theme.png',
            alt: 'MadScope Default theme — the original dark design (v1.1.0 capture, when the label still read “Existing”)',
            caption: 'DEFAULT THEME (v1.1.0)',
          },
          {
            src: '/screenshots/madscope-terminal-theme.png',
            alt: 'MadScope Terminal theme — near-black green-tinted surfaces, terminal-green accents and monospaced technical elements',
            caption: 'TERMINAL THEME',
          },
          {
            src: '/screenshots/madscope-light-theme.png',
            alt: 'MadScope Light theme — bright white surfaces with dark readable text and subtle borders',
            caption: 'LIGHT THEME',
          },
        ],
      },
      {
        label: 'SHARE',
        title: 'Diagnostics you can hand to an AI agent',
        text: 'Every finding in the results is plain, selectable text with copy controls — copy one, tick checkboxes to copy selected, or copy all. The Copy AI report button produces a structured plain-text inspection report with only fields the engine really knows: URL, viewport, device profile, timestamp, health score and per-finding severity, selector and evidence. Paste it straight into a coding agent and it has everything needed to fix the issues.',
        images: [
          {
            src: '/screenshots/madscope-mobile-diagnostics.png',
            alt: 'MadScope mobile inspection — real diagnostics listed per viewport with checkboxes, copy buttons and the AI-ready report button',
            caption: 'SHARE — SELECTABLE DIAGNOSTICS',
          },
          {
            src: '/screenshots/madscope-copy-report.png',
            alt: 'MadScope copy report — status feedback after copying the structured AI-ready inspection report',
            caption: 'SHARE — AI-READY REPORT',
          },
        ],
      },
      {
        label: 'ABOUT',
        title: 'About MadScope, inside the app',
        text: 'A small About panel sits above the footer with everything a user needs to trust and find the project: a short description, the Madwolf Studios name linked to the official website, the source on GitHub, the actual app version, the MIT license linked to its text, and acknowledgments for the tools it is built on. Every value comes from the repository itself and is guarded by unit tests, and the panel renders correctly in all three themes.',
        images: [
          {
            src: '/screenshots/madscope-about-panel.png',
            alt: 'MadScope About panel — version, MIT license, Madwolf Studios website, GitHub repository and acknowledgments in the Default theme',
            caption: 'ABOUT MADSCOPE',
          },
        ],
      },
    ],
    technology: [
      'TypeScript',
      'React',
      'Tailwind CSS',
      'Tauri',
      'Playwright',
      'Chromium',
      'Vite',
      'Node.js',
    ],
    roadmap: [
      {
        title: 'Next',
        items: [
          'Parallel viewport rendering',
          'Authenticated sessions via storage state and cookies (secrets redacted from logs)',
          'GitHub Marketplace listing for the action',
        ],
      },
      {
        title: 'Later',
        items: [
          'Firefox and WebKit engines',
          'Device presets, network and CPU throttling',
          'Notarized macOS builds',
        ],
      },
    ],
  },
]

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured)
}
