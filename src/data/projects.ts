import type { DevelopmentStatus, FeatureState } from './status'

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
  /** Optional downloadable artifacts, grouped by operating system. */
  downloads?: { os: 'Windows' | 'macOS' | 'Linux'; arch: string; label: string; url: string; note?: string }[]
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
  technology: string[]
  /** Empty array → the roadmap section is hidden (no placeholder). */
  roadmap: RoadmapBlock[]
}

export const PROJECTS: Project[] = [
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
    featured: false,
    tagline: 'Local-first responsive testing and visual regression for developers.',
    seoTitle: 'MadScope — Responsive Website Testing & Visual Regression',
    seoDescription:
      'MadScope is a local-first responsive website testing and visual regression tool built with Playwright, Chromium, React, TypeScript and Tauri. Free and open source (MIT).',
    links: [{ label: 'VIEW ON GITHUB', url: 'https://github.com/MadalinWolf/MadScope' }],
    releaseVersion: 'v1.0.0',
    releaseUrl: 'https://github.com/MadalinWolf/MadScope/releases/tag/v1.0.0',
    actionUrl: 'https://github.com/MadalinWolf/madscope-action',
    downloads: [
      { os: 'Windows', arch: 'x64', label: 'MSI installer', url: 'https://github.com/MadalinWolf/MadScope/releases/download/v1.0.0/MadScope-1.0.0-windows-x64.msi' },
      { os: 'Windows', arch: 'x64', label: 'Setup wizard (EXE)', url: 'https://github.com/MadalinWolf/MadScope/releases/download/v1.0.0/MadScope-1.0.0-windows-x64-setup.exe' },
      { os: 'macOS', arch: 'Apple Silicon', label: 'DMG', url: 'https://github.com/MadalinWolf/MadScope/releases/download/v1.0.0/MadScope-1.0.0-macos-arm64.dmg', note: 'Unsigned: right-click → Open on first launch.' },
      { os: 'macOS', arch: 'Intel', label: 'DMG', url: 'https://github.com/MadalinWolf/MadScope/releases/download/v1.0.0/MadScope-1.0.0-macos-x64.dmg', note: 'Unsigned: right-click → Open on first launch.' },
      { os: 'Linux', arch: 'x64', label: 'AppImage', url: 'https://github.com/MadalinWolf/MadScope/releases/download/v1.0.0/MadScope-1.0.0-linux-x64.AppImage', note: 'Portable: chmod +x, then run.' },
      { os: 'Linux', arch: 'x64', label: 'DEB package', url: 'https://github.com/MadalinWolf/MadScope/releases/download/v1.0.0/MadScope-1.0.0-linux-x64.deb', note: 'Debian / Ubuntu.' },
    ],
    overview: [
      'MadScope renders any URL in real Chromium across multiple viewport sizes, captures screenshots, flags potential responsive issues, scores the page, and catches visual regressions — all locally, with no account and no telemetry.',
      'It was built to replace the manual routine of resizing the browser and eyeballing layouts: enter a URL (including localhost while you develop), pick viewports, and get real renders, screenshots, findings and a deterministic health score in seconds.',
      'The same core engine powers three surfaces: a desktop UI, a command-line interface for terminals and CI, and a local render server. Baselines saved today can be re-tested tomorrow — or on every pull request — with pixel-level diffs and a pass/fail exit code.',
    ],
    statusNote:
      'MadScope v0.1.0 is released as free open-source software (MIT) at github.com/MadalinWolf/MadScope. The core engine, desktop UI, CLI, visual regression and automated tests all work today. Next up: a GitHub Action with artifact upload, authenticated-session support, Firefox/WebKit engines and native Tauri installers.',
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
      { name: 'Type-safe configuration', state: 'implemented', note: 'madscope.config.ts with validation and human-readable errors' },
      { name: 'Breakpoint ruler', state: 'implemented', note: 'Common breakpoints shown under every scan' },
      { name: 'GitHub Action', state: 'planned', note: 'Consumer workflow template ships in the repo; marketplace action after validation' },
      { name: 'Authenticated sessions', state: 'planned', note: 'Storage state / cookies with secret redaction' },
      { name: 'Firefox + WebKit engines', state: 'planned' },
      { name: 'Native installers', state: 'planned', note: 'Tauri bundles for Windows, macOS and Linux' },
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
        src: '/screenshots/madscope-issues.png',
        alt: 'MadScope issue detection — health 54/100 with overflow, clipping and touch-target findings per viewport',
        caption: 'ISSUE DETECTION',
      },
      {
        src: '/screenshots/madscope-compare.png',
        alt: 'MadScope visual comparison — side-by-side, overlay opacity and before/after slider between viewport renders',
        caption: 'VISUAL COMPARISON',
      },
    ],
    hero: {
      src: '/screenshots/madscope-overview.png',
      alt: 'MadScope main interface — a responsive scan at mobile, tablet and desktop sizes with health score 100/100',
      caption: 'MADSCOPE v0.1.0',
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
          'GitHub Action with screenshot and diff artifact upload',
          'Authenticated sessions via storage state and cookies (secrets redacted from logs)',
          'Parallel viewport rendering',
        ],
      },
      {
        title: 'Later',
        items: [
          'Firefox and WebKit engines',
          'Device presets, network and CPU throttling',
          'Native Tauri installers for Windows, macOS and Linux',
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
