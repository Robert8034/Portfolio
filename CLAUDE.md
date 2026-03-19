# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repo hosts **two static sites** deployed via GitHub Pages at robertdams.com. There is no build system — changes go live by pushing to `master`. A `.nojekyll` file disables Jekyll processing.

- **Root (`/`)** — Freelance landing page (bilingual NL/EN). Primary goal: function as a **call card for potential freelance customers** — conversion-focused. Gets the visitor to book a call.
- **`/portfolio`** — Legacy code. Not linked from the active site and not part of the product. Kept in the repo as reference material — useful for understanding Robert's background and past work, and may be mined for content later.

## Development

No build tools or package managers. Preview locally by opening `index.html` (or `portfolio/index.html`) in a browser. Deployment is automatic via GitHub Pages on push to `master`.

## Architecture

### Freelance site (root)

- **[index.html](index.html)** — Single-page site. Section order: hero → about → services (bg-alt) → results → how-i-work → experience (bg-alt) → background (bg-alt, credentials) → skills → contact (bg-alt) → footer
- **[assets/style.css](assets/style.css)** — All styling; CSS custom properties for theming (`--bg`, `--text`, `--accent`, etc.); dark navy default (`#0d1520`), light mode (`#f7f8fa`) via `[data-theme="light"]`; blue accent `#4f8ef7`
- **[assets/script.js](assets/script.js)** — Language toggle (NL/EN), theme toggle (light/dark, persisted to localStorage), scroll-reveal IntersectionObserver, bar chart animation observer, and contact form (Formspree via fetch)
- **[assets/photo.jpg](assets/photo.jpg)** — Profile photo (real headshot in place)

**Bilingual system:** All visible text uses `data-nl` and `data-en` attributes. Form inputs use `data-nl-placeholder` / `data-en-placeholder`. JavaScript reads the active language and sets `textContent`/`placeholder` accordingly. Default language is Dutch (NL). The experience pages use the same system via a shared `experience/lang.js`.

**Scroll animations:** Elements with `.reveal` start hidden (`opacity: 0`, `translateY`). `.reveal.from-left` shifts from the left instead. An `IntersectionObserver` in `script.js` adds `.visible` once each element enters the viewport (fires once). Hero uses a CSS `@keyframes heroFadeIn` instead (it's above the fold). Stagger is done via inline `style="transition-delay: Xs"`.

**Hover transitions:** Cards (`.service-card`, `.exp-card`, `.cred-card`) and process steps use `transition: property 0.2s` on the base element only — no timing function, nothing on the `:hover` rule. This matches the `.cta-button` pattern and is confirmed to feel snappy. Do not use split transitions, custom easing, or `will-change` — these caused perceived lag.

**Results bar charts:** `.result-bar` elements start at `width: 0` and animate to `var(--target-pct)` via `transition: width 1.3s cubic-bezier(0.4, 0, 0.2, 1)`. A second IntersectionObserver (threshold 0.3) watches `.results` and adds class `.animated` to all `.result-bar` children when the section enters the viewport. Fires once.

**Theme toggle:** Reads `prefers-color-scheme` as default; persists to `localStorage` under key `"theme"`. Sets `data-theme` attribute on `<html>`. Icon updates between `light_mode` and `dark_mode` Material Symbols. Both `assets/script.js` and `experience/lang.js` implement identical logic.

**Bilingual gotcha:** Any text node that changes between NL/EN must have `data-nl` and `data-en` attributes — including dynamic values like dates ("heden"/"present") and unit suffixes ("u/w" / "h/w"). Plain text will not be translated by `applyLanguage()`.

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

### Portfolio site (`/portfolio`) — legacy, do not modify or link

Legacy code kept for reference. Not part of the active product. Do not link to it from the freelance site. Content (project descriptions, outcome summaries) may be referenced when writing copy for the active site.

## Key Design Details

- No external libraries — everything hand-written. Mobile breakpoint at `max-width: 768px`. Process steps (`how-i-work`) use a 4-column grid → 2-column at 768px.
- Favicons stored in `portfolio/images/` and referenced from the freelance site.
- **`.bg-alt` sections** use `max-width: 100%; padding: 5rem calc(50vw - 450px + 1.5rem)` to extend edge-to-edge while keeping content at 900px. Reset to `padding: 5rem 1.5rem` at `max-width: 900px`.

## Site Goal & Visitor Journey

**Primary goal:** Convert a potential MKB client into a booked discovery call ("Plan een kennismaking"). Conversion = contact form submission (Formspree).

**Target audience:** MKB (SME) business owners in the Brainport/Eindhoven region. Non-technical. They care about time saved, cost reduced, and errors eliminated — not how things are built.

**Intended visitor journey:**
1. **Hero** — Immediate clarity: who Robert is, that he's available, and a direct CTA to book a call
2. **About** — Brief personal intro to establish trust and likability
3. **Services** — What he offers, framed in business outcomes; ends with inline CTA
4. **Results** — Animated bar charts showing industry-average outcomes (McKinsey/Forrester). Not fabricated client claims — cited stats only.
5. **How I Work** — Process in plain customer language — no jargon, just: understand → map → build → measure
6. **Experience** — Proof of competence via 4 employer cards; skeptical prospects click "Lees meer" to read full detail pages; ends with inline CTA
7. **Background** — Education and certifications (2 cards, concise — MKB clients don't know what PSM I means)
8. **Skills** — Tech stack for visitors who want to verify competence (moved late in journey — not a conversion driver)
9. **Contact** — Form to book the call; this is the conversion point

**The three services:**
| Service | NL | Tools |
|---|---|---|
| Process automation | Procesautomatisering | N8N, Power Automate, Make |
| Data & dashboards | Data & dashboards | Power BI, Azure, PostgreSQL |
| Connecting systems | Systemen verbinden | REST API, N8N, .NET |

**Role of experience pages:** These are the proof-of-competence layer for prospects who need to vet before committing. Each page uses a Situatie → Opdracht → Aanpak → Resultaat structure and ends with a CTA back to the contact form.

## Content & Branding Decisions

The freelance site targets **MKB (SME) clients in the Brainport region** looking for AI automation, data dashboards, and system integration. Key tone decisions:
- Lead with **business outcomes** (time saved, cost reduced), not technical processes
- "How I Work" section uses customer-facing language only — no mention of architecture, Agile, or engineering methods
- CTA is "Plan een kennismaking / Book a call" (not generic "Contact")
- Skills section split: "AI & Automatisering" (blue-tinted chips) and "Software Engineering" (standard chips)
- Service cards show tool sub-tags (N8N / Power Automate / Make etc.) for specificity; Google Material Symbols icons (`autorenew`, `bar_chart`, `device_hub`)
- Availability badge (green pulsing dot) in hero signals openness to new work
- No micro-stats bar (explicitly rejected — doesn't fit the conversion-focused tone)
- No pricing/day-rate signals — MKB clients think in project costs, day rates create sticker shock without context
- Statistics must cite a named source (McKinsey, Forrester, etc.) — no fabricated client results
- Inline CTAs at the bottom of services and experience sections (`.section-cta` class) — standalone CTA strips between sections were rejected as feeling out of place

## Pending / Nice-to-have

- Consider adding stock imagery to service cards as CSS `background-image` with dark overlay — suggested Unsplash photos saved in plan file at `C:\Users\Robert\.claude\plans\dreamy-swimming-eclipse.md`
- Scroll-spy on nav (highlight active section as user scrolls) — not yet implemented
- Testimonials section — space reserved for future social proof
- Future portfolio — a new `/portfolio` (not the legacy one) may be built and linked from the footer once ready
