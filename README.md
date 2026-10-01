# Madwolf Studios — Website

Official website of **Madwolf Studios** — independent developer building apps, games and software from idea to reality.

- Domain: https://madwolfstudios.com
- GitHub: https://github.com/MadalinWolf

Standalone project (React 18 + TypeScript + Vite 6 + Tailwind CSS 3). No backend, no database, no CMS — content lives in plain data files under `src/data/`.

## Commands

Requirements: Node.js + npm.

```bash
npm install        # install dependencies
npm run dev        # dev server → http://localhost:5173
npm run build      # type-check + production build → dist/
npm run preview    # serve the production build locally
```

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
| **Add a Dev Log entry**                 | `src/data/devLog.ts` — copy the template in the file header into the `DEV_LOG` array. Sorted by date automatically; home page, `/dev-log` and project/game pages all update by themselves. |
| **Add / edit a project (e.g. Stusys)**  | `src/data/projects.ts`            |
| **Add / edit a game**                   | `src/data/games.ts`               |
| **Change studio name, tagline, nav, founder** | `src/data/site.ts`           |
| **Add a nav item / page**               | `src/data/site.ts` (nav) + `src/App.tsx` (route) |

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

The site uses clean URLs via client-side routing. `vite dev` and `vite preview` handle this out of the box. On a static host, configure a rewrite of all routes to `/index.html`:

- **Netlify / Cloudflare Pages** — included: `public/_redirects`
- **Vercel** — add `vercel.json` with `{"rewrites": [{"source": "/(.*)", "destination": "/index.html"}]}`
- **GitHub Pages** — no SPA fallback available; use a host with rewrites or ask for a hash-router variant.

## Content rules

No invented biography, education, technologies, features, platforms, release dates or statistics. Anything not yet provided renders as a clearly marked **placeholder** or a **“— SOON”** link.
