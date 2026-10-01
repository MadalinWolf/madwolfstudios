import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Single-page app with clean URLs (/projects, /games, /dev-log ...).
// Dev server and `vite preview` handle SPA fallback automatically.
// For static hosting, see `public/_redirects` (Netlify / Cloudflare Pages)
// or configure an equivalent rewrite to /index.html on your host.
export default defineConfig({
  plugins: [react()],
})
