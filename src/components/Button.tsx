import type { ReactNode } from 'react'
import { Link } from '../router'

interface ButtonLinkProps {
  to: string
  children: ReactNode
  variant?: 'primary' | 'ghost'
  className?: string
  /** true → opens in a new tab (use for external URLs). */
  external?: boolean
  'aria-label'?: string
}

/** Neon button. Internal by default; set external for out-of-site URLs. */
export function ButtonLink({
  to,
  children,
  variant = 'primary',
  className = '',
  external = false,
  ...rest
}: ButtonLinkProps) {
  const cls = `btn btn-${variant} ${className}`.trim()

  if (external) {
    return (
      <a className={cls} href={to} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    )
  }

  return (
    <Link className={cls} to={to} {...rest}>
      {children}
    </Link>
  )
}
