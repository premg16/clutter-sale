"use client";

/**
 * App Store / Google Play badges, skinned for /v4.
 *
 * A near-twin of /v2's StoreBadges, but not an import of it: that component
 * hard-codes `--v2-*` tokens, and /v4's palette is scoped under `.v4`. Lifting
 * it into a shared component would mean threading a token set through props for
 * exactly two callers — more indirection than the duplicated glyphs are worth.
 *
 * The live site points both badges at `#get-app` — the apps are not published
 * yet, so these are placeholders by design. Do NOT swap in real store URLs
 * until the listings exist; a badge that 404s is worse than one that scrolls.
 *
 * Glyphs are inline SVG (no external assets, no CSP exceptions).
 */

function AppleGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 384 512" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function PlayGlyph(props: React.SVGProps<SVGSVGElement>) {
  // Four-colour Play triangle. Keeps brand colours in both themes.
  return (
    <svg viewBox="0 0 512 512" aria-hidden="true" {...props}>
      <path fill="#00D3FF" d="M47 21.6 291.6 267 47 490.4a25 25 0 0 1-14.3-22.6V44.2A25 25 0 0 1 47 21.6z" />
      <path fill="#00F076" d="M47 21.6a25 25 0 0 1 25.6.9l224 128.4-73 73L47 21.6z" />
      <path fill="#FFCE00" d="M296.6 150.9l70.6 40.5a25 25 0 0 1 0 43.4l-70.6 40.5-45.8-62.2 45.8-62.2z" />
      <path fill="#FF3A44" d="M72.6 489.5a25 25 0 0 1-25.6.9l176.6-202.3 73 73-224 128.4z" />
    </svg>
  );
}

/**
 * `dark` — for the marigold and cream surfaces (ink chip, cream type).
 * `light` — for the deep-green bands (cream chip, forest type).
 */
type Variant = "dark" | "light";

function Badge({
  variant,
  glyph,
  caption,
  name,
}: {
  variant: Variant;
  glyph: React.ReactNode;
  caption: string;
  name: string;
}) {
  const light = variant === "light";
  return (
    <a
      href="#get-app"
      // Placeholder target, matching the live site — the apps are unpublished.
      // Announce the real destination so it isn't mistaken for a store link.
      aria-label={`${name} — coming soon, see app details`}
      className="v4-badge flex h-14 w-[168px] items-center gap-2.5 rounded-xl px-3.5"
      style={{
        backgroundColor: light ? "var(--v4-cream)" : "var(--v4-ink)",
        color: light ? "var(--v4-forest-deep)" : "var(--v4-paper)",
      }}
    >
      <span className="grid size-7 shrink-0 place-items-center">{glyph}</span>
      <span className="flex min-w-0 flex-col leading-none">
        <span className="text-[10px] opacity-75">{caption}</span>
        <span className="mt-1 truncate text-[15px] font-semibold tracking-tight">{name}</span>
      </span>
    </a>
  );
}

export function StoreBadges({
  variant = "dark",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <Badge variant={variant} caption="Download on the" name="App Store" glyph={<AppleGlyph className="size-5" />} />
      <Badge variant={variant} caption="Get it on" name="Google Play" glyph={<PlayGlyph className="size-5" />} />
    </div>
  );
}
