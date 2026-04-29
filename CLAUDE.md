# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repo hosts **robertdams.com** — Robert's personal CV site (Scrum Master positioning) — deployed via GitHub Pages. There is no build system; changes go live by pushing to `master`. A `.nojekyll` file disables Jekyll processing.

- **Root (`/`)** — Single-page CV site. Default branch: `master`. Custom domain: `robertdams.com` (see `CNAME`).
- **`/experience`** — Five employer detail pages (alten, asml, baxter, koma, pinkroccade) linked from the CV's vertical timeline.
- **`motivatiebrief.html`** — Standalone Dutch cover letter page (kept `noindex`, separate inline styling — does not share `assets/style.css`).
- **`/portfolio`** — Legacy code from an earlier portfolio site. Not linked from the active CV. Kept as reference material; may be mined for content later.

The **freelance/company site** (formerly at this repo's root) now lives in a separate repo: [`Robert-Dams-Development/robert-dams-development.github.io`](https://github.com/Robert-Dams-Development/robert-dams-development.github.io) → served at `damsdevelopment.nl` (with `damsdevelopment.com` redirecting to `.nl`). Do **not** add cross-links between the two sites.

## Development

No build tools or package managers. Preview locally by opening `index.html` in a browser. Deployment is automatic via GitHub Pages on push to `master`.

## Architecture

### CV site (root)

- **[index.html](index.html)** — Single-page CV. Section order: Hero → Profile (bg-alt, colleague tags) → Photo Banner → Experience (vertical timeline, 5 entries, expandable) → How I Work (bg-alt) → Testimonial → Sprint Health Check → Skills (bg-alt) → Projects → Certifications (bg-alt) → Personal Details → Footer
- **[assets/style.css](assets/style.css)** — Base design system. CSS custom properties for theming (`--bg`, `--text`, `--accent`, etc.); dark navy default (`#0d1520`), light mode (`#f7f8fa`) via `[data-theme="light"]`; blue accent `#4f8ef7`.
- **[cv.css](cv.css)** — CV-specific overrides and extensions on top of `assets/style.css`. Includes `@media print` block for 1.5-page reference sheet.
- **[cv.js](cv.js)** — Lang/theme toggle, scroll reveal, scroll progress bar, vertical timeline expand/collapse, nav scroll-spy, sprint health check, `window.print()` for PDF.
- **[assets/photo.jpg](assets/photo.jpg)** — Profile photo.

**Key CV design decisions:**
- Hero label: "Scrum Master" only. Green PDF button calls `window.print()` — browser saves as PDF.
- Vertical timeline: all 5 entries visible at a glance. SM callout always shown; technical details in collapsible `.vtl-expandable`. PinkRoccade starts expanded.
- Progressive dot sizing: `--sm` 18px → `--current` 24px with accent fill.
- Dutch default, EN toggle via same `data-nl`/`data-en` system used by the freelance site.
- Print stylesheet hides: nav, scroll-progress, colleague-tags, photo-banner, sprint-check, how-i-work, projects, footer. Shows compact experience (SM callouts only), skills, credentials, personal details.
- **No `noindex`** on the CV (it is the personal site at robertdams.com; meant to be discoverable). `motivatiebrief.html` keeps `noindex` because it's a targeted cover letter.

### Experience detail pages (`/experience`)

Five standalone detail pages, one per employer. Same dark theme as the CV but separate HTML files.

- **[experience/pinkroccade.html](experience/pinkroccade.html)** — PinkRoccade / iSuite · 02/2024–present
- **[experience/baxter.html](experience/baxter.html)** — Baxter / FDS-II · 05/2023–02/2024
- **[experience/koma.html](experience/koma.html)** — Koma / KControl · 09/2022–05/2023
- **[experience/alten.html](experience/alten.html)** — ALTEN
- **[experience/asml.html](experience/asml.html)** — ASML / RAT internship · 08/2020–02/2021
- **[experience/experience.css](experience/experience.css)** — Shared stylesheet
- **[experience/lang.js](experience/lang.js)** — Language toggle only; same `data-nl`/`data-en` system

Each page follows a Situatie → Rol → Aanpak → Resultaat structure and links back to `../index.html#experience`.

### Portfolio site (`/portfolio`) — legacy, do not modify or link

Legacy code kept for reference. Not part of the active CV. Content may be referenced when writing copy elsewhere.

## Conventions inherited from the freelance site

(These were defined while this repo also held the freelance site; they still apply to CV pages.)

**Bilingual system:** All visible text uses `data-nl` and `data-en` attributes. Form inputs use `data-nl-placeholder` / `data-en-placeholder`. JavaScript reads the active language and sets `textContent`/`placeholder`. Default is Dutch (NL).

**Bilingual gotcha:** Any text node that changes between NL/EN must have `data-nl` and `data-en` attributes — including dynamic values like dates ("heden"/"present") and unit suffixes ("u/w" / "h/w"). Plain text will not be translated by `applyLanguage()`.

**Scroll animations:** Elements with `.reveal` start hidden (`opacity: 0`, `translateY`); `.reveal.from-left` shifts from the left. An `IntersectionObserver` adds `.visible` when each element enters the viewport (fires once). Hero uses CSS `@keyframes` instead. Stagger via inline `style="transition-delay: Xs"`.

**Hover transitions:** Cards use `transition: property 0.2s` on the base element only — no timing function, nothing on the `:hover` rule. Do not use split transitions, custom easing, or `will-change`.

**Theme toggle:** Reads `prefers-color-scheme` as default; persists to `localStorage` under key `"theme"`. Sets `data-theme` attribute on `<html>`. Both `cv.js` and `experience/lang.js` implement identical logic.

## Key Design Details

- No external libraries — everything hand-written. Mobile breakpoint at `max-width: 768px`.
- Favicons stored in `assets/` (favicon.svg, favicon.ico, favicon-96x96.png, apple-touch-icon.png, web-app-manifest-192x192.png, web-app-manifest-512x512.png, site.webmanifest). All pages reference `assets/` via relative paths.
- **`.bg-alt` sections** use `max-width: 100%; padding: 5rem calc(50vw - 450px + 1.5rem)` to extend edge-to-edge while keeping content at 900px. Reset to `padding: 5rem 1.5rem` at `max-width: 900px`.

## Pending / Nice-to-have

- Scroll-spy on nav (highlight active section as user scrolls) — partial implementation in `cv.js`.
- Future portfolio — a new `/portfolio` (not the legacy one) may be built and linked from the footer once ready.
