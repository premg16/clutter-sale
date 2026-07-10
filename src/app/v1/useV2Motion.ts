"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";

/**
 * All of /v2's GSAP work, in one place.
 *
 * Two things matter here and are easy to get wrong:
 *
 * 1. Lenis hijacks scroll, so ScrollTrigger's cached scroll position goes
 *    stale and triggers fire at the wrong offsets. We bridge them by calling
 *    ScrollTrigger.update() on every Lenis scroll event.
 *
 * 2. Everything is created inside a gsap.context() bound to the root element,
 *    so a single ctx.revert() on unmount kills every tween, ScrollTrigger and
 *    SplitText — including the inline styles SplitText writes into the DOM.
 *
 * Under prefers-reduced-motion we attach nothing: v2.css already reveals
 * `.v2-anim` content, so the page is fully readable with zero motion.
 */
export function useV2Motion(rootRef: React.RefObject<HTMLElement | null>) {
  const lenis = useLenis();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Every CSS failsafe is written `[data-v2]:not(.v2-ready) …`, so the flag
    // has to land on the [data-v2] element itself — not on this inner ref, or
    // the :not() stays true forever and the failsafes are permanently armed.
    const flag = root.closest<HTMLElement>("[data-v2]") ?? root;
    const markReady = () => flag.classList.add("v2-ready");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      markReady();
      return;
    }

    let ctx: { revert: () => void } | undefined;
    let cleanupMagnetic: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }, { SplitText }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/SplitText"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger, SplitText);

      // GSAP takes over: reveal the animated content and cancel the failsafes.
      markReady();

      ctx = gsap.context(() => {
        /* ---- Hero headline: char-by-char rise ---------------------------- */
        const headline = root.querySelector<HTMLElement>("[data-split-headline]");
        if (headline) {
          // Chars rise out of per-line masks. `chars` are real elements, so
          // yPercent is valid on them.
          const split = new SplitText(headline, { type: "lines,chars", mask: "lines" });
          gsap.set(headline, { opacity: 1 });
          gsap.from(split.chars, {
            yPercent: 115,
            duration: 0.9,
            ease: "power4.out",
            stagger: { each: 0.012 },
            delay: 0.15,
          });
        }

        /* ---- Hero sub + CTA: follow the headline ------------------------- */
        gsap.to(root.querySelectorAll("[data-hero-fade]"), {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.09,
          delay: 0.55,
          startAt: { y: 22 },
        });

        /* ---- Hero collage: cards assemble, then parallax on scroll -------
           The collage reads left→right as a story: clutter → pass-through →
           outcome. So each card enters from the side it belongs to (the outer
           two swing in horizontally, the middle rises between them) and the
           three converge into the grid. A little rotation + scale sells them as
           physical objects being laid down rather than three sliding planes.

           Entry animates x / rotation / scale ONLY. `y` is deliberately left
           untouched because the scrubbed parallax below owns it — animating the
           same property from two tweens makes them fight over the transform. */
        const cards = root.querySelectorAll<HTMLElement>("[data-collage-card]");
        if (cards.length) {
          const from = (el: HTMLElement) => el.dataset.collageFrom ?? "bottom";
          const entry: Record<string, gsap.TweenVars> = {
            left: { x: -120, rotate: -6, scale: 0.9, transformOrigin: "right bottom" },
            right: { x: 120, rotate: 6, scale: 0.9, transformOrigin: "left bottom" },
            bottom: { x: 0, yPercent: 14, scale: 0.92, transformOrigin: "center bottom" },
          };

          cards.forEach((card) => {
            gsap.to(card, {
              opacity: 1,
              x: 0,
              yPercent: 0,
              rotate: 0,
              scale: 1,
              duration: 1.25,
              ease: "power4.out",
              // Outer cards land first; the middle settles into the gap they
              // leave, so the group resolves inward.
              delay: from(card) === "bottom" ? 0.72 : 0.5,
              startAt: { opacity: 0, ...entry[from(card)] },
            });
          });

          // Scrubbed parallax: each card drifts at its own speed as you scroll
          // past the hero. The middle column moves least, so the group reads as
          // one object with depth rather than three sliding planes.
          //
          // This targets an INNER wrapper, not the card itself. Two tweens on
          // one element both write the same transform matrix, and the entry
          // tween's final render kept clobbering `y` — the cards simply never
          // parallaxed. One element, one animator.
          //
          // Desktop only. In the mobile 2-up mosaic the photos sit side by side,
          // so differing drift (-70 vs -110) reads as two misaligned images
          // rather than depth.
          const speeds =
            window.matchMedia("(min-width: 768px)").matches ? [-70, -20, -110] : [0, 0, 0];
          cards.forEach((card, i) => {
            const inner = card.querySelector<HTMLElement>("[data-collage-parallax]");
            if (!inner) return;
            if (speeds[i % speeds.length] === 0) return;
            gsap.to(inner, {
              y: speeds[i % speeds.length],
              ease: "none",
              scrollTrigger: {
                trigger: card.closest("section"),
                start: "top top",
                end: "bottom top",
                scrub: 0.6,
              },
            });
          });
        }

        /* ---- Ambient blooms drift with scroll ---------------------------- */
        root.querySelectorAll<HTMLElement>("[data-bloom]").forEach((b, i) => {
          gsap.to(b, {
            yPercent: i % 2 ? -18 : 22,
            xPercent: i % 2 ? 10 : -8,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 1.2 },
          });
        });

        /* ---- Generic section reveals ------------------------------------- */
        root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            startAt: { y: 34 },
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        });

        /* ---- Staggered groups (card rows) -------------------------------- */
        root.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
          gsap.to(group.children, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
            startAt: { y: 30 },
            scrollTrigger: { trigger: group, start: "top 85%", once: true },
          });
        });

        /* ---- Section headings: line-by-line mask reveal ------------------- */
        // `mask: "lines"` (GSAP 3.13+) wraps each line in an overflow-hidden
        // parent, so the line itself is an ELEMENT we can translate. Without it
        // split.lines[i].firstChild is a raw text node and GSAP rejects
        // yPercent with "Invalid property ... Missing plugin?".
        root.querySelectorAll<HTMLElement>("[data-split-heading]").forEach((h) => {
          const split = new SplitText(h, { type: "lines", mask: "lines" });
          gsap.set(h, { opacity: 1 });
          gsap.from(split.lines, {
            yPercent: 110,
            duration: 0.85,
            ease: "power4.out",
            stagger: 0.08,
            scrollTrigger: { trigger: h, start: "top 88%", once: true },
          });
        });

        /* ---- Stat counters roll up --------------------------------------- */
        // Only roll counters where the intermediate frames are still TRUE.
        // "100%" passing through 48% reads as a smaller number, not a false
        // claim. But "3 in 4" passing through "1 in 4", or "9 days" through
        // "4 days", each render a statistic that is simply wrong — so those are
        // opted out (no data-count) and render as static text.
        root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
          const target = Number(el.dataset.count);
          if (!Number.isFinite(target)) return;
          const suffix = el.dataset.countSuffix ?? "";
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onUpdate: () => {
              el.textContent = `${Math.round(obj.v)}${suffix}`;
            },
          });
        });

        /* ---- Magnetic buttons -------------------------------------------- */
        // gsap.context().revert() cleans tweens, NOT DOM listeners — so these
        // are registered on gsap.context's own cleanup queue via the returned
        // function, which GSAP does honour (unlike Array.forEach).
        if (window.matchMedia("(hover: hover)").matches) {
          const teardowns: Array<() => void> = [];
          root.querySelectorAll<HTMLElement>(".v2-magnetic").forEach((btn) => {
            const xTo = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3" });
            const yTo = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3" });
            const onMove = (e: MouseEvent) => {
              const r = btn.getBoundingClientRect();
              xTo((e.clientX - (r.left + r.width / 2)) * 0.35);
              yTo((e.clientY - (r.top + r.height / 2)) * 0.45);
            };
            const onLeave = () => {
              xTo(0);
              yTo(0);
            };
            btn.addEventListener("mousemove", onMove);
            btn.addEventListener("mouseleave", onLeave);
            teardowns.push(() => {
              btn.removeEventListener("mousemove", onMove);
              btn.removeEventListener("mouseleave", onLeave);
            });
          });
          // A function returned from the gsap.context callback runs on revert().
          cleanupMagnetic = () => teardowns.forEach((fn) => fn());
        }

        ScrollTrigger.refresh();
      }, root);
    })();

    return () => {
      cancelled = true;
      cleanupMagnetic?.();
      ctx?.revert();
    };
  }, [rootRef]);

  /* ---- Bridge Lenis → ScrollTrigger ------------------------------------- */
  // Without this, ScrollTrigger reads a scroll position Lenis has already moved
  // past, and every trigger fires at the wrong offset.
  useEffect(() => {
    if (!lenis) return;
    let stop: (() => void) | undefined;
    (async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const update = () => ScrollTrigger.update();
      lenis.on("scroll", update);
      ScrollTrigger.refresh();
      stop = () => lenis.off("scroll", update);
    })();
    return () => stop?.();
  }, [lenis]);
}
