"use client";

import { Quote } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Apple-style testimonial carousel.
 *
 * Design decisions, and why:
 * - A native scroll-snap track, not a JS-transformed one. Trackpad, touch and
 *   keyboard all work for free, and the browser handles momentum.
 * - Neighbouring cards peek at the edges, so the track reads as continuous
 *   rather than a slideshow of full-bleed panels.
 * - The active card lifts and its neighbours dim, which is the cue Apple uses
 *   instead of arrows.
 * - No prev/next buttons. Autoplay advances; the segmented indicator doubles as
 *   the manual control (and as the progress bar for the current card).
 *
 * Autoplay pauses on hover, on focus, when the tab is hidden, and when the
 * section scrolls out of view — an unattended animation off-screen is wasted
 * work and, per WCAG 2.2.2, motion the user cannot stop is a failure.
 */

const VOICES = [
  {
    quote:
      "The turntable sat in my hallway for four years. It paid for Biscuit's surgery in nine days. I still can't make those two facts sit next to each other.",
    name: "Meera R.",
    role: "Listed one turntable",
    where: "Pune",
    tag: "Donator",
    image: "/images/animal-rescue.jpg",
    alt: "A veterinarian gently examining a dog on a clinic table",
  },
  {
    quote:
      "I needed a desk. I paid roughly what I'd have paid anywhere else. The difference is I know the name of the school library it furnished.",
    name: "Arjun T.",
    role: "Bought a writing desk",
    where: "Bengaluru",
    tag: "Buyer",
    image: "/images/library-reading.jpg",
    alt: "Two students sitting together reading books at a library table",
  },
  {
    quote:
      "We stopped writing grant applications in March. The shelf covers our vet bills now, and it does it without me asking anyone for money.",
    name: "Fatima N.",
    role: "Runs a street-dog shelter",
    where: "Hyderabad",
    tag: "Non Profit",
    image: "/images/community-giving.jpg",
    alt: "Volunteers handing over boxes of donated goods",
  },
  {
    quote:
      "Three coats I hadn't worn since the winter I moved. I photographed them on the bedroom floor. That was the entire effort involved.",
    name: "Dev S.",
    role: "Listed winter clothing",
    where: "Delhi",
    tag: "Donator",
    image: "/images/thrifted-items.jpg",
    alt: "A flat lay of folded clothes, a bag and accessories laid out for resale",
  },
  {
    quote:
      "The receipt published the same afternoon. I've given to a lot of causes and never once seen the money actually arrive. Here I watched it.",
    name: "Priya M.",
    role: "Bid on a donated camera",
    where: "Chennai",
    tag: "Buyer",
    image: "/images/community-garden.jpg",
    alt: "People tending beds in a community garden",
  },
] as const;

const AUTOPLAY_MS = 6000;

export function Voices() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  const trackRef = useRef<HTMLUListElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLLIElement | null>>([]);
  // True while we are programmatically scrolling, so the scroll listener does
  // not fight the autoplay by re-deriving the index mid-animation.
  const scrolling = useRef(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  /** Scroll a card to the centre of the track. */
  const goTo = useCallback((i: number, smooth = true) => {
    const track = trackRef.current;
    const card = cardRefs.current[i];
    if (!track || !card) return;
    scrolling.current = true;
    track.scrollTo({
      left: card.offsetLeft - (track.clientWidth - card.clientWidth) / 2,
      behavior: smooth ? "smooth" : "auto",
    });
    setIndex(i);
    window.setTimeout(() => {
      scrolling.current = false;
    }, 600);
  }, []);

  /* ---- Autoplay -------------------------------------------------------- */
  // Off-screen or hidden tabs do no work; hover/focus pause it.
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.35,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || paused || !visible) return;
    const t = window.setTimeout(() => goTo((index + 1) % VOICES.length), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [index, paused, visible, reduced, goTo]);

  /* ---- Derive the active card from real scroll position ----------------- */
  // Keeps the indicator honest when the user swipes or trackpad-scrolls.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      if (scrolling.current) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const mid = track.scrollLeft + track.clientWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        cardRefs.current.forEach((c, i) => {
          if (!c) return;
          const d = Math.abs(c.offsetLeft + c.clientWidth / 2 - mid);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        setIndex(best);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="voices" ref={sectionRef} className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Five shelves, five stories</Eyebrow>
          <h2
            data-split-heading
            className="mt-4 text-balance text-3xl leading-[1.08] opacity-0 sm:text-4xl md:text-5xl"
          >
            The people on both sides of the shelf
          </h2>
        </div>
      </div>

      <div
        data-reveal
        className="mt-14 opacity-0"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {/* Snap track. The inline padding must equal half the leftover space
            beside a card — (100% - cardWidth) / 2 — or the first and last cards
            can never reach the centre and the snap clamps them to the edges.
            It therefore tracks the same responsive widths as .v2-card below. */}
        <ul
          ref={trackRef}
          className="v2-track flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 px-[calc((100%-86vw)/2)] sm:px-[calc((100%-70vw)/2)] lg:px-[calc((100%-58rem)/2)]"
          aria-label="Stories from people who used Clutter Sale"
        >
          {VOICES.map((v, i) => {
            const active = i === index;
            return (
              <li
                key={v.name}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="v2-card w-[86vw] shrink-0 snap-center sm:w-[70vw] lg:w-232"
                style={{
                  opacity: active ? 1 : 0.45,
                  transform: `scale(${active ? 1 : 0.94})`,
                }}
                aria-current={active}
              >
                <figure
                  className="grid h-full overflow-hidden rounded-4xl lg:grid-cols-2"
                  style={{
                    background: "var(--v2-raised)",
                    border: "1px solid color-mix(in srgb, var(--v2-hairline) 12%, transparent)",
                  }}
                >
                  <div className="relative min-h-72 lg:min-h-112">
                    <Image
                      src={v.image}
                      alt={v.alt}
                      fill
                      sizes="(min-width: 1024px) 30rem, 90vw"
                      className="object-cover"
                    />
                    <span
                      className="absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-semibold"
                      style={{ background: "var(--v2-accent)", color: "var(--v2-accent-on)" }}
                    >
                      {v.tag}
                    </span>
                  </div>

                  <div className="flex flex-col justify-center p-8 sm:p-11">
                    <Quote
                      className="size-8 shrink-0"
                      style={{ color: "var(--v2-accent-ink)" }}
                      aria-hidden="true"
                    />
                    <blockquote className="mt-5 text-balance text-xl leading-[1.32] sm:text-2xl">
                      {`“${v.quote}”`}
                    </blockquote>
                    <figcaption className="mt-7 flex items-center gap-3">
                      <span
                        className="grid size-11 shrink-0 place-items-center rounded-full text-sm font-semibold"
                        style={{ background: "var(--v2-accent)", color: "var(--v2-accent-on)" }}
                        aria-hidden="true"
                      >
                        {v.name.charAt(0)}
                      </span>
                      <span>
                        <span className="block text-sm font-semibold">{v.name}</span>
                        <span className="block text-xs" style={{ color: "var(--v2-ink-soft)" }}>
                          {v.role} · {v.where}
                        </span>
                      </span>
                    </figcaption>
                  </div>
                </figure>
              </li>
            );
          })}
        </ul>

        {/* Segmented indicator. Doubles as the only control — the active segment
            fills over the autoplay duration, so it reads as progress. */}
        {/* mt-3 not mt-8: each button now carries py-5 for its 44px hit area. */}
        <div className="mx-auto mt-3 flex max-w-6xl items-center justify-center gap-2 px-4">
          {VOICES.map((v, i) => {
            const active = i === index;
            return (
              <button
                key={v.name}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Story ${i + 1} of ${VOICES.length}: ${v.name}, ${v.tag}`}
                aria-current={active}
                // The bar stays 6px, but the button gets a 44px tall hit area:
                // a 6px tap target is unusable on a phone.
                className="group relative grid place-items-center py-5"
                style={{ width: active ? 64 : 28 }}
              >
                <span
                  className="relative block h-1.5 w-full overflow-hidden rounded-full transition-all duration-500"
                  style={{ background: "color-mix(in srgb, var(--v2-hairline) 20%, transparent)" }}
                  aria-hidden="true"
                >
                  <span
                    key={`${v.name}-${index}-${paused}-${visible}`}
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      background: "var(--v2-accent)",
                      width: active ? "100%" : "0%",
                      // Fill over the autoplay window; snap full when paused so
                      // the bar never lies about how long is left.
                      animation:
                        active && !reduced && !paused && visible
                          ? `v2-progress ${AUTOPLAY_MS}ms linear forwards`
                          : undefined,
                      transform: active && (paused || reduced || !visible) ? "none" : undefined,
                    }}
                  />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

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
