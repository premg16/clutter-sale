"use client"

import { useState, useRef, useEffect, useLayoutEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import {
  ArrowRight,
  ChevronDown,
  MapPin,
  Quote,
  Menu,
  X,
  CircleCheck,
} from "lucide-react"
import { LogoMark } from "@/components/Logo"
import { ThemeToggle } from "@/components/ThemeToggle"
import { DonatorScreen, BuyerScreen, NonprofitScreen, ReviewScreen, BrowseScreen, DashboardScreen } from "./PhoneScreens"
import {
  CharityMarketIllustration,
  ChecklistIllustration,
  HandoffIllustration,
  GivingIllustration,
} from "./Illustrations"
import {
  navLinks,
  heroBadgeCount,
  heroBadgeSuffix,
  heroTabs,
  heroAvatars,
  heroListingCard,
  stats,
  trustPills,
  nonprofits,
  howItWorks,
  listings,
  causeRows,
  testimonials,
  communityAvatars,
  ctaEyebrow,
  ctaHeadline,
  ctaSubline,
  ctaDashboardImage,
  footerStats,
  footerBlurb,
  footerColumns,
} from "./_data"

// Staging's soft card: rounded corners, 1px hairline border, subtle shadow.
// No offset"brutalist" shadow, no 2px border.
const cardShell = "rounded-2xl border border-brand-navy/10 bg-surface-raised shadow-sm dark:border-brand-cream/15"

const badgeShell = (onDark: boolean) =>
  onDark
    ? "border-brand-cream/20 bg-brand-cream text-brand-navy"
    : "border-brand-navy/10 bg-brand-navy text-brand-cream dark:border-brand-cream/15"

// Real store glyphs (the lucide `Apple`/`CirclePlay` icons are generic shapes,
// not the actual marks). Paths lifted from the same badges staging ships.
function AppleGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M17.05 12.04c-.03-2.7 2.2-3.99 2.3-4.06-1.25-1.84-3.2-2.09-3.9-2.12-1.66-.17-3.24.98-4.08.98-.84 0-2.14-.96-3.52-.93-1.81.03-3.48 1.05-4.4 2.67-1.88 3.26-.48 8.08 1.35 10.72.9 1.29 1.97 2.74 3.38 2.69 1.36-.06 1.87-.88 3.51-.88 1.64 0 2.1.88 3.53.85 1.46-.03 2.38-1.32 3.27-2.62 1.03-1.5 1.46-2.96 1.48-3.03-.03-.01-2.84-1.09-2.87-4.34zM14.38 4.2c.74-.9 1.24-2.15 1.1-3.4-1.07.04-2.36.71-3.13 1.61-.69.8-1.29 2.07-1.13 3.29 1.19.09 2.42-.6 3.16-1.5z" />
    </svg>
  )
}

function GooglePlayGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M3.6 2.3C3.4 2.5 3.3 2.9 3.3 3.4v17.2c0 .5.1.9.4 1.1l.1.1L13.4 12v-.2L3.6 2.3z" fill="#00d0ff" />
      <path d="M16.8 15.3 13.4 12v-.2l3.4-3.3.1.1 4 2.3c1.1.7 1.1 1.7 0 2.3l-4.1 2.1z" fill="#ffce00" />
      <path d="M16.9 15.2 13.4 11.9 3.6 21.7c.4.4 1 .4 1.7.1l11.6-6.6" fill="#ff3b4a" />
      <path d="M16.9 8.6 5.3 2.1c-.7-.4-1.3-.3-1.7.1l9.8 9.7 3.5-3.3z" fill="#00f076" />
    </svg>
  )
}

function AppStoreBadge({ onDark = false }: { onDark?: boolean }) {
  return (
    <a
      href="#"
      className={`flex h-14 w-[168px] items-center gap-2.5 rounded-md border px-3 transition-colors hover:opacity-90 ${badgeShell(onDark)}`}
    >
      <AppleGlyph className="h-7 w-7 shrink-0 fill-current" />
      <span className="flex flex-col leading-none">
        <span className="text-[10px]">Download on the</span>
        <span className="text-[17px] font-semibold tracking-tight">App Store</span>
      </span>
    </a>
  )
}

function GooglePlayBadge({ onDark = false }: { onDark?: boolean }) {
  return (
    <a
      href="#"
      className={`flex h-14 w-[168px] items-center gap-2.5 rounded-md border px-3 transition-colors hover:opacity-90 ${badgeShell(onDark)}`}
    >
      <GooglePlayGlyph className="h-7 w-7 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="text-[10px] uppercase tracking-wide">Get it on</span>
        <span className="text-[16px] font-semibold tracking-tight">Google Play</span>
      </span>
    </a>
  )
}

/**
 * `align` decides the *desktop* alignment; on mobile the badges are ALWAYS
 * centred. They previously sat flush-left under centred headings on narrow
 * screens, which read as broken symmetry.
 */
// The four cause illustrations, in row order.
const causeIllustrations = [
  CharityMarketIllustration,
  ChecklistIllustration,
  HandoffIllustration,
  GivingIllustration,
]

function CauseIllustration({ index, className }: { index: number; className?: string }) {
  const Illo = causeIllustrations[index % causeIllustrations.length]
  return <Illo className={className} />
}

function StoreBadges({
  onDark = false,
  align = "start",
}: {
  onDark?: boolean
  align?: "start" | "center"
}) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-4 ${
        align === "start" ? "sm:justify-start" : "sm:justify-center"
      }`}
    >
      <AppStoreBadge onDark={onDark} />
      <GooglePlayBadge onDark={onDark} />
    </div>
  )
}

// Controlled: the hero owns `active` because the tabs swap the headline,
// subline and phone — not just their own highlight.
//
// The indicator measures the real button rects rather than assuming equal
// thirds: the labels have different widths ("Non-profits" vs"Buyers"), so a
// 33.3%-per-tab pill drifts out of alignment and overlaps its neighbours.
function HeroTabs({
  active,
  onChange,
}: {
  active: number
  onChange: (i: number) => void
}) {
  const listRef = useRef<HTMLDivElement>(null)
  const [pill, setPill] = useState({ left: 0, width: 0 })

  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return
    const measure = () => {
      const btn = list.querySelectorAll<HTMLButtonElement>('[role="tab"]')[active]
      if (!btn) return
      setPill({ left: btn.offsetLeft, width: btn.offsetWidth })
    }
    measure()
    // Re-measure when the font loads or the box resizes, else the pill is
    // sized against fallback-font metrics.
    const ro = new ResizeObserver(measure)
    ro.observe(list)
    return () => ro.disconnect()
  }, [active])

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label="Who Clutter Sale is for"
      className="relative inline-flex rounded-full border border-brand-navy/10 bg-surface-raised p-1 dark:border-brand-cream/15"
    >
      <motion.span
        aria-hidden
        className="absolute inset-y-1 rounded-full bg-brand-terracotta"
        animate={{ left: pill.left, width: pill.width }}
        transition={{ type:"spring", stiffness: 400, damping: 34 }}
      />
      {heroTabs.map((tab, i) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={active === i}
          onClick={() => onChange(i)}
          className={`relative z-10 whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition-colors sm:px-5 ${
            active === i ? "text-ink-inverse" : "text-ink"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

// The highlighted word: it rises + unblurs first, then a curved stroke draws
// itself underneath (pathLength 0 -> 1 with a tapered cap = digital-ink feel).
// Keyed on the tab id by the caller, so the whole thing replays on every switch.
function HighlightWord({ word }: { word: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <span className="relative inline-block whitespace-nowrap text-brand-terracotta">
      <motion.span
        className="relative inline-block"
        initial={reduceMotion ? false : { opacity: 0, y:"0.25em", filter:"blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter:"blur(0px)" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {word}
      </motion.span>

      <svg
        aria-hidden
        viewBox="0 0 100 14"
        className="absolute -bottom-2 left-0 h-[0.22em] w-full overflow-visible"
        preserveAspectRatio="none"
      >
        {/* Deeper curve than a flat rule — reads as a hand-drawn brush sweep. */}
        <motion.path
          d="M1 10 Q 26 2.5 50 6 T 99 5"
          stroke="currentColor"
          strokeWidth={7}
          fill="none"
          strokeLinecap="round"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          // Starts as the word finishes landing, so ink follows the letters.
          transition={{
            pathLength: { duration: 0.55, ease: [0.65, 0, 0.35, 1], delay: 0.3 },
            opacity: { duration: 0.01, delay: 0.3 },
          }}
        />
      </svg>
    </span>
  )
}

// Two nested motion layers, because one element cannot both slide in once and
// bob forever — the entrance and the infinite loop would fight over `y`.
//   outer: slides in from `from` on every tab switch (keyed by the caller)
//   inner: the perpetual idle bob
// Two nested motion layers, because one element cannot both slide in once and
// bob forever — the entrance and the infinite loop would fight over `y`.
//   outer (`position`): where the card sits. Positioning classes only.
//   inner (`className`): the visible card. Owns layout, padding and clipping,
//     so caller padding lands INSIDE the box that clips it.
function FloatingCard({
  position,
  className ="",
  delay = 0,
  from ="right",
  children,
}: {
  /** Positioning only, e.g."-left-10 top-10 w-[168px]". */
  position: string
  /** Layout + padding for the card body, e.g."flex items-center gap-2.5 px-4 py-3". */
  className?: string
  delay?: number
  /** Direction the card slides in from when the tab changes. */
  from?: "left" |"right"
  children: React.ReactNode
}) {
  const shouldReduceMotion = useReducedMotion()
  const offset = from === "left" ? -40 : 40

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, x: offset, scale: 0.94 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{
        type:"spring",
        stiffness: 260,
        damping: 26,
        delay: shouldReduceMotion ? 0 : delay,
      }}
      className={`absolute z-30 ${position}`}
    >
      <motion.div
        animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease:"easeInOut", delay }}
        className={`overflow-hidden rounded-2xl border border-brand-navy/10 bg-surface-raised shadow-sm dark:border-brand-cream/15 ${className}`}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

// Tab id -> recreated app screen. Keyed lookup so the sliding layer below
// stays a one-liner regardless of which tab is active.
const phoneScreens: Record<(typeof heroTabs)[number]["id"], React.ComponentType> = {
  donators: DonatorScreen,
  buyers: BuyerScreen,
  nonprofits: NonprofitScreen,
}

// How It Works step number -> recreated app screen, framed the same way as
// the hero's phone.
const howItWorksScreens: Record<string, React.ComponentType> = {
  "01": ReviewScreen,
  "02": BrowseScreen,
  "03": DashboardScreen,
}

export default function V4Page() {
  const [mobileOpen, setMobileOpen] = useState(false)

  // A full-screen overlay that lets the page scroll behind it reads as broken on
  // mobile, so freeze the body while it's open. Escape closes it too.
  useEffect(() => {
    if (!mobileOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener("keydown", onKey)
    }
  }, [mobileOpen])
  // The hero owns the tab: it swaps the headline, subline and phone screen.
  const [activeTab, setActiveTab] = useState(0)
  const tab = heroTabs[activeTab]
  const ActiveScreen = phoneScreens[tab.id]
  const reduceMotion = useReducedMotion()

  return (
    <main className="overflow-x-hidden bg-surface text-ink">
      {/* ---- Header ---- */}
      <header className="sticky top-0 z-50 border-b border-brand-navy/10 bg-surface/80 backdrop-blur-md dark:border-brand-cream/10">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-6 py-4 md:px-10">
          <div className="flex items-center gap-10">
            <Link href="/v4" className="inline-flex items-center gap-2.5 whitespace-nowrap">
              <LogoMark className="h-9 w-9" />
              <span className="text-xl font-bold tracking-tight text-ink">
                Clutter<span className="text-brand-terracotta">Sale</span>
              </span>
            </Link>
            <nav className="hidden items-center gap-1 text-[15px] font-semibold text-ink lg:flex">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-full px-3 py-2 transition-colors hover:text-brand-terracotta"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* The default skin is `/`'s neo-brutalist chip (2px navy border, hard
                offset shadow) — the exact style stripped out of /v4. `className`
                replaces it wholesale, so this matches the header's soft hairline
                language without touching the shared component or other routes. */}
            <ThemeToggle className="relative grid size-10 place-items-center rounded-full border border-brand-navy/10 bg-surface-raised text-ink shadow-sm transition-colors hover:bg-surface hover:text-brand-terracotta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-terracotta dark:border-brand-cream/15" />
            <a
              href="#"
              className="hidden text-[15px] font-semibold text-ink transition-colors hover:text-brand-terracotta sm:inline-flex"
            >
              Sign in
            </a>
            <a
              href="#"
              className="hidden rounded-2xl bg-brand-terracotta px-4 py-2 text-sm font-bold text-ink-inverse transition-colors hover:opacity-90 sm:inline-block"
            >
              Download App
            </a>
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-navy/10 text-ink transition-colors hover:bg-surface-raised dark:border-brand-cream/15 lg:hidden"
            >
              {mobileOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
            </button>
          </div>
        </div>

      </header>

      {/* Mobile menu — a FIXED full-screen overlay, not an in-flow panel.
          The old `grid-rows-[0fr] -> [1fr]` expander lived inside <header>, so
          opening it grew the header and shoved the hero down the page. Taking it
          out of flow means it covers the page instead of displacing it. */}
      <div
        className={`fixed inset-0 z-60 lg:hidden ${mobileOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 h-full w-full bg-brand-navy/40 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <nav
          className={`absolute inset-0 flex flex-col bg-surface transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Mirrors the real header bar so the logo + close button line up. */}
          <div className="flex items-center justify-between border-b border-brand-navy/10 px-6 py-4 dark:border-brand-cream/10">
            <span className="inline-flex items-center gap-2.5">
              <LogoMark className="h-9 w-9" />
              <span className="text-xl font-bold tracking-tight text-ink">
                Clutter<span className="text-brand-terracotta">Sale</span>
              </span>
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-navy/10 text-ink transition-colors hover:bg-surface-raised dark:border-brand-cream/15"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 py-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-3.5 text-[18px] font-semibold text-ink hover:bg-surface-raised"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-3 py-3.5 text-[18px] font-semibold text-ink hover:bg-surface-raised"
            >
              Sign in
            </a>

            <a
              href="#"
              onClick={() => setMobileOpen(false)}
              className="mt-4 inline-flex items-center justify-center rounded-2xl bg-brand-terracotta px-4 py-3.5 text-[15px] font-bold text-ink-inverse transition-colors hover:opacity-90"
            >
              Download App
            </a>
          </div>
        </nav>
      </div>

      {/* ---- Hero ---- */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="hero-bloom hero-bloom-a" />
          <div className="hero-bloom hero-bloom-b" />
        </div>

        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-10 px-6 py-12 md:px-10 md:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-14 lg:py-20">
          {/* Centre the whole stack on mobile, left-align from `sm` up. `items-start`
              alone pinned the badge, tabs, headline and avatar row to the left edge
              of a narrow column, which read as lopsided. Centring the container fixes
              every child at once rather than patching each one. */}
          <div className="flex flex-col items-center gap-5 text-center sm:items-start sm:text-left md:gap-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-navy/10 bg-surface-raised px-3 py-1.5 text-[13px] font-semibold text-ink shadow-sm dark:border-brand-cream/15">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-slate/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-slate" />
              </span>
              <span className="tabular-nums">{heroBadgeCount}</span> {heroBadgeSuffix}
            </span>

            <HeroTabs active={activeTab} onChange={setActiveTab} />

            {/* Keyed on the tab id so the copy cross-fades on switch. */}
            <motion.div
              key={tab.id}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease:"easeOut" }}
              className="flex flex-col gap-5 md:gap-6"
            >
              <h1 className="max-w-[680px] text-balance text-[44px] leading-[1.04] tracking-[-0.01em] text-ink md:text-[72px]">
                {tab.headlinePrefix}{" "}
                <HighlightWord key={tab.id} word={tab.highlightWord} />
              </h1>
              <p className="max-w-[540px] text-pretty text-[17px] leading-[1.6] text-ink-soft md:text-[19px]">
                {tab.subline}
              </p>
            </motion.div>

            <StoreBadges />

            <div className="flex items-center gap-3 pt-1">
              <div className="flex -space-x-2.5">
                {heroAvatars.map((a) => (
                  <span
                    key={a.initials}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-surface text-[11px] font-bold ${a.className}`}
                  >
                    {a.initials}
                  </span>
                ))}
              </div>
              <div className="text-[13px] leading-tight text-ink-soft">
                <div className="flex gap-0.5 text-[13px] tracking-tight text-brand-gold">★★★★★</div>
                <span>
                  Join <span className="font-semibold text-ink">200+ neighbors</span> supporting local causes
                </span>
              </div>
            </div>
          </div>

          <div className="relative hidden justify-center lg:flex">
            {/* Outer box = the PHONE's visual size (330 x 687). The floating
                cards anchor to this, so they hug the device, not the canvas.
                The frame's square canvas is centered inside and allowed to
                overflow — the surplus is fully transparent, so nothing shows. */}
            <div className="relative h-[687px] w-[330px]">
              {/* SQUARE canvas, matching the frame PNG's 5000x5000 aspect.
                  Load-bearing: the cutout insets below are percentages OF THAT
                  SQUARE, so this box must be square too — against any other
                  aspect ratio the percentages resolve to a different rect and
                  the screen lands off-register. The phone body is 2080/5000 =
                  41.6% of the canvas, so a 793px square draws it at ~330px. */}
              <div className="absolute left-1/2 top-1/2 aspect-square w-[793px] -translate-x-1/2 -translate-y-1/2">
              {/* Screen cutout: the frame PNG's true transparent hole. Shares the
                  frame's coordinate space below, so the two line up exactly. */}
              <div
                className="absolute overflow-hidden rounded-[2.6rem]"
                style={{ inset: "8.32% 30.74% 8.42% 31.00%" }}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={tab.id}
                    initial={reduceMotion ? false : { x: "100%", opacity: 0.6 }}
                    animate={{ x: "0%", opacity: 1 }}
                    exit={reduceMotion ? { opacity: 0 } : { x: "-100%", opacity: 0.6 }}
                    transition={{ type: "spring", stiffness: 260, damping: 30 }}
                    className="absolute inset-0"
                  >
                    <ActiveScreen />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Frame ON TOP, static, never animates. Fills the same square, so
                  its transparent hole sits exactly over the cutout above. */}
              <img
                src="/assets/ip14frame.png"
                alt=""
                aria-hidden
                className="pointer-events-none absolute inset-0 z-20 h-full w-full"
              />
              </div>
              {/* /square canvas — cards below anchor to the PHONE box, not it. */}

              <FloatingCard
                key={`listing-${tab.id}`}
                position="-right-32 top-4 w-[168px]"
                delay={0.08}
                from="right"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-surface">
                  <Image
                    src={heroListingCard.image}
                    alt={heroListingCard.alt}
                    fill
                    sizes="168px"
                    className="object-cover"
                  />
                  <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-surface-raised/90 px-1.5 py-0.5 text-[10px] font-bold text-brand-terracotta backdrop-blur-sm">
                    <MapPin className="size-2.5" aria-hidden />
                    {heroListingCard.chip}
                  </span>
                </div>
                <div className="flex items-center justify-between px-2.5 py-2">
                  <span className="text-[13px] font-bold tabular-nums text-ink">{heroListingCard.price}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-terracotta/10 px-1.5 py-0.5 text-[10px] font-bold text-brand-terracotta">
                    {heroListingCard.gift}
                  </span>
                </div>
              </FloatingCard>

              <FloatingCard
                key={`sold-${tab.id}`}
                position="-left-40 top-44"
                className="flex items-center gap-2.5 px-4 py-3"
                delay={0.16}
                from="left"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-terracotta/15">
                  <CircleCheck className="size-5 text-brand-terracotta" aria-hidden />
                </div>
                <div className="leading-tight">
                  <div className="text-[13px] font-bold text-ink">{tab.statusCard.label}</div>
                  <div className="text-[11px] text-ink-soft">{tab.statusCard.sub}</div>
                </div>
              </FloatingCard>

              <FloatingCard
                key={`raised-${tab.id}`}
                position="-right-32 bottom-20"
                className="flex items-center gap-2.5 px-4 py-3"
                delay={0.24}
                from="right"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-slate/20">
                  <HeartCoinIcon />
                </div>
                <div className="leading-tight">
                  <div className="text-[17px] font-bold tabular-nums text-ink">{tab.metricCard.value}</div>
                  <div className="text-[11px] text-ink-soft">{tab.metricCard.label}</div>
                </div>
              </FloatingCard>
            </div>
          </div>
        </div>

        <div className="pointer-events-none flex justify-center pb-6">
          <ScrollCue />
        </div>
      </section>

      {/* ---- Stats band ---- */}
      <section className="border-y border-brand-navy/10 bg-surface-raised dark:border-brand-cream/10">
        <div className="mx-auto w-full max-w-[1200px] px-6 py-12 md:px-10 md:py-14">
          <div className="grid grid-cols-1 divide-y divide-brand-navy/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0 dark:divide-brand-cream/10">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center px-4 py-5 text-center sm:py-1">
                <div className="text-[40px] font-bold leading-none text-brand-terracotta tabular-nums md:text-[56px]">
                  {stat.value}
                </div>
                <div className="mt-2 text-[14px] font-medium text-ink-soft md:text-[15px]">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-brand-navy/10 pt-8 dark:border-brand-cream/10">
            {trustPills.map(({ iconImage, label }) => (
              <div key={label} className="flex items-center gap-2.5 text-[14px] font-semibold text-ink sm:text-[15px]">
                <Image src={iconImage} alt="" aria-hidden width={36} height={36} className="h-9 w-9 object-contain" />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-9 text-center">
            <p className="mb-4 text-[11.5px] font-bold uppercase tracking-[0.18em] text-ink-soft">
              Funding Causes Across Your Community
            </p>
            <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-7 gap-y-2.5">
              {nonprofits.map((name) => (
                <span
                  key={name}
                  className="inline-flex items-center gap-1.5 text-[16px] font-semibold text-ink/55 md:text-[17px]"
                >
                  <CircleCheck className="size-3.5" aria-hidden />
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- How It Works ---- */}
      <section id="how-it-works" className="py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className={`mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-brand-slate ${cardShell}`}>
              The Journey
            </span>
            <h2 className="text-balance text-[34px] tracking-tight text-ink md:text-[46px]">
              How It Works
            </h2>
            <p className="mt-3 text-pretty text-[17px] leading-relaxed text-ink-soft md:text-[18px]">
              A few minutes from your couch to a real donation.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 md:gap-6">
            {howItWorks.map((step) => {
              const StepScreen = howItWorksScreens[step.number]
              return (
                <div key={step.number} className="flex h-full flex-col items-center text-center">
                  <span className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-navy/10 bg-surface-raised text-[26px] font-bold leading-none text-brand-terracotta shadow-sm dark:border-brand-cream/15">
                    {step.number}
                  </span>
                  {/* Outer box = the PHONE's visual size (200 x 416), same
                      pattern as the hero. Square canvas centered inside and
                      allowed to overflow — the surplus PNG is transparent. */}
                  {/* 260px phone (not 200): at 200 the app UI only fit by shrinking
                      text to 6-8px, which is below legible. 260 / 0.416 = 625px
                      square canvas; phone height = 260 * 2.081 = 541px. */}
                  <div className="relative mb-6 h-[541px] w-[260px]">
                    <div className="absolute left-1/2 top-1/2 aspect-square w-[625px] -translate-x-1/2 -translate-y-1/2">
                      <div
                        className="absolute overflow-hidden rounded-[2rem]"
                        style={{ inset: "8.32% 30.74% 8.42% 31.00%" }}
                      >
                        {StepScreen ? <StepScreen /> : null}
                      </div>
                      <img
                        src="/assets/ip14frame.png"
                        alt=""
                        aria-hidden
                        className="pointer-events-none absolute inset-0 z-20 h-full w-full"
                      />
                    </div>
                  </div>
                  <h3 className="mb-2 mt-4 text-[22px] text-ink">{step.title}</h3>
                  <p className="max-w-xs text-pretty text-[15px] leading-relaxed text-ink-soft">{step.sentence}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---- Featured Listings (infinite marquee) ---- */}
      <section className="overflow-hidden bg-surface-raised py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className={`mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-brand-slate ${cardShell}`}>
                Near You
              </span>
              <h2 className="text-balance text-[30px] tracking-tight text-ink md:text-[40px]">
                Featured Listings in Your Area
              </h2>
              <p className="mt-1 text-[16px] text-ink-soft md:text-[18px]">
                Every sale funds a nonprofit the seller chose.
              </p>
            </div>
            <a href="#" className="inline-flex items-center gap-1.5 text-[15px] font-bold text-brand-terracotta hover:underline">
              View all <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>

        {/* Full-bleed track (as on staging) with edge fades so cards stream in
            and out rather than looking clipped at the viewport edge. */}
        <div className="group/marquee relative overflow-hidden py-2">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r from-surface to-transparent md:w-24"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l from-surface to-transparent md:w-24"
          />
          <div className="flex w-max animate-marquee gap-5 px-3 group-hover/marquee:[animation-play-state:paused]">
            {[...listings, ...listings].map((item, i) => (
              <div
                key={`${item.name}-${i}`}
                className={`w-[280px] shrink-0 overflow-hidden p-0 ${cardShell}`}
              >
                <div className="relative aspect-4/3 overflow-hidden bg-surface-raised">
                  <Image src={item.image} alt={item.name} fill sizes="280px" className="object-cover" />
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-surface/90 px-2 py-0.5 text-[11px] font-bold text-brand-terracotta backdrop-blur-sm">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-terracotta/60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-terracotta" />
                    </span>
                    Local
                  </span>
                </div>
                <div className="p-4">
                  <h4 className="truncate text-[15px] font-bold text-ink">{item.name}</h4>
                  <p className="mt-0.5 truncate text-[12px] text-ink-soft">Supports {item.cause}</p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <p className="text-[20px] font-bold leading-none tabular-nums text-brand-terracotta">
                      {item.price}
                    </p>
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand-terracotta/10 px-2 py-1 text-[11px] font-bold text-brand-terracotta">
                      Gift
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Clutter for a Cause ---- */}
      <section id="cause" className="py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className={`mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-brand-slate ${cardShell}`}>
              Clutter for a Cause
            </span>
            <h2 className="text-balance text-[34px] tracking-tight text-ink md:text-[46px]">
              Turn Unused Items Into Support
            </h2>
            <p className="mt-3 text-pretty text-[17px] leading-relaxed text-ink-soft md:text-[18px]">
              Snap, list, sell locally — the money goes straight to your cause.
            </p>
          </div>

          {/* Wider gaps: without the card borders, the rows need real whitespace
              between them to read as separate steps. */}
          <div className="flex flex-col gap-16 md:gap-20">
            {causeRows.map((row, i) => {
              const reversed = i % 2 === 1
              return (
                <div
                  key={row.step}
                  className="grid items-center gap-8 md:grid-cols-2 md:gap-14"
                >
                  {/* No card, no pink box. The illustrations are transparent now,
                      so they sit straight on the surface — the old bordered card
                      wrapping a letterboxed screenshot is what made this ugly. */}
                  {/* Square box sized to the art. The SVGs are 200x200 square —
                      in a 4:3 box `object-contain` letterboxed them, which is
                      what left the big empty bands above and below. */}
                  {/* Inlined, not <Image src="*.svg">: an <img> renders the SVG in an
                      isolated document where the `var(--illo-*)` fills can't see the
                      page's custom properties, so dark mode would silently no-op.
                      Inline, they resolve — and the whole thing fades up on scroll. */}
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex justify-center ${reversed ? "md:order-2" : ""}`}
                  >
                    <CauseIllustration
                      index={i}
                      className="h-auto w-full max-w-[300px] md:max-w-[340px]"
                    />
                  </motion.div>

                  {/* Text slides in from the side its illustration ISN'T on, so the
                      two halves of each row converge. Slightly behind the artwork
                      (0.12s) so the eye lands on the image first. */}
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, x: reversed ? -28 : 28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
                    className={reversed ? "md:order-1" : ""}
                  >
                    <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-terracotta/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-terracotta">
                      {row.step}
                    </span>
                    <h3 className="mb-2 text-balance text-[26px] leading-tight text-ink md:text-[34px]">
                      {row.title}
                    </h3>
                    <p className="max-w-md text-pretty text-[16px] leading-relaxed text-ink-soft md:text-[17px]">
                      {row.sentence}
                    </p>
                  </motion.div>
                </div>
              )
            })}
          </div>

          <div className="mt-10 flex justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-terracotta px-8 py-4 text-lg font-bold text-ink-inverse transition-colors hover:opacity-90"
            >
              Start giving back <ArrowRight className="size-5" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      {/* ---- Testimonials ---- */}
      <section className="relative overflow-hidden bg-surface-raised py-20 md:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
          <div className="hero-bloom hero-bloom-a opacity-30" />
          <div className="hero-bloom hero-bloom-b opacity-30" />
        </div>

        <div className="relative mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className={`mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-brand-slate ${cardShell}`}>
              Community
            </span>
            <h2 className="text-balance text-[34px] tracking-tight text-ink md:text-[46px]">
              Loved by neighbors &amp; nonprofits
            </h2>
            <p className="mt-3 text-pretty text-[17px] leading-relaxed text-ink-soft md:text-[18px]">
              Real people turning clutter into support for their community.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className={`flex h-full flex-col p-7 ${cardShell}`}>
                <Quote className="mb-4 size-7 shrink-0 text-brand-terracotta" aria-hidden />
                <blockquote className="flex-1 text-pretty text-[16px] leading-relaxed text-ink-soft">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-brand-navy/10 pt-5 dark:border-brand-cream/10">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-terracotta/10 text-[14px] font-bold text-brand-terracotta">
                    {t.initials}
                  </span>
                  <span className="leading-tight">
                    <span className="block text-[15px] font-bold text-ink">{t.name}</span>
                    <span className="block text-[13px] text-ink-soft">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <div className="flex flex-wrap justify-center -space-x-3">
              {communityAvatars.map((a) => (
                <span
                  key={a.initials}
                  className={`flex h-11 w-11 items-center justify-center rounded-full border-2 border-surface-raised text-[12px] font-bold transition-transform hover:-translate-y-1 ${a.className}`}
                >
                  {a.initials}
                </span>
              ))}
              <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-surface-raised bg-brand-navy text-[11px] font-bold text-brand-cream">
                +200
              </span>
            </div>
            <p className="text-[15px] font-medium text-ink-soft">
              <span className="font-bold text-ink">200+ neighbors</span> are already turning clutter into good.
            </p>
          </div>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="bg-surface pb-24 pt-4">
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          {/* No cardShell here: its bg-surface-raised would override bg-brand-navy
              and wash the panel out under the cream text. */}
          <div className="relative overflow-hidden rounded-[32px] bg-brand-navy px-6 py-16 text-center shadow-sm md:px-10 md:py-20">
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
              <div className="hero-bloom hero-bloom-a" />
              <div className="hero-bloom hero-bloom-b" />
            </div>
            {/* Dashboard screenshot peeking from the bottom-right, as on staging. */}
            <div className="pointer-events-none absolute -bottom-12 right-4 hidden aspect-4/3 w-48 overflow-hidden rounded-2xl border border-brand-cream/20 shadow-2xl lg:block">
              <Image
                src={ctaDashboardImage}
                alt=""
                fill
                sizes="192px"
                className="object-cover"
                aria-hidden
              />
            </div>

            <div className="relative">
              <span className="relative inline-flex items-center gap-2 rounded-full bg-brand-cream/15 px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-brand-cream backdrop-blur">
                {ctaEyebrow}
              </span>
              <h2 className="relative mx-auto mt-4 max-w-2xl text-balance text-[32px] leading-tight text-brand-cream md:text-[48px]">
                {ctaHeadline}
              </h2>
              <p className="relative mx-auto mt-3 max-w-xl text-[16px] text-brand-cream/90 md:text-[18px]">
                {ctaSubline}
              </p>
              {/* Cream badges: the default navy ones disappear on the navy panel.
                  Centred at every width — the whole CTA panel is centre-aligned. */}
              <div className="relative mt-8">
                <StoreBadges onDark align="center" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Footer ---- */}
      <footer id="footer" className="border-t border-brand-navy/10 bg-surface-raised py-16 dark:border-brand-cream/10">
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          {/* Stats: 3-across even on mobile. They were one-per-row (sm:grid-cols-3
              only kicked in at 640px), which cost three tall rows of footer height.
              Stacked icon-over-value centres cleanly in a narrow column. */}
          <div className={`mb-12 grid grid-cols-3 gap-2 p-5 sm:gap-4 sm:p-6 ${cardShell}`}>
            {footerStats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-2 text-center sm:flex-row sm:gap-3 sm:text-left"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-terracotta/10 sm:h-11 sm:w-11">
                  <HeartCoinIcon />
                </span>
                <span className="leading-tight">
                  <span className="block text-[17px] font-bold tabular-nums text-ink sm:text-[22px]">
                    {stat.value}
                  </span>
                  <span className="text-[11px] text-ink-soft sm:text-[13px]">{stat.label}</span>
                </span>
              </div>
            ))}
          </div>

          {/* 3 columns on mobile: there are exactly 3 link groups, so a 2-col grid
              orphaned the last one on its own row. The link labels are short enough
              to hold at this width. */}
          <div className="grid grid-cols-3 gap-x-4 gap-y-10 border-b border-brand-navy/10 pb-12 md:grid-cols-12 md:gap-10 dark:border-brand-cream/10">
            {/* Brand block: centred on mobile so the logo, blurb and badges sit on a
                shared axis instead of hugging the left edge. */}
            <div className="col-span-3 flex flex-col items-center space-y-4 text-center md:col-span-3 md:items-start md:text-left">
              <Link href="/v4" className="inline-flex items-center gap-2.5 whitespace-nowrap">
                <LogoMark className="h-9 w-9" />
                <span className="text-xl font-bold tracking-tight text-ink">
                  Clutter<span className="text-brand-terracotta">Sale</span>
                </span>
              </Link>
              <p className="max-w-xs text-pretty text-[14px] leading-relaxed text-ink-soft">{footerBlurb}</p>
              <div className="flex flex-wrap justify-center gap-3 pt-1 md:justify-start">
                <AppStoreBadge />
                <GooglePlayBadge />
              </div>
            </div>

            {/* Link groups: 2-across on mobile. One-per-row made the footer a very
                long single column — this halves its height and gives the groups a
                symmetrical grid. */}
            {footerColumns.map((col) => (
              <div key={col.title} className="col-span-1 md:col-span-2">
                <p className="text-[12px] font-bold uppercase tracking-wider text-ink">{col.title}</p>
                <ul className="mt-3 space-y-2 md:mt-4">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-[14px] text-ink-soft hover:text-ink">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="col-span-3 md:col-span-3">
              <p className="text-[12px] font-bold uppercase tracking-wider text-ink">Subscribe</p>
              <p className="mt-4 text-[13px] text-ink-soft">Local listings and nonprofit updates, monthly.</p>
              <div className="mt-3 flex gap-2">
                <input
                  type="email"
                  placeholder="Email"
                  aria-label="Email address"
                  className={`w-full rounded-xl px-3 py-2 text-sm ${cardShell}`}
                />
                <button
                  type="button"
                  className="shrink-0 rounded-xl bg-brand-terracotta px-4 py-2 text-sm font-bold text-ink-inverse transition-colors hover:opacity-90"
                >
                  Join
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-ink-soft sm:flex-row">
            <p>&copy; {new Date().getFullYear()} clutter.sale — Built for your community.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-ink">Privacy</a>
              <a href="#" className="hover:text-ink">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

function ScrollCue() {
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.span
      aria-hidden
      animate={shouldReduceMotion ? undefined : { y: [0, 6, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, ease:"easeInOut" }}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-navy/10 text-ink-soft dark:border-brand-cream/15"
    >
      <ChevronDown className="size-4" aria-hidden />
    </motion.span>
  )
}

function HeartCoinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 text-brand-terracotta" aria-hidden fill="none" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 20.25s-7.5-4.5-9.5-9A5 5 0 0 1 12 6.25a5 5 0 0 1 9.5 5c-2 4.5-9.5 9-9.5 9Z"
      />
    </svg>
  )
}
