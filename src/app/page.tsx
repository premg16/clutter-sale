"use client";

import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import {
  Heart,
  ArrowRight,
  Star,
  BookOpen,
  PawPrint,
  Sprout,
  Quote,
  Package,
  Home as HomeIcon,
  GraduationCap,
  Plus,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { LogoMark } from "@/components/Logo";
import {
  SproutSticker,
  GiftSticker,
  TagBlobSticker,
  HeartBlobSticker,
  StarBlobSticker,
  CoinBlobSticker,
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
    accent: "text-brand-navy",
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
    rotate: "-rotate-2",
  },
  {
    number: "02",
    title: "Auction & Sell",
    description:
      "List at a fixed price or let local buyers bid. Once it sells, the money flows directly to your chosen cause.",
    rotate: "rotate-0",
  },
  {
    number: "03",
    title: "Safe Pickup",
    description:
      "Meet up safely in your neighborhood or ship with secure escrow. Payment is protected end to end.",
    rotate: "rotate-2",
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
        <StarBlobSticker className="w-full h-full" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 12, 0], rotate: [-6, 6, -6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        className="absolute bottom-24 right-[10%] w-14 md:w-16 z-10 opacity-90 hidden md:block"
      >
        <HeartBlobSticker className="w-full h-full" />
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
        <WaveDivider fill="#F7F3EC" />
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
    <section id="causes" className="relative bg-brand-cream py-24 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-20">
          <span className="text-brand-terracotta font-extrabold tracking-wider uppercase text-sm mb-4 block">
            Your Community
          </span>
          <h2 className="text-4xl md:text-5xl mb-4">
            Loved by neighbors &amp; nonprofits
          </h2>
          <p className="text-brand-navy/70 text-lg font-medium">
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
                <div className="relative aspect-4/3 rounded-3xl overflow-hidden border-2 border-brand-navy shadow-[6px_6px_0_0_#12333A]">
                  <Image
                    src="/images/thrifted-items.jpg"
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-brand-navy/35" />
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-brand-cream border-2 border-brand-navy flex items-center justify-center">
                    <Icon className={`w-6 h-6 ${cause.accent}`} strokeWidth={2} />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl md:text-3xl text-brand-navy mb-3">{cause.name}</h3>
                  <p className="text-brand-navy/70 font-medium mb-6 text-pretty">
                    {cause.description}
                  </p>
                  <div className="flex items-center gap-6 mb-6 pb-6 border-b-2 border-brand-navy/10">
                    <span className="text-brand-slate text-sm font-bold">{cause.items}</span>
                    <span className="font-display text-xl text-brand-terracotta">
                      {cause.raised}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <Quote className={`w-6 h-6 shrink-0 ${cause.accent}`} strokeWidth={2} />
                    <div>
                      <p className="text-brand-navy font-bold italic leading-snug text-pretty">
                        &quot;{cause.quote}&quot;
                      </p>
                      <p className="text-brand-navy/60 text-sm font-medium mt-2">
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
    <section className="py-24 px-6 bg-brand-pink relative overflow-hidden">
      <motion.div
        animate={{ rotate: [0, 10, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-12 right-[8%] w-14 hidden lg:block"
      >
        <CoinBlobSticker className="w-full h-full" />
      </motion.div>
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [-6, 6, -6] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-16 left-[6%] w-12 hidden lg:block"
      >
        <GiftSticker className="w-full h-full" />
      </motion.div>
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-16">
          <span className="text-brand-terracotta font-extrabold tracking-wider uppercase text-sm mb-4 block">
            Sound Familiar?
          </span>
          <h2 className="text-4xl md:text-5xl mb-4 text-balance">
            A few moments people usually start.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {useCases.map((useCase, i) => {
            const Icon = useCase.icon;
            return (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ type: "spring", stiffness: 240, damping: 22, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="flex gap-5 bg-brand-cream border-2 border-brand-navy rounded-2xl p-6 shadow-[4px_4px_0_0_#12333A]"
              >
                <div className="w-14 h-14 shrink-0 bg-brand-slate/20 rounded-xl flex items-center justify-center border-2 border-brand-navy">
                  <Icon className="w-7 h-7 text-brand-navy" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-xl text-brand-navy mb-2">{useCase.title}</h3>
                  <p className="text-brand-navy/70 font-medium text-pretty">
                    {useCase.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
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
    <section className="py-24 px-6 bg-brand-cream relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-balance">
            Real people, real closets, real impact
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => {
            const rotates = ["-rotate-2", "rotate-1", "-rotate-1"];
            return (
              <motion.div
                key={t.person}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ type: "spring", stiffness: 230, damping: 22, delay: i * 0.1 }}
                whileHover={{ rotate: 0, y: -6 }}
                className={`bg-white border-2 border-brand-navy rounded-2xl p-7 shadow-[5px_5px_0_0_#12333A] ${rotates[i]}`}
              >
                <Quote className="w-8 h-8 text-brand-terracotta mb-4" strokeWidth={2} />
                <p className="text-brand-navy font-bold leading-snug mb-6 text-pretty">
                  &quot;{t.quote}&quot;
                </p>
                <div className="flex items-center justify-between pt-4 border-t-2 border-brand-navy/10">
                  <span className="text-brand-navy font-bold">{t.person}</span>
                  <span className="text-brand-slate text-sm font-bold">{t.detail}</span>
                </div>
              </motion.div>
            );
          })}
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

export default function Home() {
  return (
    <main className="flex-1 overflow-hidden">
      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 w-full z-50 bg-brand-cream/95 backdrop-blur-md border-b-2 border-brand-navy"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogoMark className="h-11 w-11" />
            <span className="font-display text-2xl text-brand-navy tracking-tight">
              clutter<span className="text-brand-terracotta">.sale</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-bold text-brand-navy">
            <NavLink href="#how-it-works">The Journey</NavLink>
            <NavLink href="#causes">Your Community</NavLink>
            <motion.button
              whileHover={{ rotate: -2, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="bg-brand-navy text-brand-cream px-6 py-2.5 rounded-2xl border-2 border-brand-navy hover:bg-brand-terracotta hover:border-brand-terracotta transition-colors font-bold shadow-[3px_3px_0_0_#12333A]"
            >
              Sell for Good
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-28 md:pt-48 md:pb-36 px-6 bg-brand-pink overflow-hidden">
        {/* Scattered organic artifacts */}
        <motion.div
          animate={{ rotate: [0, 8, 0], y: [0, -10, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-28 left-[6%] w-16 md:w-20"
        >
          <SproutSticker className="w-full h-full drop-shadow-md" />
        </motion.div>
        <motion.div
          animate={{ rotate: [-6, 6, -6], scale: [1, 1.08, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-52 right-[8%] w-14 md:w-16"
        >
          <StarBlobSticker className="w-full h-full drop-shadow-md" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -14, 0], rotate: [-6, 0, -6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-16 left-[12%] w-16 md:w-20"
        >
          <TagBlobSticker className="w-full h-full drop-shadow-md" />
        </motion.div>
        <motion.div
          animate={{ rotate: [4, -4, 4], y: [0, 8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-28 right-[14%] w-16 md:w-20"
        >
          <GiftSticker className="w-full h-full drop-shadow-md" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-[30%] w-10 hidden md:block"
        >
          <CoinBlobSticker className="w-full h-full" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0], rotate: [-8, 0, -8] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-40 left-[6%] w-10 hidden md:block"
        >
          <HeartBlobSticker className="w-full h-full" />
        </motion.div>

        <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div
              variants={springIn}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cream border-2 border-brand-navy shadow-[3px_3px_0_0_#12333A] mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-terracotta opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-terracotta"></span>
              </span>
              <span className="text-sm font-bold text-brand-navy">
                1,240 items supporting local causes right now
              </span>
            </motion.div>

            <motion.h1
              variants={springIn}
              className="font-display text-brand-navy mb-6 leading-[0.95] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-balance"
            >
              TURN YOUR CLUTTER INTO SOMEONE&apos;S COMEBACK
            </motion.h1>

            <motion.p
              variants={springIn}
              className="text-lg md:text-xl text-brand-navy/80 mb-10 leading-relaxed max-w-2xl mx-auto font-medium text-pretty"
            >
              That thing collecting dust in your closet? It could pay for a rescue
              pet&apos;s surgery, a kid&apos;s library card, or a family&apos;s next
              meal. Sell it. Send it forward.
            </motion.p>

            <motion.div
              variants={springIn}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.button
                whileHover={{ rotate: -2, scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className="w-full sm:w-auto bg-brand-terracotta text-brand-cream px-8 py-4 rounded-2xl text-lg font-bold border-2 border-brand-navy shadow-[4px_4px_0_0_#12333A] flex items-center justify-center gap-2 transition-colors"
              >
                Download the App <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ rotate: 2, scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className="w-full sm:w-auto bg-brand-cream text-brand-navy border-2 border-brand-navy px-8 py-4 rounded-2xl text-lg font-bold shadow-[4px_4px_0_0_#12333A] transition-colors"
              >
                Explore Causes
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

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

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 bg-brand-cream relative overflow-hidden">
        <motion.div
          animate={{ rotate: [0, -8, 0], y: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-[6%] w-14 hidden lg:block"
        >
          <TagBlobSticker className="w-full h-full" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [6, -6, 6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          className="absolute bottom-10 left-[5%] w-12 hidden lg:block"
        >
          <SproutSticker className="w-full h-full" />
        </motion.div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-terracotta font-extrabold tracking-wider uppercase text-sm mb-4 block">
              The Journey
            </span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 250, damping: 22 }}
              className="text-4xl md:text-5xl mb-6"
            >
              How it Works
            </motion.h2>
            <p className="text-lg text-brand-navy/70 max-w-2xl mx-auto font-medium">
              A few minutes from your couch to a real donation for a real
              nonprofit.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 250, damping: 22, delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                className={`relative flex flex-col items-center text-center bg-white border-2 border-brand-navy rounded-2xl p-8 shadow-[5px_5px_0_0_#12333A] ${step.rotate}`}
              >
                <span className="absolute -top-4 -right-4 text-brand-terracotta w-8 h-8">
                  <Star className="w-full h-full fill-brand-terracotta" strokeWidth={2} />
                </span>
                <span className="absolute -bottom-3 -left-3 text-brand-slate w-7 h-7">
                  <Heart className="w-full h-full fill-brand-slate" strokeWidth={2} />
                </span>
                <div className="w-20 h-20 bg-brand-pink rounded-2xl flex items-center justify-center mb-6 border-2 border-brand-navy">
                  <span className="font-display text-3xl text-brand-navy">{step.number}</span>
                </div>
                <h3 className="text-2xl mb-3">{step.title}</h3>
                <p className="text-brand-navy/80 leading-relaxed font-medium">
                  {step.description}
                </p>
              </motion.div>
            ))}
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
      <section className="py-32 bg-brand-terracotta text-center px-6 relative overflow-hidden">
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
          <CoinBlobSticker className="w-full h-full" />
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
            className="bg-brand-navy text-brand-cream px-10 py-5 rounded-2xl text-xl font-bold border-2 border-brand-navy shadow-[5px_5px_0_0_#12333A] inline-flex items-center gap-3 transition-colors"
          >
            Download the App <ArrowRight className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-cream py-12 border-t-2 border-brand-navy/10 text-center text-brand-navy/60">
        <div className="flex items-center justify-center gap-2 mb-6">
          <LogoMark className="h-8 w-8" />
          <span className="font-display text-xl text-brand-navy">
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
