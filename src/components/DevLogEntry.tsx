import type { DevLogEntry } from '../data/devLog'
import { Link } from '../router'
import { Zoomable } from './Lightbox'
import { ToneBadge } from './StatusBadge'

/*
 * One development journal entry.
 * Renders date · project · version, title, summary, detail bullets,
 * optional images and optional links.
 */
export function DevLogEntryCard({ entry, compact = false }: { entry: DevLogEntry; compact?: boolean }) {
  return (
    <article id={entry.id} className="card scroll-mt-24 p-6">
      {/* meta row */}
      <div className="mb-4 flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em]">
        <time dateTime={entry.date} className="text-text-muted">
          {entry.date}
        </time>
        <span className="text-text-faint" aria-hidden="true">
          //
        </span>
        {entry.projectSlug ? (
          <Link
            to={`/projects/${entry.projectSlug}`}
            className="border border-neon-lemon/50 bg-neon-lemon/10 px-2 py-0.5 text-neon-lemon"
          >
            {entry.project}
          </Link>
        ) : (
          <span className="border border-neon-lemon/50 bg-neon-lemon/10 px-2 py-0.5 text-neon-lemon">
            {entry.project}
          </span>
        )}
        {entry.version && <ToneBadge tone="neutral">{entry.version}</ToneBadge>}
      </div>

      <h3 className="text-lg font-extrabold uppercase tracking-wide text-neon-lemon sm:text-xl">
        {entry.title}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{entry.summary}</p>

      {!compact && entry.details.length > 0 && (
        <ul className="mt-4 space-y-2">
          {entry.details.map((line, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-text-secondary">
              <span className="mt-0.5 shrink-0 text-neon-green" aria-hidden="true">
                ▸
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      )}

      {entry.images && entry.images.length > 0 && (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {entry.images.map((img, i) => (
            <figure key={i} className="border border-line p-2">
              {img.src ? (
                <Zoomable src={img.src} alt={img.alt} caption={img.caption}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    width={800}
                    height={450}
                    loading="lazy"
                    className="h-auto w-full object-contain"
                  />
                </Zoomable>
              ) : (
                <div className="placeholder-box flex aspect-video flex-col items-center justify-center gap-2 p-6 text-center">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-neon-lemon">
                    [ AWAITING SCREENSHOT ]
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-text-muted">
                    No image provided yet
                  </span>
                </div>
              )}
              {img.caption && (
                <figcaption className="mt-2 text-[10px] uppercase tracking-[0.16em] text-text-muted">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}

      {entry.links && entry.links.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-3">
          {entry.links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link text-[11px] font-bold uppercase tracking-[0.16em]"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      )}
    </article>
  )
}
