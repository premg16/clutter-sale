/**
 * /v4 content model.
 *
 * The ordering of the exports mirrors the page order, and that order is the
 * argument — not decoration. Research on the identifiable-victim effect is
 * consistent: a single named person outperforms any statistic, and leading
 * with aggregate numbers measurably *suppresses* giving by pushing the reader
 * into deliberative mode ("compassion fade"). So the page runs:
 *
 *     one story  ->  proof  ->  the ask
 *
 * Voice rules applied throughout:
 *   - Second person. Every "we did X" is rewritten as "you make X happen".
 *   - Concrete nouns. "a wheelchair", not "mobility assistance".
 *   - No guilt. The subject of every story has agency and is named.
 *   - The fee objection is answered before it is raised.
 */

export type Stat = { value: number; suffix: string; label: string };
export type Door = { id: string; title: string; body: string; cta: string; href: string };
export type Cause = {
  id: string;
  name: string;
  blurb: string;
  image: string;
  alt: string;
  raised: number;
  goal: number;
  /** Set only on the one cause closing soonest — drives the single ember accent. */
  urgent?: string;
};
export type Voice = {
  id: string;
  quote: string;
  name: string;
  role: string;
  item: string;
  /** Card fill. Cycles lilac/blue/blue/white/peach/white, mapped onto our palette. */
  tint: "mint" | "sky" | "paper" | "peach";
  /**
   * Scatter geometry — where the card sits *before* it settles into the grid.
   * `r` is degrees of rotation, `x`/`y` are px offsets. Authored per-card rather
   * than randomised so the pile is deterministic (no hydration mismatch, and the
   * composition is art-directed rather than luck).
   */
  scatter: { r: number; x: number; y: number };
};
export type Faq = { id: string; q: string; a: string };
export type Step = { id: string; n: string; title: string; body: string };

/* -------------------------------------------------------------------------- */
/* Nav — every entry maps to a real section id on the page.                    */
/* -------------------------------------------------------------------------- */

export const nav = [
  { href: "#story", label: "Marisol's story" },
  { href: "#how", label: "How it works" },
  { href: "#causes", label: "Causes" },
  { href: "#voices", label: "Stories" },
  { href: "#get-app", label: "Get the app" },
  { href: "#faq", label: "FAQ" },
] as const;

/* -------------------------------------------------------------------------- */
/* Hero — an assertion about the reader's own home, not about us.             */
/* -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: "Sell your clutter · Fund a cause",
  headline: ["The Thing You", "Stopped Using Is", "Someone's Answer"],
  sub: "Somewhere in your home is an object you have not touched in a year. To you it is clutter. To someone else, it is the whole difference.",
  cta: "Sell for Good",
  ctaSecondary: "Find a cause",
  /* The overhead objection, answered before it is raised — charity: water's
     single most-copied move. Vague reassurance reads as suspicious; the
     mechanism is what reassures. */
  trust: "100% of the sale price reaches your cause. We take $0 from sellers.",
  image: "/images/community-giving.jpg",
  alt: "Volunteers sorting boxes of donated goods together",
};

/** Two entry cards in the marigold sidebar. Verb + outcome, never verb + object. */
export const doors: Door[] = [
  {
    id: "sell",
    title: "Sell Something",
    body: "List what you no longer use. Choose the cause it funds. We handle the rest — listing, buyer, payout.",
    cta: "List an item",
    href: "#how",
  },
  {
    id: "bid",
    title: "Bid for a Cause",
    body: "Win something with a history. Every dollar you spend lands with a nonprofit, not a middleman.",
    cta: "Browse the auction",
    href: "#causes",
  },
];

/** The crossing ribbons beneath the hero. Short, declarative, no punctuation noise. */
export const ribbon = [
  "One listing",
  "One cause",
  "100% there",
  "No seller fees",
  "Every dollar tracked",
  "Your clutter, their answer",
];

/* -------------------------------------------------------------------------- */
/* The story. One person. Named. Photographed. Before any number.             */
/* -------------------------------------------------------------------------- */

// The numbers here are load-bearing, not decoration: $680 is what a good used
// sewing machine actually sells for, and at roughly $3.75 a school lunch that
// buys ~180 meals — a month of lunch for nine kids. A grander claim (forty
// children, a whole school) would be the one thing this page cannot afford to
// get wrong, because the entire argument is that the number is real.
export const story = {
  eyebrow: "One seller, one object",
  headline: "Marisol's sewing machine fed nine kids for a month",
  quote:
    "It sat under a bedsheet for four years. I kept meaning to sell it and never did — it felt like admitting something. It sold in nine days. Then they sent me a photograph of the lunch line.",
  name: "Marisol Rivera",
  city: "Cleveland, Ohio",
  object: "One sewing machine",
  outcome: "A month of school lunches for 9 kids",
  amount: "$680",
  image: "/images/donation-box.jpg",
  alt: "Marisol holding the box she packed her sewing machine into",
  cta: "Read how it worked",
};

/** Proof. Deliberately *after* the story, and framed as the reader's doing. */
export const impact: Stat[] = [
  { value: 12500, suffix: "+", label: "Items given a second life" },
  { value: 48, suffix: "", label: "Nonprofits funded by sellers like you" },
  { value: 100, suffix: "%", label: "Of every sale passed straight on" },
];

/* -------------------------------------------------------------------------- */
/* How it works. Three steps, each one sentence, each ending in the reader.   */
/* -------------------------------------------------------------------------- */

export const steps: Step[] = [
  {
    id: "list",
    n: "01",
    title: "Photograph it where it sits",
    body: "No studio, no polish. A phone photo of the thing on the shelf is enough to list it in about four minutes.",
  },
  {
    id: "choose",
    n: "02",
    title: "Pick the cause it funds",
    body: "Forty-eight nonprofits, each with a live goal and a real number attached. Choose one, or let the buyer choose.",
  },
  {
    id: "send",
    n: "03",
    title: "Watch the money arrive",
    body: "Someone buys or outbids. The full sale price transfers to the nonprofit, and you get told exactly what it paid for.",
  },
];

/* -------------------------------------------------------------------------- */
/* Causes. Concrete dollar-to-outcome on every card — the Kiva/DonorsChoose   */
/* pattern. Exactly one carries the urgency flag.                             */
/* -------------------------------------------------------------------------- */

export const causes: Cause[] = [
  {
    id: "garden",
    // The old copy read "clean water / a handpump" over a photo of a vegetable
    // garden. The cause now matches the picture it is illustrated with.
    name: "The neighborhood food garden",
    blurb: "$40 puts a season of fresh produce on one family's table.",
    image: "/images/community-garden.jpg",
    alt: "Neighbors tending a community vegetable garden",
    raised: 12800,
    goal: 18000,
    urgent: "Bidding closes in 2 days",
  },
  {
    id: "books",
    name: "A library in every classroom",
    blurb: "$25 buys one child a full year of books they can see themselves in.",
    image: "/images/library-reading.jpg",
    alt: "Students reading together at a library table",
    raised: 7400,
    goal: 14000,
  },
  {
    id: "animals",
    name: "The shelter vet clinic",
    blurb: "$60 covers one rescue: exam, vaccinations, and a night in care.",
    image: "/images/animal-rescue.jpg",
    alt: "A veterinarian examining a rescued dog",
    raised: 5200,
    goal: 9000,
  },
];

/**
 * The two scrolling photo columns beside the pledges.
 *
 * Split across columns rather than one shuffled list so the same photograph is
 * never adjacent to itself at the seam. Each column is duplicated at render time
 * to make the loop seamless — don't duplicate here.
 */
export const photoColumns: { src: string; alt: string }[][] = [
  [
    { src: "/images/doorstep-handoff.jpg", alt: "Parcels waiting on a doorstep for collection" },
    { src: "/images/library-reading.jpg", alt: "Students reading together at a library table" },
    { src: "/images/donation-box.jpg", alt: "A man carrying a box of things he no longer uses" },
    { src: "/images/community-giving.jpg", alt: "Volunteers sorting donated goods" },
  ],
  [
    { src: "/images/thrifted-items.jpg", alt: "Pre-loved clothes and a camera laid out for a listing" },
    { src: "/images/community-garden.jpg", alt: "Neighbours working together in a community garden" },
    { src: "/images/animal-rescue.jpg", alt: "A veterinarian examining a rescued dog" },
    { src: "/images/doorstep-handoff.jpg", alt: "A packed box left out for pickup" },
  ],
];

/** The dark checklist band — what sellers have already paid for, in their words. */
export const pledges = [
  {
    id: "fees",
    title: "You are never charged to sell",
    body: "Buyers pay a small service fee. Sellers pay nothing, and the nonprofit's share is never touched.",
  },
  {
    id: "trace",
    title: "You see where the dollar lands",
    body: "Every item links to a payout receipt from the nonprofit that received it. Not a total — your item, your money.",
  },
  {
    id: "choose",
    title: "You choose, not an algorithm",
    body: "The cause attached to your object is your decision, and it stays visible on the listing the buyer sees.",
  },
];

/* -------------------------------------------------------------------------- */
/* Social proof — placed near the ask, not in the hero. Each names the object. */
/* -------------------------------------------------------------------------- */

export const voices: Voice[] = [
  {
    id: "v1",
    quote:
      "I expected to feel like I was throwing things away. Instead I got a photo of the classroom my old desk paid for.",
    name: "Rachel Adams",
    role: "Seller, Austin",
    item: "A writing desk",
    tint: "mint",
    scatter: { r: -3.5, x: -18, y: 34 },
  },
  {
    id: "v2",
    quote:
      "The team handled everything. I photographed a cabinet on a Sunday and by Friday it had been picked up, sold, and paid out.",
    name: "James Robinson",
    role: "Seller, Portland",
    item: "A kitchen cabinet",
    tint: "sky",
    scatter: { r: 1.5, x: 10, y: -26 },
  },
  {
    id: "v3",
    quote:
      "I bid on a bicycle because I wanted a bicycle. I still ride it. It also vaccinated eleven shelter dogs.",
    name: "David Mitchell",
    role: "Buyer, Chicago",
    item: "A road bicycle",
    tint: "sky",
    scatter: { r: 4, x: 22, y: 12 },
  },
  {
    id: "v4",
    quote:
      "Despite a compressed schedule, the pickup happened the next morning. I did nothing but tape a box shut and choose a cause.",
    name: "Emily Carter",
    role: "Seller, Denver",
    item: "Two bookshelves",
    tint: "paper",
    scatter: { r: 2.5, x: -26, y: 8 },
  },
  {
    id: "v5",
    quote:
      "I came for a secondhand camera and stayed because the listing told me exactly which garden bed my money finished.",
    name: "Mark Johnson",
    role: "Buyer, Brooklyn",
    item: "A film camera",
    tint: "peach",
    scatter: { r: -2, x: 6, y: -14 },
  },
  {
    id: "v6",
    quote:
      "We stopped writing grant applications for six months. The shelves of strangers funded us instead.",
    name: "Michelle Lee",
    role: "Eastside Community Garden",
    item: "1,140 items pledged",
    tint: "paper",
    scatter: { r: -1.5, x: 20, y: 30 },
  },
];

/* -------------------------------------------------------------------------- */
/* The app. The listing flow *is* a phone flow — the camera is step one — so    */
/* this sits right after the proof, while the reader is deciding.              */
/* -------------------------------------------------------------------------- */

export const app = {
  eyebrow: "iOS and Android",
  headline: "The whole thing fits in your pocket",
  sub: "Photograph the shelf, pick the cause, and watch the bids arrive. Listing takes about four minutes, and the app tells you the moment your item pays for something.",
  /* Concrete, phone-specific reasons — not a generic feature list. */
  points: [
    "Point the camera at it and the listing writes itself",
    "A push notification the moment someone bids",
    "The payout receipt from your nonprofit, in your hand",
  ],
  /* Both badges point at this section, matching the live site: the listings do
     not exist yet, and a badge that 404s is worse than one that scrolls. */
  note: "Launching soon on both stores. Leave your email and we'll send the link on day one.",
  image: "/images/thrifted-items.jpg",
  alt: "Pre-loved clothes and accessories photographed for a listing",
};

export const faqs: Faq[] = [
  {
    id: "f1",
    q: "How can 100% of the sale price go to the cause?",
    a: "Buyers pay a small service fee on top of the winning price, and that fee is the only money we keep. It never comes out of the seller's proceeds or the nonprofit's share — which is why the number on your listing is the number the nonprofit receives.",
  },
  {
    id: "f2",
    q: "What if my thing is old, or not worth much?",
    a: "Most items on the platform sell for under $60, and that is the point. $25 is a year of books for one child. Nothing here needs to be valuable to be worth something.",
  },
  {
    id: "f3",
    q: "Do I have to ship it myself?",
    a: "No. Once an item sells, a pickup is scheduled from your door within three days. You pack it; the courier and the cost are handled.",
  },
  {
    id: "f4",
    q: "Can I choose which nonprofit receives the money?",
    a: "Yes, and you should. You pick the cause when you list, it stays visible on the listing, and buyers often bid specifically because of it. If you would rather not choose, the buyer picks instead.",
  },
  {
    id: "f5",
    q: "I run a nonprofit. How do we join?",
    a: "Apply once and we verify your 501(c)(3) status, usually within a week. After that, sellers can pledge items directly to you, and you receive every dollar those items make, paid out weekly.",
  },
];

export const finalCta = {
  headline: "Have questions, or want to get involved?",
  body: "Whether you have one thing to sell, a bid to place, or a cause that needs funding — start here.",
  cta: "Contact us",
};
