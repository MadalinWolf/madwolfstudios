import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react'

/* =========================================================
   Minimal client-side router (no dependencies).
   Clean URLs: /, /projects, /projects/wolfcani, /games, ...
   In production every route is a real prerendered HTML file
   (scripts/prerender.mjs); unknown paths get a real 404 page.
   Trailing-slash and /index.html variants are normalized.
   ========================================================= */

function readPath(): string {
  if (typeof window === 'undefined') return '/'
  const raw = window.location.pathname.replace(/\/index\.html$/, '').replace(/\/+$/, '')
  return raw === '' ? '/' : raw
}

interface RouterValue {
  path: string
  navigate: (to: string) => void
}

const RouterContext = createContext<RouterValue | null>(null)

export function RouterProvider({
  children,
  initialPath,
}: {
  children: ReactNode
  /** Build-time prerendered path — the browser default is window.location. */
  initialPath?: string
}) {
  const [path, setPath] = useState(() => initialPath ?? readPath())

  useEffect(() => {
    const onPopState = () => setPath(readPath())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = useCallback((to: string) => {
    const hashIndex = to.indexOf('#')
    const targetPath = (hashIndex >= 0 ? to.slice(0, hashIndex) : to).replace(/\/+$/, '') || '/'
    const hash = hashIndex >= 0 ? to.slice(hashIndex + 1) : ''

    if (targetPath !== readPath()) {
      window.history.pushState({}, '', to)
      setPath(readPath())
      window.scrollTo({ top: 0 })
      return
    }

    // Same page: handle in-page anchors.
    if (hash) {
      const el = document.getElementById(hash)
      if (el) {
        window.history.replaceState({}, '', `#${hash}`)
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>
}

export function useRoute(): RouterValue {
  const ctx = useContext(RouterContext)
  if (!ctx) throw new Error('useRoute must be used within <RouterProvider>')
  return ctx
}

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string
}

/** Internal link — plain <a href> semantics, client-side navigation on click. */
export function Link({ to, onClick, children, ...rest }: LinkProps) {
  const { navigate } = useRoute()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented) return
    // Let the browser handle modified clicks (new tab / window / download).
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    navigate(to)
  }

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
