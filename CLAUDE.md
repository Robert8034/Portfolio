# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repo hosts **two static sites** deployed via GitHub Pages at robertdams.com. There is no build system — changes go live by pushing to `master`. A `.nojekyll` file disables Jekyll processing.

- **Root (`/`)** — Freelance landing page (bilingual NL/EN)
- **`/portfolio`** — Original portfolio site showcasing past projects

## Development

No build tools or package managers. Preview locally by opening `index.html` (or `portfolio/index.html`) in a browser. Deployment is automatic via GitHub Pages on push to `master`.

## Architecture

### Freelance site (root)

- **[index.html](index.html)** — Single-page site with sections: hero, about, services, contact, footer
- **[assets/style.css](assets/style.css)** — All styling; dark theme (`#0e0e0e`) with blue accent (`#4f8ef7`), system font stack
- **[assets/script.js](assets/script.js)** — Language toggle (NL/EN) and contact form (Formspree via fetch)
- **[assets/photo.jpg](assets/photo.jpg)** — Profile photo (placeholder — replace with real image)

**Bilingual system:** All visible text uses `data-nl` and `data-en` attributes. Form inputs use `data-nl-placeholder` / `data-en-placeholder`. JavaScript reads the active language and sets `textContent`/`placeholder` accordingly. Default language is Dutch (NL).

**Contact form:** Uses Formspree (`action="https://formspree.io/f/REPLACE_WITH_YOUR_ID"`). Submits via `fetch` with `preventDefault` — no page reload. Replace the form ID before going live.

### Portfolio site (`/portfolio`)

- **[portfolio/index.html](portfolio/index.html)** — Main portfolio page with sections: landing, about, skills, projects grid, contact
- **[portfolio/projects/](portfolio/projects/)** — One HTML file per project (`isuite.html`, `baxter.html`, `koma.html`, `rat.html`, `sound2show.html`)
- **[portfolio/css/main.css](portfolio/css/main.css)** — Portfolio styling; dark theme (`rgb(24, 24, 32)`) with red accent (`rgb(241, 54, 55)`)
- **[portfolio/css/projects.css](portfolio/css/projects.css)** — Shared styling for project detail pages

Portfolio uses Bootstrap 5.0.2 and Font Awesome 5.15.1 (CDN). Each project page follows the same layout — use an existing page as a template when adding new ones.

## Key Design Details

- **Freelance site:** No external libraries — everything hand-written. Mobile breakpoint at `max-width: 768px`.
- **Portfolio site:** Bootstrap 5.0.2 (CDN), Font Awesome 5.15.1 (CDN). Mobile breakpoint at `max-width: 768px`.
- Favicons are shared — stored in `portfolio/images/` and referenced from both sites.
