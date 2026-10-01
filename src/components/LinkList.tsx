import { LINKS, type LinkId } from '../data/links'

/*
 * Vertical list of external links (contact page style).
 * Live links are clickable; null urls render as "— SOON".
 */
export function LinkList({ ids }: { ids: LinkId[] }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {ids.map((id) => {
        const { label, url } = LINKS[id]

        return (
          <li key={id} className="flex items-center justify-between gap-4 py-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-neon-lemon">
              {label}
            </span>

            {url ? (
              (() => {
                const external = /^https?:\/\//.test(url)
                return (
                  <a
                    className="link text-xs font-bold uppercase tracking-[0.14em] sm:text-sm"
                    href={url}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    OPEN ↗
                  </a>
                )
              })()
            ) : (
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-text-muted">
                — SOON
              </span>
            )}
          </li>
        )
      })}
    </ul>
  )
}
