import { useEffect, useState, type ReactNode } from 'react'
import { ButtonLink } from '../components/Button'
import { Zoomable } from '../components/Lightbox'
import { MediaSlotFrame, PlaceholderBox } from '../components/Placeholder'
import { Eyebrow } from '../components/SectionHeader'
import { FeatureStateBadge, StatusBadge } from '../components/StatusBadge'
import { assetUrl } from '../asset'
import type { MediaSlot, Project } from '../data/projects'
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

/*
 * Hero product screenshot — the first real image on the page, shown at
 * natural aspect ratio directly after the overview. Click opens the lightbox.
 */
function HeroShot({ slot }: { slot: MediaSlot }) {
  if (!slot.src) return null
  return (
    <figure className="card p-3 sm:p-4">
      <Zoomable src={slot.src} alt={slot.alt} caption={slot.caption}>
        <img src={assetUrl(slot.src)} alt={slot.alt} className="w-full h-auto border border-line" />
      </Zoomable>
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neon-lemon">
          [ {slot.caption || 'SCREENSHOT'} ]
        </span>
        <span className="text-[10px] uppercase tracking-[0.14em] text-text-muted">
          Captured from the running application — click to enlarge
        </span>
      </figcaption>
    </figure>
  )
}

/*
 * Download — platform-grouped links to the real GitHub Release assets.
 * The visitor's OS group is highlighted (never hidden: every platform stays
 * visible under "Other downloads" semantics). UA sniffing is best-effort:
 * Apple Silicon vs Intel cannot be told apart from the UA, so both macOS
 * builds are shown highlighted to Mac visitors.
 */
function DownloadBlock({ project }: { project: Project }) {
  const [visitorOs, setVisitorOs] = useState<string | null>(null)
  useEffect(() => {
    const ua = navigator.userAgent
    if (/Windows NT/.test(ua)) setVisitorOs('Windows')
    else if (/Mac OS X/.test(ua)) setVisitorOs('macOS')
    else if (/Linux/.test(ua)) setVisitorOs('Linux')
  }, [])

  const groups = (['Windows', 'macOS', 'Linux'] as const)
    .map((os) => ({ os, items: (project.downloads ?? []).filter((d) => d.os === os) }))
    .filter((g) => g.items.length > 0)
  if (groups.length === 0) return null

  return (
    <div>
      {project.releaseVersion && (
        <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.18em] text-text-muted">
          Latest release:{' '}
          <span className="text-neon-lemon">{project.releaseVersion}</span>
        </p>
      )}
      <div className="grid gap-6 md:grid-cols-3">
        {groups.map((group) => {
          const mine = visitorOs === group.os
          return (
            <div
              key={group.os}
              className={`card p-5 ${mine ? 'border-neon-green' : ''}`}
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-extrabold uppercase tracking-[0.16em] text-neon-lemon">
                  {group.os}
                </h3>
                {mine && (
                  <span className="border border-neon-green px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-neon-green">
                    Your system
                  </span>
                )}
              </div>
              <ul className="space-y-4">
                {group.items.map((item) => (
                  <li key={item.url}>
                    <ButtonLink to={item.url} external aria-label={`Download MadScope for ${item.os} ${item.arch} — ${item.label}`}>
                      {item.label} ↓
                    </ButtonLink>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-text-muted">
                      {item.arch}
                      {item.note ? ` · ${item.note}` : ''}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
      {project.releaseUrl && (
        <p className="mt-5 text-xs text-text-muted">
          <a
            href={project.releaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold uppercase tracking-[0.14em] text-neon-green hover:text-neon-lemon"
          >
            All files + checksums →
          </a>
        </p>
      )}
    </div>
  )
}

export function ProjectDetail({ project }: { project: Project }) {  /* Sections are numbered in render order so optional sections (FAQ,
     roadmap, …) never leave a gap in the // 0N eyebrows. */
  let sectionNo = 0
  const eyebrow = () => `// 0${(sectionNo += 1)}`

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

        {project.links && project.links.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-4">
            {project.links.map((link) => (
              <ButtonLink key={link.url} to={link.url} external>
                {link.label} ↗
              </ButtonLink>
            ))}
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
              OPEN SOURCE · MIT
            </span>
          </div>
        )}
      </header>

      <div className="mt-12 space-y-12">
        {/* OVERVIEW */}
        <Section id="overview" eyebrow={eyebrow()} title="Overview">
          <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-text-secondary sm:text-base">
            {project.overview.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </Section>

        {/* HERO SCREENSHOT — real UI immediately after the introduction */}
        {project.hero?.src && <HeroShot slot={project.hero} />}

        {/* DOWNLOAD — real release assets, only when the project ships them */}
        {project.downloads && project.downloads.length > 0 && (
          <Section id="download" eyebrow={eyebrow()} title="Download">
            <DownloadBlock project={project} />
          </Section>
        )}

        {/* AUTOMATE — CI integration, only when an action exists */}
        {project.actionUrl && (
          <Section id="automate" eyebrow={eyebrow()} title="Automate with GitHub Actions">
            <div className="card max-w-3xl p-6">
              <p className="text-sm leading-relaxed text-text-secondary">
                Run MadScope automatically in your CI pipeline to catch
                responsive and visual regressions before they reach
                production.
              </p>
              <div className="mt-5">
                <ButtonLink to={project.actionUrl} external aria-label="Use MadScope with GitHub Actions">
                  MADSCOPE ACTION ↗
                </ButtonLink>
              </div>
            </div>
          </Section>
        )}

        {/* WHAT'S INCLUDED */}
        <Section id="features" eyebrow={eyebrow()} title="What's Included">
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

        {/* INSIDE — themed screenshot showcase (falls back to the plain grid) */}
        <Section id="inside" eyebrow={eyebrow()} title={`Inside ${project.name}`}>
          {project.showcase && project.showcase.length > 0 ? (
            <div className="space-y-6">
              {project.showcase.map((block) => {
                const single = block.images.length === 1
                const gridCols =
                  block.images.length === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'
                return (
                  <article key={block.label} className="card p-5 sm:p-6">
                    <div
                      className={
                        single ? 'grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr]' : undefined
                      }
                    >
                      <div>
                        <Eyebrow>{`// ${block.label}`}</Eyebrow>
                        <h3 className="mt-2 text-lg font-extrabold uppercase tracking-wide text-neon-lemon sm:text-xl">
                          {block.title}
                        </h3>
                        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text-secondary">
                          {block.text}
                        </p>
                      </div>
                      {single && <MediaSlotFrame slot={block.images[0]} aspect="aspect-auto" />}
                    </div>
                    {!single && (
                      <div className={`mt-5 grid gap-4 ${gridCols}`}>
                        {block.images.map((slot, i) => (
                          <MediaSlotFrame
                            key={i}
                            slot={slot}
                            aspect="aspect-[3/2]"
                            gallery={block.images}
                          />
                        ))}
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
          ) : project.screenshots.length > 0 ? (
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

        {/* QUICK ANSWERS — plain Q&A for search engines and AI answer engines.
            Answers come from src/data/projects.ts and must stay factual. */}
        {project.faq && project.faq.length > 0 && (
          <Section id="faq" eyebrow={eyebrow()} title="Quick Answers">
            <dl className="max-w-3xl space-y-4">
              {project.faq.map((item) => (
                <div key={item.question} className="card p-5">
                  <dt className="text-sm font-bold text-neon-lemon">{item.question}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {item.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>
        )}

        {/* DEVELOPMENT STATUS */}
        <Section id="status" eyebrow={eyebrow()} title="Development Status">
          <div className="card p-6">
            <div className="flex flex-wrap items-center gap-4">
              <StatusBadge status={project.status} />
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-text-muted">
                Current status
              </span>
            </div>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-text-secondary">
              {project.statusNote ??
                `${project.name} is currently in development. Progress — what changed, what was learned and what's next — is published on the dev log.`}
            </p>
          </div>
        </Section>

        {/* TECHNOLOGY */}
        <Section id="technology" eyebrow={eyebrow()} title="Technology">
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

        {/* ROADMAP — only when real milestones exist (no placeholder boxes) */}
        {project.roadmap.length > 0 && (
          <Section id="roadmap" eyebrow={eyebrow()} title="Roadmap">
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
          </Section>
        )}

        {/* DEVELOPMENT — small connection to the dev log (no duplication) */}
        <Section id="development" eyebrow={eyebrow()} title="Development">
          <div className="card max-w-3xl p-6">
            <p className="text-sm leading-relaxed text-text-secondary">
              {project.name} is actively developed at Madwolf Studios. Development progress is
              documented through the Dev Log — new features, improvements, technical decisions and
              lessons learned.
            </p>
            <div className="mt-5">
              <ButtonLink to="/dev-log" variant="ghost">
                VIEW DEV LOG →
              </ButtonLink>
            </div>
          </div>
        </Section>
      </div>
    </div>
  )
}
