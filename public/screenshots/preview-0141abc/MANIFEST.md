# MadScope screenshot manifest — preview build · commit 0141abc

| Field | Value |
| --- | --- |
| Application version (package) | 1.1.0 — **unreleased preview build, not a published release** |
| Source commit | 0141abc63025d803dbb10a7946720ec0d64591a8 (checkout that produced the screenshots) |
| CI installer build | a607336 — GitHub Actions run 38136476510; app code byte-identical to this checkout (0141abc only added SECURITY_AUDIT.md) |
| Captured at | 2026-10-11T17:46:10.804Z |
| Environment | Running from source (UI :1420, engine :4220); the CI installer was NOT executed (no isolated Windows VM available) |
| Scan target | https://madwolfstudios.com/projects/madscope/ (public site) |
| Error target | http://127.0.0.1:53211/ (closed local port — no external traffic) |
| Framing | 1440×900 @1x, version badge “PREVIEW BUILD · 0141abc” bottom-right of every image |

| File | Title | Shows |
| --- | --- | --- |
| `01-main-interface.png` | Main interface & viewport analysis | URL bar, viewport presets, responsive health score and three live Chromium renders (mobile, tablet, desktop). |
| `02-diagnostics-details.png` | Diagnostic results & details | Per-viewport potential issues with concrete element details, copy buttons and the health score breakdown. |
| `03-mobile-diagnostics.png` | Mobile viewport diagnostics | Findings for the Mobile 390×844 viewport — overflow, touch-target and clipping checks on a real page. |
| `04-copy-all-errors.png` | Copyable diagnostics | Copy all errors puts every finding on the clipboard as plain text, with inline status feedback. |
| `05-copy-ai-report.png` | AI-ready inspection report | One click copies the structured, selectable inspection report for handing findings to a coding agent. |
| `06-error-details.png` | Useful error details | When a page cannot load, MadScope reports the exact browser error and concrete next steps. |
| `07-theme-default.png` | Theme: Default | The original MadScope design — now labelled Default (same theme, same saved preferences). |
| `08-theme-terminal.png` | Theme: Terminal | Near-black green-tinted surfaces, terminal-green accents, monospaced technical elements. |
| `09-theme-light.png` | Theme: Light | Bright white surfaces with dark readable text — for daylight work. |
| `10-about-panel.png` | About MadScope | Version, MIT license, Madwolf Studios and GitHub links, acknowledgments and keyboard shortcuts. |

No capture problems recorded.

## Verification (same day, scripted)

- All 10 images pixel-checked: 1440x900, non-blank (luminance stddev 22-92), version badge present bottom-right of every image. Details: `verification.json`.
- Copy flows re-measured on the running app: "Copied 36 diagnostics." status confirmed; clipboard received the structured diagnostics text; AI-ready report copied (10,619 chars, ends with "END OF REPORT").
- Environment: application running from source at this commit; Kaspersky (avp.exe) active throughout; the CI installer was NOT executed (no isolated Windows VM available).
