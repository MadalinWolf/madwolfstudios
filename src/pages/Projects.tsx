import { ButtonLink } from '../components/Button'
import { MediaSlotFrame } from '../components/Placeholder'
import { ProjectCard } from '../components/ProjectCard'
import { PageHeader } from '../components/SectionHeader'
import { StatusBadge } from '../components/StatusBadge'
import { getFeaturedProjects, PROJECTS } from '../data/projects'

export function Projects() {
  const featured = getFeaturedProjects()
  const rest = PROJECTS.filter((p) => !p.featured)
  const [first] = featured

  return (
    <>
      <PageHeader
        eyebrow="// SOFTWARE"
        title="PROJECTS"
        description="Software projects built at Madwolf Studios."
      />

      <div className="mx-auto max-w-site px-5 py-14 sm:py-20">
        {/* Featured project — the first entry of the PROJECTS array */}
        {first && (
          <article className="card grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="border border-line px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
                  FEATURED · SOFTWARE
                </span>
                <StatusBadge status={first.status} />
              </div>

              <h2 className="text-3xl font-extrabold uppercase tracking-tight text-neon-lemon sm:text-4xl">
                {first.name}
              </h2>

              <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-text-muted">
                {first.tagline}
              </p>

              <div className="mt-5 space-y-4 text-sm leading-relaxed text-text-secondary">
                {first.overview.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              <ul className="mt-6 flex flex-wrap gap-2">
                {first.features.slice(0, 10).map((feature) => (
                  <li
                    key={feature.name}
                    className="border border-line px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-text-muted"
                  >
                    {feature.name}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-4">
                <ButtonLink to={`/projects/${first.slug}`}>VIEW PROJECT</ButtonLink>
              </div>
            </div>

            {first.screenshots[0] && (
              <MediaSlotFrame slot={first.screenshots[0]} />
            )}
          </article>
        )}

        {/* Remaining projects (hidden until more are added to the data file) */}
        {rest.length > 0 && (
          <section className="mt-14" aria-label="More projects">
            <h2 className="mb-6 border-b border-line pb-3 text-xl font-extrabold uppercase tracking-wide text-neon-lemon">
              More Projects
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
