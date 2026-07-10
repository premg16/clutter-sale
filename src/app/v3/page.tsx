"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock,
  Heart,
  Menu,
  Quote,
  Smartphone,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  app,
  causes,
  doors,
  faqs,
  finalCta,
  hero,
  impact,
  nav,
  photoColumns,
  pledges,
  ribbon,
  steps,
  story,
  voices,
} from "./_data";
import { StoreBadges } from "./StoreBadges";
import "./v4.css";

/* ========================================================================== */
/* Motion primitives                                                          */
/* ========================================================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fades a block up the first time it scrolls into view. */
function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section";
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

/**
 * One line of the hero headline, rising into its own `overflow-hidden` clip.
 *
 * Under reduced motion this renders a plain <span> rather than a <motion.span>
 * with the animation props stripped. That distinction is load-bearing: framer
 * applies `initial` on mount, so a `motion.span` handed no `animate` keeps
 * `translateY(110%)` forever — parking the text below its clip. The line then
 * measures the right size, reports `opacity: 1`, sits on top of the stacking
 * order, and paints absolutely nothing.
 */
function HeroLine({ index, children }: { index: number; children: React.ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) return <span className="block">{children}</span>;

  return (
    <motion.span
      className="block"
      initial={{ y: "110%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.85, ease: EASE, delay: 0.25 + index * 0.1 }}
    >
      {children}
    </motion.span>
  );
}

/**
 * Counts to `value` once the number scrolls into view.
 *
 * Eased, not linear: a linear count reads like a loading spinner, an eased one
 * reads like an arrival. Reduced-motion users are handed the final value with
 * no animation at all.
 */
function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;

    let raf = 0;
    const start = performance.now();
    const DURATION = 1500;

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      // easeOutExpo — fast arrival, soft landing.
      const eased = t === 1 ? 1 : 1 - 2 ** (-10 * t);
      setN(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, value]);

  const shown = reduced ? value : n;

  return (
    <span ref={ref} className="v4-tabular">
      {shown.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

/* ========================================================================== */
/* Shared bits                                                                */
/* ========================================================================== */

/**
 * The brand mark.
 *
 * `public/logo.svg` ships as a 1375x2048 portrait lockup whose FIRST path is an
 * opaque `#f7f7f6` full-canvas plate, with the wordmark below the icon. Dropped
 * into a 32px header slot that renders as a pale rectangle with an illegible
 * speck in it. `logo-mark.svg` is the same artwork with the plate removed and
 * the viewBox tightened to the icon's measured ink bounds (245,434→1106,1432),
 * so it fills a square slot edge to edge.
 *
 * The light shapes inside the mark are real artwork, not background — so this
 * is never recoloured to `currentColor`. It carries its own brand palette
 * (navy #012830, orange #db5923, teal #57898e) on both light and dark surfaces.
 */
function LogoMark({ className = "size-9" }: { className?: string }) {
  return (
    <Image
      src="/logo-mark.svg"
      alt=""
      width={40}
      height={40}
      className={className}
      // Decorative: every call site pairs it with the "Clutter Sale" wordmark
      // or an aria-label, so announcing it again is noise.
      aria-hidden
    />
  );
}

function Button({
  href,
  children,
  variant = "solid",
  onClick,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "gold";
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}) {
  const scrollTo = useAnchorScroll();
  return (
    <a
      href={href}
      onClick={(e) => {
        onClick?.(e);
        scrollTo(e, href);
      }}
      className={`v4-btn v4-btn-${variant} ${className}`}
    >
      {children}
      <ArrowRight className="size-4" aria-hidden />
    </a>
  );
}

/** Section heading pair: a small uppercase eyebrow above an editorial serif h2. */
function SectionHead({
  eyebrow,
  title,
  sub,
  align = "center",
  tone = "light",
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-xl"}`}>
      <Reveal>
        <p
          className="v4-eyebrow"
          style={{ color: tone === "dark" ? "var(--v4-on-dark)" : "var(--v4-teal)" }}
        >
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2
          className="mt-3 text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.06]"
          style={{ color: tone === "dark" ? "var(--v4-cream)" : "var(--v4-ink)" }}
        >
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.12}>
          <p
            className="mt-4 text-[1.0625rem] leading-relaxed"
            style={{
              color: tone === "dark"
                ? "color-mix(in srgb, var(--v4-cream) 76%, transparent)"
                : "var(--v4-ink-soft)",
            }}
          >
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ========================================================================== */
/* Anchor scrolling                                                           */
/* ========================================================================== */

/**
 * Smooth-scrolls to an in-page anchor through Lenis, offset by the fixed
 * header so the section title isn't hidden underneath it.
 *
 * Falls back to the browser's native anchor jump when Lenis isn't mounted —
 * which is exactly the reduced-motion case, since <SmoothScroll> bails there.
 * CSS `scroll-margin-top` on `[id]` covers the offset in that path.
 */
function useAnchorScroll() {
  const lenis = useLenis();

  return (e: React.MouseEvent, href: string) => {
    if (!href.startsWith("#") || !lenis) return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target as HTMLElement, { offset: -92 });
  };
}

/**
 * Which section is currently under the header.
 *
 * IntersectionObserver rather than scroll math: it doesn't fire on every
 * frame, and the rootMargin box (a thin band just under the header) means the
 * "active" section is the one actually being read, not merely the one nearest
 * the top of the document.
 */
function useScrollSpy(ids: readonly string[]) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Among everything currently intersecting the band, take the topmost.
        const visible = entries
          .filter((en) => en.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(`#${visible[0].target.id}`);
      },
      // Band spans from just below the header to 55% up from the bottom.
      { rootMargin: "-92px 0px -45% 0px", threshold: 0 },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  return active;
}

/* ========================================================================== */
/* Header                                                                     */
/* ========================================================================== */

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();
  const scrollTo = useAnchorScroll();
  const active = useScrollSpy(nav.map((n) => n.href));

  // Condense the header once the hero starts leaving. Lenis owns the scroll
  // position when it's mounted; fall back to window for reduced-motion users.
  useEffect(() => {
    if (lenis) {
      const onScroll = ({ scroll }: { scroll: number }) => setScrolled(scroll > 40);
      lenis.on("scroll", onScroll);
      return () => lenis.off("scroll", onScroll);
    }
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lenis]);

  // A dangling open menu after a resize to desktop leaves focus in a hidden
  // subtree. Close it when the mobile breakpoint stops applying.
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [open]);

  // Escape closes the mobile sheet.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
      className="v4-header fixed inset-x-0 top-0 z-20"
      style={{
        backgroundColor: scrolled
          ? "color-mix(in srgb, var(--v4-paper) 82%, transparent)"
          : "transparent",
        borderBottom: `1px solid ${scrolled ? "var(--v4-hairline)" : "transparent"}`,
        boxShadow: scrolled ? "var(--v4-shadow)" : "none",
      }}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-300 ${
          scrolled ? "backdrop-blur-md" : ""
        } ${scrolled ? "py-3" : "py-5"}`}
      >
        <a
          href="#top"
          onClick={(e) => scrollTo(e, "#top")}
          className="flex items-center gap-2.5"
          aria-label="Clutter Sale, back to top"
        >
          <LogoMark className="size-9" />
          <span
            className="text-[0.95rem] font-semibold tracking-tight"
            style={{ color: scrolled ? "var(--v4-ink)" : "var(--v4-cream)" }}
          >
            Clutter Sale
          </span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-sm">
            {nav.map((item) => {
              const isActive = active === item.href;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    data-active={isActive}
                    aria-current={isActive ? "true" : undefined}
                    onClick={(e) => scrollTo(e, item.href)}
                    className="v4-navlink py-1 font-medium"
                    style={{
                      color: scrolled
                        ? isActive
                          ? "var(--v4-teal)"
                          : "var(--v4-ink-soft)"
                        : isActive
                          ? "var(--v4-on-dark)"
                          : "color-mix(in srgb, var(--v4-cream) 72%, transparent)",
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button href="#how" variant="solid" className="hidden sm:inline-flex">
            Sell for Good
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="v4-mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full lg:hidden"
            style={{
              border: "1px solid var(--v4-hairline)",
              color: scrolled ? "var(--v4-ink)" : "var(--v4-cream)",
            }}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile sheet. Height-animated so it doesn't pop. */}
      <motion.div
        id="v4-mobile-nav"
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.32, ease: EASE }}
        className="overflow-hidden lg:hidden"
        style={{ backgroundColor: "var(--v4-paper)" }}
        // Hidden from AT and tab order when closed — an animated-to-zero
        // element is still focusable without this. React 19 takes `inert` as a
        // boolean and serialises the attribute itself.
        inert={!open}
      >
        <ul className="space-y-1 px-5 pb-5 pt-2">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => {
                  setOpen(false);
                  scrollTo(e, item.href);
                }}
                className="block rounded-xl px-3 py-3 text-[0.95rem] font-medium"
                style={{ color: "var(--v4-ink)" }}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <Button href="#how" variant="solid" onClick={() => setOpen(false)} className="w-full justify-center">
              Sell for Good
            </Button>
          </li>
        </ul>
      </motion.div>
    </motion.header>
  );
}

/* ========================================================================== */
/* Hero — marigold action sidebar beside a dark photographic panel.           */
/* ========================================================================== */

function Hero() {
  const scrollTo = useAnchorScroll();


  return (
    <section id="top" className="relative">
      {/* `min-h` only applies once the two panels sit SIDE BY SIDE. Stacked on
          mobile the grid's minimum is added to, not shared by, its children —
          a 92svh floor plus a photo panel plus the marigold panel made the hero
          1222px tall on an 844px screen. Each panel now sizes to its own
          content, and the section is ~1.2 screens instead of 1.5. */}
      <div className="grid lg:min-h-[92svh] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)]">
        {/* --- Marigold sidebar: the two ways in. ---------------------------- */}
        <div
          className="relative order-2 flex flex-col justify-center gap-8 px-6 py-14 sm:px-10 lg:order-1 lg:py-28"
          style={{ backgroundColor: "var(--v4-gold)", color: "var(--v4-on-gold)" }}
        >
          {doors.map((door, i) => (
            <Reveal key={door.id} delay={0.15 + i * 0.12}>
              <div>
                <div className="mb-3 grid size-11 place-items-center rounded-full" style={{ backgroundColor: "rgb(20 37 31 / 0.09)" }}>
                  <Heart className="size-5" strokeWidth={2} aria-hidden />
                </div>
                <h3 className="text-2xl" style={{ color: "var(--v4-on-gold)" }}>
                  {door.title}
                </h3>
                <p className="mt-2 max-w-xs text-[0.9375rem] leading-relaxed" style={{ color: "rgb(20 37 31 / 0.72)" }}>
                  {door.body}
                </p>
                <a
                  href={door.href}
                  onClick={(e) => scrollTo(e, door.href)}
                  className="v4-underline mt-4 inline-flex items-center gap-1.5 text-sm font-semibold"
                >
                  {door.cta}
                  <ArrowRight className="size-4" aria-hidden />
                </a>
              </div>
            </Reveal>
          ))}

          {/* The hairline that separates the two doors, drawn not painted. */}
          <div
            className="pointer-events-none absolute inset-x-6 top-1/2 h-px sm:inset-x-10"
            style={{ backgroundColor: "rgb(20 37 31 / 0.16)" }}
            aria-hidden
          />
        </div>

        {/* --- Photographic panel: headline, CTA, trust line. ---------------- */}
        {/* Mobile: the photo panel carries the viewport height on its own, so
            the headline still opens on a full screen. `svh` (not `vh`) so iOS
            browser chrome doesn't crop the trust line off the bottom. */}
        <div
          className="v4-grain relative order-1 flex min-h-[88svh] items-center overflow-hidden lg:order-2 lg:min-h-0"
          style={{ backgroundColor: "var(--v4-forest)" }}
        >
          <Image
            src={hero.image}
            alt={hero.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 62vw"
            className="object-cover"
            // Next 16: `priority` is deprecated. This is the single, unambiguous
            // LCP element on the page, so `preload` is the correct successor —
            // the docs steer multi-candidate cases to loading/fetchPriority.
            preload
          />
          <div className="v4-scrim absolute inset-0" aria-hidden />

          <div className="relative w-full px-6 pb-16 pt-32 sm:px-12 lg:py-32">
            <Reveal>
              <p className="v4-eyebrow" style={{ color: "var(--v4-on-dark)" }}>
                {hero.eyebrow}
              </p>
            </Reveal>

            <h1 className="mt-5 max-w-[15ch] text-[clamp(2.6rem,5.6vw,4.9rem)] leading-[1.02]" style={{ color: "#fff" }}>
              {hero.headline.map((l, i) => (
                <span key={l} className="block overflow-hidden">
                  <HeroLine index={i}>{l}</HeroLine>
                </span>
              ))}
            </h1>

            <Reveal delay={0.55}>
              <p className="mt-6 max-w-lg text-[1.05rem] leading-relaxed" style={{ color: "rgb(255 255 255 / 0.82)" }}>
                {hero.sub}
              </p>
            </Reveal>

            <Reveal delay={0.65}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button href="#how" variant="gold">
                  {hero.cta}
                </Button>
                <Button href="#causes" variant="outline" className="text-white">
                  {hero.ctaSecondary}
                </Button>
              </div>
            </Reveal>

            {/* Overhead objection, answered before it's raised. */}
            <Reveal delay={0.75}>
              <p className="mt-8 flex items-center gap-2 text-sm" style={{ color: "var(--v4-on-dark)" }}>
                <Check className="size-4 shrink-0" strokeWidth={3} aria-hidden />
                {hero.trust}
              </p>
            </Reveal>

            {/* A text cue, not badges: full badges here would compete with the
                primary CTA directly above them. */}
            <Reveal delay={0.82}>
              <a
                href="#get-app"
                onClick={(e) => scrollTo(e, "#get-app")}
                className="v4-underline mt-3 inline-flex items-center gap-1.5 text-sm font-medium"
                style={{ color: "rgb(255 255 255 / 0.72)" }}
              >
                <Smartphone className="size-4" aria-hidden />
                Or get the app for iOS and Android
              </a>
            </Reveal>
          </div>
        </div>
      </div>

      <Ribbons />
    </section>
  );
}

/** Two ribbons crossing at a slight angle, the inspiration's signature band. */
function Ribbons() {
  const items = [...ribbon, ...ribbon];

  const track = (reverse: boolean) => (
    <div className={`v4-marquee-track ${reverse ? "v4-marquee-track-rev" : ""}`}>
      {/* Duplicated so the -50% translate loops seamlessly. The clone is hidden
          from AT so the phrases aren't announced twice. */}
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0" aria-hidden={copy === 1 || undefined}>
          {items.map((word, i) => (
            <span key={`${copy}-${word}-${i}`} className="flex items-center gap-5 px-5 text-sm font-semibold whitespace-nowrap">
              {word}
              <Heart className="size-3.5 shrink-0" aria-hidden />
            </span>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className="v4-marquee pointer-events-none relative z-10 -mt-7 h-14 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-x-[-8%] top-0 -rotate-2 py-3"
        style={{ backgroundColor: "var(--v4-forest-deep)", color: "var(--v4-on-dark)" }}
      >
        {track(false)}
      </div>
      <div
        className="absolute inset-x-[-8%] top-1 rotate-2 py-3"
        style={{ backgroundColor: "var(--v4-ember)", color: "#fff" }}
      >
        {track(true)}
      </div>
    </div>
  );
}

/* ========================================================================== */
/* Story — one named person, before any statistic.                            */
/* ========================================================================== */

function Story() {
  return (
    <section id="story" className="px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative">
              <div className="relative aspect-4/5 overflow-hidden" style={{ borderRadius: "var(--v4-radius-lg)" }}>
                <Image
                  src={story.image}
                  alt={story.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover"
                />
              </div>

              {/* The object → outcome exchange, stated as a receipt. This is the
                  concrete unit economics that abstract impact copy always
                  misses: one thing in, one nameable thing out. */}
              <div
                className="absolute -bottom-8 left-4 right-4 p-5 sm:left-8 sm:right-auto sm:w-80"
                style={{
                  backgroundColor: "var(--v4-raised)",
                  borderRadius: "var(--v4-radius)",
                  boxShadow: "var(--v4-shadow-lift)",
                  border: "1px solid var(--v4-hairline)",
                }}
              >
                <p className="v4-eyebrow" style={{ color: "var(--v4-ink-soft)" }}>
                  Sold for {story.amount}
                </p>
                <div className="mt-3 flex items-center gap-3 text-sm">
                  <span style={{ color: "var(--v4-ink-soft)" }}>{story.object}</span>
                  <ArrowRight className="size-4 shrink-0" style={{ color: "var(--v4-teal)" }} aria-hidden />
                  <span className="font-semibold" style={{ color: "var(--v4-ink)" }}>
                    {story.outcome}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="lg:pl-4">
            <SectionHead eyebrow={story.eyebrow} title={story.headline} align="left" />

            <Reveal delay={0.14}>
              <blockquote className="mt-8">
                <Quote className="size-8" style={{ color: "var(--v4-teal)" }} aria-hidden />
                <p className="mt-3 text-[1.25rem] leading-relaxed" style={{ color: "var(--v4-ink)" }}>
                  {story.quote}
                </p>
                <footer className="mt-5 text-sm" style={{ color: "var(--v4-ink-soft)" }}>
                  <span className="font-semibold" style={{ color: "var(--v4-ink)" }}>
                    {story.name}
                  </span>
                  {" — "}
                  {story.city}
                </footer>
              </blockquote>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8">
                <Button href="#how">{story.cta}</Button>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Proof arrives only now — after the story has done its work. */}
        <div className="mt-28 grid gap-10 border-t pt-14 sm:grid-cols-3" style={{ borderColor: "var(--v4-hairline)" }}>
          {impact.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <div className="text-center">
                <p className="text-[clamp(2.4rem,4vw,3.2rem)] leading-none" style={{ fontFamily: "var(--font-fraunces)", color: "var(--v4-ink)" }}>
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mx-auto mt-3 max-w-[22ch] text-sm leading-relaxed" style={{ color: "var(--v4-ink-soft)" }}>
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* How it works — dark band, three steps.                                     */
/* ========================================================================== */

function How() {
  return (
    <section id="how" className="v4-grain relative overflow-hidden px-5 py-24 sm:py-32" style={{ backgroundColor: "var(--v4-forest)" }}>
      <div className="relative mx-auto max-w-6xl">
        <SectionHead
          eyebrow="How it works"
          title="Four minutes, and it's someone else's"
          sub="No studio photography, no shipping runs, no paperwork. You point a phone at a shelf and the rest is handled."
          tone="dark"
        />

        <ol className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.id} delay={i * 0.12}>
              <div className="h-full p-7" style={{ backgroundColor: "rgb(255 255 255 / 0.05)", border: "1px solid rgb(255 255 255 / 0.1)", borderRadius: "var(--v4-radius)" }}>
                <span className="v4-eyebrow v4-tabular" style={{ color: "var(--v4-on-dark)" }}>
                  {step.n}
                </span>
                <h3 className="mt-4 text-xl" style={{ color: "var(--v4-cream)" }}>
                  {step.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed" style={{ color: "rgb(244 241 232 / 0.72)" }}>
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.2}>
          <div className="mt-14 flex justify-center">
            <Button href="#causes" variant="gold">
              Pick your cause
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* Causes — concrete dollar→outcome on every card, with live funding meters.  */
/* ========================================================================== */

function CauseCard({ cause, index }: { cause: (typeof causes)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const pct = Math.round((cause.raised / cause.goal) * 100);
  // `en-US`, not `en-IN` — the Indian locale groups digits in lakhs
  // ("1,20,000" rather than "120,000"), which would read as a typo to a US reader.
  const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;

  return (
    <Reveal delay={index * 0.1}>
      <article ref={ref} className="v4-card flex h-full flex-col overflow-hidden">
        <div className="relative aspect-16/10 overflow-hidden">
          <Image
            src={cause.image}
            alt={cause.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="v4-card-photo object-cover"
          />
          {cause.urgent && (
            <span
              className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
              style={{ backgroundColor: "var(--v4-ember)", color: "#fff" }}
            >
              <Clock className="size-3.5" aria-hidden />
              {cause.urgent}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-xl" style={{ color: "var(--v4-ink)" }}>
            {cause.name}
          </h3>
          <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed" style={{ color: "var(--v4-ink-soft)" }}>
            {cause.blurb}
          </p>

          <div className="mt-6">
            <div className="mb-2 flex items-baseline justify-between text-sm">
              <span className="v4-tabular font-semibold" style={{ color: "var(--v4-ink)" }}>
                {fmt(cause.raised)}
              </span>
              <span className="v4-tabular" style={{ color: "var(--v4-ink-soft)" }}>
                {pct}%
              </span>
            </div>

            {/* Width animates from 0 once the card is seen — momentum, not decor.
                aria-* carries the same information for AT, since the visual fill
                is a decorative span. */}
            <div
              className="v4-meter"
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${cause.name}: ${fmt(cause.raised)} raised of ${fmt(cause.goal)}`}
            >
              <span style={{ "--v4-pct": inView ? `${pct}%` : "0%" } as React.CSSProperties} />
            </div>

            <p className="mt-2 text-xs" style={{ color: "var(--v4-ink-soft)" }}>
              raised of {fmt(cause.goal)} goal
            </p>
          </div>

          <a
            href="#how"
            className="v4-btn v4-btn-outline mt-6 justify-center"
            style={{ color: "var(--v4-teal)" }}
          >
            Sell for this cause
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </div>
      </article>
    </Reveal>
  );
}

function Causes() {
  return (
    <section id="causes" className="px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="Where the money goes"
          title="Choose what your shelf pays for"
          sub="Every cause shows what one dollar actually buys, and how close it is to the number it needs."
        />

        <div className="mt-16 grid gap-7 md:grid-cols-3">
          {causes.map((cause, i) => (
            <CauseCard key={cause.id} cause={cause} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* Pledges — dark checklist band + photo collage.                             */
/* ========================================================================== */

/**
 * Two columns of photographs looping forever, their direction following the
 * reader's scroll.
 *
 * The direction is written straight to the DOM rather than held in state: Lenis
 * fires on every scroll frame, and a `setState` there would re-render the whole
 * section sixty times a second to change one attribute.
 */
function PhotoMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!lenis || reduced) return;

    const onScroll = ({ direction }: { direction: 1 | -1 | 0 }) => {
      // 0 means the reader has stopped. Hold the last direction — reversing or
      // halting mid-glide reads as a glitch.
      if (direction === 0) return;
      ref.current?.setAttribute("data-dir", direction === 1 ? "down" : "up");
    };

    lenis.on("scroll", onScroll);
    return () => lenis.off("scroll", onScroll);
  }, [lenis, reduced]);

  return (
    <div
      ref={ref}
      data-dir="down"
      className="v4-photo-marquee grid h-136 grid-cols-2 gap-4 overflow-hidden lg:h-160"
      // The photographs are illustrative of the promises listed beside them; the
      // text carries the meaning, so the loop is decorative to a screen reader.
      aria-hidden
    >
      {photoColumns.map((column, col) => (
        <div
          key={col}
          className={`v4-photo-track ${col === 1 ? "v4-photo-track-alt" : ""}`}
          // Offset the second column so the two don't crest together.
          style={col === 1 ? { marginTop: "-3rem" } : undefined}
        >
          {/* The set twice: translating the track -50% lands on an identical
              frame, so the loop has no visible seam. */}
          {[0, 1].map((copy) =>
            column.map((photo) => (
              <div
                key={`${copy}-${photo.src}`}
                data-clone={copy === 1 || undefined}
                className="relative aspect-4/5 shrink-0 overflow-hidden"
                style={{ borderRadius: "var(--v4-radius)" }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 1024px) 45vw, 22vw"
                  className="object-cover"
                />
              </div>
            )),
          )}
        </div>
      ))}
    </div>
  );
}

function Pledges() {
  return (
    <section className="v4-grain relative overflow-hidden px-5 py-24 sm:py-32" style={{ backgroundColor: "var(--v4-forest-deep)" }}>
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHead
            eyebrow="Our promise to you"
            title="Together, we change what a shelf is for"
            align="left"
            tone="dark"
          />

          <ul className="mt-10 space-y-7">
            {pledges.map((p, i) => (
              <Reveal as="li" key={p.id} delay={0.1 + i * 0.1}>
                <div className="flex gap-4">
                  <span
                    className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full"
                    style={{ backgroundColor: "var(--v4-on-dark)", color: "var(--v4-forest-deep)" }}
                  >
                    <Check className="size-4" strokeWidth={3} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-lg" style={{ color: "var(--v4-cream)" }}>
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed" style={{ color: "rgb(244 241 232 / 0.68)" }}>
                      {p.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={0.15}>
          <PhotoMarquee />
        </Reveal>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* Voices — social proof, placed near the ask rather than in the hero.        */
/* ========================================================================== */

/** "Rachel Adams" -> "RA". Two initials, uppercase. */
function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function Voices() {
  const ref = useRef<HTMLDivElement>(null);
  // No `once` — the pile reforms every time the section leaves the viewport, so
  // the cards are scrambled below it, settled inside it, and scrambled again
  // once it's scrolled past.
  const inView = useInView(ref, { margin: "-120px" });
  const reduced = useReducedMotion();

  // The scattered pile is opt-in and client-only: the server renders the settled
  // grid, so a no-JS visitor gets the finished layout rather than a permanent
  // jumble.
  //
  // This is a presentational attribute, not state — writing it straight to the
  // node avoids a render pass, and avoids the SSR/hydration mismatch that a
  // `mounted` flag in state would otherwise create.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // In view (or reduced motion): the attribute comes off and the CSS
    // transition carries every card home.
    if (reduced || inView) {
      el.removeAttribute("data-scatter");
      return;
    }

    el.setAttribute("data-scatter", "true");

    // `data-armed` is a one-shot latch, set on the frame after the very first
    // scatter and never removed. It exists because the initial throw happens on
    // a settled, server-rendered grid: with transitions live, the cards would
    // visibly slide apart on load. Suppressing that first frame makes the pile
    // simply *be there*. Every later scatter — the one you see when scrolling
    // back past the section — is armed, so it animates apart symmetrically with
    // the way it animated together.
    if (el.hasAttribute("data-armed")) return;
    const raf = requestAnimationFrame(() => el.setAttribute("data-armed", "true"));
    return () => cancelAnimationFrame(raf);
  }, [reduced, inView]);

  return (
    <section id="voices" className="px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="Sellers, buyers, nonprofits"
          title="What they say about us"
          sub="Nobody here set out to be generous. They were mostly just tidying up."
        />

        {/* `data-scatter` is applied by the effect above, never here — the
            server must emit the settled grid. */}
        <div ref={ref} className="v4-quotes mt-20 grid gap-6 md:grid-cols-3 md:gap-7">
          {voices.map((v, i) => (
            <figure
              key={v.id}
              className={`v4-quote v4-quote-${v.tint} flex flex-col p-7 ${
                // Middle column breaks the grid: card 2 rides high, card 5 drops.
                i === 1 ? "v4-quote-raise" : i === 4 ? "v4-quote-drop" : ""
              }`}
              style={
                {
                  "--v4-sr": `${v.scatter.r}deg`,
                  "--v4-sx": `${v.scatter.x}px`,
                  "--v4-sy": `${v.scatter.y}px`,
                  // Stacking order while piled. Later cards sit on top, which
                  // matches the reference's front-most peach/white pair.
                  "--v4-z": i,
                  // Front-to-back resolve. No delay under reduced motion, where
                  // the cards were never scattered to begin with.
                  transitionDelay: reduced ? "0ms" : `${i * 80}ms`,
                } as React.CSSProperties
              }
            >
              <Quote className="size-7 shrink-0" style={{ color: "var(--v4-teal)" }} aria-hidden />

              <blockquote className="mt-4 flex-1 text-[1.0625rem] leading-relaxed">{v.quote}</blockquote>

              <figcaption className="mt-7 flex items-center gap-3">
                <span className="v4-monogram" aria-hidden>
                  {initials(v.name)}
                </span>
                <span className="min-w-0 text-sm leading-tight">
                  <span className="block font-semibold">{v.name}</span>
                  <span className="mt-0.5 block text-[0.8125rem]" style={{ color: "var(--v4-ink-soft)" }}>
                    {v.role} · {v.item}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* Get the app — the listing flow is a phone flow, so this is a real section, */
/* not a footer afterthought.                                                  */
/* ========================================================================== */

function GetApp() {
  return (
    <section id="get-app" className="px-5 pb-24 sm:pb-32">
      <div
        className="v4-grain relative mx-auto max-w-6xl overflow-hidden px-6 py-16 sm:px-12 sm:py-20"
        style={{ backgroundColor: "var(--v4-forest)", borderRadius: "var(--v4-radius-lg)" }}
      >
        <div className="relative grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <SectionHead eyebrow={app.eyebrow} title={app.headline} sub={app.sub} align="left" tone="dark" />

            <ul className="mt-8 space-y-3.5">
              {app.points.map((point, i) => (
                <Reveal as="li" key={point} delay={0.1 + i * 0.08}>
                  <div className="flex items-start gap-3">
                    <Check
                      className="mt-1 size-4 shrink-0"
                      strokeWidth={3}
                      style={{ color: "var(--v4-on-dark)" }}
                      aria-hidden
                    />
                    <span className="text-[0.9375rem] leading-relaxed" style={{ color: "rgb(244 241 232 / 0.78)" }}>
                      {point}
                    </span>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.3}>
              <StoreBadges variant="light" className="mt-9" />
            </Reveal>

            {/* The badges are placeholders. Say so, rather than letting someone
                tap into a dead store listing. */}
            <Reveal delay={0.36}>
              <p className="mt-4 max-w-sm text-xs leading-relaxed" style={{ color: "rgb(244 241 232 / 0.55)" }}>
                {app.note}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.18}>
            <div className="relative aspect-4/5 overflow-hidden" style={{ borderRadius: "var(--v4-radius)" }}>
              <Image
                src={app.image}
                alt={app.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 34vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* FAQ — <details>, so it works with zero JS and full keyboard support.       */
/* ========================================================================== */

function Faq() {
  return (
    <section id="faq" className="px-5 pb-24 sm:pb-32">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <SectionHead eyebrow="Before you ask" title={<>Frequently asked question</>} align="left" />

        <div>
          {faqs.map((f, i) => (
            <Reveal key={f.id} delay={i * 0.06}>
              <details className="v4-faq group border-b" style={{ borderColor: "var(--v4-hairline)" }}>
                <summary className="flex items-center justify-between gap-6 py-5 text-left">
                  <span className="text-[1.0625rem] font-medium" style={{ color: "var(--v4-ink)" }}>
                    {f.q}
                  </span>
                  <ChevronDown className="v4-faq-chevron size-5 shrink-0" style={{ color: "var(--v4-teal)" }} aria-hidden />
                </summary>
                <div className="v4-faq-body">
                  <p className="pb-6 pr-10 text-[0.9375rem] leading-relaxed" style={{ color: "var(--v4-ink-soft)" }}>
                    {f.a}
                  </p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* Footer — green band with the marigold callout, per the inspiration.        */
/* ========================================================================== */

function Footer() {
  const scrollTo = useAnchorScroll();

  return (
    <footer className="v4-grain relative overflow-hidden px-5 pb-10 pt-20" style={{ backgroundColor: "var(--v4-forest)" }}>
      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
          <div>
            <a href="#top" onClick={(e) => scrollTo(e, "#top")} className="inline-flex items-center gap-2.5" style={{ color: "var(--v4-cream)" }}>
              <LogoMark className="size-9" />
              <span className="text-lg font-semibold tracking-tight">Clutter Sale</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed" style={{ color: "rgb(244 241 232 / 0.66)" }}>
              The thing you stopped using is someone&apos;s answer. Sell it, and every dollar reaches the cause you chose.
            </p>

            <h2 className="v4-eyebrow mt-8" style={{ color: "var(--v4-on-dark)" }}>
              Get the app
            </h2>
            <StoreBadges variant="light" className="mt-4" />
          </div>

          <nav aria-label="Footer">
            <h2 className="v4-eyebrow" style={{ color: "var(--v4-on-dark)" }}>
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => scrollTo(e, item.href)}
                    className="v4-underline"
                    style={{ color: "rgb(244 241 232 / 0.72)" }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* The marigold "have questions" callout. */}
          <div
            className="p-7"
            style={{ backgroundColor: "var(--v4-gold)", color: "var(--v4-on-gold)", borderRadius: "var(--v4-radius)" }}
          >
            <h2 className="text-2xl leading-tight" style={{ color: "var(--v4-on-gold)" }}>
              {finalCta.headline}
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed" style={{ color: "rgb(20 37 31 / 0.72)" }}>
              {finalCta.body}
            </p>
            <a href="mailto:hello@clutter.sale" className="v4-btn v4-btn-gold mt-5">
              {finalCta.cta}
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>

        <div
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs sm:flex-row"
          style={{ borderColor: "rgb(244 241 232 / 0.16)", color: "rgb(244 241 232 / 0.55)" }}
        >
          <p>© {new Date().getFullYear()} Clutter Sale. Every dollar accounted for.</p>
          <p>Made for people who were only meant to be tidying up.</p>
        </div>
      </div>
    </footer>
  );
}

/* ========================================================================== */

export default function V4Page() {
  return (
    <div className="v4">
      <Header />
      <main>
        <Hero />
        <Story />
        <How />
        <Causes />
        <Pledges />
        <Voices />
        <GetApp />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
