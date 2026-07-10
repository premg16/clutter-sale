"use client";

import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  HandHeart,
  Menu,
  Minus,
  PawPrint,
  Plus,
  Sprout,
  X,
} from "lucide-react";
// Gavel moved to Audiences.tsx with the buyer role.
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { LogoMark } from "@/components/Logo";
import { Audiences } from "./Audiences";
import { HowItWorks } from "./HowItWorks";
import { StoreBadges } from "./StoreBadges";
import { ThemeToggle } from "./ThemeToggle";
import { useV2Motion } from "./useV2Motion";
import { Voices } from "./Voices";

/* ========================================================================== */
/* Primitives                                                                  */
/* ========================================================================== */

const hairline = (pct: number) =>
  `1px solid color-mix(in srgb, var(--v2-hairline) ${pct}%, transparent)`;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
      style={{ color: "var(--v2-ink-soft)" }}
    >
      <span
        className="size-1.5 rounded-full"
        style={{ background: "var(--v2-accent)" }}
        aria-hidden="true"
      />
      {children}
    </span>
  );
}

function SectionHead({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        data-split-heading
        className="mt-4 text-balance text-3xl leading-[1.08] opacity-0 sm:text-4xl md:text-5xl"
      >
        {title}
      </h2>
      {lead ? (
        <p
          data-reveal
          className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed opacity-0 sm:text-base"
          style={{ color: "var(--v2-ink-soft)" }}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

/* ========================================================================== */
/* Nav                                                                         */
/* ========================================================================== */

const NAV = [
  { href: "#worth", label: "What it's worth" },
  { href: "#how", label: "How it works" },
  { href: "#audiences", label: "Ways in" },
  { href: "#voices", label: "Stories" },
  { href: "#faq", label: "FAQ" },
  { href: "#get-app", label: "Get the app" },
];

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const lenis = useLenis();
  return (
    <a
      href={href}
      onClick={(e) => {
        if (!lenis) return;
        e.preventDefault();
        lenis.scrollTo(href, { offset: -90 });
      }}
      className="relative py-1 transition-colors duration-200"
      style={{ color: "var(--v2-ink-soft)" }}
    >
      {children}
    </a>
  );
}

function Nav() {
  // Always a pill — no scroll-conditional styling. The previous version faded
  // the background in past 40px, which meant it was transparent on load and
  // never returned once scrolled.
  const [open, setOpen] = useState(false);
  const lenis = useLenis();
  const menuBtn = useRef<HTMLButtonElement>(null);

  // Escape closes and returns focus to the trigger.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Lenis keeps scrolling the page behind an open sheet; stop it while open.
  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
    return () => lenis.start();
  }, [open, lenis]);

  const go = (href: string) => {
    setOpen(false);
    if (lenis) lenis.scrollTo(href, { offset: -90 });
    else document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-20 px-4 pt-4">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl items-center justify-between rounded-full px-3 py-2.5 sm:px-5"
        style={{
          background: "color-mix(in srgb, var(--v2-raised) 85%, transparent)",
          border: hairline(12),
          backdropFilter: "blur(12px)",
        }}
      >
        <a
          href="#top"
          className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2"
          aria-label="Clutter Sale, home"
        >
          <LogoMark className="size-9" />
          <span className="text-sm font-semibold tracking-tight">Clutter Sale</span>
        </a>

        <ul className="hidden items-center gap-7 text-sm lg:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <NavLink href={item.href}>{item.label}</NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#get-app"
            className="v2-press hidden rounded-full px-5 py-2.5 text-sm font-semibold sm:block"
            style={{ background: "var(--v2-accent)", color: "var(--v2-accent-on)" }}
          >
            Get the app
          </a>

          {/* Without this, five sections are simply unreachable on a phone. */}
          <button
            ref={menuBtn}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="v2-mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="v2-press grid size-11 place-items-center rounded-full lg:hidden"
            style={{ background: "var(--v2-accent)", color: "var(--v2-accent-on)" }}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <div
        id="v2-mobile-menu"
        hidden={!open}
        className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl p-2 lg:hidden"
        style={{
          background: "var(--v2-raised)",
          border: hairline(12),
          backdropFilter: "blur(12px)",
        }}
      >
        <ul className="grid">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.href);
                }}
                className="flex min-h-12 items-center rounded-2xl px-4 text-sm font-medium"
                style={{ color: "var(--v2-ink)" }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#get-app"
          onClick={(e) => {
            e.preventDefault();
            go("#get-app");
          }}
          className="mt-2 flex min-h-12 items-center justify-center rounded-2xl text-sm font-semibold"
          style={{ background: "var(--v2-accent)", color: "var(--v2-accent-on)" }}
        >
          Get the app
        </a>
      </div>
    </header>
  );
}

/* ========================================================================== */
/* Hero                                                                        */
/* ========================================================================== */

// The payoff word cycles, so the sentence keeps re-landing. Each is a concrete
// outcome, not an abstraction — that's the whole emotional mechanic.
const WORDS = ["answer.", "warm coat.", "school year.", "second chance.", "vet bill."];
const WORD_MS = 2600;

function CyclingWord() {
  // `swaps` only ever increments, so `swaps === 0` identifies the very first
  // word — unlike `i`, which returns to 0 every time the cycle wraps.
  const [swaps, setSwaps] = useState(0);
  const [reduced, setReduced] = useState(false);
  const i = swaps % WORDS.length;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      return;
    }
    const t = setInterval(() => setSwaps((v) => v + 1), WORD_MS);
    return () => clearInterval(t);
  }, []);

  const Block = () => (
    <span
      className="absolute inset-x-0 -rotate-1 rounded-xl"
      // Inset vertically by a hair, then bleed out — gives the descender of
      // "year." room without the block looking loose around short words.
      style={{ background: "var(--v2-accent)", top: "0.06em", bottom: "0.04em" }}
      aria-hidden="true"
    />
  );

  if (reduced) {
    return (
      <span className="relative inline-block px-3 align-baseline">
        <Block />
        <span className="relative z-10">{WORDS[0]}</span>
      </span>
    );
  }

  // Only the active word is rendered, so the inline box — and therefore the
  // teal block behind it — sizes to that word. Keying both spans on the word
  // restarts their CSS enter animations on every swap.
  //
  // `v2-word-first` delays only the very first word so it lands with the
  // headline's last characters. Every later swap fires immediately, or each
  // 2.6s cycle would stall. It is keyed on "has never swapped", not i === 0,
  // because the cycle returns to index 0.
  const first = swaps === 0;
  return (
    <span className="relative inline-block px-3 align-baseline">
      <span
        key={`block-${WORDS[i]}`}
        className={`v2-word-block absolute inset-x-0 rounded-xl${first ? " v2-word-first" : ""}`}
        style={{ background: "var(--v2-accent)", top: "0.06em", bottom: "0.04em" }}
        aria-hidden="true"
      />
      <span
        key={WORDS[i]}
        className={`v2-word relative z-10 inline-block whitespace-nowrap${first ? " v2-word-first" : ""}`}
        aria-hidden="true"
      >
        {WORDS[i]}
      </span>
      {/* The rotation is decorative; screen readers get the full list once. */}
      <span className="sr-only">{WORDS.map((w) => w.replace(".", "")).join(", or a ")}.</span>
    </span>
  );
}

// `overflow-x: clip` rather than `overflow: hidden`. The hidden version sliced
// the blooms flat along the section's top edge, and since the sticky header
// occupies the first 82px, the wash visibly began *below* the nav. Clipping only
// the x-axis still contains the collage's entry animation (which translates
// ±120px horizontally) while letting the wash bleed up behind the header and
// reach the true top of the page.
function Hero() {
  return (
    <section id="top" className="relative overflow-x-clip px-4 pt-16 sm:pt-24">
      {/* Ambient blooms — soft, drifting, behind everything. */}
      <div
        data-bloom
        className="v2-bloom left-[-10%] top-[-15%] size-[45vw] max-h-[700px] max-w-[700px]"
        style={{ background: "radial-gradient(circle, var(--v2-accent), transparent 65%)" }}
        aria-hidden="true"
      />
      <div
        data-bloom
        className="v2-bloom right-[-12%] top-[20%] size-[40vw] max-h-[600px] max-w-[600px]"
        style={{ background: "radial-gradient(circle, var(--v2-accent-deep), transparent 65%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-5xl text-center">
          <div data-hero-fade className="opacity-0">
            <Eyebrow>Nothing new needs to be made</Eyebrow>
          </div>

          {/* The static prefix and the cycling word live in one <h1> so the
              sentence flows as one paragraph. Only the prefix carries
              data-split-headline — SplitText rewrites its DOM, and the word
              re-renders on a timer, so the two must never overlap. */}
          {/* No text-balance: it orphans "else's" onto its own line and pushes
              the cycling word to a fourth. A wider measure breaks at three. */}
          {/* 36px on a 390px screen wrapped to four lines and orphaned "else's".
              Scale down so it holds three. */}
          <h1 className="mx-auto mt-6 max-w-5xl text-[1.75rem] leading-[1.08] sm:text-6xl sm:leading-[1.06] md:text-[4.6rem]">
            <span data-split-headline className="opacity-0">
              The thing on your shelf is already someone else&apos;s
            </span>{" "}
            <CyclingWord />
          </h1>

          <p
            data-hero-fade
            className="mx-auto mt-8 max-w-xl text-pretty leading-relaxed opacity-0"
            style={{ color: "var(--v2-ink-soft)" }}
          >
            You stopped seeing it months ago. Someone across town is still looking for it. Sell it,
            choose a cause, and 100% of the net proceeds go straight there — none of it stops with
            us.
          </p>

          <div data-hero-fade className="mt-9 flex flex-wrap items-center justify-center gap-3 opacity-0">
            <a
              href="#get-app"
              className="v2-magnetic group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
              style={{ background: "var(--v2-accent)", color: "var(--v2-accent-on)" }}
            >
              Get the app
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#how"
              className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-colors duration-200"
              style={{ border: hairline(25), color: "var(--v2-ink)" }}
            >
              See how it works
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>

          <div data-hero-fade className="mt-8 opacity-0">
            <p className="text-xs font-medium" style={{ color: "var(--v2-ink-soft)" }}>
              Post your first item in minutes
            </p>
            <StoreBadges className="mt-3 justify-center" />
          </div>
        </div>

        {/* Collage: clutter → pass-through → outcome. Parallaxes on scroll.
            `items-stretch` + `h-full` on the image wrapper: with a bare
            aspect-ratio the two side figures resolve to DIFFERENT heights
            (col-span-5 is 471px wide, col-span-4 is 373px — same ratio, shorter
            image), which dropped the right caption off the bottom of its photo.
            The ratio now only sets a minimum; the image fills the grid row. */}
        {/* Mobile: a 2x2 mosaic, not a vertical parade. Stacked, the three
            cards ran 1449px — you scrolled past each in turn and the whole
            point (clutter → 100% → outcome, seen at once) was lost. Here the
            two photos sit side by side with the teal card spanning beneath,
            so the sequence still reads in a single glance. */}
        <div className="v2-collage mt-12 grid grid-cols-2 items-stretch gap-3 sm:mt-20 sm:gap-4 md:grid-cols-12">
          <figure
            data-collage-card
            data-collage-from="left"
            className="relative opacity-0 md:col-span-5"
          >
            {/* Inner wrapper owns the scroll parallax; the figure owns the
                entry. Splitting them keeps two tweens off one transform. */}
            <div data-collage-parallax className="relative h-full">
              <div className="relative aspect-4/5 overflow-hidden rounded-4xl md:aspect-auto md:h-full md:min-h-152">
                <Image
                  src="/images/thrifted-items.jpg"
                  alt="A flat lay of folded clothes, a bag and accessories laid out for resale"
                  fill
                  priority
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption
                className="absolute inset-x-2 bottom-2 rounded-xl px-3 py-2 backdrop-blur-sm sm:inset-x-4 sm:bottom-4 sm:rounded-2xl sm:px-4 sm:py-3"
                style={{ background: "color-mix(in srgb, var(--v2-raised) 92%, transparent)" }}
              >
                {/* Short label in the narrow mosaic card; full sentence once
                    there is room. Both wrap to one line at their breakpoint. */}
                <p className="text-[13px] font-semibold leading-tight sm:text-sm">
                  <span className="sm:hidden">Clutter</span>
                  <span className="hidden sm:inline">It starts as clutter</span>
                </p>
                <p className="mt-0.5 hidden text-xs sm:block" style={{ color: "var(--v2-ink-soft)" }}>
                  The coat you haven&apos;t worn since 2023.
                </p>
              </figcaption>
            </div>
          </figure>

          {/* Order-first on mobile so the "100%" promise sits under the two
              photos, and spans the full width as the mosaic's base row. */}
          <div
            data-collage-card
            data-collage-from="bottom"
            className="order-last col-span-2 opacity-0 md:order-0 md:col-span-3"
          >
            <div
              data-collage-parallax
              className="grid h-full grid-rows-[1fr_auto] gap-3 sm:gap-4"
            >
              {/* Mobile: a short horizontal banner (icon beside the number).
                  Desktop: a tall column with the number resting at the bottom. */}
              <div
                className="flex items-center gap-4 rounded-4xl p-5 md:flex-col md:items-stretch md:justify-between"
                style={{ background: "var(--v2-accent)", color: "var(--v2-accent-on)" }}
              >
                <HandHeart className="size-8 shrink-0 md:size-6" aria-hidden="true" />
                <div className="md:mt-8">
                  <p className="font-display text-3xl tabular-nums md:text-4xl">
                    <span data-count="100" data-count-suffix="%">
                      100%
                    </span>
                  </p>
                  <p className="mt-1 text-[13px] leading-snug opacity-80 md:text-sm">
                    of net proceeds reach the cause you picked. We take nothing.
                  </p>
                </div>
              </div>
              {/* The third photo is the least load-bearing; dropping it on mobile
                  is what lets the mosaic fit one screen. */}
              <div className="relative hidden aspect-square overflow-hidden rounded-4xl md:block">
                <Image
                  src="/images/community-giving.jpg"
                  alt="Volunteers handing over boxes of donated goods"
                  fill
                  sizes="(min-width: 768px) 25vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <figure
            data-collage-card
            data-collage-from="right"
            className="relative opacity-0 md:col-span-4"
          >
            {/* Identical structure to the left figure — fills the row rather
                than deriving its height from a ratio at a narrower column. */}
            <div data-collage-parallax className="relative h-full">
              <div className="relative aspect-4/5 overflow-hidden rounded-4xl md:aspect-auto md:h-full md:min-h-152">
                <Image
                  src="/images/library-reading.jpg"
                  alt="Two students sitting together reading books at a library table"
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption
                className="absolute inset-x-2 bottom-2 rounded-xl px-3 py-2 backdrop-blur-sm sm:inset-x-4 sm:bottom-4 sm:rounded-2xl sm:px-4 sm:py-3"
                style={{ background: "color-mix(in srgb, var(--v2-raised) 92%, transparent)" }}
              >
                <p className="text-[13px] font-semibold leading-tight sm:text-sm">
                  <span className="sm:hidden">A school year</span>
                  <span className="hidden sm:inline">It ends as a school year</span>
                </p>
                <p className="mt-0.5 hidden text-xs sm:block" style={{ color: "var(--v2-ink-soft)" }}>
                  Same coat. Different house. Two sets of textbooks.
                </p>
              </figcaption>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* Marquee                                                                     */
/* ========================================================================== */

const TICKER = [
  "a turntable → a hind-leg surgery",
  "three coats → a term of textbooks",
  "a bicycle → a compass box and a satchel",
  "a camera → one community garden bed",
  "a guitar → six weeks of school meals",
  "a desk → a library corner",
];

function Ticker() {
  return (
    <section aria-label="Recent conversions" className="overflow-hidden py-6">
      <div
        className="py-4"
        style={{ background: "var(--v2-accent-deep)", color: "var(--v2-accent)" }}
      >
        <div className="v2-marquee flex w-max gap-10 whitespace-nowrap">
          {/* Duplicated once; the keyframe translates exactly -50%. */}
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="flex items-center gap-10 text-sm font-medium tracking-wide">
              {t}
              <span className="size-1.5 rounded-full bg-current opacity-40" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* Impact                                                                      */
/* ========================================================================== */

// `roll: true` opts a stat into the count-up. Only safe when every intermediate
// frame is still a true statement — "48%" on the way to "100%" understates, but
// "1 in 4" on the way to "3 in 4" is flatly false. See useV2Motion.
const STATS = [
  {
    display: "100%",
    count: 100,
    suffix: "%",
    roll: true,
    label: "of net proceeds go to the cause",
    note: "Listing and transfer costs are ours, not the nonprofit's.",
  },
  {
    display: "9 days",
    roll: false,
    label: "average time from listing to payout",
    note: "You see the transfer receipt the day the money lands.",
  },
  {
    display: "3 in 4",
    roll: false,
    label: "items sell in their first week",
    note: "Someone is already searching for the thing you stopped noticing.",
  },
];

function Impact() {
  return (
    <section id="impact" className="px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="Where it actually goes"
          title="No overhead. No cut. No asterisk."
          lead="Charities lose donors to a single suspicion: that the money stops somewhere in the middle. So we removed the middle."
        />
        <div data-reveal-group className="mt-14 grid gap-4 md:grid-cols-3">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="v2-lift h-full rounded-4xl p-8 opacity-0"
              style={{ background: "var(--v2-raised)", border: hairline(12) }}
            >
              <p className="font-display text-5xl tabular-nums tracking-tight">
                {s.roll ? (
                  <span data-count={s.count} data-count-suffix={s.suffix}>
                    {s.display}
                  </span>
                ) : (
                  s.display
                )}
              </p>
              <p className="mt-3 text-sm font-semibold leading-snug">{s.label}</p>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--v2-ink-soft)" }}>
                {s.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* Worth                                                                       */
/* ========================================================================== */

const CONVERSIONS = [
  { n: "01", item: "A guitar you stopped playing", outcome: "Six weeks of after-school meals for one child", icon: BookOpen },
  { n: "02", item: "The bike rusting on the balcony", outcome: "A term of school supplies, down to the compass box", icon: Sprout },
  { n: "03", item: "Three coats, one winter unused", outcome: "Vaccinations and a checkup for a rescued street dog", icon: PawPrint },
  { n: "04", item: "The camera in the drawer", outcome: "Seed, soil and tools for a full community garden bed", icon: HandHeart },
];

function Worth() {
  return (
    <section id="worth" className="px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="The exchange rate"
          title="What your shelf is worth, in someone else's week"
          lead="Abstractions don't move people. Specifics do. Here is the arithmetic, item by item."
        />
        <div className="mt-14 grid items-stretch gap-4 lg:grid-cols-2">
          <div data-reveal className="opacity-0 lg:sticky lg:top-28">
            <div className="relative aspect-4/5 overflow-hidden rounded-4xl sm:aspect-16/12 lg:aspect-auto lg:h-full lg:min-h-128">
              <Image
                src="/images/donation-box.jpg"
                alt="A person carrying a cardboard box of goods to donate"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div data-reveal-group className="grid gap-3">
            {CONVERSIONS.map((row) => {
              const Icon = row.icon;
              return (
                <div
                  key={row.n}
                  className="v2-lift flex gap-4 rounded-4xl p-5 opacity-0 sm:p-6"
                  style={{ background: "var(--v2-raised)", border: hairline(12) }}
                >
                  <div
                    className="flex size-11 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "var(--v2-accent)", color: "var(--v2-accent-on)" }}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p
                      className="text-[11px] font-semibold tabular-nums tracking-[0.18em]"
                      style={{ color: "var(--v2-ink-soft)" }}
                    >
                      {row.n}
                    </p>
                    <p className="mt-1.5 text-pretty font-semibold leading-snug">{row.item}</p>
                    <p
                      className="mt-1.5 flex items-start gap-1.5 text-pretty text-sm leading-relaxed"
                      style={{ color: "var(--v2-ink-soft)" }}
                    >
                      <ArrowRight
                        className="mt-1 size-3.5 shrink-0"
                        style={{ color: "var(--v2-accent-ink)" }}
                        aria-hidden="true"
                      />
                      {row.outcome}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


/* ========================================================================== */
/* FAQ                                                                         */
/* ========================================================================== */

const FAQS = [
  { q: "How do you make money if you take nothing?", a: "A flat platform fee paid by the buyer at checkout, shown before they pay. It covers payment processing. Everything left — 100% of the net proceeds — goes to the seller's chosen nonprofit." },
  { q: "What if my item doesn't sell?", a: "It stays listed for 60 days. After that we'll ask whether you'd like to relist it, lower the price, or have it collected and given directly to the nonprofit as goods." },
  { q: "How do I know the money actually arrived?", a: "Every payout publishes a transfer receipt on the item's page, timestamped and tied to the nonprofit's registered account. You don't have to take our word for it — nobody should." },
  { q: "Who verifies the nonprofits?", a: "Each one submits registration documents and a recent audited statement before their shelf opens. We re-check annually, and we delist anyone who stops filing." },
  { q: "Can I give money instead of things?", a: "Yes, but we'd rather you didn't start there. The thing you already own costs you nothing to give and is worth more than you think. Start with the shelf." },
];

function FaqItem({ item, index }: { item: (typeof FAQS)[number]; index: number }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const id = `v2-faq-${index}`;

  return (
    <div
      className="overflow-hidden rounded-4xl opacity-0"
      style={{ background: "var(--v2-raised)", border: hairline(12) }}
    >
      <h3>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={id}
          className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-7"
        >
          <span
            className="font-display text-lg tabular-nums"
            style={{ color: "var(--v2-ink-soft)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="flex-1 text-pretty text-sm font-semibold sm:text-base">{item.q}</span>
          <span
            className="grid size-9 shrink-0 place-items-center rounded-full transition-transform duration-300"
            style={{
              background: "var(--v2-accent)",
              color: "var(--v2-accent-on)",
              transform: open ? "rotate(180deg)" : "none",
            }}
            aria-hidden="true"
          >
            {open ? <Minus className="size-4" /> : <Plus className="size-4" />}
          </span>
        </button>
      </h3>
      {/* Grid-rows 0fr→1fr animates height without measuring. */}
      <div
        id={id}
        ref={panelRef}
        role="region"
        className="grid transition-[grid-template-rows] duration-400 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p
            className="max-w-2xl text-pretty px-5 pb-6 pl-15 text-sm leading-relaxed sm:px-7 sm:pl-17"
            style={{ color: "var(--v2-ink-soft)" }}
          >
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

function Faq() {
  return (
    <section id="faq" className="px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHead
          eyebrow="Before you ask"
          title="The questions that deserve a straight answer"
          lead="Every one of these is a reason someone closed the tab. So here they are, first."
        />
        <div data-reveal-group className="mt-14 grid gap-3">
          {FAQS.map((item, i) => (
            <FaqItem key={item.q} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* CTA + Footer                                                                */
/* ========================================================================== */

function Cta() {
  return (
    <section id="cta" className="px-4 pb-24 sm:pb-32">
      <div data-reveal className="mx-auto max-w-6xl opacity-0">
        <div
          id="get-app"
          className="relative overflow-hidden rounded-4xl px-6 py-20 text-center sm:px-12 sm:py-24"
          style={{ background: "var(--v2-accent)", color: "var(--v2-accent-on)" }}
        >
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance text-3xl leading-[1.08] sm:text-5xl" style={{ color: "inherit" }}>
              Go look at your shelf. Something on it is finished with you.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-pretty leading-relaxed opacity-80">
              Download the app and post your first item in minutes — 100% of the net proceeds go to
              the cause you choose.
            </p>

            <StoreBadges variant="onAccent" className="mt-9 justify-center" />

            <a
              href="#audiences"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 transition-opacity duration-200 hover:opacity-70"
            >
              Or see how each way in works
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-auto px-4 py-14" style={{ borderTop: hairline(12) }}>
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_auto]">
          <div>
            <a href="#top" className="flex items-center gap-2">
              <LogoMark className="size-8" />
              <span className="text-sm font-semibold tracking-tight">Clutter Sale</span>
            </a>
            <p
              className="mt-4 max-w-xs text-pretty text-sm leading-relaxed"
              style={{ color: "var(--v2-ink-soft)" }}
            >
              Your clutter, someone else&apos;s good day. 100% of net proceeds reach the cause you
              choose.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="text-sm font-semibold">Explore</p>
            {/* Single column: a wrapping row orphaned the last item. */}
            <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              {NAV.map((item) => (
                <li key={item.href}>
                  <NavLink href={item.href}>{item.label}</NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-sm font-semibold">Get the app</p>
            <StoreBadges className="mt-3" />
          </div>
        </div>

        <p
          className="mt-12 border-t pt-6 text-xs"
          style={{ color: "var(--v2-ink-soft)", borderColor: "color-mix(in srgb, var(--v2-hairline) 12%, transparent)" }}
        >
          © {new Date().getFullYear()} Clutter Sale
        </p>
      </div>
    </footer>
  );
}

/* ========================================================================== */

export default function V2Page() {
  const root = useRef<HTMLDivElement>(null);
  useV2Motion(root);

  return (
    <div ref={root}>
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Impact />
        <Worth />
        <HowItWorks />
        <Audiences />
        <Voices />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
