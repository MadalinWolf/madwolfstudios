import { renderToString } from 'react-dom/server'
import App from './App'
import { buildHeadHtml, buildSitemapXml, PRERENDER_PATHS } from './seo'

/* =========================================================
   Server entry — used ONLY by scripts/prerender.mjs at build
   time to write static HTML for every route (see src/seo.ts).
   Never imported by the browser bundle.
   ========================================================= */

export function render(url: string): { html: string; head: string } {
  return {
    html: renderToString(<App initialPath={url} />),
    head: buildHeadHtml(url),
  }
}

export { PRERENDER_PATHS, buildSitemapXml }
