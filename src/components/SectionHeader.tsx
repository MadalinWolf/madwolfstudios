import type { ReactNode } from 'react'

/* Small uppercase label in lemon — the studio's category/eyebrow style. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-neon-lemon">
      {children}
    </span>
  )
}

/* Section header: eyebrow + heading + optional rule. */
export function SectionHeader({
  eyebrow,
  title,
  action,
  id,
}: {
  eyebrow?: string
  title: string
  action?: ReactNode
  id?: string
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-4">
      <div>
        {eyebrow && (
          <div className="mb-2">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
        )}
        <h2 id={id} className="text-2xl font-extrabold uppercase tracking-wide text-neon-lemon sm:text-3xl">
          {title}
        </h2>
      </div>
      {action}
    </div>
  )
}

/* Page header used at the top of every inner page. */
export function PageHeader({
  eyebrow,
  title,
  description,
  badge,
}: {
  eyebrow?: string
  title: string
  description?: string
  badge?: ReactNode
}) {
  return (
    <header className="border-b border-line bg-surface grid-bg">
      <div className="mx-auto max-w-site px-5 py-12 sm:py-16">
        {eyebrow && (
          <div className="mb-3">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
        )}
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="text-3xl font-extrabold uppercase tracking-tight text-neon-lemon sm:text-5xl">
            {title}
          </h1>
          {badge}
        </div>
        {description && (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
            {description}
          </p>
        )}
      </div>
    </header>
  )
}
