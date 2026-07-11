import Image from "next/image"
import {
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Camera,
  Plus,
  Sparkles,
  Search,
  SlidersHorizontal,
  MapPin,
  Clock,
  Heart,
  Star,
  Phone,
  Store,
  Pencil,
  CircleCheck,
  Download,
  TrendingUp,
  Trash2,
  Package,
  Copy,
  ExternalLink,
  ArrowLeft,
  LayoutGrid,
  LogOut,
  Tag,
  ShieldCheck,
} from "lucide-react"

// Recreated structurally from /assets/hero-phone-{donators,buyer,nonprofit}.png,
// recoloured to brand tokens. Rendered inside the static iPhone frame's
// transparent screen cutout — see page.tsx.

export function DonatorScreen() {
  return (
    <div className="flex h-full w-full flex-col gap-3 overflow-hidden bg-surface px-4 pb-3 pt-8">
      <div className="flex items-center justify-between">
        <ChevronLeft className="size-4 text-ink" aria-hidden />
        <span className="text-[11px] font-semibold text-ink-soft">Skip</span>
      </div>

      <div>
        <h2 className="text-[15px] font-bold leading-tight text-ink">Post Your Clutter</h2>
        <p className="text-[10px] text-ink-soft">List it in 60 seconds</p>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full border border-dashed border-brand-terracotta/50">
          <Camera className="size-4 text-brand-terracotta" aria-hidden />
        </div>
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full border border-dashed border-brand-terracotta/50">
          <Plus className="size-4 text-brand-terracotta" aria-hidden />
        </div>
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full border border-dashed border-brand-terracotta/50">
          <Plus className="size-4 text-brand-terracotta" aria-hidden />
        </div>
      </div>
      <p className="-mt-2 text-[9px] text-ink-soft">Add up to 5 photos</p>

      <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-terracotta/15 px-2.5 py-1.5 text-[9px] font-semibold text-brand-terracotta">
        <Sparkles className="size-3" aria-hidden />
        AI will auto-price your item
      </span>

      <div className="rounded-full bg-surface-raised px-3 py-2 text-[10px] text-ink-soft shadow-sm">
        What are you selling?
      </div>

      <div className="rounded-2xl bg-surface-raised px-3 py-2.5 text-[10px] text-ink-soft shadow-sm">
        Describe condition, brand, size&hellip;
      </div>

      <div>
        <p className="mb-1.5 text-[9px] font-bold text-ink">Category</p>
        <div className="flex gap-1.5 overflow-hidden">
          <span className="shrink-0 rounded-full bg-brand-navy px-2.5 py-1 text-[9px] font-semibold text-brand-cream">
            Furniture
          </span>
          <span className="shrink-0 rounded-full bg-surface-raised px-2.5 py-1 text-[9px] font-semibold text-ink-soft">
            Electronics
          </span>
          <span className="shrink-0 rounded-full bg-surface-raised px-2.5 py-1 text-[9px] font-semibold text-ink-soft">
            Clothing
          </span>
          <span className="shrink-0 rounded-full bg-surface-raised px-2.5 py-1 text-[9px] font-semibold text-ink-soft">
            To&hellip;
          </span>
        </div>
      </div>

      <div>
        <p className="mb-1.5 text-[9px] font-bold text-ink">Condition</p>
        <div className="flex gap-1.5">
          <span className="rounded-full bg-surface-raised px-2.5 py-1 text-[9px] font-semibold text-ink-soft">
            New
          </span>
          <span className="rounded-full bg-brand-terracotta/15 px-2.5 py-1 text-[9px] font-semibold text-brand-terracotta">
            Like New
          </span>
          <span className="rounded-full bg-surface-raised px-2.5 py-1 text-[9px] font-semibold text-ink-soft">
            Good
          </span>
          <span className="rounded-full bg-surface-raised px-2.5 py-1 text-[9px] font-semibold text-ink-soft">
            Fair
          </span>
        </div>
      </div>

      <div className="mt-auto flex overflow-hidden rounded-full bg-surface-raised p-1">
        <span className="flex-1 rounded-full bg-brand-navy py-2 text-center text-[10px] font-bold text-brand-cream">
          Auction
        </span>
        <span className="flex-1 py-2 text-center text-[10px] font-semibold text-ink-soft">Fixed Price</span>
      </div>
    </div>
  )
}

export function BuyerScreen() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-surface">
      <div className="bg-brand-navy px-4 pb-3 pt-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[8px] font-bold uppercase tracking-wider text-brand-cream/70">Clutter.Sale</p>
            <p className="text-[15px] font-bold leading-tight text-brand-cream">Snap, Post&hellip;Gone</p>
          </div>
          <span className="mt-0.5 inline-flex shrink-0 items-center gap-1 rounded-full bg-brand-terracotta px-2 py-1 text-[9px] font-bold text-ink-inverse">
            <MapPin className="size-2.5" aria-hidden />
            25mi
          </span>
        </div>
        <div className="mt-2.5 flex items-center gap-2 rounded-full bg-surface px-3 py-2">
          <Search className="size-3 shrink-0 text-ink-soft" aria-hidden />
          <span className="flex-1 truncate text-[9px] text-ink-soft">Search local clutter&hellip;</span>
          <SlidersHorizontal className="size-3 shrink-0 text-ink-soft" aria-hidden />
        </div>
      </div>

      <div className="flex flex-col gap-2.5 px-4 pt-3">
        <div className="flex gap-1.5">
          <span className="rounded-full bg-brand-navy px-2.5 py-1 text-[9px] font-semibold text-brand-cream">
            All
          </span>
          <span className="rounded-full bg-surface-raised px-2.5 py-1 text-[9px] font-semibold text-ink-soft shadow-sm">
            Furniture
          </span>
          <span className="rounded-full bg-surface-raised px-2.5 py-1 text-[9px] font-semibold text-ink-soft shadow-sm">
            Electronics
          </span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold text-ink">Fresh finds nearby</p>
          <p className="text-[9px] font-semibold text-brand-terracotta">&bull; 6 live</p>
        </div>

        <div className="overflow-hidden rounded-2xl bg-surface-raised shadow-sm">
          <div className="relative aspect-4/3">
            <Image src="/images/thrifted-items.jpg" alt="" fill sizes="280px" className="object-cover" />
            <span className="absolute right-1.5 top-1.5 inline-flex items-center gap-1 rounded-full bg-surface/90 px-1.5 py-0.5 text-[8px] font-bold text-ink">
              <Clock className="size-2.5" aria-hidden />
              2h 14m left
            </span>
          </div>
          <div className="px-3 py-2.5">
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-[11px] font-bold leading-tight text-ink">IKEA Malm 6-Drawer Dresser</h4>
              <Heart className="size-3.5 shrink-0 text-ink-soft" aria-hidden />
            </div>
            <p className="mt-1 flex items-center gap-1 text-[9px] text-ink-soft">
              Sarah J. &middot; <Star className="size-2.5 fill-brand-gold text-brand-gold" aria-hidden /> 4.9
            </p>
            <div className="mt-2 flex items-end justify-between">
              <div>
                <p className="text-[8px] font-bold uppercase tracking-wide text-ink-soft">Current Bid</p>
                <p className="text-[16px] font-bold leading-none text-brand-terracotta">$32</p>
              </div>
              <span className="rounded-full bg-surface px-1.5 py-0.5 text-[8px] font-semibold text-ink-soft">
                2.3mi
              </span>
            </div>
          </div>
        </div>

        <div className="relative h-8 overflow-hidden rounded-t-2xl bg-brand-navy">
          <span className="absolute right-1.5 top-1.5 inline-flex items-center gap-1 rounded-full bg-surface/90 px-1.5 py-0.5 text-[8px] font-bold text-ink">
            <Clock className="size-2.5" aria-hidden />
            45m left
          </span>
        </div>
      </div>
    </div>
  )
}

export function NonprofitScreen() {
  return (
    <div className="flex h-full w-full flex-col gap-2.5 overflow-hidden bg-surface px-4 pb-3 pt-8">
      <div>
        <h2 className="text-[15px] font-bold leading-tight text-ink">Profile</h2>
        <p className="text-[10px] text-ink-soft">View your stats</p>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-navy">
          <Heart className="size-4 fill-brand-terracotta text-brand-terracotta" aria-hidden />
        </div>
        <div>
          <p className="text-[12px] font-bold text-ink">Non-Profit</p>
          <div className="mt-0.5 flex gap-1">
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-slate/15 px-1.5 py-0.5 text-[8px] font-bold text-brand-slate">
              <CircleCheck className="size-2.5" aria-hidden />
              VERIFIED
            </span>
            <span className="rounded-full bg-surface-raised px-1.5 py-0.5 text-[8px] font-semibold text-ink-soft">
              501 Donations
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p className="flex items-center gap-1.5 text-[9px] text-ink-soft">
          <MapPin className="size-2.5 shrink-0 text-brand-terracotta" aria-hidden />
          450 Boardman-Canfield Rd, Youngstown
        </p>
        <p className="flex items-center gap-1.5 text-[9px] text-ink-soft">
          <Phone className="size-2.5 shrink-0 text-ink-soft" aria-hidden />
          (330)555-0199
        </p>
      </div>

      <div className="rounded-2xl bg-brand-navy px-3.5 py-3">
        <div className="flex items-start justify-between">
          <p className="text-[8px] font-bold uppercase tracking-wider text-brand-cream/70">Total Funds</p>
          <p className="text-[20px] font-bold leading-none tabular-nums text-brand-cream">$12.4k</p>
        </div>
        <p className="mt-1 flex items-center justify-end gap-1 text-[9px] font-semibold text-brand-slate">
          <TrendingUp className="size-2.5" aria-hidden />
          +23%
        </p>
      </div>

      <div className="rounded-2xl bg-surface-raised px-3 py-2.5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[10px] font-bold text-ink">
            <Store className="size-3 text-brand-terracotta" aria-hidden />
            Active Listings
          </span>
          <span className="flex items-center gap-1 text-[10px] font-bold text-ink">
            49 <ChevronUp className="size-3" aria-hidden />
          </span>
        </div>
        <div className="mt-2 flex flex-col gap-2 border-t border-brand-navy/10 pt-2">
          <div className="flex items-center gap-2">
            <span className="size-6 shrink-0 rounded-md bg-surface" />
            <span className="flex-1 truncate text-[9px] font-semibold text-ink">Handcrafted Dog Bed</span>
            <span className="text-[9px] font-bold text-brand-terracotta">$122</span>
            <Pencil className="size-2.5 shrink-0 text-ink-soft" aria-hidden />
          </div>
          <div className="flex items-center gap-2">
            <span className="size-6 shrink-0 rounded-md bg-surface" />
            <span className="flex-1 truncate text-[9px] font-semibold text-ink">Handcrafted Dog Bed</span>
            <span className="text-[9px] font-bold text-brand-terracotta">$122</span>
            <Pencil className="size-2.5 shrink-0 text-ink-soft" aria-hidden />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-2xl bg-surface-raised px-3 py-2.5 shadow-sm">
        <span className="flex items-center gap-1.5 text-[10px] font-bold text-ink">
          <CircleCheck className="size-3 text-brand-slate" aria-hidden />
          Completed
        </span>
        <span className="flex items-center gap-1 text-[10px] font-bold text-ink">
          122 <ChevronDown className="size-3" aria-hidden />
        </span>
      </div>

      <div className="flex items-center justify-between rounded-2xl bg-brand-navy px-3.5 py-2.5">
        <div>
          <p className="text-[10px] font-bold text-brand-cream">Tax Receipts</p>
          <p className="text-[8px] text-brand-cream/70">Total: 225</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-brand-cream px-2.5 py-1.5 text-[9px] font-bold text-brand-navy">
          Download
          <Download className="size-2.5" aria-hidden />
        </span>
      </div>
    </div>
  )
}

// Recreated structurally from /assets/asset-{5,6,7}.jpeg — the client's raw
// teal/white app screenshots used in "How It Works" — recoloured to brand
// tokens. Rendered inside the static iPhone frame's transparent screen
// cutout — see page.tsx.

export function ReviewScreen() {
  return (
    <div className="flex h-full w-full flex-col gap-2 overflow-hidden bg-surface px-3 pb-3 pt-9 text-left">
      <div>
        <h2 className="text-[15px] font-bold leading-tight text-ink">Your items</h2>
        <p className="text-[9px] leading-snug text-ink-soft">1 item ready. Add more or continue.</p>
      </div>

      {/* Cause row. Label + name only — "100% of net proceeds" was a third line
          that forced the name to truncate; the name is what matters here. */}
      <div className="flex items-center gap-2 rounded-xl bg-brand-terracotta/10 px-2 py-2">
        <span className="size-7 shrink-0 rounded-md bg-surface-raised" />
        <div className="min-w-0 flex-1">
          <p className="text-[7px] font-bold uppercase tracking-wider text-brand-terracotta">
            Proceeds support
          </p>
          <p className="truncate text-[11px] font-bold leading-tight text-ink">Boardman Food Pantry</p>
        </div>
        <span className="shrink-0 text-[9px] font-semibold text-brand-terracotta">Change</span>
      </div>

      <div className="flex items-center gap-2 rounded-xl bg-surface-raised px-2 py-2 shadow-sm">
        <div className="relative size-8 shrink-0 rounded-md bg-surface">
          <span className="absolute -right-1 -top-1 flex size-3 items-center justify-center rounded-full bg-brand-navy text-[7px] font-bold text-brand-cream">
            +3
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[7px] font-bold uppercase tracking-wider text-ink-soft">Item 1</p>
          <p className="truncate text-[11px] font-bold leading-tight text-ink">Vintage Red Bicycle</p>
          <p className="mt-0.5 flex items-center gap-1 text-[9px] text-brand-terracotta">
            <Sparkles className="size-2.5 shrink-0" aria-hidden />
            Suggested $120
          </p>
        </div>
        <Trash2 className="size-3 shrink-0 text-ink-soft" aria-hidden />
      </div>

      <button
        type="button"
        className="rounded-xl border border-dashed border-brand-navy/25 py-2 text-center text-[10px] font-semibold text-ink-soft dark:border-brand-cream/25"
      >
        + Add another item
      </button>

      {/* A payout summary fills what was a 320px void — and it's the question a
          seller actually has at this step: where does the money land? */}
      <div className="rounded-xl bg-surface-raised px-2.5 py-2 shadow-sm">
        <p className="text-[7px] font-bold uppercase tracking-wider text-ink-soft">Estimated payout</p>
        <div className="mt-1.5 flex items-baseline justify-between">
          <span className="text-[9px] text-ink-soft">Sale price</span>
          <span className="text-[10px] font-semibold tabular-nums text-ink">$120.00</span>
        </div>
        <div className="mt-1 flex items-baseline justify-between">
          <span className="text-[9px] text-ink-soft">Fees</span>
          <span className="text-[10px] font-semibold tabular-nums text-ink">&minus;$0.00</span>
        </div>
        <div className="mt-1.5 flex items-baseline justify-between border-t border-brand-navy/10 pt-1.5 dark:border-brand-cream/15">
          <span className="text-[9px] font-bold text-ink">To the cause</span>
          <span className="text-[13px] font-bold tabular-nums text-brand-terracotta">$120.00</span>
        </div>
      </div>

      <div className="flex-1" />

      <button
        type="button"
        className="rounded-xl bg-brand-terracotta py-2.5 text-center text-[11px] font-bold text-ink-inverse"
      >
        Review &amp; publish 1 item →
      </button>
    </div>
  )
}

export function BrowseScreen() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-surface">
      <div className="bg-brand-navy px-3 pb-2.5 pt-8">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-wider text-brand-cream/70">
            <span className="size-1 rounded-full bg-brand-terracotta" aria-hidden />
            Clutter.Sale
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-cream/15 px-1.5 py-0.5 text-[9px] font-bold text-brand-cream">
            <MapPin className="size-2.5" aria-hidden />
            25 mi
          </span>
        </div>

        <h2 className="mt-1.5 text-[17px] font-bold leading-[1.05] text-brand-cream">
          Snap,
          <br />
          Post&hellip;Gone
        </h2>

        <div className="mt-2 grid grid-cols-3 gap-1.5">
          <div className="rounded-lg bg-brand-cream/10 px-1.5 py-1.5">
            <Clock className="size-2.5 text-brand-cream/70" aria-hidden />
            <p className="mt-0.5 text-[8px] font-semibold text-brand-cream/70">Ending soon</p>
            <p className="text-[12px] font-bold text-brand-cream">4</p>
          </div>
          <div className="rounded-lg bg-brand-cream/10 px-1.5 py-1.5">
            <Tag className="size-2.5 text-brand-cream/70" aria-hidden />
            <p className="mt-0.5 text-[8px] font-semibold text-brand-cream/70">Buy now</p>
            <p className="text-[12px] font-bold text-brand-cream">46</p>
          </div>
          <div className="rounded-lg bg-brand-cream/10 px-1.5 py-1.5">
            <ShieldCheck className="size-2.5 text-brand-cream/70" aria-hidden />
            <p className="mt-0.5 text-[8px] font-semibold text-brand-cream/70">Safe spots</p>
            <p className="text-[12px] font-bold text-brand-cream">2</p>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-1.5">
          <Search className="size-3 shrink-0 text-ink-soft" aria-hidden />
          <span className="flex-1 truncate text-[9px] text-ink-soft">Search items supporting causes&hellip;</span>
          <SlidersHorizontal className="size-3 shrink-0 text-ink-soft" aria-hidden />
        </div>
        <p className="mt-1.5 flex items-center gap-1 text-[8px] text-brand-cream/70">
          <Package className="size-2.5" aria-hidden />
          50 items supporting causes
        </p>
      </div>

      <div className="flex flex-col gap-2 bg-brand-navy px-3 pb-2.5">
        <div className="flex gap-1.5 overflow-hidden">
          <span className="shrink-0 rounded-full bg-brand-terracotta px-2 py-1 text-[9px] font-semibold text-ink-inverse">
            All
          </span>
          <span className="shrink-0 rounded-full bg-brand-cream/10 px-2 py-1 text-[9px] font-semibold text-brand-cream/80">
            Furniture
          </span>
          <span className="shrink-0 rounded-full bg-brand-cream/10 px-2 py-1 text-[9px] font-semibold text-brand-cream/80">
            Electronics
          </span>
          <span className="shrink-0 rounded-full bg-brand-cream/10 px-2 py-1 text-[9px] font-semibold text-brand-cream/80">
            Clo&hellip;
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 overflow-hidden px-3 pt-2.5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[12px] font-bold text-ink">Fresh finds nearby</p>
            <p className="text-[8px] text-ink-soft">newest</p>
          </div>
          <span className="rounded-full bg-brand-terracotta/10 px-1.5 py-0.5 text-[9px] font-bold text-brand-terracotta">
            50 live
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl bg-surface-raised shadow-sm">
          <div className="relative aspect-4/3">
            <Image src="/assets/asset-11.jpeg" alt="Waterfall landscape listing" fill sizes="200px" className="object-cover" />
            <span className="absolute left-1.5 top-1.5 inline-flex items-center gap-1 rounded-full bg-surface/90 px-1.5 py-0.5 text-[8px] font-bold text-ink">
              Porch
            </span>
            <span className="absolute left-1.5 top-6 inline-flex items-center gap-1 rounded-full bg-surface/90 px-1.5 py-0.5 text-[8px] font-bold text-ink">
              $ Fixed
            </span>
            <span className="absolute right-1.5 top-1.5 flex size-5 items-center justify-center rounded-full bg-surface/90">
              <Heart className="size-2.5 text-brand-terracotta" aria-hidden />
            </span>
            <span className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-brand-terracotta px-1.5 py-0.5 text-[8px] font-bold text-ink-inverse">
              $23 BUY NOW
            </span>
            <span className="absolute bottom-1.5 left-1.5 size-4 rounded-full border border-surface bg-surface-raised" aria-hidden />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-brand-navy/80 to-transparent px-2 pb-1.5 pt-4">
              <p className="truncate text-[9px] font-bold text-brand-cream">Stunning Waterfall Landscape&hellip;</p>
              <p className="text-[8px] text-brand-cream/70">&bull; right here &bull;</p>
            </div>
            <span className="absolute bottom-1.5 right-1.5 rounded bg-surface/90 px-1.5 py-0.5 text-right text-[8px] font-bold text-ink">
              PRICE
              <br />
              $23
            </span>
          </div>
          <div className="px-2 py-1.5">
            <p className="flex items-center gap-1 text-[8px] text-ink-soft">
              $ Fixed Price &middot; Kenneth R. <Star className="size-2 fill-brand-gold text-brand-gold" aria-hidden /> 5.0
            </p>
            <p className="mt-0.5 text-[8px] text-ink-soft">Supporting Valley Youth Library</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-around border-t border-brand-navy/10 bg-surface-raised px-2 py-2 dark:border-brand-cream/15">
        <span className="flex flex-col items-center gap-0.5 text-brand-terracotta">
          <LayoutGrid className="size-3.5" aria-hidden />
          <span className="text-[8px] font-bold">Browse</span>
        </span>
        <span className="flex flex-col items-center gap-0.5 text-ink-soft">
          <Heart className="size-3.5" aria-hidden />
          <span className="text-[8px] font-semibold">Saves</span>
        </span>
        <span className="flex size-7 items-center justify-center rounded-full bg-brand-terracotta text-ink-inverse">
          <Plus className="size-3.5" aria-hidden />
        </span>
        <span className="flex flex-col items-center gap-0.5 text-ink-soft">
          <TrendingUp className="size-3.5" aria-hidden />
          <span className="text-[8px] font-semibold">Impact</span>
        </span>
        <span className="flex flex-col items-center gap-0.5 text-ink-soft">
          <Store className="size-3.5" aria-hidden />
          <span className="text-[8px] font-semibold">Profile</span>
        </span>
      </div>
    </div>
  )
}

export function DashboardScreen() {
  return (
    <div className="flex h-full w-full flex-col gap-2 overflow-hidden bg-surface px-3 pb-3 pt-9 text-left">
      <div className="flex items-center gap-1.5">
        <ArrowLeft className="size-3 shrink-0 text-ink" aria-hidden />
        <span className="text-[12px] font-bold text-ink">Clutter Sale</span>
      </div>

      {/* "Sign out" dropped: at this width it wrapped to two lines and collided
          with the segmented control. Dashboard/Admin is the meaningful bit. */}
      <div className="flex w-fit overflow-hidden rounded-full bg-surface-raised p-0.5 shadow-sm">
        <span className="rounded-full bg-brand-navy px-2 py-0.5 text-[9px] font-bold text-brand-cream">
          Dashboard
        </span>
        <span className="px-2 py-0.5 text-[9px] font-semibold text-ink-soft">Admin</span>
      </div>

      {/* Org card. The name sits UNDER the avatar row rather than beside it —
          beside it, at this width, it wrapped into a 4-line ragged stack. */}
      <div className="rounded-xl bg-surface-raised px-2.5 py-2 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-terracotta/15">
            <Store className="size-3.5 text-brand-terracotta" aria-hidden />
          </span>
          <p className="min-w-0 flex-1 text-[11px] font-bold leading-tight text-ink">
            John&apos;s EduTech
            <br />
            Charitable Org
          </p>
          <span className="shrink-0 self-start rounded-full bg-brand-slate/15 px-1.5 py-0.5 text-[7px] font-bold text-brand-slate">
            APPROVED
          </span>
        </div>
        <p className="mt-1 text-[9px] text-ink-soft">Manhattan, KS &middot; Education</p>
        <p className="mt-1.5 flex items-center gap-1 text-[9px] font-semibold text-brand-terracotta">
          View public profile <ExternalLink className="size-2.5 shrink-0" aria-hidden />
        </p>
      </div>

      {/* Blurb trimmed to one line: the full paragraph ate half the screen. */}
      <div className="rounded-xl bg-surface-raised px-2.5 py-2 shadow-sm">
        <p className="text-[7px] font-bold uppercase tracking-wider text-ink-soft">Your unique link</p>
        <p className="mt-1 text-[9px] leading-snug text-ink-soft">
          Share this with supporters — every listing they post funds your org.
        </p>
        <div className="mt-1.5 flex items-center gap-1.5 rounded-lg bg-surface px-1.5 py-1">
          <span className="min-w-0 flex-1 truncate text-[8px] text-ink-soft">clutter.sale/n/johns-edutech</span>
          <span className="flex shrink-0 items-center gap-1 rounded-md bg-brand-terracotta px-1.5 py-0.5 text-[8px] font-bold text-ink-inverse">
            <Copy className="size-2 shrink-0" aria-hidden />
            Copy
          </span>
        </div>
      </div>

      {/* Short labels ("Sold" not "Items sold") so none of the three clip. */}
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { label: "Raised", value: "$337" },
          { label: "Backers", value: "5" },
          { label: "Sold", value: "5" },
        ].map((s) => (
          <div key={s.label} className="rounded-lg bg-surface-raised px-1 py-1.5 text-center shadow-sm">
            <p className="text-[7px] font-bold uppercase tracking-wider text-ink-soft">{s.label}</p>
            <p className="text-[13px] font-bold leading-tight tabular-nums text-ink">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Recent activity fills what was a 250px void, and gives the dashboard the
          thing a nonprofit actually opens it for: proof money is arriving. */}
      <div className="rounded-xl bg-surface-raised px-2.5 py-2 shadow-sm">
        <p className="text-[7px] font-bold uppercase tracking-wider text-ink-soft">Recent activity</p>
        {[
          { item: "Handcrafted Dog Bed", amount: "$122" },
          { item: "Oak Writing Desk", amount: "$65" },
          { item: "Vintage Red Bicycle", amount: "$120" },
        ].map((row) => (
          <div key={row.item} className="mt-1.5 flex items-center gap-1.5">
            <span className="size-5 shrink-0 rounded-md bg-surface" aria-hidden />
            <span className="min-w-0 flex-1 truncate text-[9px] text-ink">{row.item}</span>
            <span className="shrink-0 text-[10px] font-bold tabular-nums text-brand-terracotta">
              {row.amount}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-1 rounded-xl bg-surface-raised px-2.5 py-1.5 shadow-sm">
        <CircleCheck className="size-2.5 shrink-0 text-brand-slate" aria-hidden />
        <p className="text-[9px] font-semibold text-ink-soft">Payouts enabled</p>
      </div>
    </div>
  )
}
