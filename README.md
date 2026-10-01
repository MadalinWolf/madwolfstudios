# Madwolf Studios — Website

Official website of **Madwolf Studios** — independent developer building apps, games and software from idea to reality.

- Domain: https://madwolfstudios.com
- GitHub: https://github.com/MadalinWolf

Standalone project (React 18 + TypeScript + Vite 6 + Tailwind CSS 3). No backend, no database, no CMS — content lives in plain data files under `src/data/`.

## Commands

Requirements: Node.js + npm.

```bash
npm install              # install dependencies
npm run dev              # dev server → http://localhost:5173
npm run build            # type-check + production build + prerender → dist/
npm run preview          # plain Vite preview (SPA fallback — not representative of Netlify)
npm run preview:netlify  # Netlify-like server on http://localhost:4180
                         #   (real 404s, trailing-slash 301s, production headers)
```

`npm run build` finishes with `scripts/prerender.mjs`, which writes a real HTML
file for every route (with per-page `<title>`, meta description, canonical URL,
Open Graph tags and — on the homepage — Organization/Person JSON-LD), plus a
real `dist/404.html` and `dist/sitemap.xml`. Crawlers and link previews get
full content without running JavaScript.

## Pages

| Route                | Page                                        |
| -------------------- | ------------------------------------------- |
| `/`                  | Home (hero, selected projects, about, dev log, contact) |
| `/projects`          | Projects index                              |
| `/projects/stusys`   | Stusys project page                         |
| `/games`             | Games index                                 |
| `/games/no-respawn-in-war` | No Respawn in War game page          |
| `/about`             | About the founder / studio                  |
| `/dev-log`           | Development journal                         |
| `/contact`           | Contact                                      |
| anything else        | 404                                          |

## Where to edit what

Everything editable lives in **`src/data/`** — you should never need to touch components to add content:

| I want to…                              | Edit this file                    |
| --------------------------------------- | --------------------------------- |
| **Replace Steam / Discord / itch.io / email links** | `src/data/links.ts` ← **the one link config.** Set `url` and the link goes live everywhere at once; keep `null` and it renders as “LABEL — SOON”. |
| **Add a Dev Log entry**                 | `src/data/devLog.ts` — copy the template in the file header into the `DEV_LOG` array. Sorted by date automatically; home page, `/dev-log` and project/game pages all update by themselves. While the array is empty, `/dev-log` is automatically `noindex` (and excluded from the sitemap). |
| **Add / edit a project (e.g. Stusys)**  | `src/data/projects.ts`            |
| **Add / edit a game**                   | `src/data/games.ts`               |
| **Change titles, meta descriptions, social tags** | `src/seo.ts` — the single source for per-route `<title>`/description/canonical/OG tags. Detail pages read the optional `seoTitle` / `seoDescription` fields on their data entry. |
| **Add the social preview image**        | Drop a 1200×630 PNG in `public/` and set `OG_IMAGE` in `src/seo.ts` (currently a documented `null` TODO). |
| **Change studio name, tagline, nav, founder** | `src/data/site.ts`           |
| **Add a nav item / page**               | `src/data/site.ts` (nav) + `src/App.tsx` (route) + `src/seo.ts` (metadata) + `PRERENDER_PATHS` if it should be prerendered |

### Adding content — examples

**A real link (e.g. Steam):**

```ts
// src/data/links.ts
steam: { label: 'STEAM', url: 'https://steamprofiles.com/your-page' },
```

**A Dev Log entry:**

```ts
// src/data/devLog.ts — inside the DEV_LOG array
{
  id: 'stusys-calendar',
  date: '2026-02-10',
  project: 'STUSYS',
  projectSlug: 'stusys',
  version: 'v0.2.5',
  title: 'Calendar System',
  summary: 'One-line summary of the update.',
  details: ['Added the new calendar system', 'Added event creation', 'Next: improve navigation'],
},
```

**A screenshot:** drop the file into `public/` (e.g. `public/screenshots/stusys-dashboard.png`) and set `src` on the matching media slot in `src/data/projects.ts` / `games.ts`. Without a `src`, a clearly marked placeholder frame is rendered — no fake screenshots.

## Design system

| Token   | Hex       | Usage                                    |
| ------- | --------- | ---------------------------------------- |
| Lemon   | `#CCFF00` | headings, categories, important info     |
| Green   | `#00FF41` | active / positive / primary / completed  |
| Red     | `#FF0000` | errors, warnings, destructive, urgent    |

Everything else is **dark grey shades** — no white, no pure black, no blue/purple/pink/orange/cyan/teal, no other accent colors. Both themes (`night` / `light`, toggled in the navbar, persisted in `localStorage`) respect this system; tokens live in `src/index.css`.

## Hosting

Every route is a **real static HTML file** after `npm run build` — there is no
catch-all rewrite, so unknown URLs return a genuine **HTTP 404** (served from
`dist/404.html`, which Netlify picks up automatically) instead of a soft-404.

**Netlify** — configured in `netlify.toml`:

- build: `npm run build`, publish: `dist/`, Node 22
- security headers: CSP (first-party only), HSTS, `X-Frame-Options: DENY`,
  `nosniff`, `Referrer-Policy`, `Permissions-Policy`
- long-lived caching for content-hashed `/assets/*`
- canonical URLs use a trailing slash (`/projects/`) because Netlify's Pretty
  URLs (on by default) redirects `/projects` → `/projects/` — see `src/seo.ts`

Other static hosts work the same way as long as they serve `directory/index.html`
and `404.html`. `npm run preview:netlify` reproduces the Netlify behavior locally
so routing can be checked before deploying.

## Content rules

No invented biography, education, technologies, features, platforms, release dates or statistics. Anything not yet provided renders as a clearly marked **placeholder** or a **“— SOON”** link.
