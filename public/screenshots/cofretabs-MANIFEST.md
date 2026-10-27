# CofreTabs screenshot manifest

Every CofreTabs image on this website is a capture of the real extension
interface. This file records how each one was produced, in the same spirit as
`preview-0141abc/MANIFEST.md` for MadScope.

## v1.1.0 captures (current release)

Captured 2026-10-26 from the v1.1.0 build (`dist/` produced by
`node scripts/build.mjs` from the `v1.1.0` tag, commit `729c500`).

Method — the project's own documented capture technique
(`docs/screenshots/README.md` in the CofreTabs repository):

- The real extension build was served over local HTTP and loaded in Chromium.
- The **library** captures are the real `src/library/library.html` page running
  the real `library.js`, the real `vault.js` and real IndexedDB, with only the
  three `chrome.*` APIs stubbed (`getManifest`, `sendMessage`, `tabs.create`)
  because a scripted visit cannot be an extension page.
- The **panel** captures are the real, unmodified `src/content/panel.js`
  (classic script, Shadow DOM) rendered on a local article fixture, with the
  `chrome.runtime` messaging answered by the real Vault in IndexedDB — the same
  documented mock used for the repository's original screenshots. Saving goes
  through the real `Vault.saveTab` write path.
- Demo data only: the URLs are well-known public sites used as fixtures
  (`github.com`, `bbc.co.uk`, `developer.mozilla.org`, `youtube.com`,
  `news.ycombinator.com`, `arxiv.org`, `jvns.ca`, `danluu.com`,
  `css-tricks.com`, `boring.tools`). No personal browsing data appears in any
  image.

| File | What it shows | Version |
| --- | --- | --- |
| `cofretabs-panel-v110.png` | Slide-over save panel: detected page, SAVE THIS TAB, 3×3 folder grid with Favorites, recent tabs with heart toggles | v1.1.0 |
| `cofretabs-panel-saved-v110.png` | Panel after a real save: write acknowledged, save complete → folder, duplicate notice, vault 10 tabs | v1.1.0 |
| `cofretabs-panel-light.png` | Panel in the light theme, already-saved page (duplicate detection) | v1.1.0 |
| `cofretabs-library-v110.png` | Library, dark theme: Favorites, custom folders (Read Later, Reference), MOVE controls, notes, theme switch, Trash count | v1.1.0 |
| `cofretabs-library-light.png` | Library, light theme | v1.1.0 |
| `cofretabs-favorites.png` | Favorites collection view (3 favorited tabs) | v1.1.0 |
| `cofretabs-search.png` | Search results for "vault" — 3 matches across title/URL/notes | v1.1.0 |
| `cofretabs-trash.png` | Trash view with RESTORE / DELETE actions and EMPTY TRASH | v1.1.0 |
| `cofretabs-import.png` | Import backup dialog: real backup file, validation preview, MERGE / REPLACE modes | v1.1.0 |

## v1.0.0 captures (repository originals)

Copied unchanged from the CofreTabs repository (`docs/screenshots/`, documented
in its `README.md`): captured in Chrome 155 headless via CDP
`Extensions.loadUnpacked` against the v1.0.0 build.

| File | What it shows | Version |
| --- | --- | --- |
| `cofretabs-panel.png` | Save panel in the review-before-save state | v1.0.0 |
| `cofretabs-panel-saved.png` | Panel after a simulated save acknowledgement | v1.0.0 |
| `cofretabs-library.png` | Library with demo tabs | v1.0.0 |

All images are PNG, unscaled captures (1× device pixel ratio). Product visuals
on the CofreTabs pages use these files only — no mockups, no stock imagery.
