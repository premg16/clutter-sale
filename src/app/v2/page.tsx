"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Camera,
  Gavel,
  HandHeart,
  Heart,
  MapPin,
  PawPrint,
  Sprout,
} from "lucide-react";
import { useLenis } from "lenis/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { StoreBadges } from "./StoreBadges";
import "./v3.css";

/* ========================================================================== */
/* Motion                                                                     */
/* ========================================================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fades a block up the first time it scrolls into view. */
function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.55, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Counts to `value` once the number scrolls into view.
 *
 * Deliberately eases out: a linear count reads like a loading spinner, an
 * eased one reads like an arrival. Reduced-motion users get the final value.
 */
function CountUp({
  value,
  decimals = 0,
  duration = 1600,
}: {
  value: number;
  /** Render with this many decimal places, e.g. 2.4 for "$2.4M". */
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutExpo — a linear count reads like a spinner, an eased one arrives.
      const eased = t === 1 ? 1 : 1 - 2 ** (-10 * t);
      setN(eased * value);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, value, duration]);

  const shown = reduced ? value : n;
  return (
    <span ref={ref} className="v3-tabular">
      {/* Pinned to `en-US`: a bare toLocaleString() follows the visitor's browser,
          so a German reader would see "38.000" beside a "$" sign. */}
      {shown.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
    </span>
  );
}

/* ========================================================================== */
/* Primitives                                                                 */
/* ========================================================================== */

/** The small pill that sits above every section heading. */
function Eyebrow({ children, tone = "dark" }: { children: React.ReactNode; tone?: "dark" | "light" }) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5",
        "text-[10px] font-semibold uppercase tracking-[0.16em]",
        tone === "light"
          ? "border-white/30 text-white/90"
          : "border-[var(--v3-hairline)] text-[var(--v3-ink-soft)]",
      ].join(" ")}
    >
      <span className="size-1.5 rounded-full bg-[var(--v3-teal)]" aria-hidden />
      {children}
    </span>
  );
}

/** Primary action. White pill + dark square icon chip, per the inspiration. */
function ActionButton({
  children,
  href = "#",
  variant = "light",
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "light" | "teal";
}) {
  const light = variant === "light";
  return (
    <Link
      href={href}
      className={[
        "group inline-flex items-center gap-3 rounded-2xl py-2 pr-2 pl-6",
        "text-[15px] font-medium transition-transform duration-300 hover:-translate-y-0.5",
        light
          ? "bg-white text-[#16262b] shadow-[0_8px_24px_-8px_rgb(0_0_0_/_0.4)]"
          : "bg-[var(--v3-teal)] text-white shadow-[0_8px_24px_-8px_var(--v3-teal)]",
      ].join(" ")}
    >
      {children}
      <span
        className={[
          "grid size-9 place-items-center rounded-xl transition-transform duration-300",
          "group-hover:rotate-45",
          light ? "bg-[#16262b] text-white" : "bg-white/15 text-white",
        ].join(" ")}
        aria-hidden
      >
        <ArrowUpRight className="size-4" strokeWidth={2.2} />
      </span>
    </Link>
  );
}

/* ========================================================================== */
/* Data                                                                       */
/* ========================================================================== */

/** Nav targets double as the scroll-spy section ids. Order = document order. */
const NAV = [
  { label: "Home", id: "top" },
  { label: "Causes", id: "causes" },
  { label: "How it works", id: "how" },
  { label: "Stories", id: "stories" },
];

/**
 * Live height of the fixed header, read from the `--v3-header-h` custom property
 * (68px on phones, 84 at sm, 100 at lg — see v3.css). CSS owns the value so the
 * header, the sections' `scroll-margin-top`, and the hero's reserved padding can
 * never drift apart; JS only needs it for Lenis's scroll offset.
 *
 * Read off `.v3`, not `documentElement`: the property is scoped to that element,
 * so querying the root would return "" and silently fall back to the desktop
 * value on every breakpoint.
 */
function useHeaderHeight() {
  const [h, setH] = useState(100);

  useEffect(() => {
    const read = () => {
      const root = document.querySelector<HTMLElement>(".v3");
      if (!root) return;
      const v = getComputedStyle(root).getPropertyValue("--v3-header-h");
      const n = Number.parseInt(v, 10);
      if (n) setH(n);
    };
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, []);

  return h;
}

const VALUES = [
  { n: "01", title: "Nothing wasted", body: "Every object still has a life left in it. We find who needs it next." },
  { n: "02", title: "Nothing hidden", body: "You see the receipt. The nonprofit sees your name. No cut, no middleman." },
  { n: "03", title: "Nothing alone", body: "Neighbours buy from neighbours. The money never leaves the community." },
  { n: "04", title: "Nothing symbolic", body: "Not awareness. Not a badge. A bookshelf becomes a surgery." },
];

/** US dollars, grouped `en-US` so the figures never follow the visitor's locale. */
const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

const CAUSES = [
  {
    img: "/images/library-reading.jpg",
    alt: "Children in school uniforms reading books together in a bright library",
    icon: BookOpen,
    tag: "Education",
    place: "Oakland, CA",
    title: "After-School Reading Room",
    body: "Books, tutors, and a warm room for 40 kids whose parents work past six.",
    raised: 8420,
    goal: 12000,
    lots: 31,
  },
  {
    img: "/images/animal-rescue.jpg",
    alt: "A veterinarian gently examining a small rescue dog with a stethoscope",
    icon: PawPrint,
    tag: "Animal rescue",
    place: "Portland, OR",
    title: "Second Chance Vet Fund",
    body: "Surgeries for shelter animals who'd otherwise be listed as untreatable.",
    raised: 15300,
    goal: 18000,
    lots: 54,
    urgent: true,
  },
  {
    img: "/images/community-garden.jpg",
    alt: "Volunteers tending rows of leafy vegetables at an urban community garden",
    icon: Sprout,
    tag: "Food security",
    place: "Detroit, MI",
    title: "Lot 19 Community Farm",
    body: "A vacant lot now feeds forty families a week. Funded entirely by other people's closets.",
    raised: 6150,
    goal: 10000,
    lots: 22,
  },
];

const STEPS = [
  {
    icon: Camera,
    step: "01",
    title: "Photograph it where it sits",
    body: "Don't stage it. Don't clean it. Point your phone at the thing you've been stepping around for a year — our AI writes the title, the price, and the description.",
  },
  {
    icon: HandHeart,
    step: "02",
    title: "Choose who it's for",
    body: "Before it's listed, you name the cause. The shelter down the road. The reading room. The listing carries their name from the moment it goes live.",
  },
  {
    icon: Gavel,
    step: "03",
    title: "Sell it, or let them bid",
    body: "Fixed price, or open it to the neighbourhood and watch people bid each other up — for a cause, not for a bargain.",
  },
  {
    icon: Heart,
    step: "04",
    title: "Every cent lands",
    body: "It moves from the buyer to the nonprofit. Not through us. You get the receipt they got.",
  },
];

const STORIES = [
  {
    img: "/images/thrifted-items.jpg",
    alt: "A rail of secondhand clothing and homeware at a thrift market",
    tag: "Community impact",
    title: "The bookshelf that paid for a surgery",
    excerpt: "Marisol listed a bookshelf she'd stopped noticing. Eleven days later a dog named Otto walked again.",
    author: "Marisol Reyes",
    date: "March 8, 2026",
    featured: true,
  },
  {
    img: "/images/donation-box.jpg",
    alt: "A volunteer holding a cardboard box labelled donations",
    tag: "How it works",
    title: "Why we never touch the money",
    excerpt: "Escrow, receipts, and the reason 100% means 100%.",
    author: "Dev Ramanathan",
    date: "March 1, 2026",
  },
  {
    img: "/images/community-giving.jpg",
    alt: "Volunteers handing out supplies to neighbours on a sunny street",
    tag: "Volunteers",
    title: "The block that furnished a shelter",
    excerpt: "One street, one weekend, nineteen listings.",
    author: "Priya Chandra",
    date: "February 22, 2026",
  },
  {
    img: "/images/doorstep-handoff.jpg",
    alt: "Sold items packed and handed off on a neighbour's doorstep",
    tag: "Sellers",
    title: "Moving out without the guilt",
    excerpt: "What to do with a flat full of things you can't take with you.",
    author: "Tom Whitfield",
    date: "February 14, 2026",
  },
];

/* ========================================================================== */
/* Header                                                                     */
/* ========================================================================== */

/**
 * Fixed site header — always visible.
 *
 * Two skins: transparent while it floats over the hero photograph, and a
 * frosted paper bar once the hero has scrolled past. The switch is driven by an
 * IntersectionObserver on a sentinel at the bottom of the hero rather than a
 * scroll listener, so it costs nothing per frame.
 *
 * Nav links scroll-spy: the active pill follows the section in view. Clicking
 * one scrolls smoothly via the Lenis root instance when it's mounted (it isn't,
 * under `prefers-reduced-motion`), falling back to native `scrollIntoView`.
 */
function SiteHeader() {
  /** True once the hero no longer sits behind the header. */
  const [solid, setSolid] = useState(false);
  /** True while the header is slid out of view (user is scrolling down). */
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("top");
  const lenis = useLenis();
  const HEADER_H = useHeaderHeight();

  // Over the hero the controls are white on the photograph and the bar is
  // transparent. Past it, the page alternates light paper and dark teal bands, so
  // no single control colour survives — the header instead gets a frosted bar and
  // ink controls, which read on both.
  //
  // Observe the HERO itself, shrinking the root to the header band. (An earlier
  // version watched a 1px sentinel at the glass card's top; that sits *below* the
  // header's own height, so it read as "scrolled past" at scrollY 0 and painted
  // the controls ink directly on the photo.)
  // The rootMargin bakes in both HEADER_H and window.innerHeight, so the observer
  // is rebuilt whenever either can change — otherwise a rotate or breakpoint
  // crossing leaves a stale threshold and the ink/white switch fires at the
  // wrong scroll position.
  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;

    let io: IntersectionObserver;
    const build = () => {
      io?.disconnect();
      io = new IntersectionObserver(([e]) => setSolid(!e.isIntersecting), {
        rootMargin: `0px 0px -${Math.max(window.innerHeight - HEADER_H, 0)}px 0px`,
      });
      io.observe(hero);
    };
    build();
    window.addEventListener("resize", build);
    return () => {
      io?.disconnect();
      window.removeEventListener("resize", build);
    };
  }, [HEADER_H]);

  // Hide on scroll down, reveal on scroll up, so the bar never covers the copy it
  // would otherwise sit on. Always revealed near the top of the page.
  //
  // Lenis owns the root scroller. `useLenis(cb)` is the supported subscription —
  // it hands the instance to the callback and manages on/off itself. (Calling
  // `lenis.on('scroll', …)` by hand inside a useEffect silently never fires.)
  // `direction` is +1 scrolling down, -1 up, 0 idle — no manual delta tracking.
  useLenis((l) => {
    if (l.scroll < HEADER_H * 2) setHidden(false);
    else if (l.direction === 1) setHidden(true);
    else if (l.direction === -1) setHidden(false);
  });

  // Fallback for prefers-reduced-motion, where ReactLenis doesn't mount at all.
  useEffect(() => {
    if (lenis) return;
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < HEADER_H * 2) setHidden(false);
      else if (y > last + 4) setHidden(true);
      else if (y < last) setHidden(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lenis, HEADER_H]);

  // Scroll-spy. `-45% 0px -50%` makes a section "active" once it crosses the
  // middle of the viewport, which matches what a reader perceives as current.
  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const s of sections) io.observe(s);
    return () => io.disconnect();
  }, []);

  const go = (e: React.MouseEvent, id: string) => {
    const el = document.getElementById(id);
    if (!el) return; // let the browser handle a missing target
    e.preventDefault();
    if (lenis) lenis.scrollTo(el, { offset: -HEADER_H });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
    // Keep the URL shareable without triggering a second, instant jump.
    history.replaceState(null, "", `#${id}`);
  };

  // Padding mirrors the hero card's own inset (outer p-3/5/7 + inner p-6/8/10) so
  // the row lands exactly where it did when the nav lived inside the card.
  // Aligning to the viewport instead clipped the logo above the card's edge.
  // `pointer-events-none` on the bar keeps its empty gutters from eating clicks.
  return (
    <header
      className={[
        "pointer-events-none fixed inset-x-0 top-0 z-20",
        // Tailwind v4's `-translate-y-full` sets the standalone `translate`
        // property, NOT `transform` — transitioning `transform` here would snap.
        "transition-[translate,background-color] duration-300 ease-out",
        // Off the hero: a frosted bar, so the ink controls always have a surface.
        solid ? "bg-[var(--v3-paper)]/80 backdrop-blur-xl" : "px-3 pt-3 sm:px-5 sm:pt-5 lg:px-7 lg:pt-7",
        hidden ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
      // From CSS, not the JS value: correct on the server render and before
      // hydration, and it tracks the breakpoint without a resize round-trip.
      style={{ height: "var(--v3-header-h)" }}
    >
      <nav
        aria-label="Main"
        className={[
          "pointer-events-auto flex h-full items-center justify-between gap-4",
          solid ? "mx-auto max-w-[1240px] px-5 sm:px-8" : "px-6 sm:px-8 lg:px-10",
        ].join(" ")}
      >
        {/* Logo / toggle / CTA are white for the hero photo. Past the hero the
            page is light paper, so white would vanish — they flip to ink. The
            pill nav never changes; it carries its own white background. */}
        <a
          href="#top"
          onClick={(e) => go(e, "top")}
          className={`flex items-center gap-2.5 transition-colors duration-300 ${solid ? "text-[var(--v3-ink)]" : "text-white"}`}
        >
          <LogoMark className="size-9" />
          <span className="text-lg font-semibold tracking-tight">Clutter Sale</span>
        </a>

        {/* The floating white pill — the hero's original nav, unchanged. */}
        <ul className="hidden items-center gap-1 rounded-full bg-white/95 p-1.5 shadow-lg lg:flex">
          {NAV.map((item) => {
            const on = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => go(e, item.id)}
                  aria-current={on ? "true" : undefined}
                  className={[
                    "block rounded-full px-5 py-2 text-sm transition-colors",
                    on ? "font-semibold text-[#16262b]" : "text-[#55696e] hover:text-[#16262b]",
                  ].join(" ")}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          {/* size-11 = 44px, the WCAG minimum touch target. */}
          <ThemeToggle
            className={[
              "relative grid size-11 place-items-center rounded-full border transition-colors duration-300",
              solid
                ? "border-[var(--v3-hairline)] text-[var(--v3-ink)] hover:bg-[var(--v3-mint-quiet)]"
                : "border-white/40 text-white hover:bg-white/15",
            ].join(" ")}
          />
          <a
            href="#get-app"
            onClick={(e) => go(e, "get-app")}
            className={[
              "rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-300",
              solid
                ? "border-[var(--v3-hairline)] text-[var(--v3-ink)] hover:bg-[var(--v3-ink)] hover:text-[var(--v3-paper)]"
                : "border-white/40 text-white hover:bg-white hover:text-[#16262b]",
            ].join(" ")}
          >
            Get the app
          </a>
        </div>
      </nav>
    </header>
  );
}

/* ========================================================================== */
/* Sections                                                                   */
/* ========================================================================== */

/**
 * Hero.
 *
 * Full-bleed photograph with a floating glass card inset from every edge — the
 * signature move from the reference set. The nav used to live inside this card;
 * it's now the fixed `SiteHeader`, which floats transparently over the top of it.
 *
 * A <section>, not a <header>: SiteHeader owns that role for the page.
 */
function Hero() {
  return (
    <section id="top" className="relative min-h-dvh overflow-hidden p-3 sm:p-5 lg:p-7">
      <div className="absolute inset-0">
        <Image
          src="/images/community-giving.jpg"
          alt="Volunteers handing out supplies to neighbours on a sunny street"
          fill
          priority
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 v3-scrim" />
        <div className="absolute inset-0 v3-slats" aria-hidden />
      </div>

      {/* backdrop-blur/saturate come from Tailwind utilities, not v3.css — see
          the note above `.v3-glass` for why a raw declaration there is dropped. */}
      {/* backdrop-blur/saturate come from Tailwind utilities, not v3.css — see
          the note above `.v3-glass` for why a raw declaration there is dropped.
          Top padding clears the fixed header, which now lives outside the card. */}
      <div
        className="v3-glass relative flex min-h-[calc(100dvh-1.5rem)] flex-col rounded-[28px] p-6 pt-[var(--v3-header-h)] backdrop-blur-[3px] backdrop-saturate-[1.15] sm:min-h-[calc(100dvh-2.5rem)] sm:p-8 sm:pt-[var(--v3-header-h)] lg:min-h-[calc(100dvh-3.5rem)] lg:p-10 lg:pt-[var(--v3-header-h)]"
      >
        {/* Headline. py-8 on phones: py-16 pushed the trust line below an 844px
            viewport, so the hero's own proof never rendered above the fold. */}
        <div className="flex flex-1 flex-col justify-center py-8 sm:py-16 lg:py-20">
          <Reveal>
            <Eyebrow tone="light">Your clutter · someone&apos;s good day</Eyebrow>
          </Reveal>

          <Reveal delay={0.08}>
            {/* The <br>s give three clean lines on desktop. On phones they force
                a one-word orphan ("change"), so they're hidden and `text-balance`
                does the wrapping instead. */}
            <h1 className="mt-6 max-w-4xl text-balance text-[clamp(2.15rem,8.5vw,5.6rem)] font-normal leading-[1.02] tracking-tight text-white sm:mt-7 sm:leading-[0.95]">
              The thing you stopped
              <br className="hidden sm:inline" />
              {" "}noticing could change{" "}
              <br className="hidden sm:inline" />
              <span className="text-[var(--v3-on-dark)]">someone&apos;s year.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-8 max-w-lg text-pretty text-[17px] leading-relaxed text-white/75">
              Sell what you no longer use. Choose who it&apos;s for. Every cent goes
              to them — never to us.
            </p>
          </Reveal>

          {/* The product IS the app — listing happens on a phone, camera-first.
              Store badges are the primary action, not a secondary afterthought. */}
          <Reveal delay={0.24}>
            <div className="mt-10">
              <StoreBadges tone="onPhoto" />
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link
                  href="#causes"
                  className="v3-underline text-[15px] font-medium text-white/80 hover:text-white"
                >
                  See who&apos;s waiting
                </Link>
                <span className="text-sm text-white/50">Free · iOS &amp; Android</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Foot of hero: proof, quietly */}
        <Reveal delay={0.3}>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/15 pt-5 text-xs text-white/60 sm:gap-x-8 sm:gap-y-3 sm:pt-6 sm:text-sm">
            <span>100% to the nonprofit</span>
            <span aria-hidden className="hidden sm:block">·</span>
            <span>Escrowed payments</span>
            <span aria-hidden className="hidden sm:block">·</span>
            <span>Receipt in your inbox</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Social glyphs                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Light-stroke social marks, drawn rather than pulled from an icon set: the
 * footer needs a consistent hairline weight (1.25) that matches the glassy
 * circles they sit in, and the brand marks ship as solid fills everywhere else.
 * `currentColor` so they inherit the link's hover transition.
 */
const glyph = {
  strokeWidth: 1.25,
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...glyph} aria-hidden focusable="false">
      <rect x="3" y="3" width="18" height="18" rx="5.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...glyph} aria-hidden focusable="false">
      <path d="M4 4l16 16M20 4L4 20" />
    </svg>
  );
}

function FacebookGlyph({ className }: { className?: string }) {
  // Roman "f": stem descends the full height, hooks right at the top, crossbar
  // cuts through it. Drawn as one stroke + one bar — a lighter, more legible
  // read at 18px than the solid brand mark.
  return (
    <svg viewBox="0 0 24 24" className={className} {...glyph} aria-hidden focusable="false">
      <path d="M15.5 4.5h-1.6a3 3 0 0 0-3 3v12" />
      <path d="M8.5 10.5h6" />
    </svg>
  );
}

const SOCIALS = [
  { label: "Instagram", Glyph: InstagramGlyph },
  { label: "X", Glyph: XGlyph },
  { label: "Facebook", Glyph: FacebookGlyph },
] as const;


/**
 * About + values + the stats band.
 *
 * The stats deliberately live HERE — a section away from the personal story
 * below. Research on the identifiable-victim effect is consistent: placing a
 * number beside a face measurably *reduces* giving, because it flips the
 * reader out of empathy and into arithmetic. So the two never share a screen.
 */
function About() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:py-32">
      <Reveal>
        <Eyebrow>About</Eyebrow>
      </Reveal>

      <div className="mt-9 grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
        <Reveal delay={0.05}>
          <h2 className="text-balance text-[clamp(1.85rem,3.4vw,3.1rem)] font-normal leading-[1.1] tracking-tight">
            Clutter Sale turns the things you&apos;ve outgrown into money for the
            causes your neighbourhood can&apos;t afford to lose.
          </h2>
        </Reveal>

        <Reveal delay={0.12} className="flex flex-col justify-between gap-10">
          <p className="max-w-sm text-pretty leading-relaxed text-[var(--v3-ink-soft)]">
            Most people want to give and don&apos;t know how much. It turns out you
            already own the answer — it&apos;s in the garage, under the stairs, in
            the back of a wardrobe.
          </p>

          <dl className="flex gap-12">
            <div>
              <dt className="sr-only">Raised for nonprofits</dt>
              <dd className="text-[clamp(2rem,3.4vw,2.9rem)] font-normal leading-none tracking-tight">
                $<CountUp value={2.4} decimals={1} />
                <span className="align-super text-lg text-[var(--v3-teal)]">M</span>
              </dd>
              <p className="mt-2 text-sm text-[var(--v3-ink-soft)]">Raised, every cent passed on</p>
            </div>
            <div>
              <dt className="sr-only">Items rehomed</dt>
              <dd className="text-[clamp(2rem,3.4vw,2.9rem)] font-normal leading-none tracking-tight">
                <CountUp value={38000} />
                <span className="align-super text-lg text-[var(--v3-teal)]">+</span>
              </dd>
              <p className="mt-2 text-sm text-[var(--v3-ink-soft)]">Things kept out of landfill</p>
            </div>
          </dl>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="relative mt-14 aspect-[21/9] overflow-hidden rounded-[var(--v3-radius-lg)]">
          <Image
            src="/images/donation-box.jpg"
            alt="Two people passing a tin of food between them over a box of donations"
            fill
            sizes="(max-width: 1240px) 100vw, 1240px"
            className="object-cover"
          />
        </div>
      </Reveal>

      <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {VALUES.map((v, i) => (
          <Reveal key={v.n} delay={i * 0.06}>
            <div className="border-t border-[var(--v3-hairline)] pt-5">
              <div className="flex items-baseline gap-3">
                <span className="text-sm text-[var(--v3-teal)]">{v.n}</span>
                <h3 className="text-[17px] font-semibold tracking-tight">{v.title}</h3>
              </div>
              <p className="mt-2.5 text-[15px] leading-relaxed text-[var(--v3-ink-soft)]">{v.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/**
 * The emotional core.
 *
 * One person. One object. One outcome. No statistics anywhere in this section —
 * that's the whole point. The reader should finish it knowing a dog's name.
 */
function Story() {
  return (
    <section className="relative overflow-hidden bg-[var(--v3-teal-deep)] text-[var(--v3-cream)]">
      <div className="absolute inset-0 v3-slats opacity-60" aria-hidden />

      <div className="relative mx-auto grid max-w-[1240px] items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-32">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--v3-radius-lg)] lg:aspect-[4/4.4]">
            <Image
              src="/images/animal-rescue.jpg"
              alt="A veterinarian gently examining a small rescue dog with a stethoscope"
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow tone="light">One listing</Eyebrow>
          </Reveal>

          <Reveal delay={0.06}>
            <blockquote className="mt-8">
              {/* Single expression, not multi-line JSX text: React normalises the
                  indentation differently on server vs client and hydration fails. */}
              <p className="text-balance text-[clamp(1.6rem,2.9vw,2.55rem)] font-normal leading-[1.18] tracking-tight">
                {"“It was a bookshelf. I’d stopped seeing it. Eleven days later a dog called Otto had the surgery he needed, and someone sent me a photograph of him standing up.”"}
              </p>

              <footer className="mt-9 flex items-center gap-4">
                <div className="grid size-11 place-items-center rounded-full bg-[var(--v3-on-dark)] text-[15px] font-semibold text-[var(--v3-teal-deeper)]">
                  MR
                </div>
                <div>
                  <p className="font-medium">Marisol Reyes</p>
                  <p className="text-sm text-[var(--v3-cream)]/60">Sold one bookshelf · Portland, OR</p>
                </div>
              </footer>
            </blockquote>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-10 max-w-md text-pretty leading-relaxed text-[var(--v3-cream)]/70">
              She didn&apos;t donate. She didn&apos;t fundraise. She photographed
              something she&apos;d already decided to throw away.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-9">
              <ActionButton href="#stories">Read Marisol&apos;s story</ActionButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Cause cards, each with a live funding meter and an item count. */
function Causes() {
  return (
    <section id="causes" className="scroll-mt-[var(--v3-header-h)] mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:py-32">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <Reveal>
            <Eyebrow>Causes</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 max-w-xl text-balance text-[clamp(1.85rem,3.4vw,3.1rem)] font-normal leading-[1.1] tracking-tight">
              Three of them are short this month
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <Link
            href="#causes"
            className="v3-underline flex items-center gap-2 text-[15px] font-medium text-[var(--v3-teal)]"
          >
            All 128 causes <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CAUSES.map((c, i) => {
          const pct = Math.round((c.raised / c.goal) * 100);
          const Icon = c.icon;

          return (
            <Reveal key={c.title} delay={i * 0.08}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[var(--v3-radius)] bg-[var(--v3-raised)] shadow-[var(--v3-shadow)] transition-transform duration-500 hover:-translate-y-1.5">
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image
                    src={c.img}
                    alt={c.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1240px) 50vw, 390px"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                  />
                  {c.urgent && (
                    <span className="absolute top-4 left-4 rounded-full bg-[var(--v3-ember)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                      Closes Friday
                    </span>
                  )}
                  <span className="absolute top-4 right-4 grid size-9 place-items-center rounded-xl bg-white/90 text-[#16262b] backdrop-blur">
                    <Icon className="size-4" strokeWidth={1.8} aria-hidden />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-xs text-[var(--v3-ink-soft)]">
                    <span className="rounded-full bg-[var(--v3-mint-quiet)] px-2.5 py-1 font-medium text-[var(--v3-teal)]">
                      {c.tag}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-3.5" aria-hidden /> {c.place}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-semibold tracking-tight">{c.title}</h3>
                  <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-[var(--v3-ink-soft)]">
                    {c.body}
                  </p>

                  <div className="mt-6">
                    <div
                      className="v3-meter"
                      style={{ "--v3-pct": `${pct}%` } as React.CSSProperties}
                      role="progressbar"
                      aria-valuenow={pct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${c.title} funding progress`}
                    />
                    <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 text-sm">
                      <span className="font-semibold">
                        <span className="v3-tabular">{usd(c.raised)}</span>
                        <span className="font-normal text-[var(--v3-ink-soft)]">
                          {" "}
                          of {usd(c.goal)}
                        </span>
                      </span>
                      <span className="text-[var(--v3-ink-soft)]">{c.lots} items listed</span>
                    </div>
                  </div>

                  <Link
                    href="#how"
                    className="mt-6 flex items-center justify-between rounded-xl bg-[var(--v3-mint-quiet)] px-4 py-3 text-sm font-medium text-[var(--v3-teal)] transition-colors hover:bg-[var(--v3-teal)] hover:text-white"
                  >
                    Sell something for them
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/** How it works — four steps, alternating rhythm, no card chrome. */
function How() {
  return (
    <section id="how" className="scroll-mt-[var(--v3-header-h)] border-y border-[var(--v3-hairline)] bg-[var(--v3-mint-quiet)]">
      <div className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-16 lg:self-start">
            <Reveal>
              <Eyebrow>How it works</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 text-balance text-[clamp(1.85rem,3.4vw,3.1rem)] font-normal leading-[1.1] tracking-tight">
                Four steps. About nine minutes.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-sm text-pretty leading-relaxed text-[var(--v3-ink-soft)]">
                The hardest part is deciding you&apos;re done with it. We built the
                rest to get out of your way.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-9">
                <ActionButton href="#get-app" variant="teal">
                  Get the app
                </ActionButton>
              </div>
            </Reveal>
          </div>

          <ol className="space-y-2">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.step} delay={i * 0.07}>
                  <li className="group flex gap-5 rounded-[var(--v3-radius)] bg-[var(--v3-raised)] p-6 shadow-[var(--v3-shadow)] sm:gap-7 sm:p-7">
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[var(--v3-teal-deep)] text-[var(--v3-on-dark)]">
                      <Icon className="size-5" strokeWidth={1.7} aria-hidden />
                    </span>
                    <div>
                      <div className="flex items-baseline gap-3">
                        <span className="text-sm text-[var(--v3-teal)]">{s.step}</span>
                        <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
                      </div>
                      <p className="mt-2.5 text-pretty text-[15px] leading-relaxed text-[var(--v3-ink-soft)]">
                        {s.body}
                      </p>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/**
 * Wide CTA band with a photo bleeding off the right edge.
 *
 * Also the `#get-app` anchor: every "Get the app" link on the page lands here,
 * so the store badges are always one jump away. `scroll-mt` keeps the heading
 * clear of the viewport edge on arrival.
 */
function CtaBand() {
  return (
    <section id="get-app" className="mx-auto max-w-[1240px] scroll-mt-[var(--v3-header-h)] px-5 pt-24 sm:px-8 lg:pt-32">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-[var(--v3-radius-lg)] bg-[var(--v3-teal-deep)]">
          <div className="absolute inset-y-0 right-0 w-full lg:w-[52%]">
            <Image
              src="/images/doorstep-handoff.jpg"
              alt="Sold items packed and handed off on a neighbour's doorstep"
              fill
              sizes="(max-width: 1024px) 100vw, 640px"
              className="object-cover"
            />
            {/* Below lg the photo spans the whole card, so a left→right fade would
                leave the copy sitting on the bright half of it. Fade bottom-up
                there instead, and only switch to the horizontal fade once the
                photo is confined to its own 52% column. */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[var(--v3-teal-deep)] via-[var(--v3-teal-deep)]/85 to-[var(--v3-teal-deep)]/60 lg:bg-gradient-to-r lg:from-[var(--v3-teal-deep)] lg:via-[var(--v3-teal-deep)]/30 lg:to-transparent"
              aria-hidden
            />
            <div className="absolute inset-0 v3-slats" aria-hidden />
          </div>

          <div className="relative flex flex-col gap-6 p-7 sm:gap-8 sm:p-12 lg:max-w-[56%] lg:p-16">
            <h2 className="text-balance text-[clamp(1.75rem,6vw,3.2rem)] font-normal leading-[1.08] tracking-tight text-white lg:leading-[1.05]">
              Something in your house
              <br className="hidden lg:inline" />
              {" "}is worth more to them.
            </h2>
            <p className="max-w-md text-pretty leading-relaxed text-white/70">
              It takes one photograph to find out. Pick a cause, name a price, and
              let it go somewhere it&apos;s needed.
            </p>
            <div>
              <StoreBadges tone="onTeal" />
              <p className="mt-5 text-sm text-white/55">
                Free to download. Free to list. 100% of every sale reaches the cause.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/** Featured story + a sidebar of three, mirroring the reference blog block. */
function Stories() {
  const [featured, ...rest] = STORIES;

  return (
    <section id="stories" className="scroll-mt-[var(--v3-header-h)] mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:py-32">
      <Reveal>
        <Eyebrow>Stories</Eyebrow>
      </Reveal>

      <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
        <Reveal delay={0.05}>
          <h2 className="max-w-xl text-balance text-[clamp(1.85rem,3.4vw,3.1rem)] font-normal leading-[1.1] tracking-tight">
            What happened next
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-xs text-pretty text-[15px] leading-relaxed text-[var(--v3-ink-soft)]">
            The receipts, the follow-ups, the photographs people send back months
            later.
          </p>
        </Reveal>
      </div>

      {/* `*:min-w-0` — grid items default to `min-width: auto`, so the sidebar's
          fixed-width thumbnail + text forced a 404px track inside a 350px
          container and the whole page scrolled sideways on mobile. */}
      <div className="mt-14 grid gap-6 *:min-w-0 lg:grid-cols-[1.15fr_1fr]">
        {/* Featured */}
        <Reveal>
          <article className="group flex h-full flex-col overflow-hidden rounded-[var(--v3-radius)] bg-[var(--v3-raised)] shadow-[var(--v3-shadow)]">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={featured.img}
                alt={featured.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 660px"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex flex-1 flex-col p-5 sm:p-7">
              <span className="w-fit rounded-full bg-[var(--v3-mint-quiet)] px-2.5 py-1 text-xs font-medium text-[var(--v3-teal)]">
                {featured.tag}
              </span>
              <h3 className="mt-4 text-balance text-2xl font-semibold leading-tight tracking-tight">
                {featured.title}
              </h3>
              <p className="mt-3 flex-1 text-pretty leading-relaxed text-[var(--v3-ink-soft)]">
                {featured.excerpt}
              </p>
              {/* Stacks on phones: side-by-side, the byline wrapped onto two
                  lines and collided with the button. */}
              <div className="mt-6 flex flex-col items-start gap-4 border-t border-[var(--v3-hairline)] pt-5 sm:mt-7 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-[var(--v3-ink-soft)]">
                  {featured.author} · {featured.date}
                </p>
                <Link
                  href="#stories"
                  className="shrink-0 rounded-xl bg-[var(--v3-teal-deep)] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--v3-teal)]"
                >
                  Read more
                </Link>
              </div>
            </div>
          </article>
        </Reveal>

        {/* Sidebar */}
        <div className="grid gap-4 *:min-w-0">
          {rest.map((s, i) => (
            <Reveal key={s.title} delay={0.06 * (i + 1)}>
              <article className="group flex h-full gap-4 overflow-hidden rounded-[var(--v3-radius)] bg-[var(--v3-raised)] p-4 shadow-[var(--v3-shadow)] sm:gap-5">
                <div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-xl sm:w-36">
                  <Image
                    src={s.img}
                    alt={s.alt}
                    fill
                    sizes="144px"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col py-1">
                  <span className="w-fit text-xs font-medium text-[var(--v3-teal)]">{s.tag}</span>
                  <h3 className="mt-1.5 text-balance font-semibold leading-snug tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[var(--v3-ink-soft)]">
                    {s.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                    <p className="truncate text-xs text-[var(--v3-ink-soft)]">
                      {s.author} · {s.date}
                    </p>
                    <Link
                      href="#stories"
                      className="v3-underline flex shrink-0 items-center gap-1 text-xs font-semibold uppercase tracking-wider"
                    >
                      Read <ArrowUpRight className="size-3" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Dark footer with the newsletter capture, per the reference. */
function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[var(--v3-teal-deeper)] text-[var(--v3-cream)]">
      <div className="absolute inset-0 v3-slats opacity-50" aria-hidden />

      <div className="relative mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-20">
        {/* Phones: the two short link columns sit side by side rather than each
            taking a full row — four stacked blocks made the footer endless. */}
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-[1.2fr_0.7fr_0.7fr_1.4fr]">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark className="size-10" />
              <span className="text-2xl font-semibold tracking-tight">Clutter Sale</span>
            </div>
            <p className="mt-5 max-w-xs text-pretty text-sm leading-relaxed text-[var(--v3-cream)]/60">
              Turning the things people stopped noticing into the money a
              neighbourhood needed.
            </p>
            <StoreBadges tone="onTeal" className="mt-7" />
          </div>

          <nav aria-label="Explore">
            <h2 className="text-sm font-semibold">Explore</h2>
            <ul className="mt-4 space-y-3 text-sm text-[var(--v3-cream)]/60">
              {[
                { label: "Browse causes", href: "#causes" },
                { label: "Download the app", href: "#get-app" },
                { label: "Live auctions", href: "#causes" },
                { label: "For nonprofits", href: "#get-app" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="v3-underline hover:text-[var(--v3-cream)]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="text-sm font-semibold">Company</h2>
            <ul className="mt-4 space-y-3 text-sm text-[var(--v3-cream)]/60">
              {["How it works", "Trust & safety", "Stories", "Contact"].map((l) => (
                <li key={l}>
                  <Link href="#top" className="v3-underline hover:text-[var(--v3-cream)]">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-lg font-semibold tracking-tight">Stay connected with impact</h2>
            <form
              className="mt-5 flex gap-2"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter signup"
            >
              <label htmlFor="v3-email" className="sr-only">
                Email address
              </label>
              <input
                id="v3-email"
                type="email"
                required
                placeholder="Enter your email here"
                // No focus ring: the border brightens instead. The global
                // `.v3 :focus-visible` outline is suppressed here so the two
                // don't stack into the doubled ring this used to render.
                className="v3-field min-w-0 flex-1 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-[var(--v3-cream)] transition-colors placeholder:text-[var(--v3-cream)]/40 focus:border-white/45 focus:bg-white/10"
              />
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-[var(--v3-on-dark)] px-5 py-3 text-sm font-semibold text-[var(--v3-teal-deeper)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Submit
              </button>
            </form>
            <p className="mt-3 text-xs leading-relaxed text-[var(--v3-cream)]/50">
              A story a month. The kind with a photograph at the end. Nothing else.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-[var(--v3-cream)]/50">
          <p>© {new Date().getFullYear()} Clutter Sale. Every cent, every time.</p>
          <div className="flex gap-2">
            {SOCIALS.map(({ label, Glyph }) => (
              <Link
                key={label}
                href="#top"
                className="grid size-10 place-items-center rounded-full border border-white/15 bg-white/5 text-[var(--v3-cream)]/70 backdrop-blur-sm transition-colors hover:border-white/35 hover:bg-white/10 hover:text-[var(--v3-cream)]"
                aria-label={label}
              >
                <Glyph className="size-[18px]" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ========================================================================== */

export default function V3Page() {
  return (
    <main className="v3">
      <SiteHeader />
      <Hero />
      <About />
      <Story />
      <Causes />
      <How />
      <CtaBand />
      <Stories />
      <Footer />
    </main>
  );
}
