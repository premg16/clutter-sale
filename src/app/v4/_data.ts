import type { LucideIcon } from "lucide-react"
import { MapPin, ShieldCheck, HandHeart } from "lucide-react"

// ---- Header --------------------------------------------------------------

export const navLinks = [
  { label: "How it Works", href: "#how-it-works" },
  { label: "Clutter for a Cause", href: "#cause" },
  { label: "For Nonprofits", href: "#footer" },
  { label: "Blog", href: "#footer" },
]

// ---- Hero -----------------------------------------------------------------

export const heroBadgeCount = "530"
export const heroBadgeSuffix = "items supporting causes right now"

// Each tab swaps the headline, subline and phone screen — the same three
// things staging swaps.
export const heroTabs = [
  {
    id: "donators",
    label: "Donators",
    headlinePrefix: "Turn Unused Items Into",
    highlightWord: "Good",
    subline:
      "Snap a few photos, let AI help create the listing, and sell locally with safe pickup and escrow. Your proceeds can support a cause you care about.",
    // Staging reuses the seller's cards on every tab, which reads oddly for
    // buyers and nonprofits. These speak to each audience instead.
    statusCard: { icon: "check" as const, label: "Sold — funds sent", sub: "Valley Youth Library" },
    metricCard: { icon: "heart" as const, value: "$439", label: "raised so far" },
  },
  {
    id: "buyers",
    label: "Buyers",
    headlinePrefix: "Find Great Local Items While Supporting a",
    highlightWord: "Cause",
    subline:
      "Browse unique local listings, bid safely, and shop with purpose — knowing your purchase helps support community causes.",
    statusCard: { icon: "check" as const, label: "You won the auction", sub: "Pickup 2.3mi away" },
    metricCard: { icon: "heart" as const, value: "$32", label: "went to a food bank" },
  },
  {
    id: "nonprofits",
    label: "Non-profits",
    headlinePrefix: "Raise Support Through Everyday",
    highlightWord: "Donations",
    subline:
      "Partner with local donors and turn everyday household items into funding for your mission through secure community auctions.",
    statusCard: { icon: "check" as const, label: "New supporter joined", sub: "49 active listings" },
    metricCard: { icon: "heart" as const, value: "$12.4k", label: "total funds raised" },
  },
] as const

// No `bg-brand-navy` here: in dark mode it's the same value as the surface, so
// that avatar rendered as an invisible disc with its initials floating free.
// Every fill below holds its own against BOTH the cream and the dark ground.
export const heroAvatars = [
  { initials: "MS", className: "bg-brand-terracotta-deep text-brand-cream" },
  { initials: "RK", className: "bg-brand-terracotta text-brand-cream" },
  { initials: "JA", className: "bg-brand-slate text-brand-cream" },
  { initials: "TL", className: "bg-brand-gold text-brand-navy" },
]


// The listing photo card is shared — it's the same item in every story.
export const heroListingCard = {
  image: "/assets/asset-1.png",
  alt: "Nightstand listed for a cause",
  chip: "Local",
  price: "$48",
  gift: "Gift",
}

// ---- Stats band -------------------------------------------------------------

export const stats = [
  { value: "$439", label: "raised for local causes" },
  { value: "3", label: "items given a second life" },
  { value: "13", label: "nonprofits supported" },
]

export const trustPills: { icon: LucideIcon; iconImage: string; label: string }[] = [
  { icon: MapPin, iconImage: "/assets/asset-2.png", label: "Local" },
  { icon: ShieldCheck, iconImage: "/assets/asset-4.png", label: "Safe Escrow" },
  { icon: HandHeart, iconImage: "/assets/asset-3.png", label: "Charity Supported" },
]

export const nonprofits = [
  "Valley Youth Library",
  "Riverside Food Bank",
  "Maplewood Animal Rescue",
  "Second Chance Shelter",
  "Harbor Arts Collective",
  "Grow Community Garden",
  "Northside Free Clinic",
  "Bright Futures Scholars",
]

// ---- How It Works -----------------------------------------------------------

export const howItWorks = [
  {
    number: "01",
    title: "Snap & List",
    sentence: "Snap a few photos and let AI write the listing.",
    image: "/assets/asset-5.jpeg",
  },
  {
    number: "02",
    title: "Auction & Sell",
    sentence: "Fixed price or bidding — proceeds go to your cause.",
    image: "/assets/asset-6.jpeg",
  },
  {
    number: "03",
    title: "Safe Pickup",
    sentence: "Meet locally or ship with protected escrow payment.",
    image: "/assets/asset-7.jpeg",
  },
]

// ---- Featured Listings marquee ---------------------------------------------

export const listings = [
  { image: "/assets/asset-8.jpeg", name: "Vibrant Succulent Plant", cause: "Valley Youth Library", price: "$15" },
  { image: "/assets/asset-9.jpeg", name: "Black Faux Leather Biker Jacket", cause: "Boardman Food Pantry", price: "$35" },
  { image: "/assets/asset-10.jpeg", name: "Vintage Red Bicycle", cause: "Boardman Food Pantry", price: "$120" },
  { image: "/assets/asset-11.jpeg", name: "Stunning Waterfall Photography", cause: "Valley Youth Library", price: "$23" },
  { image: "/assets/asset-12.jpeg", name: "Yellow Ice Plant Flower", cause: "Valley Youth Library", price: "$3" },
  { image: "/assets/asset-13.jpeg", name: "Beautiful Waterfall Print", cause: "Valley Youth Library", price: "$5" },
  // NOT asset-19: that one is the nonprofit *dashboard screenshot* (384x830, white
  // UI), not a listing photo. It letterboxed inside the card and its white ground
  // read as ugly pale edges against the dark surface.
  { image: "/assets/asset-13.jpeg", name: "Oak Writing Desk", cause: "Riverside Food Bank", price: "$65" },
]

// ---- Clutter for a Cause (4 alternating rows) --------------------------------

export const causeRows = [
  {
    step: "STEP 01",
    title: "Choose Your Cause",
    sentence: "Pick a local charity, school, or shelter to support.",
    image: "/assets/asset-15.svg",
  },
  {
    step: "STEP 02",
    title: "Snap & List Your Item",
    sentence: "Photograph your item and let AI write the listing.",
    image: "/assets/asset-16.svg",
  },
  {
    step: "STEP 03",
    title: "Sell Safely Locally",
    sentence: "Secure local auction with protected payment.",
    image: "/assets/asset-17.svg",
  },
  {
    step: "STEP 04",
    title: "Give Back With Ease",
    sentence: "Proceeds go to your cause automatically.",
    image: "/assets/asset-18.svg",
  },
]

// ---- Testimonials -------------------------------------------------------------

export const testimonials = [
  {
    quote: "Cleared out my garage and raised over $300 for my kid's school.",
    initials: "MS",
    name: "Marisa Sloan",
    role: "Seller · Westgate",
  },
  {
    quote: "Clutter Sale sends the money straight to us — easiest support we've had.",
    initials: "RK",
    name: "Reggie King",
    role: "Second Chance Shelter",
  },
  {
    quote: "Found a great oak desk nearby, and my payment funded a food bank.",
    initials: "JA",
    name: "Jordan Avery",
    role: "Buyer · Riverside",
  },
]

// Same rule as heroAvatars: no `bg-brand-navy` — it matches the dark surface and
// the disc vanishes, leaving the initials floating.
export const communityAvatars = [
  { initials: "MS", className: "bg-brand-terracotta-deep text-brand-cream" },
  { initials: "RK", className: "bg-brand-terracotta text-brand-cream" },
  { initials: "JA", className: "bg-brand-slate text-brand-cream" },
  { initials: "TL", className: "bg-brand-gold text-brand-navy" },
  { initials: "DP", className: "bg-brand-pink text-brand-navy" },
  { initials: "NG", className: "bg-brand-terracotta-deep text-brand-cream" },
  { initials: "BF", className: "bg-brand-terracotta text-brand-cream" },
  { initials: "HC", className: "bg-brand-slate text-brand-cream" },
  { initials: "SK", className: "bg-brand-gold text-brand-navy" },
]

// ---- CTA -----------------------------------------------------------------

export const ctaEyebrow = "Clutter → Cause"
export const ctaHeadline = "Ready to turn clutter into impact?"
export const ctaSubline = "Download the app and post your first item in minutes."
export const ctaDashboardImage = "/assets/asset-1.png"

// ---- Footer -----------------------------------------------------------------

export const footerStats = [
  { value: "$18.4k", label: "raised" },
  { value: "1,247", label: "items rehomed" },
  { value: "34", label: "nonprofits" },
]

export const footerBlurb =
  "Turn unused stuff into real funding for nonprofits in your community."

export const footerColumns = [
  { title: "Product", links: ["Browse Causes", "How it Works", "Clutter for a Cause"] },
  { title: "Information", links: ["For Nonprofits", "Blog", "Sign in"] },
  { title: "Company", links: ["Add your Nonprofit", "Privacy", "Terms"] },
]
