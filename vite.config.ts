import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Single-page app with clean URLs (/projects, /games, /dev-log ...).
// In production every route is prerendered to a real HTML file by
// scripts/prerender.mjs (with per-page meta tags, see src/seo.ts) and
// unknown paths get a real 404 from dist/404.html. The dev server still
// falls back to index.html for all paths, which is what we want locally.
export default defineConfig({
  plugins: [react()],
  build: {
    // Never inline assets as data: URIs — the strict Content-Security-Policy
    // (netlify.toml) allows fonts from 'self' only, and every font should be
    // a real file under /assets/ (unicode-range keeps unused subsets lazy).
    assetsInlineLimit: 0,
  },
})
