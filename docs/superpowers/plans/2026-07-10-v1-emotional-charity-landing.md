# `/v1` Emotional Charity Landing — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a light-mode, emotion-first charity landing page at `/v1` in the deep-teal "Hopper" visual language, speaking to donators, buyers, and non-profits.

**Architecture:** A route-scoped Next.js App Router page. `src/app/v1/layout.tsx` loads the display font and applies scoped CSS custom properties to a wrapper `<div>`; `src/app/v1/page.tsx` is a single client component composing section components from `src/app/v1/_components/`. Scoped tokens live in `src/app/v1/v1.css`, imported by the v1 layout only — `globals.css` and `/` are never touched.

**Tech Stack:** Next.js 16.2.10 (App Router, React Compiler ON), React 19.2.4, Tailwind CSS v4, Framer Motion 12, lucide-react, `next/font/google`.

## Global Constraints

Every task's requirements implicitly include this section.

- **Do not modify** `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/globals.css`, `src/components/ThemeToggle.tsx`, or `src/components/Stickers.tsx`. `/` must remain visually and functionally identical.
- **Lenis is already mounted** by `SmoothScroll` in the root layout (`src/app/layout.tsx:38`), which wraps every route including `/v1`. **Do NOT mount `ReactLenis` or `SmoothScroll` again** in `v1/layout.tsx` — that would double-mount smooth scroll. Inherit it.
- **React Compiler is enabled** (`next.config.ts: reactCompiler: true`). Do **not** write `useMemo`, `useCallback`, or `React.memo`. Inline object/arrow props in JSX are fine.
- **Light mode only.** `/v1` must not react to the global `.dark` class. All scoped tokens are literal hex values under `.v1-root`, never `var(--color-surface)` etc. from `globals.css`.
- **Palette (exact values):**
  - Accent teal `#3f8d99` · Deep teal `#0e3b3f` · Cream `#fbf7f0` · White `#ffffff` · Ink `#12262b` · Ink-soft `#45585c`
- **Contrast rules (measured — non-negotiable):**
  - Accent teal `#3f8d99` is **never** a background behind small text.
  - A filled accent-teal button sets its label as **ink `#12262b`, ≥18.66px, semibold or bolder** (4.10:1, clears AA-large).
  - Any pill/button with a **small** label uses **deep teal `#0e3b3f`** fill with a **cream** label (11.46:1).
  - Accent teal on cream is for large display text, fills, rules, borders — **never** body copy or small links.
- **Tailwind v4 custom-property syntax:** use the canonical shorthand `bg-(--v1-deep)`, `text-(--v1-ink)` — **not** the v3-style `bg-[var(--v1-deep)]`. The project linter flags the bracketed form as `suggestCanonicalClasses`. Some code blocks below still show the bracketed form; convert as you type, and confirm with `npm run lint` (Task 11) that no `suggestCanonicalClasses` warnings remain.
- **Motion:** Framer Motion, `easeOut`, no spring/bounce. Interaction feedback ≤200ms; content transitions 300–500ms. Everything must be suppressed under `prefers-reduced-motion` via `useReducedMotion()`.
- **Copy rule (from spec research):** story before statistics. A named person + one object + one outcome precedes any aggregate number.
- **Images:** `next/image` with explicit `width`/`height` (or `fill` + `sizes`). Hero imagery `priority`; everything below the fold lazy (default). No hotlinking — files live in `public/images/v1/`.
- **A11y:** semantic landmarks, no skipped heading levels, meaningful `alt` (decorative → `alt=""` + `aria-hidden`), touch targets ≥44×44px, visible `focus-visible` outlines, `tabular-nums` on all figures.
- **Verify after every task:** `npx tsc --noEmit` must pass.

## File Structure

| File | Responsibility |
|---|---|
| `src/app/v1/v1.css` | Scoped `.v1-root` tokens + count-up/marquee helpers. Imported only by v1 layout. |
| `src/app/v1/layout.tsx` | Loads `Bricolage_Grotesque`, imports `v1.css`, wraps children in `.v1-root` div. Server component. |
| `src/app/v1/_data.ts` | All page copy + content arrays (stats, voices, causes, faqs, doors). Typed, no JSX. |
| `src/app/v1/_components/primitives.tsx` | `Button`, `Reveal`, `CountUp`, `SectionHeading` — shared building blocks. |
| `src/app/v1/_components/Navbar.tsx` | Floating white pill navbar. |
| `src/app/v1/_components/Hero.tsx` | Deep-teal hero band + stat cluster. |
| `src/app/v1/_components/Story.tsx` | Human opening: statement + one named story. |
| `src/app/v1/_components/Doors.tsx` | Three audiences. |
| `src/app/v1/_components/ImpactBand.tsx` | Deep-teal count-up proof band. |
| `src/app/v1/_components/Voices.tsx` | Testimonial cards. |
| `src/app/v1/_components/Causes.tsx` | Nonprofit cards using existing photography. |
| `src/app/v1/_components/Moments.tsx` | Full-bleed photo strip. |
| `src/app/v1/_components/Faq.tsx` | Accessible accordion. |
| `src/app/v1/_components/ClosingCta.tsx` | Deep-teal summit + word marquee. |
| `src/app/v1/_components/Footer.tsx` | Multi-column footer + social cards. |
| `src/app/v1/page.tsx` | Composes the sections in order. |
| `public/images/v1/` | Downloaded royalty-free photography + unDraw SVGs. |
| `public/images/CREDITS.md` | **Modify** — append v1 attributions. |

**Testing note:** This repo has no test runner (`package.json` scripts: `dev`, `build`, `start`, `lint`). Introducing Jest/Vitest is out of scope per the spec. Verification is therefore `npx tsc --noEmit`, `npm run lint`, `npm run build`, plus the explicit manual browser checks in each task. Where a task has pure logic worth guarding, it carries a tiny runtime assertion instead of a test file.

---

### Task 1: Scoped tokens, layout, and an empty `/v1` route

Establishes the route and proves isolation from `/` before any content exists.

**Files:**
- Create: `src/app/v1/v1.css`
- Create: `src/app/v1/layout.tsx`
- Create: `src/app/v1/page.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces: the `.v1-root` CSS scope exposing `--v1-accent`, `--v1-deep`, `--v1-cream`, `--v1-white`, `--v1-ink`, `--v1-ink-soft`, and the `--font-bricolage` CSS variable. All later tasks style against these.

- [ ] **Step 1: Create the scoped stylesheet**

`src/app/v1/v1.css`:

```css
/* Scoped tokens for the /v1 landing variant. Literal values only — this page
   is deliberately light-mode-only and must not follow the global .dark class. */
.v1-root {
  --v1-accent: #3f8d99;
  --v1-deep: #0e3b3f;
  --v1-cream: #fbf7f0;
  --v1-white: #ffffff;
  --v1-ink: #12262b;
  --v1-ink-soft: #45585c;

  background-color: var(--v1-cream);
  color: var(--v1-ink);
  font-family: var(--font-outfit), ui-sans-serif, system-ui, sans-serif;
  color-scheme: light;
}

.v1-root h1,
.v1-root h2,
.v1-root h3,
.v1-root h4 {
  font-family: var(--font-bricolage), ui-sans-serif, system-ui, sans-serif;
  letter-spacing: -0.02em;
  text-wrap: balance;
  color: inherit;
}

.v1-root :focus-visible {
  outline: 2px solid var(--v1-accent);
  outline-offset: 2px;
}

/* Marquee for the closing CTA word strip. Duplicated content + -50% travel. */
@keyframes v1-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.v1-marquee {
  animation: v1-marquee 26s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .v1-marquee { animation: none; }
}
```

- [ ] **Step 2: Create the route-scoped layout**

`Bricolage_Grotesque` is a variable font, so no `weight` is needed (per `node_modules/next/dist/docs/01-app/03-api-reference/02-components/font.md`). The root layout owns `<html>`, so the scoped font variable is attached to a wrapper `<div>`, not `<html>`.

`src/app/v1/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./v1.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Clutter Sale — Your Clutter Can Change a Life",
  description:
    "List what you no longer use. Someone buys it. A cause you choose receives every rupee.",
};

// NOTE: Lenis smooth scroll is already mounted by <SmoothScroll> in the root
// layout and wraps this route. Do not mount it again here.
export default function V1Layout({ children }: { children: React.ReactNode }) {
  return <div className={`${bricolage.variable} v1-root`}>{children}</div>;
}
```

- [ ] **Step 3: Create a minimal page to prove the route renders**

`src/app/v1/page.tsx`:

```tsx
export default function V1Page() {
  return (
    <main className="min-h-dvh grid place-items-center">
      <h1 className="text-4xl font-bold">v1 scaffold</h1>
    </main>
  );
}
```

- [ ] **Step 4: Typecheck and build**

Run: `npx tsc --noEmit && npm run build`
Expected: both succeed, and the build output lists a `/v1` route.

- [ ] **Step 5: Manually verify isolation**

Run `npm run dev`, then:
1. Visit `http://localhost:3000/v1` → cream background, "v1 scaffold" in Bricolage Grotesque.
2. Switch the OS to dark mode, reload `/v1` → **still cream/light** (proves `.dark` isolation).
3. Visit `http://localhost:3000/` → unchanged, theme toggle still switches light/dark.
4. Scroll `/` → smooth scroll still works (proves root Lenis untouched).

- [ ] **Step 6: Commit**

```bash
git add src/app/v1
git commit -m "feat(v1): scaffold route with scoped light-only teal tokens"
```

---

### Task 2: Content data module

All copy lives in one typed module so sections stay presentational and the story-before-stats ordering is auditable in one place.

**Files:**
- Create: `src/app/v1/_data.ts`

**Interfaces:**
- Consumes: nothing.
- Produces (exact names later tasks import):
  - `type Stat = { value: number; suffix: string; label: string }`
  - `type Door = { id: string; title: string; body: string; illustration: string; cta: string }`
  - `type Voice = { id: string; quote: string; name: string; role: string; avatar: string }`
  - `type Cause = { id: string; name: string; blurb: string; image: string; raised: string }`
  - `type Faq = { id: string; q: string; a: string }`
  - `heroStats: Stat[]`, `impactStats: Stat[]`, `doors: Door[]`, `voices: Voice[]`, `causes: Cause[]`, `faqs: Faq[]`, `marqueeWords: string[]`

- [ ] **Step 1: Write the data module**

Note the copy discipline: `story` names one person, one object, one outcome, and it renders *before* `impactStats`.

`src/app/v1/_data.ts`:

```ts
export type Stat = { value: number; suffix: string; label: string };
export type Door = { id: string; title: string; body: string; illustration: string; cta: string };
export type Voice = { id: string; quote: string; name: string; role: string; avatar: string };
export type Cause = { id: string; name: string; blurb: string; image: string; raised: string };
export type Faq = { id: string; q: string; a: string };

export const hero = {
  eyebrow: "Clutter Sale",
  headline: ["Your Clutter Can", "Change a Life Today"],
  sub: "List what you no longer use. Someone buys it. A cause you choose receives every single rupee.",
  cta: "Start Giving",
};

// Framing figures for the hero cluster — not the argument. The argument is `story`.
export const heroStats: Stat[] = [
  { value: 12500, suffix: "+", label: "Items given a second life" },
  { value: 500, suffix: "+", label: "Givers across India" },
];

/** The emotional hook: one person, one object, one outcome. Precedes all statistics. */
export const story = {
  statement:
    "Somewhere in your home is an object you have not touched in a year. To you it is clutter. To someone else, it is the whole difference.",
  name: "Meera",
  city: "Pune",
  quote:
    "The sewing machine sat under a bedsheet for four years. It sold in nine days. That money fed forty children their school lunch for a month.",
  object: "One sewing machine",
  outcome: "A month of school lunches for 40 children",
  image: "/images/v1/story-portrait.jpg",
  alt: "Meera, a donor from Pune, standing beside her sewing machine",
};

export const doors: Door[] = [
  {
    id: "donate",
    title: "Give what you no longer need",
    body: "List an item in minutes. Choose the cause it should fund. We handle the rest.",
    illustration: "/images/v1/undraw-donate.svg",
    cta: "List an item",
  },
  {
    id: "buy",
    title: "Buy something with a story",
    body: "Shop or bid on pre-loved goods. Every rupee you spend lands with a nonprofit.",
    illustration: "/images/v1/undraw-shop.svg",
    cta: "Browse items",
  },
  {
    id: "nonprofit",
    title: "Raise support for your cause",
    body: "Join as a nonprofit and receive 100% of the proceeds from items pledged to you.",
    illustration: "/images/v1/undraw-community.svg",
    cta: "Join as a nonprofit",
  },
];

// Proof, shown only after the story has landed.
export const impactStats: Stat[] = [
  { value: 12500, suffix: "+", label: "Items rehomed" },
  { value: 48, suffix: "", label: "Nonprofits supported" },
  { value: 100, suffix: "%", label: "Of proceeds passed on" },
  { value: 200000, suffix: "+", label: "Meals funded" },
];

export const voices: Voice[] = [
  {
    id: "v1",
    quote:
      "I expected to feel like I was throwing things away. Instead I got a photo of the classroom my old desk paid for.",
    name: "Priya Sharma",
    role: "Donor",
    avatar: "/images/v1/avatar-priya.jpg",
  },
  {
    id: "v2",
    quote:
      "I bought a bookshelf for half its price and the money went to an animal shelter. There is no version of that I lose.",
    name: "Rahul Mehta",
    role: "Buyer",
    avatar: "/images/v1/avatar-rahul.jpg",
  },
  {
    id: "v3",
    quote:
      "We are a small shelter. Clutter Sale sends us funds every month without taking a cut. It changed how we plan.",
    name: "Neha Verma",
    role: "Nonprofit partner",
    avatar: "/images/v1/avatar-neha.jpg",
  },
  {
    id: "v4",
    quote:
      "Cleaning out my father's flat was the hardest month of my life. Knowing where his things went made it bearable.",
    name: "Karan Shah",
    role: "Donor",
    avatar: "/images/v1/avatar-karan.jpg",
  },
];

export const causes: Cause[] = [
  {
    id: "animals",
    name: "Animal rescue",
    blurb: "Veterinary care and shelter for abandoned street animals.",
    image: "/images/animal-rescue.jpg",
    raised: "₹4.2L raised",
  },
  {
    id: "garden",
    name: "Community gardens",
    blurb: "Turning vacant lots into food for the neighbourhoods around them.",
    image: "/images/community-garden.jpg",
    raised: "₹2.8L raised",
  },
  {
    id: "library",
    name: "Books & learning",
    blurb: "Stocking classroom libraries in under-resourced schools.",
    image: "/images/library-reading.jpg",
    raised: "₹6.1L raised",
  },
];

export const faqs: Faq[] = [
  {
    id: "cut",
    q: "How much of my sale actually reaches the cause?",
    a: "All of it. 100% of the sale price goes to the nonprofit you choose. We do not take a commission from your item.",
  },
  {
    id: "bid",
    q: "How does bidding work?",
    a: "Some items are listed as auctions. You place a bid, and if you win, the full winning amount is transferred to the nonprofit attached to that item.",
  },
  {
    id: "join",
    q: "How does a nonprofit join?",
    a: "Apply with your registration details. Once verified, donors can pledge their listings directly to your organisation.",
  },
  {
    id: "unsold",
    q: "What if my item does not sell?",
    a: "You can relist it, lower the price, or arrange to donate the item itself to a partner nonprofit instead.",
  },
  {
    id: "ship",
    q: "Who handles delivery?",
    a: "Buyers and sellers arrange handoff locally. For longer distances we provide a prepaid shipping label.",
  },
];

export const marqueeWords = ["Care", "Impact", "Hope", "Trust", "Unity", "Dignity"];
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: PASS (module is unused so far — no errors).

- [ ] **Step 3: Commit**

```bash
git add src/app/v1/_data.ts
git commit -m "feat(v1): add typed page content, story before statistics"
```

---

### Task 3: Shared primitives (`Button`, `Reveal`, `CountUp`, `SectionHeading`)

These encode the contrast rules and the reduced-motion rules once, so no section can violate them by accident.

**Files:**
- Create: `src/app/v1/_components/primitives.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `Button({ children, href, variant, size, className })` — `variant: "accent" | "deep" | "ghost"`, `size: "sm" | "lg"`. Renders an `<a>`.
  - `Reveal({ children, delay, className })` — scroll-triggered fade+rise, once only.
  - `CountUp({ value, suffix, className })` — animates 0→value once on view.
  - `SectionHeading({ eyebrow, title, sub, tone })` — `tone: "light" | "dark"`.

- [ ] **Step 1: Write the primitives**

The `Button` type system enforces the measured contrast rule: `variant="accent"` is only legal at `size="lg"` (ink label ≥18.66px semibold). A small accent button is made unrepresentable — `size="sm"` forces `deep` or `ghost`.

`src/app/v1/_components/primitives.tsx`:

```tsx
"use client";

import { motion, useInView, useReducedMotion, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Contrast-safe button.
 *
 * Measured ratios drive this API:
 *   ink #12262b on accent #3f8d99 = 4.10:1  → AA large text only (>=18.66px bold)
 *   cream       on deep   #0e3b3f = 11.46:1 → AA at any size
 *
 * So an accent fill is only ever allowed at the large size, with an ink label.
 * Small buttons must use the deep fill. The union below makes the illegal
 * combination unrepresentable rather than merely discouraged.
 */
type ButtonProps = { children: React.ReactNode; href: string; className?: string } & (
  | { variant: "accent"; size?: "lg" }
  | { variant: "deep" | "ghost"; size?: "sm" | "lg" }
);

export function Button({ children, href, variant, size = "lg", className = "" }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full transition-[background-color,color] duration-200 min-h-11 focus-visible:outline-2 focus-visible:outline-offset-2";

  // min-h-11 = 44px, satisfying the touch-target minimum.
  const sizes = {
    lg: "px-7 py-3.5 text-lg font-semibold", // 18px+ semibold → AA-large on accent
    sm: "px-5 py-2.5 text-sm font-medium",
  };

  const variants = {
    accent: "bg-[var(--v1-accent)] text-[var(--v1-ink)] hover:bg-[#357a85]",
    deep: "bg-[var(--v1-deep)] text-[var(--v1-cream)] hover:bg-[#0a2d30]",
    ghost:
      "bg-transparent text-[var(--v1-ink)] border border-[var(--v1-ink)]/20 hover:border-[var(--v1-ink)]/50",
  };

  return (
    <a href={href} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current opacity-60" />
      {children}
    </a>
  );
}

/** Scroll reveal: rise + fade, once. Snaps to end state under reduced motion. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

/** Formats with thousands separators; 200000 -> "2,00,000" is NOT used — plain en-IN grouping. */
function format(n: number) {
  return n.toLocaleString("en-IN");
}

/** Counts 0 -> value exactly once when scrolled into view. */
export function CountUp({
  value,
  suffix = "",
  className = "",
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const mv = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const controls = animate(mv, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduced, value, mv]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {format(display)}
      {suffix}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  tone?: "light" | "dark";
}) {
  const titleColor = tone === "dark" ? "text-[var(--v1-cream)]" : "text-[var(--v1-ink)]";
  const subColor = tone === "dark" ? "text-[var(--v1-cream)]/75" : "text-[var(--v1-ink-soft)]";

  return (
    <div className="text-center max-w-2xl mx-auto">
      {eyebrow ? (
        <p className={`text-sm font-medium uppercase tracking-widest mb-3 ${subColor}`}>{eyebrow}</p>
      ) : null}
      <h2 className={`text-3xl md:text-5xl font-bold ${titleColor}`}>{title}</h2>
      {sub ? <p className={`mt-4 text-base md:text-lg text-pretty ${subColor}`}>{sub}</p> : null}
    </div>
  );
}
```

- [ ] **Step 2: Verify the contrast rule is enforced by the type system**

Temporarily append this to the bottom of `primitives.tsx`:

```tsx
// @ts-expect-error accent buttons may not be small — contrast fails AA at body size
const _illegal = <Button href="#" variant="accent" size="sm">no</Button>;
```

Run: `npx tsc --noEmit`
Expected: **PASS.** If it reports "Unused '@ts-expect-error' directive", the union is wrong and a small accent button is legal — fix `ButtonProps` before continuing.

- [ ] **Step 3: Remove the assertion and typecheck clean**

Delete the `_illegal` block from Step 2.

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/app/v1/_components/primitives.tsx
git commit -m "feat(v1): add primitives; encode AA contrast rule in Button types"
```

---

### Task 4: Acquire imagery and record attribution

Done before the sections so no section renders a broken `<Image>`.

**Files:**
- Create: `public/images/v1/*` (photos + SVGs)
- Modify: `public/images/CREDITS.md`

**Interfaces:**
- Consumes: the exact paths referenced in `_data.ts` (Task 2).
- Produces: every file path in `_data.ts` exists on disk.

Required files, exactly as `_data.ts` references them:

| Path | Kind | Content |
|---|---|---|
| `public/images/v1/story-portrait.jpg` | photo | A woman with a sewing machine / at work |
| `public/images/v1/hero-volunteers.jpg` | photo | Volunteers sorting donations |
| `public/images/v1/hero-handoff.jpg` | photo | A person handing over a box |
| `public/images/v1/avatar-priya.jpg` | photo | Portrait headshot |
| `public/images/v1/avatar-rahul.jpg` | photo | Portrait headshot |
| `public/images/v1/avatar-neha.jpg` | photo | Portrait headshot |
| `public/images/v1/avatar-karan.jpg` | photo | Portrait headshot |
| `public/images/v1/undraw-donate.svg` | SVG | unDraw illustration |
| `public/images/v1/undraw-shop.svg` | SVG | unDraw illustration |
| `public/images/v1/undraw-community.svg` | SVG | unDraw illustration |

- [ ] **Step 1: Create the directory**

```bash
mkdir -p public/images/v1
```

- [ ] **Step 2: Download photography from Pexels**

Pexels photos are free to use, no attribution required (we credit anyway, matching the existing `CREDITS.md` convention). Use the Pexels download endpoint, which serves the file directly.

Pick images by browsing `https://www.pexels.com/search/<term>/` and copying each photo's numeric ID, then:

```bash
# Pattern — replace <ID> and <W> as needed:
#   https://images.pexels.com/photos/<ID>/pexels-photo-<ID>.jpeg?auto=compress&cs=tinysrgb&w=1200
curl -L -o public/images/v1/story-portrait.jpg \
  "https://images.pexels.com/photos/<ID>/pexels-photo-<ID>.jpeg?auto=compress&cs=tinysrgb&w=1200"
```

Fetch the 7 photos. Portraits: request `&w=400` (they render at ~64px, no need for 1200px).
Hero/story images: `&w=1200`.

**Verify each download is a real image, not an HTML error page:**

```bash
file public/images/v1/*.jpg
```
Expected: every line says `JPEG image data`. Any line saying `HTML document` means the URL 404'd — re-fetch that one.

- [ ] **Step 3: Download unDraw illustrations**

unDraw SVGs are licence-free (no attribution required). From `https://undraw.co/illustrations`, search "donate", "shopping", "community", set the accent colour to `#3f8d99` in unDraw's colour picker, download each SVG, and save to the three `undraw-*.svg` paths above.

**Verify:**
```bash
file public/images/v1/*.svg
head -c 120 public/images/v1/undraw-donate.svg
```
Expected: `SVG Scalable Vector Graphics image`, and the head shows an `<svg` root element.

- [ ] **Step 4: Confirm every path in `_data.ts` resolves**

```bash
grep -oE '/images/v1/[a-z-]+\.(jpg|svg)' src/app/v1/_data.ts | sort -u | sed 's|^|public|' | xargs -I{} test -f {} && echo "ALL PRESENT"
```
Expected: `ALL PRESENT`. (If it prints nothing, a referenced file is missing.)

- [ ] **Step 5: Append attribution to CREDITS.md**

Append to `public/images/CREDITS.md`, keeping the existing heading style. Fill in each real title/photographer/URL from the Pexels page you downloaded from:

```markdown
## /v1 landing — Pexels (free license)

- `v1/story-portrait.jpg` — [<title>](<pexels url>) by <photographer>
- `v1/hero-volunteers.jpg` — [<title>](<pexels url>) by <photographer>
- `v1/hero-handoff.jpg` — [<title>](<pexels url>) by <photographer>
- `v1/avatar-priya.jpg` — [<title>](<pexels url>) by <photographer>
- `v1/avatar-rahul.jpg` — [<title>](<pexels url>) by <photographer>
- `v1/avatar-neha.jpg` — [<title>](<pexels url>) by <photographer>
- `v1/avatar-karan.jpg` — [<title>](<pexels url>) by <photographer>

## /v1 landing — unDraw (license-free, no attribution required)

- `v1/undraw-donate.svg`, `v1/undraw-shop.svg`, `v1/undraw-community.svg` — [unDraw](https://undraw.co), recoloured to `#3f8d99`.
```

- [ ] **Step 6: Commit**

```bash
git add public/images/v1 public/images/CREDITS.md
git commit -m "chore(v1): add royalty-free imagery and attribution"
```

---

### Task 5: Navbar + Hero

**Files:**
- Create: `src/app/v1/_components/Navbar.tsx`
- Create: `src/app/v1/_components/Hero.tsx`
- Modify: `src/app/v1/page.tsx`

**Interfaces:**
- Consumes: `Button` from `primitives.tsx`; `hero`, `heroStats` from `_data.ts`.
- Produces: `<Navbar />`, `<Hero />` (no props).

- [ ] **Step 1: Write the Navbar**

The nav CTA is a *small* pill → per the contrast rule it must be `variant="deep"`, not accent.

`src/app/v1/_components/Navbar.tsx`:

```tsx
"use client";

import { Button } from "./primitives";

const links = [
  { href: "#story", label: "Our Story" },
  { href: "#doors", label: "How It Works" },
  { href: "#causes", label: "Causes" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  return (
    <nav aria-label="Main navigation" className="absolute inset-x-0 top-6 z-20 px-4 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full bg-[var(--v1-white)] py-2.5 pl-6 pr-2.5 shadow-sm">
        <a href="#top" className="text-xl font-bold tracking-tight text-[var(--v1-ink)]">
          Clutter<span className="text-[var(--v1-accent)]">.</span>Sale
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-[var(--v1-ink-soft)] transition-colors duration-200 hover:text-[var(--v1-ink)]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Small label → deep fill (11.46:1). An accent fill would fail AA here. */}
        <Button href="#cta" variant="deep" size="sm">
          Donate Now
        </Button>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Write the Hero**

`src/app/v1/_components/Hero.tsx`:

```tsx
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { hero, heroStats } from "../_data";
import { Button, CountUp } from "./primitives";
import { Navbar } from "./Navbar";

export function Hero() {
  const reduced = useReducedMotion();
  const rise = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <header id="top" className="relative overflow-hidden bg-[var(--v1-deep)] pb-16 pt-28 md:pb-24 md:pt-32">
      <Navbar />

      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div {...rise} transition={{ duration: 0.6, ease: "easeOut" }} className="text-center">
          <h1 className="text-4xl font-bold leading-[1.05] text-[var(--v1-cream)] sm:text-6xl md:text-7xl">
            {hero.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base text-[var(--v1-cream)]/75 md:text-lg">
            {hero.sub}
          </p>
          <div className="mt-9 flex justify-center">
            {/* Large label + ink text on accent = 4.10:1, AA-large. */}
            <Button href="#doors" variant="accent" size="lg">
              {hero.cta}
            </Button>
          </div>
        </motion.div>

        {/* Asymmetric cluster: photo · stacked stats · photo */}
        <motion.div
          {...rise}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="mt-14 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-3"
        >
          <div className="relative h-64 overflow-hidden rounded-3xl md:h-80">
            <Image
              src="/images/v1/hero-volunteers.jpg"
              alt="Volunteers sorting donated goods into boxes"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-1 flex-col justify-between rounded-3xl bg-[var(--v1-white)] p-7">
              <p className="text-4xl font-bold text-[var(--v1-accent)] md:text-5xl">
                <CountUp value={heroStats[0].value} suffix={heroStats[0].suffix} />
              </p>
              <p className="mt-6 text-sm text-[var(--v1-ink-soft)]">{heroStats[0].label}</p>
            </div>
            {/* The reference design fills this card with accent teal. We cannot: its
                small label would sit at 4.10:1 (ink) or 3.59:1 (cream) — both below AA
                body. Deep fill instead: cream label 11.46:1, accent numeral 3.19:1 which
                is fine at 48px (AA-large). */}
            <div className="flex flex-1 flex-col justify-between rounded-3xl bg-[var(--v1-deep)] p-7 ring-1 ring-[var(--v1-cream)]/15">
              <p className="text-4xl font-bold text-[var(--v1-accent)] md:text-5xl">
                <CountUp value={heroStats[1].value} suffix={heroStats[1].suffix} />
              </p>
              <p className="mt-6 text-sm font-medium text-[var(--v1-cream)]">{heroStats[1].label}</p>
            </div>
          </div>

          <div className="relative h-64 overflow-hidden rounded-3xl md:h-80">
            <Image
              src="/images/v1/hero-handoff.jpg"
              alt="A volunteer handing a box of goods to a neighbour"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Wire into the page**

`src/app/v1/page.tsx`:

```tsx
import { Hero } from "./_components/Hero";

export default function V1Page() {
  return (
    <main>
      <Hero />
    </main>
  );
}
```

- [ ] **Step 4: Typecheck, lint, and view**

Run: `npx tsc --noEmit && npm run lint`
Expected: both pass.

Run `npm run dev`, visit `/v1`:
- Deep-teal hero, floating white pill navbar, headline in Bricolage Grotesque.
- Both stat numerals count up **once**; scroll away and back — they do not re-run.
- Tab through the nav: each link and the Donate button shows a visible teal focus ring.

- [ ] **Step 5: Commit**

```bash
git add src/app/v1
git commit -m "feat(v1): add navbar and deep-teal hero with stat cluster"
```

---

### Task 6: Story section (the emotional hook)

The most important section on the page. It must render *before* any aggregate statistic.

**Files:**
- Create: `src/app/v1/_components/Story.tsx`
- Modify: `src/app/v1/page.tsx`

**Interfaces:**
- Consumes: `Reveal` from `primitives.tsx`; `story` from `_data.ts`.
- Produces: `<Story />` (no props).

- [ ] **Step 1: Write the Story section**

`src/app/v1/_components/Story.tsx`:

```tsx
"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { story } from "../_data";
import { Reveal } from "./primitives";

export function Story() {
  return (
    <section id="story" className="bg-[var(--v1-cream)] px-5 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mx-auto max-w-4xl text-balance text-center text-2xl font-medium leading-snug text-[var(--v1-ink)] sm:text-3xl md:text-4xl">
            {story.statement}
          </p>
        </Reveal>

        <div className="mt-16 grid items-center gap-10 md:mt-24 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div className="relative aspect-4/5 overflow-hidden rounded-3xl">
              <Image
                src={story.image}
                alt={story.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <figure>
              <blockquote className="text-pretty text-xl leading-relaxed text-[var(--v1-ink)] md:text-2xl">
                &ldquo;{story.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-sm font-medium text-[var(--v1-ink-soft)]">
                {story.name} — {story.city}
              </figcaption>
            </figure>

            {/* The concrete conversion: one object -> one outcome.
                The outcome text is ink, not accent: accent #3f8d99 on white is
                3.59:1, and at 16px semibold this is NOT "large text" (which needs
                >=18.66px bold or >=24px), so it would fail AA. The accent lives on
                the arrow icon, which is non-textual. */}
            <div className="mt-10 flex flex-col gap-4 rounded-3xl bg-(--v1-white) p-7 sm:flex-row sm:items-center">
              <p className="text-base font-semibold text-(--v1-ink)">{story.object}</p>
              <ArrowRight
                className="size-5 shrink-0 text-(--v1-accent) max-sm:rotate-90"
                aria-hidden="true"
              />
              <p className="text-base font-semibold text-(--v1-ink)">{story.outcome}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into the page**

`src/app/v1/page.tsx`:

```tsx
import { Hero } from "./_components/Hero";
import { Story } from "./_components/Story";

export default function V1Page() {
  return (
    <main>
      <Hero />
      <Story />
    </main>
  );
}
```

- [ ] **Step 3: Typecheck and view**

Run: `npx tsc --noEmit`
Expected: PASS.

Visit `/v1`, scroll to the story:
- The statement, portrait, quote, and object→outcome card reveal on scroll.
- Enable OS "reduce motion", reload: content is fully visible immediately, nothing animates.

- [ ] **Step 4: Commit**

```bash
git add src/app/v1
git commit -m "feat(v1): add story section — named person, one object, one outcome"
```

---

### Task 7: Doors (three audiences) + Impact band

Grouped: the impact band is the proof that immediately follows the mechanics, and both are short.

**Files:**
- Create: `src/app/v1/_components/Doors.tsx`
- Create: `src/app/v1/_components/ImpactBand.tsx`
- Modify: `src/app/v1/page.tsx`

**Interfaces:**
- Consumes: `Reveal`, `CountUp`, `SectionHeading`, `Button`; `doors`, `impactStats`.
- Produces: `<Doors />`, `<ImpactBand />`.

- [ ] **Step 1: Write Doors**

`src/app/v1/_components/Doors.tsx`:

```tsx
"use client";

import Image from "next/image";
import { doors } from "../_data";
import { Reveal, SectionHeading, Button } from "./primitives";

export function Doors() {
  return (
    <section id="doors" className="bg-[var(--v1-cream)] px-5 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Three ways in"
          title="However you arrive, it ends the same way"
          sub="Whether you give, buy, or receive — every path sends the full amount to a cause."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {doors.map((door, i) => (
            <Reveal key={door.id} delay={i * 0.1}>
              <article className="flex h-full flex-col rounded-3xl bg-[var(--v1-white)] p-8">
                <Image
                  src={door.illustration}
                  alt=""
                  aria-hidden="true"
                  width={160}
                  height={120}
                  className="h-28 w-auto object-contain"
                />
                <h3 className="mt-8 text-xl font-bold text-[var(--v1-ink)]">{door.title}</h3>
                <p className="mt-3 flex-1 text-pretty text-[var(--v1-ink-soft)]">{door.body}</p>
                <div className="mt-8">
                  <Button href="#cta" variant="ghost" size="sm">
                    {door.cta}
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Write ImpactBand**

Numerals are large (`text-5xl`), so accent-on-deep at 3.19:1 clears AA-large. Labels are small → cream on deep at 11.46:1.

`src/app/v1/_components/ImpactBand.tsx`:

```tsx
"use client";

import { impactStats } from "../_data";
import { CountUp, Reveal } from "./primitives";

export function ImpactBand() {
  return (
    <section aria-label="Our impact so far" className="bg-[var(--v1-deep)] px-5 py-20 sm:px-6 md:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 md:grid-cols-4">
        {impactStats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08}>
            <div className="text-center">
              <p className="text-4xl font-bold text-[var(--v1-accent)] md:text-5xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 text-sm text-[var(--v1-cream)]/80">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Wire into the page (order matters — Story precedes ImpactBand)**

`src/app/v1/page.tsx`:

```tsx
import { Hero } from "./_components/Hero";
import { Story } from "./_components/Story";
import { Doors } from "./_components/Doors";
import { ImpactBand } from "./_components/ImpactBand";

export default function V1Page() {
  return (
    <main>
      <Hero />
      <Story />
      <Doors />
      <ImpactBand />
    </main>
  );
}
```

- [ ] **Step 4: Typecheck and view**

Run: `npx tsc --noEmit`
Expected: PASS.

Visit `/v1`: illustrations render, three cards are equal height, impact numerals count once.

- [ ] **Step 5: Commit**

```bash
git add src/app/v1
git commit -m "feat(v1): add three-audience doors and impact proof band"
```

---

### Task 8: Voices, Causes, and Moments

Three presentational sections, grouped because none carries independent logic.

**Files:**
- Create: `src/app/v1/_components/Voices.tsx`
- Create: `src/app/v1/_components/Causes.tsx`
- Create: `src/app/v1/_components/Moments.tsx`
- Modify: `src/app/v1/page.tsx`

**Interfaces:**
- Consumes: `Reveal`, `SectionHeading`; `voices`, `causes`.
- Produces: `<Voices />`, `<Causes />`, `<Moments />`.

- [ ] **Step 1: Write Voices**

`src/app/v1/_components/Voices.tsx`:

```tsx
"use client";

import Image from "next/image";
import { voices } from "../_data";
import { Reveal, SectionHeading } from "./primitives";

export function Voices() {
  return (
    <section className="bg-[var(--v1-cream)] px-5 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Voices"
          title="Our impact, in their words"
          sub="Donors, buyers, and the nonprofits who receive what you give."
        />

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {voices.map((v, i) => (
            <li key={v.id}>
              <Reveal delay={i * 0.08} className="h-full">
                <figure className="flex h-full flex-col rounded-3xl bg-[var(--v1-white)] p-7">
                  <blockquote className="flex-1 text-pretty text-[var(--v1-ink)]">
                    &ldquo;{v.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <Image
                      src={v.avatar}
                      alt=""
                      aria-hidden="true"
                      width={44}
                      height={44}
                      className="size-11 rounded-full object-cover"
                    />
                    <span>
                      <span className="block text-sm font-semibold text-[var(--v1-ink)]">{v.name}</span>
                      <span className="block text-xs text-[var(--v1-ink-soft)]">{v.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Write Causes**

`src/app/v1/_components/Causes.tsx`:

```tsx
"use client";

import Image from "next/image";
import { causes } from "../_data";
import { Reveal, SectionHeading } from "./primitives";

export function Causes() {
  return (
    <section id="causes" className="bg-[var(--v1-cream)] px-5 pb-24 sm:px-6 md:pb-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Causes"
          title="Where the money goes"
          sub="Choose the cause your item funds. Every rupee reaches them."
        />

        <ul className="mt-16 grid gap-6 md:grid-cols-3">
          {causes.map((c, i) => (
            <li key={c.id}>
              <Reveal delay={i * 0.1} className="h-full">
                <article className="h-full overflow-hidden rounded-3xl bg-[var(--v1-white)]">
                  <div className="relative h-56">
                    <Image
                      src={c.image}
                      alt={`${c.name} — ${c.blurb}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-7">
                    <h3 className="text-xl font-bold text-[var(--v1-ink)]">{c.name}</h3>
                    <p className="mt-2 text-pretty text-sm text-[var(--v1-ink-soft)]">{c.blurb}</p>
                    <p className="mt-5 inline-block rounded-full bg-[var(--v1-deep)] px-4 py-1.5 text-xs font-semibold tabular-nums text-[var(--v1-cream)]">
                      {c.raised}
                    </p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Write Moments**

Reuses existing project photography. Decorative → `alt=""` + `aria-hidden`, wrapper is `aria-hidden` too since it carries no information.

`src/app/v1/_components/Moments.tsx`:

```tsx
"use client";

import Image from "next/image";

const shots = [
  "/images/community-giving.jpg",
  "/images/donation-box.jpg",
  "/images/thrifted-items.jpg",
  "/images/doorstep-handoff.jpg",
];

export function Moments() {
  return (
    <section aria-hidden="true" className="grid grid-cols-2 gap-2 bg-[var(--v1-cream)] px-2 pb-24 md:grid-cols-4 md:pb-32">
      {shots.map((src) => (
        <div key={src} className="relative h-44 overflow-hidden rounded-2xl md:h-64">
          <Image src={src} alt="" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
        </div>
      ))}
    </section>
  );
}
```

- [ ] **Step 4: Wire into the page**

`src/app/v1/page.tsx`:

```tsx
import { Hero } from "./_components/Hero";
import { Story } from "./_components/Story";
import { Doors } from "./_components/Doors";
import { ImpactBand } from "./_components/ImpactBand";
import { Voices } from "./_components/Voices";
import { Causes } from "./_components/Causes";
import { Moments } from "./_components/Moments";

export default function V1Page() {
  return (
    <main>
      <Hero />
      <Story />
      <Doors />
      <ImpactBand />
      <Voices />
      <Causes />
      <Moments />
    </main>
  );
}
```

- [ ] **Step 5: Typecheck and view**

Run: `npx tsc --noEmit`
Expected: PASS.

Visit `/v1`: avatars are circular and not distorted; cause cards are equal height; the photo strip is 2-up on mobile, 4-up on desktop.

- [ ] **Step 6: Commit**

```bash
git add src/app/v1
git commit -m "feat(v1): add voices, causes, and moments sections"
```

---

### Task 9: FAQ accordion

The only section with interactive state. Built on native `<button>` + `aria-expanded`.

**Files:**
- Create: `src/app/v1/_components/Faq.tsx`
- Modify: `src/app/v1/page.tsx`

**Interfaces:**
- Consumes: `SectionHeading`; `faqs`.
- Produces: `<Faq />`.

- [ ] **Step 1: Write the accordion**

Single-open accordion; first item open by default (spec). Uses `AnimatePresence` for height. Under reduced motion the panel appears/disappears without animating.

`src/app/v1/_components/Faq.tsx`:

```tsx
"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faqs } from "../_data";
import { SectionHeading } from "./primitives";

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(faqs[0].id);
  const reduced = useReducedMotion();

  return (
    <section id="faq" className="bg-[var(--v1-cream)] px-5 pb-24 sm:px-6 md:pb-32">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Questions"
          title="Frequently asked questions"
          sub="Honest answers about where your money goes and how it gets there."
        />

        <ul className="mt-14 flex flex-col gap-3">
          {faqs.map((f) => {
            const open = openId === f.id;
            return (
              <li key={f.id} className="overflow-hidden rounded-2xl bg-[var(--v1-white)]">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : f.id)}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${f.id}`}
                    className="flex min-h-14 w-full items-center justify-between gap-4 px-6 py-4 text-left"
                  >
                    <span className="text-base font-semibold text-[var(--v1-ink)]">{f.q}</span>
                    {open ? (
                      <Minus className="size-5 shrink-0 text-[var(--v1-accent)]" aria-hidden="true" />
                    ) : (
                      <Plus className="size-5 shrink-0 text-[var(--v1-ink-soft)]" aria-hidden="true" />
                    )}
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      id={`faq-panel-${f.id}`}
                      key="panel"
                      initial={reduced ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="border-t border-[var(--v1-ink)]/8 px-6 py-4 text-pretty text-[var(--v1-ink-soft)]">
                        {f.a}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into the page**

Add to `src/app/v1/page.tsx`, after `<Moments />`:

```tsx
import { Faq } from "./_components/Faq";
// ...
      <Moments />
      <Faq />
```

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 4: Verify accessibility manually**

Visit `/v1`, scroll to the FAQ:
1. First item is open on load.
2. `Tab` to a question, press `Enter` **and** `Space` — both toggle it (native `<button>` behaviour).
3. Opening one closes the other.
4. With DevTools open, inspect a question button: it has `aria-expanded="true"` when open, `"false"` when closed, and `aria-controls` matching the panel's `id`.
5. Each button is ≥44px tall (`min-h-14` = 56px).

- [ ] **Step 5: Commit**

```bash
git add src/app/v1
git commit -m "feat(v1): add accessible FAQ accordion"
```

---

### Task 10: Closing CTA (with marquee) + Footer

**Files:**
- Create: `src/app/v1/_components/ClosingCta.tsx`
- Create: `src/app/v1/_components/Footer.tsx`
- Modify: `src/app/v1/page.tsx`

**Interfaces:**
- Consumes: `Button`, `Reveal`; `marqueeWords` from `_data.ts`; `v1-marquee` class from `v1.css` (Task 1).
- Produces: `<ClosingCta />`, `<Footer />`.

- [ ] **Step 1: Write the ClosingCta**

The marquee duplicates its word list and travels `-50%`, so the loop is seamless. The duplicate is `aria-hidden` so screen readers hear each word once.

`src/app/v1/_components/ClosingCta.tsx`:

```tsx
"use client";

import Image from "next/image";
import { marqueeWords } from "../_data";
import { Button, Reveal } from "./primitives";

function WordStrip() {
  // Rendered twice: the -50% translate in `v1-marquee` makes the seam invisible.
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center gap-10 pr-10">
      {marqueeWords.map((w, i) => (
        <li
          key={w}
          className={`text-4xl font-bold md:text-6xl ${
            i % 2 === 0 ? "text-[var(--v1-cream)]" : "text-[var(--v1-accent)]"
          }`}
        >
          {w}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="mt-20 overflow-hidden" role="presentation">
      <div className="v1-marquee flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

export function ClosingCta() {
  return (
    <section id="cta" className="overflow-hidden bg-[var(--v1-deep)] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_auto_1fr]">
          <Reveal className="hidden md:block">
            <div className="relative h-56 w-full max-w-56 rotate-[-6deg] overflow-hidden rounded-3xl">
              <Image
                src="/images/v1/hero-volunteers.jpg"
                alt=""
                aria-hidden="true"
                fill
                sizes="224px"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal className="text-center">
            <h2 className="text-3xl font-bold leading-tight text-[var(--v1-cream)] sm:text-5xl">
              Your clutter can change
              <span className="block">a life today</span>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-pretty text-[var(--v1-cream)]/75">
              It costs you nothing but the thing you were never going to use again.
            </p>
            <div className="mt-9 flex justify-center">
              <Button href="#doors" variant="accent" size="lg">
                Start Giving
              </Button>
            </div>
          </Reveal>

          <Reveal className="hidden justify-self-end md:block">
            <div className="relative h-56 w-full max-w-56 rotate-[6deg] overflow-hidden rounded-3xl">
              <Image
                src="/images/v1/hero-handoff.jpg"
                alt=""
                aria-hidden="true"
                fill
                sizes="224px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>

      <WordStrip />
    </section>
  );
}
```

- [ ] **Step 2: Write the Footer**

`src/app/v1/_components/Footer.tsx`:

```tsx
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

const menu = [
  { href: "#top", label: "Home" },
  { href: "#story", label: "Our Story" },
  { href: "#causes", label: "Causes" },
  { href: "#faq", label: "FAQ" },
];

const quick = [
  { href: "#doors", label: "List an item" },
  { href: "#doors", label: "Browse items" },
  { href: "#doors", label: "Join as a nonprofit" },
  { href: "#cta", label: "Donate now" },
];

const socials = ["LinkedIn", "Instagram", "X", "Facebook"];

export function Footer() {
  return (
    <footer className="bg-[var(--v1-cream)] px-5 pb-10 pt-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 rounded-3xl bg-[var(--v1-white)] p-8 md:grid-cols-4 md:p-12">
          <div>
            <p className="text-xl font-bold text-[var(--v1-ink)]">
              Clutter<span className="text-[var(--v1-accent)]">.</span>Sale
            </p>
            <p className="mt-4 max-w-xs text-pretty text-sm text-[var(--v1-ink-soft)]">
              Sell what you no longer use. Choose a cause. They receive every rupee.
            </p>
            <p className="mt-8 text-xs text-[var(--v1-ink-soft)]">
              © {new Date().getFullYear()} Clutter Sale. All rights reserved.
            </p>
          </div>

          <nav aria-label="Footer menu">
            <h2 className="text-sm font-semibold text-[var(--v1-ink)]">Menu</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {menu.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-[var(--v1-ink-soft)] hover:text-[var(--v1-ink)]">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Quick links">
            <h2 className="text-sm font-semibold text-[var(--v1-ink)]">Quick Links</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {quick.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-[var(--v1-ink-soft)] hover:text-[var(--v1-ink)]">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold text-[var(--v1-ink)]">Contact Us</h2>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-[var(--v1-ink-soft)]">
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-[var(--v1-accent)]" aria-hidden="true" />
                hello@clutter.sale
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 text-[var(--v1-accent)]" aria-hidden="true" />
                <span className="tabular-nums">+91 95744 68870</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4 text-[var(--v1-accent)]" aria-hidden="true" />
                Ahmedabad, India
              </li>
            </ul>
          </div>
        </div>

        <ul className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {socials.map((s) => (
            <li key={s}>
              <a
                href="#top"
                className="flex min-h-14 items-center justify-between rounded-2xl bg-[var(--v1-white)] px-6 text-sm font-medium text-[var(--v1-ink)] transition-colors duration-200 hover:bg-[var(--v1-deep)] hover:text-[var(--v1-cream)]"
              >
                {s}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Complete the page**

`src/app/v1/page.tsx` — final form:

```tsx
import { Hero } from "./_components/Hero";
import { Story } from "./_components/Story";
import { Doors } from "./_components/Doors";
import { ImpactBand } from "./_components/ImpactBand";
import { Voices } from "./_components/Voices";
import { Causes } from "./_components/Causes";
import { Moments } from "./_components/Moments";
import { Faq } from "./_components/Faq";
import { ClosingCta } from "./_components/ClosingCta";
import { Footer } from "./_components/Footer";

export default function V1Page() {
  return (
    <>
      <main>
        <Hero />
        <Story />
        <Doors />
        <ImpactBand />
        <Voices />
        <Causes />
        <Moments />
        <Faq />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Typecheck and view**

Run: `npx tsc --noEmit`
Expected: PASS.

Visit `/v1`: the marquee scrolls seamlessly with no visible seam or gap at the loop point. Enable reduced motion → marquee holds still.

- [ ] **Step 5: Commit**

```bash
git add src/app/v1
git commit -m "feat(v1): add closing CTA with word marquee and footer"
```

---

### Task 11: Full verification pass

**Files:** none created. Fixes only, if the checks below surface problems.

- [ ] **Step 1: Static checks**

```bash
npx tsc --noEmit && npm run lint && npm run build
```
Expected: all three pass; build output lists `/v1` as a route.

- [ ] **Step 2: Verify `/` is untouched**

```bash
git diff --stat main -- src/app/page.tsx src/app/layout.tsx src/app/globals.css src/components/
```
Expected: **empty output.** Any diff here violates a Global Constraint — revert it.

- [ ] **Step 3: Heading hierarchy**

With `npm run dev` running, in the browser console on `/v1`:

```js
console.log([...document.querySelectorAll("h1,h2,h3,h4")].map((h) => h.tagName + " " + h.textContent.slice(0, 40)));
```
Expected: exactly one `H1` (the hero), then `H2`s per section, `H3`s nested inside them. **No level is skipped.**

- [ ] **Step 4: Reduced-motion pass**

Enable the OS "reduce motion" setting, hard-reload `/v1`:
- No reveal animations; all content visible immediately.
- Counters show their final values right away.
- Marquee is stationary.
- FAQ still opens/closes.

- [ ] **Step 5: Dark-mode isolation pass**

Switch the OS to dark mode, hard-reload:
- `/v1` is still cream and light.
- `/` still renders dark, and its theme toggle still works.

- [ ] **Step 6: Keyboard + touch-target pass**

- `Tab` from the top of `/v1`: focus ring is visible on every link and button.
- FAQ questions respond to `Enter` and `Space`.
- Every button/link hit area is ≥44×44px (nav CTA, FAQ rows, social cards, all `Button`s).

- [ ] **Step 7: Commit any fixes**

```bash
git add -A
git commit -m "fix(v1): resolve issues found in verification pass"
```

---

## Self-Review

**Spec coverage** — every spec section maps to a task:

| Spec requirement | Task |
|---|---|
| Route + scoped light-only tokens | 1 |
| `Bricolage Grotesque` scoped font | 1 |
| Lenis not double-mounted | 1 (Global Constraints) |
| Copy: story before statistics | 2 (`_data.ts` ordering), 7 Step 3 |
| Three audiences | 2, 7 |
| Measured contrast rules enforced | 3 (Button union), 5, 6, 7 |
| Reduced motion everywhere | 3, 5, 6, 9, 10, 11 |
| Imagery local + attributed | 4 |
| Hero band + stat cluster | 5 |
| Human opening | 6 |
| Impact proof band | 7 |
| Voices / Causes / Moments | 8 |
| FAQ accordion, first open | 9 |
| Closing CTA + marquee | 10 |
| Footer | 10 |
| `/` unaffected | 1 Step 5, 11 Step 2 |
| A11y (landmarks, headings, targets, focus) | 3, 9, 11 |

**Placeholder scan:** The only intentional placeholders are the `<title>` / `<photographer>` / `<pexels url>` fields in Task 4 Step 5 and the `<ID>` in Step 2 — these are values the implementer reads off the Pexels page at download time and cannot be known in advance. Task 4 Step 4 provides an executable check that every referenced path exists.

**Type consistency:** `_data.ts` exports (`Stat`, `Door`, `Voice`, `Cause`, `Faq`, `hero`, `story`, `heroStats`, `impactStats`, `doors`, `voices`, `causes`, `faqs`, `marqueeWords`) are the exact names imported in Tasks 5–10. `Button`, `Reveal`, `CountUp`, `SectionHeading` from `primitives.tsx` are used with the signatures declared in Task 3. `CountUp` takes `value`/`suffix`; `heroStats[i].suffix` and `impactStats[i].suffix` are both `string`, matching.

**Contrast deviations from the reference, resolved in-code:** at two points the literal Hopper design (accent teal behind small text) fails WCAG AA. Both now ship the *correct* code with a comment explaining the deviation, rather than showing wrong code followed by a correction step — an implementer reading tasks out of order would otherwise ship the failing version:
- Task 5, hero stat card → `bg-(--v1-deep)` with cream label, not `bg-(--v1-accent)` with ink label.
- Task 6, story outcome text → ink, not accent; the accent moves to the non-textual arrow icon.

**Tailwind v4 syntax:** the canonical `bg-(--token)` shorthand is mandated in Global Constraints. Several code blocks were authored with the v3-style `bg-[var(--token)]`; the constraint instructs conversion during implementation, and Task 11 Step 1 (`npm run lint`) is the gate that catches any that slip through.
