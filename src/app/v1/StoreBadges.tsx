"use client";

/**
 * App Store / Google Play badges.
 *
 * The live site points both at `#get-app` — the apps are not published yet, so
 * these are placeholders by design. Do NOT swap in real store URLs until the
 * listings exist; a badge that 404s is worse than one that scrolls.
 *
 * Glyphs are inline SVG (no external assets, no CSP exceptions). Two skins:
 * `onSurface` for normal sections, `onAccent` for the teal CTA block.
 */

function AppleGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 384 512" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function PlayGlyph(props: React.SVGProps<SVGSVGElement>) {
  // Official Google Play mark: four quadrants meeting at the hinge on the left
  // edge. The brand colours are fixed and must not be themed.
  return (
    <svg viewBox="0 0 512 512" aria-hidden="true" {...props}>
      {/* left spine → blue-green gradient region (top-left triangle) */}
      <path
        fill="#34A853"
        d="M31.8 15.4a23.9 23.9 0 0 0-6.6 16.6v448c0 6.4 2.4 12.2 6.6 16.6L279 256 31.8 15.4z"
      />
      {/* top-right: red */}
      <path fill="#EA4335" d="M361.6 338.4 279 256 31.8 496.6c7.8 8.2 20.6 9.2 31 3.4l298.8-161.6z" />
      {/* bottom-right: yellow */}
      <path fill="#FBBC04" d="M361.6 173.6 62.8 12C52.4 6.2 39.6 7.2 31.8 15.4L279 256l82.6-82.4z" />
      {/* the wedge: blue */}
      <path
        fill="#4285F4"
        d="m361.6 173.6-82.6 82.4 82.6 82.4 106.6-57.6c15.6-8.4 15.6-41.2 0-49.6l-106.6-57.6z"
      />
    </svg>
  );
}

type Variant = "onSurface" | "onAccent";

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
  const onAccent = variant === "onAccent";
  return (
    <a
      href="#get-app"
      // Placeholder target, matching the live site — the apps are unpublished.
      className="v2-press flex h-14 w-[168px] items-center gap-2.5 rounded-xl px-3.5"
      style={{
        background: onAccent ? "var(--v2-accent-on)" : "var(--v2-ink)",
        color: onAccent ? "var(--v2-accent)" : "var(--v2-surface)",
      }}
    >
      <span className="grid size-7 shrink-0 place-items-center">{glyph}</span>
      <span className="flex min-w-0 flex-col leading-none">
        <span className="text-[10px] opacity-75">{caption}</span>
        {/* No `truncate`: it sets overflow:hidden, and with the wrapper's
            leading-none the 15px line box is shorter than the 19px glyph box —
            so the descender of the "g" in "Google" was sliced off. The names are
            fixed strings, so there is nothing to truncate anyway. */}
        <span className="mt-0.5 text-[15px] font-semibold leading-snug tracking-tight">
          {name}
        </span>
      </span>
    </a>
  );
}

export function StoreBadges({
  variant = "onSurface",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <Badge
        variant={variant}
        caption="Download on the"
        name="App Store"
        glyph={<AppleGlyph className="size-5" />}
      />
      <Badge
        variant={variant}
        caption="Get it on"
        name="Google Play"
        glyph={<PlayGlyph className="size-5" />}
      />
    </div>
  );
}
