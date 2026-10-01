/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ---- DARK GREY structure (theme aware, driven by CSS variables) ----
        'app': 'rgb(var(--c-app) / <alpha-value>)',
        'surface': 'rgb(var(--c-surface) / <alpha-value>)',
        'panel': 'rgb(var(--c-panel) / <alpha-value>)',
        'panel-2': 'rgb(var(--c-panel-2) / <alpha-value>)',
        'input': 'rgb(var(--c-input) / <alpha-value>)',
        'line': 'rgb(var(--c-border) / <alpha-value>)',
        'hover': 'rgb(var(--c-hover) / <alpha-value>)',

        // ---- The only three accent colors of the brand ----
        'neon-lemon': '#CCFF00',
        'neon-green': '#00FF41',
        'neon-red': '#FF0000',

        // ---- Text tokens (dark greys / light greys, never white) ----
        'text-primary': 'rgb(var(--c-text-1) / <alpha-value>)',
        'text-secondary': 'rgb(var(--c-text-2) / <alpha-value>)',
        'text-muted': 'rgb(var(--c-text-3) / <alpha-value>)',
        'text-faint': 'rgb(var(--c-text-4) / <alpha-value>)',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        'site': '72rem',
      },
    },
  },
  // Drop Tailwind's default ring/placeholder plugins: they emit an inert
  // white/blue ring color and a grey placeholder that are off-palette here.
  // We never use `ring-*` / `placeholder-*` utilities (see src/index.css).
  corePlugins: {
    ring: false,
    ringColor: false,
    ringOffsetColor: false,
    ringOffsetWidth: false,
    ringWidth: false,
    placeholderColor: false,
  },
  plugins: [],
}
