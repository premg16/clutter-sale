/**
 * App Store / Google Play badges for /v3.
 *
 * The apps are NOT published yet. The live site's "Download the App" controls
 * are <button>s with no href, and /v2 + /v5 both use deliberate placeholders.
 * These follow suit: `#get-app` targets, `aria-disabled`, and a title that says
 * so out loud, because a badge that 404s is worse than one that doesn't move.
 *
 * When the listings go live, set STORE_LINKS below and delete nothing else.
 *
 * Scoped locally rather than importing /v2's or /v5's version: both are bound to
 * their own route's design tokens (--v2-*, v5-teal), and /v3 owns its palette.
 *
 * Glyphs are inline SVG — no external assets, no CSP exceptions.
 */

export const STORE_LINKS = {
  ios: "#get-app", // → https://apps.apple.com/app/idXXXXXXXXX
  android: "#get-app", // → https://play.google.com/store/apps/details?id=sale.clutter
} as const;

/** True while the store listings don't exist. Drives the a11y + title fallback. */
const PENDING = STORE_LINKS.ios.startsWith("#");

function AppleGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 384 512" fill="currentColor" className={className} aria-hidden focusable="false">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function PlayGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden focusable="false">
      <path fill="#00D3FF" d="M47 21.6 291.6 267 47 490.4a25 25 0 0 1-14.3-22.6V44.2A25 25 0 0 1 47 21.6z" />
      <path fill="#00F076" d="M47 21.6a25 25 0 0 1 25.6.9l224 128.4-73 73L47 21.6z" />
      <path fill="#FFCE00" d="M296.6 150.9l70.6 40.5a25 25 0 0 1 0 43.4l-70.6 40.5-45.8-62.2 45.8-62.2z" />
      <path fill="#FF3A44" d="M72.6 489.5a25 25 0 0 1-25.6.9l176.6-202.3 73 73-224 128.4z" />
    </svg>
  );
}

/**
 * `tone` picks the skin for the band the badges sit in:
 *  - "onPhoto"  white pill on the hero photograph / dark bands
 *  - "onPaper"  dark pill on the light page background
 *  - "onTeal"   light-mint pill on a deep-teal band
 */
type Tone = "onPhoto" | "onPaper" | "onTeal";

const SKIN: Record<Tone, string> = {
  onPhoto: "bg-white text-[#16262b] shadow-[0_8px_24px_-8px_rgb(0_0_0_/_0.45)]",
  onPaper: "bg-[var(--v3-teal-deeper)] text-[var(--v3-cream)]",
  onTeal: "bg-[var(--v3-on-dark)] text-[var(--v3-teal-deeper)]",
};

export function StoreBadges({ tone = "onPhoto", className = "" }: { tone?: Tone; className?: string }) {
  const stores = [
    { key: "ios", href: STORE_LINKS.ios, glyph: <AppleGlyph className="size-5" />, caption: "Download on the", name: "App Store" },
    { key: "android", href: STORE_LINKS.android, glyph: <PlayGlyph className="size-5" />, caption: "Get it on", name: "Google Play" },
  ] as const;

  return (
    // On phones the two badges share one row and stretch to fill it; a fixed
    // 170px pill in a ~340px column reads stunted, and stacking wastes height a
    // small viewport can't spare. From `sm` up they return to fixed-width pills.
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {stores.map((s) => (
        <a
          key={s.key}
          href={s.href}
          {...(PENDING
            ? { "aria-disabled": true, title: "Coming soon to the App Store and Google Play" }
            : { target: "_blank", rel: "noreferrer" })}
          className={`flex h-14 min-w-[132px] flex-1 items-center gap-2.5 rounded-2xl px-3 transition-transform duration-300 hover:-translate-y-0.5 sm:w-[170px] sm:flex-none sm:gap-3 sm:px-4 ${SKIN[tone]}`}
        >
          <span className="grid size-7 shrink-0 place-items-center">{s.glyph}</span>
          <span className="flex min-w-0 flex-col leading-none text-left">
            <span className="text-[10px] opacity-75">{s.caption}</span>
            <span className="mt-1 truncate text-[15px] font-semibold tracking-tight">{s.name}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
