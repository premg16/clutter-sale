# `/v1` — Emotional charity landing page

**Supersedes** `2026-07-10-swiss-minimalism-v1-design.md`. That spec described a Swiss Minimalist
concept for the same `/v1` route and was never implemented (no `src/app/v1/` exists). This spec
replaces it wholesale; the Swiss variant is abandoned, not deferred.

## Purpose

A single-page landing variant at `/v1` in the visual language of the "Hopper" nonprofit reference
designs: deep-teal dark bands against cream/white content, one confident teal accent, generous
rounded cards, a floating pill navbar, real photography plus illustration.

The page is emotion-first. Its job is not to explain a marketplace — it is to move a visitor to act
for a cause. Every section advances one argument: *the thing gathering dust in your home can change
someone's life.*

## Audiences

The page speaks to three, explicitly:

- **Donators** — people with unused goods who want them to mean something.
- **Buyers** — people who want to shop or bid, knowing the money goes to a cause.
- **Non-profits** — organisations who want to raise support through listed goods.

## Copy principles (research-backed)

Grounded in the identifiable-victim effect and nonprofit storytelling research
([GoFundMe Pro](https://pro.gofundme.com/c/blog/identifiable-victim-effect/),
[PRIDE Philanthropy](https://pridephilanthropy.com/blog/the-power-of-emotional-storytelling),
[Clairification](https://clairification.com/2022/08/25/nonprofit-fundraising-truth-stories-are-persuasive-data-is-just-proof/)):

1. **One person, one object, one outcome.** A specific named story outperforms aggregate appeals —
   fact-based appeals drew $1.14 vs. $2.38 for a single-child story. Lead sections with a person,
   not a number.
2. **Stories persuade; data proves.** Statistics appear *after* the emotional beat, as
   corroboration — never as the opening argument.
3. **Concrete conversion of value.** Translate abstractions into tangible impact
   ("a sewing machine → a month of school lunches"), so the visitor can picture the help.
4. **Emotional hook first.** The opening sentences must create a human connection before any
   product explanation.
5. **Real faces.** Photography of real people, not abstract iconography, in the moments that carry
   emotion.

## Scope

- New route: `src/app/v1/page.tsx` and `src/app/v1/layout.tsx` (scoped fonts + scoped Lenis).
- Root page `/`, `globals.css` tokens, `ThemeToggle`, and shared components are **unchanged**.
- Light mode only. No dark-mode variant for this page (the reference language is inherently bright);
  the page must not react to the global `.dark` class.
- Static marketing page. No backend, no real donation/bid processing — CTAs are styled links.
- Single responsive breakpoint set: mobile / tablet / desktop.

## Visual system

**Palette** — scoped to `/v1`. Teal is primary and always present.

| Token | Value | Use |
|---|---|---|
| Accent teal | `#3f8d99` (existing `--color-brand-slate`) | CTAs, links, active states, one highlight per section |
| Deep teal | `#0e3b3f` | Dark hero + CTA bands, footer accents |
| Cream | `#fbf7f0` (existing `--color-brand-cream`) | Page background |
| White | `#ffffff` | Raised cards |
| Ink | `#12262b` (existing `--color-brand-text`) | Body text on light surfaces |
| Ink inverse | `#fbf7f0` | Text on deep-teal bands |

Deep teal is a darkened companion of the accent, not a new brand hue — it exists so the dark bands
read as teal rather than as the existing navy. Accent teal is used sparingly: one dominant accent
per section, per the design constraints. No gradients on text. No glassmorphism.

**Typography**
- Body: `Outfit` (already loaded project-wide, re-declared scoped).
- Display: `Bricolage Grotesque` via `next/font/google`, loaded scoped in `v1/layout.tsx` — a soft
  geometric display face matching the reference's friendly-but-confident tone. `Anton` (the root
  display face) is explicitly **not** reused: its condensed weight fights that tone. Headlines set
  with tight tracking, `text-balance`.
- Statistics and numerals: `tabular-nums`.

**Shape language**
- Large corner radii on cards and images (rounded-2xl/3xl), pill-shaped buttons and navbar.
- Cards sit on cream as white raised panels, or as filled accent-teal panels for emphasis.
- Minimal shadow; borders/hairlines carry separation.

## Sections (single continuous scroll)

1. **Hero** — deep-teal band. Floating white pill navbar (logo, links, Donate CTA). Oversized
   headline, one-line emotional sub, primary CTA. Below it, an asymmetric cluster: two photographs
   flanking a stacked pair of stat cards (one white, one accent teal). Statistics here are framing,
   not the argument.
2. **The human opening** — cream. A large empathetic statement set as a paragraph-scale headline,
   then a single specific story: one named person, one object, one outcome. This is the emotional
   hook and it precedes any explanation of how the product works.
3. **How it works — three doors** — cream. Three columns, one per audience (donator / buyer /
   non-profit), each with an illustration, a verb-led heading, and one sentence. This is the only
   section that explains mechanics.
4. **Impact band** — deep teal. Large `tabular-nums` figures that count up once on scroll into view.
   Positioned *after* the story, as proof.
5. **Voices** — cream. "Our impact, in their words." A horizontal row of testimonial cards with real
   portraits, name, and role (donor / volunteer / supporter).
6. **Causes** — cream. The nonprofits currently raising support, as cards using existing project
   photography (`animal-rescue`, `community-garden`, `library-reading`, …).
7. **Moments** — a full-bleed photo strip of real moments, minimal chrome.
8. **FAQ** — cream. Accordion. Trust-building: where the money goes, how bidding works, how a
   nonprofit joins. First item open by default.
9. **Closing CTA** — deep-teal band. The emotional summit: a single imperative headline, flanked by
   tilted photo pairs, one CTA. Beneath it, a horizontally scrolling word marquee
   (Care · Impact · Hope · Trust · Unity) alternating white and accent teal.
10. **Footer** — cream. Multi-column (brand blurb, menu, quick links, contact) plus a row of social
    link cards with arrow affordances.

## Imagery

A mix of photography and illustration, per the reference:

- **Photography** — royalty-free from Unsplash / Pexels, downloaded into `public/images/v1/`,
  served through `next/image` with explicit dimensions. No hotlinking. Existing project photos
  (`community-giving`, `donation-box`, `thrifted-items`, `animal-rescue`, `community-garden`,
  `library-reading`, `doorstep-handoff`) are reused wherever they fit.
- **Illustration** — unDraw SVGs, recoloured to the accent teal, for the three-doors section where a
  photograph would be arbitrary.
- **Attribution** — every downloaded asset is credited in `public/images/CREDITS.md` alongside the
  existing entries.

Hero photography is `priority` / eager; everything below the fold is lazy.

## Motion

Framer Motion (existing dependency). Lenis smooth scroll, mounted in `v1/layout.tsx` so it does not
affect `/`.

- Scroll-triggered reveals: translate + fade, `easeOut`, no bounce.
- Stat numerals count up **once** on first scroll into view, not on re-entry.
- Word marquee runs on a CSS animation (reuse the existing `animate-marquee` keyframes).
- FAQ accordion animates height + opacity.
- Interaction feedback ≤ 200ms; content transitions 300–500ms.
- All motion is disabled under `prefers-reduced-motion: reduce` — reveals snap to their end state,
  the marquee holds still, counters render their final value immediately.

## Accessibility

- Semantic landmarks (`nav` / `main` / `section` / `footer`), no skipped heading levels.
- All imagery has meaningful `alt`; decorative imagery is `alt=""` + `aria-hidden`.
- FAQ accordion built on native `button` + `aria-expanded`, keyboard operable.
- Contrast — measured, not assumed:

  | Pair | Ratio | Verdict |
  |---|---|---|
  | Cream on deep teal `#0e3b3f` | 11.46:1 | AA body ✓ |
  | Ink on cream | 14.70:1 | AA body ✓ |
  | Ink on accent `#3f8d99` | 4.10:1 | AA **large only** |
  | Cream on accent `#3f8d99` | 3.59:1 | AA **large only** |
  | Accent on cream | 3.59:1 | AA **large only** |

  Consequences, which the design must honour:
  - Accent teal is **never** a background for small text. A filled accent-teal button must set its
    label as **ink at ≥18.66px semibold/bold** (clears AA-large at 4.10:1). Cream-on-accent labels
    are not permitted at body size.
  - Where a pill button needs a small label, its fill is **deep teal** (cream label, 11.46:1), not
    accent teal.
  - Accent teal on cream is reserved for large display text, fills, rules, and borders — never
    body copy or small links.
- Touch targets ≥ 44×44px. `focus-visible` outlines, never `outline: none`.

## Out of scope

- Dark mode for this route.
- Real donation, bidding, checkout, or form submission.
- Changes to `/`, `globals.css`, `ThemeToggle`, `Stickers`, or the root `layout.tsx`.
- Any CMS or data layer — content is authored inline.

## Verification

- `npm run build` and `npx tsc --noEmit` pass.
- `npm run dev`, visit `/v1`: reveals fire once, counters count once, accordion is keyboard
  operable, marquee loops seamlessly.
- Toggle OS reduced-motion: animation is suppressed, content readable at end state.
- Visit `/` and confirm it is visually and functionally unaffected, including the theme toggle.
- Toggle OS dark mode: `/v1` remains light, `/` still switches.

No automated visual test suite exists in this repo; that is expected and this spec does not
introduce one.
