# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repo hosts **two static sites** deployed via GitHub Pages at robertdams.com. There is no build system — changes go live by pushing to `master`. A `.nojekyll` file disables Jekyll processing.

- **Root (`/`)** — Freelance landing page (bilingual NL/EN). Primary goal: function as a **call card for potential freelance customers** — conversion-focused, not a portfolio.
- **`/portfolio`** — Original portfolio site showcasing past projects (Bootstrap-based, separate design)

## Development

No build tools or package managers. Preview locally by opening `index.html` (or `portfolio/index.html`) in a browser. Deployment is automatic via GitHub Pages on push to `master`.

## Architecture

### Freelance site (root)

- **[index.html](index.html)** — Single-page site. Section order: hero → about → skills → services → how-i-work → experience → credentials → contact → footer
- **[assets/style.css](assets/style.css)** — All styling; dark theme (`#0e0e0e`) with blue accent (`#4f8ef7`), system font stack
- **[assets/script.js](assets/script.js)** — Language toggle (NL/EN), scroll-reveal IntersectionObserver, and contact form (Formspree via fetch)
- **[assets/photo.jpg](assets/photo.jpg)** — Profile photo (needs replacing with a real professional headshot)

**Bilingual system:** All visible text uses `data-nl` and `data-en` attributes. Form inputs use `data-nl-placeholder` / `data-en-placeholder`. JavaScript reads the active language and sets `textContent`/`placeholder` accordingly. Default language is Dutch (NL). The experience pages use the same system via a shared `experience/lang.js`.

**Scroll animations:** Elements with `.reveal` start hidden (`opacity: 0`, `translateY`). `.reveal.from-left` shifts from the left instead. An `IntersectionObserver` in `script.js` adds `.visible` once each element enters the viewport (fires once). Hero uses a CSS `@keyframes heroFadeIn` instead (it's above the fold). Stagger is done via inline `style="transition-delay: Xs"`.

**Contact form:** Uses Formspree (`action="https://formspree.io/f/xojkpdlp"`). Submits via `fetch` with `preventDefault` — no page reload.

### Experience detail pages (`/experience`)

Four standalone detail pages, one per employer. They share a design identical to the main site (same dark theme, no Bootstrap) but are separate HTML files.

- **[experience/pinkroccade.html](experience/pinkroccade.html)** — PinkRoccade / iSuite · 02/2024–present
- **[experience/baxter.html](experience/baxter.html)** — Baxter / FDS-II · 05/2023–02/2024
- **[experience/koma.html](experience/koma.html)** — Koma / KControl · 09/2022–05/2023
- **[experience/asml.html](experience/asml.html)** — ASML / RAT internship · 08/2020–02/2021
- **[experience/experience.css](experience/experience.css)** — Shared stylesheet for all four pages
- **[experience/lang.js](experience/lang.js)** — Language toggle only (no form logic); same `data-nl`/`data-en` system

Each page follows a Situatie → Opdracht → Aanpak → Resultaat structure, ends with a tech stack and a CTA linking back to `../index.html#contact`. Back link points to `../index.html#experience`.

### Portfolio site (`/portfolio`)

- **[portfolio/index.html](portfolio/index.html)** — Main portfolio page with sections: landing, about, skills, projects grid, contact
- **[portfolio/projects/](portfolio/projects/)** — One HTML file per project (`isuite.html`, `baxter.html`, `koma.html`, `rat.html`, `sound2show.html`)
- **[portfolio/css/main.css](portfolio/css/main.css)** — Portfolio styling; dark theme (`rgb(24, 24, 32)`) with red accent (`rgb(241, 54, 55)`)
- **[portfolio/css/projects.css](portfolio/css/projects.css)** — Shared styling for project detail pages

Portfolio uses Bootstrap 5.0.2 and Font Awesome 5.15.1 (CDN). Each project page follows the same layout — use an existing page as a template when adding new ones.

## Key Design Details

- **Freelance site:** No external libraries — everything hand-written. Mobile breakpoint at `max-width: 768px`. Process steps (`how-i-work`) use a 4-column grid → 2-column at 768px.
- **Portfolio site:** Bootstrap 5.0.2 (CDN), Font Awesome 5.15.1 (CDN). Mobile breakpoint at `max-width: 768px`.
- Favicons are shared — stored in `portfolio/images/` and referenced from both sites.
- **`.bg-alt` sections** use `max-width: 100%; padding: 5rem calc(50vw - 450px + 1.5rem)` to extend edge-to-edge while keeping content at 900px. Reset to `padding: 5rem 1.5rem` at `max-width: 900px`.

## Content & Branding Decisions

The freelance site targets **MKB (SME) clients in the Brainport region** looking for AI automation, data dashboards, and system integration. Key tone decisions:
- Lead with **business outcomes** (time saved, cost reduced), not technical processes
- "How I Work" section uses customer-facing language only — no mention of architecture, Agile, or engineering methods
- CTA is "Plan een kennismaking / Book a call" (not generic "Contact")
- Skills section split: "AI & Automatisering" (blue-tinted chips) and "Software Engineering" (standard chips)
- Service cards show tool sub-tags (N8N / Power Automate / Make etc.) for specificity
- Availability badge (green pulsing dot) in hero signals openness to new work

## Pending / Nice-to-have

- Replace `assets/photo.jpg` with a real professional headshot (square/portrait, min 400×400px)
- Consider adding stock imagery to service cards as CSS `background-image` with dark overlay — suggested Unsplash photos saved in plan file at `C:\Users\Robert\.claude\plans\dreamy-swimming-eclipse.md`
- Scroll-spy on nav (highlight active section as user scrolls) — not yet implemented
- Testimonials section — space reserved for future social proof
