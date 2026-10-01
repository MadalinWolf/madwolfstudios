import { LINKS, type LinkId } from '../data/links'

/*
 * Row of platform buttons: STEAM — SOON, DISCORD — SOON, ITCH.IO — SOON …
 * Links come from src/data/links.ts — set a `url` there and the button
 * becomes a real, clickable link everywhere at once.
 */
export function PlatformLinks({ ids, className = '' }: { ids: LinkId[]; className?: string }) {
  if (ids.length === 0) return null

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {ids.map((id) => {
        const { label, url } = LINKS[id]

        if (!url) {
          return (
            <span key={id} className="btn btn-soon text-[11px]" aria-disabled="true">
              {label} — SOON
            </span>
          )
        }

        const external = /^https?:\/\//.test(url)
        return (
          <a
            key={id}
            className="btn btn-ghost text-[11px]"
            href={url}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {label} ↗
          </a>
        )
      })}
    </div>
  )
}
