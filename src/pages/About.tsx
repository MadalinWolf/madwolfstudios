import type { ReactNode } from 'react'
import { ButtonLink } from '../components/Button'
import { PageHeader } from '../components/SectionHeader'
import { StatusBadge } from '../components/StatusBadge'
import { GAMES } from '../data/games'
import { PROJECTS } from '../data/projects'
import { SITE } from '../data/site'
import { TECH_STATUSES, TECHNOLOGIES, TECHNOLOGY_INTRO, type Technology } from '../data/technologies'
import { Link } from '../router'

/* A "chapter" in the studio story — numbered rail on the left. */
function StorySection({
  index,
  title,
  children,
}: {
  index: string
  title: string
  children: ReactNode
}) {
  return (
    <section className="grid gap-6 border-t border-line pt-10 sm:grid-cols-[7rem_1fr]" aria-labelledby={`story-${index}`}>
      <div>
        <span className="text-sm font-extrabold tracking-[0.2em] text-neon-lemon">// {index}</span>
      </div>
      <div>
        <h2
          id={`story-${index}`}
          className="mb-4 text-xl font-extrabold uppercase tracking-wide text-neon-lemon sm:text-2xl"
        >
          {title}
        </h2>
        {children}
      </div>
    </section>
  )
}

/* One labelled group of education facts in the Education section. */
function EducationGroup({ label, items }: { label: string; items: { label: string; text: string }[] }) {
  return (
    <div className="card h-full p-5">
      <span className="block text-[11px] font-extrabold uppercase tracking-[0.24em] text-neon-green">
        {label}
      </span>
      <ul className="mt-3 space-y-3">
        {items.map((item) => (
          <li key={item.label} className="text-sm leading-relaxed text-text-secondary">
            <strong className="block text-text-primary">{item.label}</strong>
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* Monochrome technology mark. Logos paint in the current text color so no
   brand color reaches the screen; "cutout" shapes are masked out and show
   the card surface instead (keeps eyes/details intact with a single color).
   Tools without a usable monochrome logo get a two-letter monogram, in the
   same spirit as the MW badge in the navbar. */
function TechGlyph({ tech }: { tech: Technology }) {
  const { glyph } = tech

  if (glyph.monogram) {
    return (
      <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-line text-[9px] font-extrabold tracking-[0.06em] text-text-secondary transition-colors group-hover:border-neon-green/60 group-hover:text-text-primary">
        {glyph.monogram}
      </span>
    )
  }

  const maskId = `tech-${tech.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

  return (
    <svg
      viewBox={glyph.viewBox}
      aria-hidden="true"
      focusable="false"
      className="h-7 w-7 shrink-0 fill-current text-text-secondary transition-colors group-hover:text-text-primary"
    >
      {glyph.cutouts && (
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
            <rect x="0" y="0" width="100%" height="100%" fill="#fff" />
            {glyph.cutouts.map((d) => (
              <path key={d} d={d} fill="#000" />
            ))}
          </mask>
        </defs>
      )}
      <g mask={glyph.cutouts ? `url(#${maskId})` : undefined}>
        {glyph.paths.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      {glyph.overlay?.map((d) => <path key={d} d={d} />)}
    </svg>
  )
}

/* One tile of the technology ecosystem: mark, name, qualitative status and
   a single line of honest context — never a skill claim. */
function TechCard({ tech }: { tech: Technology }) {
  const status = TECH_STATUSES[tech.status]

  return (
    <li className="card group flex h-full flex-col items-center gap-2 p-4 text-center">
      <TechGlyph tech={tech} />
      <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-text-primary">
        {tech.name}
      </span>
      <span
        className={`flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.18em] ${status.color}`}
      >
        <span className="h-1.5 w-1.5 bg-current" aria-hidden="true" />
        {status.label}
      </span>
      <span className="text-[10px] leading-snug text-text-muted">{tech.note}</span>
    </li>
  )
}

export function About() {
  const currentBuilds = [
    ...PROJECTS.map((p) => ({
      name: p.name,
      status: p.status,
      path: `/projects/${p.slug}`,
      tagline: p.tagline,
    })),
    ...GAMES.map((g) => ({
      name: g.name,
      status: g.status,
      path: `/games/${g.slug}`,
      tagline: g.tagline,
    })),
  ]

  const educationGroups = [
    {
      label: 'Formal education',
      items: [
        {
          label: 'TAFAD',
          text: 'Physical activity and sports — from the years I spent working in the fitness industry.',
        },
        {
          label: 'DAM',
          text: 'Desarrollo de Aplicaciones Multiplataforma: my software development studies, in progress.',
        },
      ],
    },
    {
      label: 'Continuing education',
      items: [
        {
          label: 'Public-sector IT preparation',
          text: 'Studying for the Spanish public-sector IT opposition — preparation, not a position.',
        },
        {
          label: 'Online courses',
          text: 'freeCodeCamp, Coursera, bootcamp-style training, documentation and tutorials.',
        },
      ],
    },
    {
      label: "What I'm exploring",
      items: [
        {
          label: 'Independent study',
          text: 'Python, Java, artificial intelligence, machine learning, Git and automation.',
        },
        {
          label: 'Learning by building',
          text: 'Small scripts and utilities for my own use — experiments while I learn.',
        },
      ],
    },
  ]

  /* The legend only shows the states actually present in the grid. */
  const presentStatuses = [...new Set(TECHNOLOGIES.map((tech) => tech.status))]

  return (
    <>
      <PageHeader
        eyebrow={`// ${SITE.founder.role} → ${SITE.name}`}
        title="ABOUT"
        description="Madwolf Studios is a one-person studio. This is the story behind it — who I am, what I'm building now, and how I work."
      />

      <div className="mx-auto max-w-site space-y-12 px-5 py-14 sm:py-20">
        {/* 01 — INTRODUCTION */}
        <StorySection index="01" title="Introduction">
          <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-text-secondary sm:text-base">
            <p>
              Hey — I&apos;m{' '}
              <span className="text-neon-lemon">{SITE.founder.name}</span>, an independent
              developer and the person behind {SITE.name}.
            </p>
            <p>
              I&apos;ve been interested in computers, games and creating things since I was a kid.
              After spending years away from programming, I found my way back to technology and
              decided to take it seriously.
            </p>
            <p>
              Today I&apos;m focused on learning, building and experimenting through my own
              projects — including{' '}
              <strong className="text-text-primary">WOLFCANI</strong>, an OnFocus Workspace for
              students, and <strong className="text-text-primary">No Respawn in War</strong>, a
              game currently in development.
            </p>
          </div>
        </StorySection>

        {/* 02 — HOW IT STARTED */}
        <StorySection index="02" title="How It Started">
          <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-text-secondary sm:text-base">
            <p>My programming experience started long before I considered myself a developer.</p>
            <p>
              As a kid, I learned basic HTML by opening websites, looking at their source code and
              trying to understand how they worked. I&apos;d take what I found, experiment with it
              and build my own versions.
            </p>
            <p>
              Years later, I started learning programming seriously — a combination of formal
              education and self-study. The interest had been there the whole time; this time I
              committed to it.
            </p>
          </div>
        </StorySection>

        {/* 03 — WHAT I'M BUILDING */}
        <StorySection index="03" title="What I'm Building">
          <ul className="grid max-w-3xl gap-4 sm:grid-cols-2">
            {currentBuilds.map((build) => (
              <li key={build.path}>
                <Link to={build.path} className="card block h-full p-5">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-base font-extrabold uppercase tracking-wide text-neon-lemon">
                      {build.name}
                    </span>
                    <StatusBadge status={build.status} />
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-text-muted">{build.tagline}</p>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-5 max-w-3xl space-y-4 text-sm leading-relaxed text-text-secondary">
            <p>
              <strong className="text-text-primary">WOLFCANI</strong> is a student-focused
              workspace: tasks, subjects, topics, exams, calendar events and focus sessions in one
              place, with a separate workspace for each student. It&apos;s the project I&apos;ve
              taken furthest so far, and the one I&apos;ve learned the most from.
            </p>
            <p>
              <strong className="text-text-primary">No Respawn in War</strong> is an independent
              game currently in development, created as a tribute to those affected by wars and
              conflicts around the world. More information about the project will be shared soon.
            </p>
            <p>
              Progress on both is written up in the{' '}
              <Link to="/dev-log" className="link">
                dev log
              </Link>
              .
            </p>
          </div>
        </StorySection>

        {/* 04 — HOW I WORK */}
        <StorySection index="04" title="How I Work">
          <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-text-secondary sm:text-base">
            <p>
              Before technology, I spent several years in the fitness industry — eventually
              managing gyms and leading teams.
            </p>
            <p>
              That taught me responsibility, solving problems while they are happening, making
              decisions under pressure and working with people. It also taught me that things
              rarely go the way you plan, and that you keep going anyway.
            </p>
          </div>
          <div className="card mt-5 max-w-3xl p-5 sm:p-6">
            <p className="text-sm leading-relaxed text-text-primary sm:text-base">
              I don&apos;t see that experience as separate from what I&apos;m doing now. Building
              software is another kind of problem solving — you start with something that
              doesn&apos;t work, figure out why, and keep working until it does.
            </p>
          </div>
        </StorySection>

        {/* 05 — EDUCATION */}
        <StorySection index="05" title="Education">
          <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-text-secondary sm:text-base">
            <p>
              Formal education gave me the structure. Independent learning and my own projects
              are how I keep going beyond the curriculum.
            </p>
            <p>
              This isn&apos;t a finished list of qualifications — it&apos;s an ongoing process:
              studying, preparing and building, all at the same time.
            </p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {educationGroups.map((group) => (
              <EducationGroup key={group.label} label={group.label} items={group.items} />
            ))}
          </div>

          <div className="card mt-4 max-w-3xl p-5">
            <span className="block text-[11px] font-extrabold uppercase tracking-[0.24em] text-neon-lemon">
              Possible next step
            </span>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              I&apos;m also exploring the possibility of beginning university studies in
              Artificial Intelligence through the UNED in Madrid. I haven&apos;t started —
              it&apos;s a direction I&apos;m considering, not a degree I&apos;m enrolled in.
            </p>
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-text-muted">
            The next section is what all of this looks like in practice: the tools I actually
            work with.
          </p>
        </StorySection>

        {/* 06 — TECHNOLOGIES */}
        <StorySection index="06" title="Technologies">
          <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-text-secondary sm:text-base">
            <p>{TECHNOLOGY_INTRO}</p>
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[10px]">
            {presentStatuses.map((status) => {
              const meta = TECH_STATUSES[status]
              return (
                <li key={status} className="flex items-center gap-2">
                  <span
                    className={`flex items-center gap-1.5 font-extrabold uppercase tracking-[0.18em] ${meta.color}`}
                  >
                    <span className="h-1.5 w-1.5 bg-current" aria-hidden="true" />
                    {meta.label}
                  </span>
                  <span className="text-text-muted">— {meta.description}</span>
                </li>
              )
            })}
          </ul>

          <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {TECHNOLOGIES.map((tech) => (
              <TechCard key={tech.name} tech={tech} />
            ))}
          </ul>
        </StorySection>

        {/* 07 — NOW */}
        <StorySection index="07" title="Now">
          <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-text-secondary sm:text-base">
            <p>
              Madwolf Studios is still small and still being written — one problem at a time, in
              public, through the{' '}
              <Link to="/dev-log" className="link">
                dev log
              </Link>
              .
            </p>
            <p>
              I know what I can do, and I know there is a lot left to learn. Right now that means
              heads down on WOLFCANI and No Respawn in War.
            </p>
          </div>
        </StorySection>

        {/* CTA */}
        <div className="flex flex-wrap gap-4 border-t border-line pt-10">
          <ButtonLink to="/projects">EXPLORE PROJECTS</ButtonLink>
          <ButtonLink to="/contact" variant="ghost">
            GET IN TOUCH
          </ButtonLink>
        </div>
      </div>
    </>
  )
}
