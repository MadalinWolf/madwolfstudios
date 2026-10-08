/**
 * Prefix a root-absolute public path (e.g. '/screenshots/madscope-overview.png')
 * with the deployment base path so images resolve both on a domain root and on
 * the temporary GitHub Pages project URL ('/madwolfstudios/screenshots/...').
 * Absolute URLs (https:, data:, protocol-relative //) pass through unchanged.
 *
 * Keeps data files (src/data/*.ts) hosting-site-neutral: they store plain
 * '/screenshots/...' paths, the base is applied at render time.
 * See vite.config.ts for the base path itself.
 */
export function assetUrl(src: string): string {
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(src)) return src
  const base = import.meta.env.BASE_URL
  return `${base}${src.replace(/^\/+/, '')}`
}
