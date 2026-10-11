/*
 * Screenshot gallery data for the MadScope project page.
 *
 * Groups are keyed by the build they represent; slides carry a visible
 * version label so no image can be mistaken for another build:
 *  - preview-0141abc: captured from the running application at commit
 *    0141abc (app code identical to CI build a607336, run 38136476510).
 *    Unreleased — NOT a published release. Manifest:
 *    /screenshots/preview-0141abc/MANIFEST.md
 *  - release-v1.1.0: the published v1.1.0 release build.
 *
 * Keep filenames and titles identical to MANIFEST.md — checked by
 * scripts/verify-gallery.mjs.
 */
import type { GalleryGroup } from './projects'

export const MADSCOPE_GALLERY: GalleryGroup[] = [
  {
    id: 'preview-0141abc',
    versionLabel: 'Preview build · commit 0141abc',
    note: 'Captured 2026-10-11 from the real application running at this commit — unreleased preview, not a published release. The matching installers were built in GitHub Actions run 38136476510.',
    slides: [
      {
        src: '/screenshots/preview-0141abc/01-main-interface.png',
        title: 'Main interface & viewport analysis',
        text: 'URL bar, viewport presets, responsive health score and three live Chromium renders — mobile, tablet and desktop.',
        alt: 'MadScope main interface after a scan: URL bar, viewport presets, responsive health 72/100 and three live viewport renders of a public website',
      },
      {
        src: '/screenshots/preview-0141abc/02-diagnostics-details.png',
        title: 'Diagnostic results & details',
        text: 'Per-viewport potential issues with concrete element details, copy buttons and the health score breakdown.',
        alt: 'MadScope diagnostic results listing per-viewport potential issues with element-level details and copy buttons',
      },
      {
        src: '/screenshots/preview-0141abc/03-mobile-diagnostics.png',
        title: 'Mobile viewport diagnostics',
        text: 'Findings for the Mobile 390×844 viewport — overflow, touch-target and clipping checks on a real page.',
        alt: 'MadScope mobile viewport diagnostics: overflow, touch-target and clipping findings for the Mobile 390 by 844 viewport',
      },
      {
        src: '/screenshots/preview-0141abc/04-copy-all-errors.png',
        title: 'Copyable diagnostics',
        text: 'Copy all errors puts every finding on the clipboard as plain text, with inline status feedback.',
        alt: 'MadScope results panel showing the status message Copied 36 diagnostics after pressing Copy all errors',
      },
      {
        src: '/screenshots/preview-0141abc/05-copy-ai-report.png',
        title: 'AI-ready inspection report',
        text: 'One click copies the structured, selectable inspection report for handing findings to a coding agent.',
        alt: 'MadScope results panel showing confirmation that the AI-ready inspection report was copied to the clipboard',
      },
      {
        src: '/screenshots/preview-0141abc/06-error-details.png',
        title: 'Useful error details',
        text: 'When a page cannot load, MadScope reports the exact browser error and concrete next steps.',
        alt: 'MadScope error alert for an unreachable local server showing the exact ERR_CONNECTION_REFUSED browser error and suggested next steps',
      },
      {
        src: '/screenshots/preview-0141abc/07-theme-default.png',
        title: 'Theme: Default',
        text: 'The original MadScope design — now labelled Default (same theme, same saved preferences).',
        alt: 'MadScope interface in the Default theme, the original dark design with lemon-yellow accents',
      },
      {
        src: '/screenshots/preview-0141abc/08-theme-terminal.png',
        title: 'Theme: Terminal',
        text: 'Near-black green-tinted surfaces, terminal-green accents, monospaced technical elements.',
        alt: 'MadScope interface in the Terminal theme with near-black green-tinted surfaces and terminal-green accents',
      },
      {
        src: '/screenshots/preview-0141abc/09-theme-light.png',
        title: 'Theme: Light',
        text: 'Bright white surfaces with dark readable text — for daylight work.',
        alt: 'MadScope interface in the Light theme with bright white surfaces and dark readable text',
      },
      {
        src: '/screenshots/preview-0141abc/10-about-panel.png',
        title: 'About MadScope',
        text: 'Version, MIT license, Madwolf Studios and GitHub links, acknowledgments and keyboard shortcuts.',
        alt: 'MadScope About panel showing version, MIT license, Madwolf Studios and GitHub links, acknowledgments and keyboard shortcuts',
      },
    ],
  },
  {
    id: 'release-v1.1.0',
    versionLabel: 'Release v1.1.0',
    note: 'The published v1.1.0 release build. The theme shown as “Existing” in these images is the released name — it is labelled Default in the preview build above.',
    slides: [
      {
        src: '/screenshots/madscope-overview.png',
        title: 'Main interface',
        text: 'URL bar, viewport picker, responsive health score and three live viewport renders.',
        alt: 'MadScope main interface — URL bar, viewport picker, responsive health 100/100 and three live viewport renders',
      },
      {
        src: '/screenshots/madscope-existing-theme.png',
        title: 'Theme: Existing (released name)',
        text: 'The original dark design, the default theme of the v1.1.0 release.',
        alt: 'MadScope Existing theme — the original dark design, still the default in v1.1.0',
      },
      {
        src: '/screenshots/madscope-terminal-theme.png',
        title: 'Theme: Terminal',
        text: 'Near-black green-tinted surfaces, terminal-green accents and monospaced technical elements.',
        alt: 'MadScope Terminal theme — near-black green-tinted surfaces, terminal-green accents and monospaced technical elements',
      },
      {
        src: '/screenshots/madscope-light-theme.png',
        title: 'Theme: Light',
        text: 'Bright white surfaces with dark readable text and subtle borders.',
        alt: 'MadScope Light theme — bright white surfaces with dark readable text and subtle borders',
      },
      {
        src: '/screenshots/madscope-issues.png',
        title: 'Issue detection',
        text: 'Health score with overflow, clipping and touch-target findings per viewport.',
        alt: 'MadScope issue detection — health 54/100 with overflow, clipping and touch-target findings per viewport',
      },
      {
        src: '/screenshots/madscope-mobile-diagnostics.png',
        title: 'Diagnostics + AI report',
        text: 'Real diagnostics listed per viewport with copy controls and an AI-ready report button.',
        alt: 'MadScope mobile inspection — real diagnostics listed per viewport with copy controls and an AI-ready report button',
      },
      {
        src: '/screenshots/madscope-copy-report.png',
        title: 'AI-ready report',
        text: 'Status feedback after copying the structured AI-ready inspection report.',
        alt: 'MadScope copy report — status feedback after copying the structured AI-ready inspection report',
      },
      {
        src: '/screenshots/madscope-compare.png',
        title: 'Visual comparison',
        text: 'Side-by-side, overlay opacity and before/after slider between viewport renders.',
        alt: 'MadScope visual comparison — side-by-side, overlay opacity and before/after slider between viewport renders',
      },
    ],
  },
]
