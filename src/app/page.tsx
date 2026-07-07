"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Heart, ArrowRight, Sparkles, Star, BookOpen, PawPrint, Sprout, Quote } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { LogoMark } from "@/components/Logo";

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

// Simple hand-authored sticker: 5-petal flower
function FlowerSticker({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className} aria-hidden="true">
      <g stroke="#12333A" strokeWidth="2.5" strokeLinejoin="round">
        <ellipse cx="30" cy="14" rx="9" ry="12" fill="#F5D9DE" />
        <ellipse cx="30" cy="46" rx="9" ry="12" fill="#F5D9DE" />
        <ellipse cx="14" cy="30" rx="12" ry="9" fill="#F5D9DE" />
        <ellipse cx="46" cy="30" rx="12" ry="9" fill="#F5D9DE" />
        <circle cx="30" cy="30" r="8" fill="#D97757" />
      </g>
    </svg>
  );
}

// Simple hand-authored sticker: price tag
function TagSticker({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className} aria-hidden="true">
      <path
        d="M8 8h24l20 20-24 24-20-20V8z"
        fill="#5C8A94"
        stroke="#12333A"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <circle cx="18" cy="18" r="4" fill="#F7F3EC" stroke="#12333A" strokeWidth="2" />
      <text x="24" y="38" fontSize="14" fontWeight="700" fill="#12333A">
        $
      </text>
    </svg>
  );
}

// Simple hand-authored sticker: box
function BoxSticker({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className} aria-hidden="true">
      <g stroke="#12333A" strokeWidth="2.5" strokeLinejoin="round">
        <path d="M8 20 30 10 52 20 30 30Z" fill="#D97757" />
        <path d="M8 20v24l22 10V30Z" fill="#5C8A94" />
        <path d="M52 20v24L30 54V30Z" fill="#6B96A0" />
      </g>
    </svg>
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
    quote:
      "The kids don't just borrow books here anymore — thanks to Clutter Sale sellers, we finally reopened on Saturdays.",
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
      "We went from a scrappy lot to feeding forty families a week — funded by other people's closets.",
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
      "Meet up safely in your neighborhood or ship with secure escrow — payment is protected end to end.",
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
    <section ref={ref} className="relative h-[80vh] min-h-[520px] overflow-hidden">
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
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-brand-pink font-extrabold tracking-wider uppercase text-sm mb-4"
        >
          The Problem
        </motion.span>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 220, damping: 22, delay: 0.1 }}
          className="font-display text-brand-cream text-3xl md:text-5xl leading-tight text-balance"
        >
          12 million tons of usable stuff gets thrown out every year — while
          shelters run out of blankets and food banks run out of food.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 220, damping: 22, delay: 0.2 }}
          className="text-brand-cream/80 text-lg font-medium mt-6"
        >
          It&apos;s not that people don&apos;t want to help. It&apos;s that
          &quot;donate&quot; usually means a guilt trip to a drop box. We made
          it something you actually want to do.
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

export default function Home() {
  return (
    <main className="flex-1 overflow-hidden">
      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 w-full z-50 bg-brand-cream/85 backdrop-blur-md border-b-2 border-brand-navy/10"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogoMark className="h-10 w-10" />
            <span className="font-display text-2xl text-brand-navy">
              clutter<span className="text-brand-terracotta">.sale</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-bold text-brand-navy/90">
            <a href="#how-it-works" className="hover:text-brand-terracotta transition-colors">
              How it Works
            </a>
            <a href="#causes" className="hover:text-brand-terracotta transition-colors">
              Featured Causes
            </a>
            <motion.button
              whileHover={{ rotate: -2, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="bg-brand-navy text-brand-cream px-6 py-2.5 rounded-2xl border-2 border-brand-navy hover:bg-brand-terracotta hover:border-brand-terracotta transition-colors font-bold shadow-[3px_3px_0_0_#12333A]"
            >
              Start Your Impact
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-28 md:pt-48 md:pb-36 px-6 bg-brand-pink overflow-hidden">
        {/* Scattered stickers */}
        <motion.div
          animate={{ rotate: [0, 8, 0], y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-28 left-[6%] w-16 md:w-20"
        >
          <FlowerSticker className="w-full h-full drop-shadow-md" />
        </motion.div>
        <motion.div
          animate={{ rotate: [-6, 6, -6] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-52 right-[8%] w-14 md:w-16 text-brand-terracotta"
        >
          <Sparkles className="w-full h-full" strokeWidth={2.5} />
        </motion.div>
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-16 left-[12%] w-16 md:w-20 -rotate-6"
        >
          <TagSticker className="w-full h-full drop-shadow-md" />
        </motion.div>
        <motion.div
          animate={{ rotate: [4, -4, 4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-28 right-[14%] w-16 md:w-20 rotate-6"
        >
          <BoxSticker className="w-full h-full drop-shadow-md" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-[30%] w-10 text-brand-navy hidden md:block"
        >
          <Star className="w-full h-full" strokeWidth={2.5} />
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0], rotate: [-8, 0, -8] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-40 left-[6%] w-10 text-brand-terracotta hidden md:block"
        >
          <Heart className="w-full h-full fill-brand-terracotta" strokeWidth={2.5} />
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

      {/* Why It Matters — image-masked headline, parallax */}
      <WhyItMattersSection />

      {/* The Problem — second photo-grounded storytelling moment */}
      <TheProblemSection />

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 bg-brand-cream relative">
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

      {/* Featured Causes — blended editorial layout */}
      <CausesSection />

      {/* CTA Section */}
      <section className="py-32 bg-brand-terracotta text-center px-6 relative overflow-hidden">
        <motion.div
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-16 left-[10%] w-16 opacity-80 hidden md:block"
        >
          <FlowerSticker className="w-full h-full" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          className="absolute bottom-16 right-[10%] w-14 text-brand-navy opacity-80 hidden md:block"
        >
          <Sparkles className="w-full h-full" strokeWidth={2.5} />
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
