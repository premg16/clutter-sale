# Swiss Minimalism landing page variant — `/v1`

## Purpose

A single-page landing variant for Clutter Sale at the route `/v1`, exploring a Swiss Minimalist design language (grid discipline, restrained color, definitive typography) as an alternative to the existing playful terracotta/pink theme on the root page. Sits alongside the site's other planned style variants (see `landing-page-prompts.md`) as a design exploration, not a replacement for `/`.

Concept: Clutter Sale reframed as a precision system. The page argues that a cluttered home is an unresolved equation, and the product is the exact procedure that resolves it — decluttering as structured process, not marketplace hustle.

## Scope

- New route: `src/app/v1/page.tsx`, with its own `layout.tsx` for scoped font loading.
- Fully self-contained styling — no dependency on `globals.css` custom properties (`--color-surface`, `--color-ink`, etc.) or the existing `.dark` theme system. This page defines its own tokens (paper / ink / teal accent) via a scoped stylesheet or CSS module.
- No changes to the existing root page, theme toggle, or shared components beyond optional reuse of `SmoothScroll.tsx` / Lenis wiring if it can be scoped per-route without side effects on `/`.
- Single breakpoint set: mobile, tablet, desktop. No CMS, no real backend — static marketing page.

## Visual system

**Typography**
- Display + body: `Inter Tight` via `next/font/google` — bold/black weights for headlines, regular for body. Tight tracking on large sizes.
- Numerals, labels, section markers: `IBM Plex Mono` — used for the "01 / 02 / 03" plate numbers, stat figures, and small system labels, evoking watch-dial precision.

**Palette**
- Paper: off-white (`#F5F4F0`)
- Ink: near-black (`#111111`)
- Accent: one deep, confident teal (distinct from the existing brand-slate `#3f8d99` — a darker, more saturated teal, e.g. `#0F5F5C`), used only for: one rule line per section, connecting lines in the process diagram, and the final CTA panel background. Never used as a flood background elsewhere, never diluted into a gradient.

**Grid**
- 12-column CSS grid, generous gutters. Content is deliberately offset (e.g., copy starting at column 3, an image or number bleeding to column 12) rather than centered — asymmetric but grid-locked.
- Whitespace is a structural element: large vertical rhythm between sections, no decorative filler.

## Sections (single continuous scroll)

1. **01 — Header / Hero** — quiet focus. Tiny system label (top-left, mono), an oversized statement headline ("Every home holds an unresolved equation."), a single teal rule beneath it. Nothing else competes.
2. **02 — The Problem** — one stark sentence plus a small asymmetric 2-column grid of numbered facts (cost of clutter, time reclaimed, etc.).
3. **03 — The System** (core value / "deep understanding") — 3–4 step process rendered as a precision diagram: steps connected by thin ruled lines, each step numbered like a schematic plate (01/02/03/04). The connecting line animates in teal as it's revealed.
4. **04 — Trust / Proof** — one confident stat block (mono numerals) plus a short quote set in mono for authority. No logo soup, no crowded social proof.
5. **05 — CTA** — "the only logical conclusion": full-bleed teal panel, the one moment color dominates the frame. One massive verb ("Begin.") plus a single CTA button, ink text on teal.

## Motion

- Framer Motion (already a dependency) for scroll-triggered reveals: clip/translate reveals that feel mathematically precise — sharp `easeOut`, no spring/bounce easing anywhere on this page (contrast with the root page's springy `springIn` variant).
- Rule lines draw themselves left-to-right on scroll into view.
- Stat numerals count up once when scrolled into view, not on every re-entry.
- All motion respects `prefers-reduced-motion` (snap to end state, no animation).

## Interaction

- Lenis smooth scroll, scoped to this route only (mount/unmount inside `v1/layout.tsx` or `v1/page.tsx`, not the shared root layout) so it does not affect `/`.
- Nav is minimal or omitted entirely — this is a single continuous scroll with no persistent navbar, in keeping with the "one continuous argument" narrative arc. A single fixed system-label mark (top-left) may persist as a quiet anchor.

## Out of scope

- Dark mode for this variant (single fixed light "paper" palette — matches the Swiss/gallery reference material, which is inherently a bright, high-contrast environment).
- Reusing `Logo.tsx`, `Stickers.tsx`, or `ThemeToggle.tsx` from the existing component set — this variant's visual language doesn't call for them.
- Real form submission / backend wiring for the CTA — a styled button/link is sufficient for this design exploration.

## Testing

- Manual verification: `npm run dev`, visit `/v1`, confirm scroll-linked reveals fire correctly, reduced-motion fallback snaps correctly, and `/` is visually/functionally unaffected.
- No automated test suite exists in this repo for visual pages; this is expected and not something this spec introduces.
