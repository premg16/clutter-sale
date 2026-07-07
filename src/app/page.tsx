"use client";

import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  PawPrint,
  Sprout,
  Quote,
  Home as HomeIcon,
  Package,
  GraduationCap,
  Plus,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { LogoMark } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  LampSticker,
  TagSticker,
  SproutSticker,
  BoxFlapSticker,
  HeartSticker,
  CoinSticker,
  SquiggleConnector,
} from "@/components/Stickers";

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
      className="relative py-1 hover:text-brand-terracotta transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[3px] after:w-0 after:bg-brand-terracotta after:transition-all after:duration-200 hover:after:w-full"
    >
      {children}
    </a>
  );
}

// Animation Variants
const springIn: any = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Headline reveal: each word rises + unblurs in sequence. The container drives
// the stagger; words inherit `wordReveal`.
const headlineContainer: any = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const wordReveal: any = {
  hidden: { opacity: 0, y: "0.5em", filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 220, damping: 26 },
  },
};

// Splits a headline into animated words while keeping designer line breaks:
// pass an array of lines; each line wraps so it never breaks mid-phrase.
function AnimatedHeadline({ lines, className }: { lines: string[]; className?: string }) {
  return (
    <motion.h1
      variants={headlineContainer}
      className={className}
      aria-label={lines.join(" ")}
    >
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden="true">
          {line.split(" ").map((word, wi) => (
            <span key={wi} className="inline-block overflow-hidden align-bottom">
              <motion.span variants={wordReveal} className="inline-block will-change-transform">
                {word}
                {wi < line.split(" ").length - 1 ? " " : ""}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
}

// Wavy SVG divider, used as a scene transition between color/photo sections
function WaveDivider({ fill, flip = false }: { fill: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className={`w-full h-12 md:h-16 ${flip ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path
        d="M0 40 C 120 80 240 0 360 40 C 480 80 600 0 720 40 C 840 80 960 0 1080 40 C 1200 80 1320 0 1440 40 L1440 80 L0 80 Z"
        fill={fill}
      />
    </svg>
  );
}

const causes = [
  {
    name: "Valley Youth Library",
    description:
      "Providing after-school reading programs and resources for local children.",
    items: "12 Active Items",
    raised: "$4,200 Raised",
    icon: BookOpen,
    accent: "text-brand-terracotta",
    image: "/images/library-reading.jpg",
    imageAlt: "Children in school uniforms reading books together in a bright library",
    quote:
      "The kids don't just borrow books here anymore. Thanks to Clutter Sale sellers, we finally reopened on Saturdays.",
    person: "Dana, Library Director",
  },
  {
    name: "Maplewood Animal Rescue",
    description: "Shelter, medical care, and rehoming services for abandoned pets.",
    items: "8 Active Items",
    raised: "$1,850 Raised",
    icon: PawPrint,
    accent: "text-brand-slate",
    image: "/images/animal-rescue.jpg",
    imageAlt: "A veterinarian gently examining a small rescue dog with a stethoscope",
    quote:
      "One old bookshelf paid for a rescue pup's surgery. People have no idea how far a listing can go.",
    person: "Mo, Rescue Coordinator",
  },
  {
    name: "Grow Community Garden",
    description: "Urban farming initiative providing fresh produce to food banks.",
    items: "24 Active Items",
    raised: "$6,100 Raised",
    icon: Sprout,
    accent: "text-brand-slate",
    image: "/images/community-garden.jpg",
    imageAlt: "Volunteers tending rows of leafy vegetables at an urban community garden",
    quote:
      "We went from a scrappy lot to feeding forty families a week, funded by other people's closets.",
    person: "Renata, Garden Lead",
  },
];

const steps = [
  {
    number: "01",
    title: "Snap & List",
    description:
      "Take a few quick photos from your phone and let AI title, price, and describe each item for you.",
    Sticker: BoxFlapSticker,
  },
  {
    number: "02",
    title: "Auction & Sell",
    description:
      "List at a fixed price or let local buyers bid. Once it sells, the money flows directly to your chosen cause.",
    Sticker: TagSticker,
  },
  {
    number: "03",
    title: "Safe Pickup",
    description:
      "Meet up safely in your neighborhood or ship with secure escrow. Payment is protected end to end.",
    Sticker: CoinSticker,
  },
];

function WhyItMattersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["-15%", "15%"]);

  return (
    <section ref={ref} className="relative h-[90vh] min-h-[560px] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <Image
          src="/images/donation-box.jpg"
          alt="A volunteer holding a cardboard box labeled donations"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      {/* scrim for text contrast */}
      <div className="absolute inset-0 bg-linear-to-t from-brand-navy/90 via-brand-navy/50 to-brand-navy/70" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 42%, rgba(1,40,48,0.75), transparent 70%)",
        }}
      />

      <motion.div
        animate={{ rotate: [0, 10, 0], y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-16 left-[8%] w-14 md:w-16 z-10 opacity-90 hidden md:block"
      >
        <LampSticker className="w-full h-full" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 12, 0], rotate: [-6, 6, -6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        className="absolute bottom-24 right-[10%] w-14 md:w-16 z-10 opacity-90 hidden md:block"
      >
        <HeartSticker className="w-full h-full" />
      </motion.div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="font-display text-brand-pink text-6xl md:text-8xl lg:text-9xl text-balance leading-[0.9] drop-shadow-[0_4px_24px_rgba(1,40,48,0.8)]"
        >
          WHY IT
          <br />
          MATTERS
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-20 max-w-4xl mt-10">
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 250, damping: 22 }}
            className="text-brand-cream/90 text-lg md:text-xl font-bold leading-snug text-pretty"
          >
            Every year, usable stuff ends up in landfills while nonprofits
            scrape by on scraps of funding.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 250, damping: 22, delay: 0.1 }}
            className="text-brand-pink text-lg md:text-xl font-bold leading-snug text-pretty"
          >
            When you sell instead of toss, every listing becomes a quiet act
            of generosity.
          </motion.p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10">
        <WaveDivider fill="var(--color-surface)" />
      </div>
    </section>
  );
}

function TheProblemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["-12%", "12%"]);

  return (
    <section ref={ref} className="relative isolate h-[80vh] min-h-[520px] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <Image
          src="/images/community-giving.jpg"
          alt="Volunteers handing out supplies to neighbors on a sunny street"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-brand-terracotta/40 mix-blend-multiply" />
      <div className="absolute inset-0 bg-linear-to-b from-brand-navy/70 via-transparent to-brand-navy/80" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 220, damping: 22, delay: 0.1 }}
          className="font-display text-brand-cream text-3xl md:text-5xl leading-tight text-balance"
        >
          12 million tons of usable stuff gets thrown out every year, while
          shelters run out of blankets and food banks run out of food.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 220, damping: 22, delay: 0.2 }}
          className="text-brand-cream/80 text-lg font-medium mt-6"
        >
          Most people want to help. What stops them is that donating usually
          means sorting through boxes for a drop-off across town. Selling
          takes the same effort and pays a nonprofit directly.
        </motion.p>
      </div>
    </section>
  );
}

function CausesSection() {
  return (
    <section id="causes" className="relative bg-surface py-24 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-16 md:mb-20">
          <span className="text-brand-terracotta font-extrabold tracking-wider uppercase text-sm mb-4 block">
            Your Community
          </span>
          <h2 className="text-4xl md:text-5xl mb-4">
            Loved by neighbors &amp; nonprofits
          </h2>
          <p className="text-ink-soft text-lg font-medium">
            Every sale funds a nonprofit the seller chose. Here&apos;s what
            that actually looks like.
          </p>
        </div>

        <div className="flex flex-col gap-24 md:gap-32">
          {causes.map((cause, i) => {
            const Icon = cause.icon;
            const reversed = i % 2 === 1;
            return (
              <motion.div
                key={cause.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${
                  reversed ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-4/3 rounded-3xl overflow-hidden border-2 border-brand-navy shadow-[6px_6px_0_0_var(--color-hairline)]">
                  <Image
                    src={cause.image}
                    alt={cause.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-brand-navy/25 dark:bg-black/45" />
                  <div className="absolute top-4 left-4 size-12 rounded-full bg-brand-cream border-2 border-brand-navy flex items-center justify-center">
                    <Icon className={`size-6 ${cause.accent}`} strokeWidth={2} />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl md:text-3xl mb-3">{cause.name}</h3>
                  <p className="text-ink-soft font-medium mb-6 text-pretty">
                    {cause.description}
                  </p>
                  <div className="flex items-center gap-6 mb-6 pb-6 border-b-2 border-brand-navy/10 dark:border-brand-cream/15">
                    <span className="text-brand-slate text-sm font-bold">{cause.items}</span>
                    <span className="font-display text-xl text-brand-terracotta">
                      {cause.raised}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <Quote className={`size-6 shrink-0 ${cause.accent}`} strokeWidth={2} />
                    <div>
                      <p className="text-ink font-bold italic leading-snug text-pretty">
                        &quot;{cause.quote}&quot;
                      </p>
                      <p className="text-ink-soft text-sm font-medium mt-2">
                        {cause.person}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const stats = [
  { value: "$2.4M+", label: "Raised for Local Causes" },
  { value: "150k+", label: "Items Rehomed" },
  { value: "500+", label: "Nonprofits Supported" },
];

function StatsSection() {
  return (
    <section className="relative bg-brand-navy py-16 md:py-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-brand-cream/15">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 260, damping: 22, delay: i * 0.1 }}
            className="pt-8 md:pt-0 first:pt-0"
          >
            <div className="font-display text-4xl md:text-6xl text-brand-pink mb-2 tabular-nums">
              {stat.value}
            </div>
            <div className="text-brand-cream/80 font-bold">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const useCases = [
  {
    icon: HomeIcon,
    title: "Moving out",
    description: "Don't haul it, sell it. Turn what you're leaving behind into a fresh start for someone else.",
  },
  {
    icon: Sprout,
    title: "Spring cleaning",
    description: "That closet purge you've been putting off? It's worth more as a donation than a trash bag.",
  },
  {
    icon: Package,
    title: "Inherited items",
    description: "Honor what you can't keep by sending it somewhere it'll actually be used.",
  },
  {
    icon: GraduationCap,
    title: "Life transitions",
    description: "New job, new city, new chapter. Old furniture and gear don't have to follow you.",
  },
];

function WhoItsForSection() {
  return (
    <section className="py-20 md:py-24 px-5 sm:px-6 bg-band-pink relative overflow-hidden">
      <motion.div
        animate={{ rotate: [0, 10, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-12 right-[6%] w-14 hidden lg:block"
      >
        <CoinSticker className="w-full h-full" />
      </motion.div>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center">
        {/* Real photo grounds the section (mobile: on top). */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          className="relative aspect-4/5 sm:aspect-square lg:aspect-4/5 rounded-3xl overflow-hidden border-2 border-brand-navy dark:border-brand-cream/25 shadow-[6px_6px_0_0_var(--color-hairline)]"
        >
          <Image
            src="/images/doorstep-handoff.jpg"
            alt="Sold items packed and handed off on a neighbor's doorstep"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [-6, 6, -6] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-3 -right-3 w-16 md:w-20"
          >
            <BoxFlapSticker className="w-full h-full drop-shadow-lg" />
          </motion.div>
        </motion.div>

        <div>
          <div className="mb-8 md:mb-10">
            <h2 className="text-4xl md:text-5xl mb-4 text-balance text-band-pink-on">
              A few moments people usually start.
            </h2>
          </div>

          <div className="flex flex-col">
            {useCases.map((useCase, i) => {
              const Icon = useCase.icon;
              return (
                <motion.div
                  key={useCase.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ type: "spring", stiffness: 240, damping: 22, delay: i * 0.08 }}
                  className={`flex items-center gap-5 md:gap-8 py-6 md:py-7 ${
                    i !== 0 ? "border-t-2 border-band-pink-on/15" : ""
                  }`}
                >
                  <div className="shrink-0 size-12 md:size-14 text-band-pink-on">
                    <Icon className="w-full h-full" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl text-band-pink-on mb-1">{useCase.title}</h3>
                    <p className="text-band-pink-soft font-medium text-pretty">
                      {useCase.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    quote:
      "I made $340 clearing out my garage and every cent went to my kid's school. Never felt better about decluttering.",
    person: "Priya M.",
    detail: "Sold 14 items",
  },
  {
    quote:
      "I was skeptical it'd actually go to the shelter I picked. Got a receipt and a thank-you note. It's real.",
    person: "Marcus T.",
    detail: "Sold 6 items",
  },
  {
    quote:
      "Easiest way I've found to get rid of baby gear without the guilt of tossing stuff that still had life in it.",
    person: "Aisha R.",
    detail: "Sold 22 items",
  },
];

function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 px-5 sm:px-6 bg-surface relative overflow-hidden">
      <motion.div
        animate={{ rotate: [0, -8, 0], y: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-16 right-[8%] w-14 hidden lg:block"
      >
        <HeartSticker className="w-full h-full" />
      </motion.div>
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-balance">
            Real people, real closets, real impact
          </h2>
        </div>

        <div className="flex flex-col">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.person}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "spring", stiffness: 230, damping: 22, delay: i * 0.1 }}
              className={`py-8 md:py-10 ${i !== 0 ? "border-t-2 border-brand-navy/15 dark:border-brand-cream/15" : ""}`}
            >
              <Quote className="size-7 text-brand-terracotta mb-4" strokeWidth={2} />
              <p className="text-ink text-xl md:text-2xl font-bold leading-snug mb-5 text-pretty">
                &quot;{t.quote}&quot;
              </p>
              <div className="flex items-center gap-3">
                <span className="text-ink font-bold">{t.person}</span>
                <span className="text-ink-soft">·</span>
                <span className="text-brand-slate text-sm font-bold">{t.detail}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    question: "Is my stuff even worth anything?",
    answer:
      "Probably more than you think. Our pricing tool compares your item to thousands of recent local sales, so even well-used furniture, electronics, and clothing usually find a buyer.",
  },
  {
    question: "How do I know the money actually goes to my cause?",
    answer:
      "Every sale is tracked end-to-end. You pick the nonprofit at listing time, and once an item sells, funds go directly to them through our verified partner network. You'll get a receipt for your records.",
  },
  {
    question: "What can I sell?",
    answer:
      "Furniture, electronics, clothing, books, tools, kids' gear: almost anything in resellable condition. A few restricted categories (recalled items, hazardous materials) aren't allowed for safety reasons.",
  },
  {
    question: "What if it doesn't sell?",
    answer:
      "You can relist at a lower price, or choose to donate it directly to your selected nonprofit for a tax receipt instead. No item has to go to waste.",
  },
  {
    question: "Is meeting up with buyers safe?",
    answer:
      "Yes. We suggest verified public meetup spots in your area, and support secure shipping with escrow protection for higher-value items, so payment is only released once everything checks out.",
  },
];

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 px-6 bg-brand-navy relative overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-brand-cream mb-4 text-balance">
            Questions? We&apos;ve got you.
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ type: "spring", stiffness: 240, damping: 24, delay: i * 0.05 }}
                className="bg-brand-cream/5 border-2 border-brand-cream/20 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-brand-cream font-bold text-lg">{faq.question}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-brand-pink"
                  >
                    <Plus className="w-6 h-6" strokeWidth={2.5} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-brand-cream/80 font-medium leading-relaxed text-pretty">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 240, damping: 24, delay: 0.3 }}
          className="flex items-center justify-center gap-2 mt-10 text-brand-cream/60 font-medium text-sm"
        >
          <ShieldCheck className="w-5 h-5 text-brand-slate" strokeWidth={2} />
          Secure payments, verified nonprofits, protected every step of the way.
        </motion.div>
      </div>
    </section>
  );
}

// Type-forward hero. The headline is the star: it reveals word-by-word over an
// ambient scene — a slow gradient wash drifting behind the pink band, plus a
// handful of stickers that drift on scroll (parallax) rather than looping in
// place. All motion collapses under prefers-reduced-motion.
function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Parallax depths: nearer stickers travel more than far ones as you scroll.
  const yNear = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["0%", "60%"]);
  const yFar = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["0%", "28%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["0%", "22%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, prefersReducedMotion ? 1 : 0]);

  return (
    <section
      ref={ref}
      className="relative isolate pt-32 pb-24 md:pt-44 md:pb-36 px-5 sm:px-6 bg-band-pink overflow-hidden"
    >
      {/* Ambient wash: two slow-drifting radial blooms tinted with brand hues.
          Subtle in light, a soft glow in dark. Pure CSS animation, GPU-cheap. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="hero-bloom hero-bloom-a" />
        <div className="hero-bloom hero-bloom-b" />
        {/* faint dotted texture to add depth without clutter */}
        <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.1] [background-image:radial-gradient(var(--color-brand-navy)_1px,transparent_1px)] [background-size:26px_26px]" />
      </div>

      {/* Parallax stickers — drift up and fade as the hero scrolls away. */}
      <motion.div style={{ y: yFar }} className="absolute top-24 left-[4%] w-12 md:w-20 z-0">
        <motion.div
          animate={prefersReducedMotion ? undefined : { rotate: [0, 6, 0], y: [0, -8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <SproutSticker className="w-full h-full drop-shadow-md" />
        </motion.div>
      </motion.div>
      <motion.div style={{ y: yNear }} className="absolute top-28 right-[5%] w-12 md:w-16 z-0">
        <motion.div
          animate={prefersReducedMotion ? undefined : { rotate: [-5, 5, -5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <LampSticker className="w-full h-full drop-shadow-md" />
        </motion.div>
      </motion.div>
      <motion.div style={{ y: yNear }} className="absolute bottom-28 left-[9%] w-16 md:w-20 z-0 hidden md:block">
        <motion.div
          animate={prefersReducedMotion ? undefined : { rotate: [-4, 4, -4], y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <TagSticker className="w-full h-full drop-shadow-md" />
        </motion.div>
      </motion.div>
      <motion.div style={{ y: yFar }} className="absolute bottom-32 right-[11%] w-16 md:w-20 z-0 hidden md:block">
        <motion.div
          animate={prefersReducedMotion ? undefined : { rotate: [3, -3, 3], y: [0, 8, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <BoxFlapSticker className="w-full h-full drop-shadow-md" />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10"
      >
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="w-full">
          <motion.div
            variants={springIn}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cream border-2 border-brand-navy shadow-[3px_3px_0_0_var(--color-hairline)] mb-6 md:mb-8"
          >
            <span className="relative flex size-2">
              {!prefersReducedMotion && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-terracotta opacity-75"></span>
              )}
              <span className="relative inline-flex rounded-full size-2 bg-brand-terracotta"></span>
            </span>
            <span className="text-xs sm:text-sm font-bold text-brand-navy">
              1,240 items supporting local causes right now
            </span>
          </motion.div>

          <AnimatedHeadline
            lines={["TURN YOUR CLUTTER", "INTO SOMEONE'S", "COMEBACK"]}
            className="font-display text-band-pink-on mb-5 md:mb-6 leading-[0.92] text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[7.5rem] text-balance"
          />

          <motion.p
            variants={springIn}
            className="text-base sm:text-lg md:text-xl text-band-pink-soft mb-8 md:mb-10 leading-relaxed max-w-2xl mx-auto font-medium text-pretty"
          >
            That thing collecting dust in your closet? It could pay for a rescue
            pet&apos;s surgery, a kid&apos;s library card, or a family&apos;s next
            meal. Sell it. Send it forward.
          </motion.p>

          <motion.div
            variants={springIn}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4"
          >
            <motion.button
              whileHover={{ rotate: -2, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="w-full sm:w-auto bg-brand-terracotta text-brand-cream px-8 py-4 rounded-2xl text-lg font-bold border-2 border-brand-navy shadow-[4px_4px_0_0_var(--color-hairline)] flex items-center justify-center gap-2 transition-colors"
            >
              Download the App <ArrowRight className="size-5" />
            </motion.button>
            <motion.button
              whileHover={{ rotate: 2, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="w-full sm:w-auto bg-brand-cream text-brand-navy border-2 border-brand-navy px-8 py-4 rounded-2xl text-lg font-bold shadow-[4px_4px_0_0_var(--color-hairline)] transition-colors"
            >
              Explore Causes
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue — a quiet nudge, fades with the content. */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1 text-band-pink-soft"
        aria-hidden="true"
      >
        <span className="text-xs font-bold tracking-wide uppercase">Scroll</span>
        <motion.span
          animate={prefersReducedMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="size-5" strokeWidth={2.5} />
        </motion.span>
      </motion.div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="flex-1 overflow-hidden">
      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md border-b-2 border-brand-navy dark:border-brand-cream/15"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <LogoMark className="size-9 md:size-11" />
            <span className="font-display text-xl md:text-2xl text-ink tracking-tight">
              clutter<span className="text-brand-terracotta">.sale</span>
            </span>
          </div>
          <div className="flex items-center gap-3 md:gap-6 font-bold text-ink">
            <div className="hidden md:flex items-center gap-8">
              <NavLink href="#how-it-works">The Journey</NavLink>
              <NavLink href="#causes">Your Community</NavLink>
            </div>
            <ThemeToggle />
            <motion.button
              whileHover={{ rotate: -2, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="bg-brand-navy text-brand-cream px-4 sm:px-6 py-2.5 rounded-2xl border-2 border-brand-navy hover:bg-brand-terracotta hover:border-brand-terracotta transition-colors font-bold shadow-[3px_3px_0_0_var(--color-hairline)] text-sm sm:text-base"
            >
              Sell <span className="hidden sm:inline">for Good</span>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Diagonal marquee band */}
      <div className="relative z-20 -mt-10 -mb-10 -rotate-2">
        <div className="bg-brand-navy border-y-4 border-brand-navy py-4 overflow-hidden whitespace-nowrap">
          <div className="flex w-max animate-marquee">
            {[0, 1].map((i) => (
              <span
                key={i}
                className="font-display text-2xl md:text-4xl text-brand-cream px-4 tracking-wide"
                aria-hidden={i === 1}
              >
                DECLUTTER ✦ DONATE ✦ REHOME ✦ GIVE BACK ✦ DELIGHT ✦ SUPPORT ✦
                DECLUTTER ✦ DONATE ✦ REHOME ✦ GIVE BACK ✦ DELIGHT ✦ SUPPORT ✦
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Stats — early credibility bar */}
      <StatsSection />

      {/* Why It Matters — image-masked headline, parallax */}
      <WhyItMattersSection />

      {/* The Problem — second photo-grounded storytelling moment */}
      <TheProblemSection />

      {/* How It Works — a single spine, three waypoints, no cards */}
      <section id="how-it-works" className="py-24 md:py-32 px-5 sm:px-6 bg-surface relative overflow-hidden">
        <div className="max-w-2xl mx-auto">
          <div className="mb-16 md:mb-28">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 250, damping: 22 }}
              className="text-4xl md:text-5xl mb-6"
            >
              From closet to comeback
            </motion.h2>
            <p className="text-lg text-ink-soft max-w-lg font-medium">
              A few minutes from your couch to a real donation for a real
              nonprofit.
            </p>
          </div>

          <div className="relative">
            <SquiggleConnector className="absolute left-9 md:left-11 top-4 bottom-4 w-4 h-full text-brand-navy dark:text-brand-slate" />

            <div className="flex flex-col gap-16 md:gap-20">
              {steps.map((step, i) => {
                const Sticker = step.Sticker;
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 250, damping: 22, delay: i * 0.1 }}
                    className="relative flex items-start gap-6 md:gap-10 pl-2"
                  >
                    <motion.div
                      animate={{ rotate: [-4, 4, -4] }}
                      transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
                      className="relative z-10 shrink-0 size-[72px] md:size-[88px] bg-surface"
                    >
                      <Sticker className="w-full h-full drop-shadow-md" />
                    </motion.div>
                    <div className="pt-1 md:pt-3">
                      <span className="font-display text-brand-terracotta text-xl block mb-1">
                        {step.number}
                      </span>
                      <h3 className="text-2xl md:text-3xl mb-3">{step.title}</h3>
                      <p className="text-ink-soft leading-relaxed font-medium max-w-sm">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For — self-identification / use cases */}
      <WhoItsForSection />

      {/* Featured Causes — blended editorial layout */}
      <CausesSection />

      {/* Testimonials — seller-side social proof */}
      <TestimonialsSection />

      {/* FAQ — objection handling before the close */}
      <FaqSection />

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-brand-terracotta text-center px-5 sm:px-6 relative overflow-hidden">
        <motion.div
          animate={{ rotate: [0, 10, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-16 left-[10%] w-16 opacity-80 hidden md:block"
        >
          <SproutSticker className="w-full h-full" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          className="absolute bottom-16 right-[10%] w-14 opacity-80 hidden md:block"
        >
          <CoinSticker className="w-full h-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 250, damping: 22 }}
          className="max-w-3xl mx-auto relative z-10"
        >
          <h2 className="text-4xl md:text-6xl text-brand-navy mb-6 text-balance">
            Ready to declutter for good?
          </h2>
          <p className="text-xl text-brand-navy/80 mb-10 max-w-xl mx-auto font-bold text-pretty">
            Join thousands of neighbors turning their unused items into
            meaningful support for local causes.
          </p>
          <motion.button
            whileHover={{ rotate: -2, scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="bg-brand-navy text-brand-cream px-8 sm:px-10 py-5 rounded-2xl text-lg sm:text-xl font-bold border-2 border-brand-navy shadow-[5px_5px_0_0_var(--color-hairline)] inline-flex items-center gap-3 transition-colors"
          >
            Download the App <ArrowRight className="size-6" />
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-surface py-12 border-t-2 border-brand-navy/10 dark:border-brand-cream/15 text-center text-ink-soft">
        <div className="flex items-center justify-center gap-2 mb-6">
          <LogoMark className="size-8" />
          <span className="font-display text-xl text-ink">
            clutter<span className="text-brand-terracotta">.sale</span>
          </span>
        </div>
        <p className="font-medium">
          © {new Date().getFullYear()} Clutter Sale. Turn Your Clutter Into a Cause.
        </p>
      </footer>
    </main>
  );
}
