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
]

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured)
}
