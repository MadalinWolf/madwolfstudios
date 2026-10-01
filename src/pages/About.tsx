import type { ReactNode } from 'react'
import { ButtonLink } from '../components/Button'
import { PageHeader } from '../components/SectionHeader'
import { StatusBadge } from '../components/StatusBadge'
import { PlaceholderBox } from '../components/Placeholder'
import { GAMES } from '../data/games'
import { PROJECTS } from '../data/projects'
import { SITE } from '../data/site'
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

  return (
    <>
      <PageHeader
        eyebrow={`// ${SITE.founder.role} → ${SITE.name}`}
        title="ABOUT"
        description="Madwolf Studios is a one-person studio. This is the story behind it — built step by step, still being written."
      />

      <div className="mx-auto max-w-site space-y-12 px-5 py-14 sm:py-20">
        {/* 01 — INTRODUCTION */}
        <StorySection index="01" title="Introduction">
          <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-text-secondary sm:text-base">
            <p>
              Hey — I&apos;m <span className="text-neon-lemon">{SITE.founder.name}</span>, the
              developer behind {SITE.name}.
            </p>
          </div>
          <div className="mt-5 max-w-3xl">
            <PlaceholderBox label="PERSONAL INTRODUCTION — TO BE PROVIDED">
              A few words about who you are, what you do and what drives you as a developer will go
              here.
            </PlaceholderBox>
          </div>
        </StorySection>

        {/* 02 — WHY */}
        <StorySection index="02" title="Why I Started Madwolf Studios">
          <div className="max-w-3xl">
            <PlaceholderBox label="STORY — TO BE PROVIDED">
              The reason behind the studio — what pushed you to start building your own projects —
              will be told here.
            </PlaceholderBox>
          </div>
        </StorySection>

        {/* 03 — CURRENTLY BUILDING */}
        <StorySection index="03" title="What I'm Currently Building">
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
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-text-secondary">
            Everything currently in the works is listed above — follow the{' '}
            <Link to="/dev-log" className="link">
              dev log
            </Link>{' '}
            for progress updates.
          </p>
        </StorySection>

        {/* 04 — EDUCATION */}
        <StorySection index="04" title="Education">
          <div className="max-w-3xl">
            <PlaceholderBox label="EDUCATION — TO BE PROVIDED">
              Background in education will be added here.
            </PlaceholderBox>
          </div>
        </StorySection>

        {/* 05 — PROGRAMMING */}
        <StorySection index="05" title="Programming Experience">
          <div className="max-w-3xl">
            <PlaceholderBox label="EXPERIENCE — TO BE PROVIDED">
              Programming experience, technologies and how you got into code will be described here.
            </PlaceholderBox>
          </div>
        </StorySection>

        {/* 06 — GAME DEV */}
        <StorySection index="06" title="Game Development Experience">
          <div className="max-w-3xl">
            <PlaceholderBox label="EXPERIENCE — TO BE PROVIDED">
              Game development experience and how you entered game dev will be described here.
            </PlaceholderBox>
          </div>
        </StorySection>

        {/* 07 — BACKGROUND */}
        <StorySection index="07" title="Relevant Background">
          <div className="max-w-3xl">
            <PlaceholderBox label="BACKGROUND — TO BE PROVIDED">
              Any other relevant background worth mentioning will be added here.
            </PlaceholderBox>
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
