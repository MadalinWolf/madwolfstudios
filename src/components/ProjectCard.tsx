import type { Project } from '../data/projects'
import { StatusBadge } from './StatusBadge'
import { Link } from '../router'

/* Card used on the home page and the /projects index. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card group flex flex-col p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className="border border-line px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
          SOFTWARE
        </span>
        <StatusBadge status={project.status} />
      </div>

      <h3 className="text-xl font-extrabold uppercase tracking-wide text-neon-lemon">
        {project.name}
      </h3>

      <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-text-muted">
        {project.tagline}
      </p>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-text-secondary">
        {project.overview[0]}
      </p>

      <Link
        to={`/projects/${project.slug}`}
        className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-neon-green group-hover:text-neon-lemon"
        aria-label={`${project.name} — VIEW PROJECT →`}
      >
        VIEW PROJECT <span aria-hidden="true">→</span>
      </Link>
    </article>
  )
}
