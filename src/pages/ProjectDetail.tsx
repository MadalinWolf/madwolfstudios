import { type ReactNode } from 'react'
import { ButtonLink } from '../components/Button'
import { DevLogEntryCard } from '../components/DevLogEntry'
import { MediaSlotFrame, PlaceholderBox } from '../components/Placeholder'
import { PlatformLinks } from '../components/PlatformLinks'
import { Eyebrow } from '../components/SectionHeader'
import { FeatureStateBadge, StatusBadge } from '../components/StatusBadge'
import { getEntriesForProject } from '../data/devLog'
import type { Project } from '../data/projects'
import { FEATURE_STATE_META } from '../data/status'
import { Link } from '../router'

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  children: ReactNode
}) {
  return (
    <section className="border-t border-line pt-10" aria-labelledby={id}>
      <div className="mb-5">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={id} className="mt-2 text-xl font-extrabold uppercase tracking-wide text-neon-lemon sm:text-2xl">
          {title}
        </h2>
      </div>
      {children}
    </section>
  )
}

export function ProjectDetail({ project }: { project: Project }) {
  const entries = getEntriesForProject(project.slug)

  return (
    <div className="mx-auto max-w-site px-5 py-12 sm:py-16">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <Link
          to="/projects"
          className="text-[11px] font-bold uppercase tracking-[0.18em] text-text-muted hover:text-neon-green"
        >
          ← PROJECTS
        </Link>
      </nav>

      {/* Header */}
      <header>
        <div className="flex flex-wrap items-center gap-3">
          <span className="border border-line px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
            SOFTWARE
          </span>
          <StatusBadge status={project.status} />
        </div>

        <h1 className="mt-4 text-4xl font-extrabold uppercase tracking-tight text-neon-lemon text-glow-lemon sm:text-6xl">
          {project.name}
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
          {project.tagline}
        </p>

        <div className="mt-7">
          <PlatformLinks ids={project.links} />
        </div>
      </header>

      <div className="mt-12 space-y-12">
        {/* OVERVIEW */}
        <Section id="overview" eyebrow="// 01" title="Overview">
          <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-text-secondary sm:text-base">
            {project.overview.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </Section>

        {/* QUICK ANSWERS — plain Q&A for search engines and AI answer engines.
            Answers come from src/data/projects.ts and must stay factual. */}
        {project.faq && project.faq.length > 0 && (
          <Section id="faq" eyebrow="// 02" title="Quick Answers">
            <dl className="max-w-3xl space-y-4">
              {project.faq.map((item) => (
                <div key={item.question} className="card p-5">
                  <dt className="text-sm font-bold text-neon-lemon">{item.question}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {item.answer ?? (
                      <span className="placeholder-box inline-block px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-text-muted">
                        [ ANSWER — TO BE PROVIDED ]
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>
        )}

        {/* FEATURES */}
        <Section id="features" eyebrow="// 03" title="Features">
          {/* Legend */}
          <div className="mb-6 flex flex-wrap items-center gap-4 text-[10px] font-bold uppercase tracking-[0.16em] text-text-muted">
            <span>Legend:</span>
            {(Object.keys(FEATURE_STATE_META) as Array<keyof typeof FEATURE_STATE_META>).map(
              (state) => (
                <FeatureStateBadge key={state} state={state} />
              ),
            )}
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.features.map((feature) => (
              <li key={feature.name} className="card p-4">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-sm font-bold text-text-primary">{feature.name}</span>
                  <FeatureStateBadge state={feature.state} />
                </div>
                {feature.note && (
                  <p className="mt-2 text-xs leading-relaxed text-text-muted">{feature.note}</p>
                )}
              </li>
            ))}
          </ul>
        </Section>

        {/* SCREENSHOTS */}
        <Section id="screenshots" eyebrow="// 04" title="Screenshots">
          {project.screenshots.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {project.screenshots.map((slot, i) => (
                <MediaSlotFrame key={i} slot={slot} />
              ))}
            </div>
          ) : (
            <PlaceholderBox label="SCREENSHOTS — TO BE PROVIDED">
              Screenshots of the application will be published here.
            </PlaceholderBox>
          )}
        </Section>

        {/* DEVELOPMENT STATUS */}
        <Section id="status" eyebrow="// 05" title="Development Status">
          <div className="card p-6">
            <div className="flex flex-wrap items-center gap-4">
              <StatusBadge status={project.status} />
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-text-muted">
                Current status
              </span>
            </div>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-text-secondary">
              {project.name} is currently in development. Progress — what changed, what was
              learned and what&apos;s next — is published on the dev log.
            </p>
            <div className="mt-5">
              <Link
                to="/dev-log"
                className="text-[11px] font-bold uppercase tracking-[0.18em] text-neon-green hover:text-neon-lemon"
              >
                FOLLOW THE DEV LOG →
              </Link>
            </div>
          </div>
        </Section>

        {/* TECHNOLOGY */}
        <Section id="technology" eyebrow="// 06" title="Technology">
          <ul className="flex flex-wrap gap-3">
            {project.technology.map((tech) => (
              <li
                key={tech}
                className="border border-neon-lemon/40 bg-neon-lemon/5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-neon-lemon"
              >
                {tech}
              </li>
            ))}
          </ul>
        </Section>

        {/* ROADMAP */}
        <Section id="roadmap" eyebrow="// 07" title="Roadmap">
          {project.roadmap.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {project.roadmap.map((block) => (
                <div key={block.title} className="card p-6">
                  <h3 className="mb-3 text-sm font-extrabold uppercase tracking-[0.16em] text-neon-lemon">
                    {block.title}
                  </h3>
                  <ul className="space-y-2">
                    {block.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-sm leading-relaxed text-text-secondary"
                      >
                        <span className="text-neon-green" aria-hidden="true">
                          ▸
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <PlaceholderBox label="ROADMAP — TO BE PROVIDED">
              Planned milestones and future work will be listed here.
            </PlaceholderBox>
          )}
        </Section>

        {/* DEVELOPMENT UPDATES */}
        <Section id="updates" eyebrow="// 08" title="Development Updates">
          {entries.length > 0 ? (
            <div className="space-y-6">
              {entries.map((entry) => (
                <DevLogEntryCard key={entry.id} entry={entry} />
              ))}
            </div>
          ) : (
            <div className="space-y-5">
              <PlaceholderBox label="NO UPDATES PUBLISHED YET">
                Development updates for {project.name} will appear here once published on the dev
                log.
              </PlaceholderBox>
              <ButtonLink to="/dev-log" variant="ghost">
                OPEN DEV LOG
              </ButtonLink>
            </div>
          )}
        </Section>
      </div>
    </div>
  )
}
