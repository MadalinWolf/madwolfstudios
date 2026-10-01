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
  /** Path to a real screenshot (e.g. '/screenshots/stusys-dashboard.png').
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
    slug: 'stusys',
    name: 'Stusys',
    kind: 'software',
    status: 'in-development',
    featured: true,
    tagline: 'Student productivity / Student OS application.',
    seoTitle: 'Stusys — Local-First Student Productivity App',
    seoDescription:
      'Stusys is a local-first student productivity application — a "Student OS" with tasks, subjects, calendar, exams and a focus timer. All data stays in your browser, organized per profile.',
    overview: [
      'Stusys is a student productivity application — a "Student OS" built to hold everything a student juggles in one place: tasks, subjects, topics, exams, calendar events and focused work sessions.',
      'It is local-first: everything runs in the browser and all data is stored locally, organized per profile, so multiple people can use the same installation with completely separate data.',
      'The aim is a personalized student workspace, not just a todo list.',
    ],
    features: [
      { name: 'Multiple profiles with isolated data', state: 'implemented', note: 'Profile selection with per-profile tasks, subjects, calendar, exams, focus sessions and settings' },
      { name: 'Task management', state: 'implemented', note: 'Priorities, due dates, categories, tags, subtasks and completion tracking' },
      { name: 'Subjects with topics & progress', state: 'implemented' },
      { name: 'Calendar with events', state: 'implemented', note: 'Month view with study, exam, deadline and reminder events' },
      { name: 'Exams with countdowns', state: 'implemented' },
      { name: 'Focus / Pomodoro timer', state: 'implemented', note: 'Pomodoro-style focus/break timer with session history' },
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
        question: 'What is Stusys?',
        answer:
          'Stusys is a student productivity application — a "Student OS" built to hold everything a student juggles in one place: tasks, subjects, topics, exams, calendar events and focused work sessions.',
      },
      {
        question: 'Where does Stusys store my data?',
        answer:
          'Locally in your browser. Stusys runs fully in the browser with no backend: all data is stored in localStorage and organized per profile, so each profile keeps completely separate data.',
      },
      // TODO(madalin): pricing not confirmed — answer only once decided.
      { question: 'Is Stusys free?', answer: null },
      // TODO(madalin): account/sign-up story not confirmed — do not infer from "no backend".
      { question: 'Does Stusys require an account?', answer: null },
      // TODO(madalin): supported browsers / platforms not confirmed yet.
      { question: 'Which platforms does Stusys run on?', answer: null },
    ],
    screenshots: [
      {
        src: '/screenshots/stusys-dashboard.png',
        alt: 'Stusys student productivity dashboard',
        caption: 'DASHBOARD',
      },
      { alt: 'Stusys calendar view — screenshot to be provided', caption: 'CALENDAR' },
      { alt: 'Stusys focus timer view — screenshot to be provided', caption: 'FOCUS TIMER' },
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
    links: ['stusysDemo', 'stusysSource'],
  },
]

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured)
}
