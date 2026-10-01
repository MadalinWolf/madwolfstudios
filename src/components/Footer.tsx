import { FOOTER_LINK_IDS, LINKS } from '../data/links'
import { NAV_ITEMS, SITE } from '../data/site'
import { Link } from '../router'
import { PlatformLinks } from './PlatformLinks'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-site gap-10 px-5 py-12 md:grid-cols-3">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center border border-neon-lemon text-sm font-extrabold text-neon-lemon">
              {SITE.monogram}
            </span>
            <span className="text-sm font-extrabold tracking-[0.2em] text-neon-lemon">
              {SITE.name}
            </span>
          </div>
          <p className="mt-4 max-w-xs text-xs leading-relaxed text-text-secondary">{SITE.tagline}</p>
          <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-text-muted">
            Created by{' '}
            <span className="text-neon-lemon">{SITE.founder.name}</span>
          </p>
          <div className="mt-4">
            <a
              href={LINKS.github.url!}
              target="_blank"
              rel="noopener noreferrer"
              className="link text-[11px] font-bold uppercase tracking-[0.16em]"
            >
              GitHub ↗
            </a>
          </div>
        </div>

        {/* Navigation */}
        <nav>
          <h2 className="mb-4 text-[11px] font-bold uppercase tracking-[0.24em] text-neon-lemon">
            Sitemap
          </h2>
          <ul className="space-y-2.5">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="text-xs font-bold uppercase tracking-[0.16em] text-text-secondary hover:text-neon-green"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Platforms */}
        <div>
          <h2 className="mb-4 text-[11px] font-bold uppercase tracking-[0.24em] text-neon-lemon">
            Platforms
          </h2>
          <PlatformLinks ids={FOOTER_LINK_IDS} className="gap-2.5" />
          <p className="mt-4 text-[11px] leading-relaxed text-text-muted">
            More ways to follow the studio coming soon.
          </p>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-site flex-col items-start justify-between gap-2 px-5 py-5 text-[10px] font-bold uppercase tracking-[0.16em] text-text-muted sm:flex-row sm:items-center">
          <span>
            © {year} {SITE.name}
          </span>
          <span className="text-text-muted">{SITE.domain.replace('https://', '')}</span>
        </div>
      </div>
    </footer>
  )
}
