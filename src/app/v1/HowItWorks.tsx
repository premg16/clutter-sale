"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Scroll-driven three-column "how it works", after the Stella reference.
 *
 * How the reference actually works (read off the frames, not guessed):
 *
 * - The whole section is PINNED. The nav, quote marks, image window and rail
 *   all hold still while only the fill, active label, image clip and text
 *   change. Scroll distance is converted into progress through the steps.
 * - The left rail is not a dot travelling down a track. It's a single fill that
 *   grows top-down (`scaleY` from `transform-origin: top`); whichever label its
 *   leading edge has reached becomes active.
 * - The middle images are stacked in one fixed window. Each successive image is
 *   revealed by a hard horizontal edge sweeping up from the bottom — a scrubbed
 *   `clip-path: inset(N% 0 0 0)`, not a crossfade. That is why it reverses
 *   perfectly when you scroll back up: it's a position, not a transition.
 * - The right text swaps on the same threshold as the label.
 *
 * Everything hangs off one scrubbed timeline, so reverse scroll is free.
 */

const STEPS = [
  {
    n: "01",
    label: "Photograph it where it sits",
    quote:
      "No studio. No staging. One honest photo of the thing on the shelf is enough to list it — the coat you haven't worn since 2023 does not need a lightbox.",
    who: "Takes about a minute",
    image: "/images/thrifted-items.jpg",
    alt: "A flat lay of folded clothes, a bag and accessories laid out for resale",
  },
  {
    n: "02",
    label: "Choose who it's for",
    quote:
      "Pick a verified nonprofit before it sells. The cause is attached to the item, not to your mood on the day the money lands.",
    who: "Verified charities only",
    image: "/images/animal-rescue.jpg",
    alt: "A veterinarian gently examining a dog on a clinic table",
    // Landscape source (1.33) in a 4:5 window crops hard; pull the frame to the
    // subject so the dog's face survives instead of the empty counter.
    focus: "50% 35%",
  },
  {
    n: "03",
    label: "Hand it over, once",
    quote:
      "A courier collects from your door. You never meet a stranger, never haggle over five hundred rupees, never queue at a post office on a Saturday.",
    who: "One doorstep handoff",
    image: "/images/donation-box.jpg",
    alt: "A person carrying a cardboard box of goods to donate",
  },
  {
    n: "04",
    label: "Watch the receipt arrive",
    quote:
      "When it sells, the transfer is public. You get the receipt. So does everyone else. You never have to take our word for where the money went.",
    who: "Published, timestamped",
    image: "/images/library-reading.jpg",
    alt: "Two students sitting together reading books at a library table",
    focus: "50% 40%",
  },
] as const;

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const imagesRef = useRef<Array<HTMLDivElement | null>>([]);
  const [active, setActive] = useState(0);
  // Below `lg` the section is a plain stacked list: no pin, no scrub, and every
  // panel visible. Drives the aria/opacity that CSS alone cannot reach.
  const [scrubbed, setScrubbed] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setScrubbed(mq.matches && !reduce.matches);
    sync();
    mq.addEventListener("change", sync);
    reduce.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Reduced motion: no pin, no scrub. The CSS turns the section into a plain
    // stacked list, so all four steps are present and readable without motion.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: gsap.MatchMedia | undefined;
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      // Pin + scrub only from `lg` up. Below that the section stacks to ~1525px
      // — nearly twice an iPhone viewport — and pinning it would trap content
      // off-screen with no way to scroll to it. gsap.matchMedia() creates the
      // timeline on entry and fully reverts it on exit, including the pin
      // spacer, so rotating a phone cleans up after itself.
      ctx = gsap.matchMedia();
      ctx.add("(min-width: 1024px)", () => {
        const last = STEPS.length - 1;

        // Image 0 is fully visible; every later image starts fully clipped away
        // at the bottom edge, ready to wipe upward over the one beneath it.
        imagesRef.current.forEach((el, i) => {
          if (!el) return;
          gsap.set(el, { clipPath: i === 0 ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)" });
        });

        // The fill's leading edge must land ON a label, not above the first or
        // below the last. Step centres sit at 1/(2n) … 1-1/(2n) of the rail, so
        // the fill travels between those two fractions rather than 0 → 1.
        // Measured, not assumed, so it survives font loading and reflow.
        const railEl = fillRef.current?.parentElement;
        const stepEls = railEl ? [...railEl.querySelectorAll<HTMLElement>(".v2-how-step")] : [];
        const railH = railEl?.getBoundingClientRect().height ?? 1;
        const centreFraction = (el: HTMLElement) => {
          const r = el.getBoundingClientRect();
          const top = railEl!.getBoundingClientRect().top;
          return (r.top + r.height / 2 - top) / railH;
        };
        const fromScale = stepEls.length ? centreFraction(stepEls[0]) : 0;
        const toScale = stepEls.length ? centreFraction(stepEls[stepEls.length - 1]) : 1;

        gsap.set(fillRef.current, { scaleY: fromScale, transformOrigin: "top center" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            // One viewport of scroll per transition between steps.
            end: () => `+=${window.innerHeight * last}`,
            pin: true,
            scrub: 0.8,
            onUpdate: (self) => {
              // The fill's leading edge sits at `edge` in step-index space.
              const edge = self.progress * last;

              // Each step tints toward teal as the line approaches and reaches
              // full teal exactly when the edge lands on it: a linear tent,
              // 1 at distance 0, fading to 0 one step away. Written straight to
              // a CSS variable rather than React state — this runs on every
              // scroll frame, and CSS interpolates the colour for free.
              stepEls.forEach((el, i) => {
                const nearness = Math.max(0, 1 - Math.abs(edge - i));
                el.style.setProperty("--near", nearness.toFixed(3));
              });

              // React state still drives the copy panel + image alt text, which
              // are discrete. Only updates when the nearest step changes.
              const i = Math.round(edge);
              setActive((prev) => (prev === i ? prev : i));
            },
            invalidateOnRefresh: true,
          },
        });

        // Each image wipes up over its predecessor, one timeline unit each — so
        // the timeline is `last` units long.
        for (let i = 1; i <= last; i++) {
          tl.to(
            imagesRef.current[i],
            { clipPath: "inset(0% 0 0 0)", ease: "none", duration: 1 },
            i - 1,
          );
        }

        // The rail fill grows top-down across the WHOLE timeline. It needs an
        // explicit duration: gsap.to() defaults to 0.5, which would finish the
        // fill inside the first sixth of the scroll and then sit at 1.
        tl.to(fillRef.current, { scaleY: toScale, ease: "none", duration: last }, 0);
      });

      ScrollTrigger.refresh();
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="how"
      ref={sectionRef}
      className="v2-how relative overflow-hidden px-4 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: "var(--v2-ink-soft)" }}
          >
            <span
              className="size-1.5 rounded-full"
              style={{ background: "var(--v2-accent)" }}
              aria-hidden="true"
            />
            Four steps, one afternoon
          </span>
          <h2 className="v2-display mt-4 text-balance text-3xl leading-[1.08] sm:text-4xl md:text-5xl">
            How it works
          </h2>
          <p
            className="mx-auto mt-4 max-w-lg text-pretty text-sm leading-relaxed sm:text-base"
            style={{ color: "var(--v2-ink-soft)" }}
          >
            The reason people don&apos;t give isn&apos;t that they don&apos;t care. It&apos;s that
            caring usually takes a Saturday. This takes twenty minutes.
          </p>
        </div>

        {/* Symmetric side columns. With `15rem | 24rem | 1fr` the outer columns
            resolved to 240px and 432px — a 192px difference that pushed the
            image window exactly 96px left of centre. `1fr … 1fr` centres it. */}
        <div className="v2-how-grid mt-16 grid gap-10 lg:grid-cols-[1fr_24rem_1fr] lg:items-stretch lg:gap-12">
          {/* ---- 1. Rail + labels -------------------------------------------
              `justify-between` spreads the four labels across the full column
              height, so the rail reads as tall as the image window beside it. */}
          <ol className="v2-how-rail relative flex flex-col justify-between pl-6">
            {/* Track, and the fill that grows down it. */}
            <span
              className="absolute left-0 top-0 w-px"
              style={{
                bottom: 0,
                background: "color-mix(in srgb, var(--v2-hairline) 18%, transparent)",
              }}
              aria-hidden="true"
            />
            {/* The travelling line. --v2-teal is the same hue as accent-ink but
                at a mid lightness, so it actually looks teal instead of
                near-black. 4.8:1 light, 10.8:1 dark. */}
            <span
              ref={fillRef}
              className="absolute left-0 top-0 w-0.5"
              style={{ bottom: 0, background: "var(--v2-teal)" }}
              aria-hidden="true"
            />

            {/* Colour comes from `--near` (0…1), written by the scroll handler.
                Each step tints from ink-soft toward teal as the line nears it.
                Both endpoints pass AA (5.5:1 and 9.3:1), so every blend between
                them does too — unlike fading toward the background, which tops
                out at 4.39:1. Weight stays on the discrete active step: font
                weight cannot interpolate from a custom property. */}
            {STEPS.map((s, i) => {
              const on = i === active;
              return (
                <li
                  key={s.n}
                  className="v2-how-step relative py-6"
                  // Seed value; the scroll handler overwrites it every frame.
                  // Step 0 starts fully teal because the fill begins on it.
                  // Unscrubbed (mobile/reduced-motion) every step reads current.
                  style={{ "--near": !scrubbed || i === 0 ? 1 : 0 } as React.CSSProperties}
                >
                  <p className="v2-how-num font-display text-[11px] tabular-nums">{s.n}</p>
                  <p
                    className="v2-how-label mt-1 text-pretty text-sm"
                    style={{ fontWeight: on ? 600 : 400 }}
                  >
                    {s.label}
                  </p>
                </li>
              );
            })}
          </ol>

          {/* ---- 2. Stacked image window ------------------------------------ */}
          {/* Fixed 4:5 window. Mixed source ratios (0.67 and 1.33) both crop
              acceptably at 0.8; a 3:4 window cut the landscape subjects. */}
          <div className="v2-how-window relative aspect-4/5 w-full overflow-hidden rounded-2xl">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                ref={(el) => {
                  imagesRef.current[i] = el;
                }}
                className="absolute inset-0"
                // Later images sit above earlier ones so the upward wipe reads
                // as the new photo covering the old.
                style={{ zIndex: i }}
              >
                <Image
                  src={s.image}
                  alt={i === active ? s.alt : ""}
                  aria-hidden={i !== active}
                  fill
                  sizes="(min-width: 1024px) 24rem, 100vw"
                  className="object-cover"
                  style={{ objectPosition: "focus" in s ? s.focus : undefined }}
                />
              </div>
            ))}
          </div>

          {/* ---- 3. Copy ----------------------------------------------------- */}
          {/* All four render; only the active one is visible. Keeps the column
              height stable so the pinned layout never jumps. */}
          <div className="v2-how-copy relative">
            {STEPS.map((s, i) => {
              // When the section is not scrubbed, every panel is a normal,
              // visible list item — not one slide of a stack.
              const on = !scrubbed || i === active;
              return (
                <div
                  key={s.n}
                  className="v2-how-panel"
                  data-on={on ? "" : undefined}
                  aria-hidden={scrubbed && i !== active}
                  style={{ opacity: on ? 1 : 0 }}
                >
                  {scrubbed ? (
                    // Desktop: the rail carries the step number, and the shared
                    // clipped window carries the photo. Just the quote here.
                    <>
                      <p className="text-balance text-2xl leading-[1.32] sm:text-3xl md:text-[2.1rem]">
                        {s.quote}
                      </p>
                      <p
                        className="mt-8 text-[11px] font-semibold uppercase tracking-[0.14em]"
                        style={{ color: "var(--v2-ink-soft)" }}
                      >
                        {s.who}
                      </p>
                      <p className="mt-1 text-sm font-semibold">{s.label}</p>
                    </>
                  ) : (
                    // Mobile: a self-contained step card. Numbered header leads,
                    // so the four read as a sequence rather than four unrelated
                    // photo slabs. The banner is 16:10, not a 4:5 slab that eats
                    // a whole viewport.
                    <article
                      className="overflow-hidden rounded-3xl"
                      style={{
                        background: "var(--v2-raised)",
                        border: "1px solid color-mix(in srgb, var(--v2-hairline) 12%, transparent)",
                      }}
                    >
                      <div className="flex items-center gap-3 px-5 pb-4 pt-5">
                        <span
                          className="font-display grid size-9 shrink-0 place-items-center rounded-full text-sm tabular-nums"
                          style={{
                            background: "var(--v2-accent)",
                            color: "var(--v2-accent-on)",
                          }}
                        >
                          {s.n}
                        </span>
                        <h3 className="text-pretty text-base font-semibold leading-snug">
                          {s.label}
                        </h3>
                      </div>

                      <div className="relative aspect-16/10">
                        <Image
                          src={s.image}
                          alt={s.alt}
                          fill
                          sizes="(min-width: 640px) 640px, 100vw"
                          className="object-cover"
                          style={{ objectPosition: "focus" in s ? s.focus : undefined }}
                        />
                      </div>

                      <div className="px-5 pb-6 pt-5">
                        <p
                          className="text-pretty text-[15px] leading-relaxed"
                          style={{ color: "var(--v2-ink-soft)" }}
                        >
                          {s.quote}
                        </p>
                        <p
                          className="mt-4 text-[10px] font-semibold uppercase tracking-[0.14em]"
                          style={{ color: "var(--v2-teal)" }}
                        >
                          {s.who}
                        </p>
                      </div>
                    </article>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
