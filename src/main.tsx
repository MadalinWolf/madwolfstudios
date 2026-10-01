import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import App from './App.tsx'
import '@fontsource-variable/jetbrains-mono'
import './index.css'

const root = document.getElementById('root')!

/*
 * Production pages are prerendered at build time (scripts/prerender.mjs).
 * If the server HTML is present we hydrate it; in dev (empty root) we render
 * from scratch. The 404 page is rendered with a fixed path, so it is
 * re-rendered client-side to avoid a hydration mismatch on arbitrary URLs.
 */
const prerendered = root.hasChildNodes() && root.dataset.prerender !== '404'

const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

if (prerendered) {
  hydrateRoot(root, app)
} else {
  root.replaceChildren()
  createRoot(root).render(app)
}
