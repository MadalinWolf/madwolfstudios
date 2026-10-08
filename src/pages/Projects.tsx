import { ButtonLink } from '../components/Button'
import { MediaSlotFrame } from '../components/Placeholder'
import { PageHeader } from '../components/SectionHeader'
import { StatusBadge } from '../components/StatusBadge'
import { PROJECTS, type Project } from '../data/projects'

/* Every project gets the same full-width feature card: name, status,
   tagline, overview, feature chips, CTA and lead screenshot. No project
   is visually demoted to a secondary block. */
function FeatureCard({ project }: { project: Project }) {
  return (
    <article className="card grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
      <div>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="border border-line px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
            SOFTWARE
          </span>
          <StatusBadge status={project.status} />
        </div>

        <h2 className="text-3xl font-extrabold uppercase tracking-tight text-neon-lemon sm:text-4xl">
          {project.name}
        </h2>

        <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-text-muted">
          {project.tagline}
        </p>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-text-secondary">
          {project.overview.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.features.slice(0, 10).map((feature) => (
            <li
              key={feature.name}
              className="border border-line px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-text-muted"
            >
              {feature.name}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-4">
          <ButtonLink to={`/projects/${project.slug}`}>VIEW PROJECT</ButtonLink>
        </div>
      </div>

      {project.screenshots[0] && (
        <MediaSlotFrame slot={project.screenshots[0]} />
      )}
    </article>
  )
}

export function Projects() {
  return (
    <>
      <PageHeader
        eyebrow="// SOFTWARE"
        title="PROJECTS"
        description="Software projects built at Madwolf Studios."
      />

      <div className="mx-auto max-w-site space-y-14 px-5 py-14 sm:py-20">
        {PROJECTS.map((project) => (
          <FeatureCard key={project.slug} project={project} />
        ))}
      </div>
    </>
  )
}
