import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Single-page app with clean URLs (/projects, /games, /dev-log ...).
// In production every route is prerendered to a real HTML file by
// scripts/prerender.mjs (with per-page meta tags, see src/seo.ts) and
// unknown paths get a real 404 from dist/404.html. The dev server still
// falls back to index.html for all paths, which is what we want locally.
//
// Base path — where assets and internal links are anchored:
//   '/'                → served from a domain root (madwolfstudios.com, local
//                        preview). This is the default and the production value.
//   '/madwolfstudios/' → the temporary project Pages URL
//                        (https://madalinwolf.github.io/madwolfstudios/), used
//                        only while the GitHub Pages migration is verified
//                        BEFORE any DNS change. Selected by the VITE_BASE
//                        repository variable read in
//                        .github/workflows/deploy-pages.yml — delete that
//                        variable to go back to root-relative production URLs.
// Keep the normalisation below in sync with scripts/prerender.mjs.
const rawBase = process.env.VITE_BASE || '/'
const base = `/${rawBase.replace(/^\/+|\/+$/g, '')}/`.replace(/\/\/+$/, '/')

export default defineConfig({
  plugins: [react()],
  base,
  build: {
    // Never inline assets as data: URIs — the strict Content-Security-Policy
    // (netlify.toml) allows fonts from 'self' only, and every font should be
    // a real file under /assets/ (unicode-range keeps unused subsets lazy).
    assetsInlineLimit: 0,
  },
})
