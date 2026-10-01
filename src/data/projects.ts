import type { LinkId } from './links'
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

export interface RoadmapBlock {
  title: string
  items: string[]
}

export interface ProjectFaq {
  question: string
  /** null → renders a clearly marked "[ TO BE PROVIDED ]" answer slot. */
  answer: string | null
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
  features: ProjectFeature[]
  /** Q&A block for search/AI answer engines — factual answers only, null = TODO. */
  faq?: ProjectFaq[]
  screenshots: MediaSlot[]
  technology: string[]
  /** Empty array → renders a "to be provided" placeholder. */
  roadmap: RoadmapBlock[]
  /** Ids from src/data/links.ts shown as buttons (null urls → "— SOON"). */
  links: LinkId[]
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
      'WOLFCANI is an OnFocus Workspace — an all-in-one study workspace for students with tasks, subjects, calendar, exams and a focus timer. All data stays in your browser, organized per profile.',
    overview: [
      'WOLFCANI is an all-in-one study workspace designed to help students stay focused: tasks, subjects, topics, exams, calendar events and focused work sessions live together in one place, instead of scattered across different applications.',
      'It is local-first: everything runs in the browser and all data is stored locally, organized per profile, so multiple people can use the same installation with completely separate data.',
      'The aim is a personalized student workspace, not just a todo list.',
    ],
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
       feature list above. `answer: null` renders a visible "TO BE PROVIDED"
       slot: fill it in when the information is confirmed. */
    faq: [
      {
        question: 'What is WOLFCANI?',
        answer:
          'WOLFCANI is an OnFocus Workspace — an all-in-one study workspace built to hold everything a student juggles in one place: tasks, subjects, topics, exams, calendar events and focused work sessions.',
      },
      {
        question: 'Where does WOLFCANI store my data?',
        answer:
          'Locally in your browser. WOLFCANI runs fully in the browser with no backend: all data is stored in localStorage and organized per profile, so each profile keeps completely separate data.',
      },
      // TODO(madalin): pricing not confirmed — answer only once decided.
      { question: 'Is WOLFCANI free?', answer: null },
      // TODO(madalin): account/sign-up story not confirmed — do not infer from "no backend".
      { question: 'Does WOLFCANI require an account?', answer: null },
      // TODO(madalin): supported browsers / platforms not confirmed yet.
      { question: 'Which platforms does WOLFCANI run on?', answer: null },
    ],
    screenshots: [
      { alt: 'WOLFCANI dashboard — screenshot to be provided', caption: 'DASHBOARD' },
      { alt: 'WOLFCANI calendar view — screenshot to be provided', caption: 'CALENDAR' },
      { alt: 'WOLFCANI focus timer view — screenshot to be provided', caption: 'FOCUS TIMER' },
    ],
    technology: [
      'React 18',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'React Context',
      'localStorage (local-first, no backend)',
    ],
    roadmap: [],
    links: ['wolfcaniDemo', 'wolfcaniSource'],
  },
]

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured)
}
