import { useEffect, useState } from 'react'
import { NAV_ITEMS, SITE } from '../data/site'
import { Link, useRoute } from '../router'
import { ThemeToggle } from './ThemeToggle'

function isActive(path: string, itemPath: string): boolean {
  if (itemPath === '/') return path === '/'
  return path === itemPath || path.startsWith(`${itemPath}/`)
}

export function Navbar() {
  const { path } = useRoute()
  const [open, setOpen] = useState(false)

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false)
  }, [path])

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-site items-center justify-between gap-4 px-5">
        {/* Brand */}
        <Link
          to="/"
          className="group flex items-center gap-3"
          aria-label="MW MADWOLF STUDIOS — home page"
        >
          <span className="flex h-9 w-9 items-center justify-center border border-neon-lemon text-sm font-extrabold text-neon-lemon transition-glow group-hover:glow-lemon">
            {SITE.monogram}
          </span>{' '}
          <span className="text-[13px] font-extrabold tracking-[0.16em] text-neon-lemon sm:text-sm sm:tracking-[0.2em]">
            {SITE.shortName}{' '}
            <span className="font-medium text-text-muted">STUDIOS</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = isActive(path, item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                aria-current={active ? 'page' : undefined}
                className={`border-b-2 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] transition-colors ${
                  active
                    ? 'border-neon-green text-neon-green'
                    : 'border-transparent text-text-secondary hover:text-neon-lemon'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
          <span className="mx-2 h-6 w-px bg-line" aria-hidden="true" />
          <ThemeToggle />
        </nav>

        {/* Mobile / tablet controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex h-9 w-9 items-center justify-center border border-line text-text-secondary hover:border-neon-green hover:text-neon-green"
          >
            <span aria-hidden="true">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
              >
                {open ? (
                  <path d="M3 3 L13 13 M13 3 L3 13" />
                ) : (
                  <path d="M2 4 H14 M2 8 H14 M2 12 H14" />
                )}
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          id="mobile-menu"
          className="border-t border-line bg-surface px-5 pb-4 lg:hidden"
        >
          <ul className="divide-y divide-line">
            {NAV_ITEMS.map((item) => {
              const active = isActive(path, item.path)
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    aria-current={active ? 'page' : undefined}
                    className={`block border-l-2 py-3 pl-3 text-xs font-bold uppercase tracking-[0.18em] ${
                      active
                        ? 'border-neon-green text-neon-green'
                        : 'border-transparent text-text-secondary hover:text-neon-lemon'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Theme switch lives in the drawer so the top bar always fits */}
          <div className="flex items-center justify-between pt-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
              Theme
            </span>
            <ThemeToggle compact />
          </div>
        </nav>
      )}
    </header>
  )
}
