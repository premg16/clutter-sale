"use client";

import { ArrowUpRight, Gavel, HandHeart, Tag } from "lucide-react";
import Image from "next/image";
import { useId, useLayoutEffect, useRef, useState } from "react";

/**
 * The three audiences, as a proper tablist. Each role gets its own headline,
 * three steps, a proof point and its own CTA — because a donator, a buyer and
 * a nonprofit arrive with different questions and only one of them is "how do
 * I give money away".
 */

const ROLES = [
  {
    id: "give",
    tab: "Donator",
    tabHint: "Donator — I have things to give",
    who: "Donators",
    icon: Tag,
    headline: "Your shelf is the donation.",
    lead: "You don't need to reach for your wallet. The thing you already stopped using is worth more than the cash you'd feel guilty about not sending.",
    steps: [
      { n: "01", t: "Photograph it where it sits", d: "No staging. One honest photo of the thing on the shelf." },
      { n: "02", t: "Tag the cause before it sells", d: "The cause is attached to the item, not to your mood that day." },
      { n: "03", t: "A courier collects it", d: "You never meet a stranger, never haggle, never queue at a post office." },
    ],
    proof: { value: 100, suffix: "%", label: "of net proceeds reach your chosen nonprofit" },
    cta: "List something today",
    image: "/images/thrifted-items.jpg",
    alt: "A flat lay of folded clothes, a bag and accessories laid out for resale",
  },
  {
    id: "buy",
    tab: "Buyer",
    tabHint: "Buyer — I want to buy something",
    who: "Buyers",
    icon: Gavel,
    headline: "Buy the lamp. Fund the clinic.",
    lead: "You were going to buy something anyway. Here the money doesn't stop at a warehouse — it lands, in full, on a cause the seller already chose.",
    steps: [
      { n: "01", t: "Browse or bid", d: "Fixed-price shelves and open auctions on the rare, donated things." },
      { n: "02", t: "Pay what it's worth", d: "A flat platform fee is added at checkout, shown before you pay." },
      { n: "03", t: "See where it went", d: "The transfer receipt publishes on the item page. Yours to check." },
    ],
    proof: { value: 3, suffix: " in 4", label: "items sell inside their first week on a shelf" },
    cta: "Browse open shelves",
    image: "/images/community-giving.jpg",
    alt: "Volunteers handing over boxes of donated goods",
  },
  {
    id: "raise",
    tab: "Non Profit",
    tabHint: "Non Profit — I run a nonprofit",
    who: "Nonprofits",
    icon: HandHeart,
    headline: "A shelf that funds you monthly.",
    lead: "Grant cycles are slow and donor fatigue is real. A shelf is neither: supporters give goods, the goods sell, and the money is yours without a fundraising campaign.",
    steps: [
      { n: "01", t: "Register and verify once", d: "Registration documents and a recent audited statement. Re-checked annually." },
      { n: "02", t: "Open your shelf", d: "Supporters donate goods directly to your cause, from anywhere." },
      { n: "03", t: "Get paid, publicly", d: "Every payout is timestamped against your registered account." },
    ],
    proof: { value: 9, suffix: " days", label: "average time from a listing going live to your payout" },
    cta: "Register a nonprofit",
    image: "/images/library-reading.jpg",
    alt: "Two students sitting together reading books at a library table",
  },
] as const;

type Pill = { left: number; top: number; width: number; height: number; ready: boolean };

export function Audiences() {
  const [active, setActive] = useState(0);
  const uid = useId();
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<Pill>({ left: 0, top: 0, width: 0, height: 0, ready: false });

  // Measure the active tab and park the pill on it. A ResizeObserver on the
  // list covers window resizes, the sm: flex-col → flex-row switch, and late
  // web-font layout shifts — all of which move the buttons.
  useLayoutEffect(() => {
    const list = listRef.current;
    const measure = () => {
      const btn = tabsRef.current[active];
      if (!btn || !list) return;
      setPill({
        left: btn.offsetLeft,
        top: btn.offsetTop,
        width: btn.offsetWidth,
        height: btn.offsetHeight,
        ready: true,
      });
    };
    measure();
    if (!list) return;
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    tabsRef.current.forEach((b) => b && ro.observe(b));
    return () => ro.disconnect();
  }, [active]);

  // Roving-tabindex arrow-key navigation, per the WAI-ARIA tabs pattern.
  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = ROLES.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabsRef.current[next]?.focus();
  };

  const role = ROLES[active];
  const Icon = role.icon;

  return (
    <section id="audiences" className="px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Three doors, one room</Eyebrow>
          <h2
            data-split-heading
            className="mt-4 text-balance text-3xl leading-[1.08] opacity-0 sm:text-4xl md:text-5xl"
          >
            However you arrived, there&apos;s a way in
          </h2>
        </div>

        {/* Tablist. One pill slides between tabs rather than each tab painting
            its own background — the movement itself carries the state change.
            Its geometry is measured from the live buttons, so it survives font
            loading, i18n and the flex-col → flex-row responsive switch. */}
        <div
          role="tablist"
          aria-label="Choose how you want to take part"
          onKeyDown={onKeyDown}
          data-reveal
          ref={listRef}
          // Always a row. Stacked, the three tabs became a 160px slab with the
          // teal pill floating above two dead grey blocks — it read as a broken
          // accordion. The labels total 280px, so they fit a 358px phone.
          className="relative mx-auto mt-8 flex max-w-2xl gap-1 rounded-full p-1.5 opacity-0 sm:mt-10 sm:gap-2"
          style={{ background: "color-mix(in srgb, var(--v2-hairline) 6%, transparent)" }}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute rounded-full"
            style={{
              background: "var(--v2-accent)",
              left: pill.left,
              top: pill.top,
              width: pill.width,
              height: pill.height,
              // No transition until measured once, or it slides in from 0,0.
              transition: pill.ready
                ? "left 0.45s var(--v2-ease), top 0.45s var(--v2-ease), width 0.45s var(--v2-ease), height 0.45s var(--v2-ease)"
                : "none",
            }}
          />
          {ROLES.map((r, i) => {
            const selected = i === active;
            return (
              <button
                key={r.id}
                ref={(el) => {
                  tabsRef.current[i] = el;
                }}
                role="tab"
                id={`${uid}-tab-${r.id}`}
                aria-selected={selected}
                aria-controls={`${uid}-panel-${r.id}`}
                // Short visual label; the hint keeps the meaning for AT.
                aria-label={r.tabHint}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className="relative z-10 min-h-11 flex-1 whitespace-nowrap rounded-full px-2 text-[13px] font-semibold transition-colors duration-300 sm:px-5 sm:text-sm"
                style={{ color: selected ? "var(--v2-accent-on)" : "var(--v2-ink-soft)" }}
              >
                {r.tab}
              </button>
            );
          })}
        </div>

        {/* Panel — keyed so the crossfade replays on every role change. */}
        <div
          key={role.id}
          role="tabpanel"
          id={`${uid}-panel-${role.id}`}
          aria-labelledby={`${uid}-tab-${role.id}`}
          tabIndex={0}
          // Mobile: one merged card — a wide banner image sitting directly on
          // its content, no gap. Stacked as two separate rounded blocks with a
          // 384px-tall image, it read as two unrelated slabs.
          className="v2-role-panel mt-8 grid animate-[v2-panel_0.5s_var(--v2-ease)] overflow-hidden rounded-4xl lg:mt-10 lg:grid-cols-2 lg:gap-4 lg:overflow-visible"
        >
          <div className="relative aspect-16/10 overflow-hidden sm:aspect-21/9 lg:aspect-auto lg:min-h-128 lg:rounded-4xl">
            <Image
              src={role.image}
              alt={role.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div
              className="absolute bottom-4 left-4 rounded-full px-4 py-2 text-xs font-semibold backdrop-blur-sm"
              style={{ background: "var(--v2-accent)", color: "var(--v2-accent-on)" }}
            >
              {role.who}
            </div>
          </div>

          <div className="v2-role-body flex flex-col justify-center p-6 sm:p-8 lg:rounded-4xl lg:p-10">
            <div
              className="flex size-12 items-center justify-center rounded-full"
              style={{ background: "var(--v2-accent)", color: "var(--v2-accent-on)" }}
            >
              <Icon className="size-5" aria-hidden="true" />
            </div>

            <h3 className="v2-display mt-6 text-balance text-2xl leading-tight sm:text-3xl">
              {role.headline}
            </h3>
            <p
              className="mt-3 text-pretty text-sm leading-relaxed sm:text-base"
              style={{ color: "var(--v2-ink-soft)" }}
            >
              {role.lead}
            </p>

            <ol className="mt-7 grid gap-4">
              {role.steps.map((s) => (
                <li key={s.n} className="flex gap-3.5">
                  <span
                    className="font-display text-sm tabular-nums"
                    style={{ color: "var(--v2-accent-ink)" }}
                  >
                    {s.n}
                  </span>
                  <div className="min-w-0">
                    <p className="text-pretty text-sm font-semibold">{s.t}</p>
                    <p
                      className="mt-0.5 text-pretty text-sm leading-relaxed"
                      style={{ color: "var(--v2-ink-soft)" }}
                    >
                      {s.d}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div
              className="mt-7 rounded-2xl p-4"
              style={{ background: "var(--v2-accent-quiet)" }}
            >
              <p className="font-display text-3xl tabular-nums" style={{ color: "var(--v2-ink)" }}>
                {role.proof.value}
                {role.proof.suffix}
              </p>
              <p className="mt-1 text-xs leading-snug" style={{ color: "var(--v2-ink-soft)" }}>
                {role.proof.label}
              </p>
            </div>

            <a
              href="#get-app"
              className="v2-press group mt-7 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
              style={{ background: "var(--v2-accent)", color: "var(--v2-accent-on)" }}
            >
              {role.cta}
              <ArrowUpRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
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
