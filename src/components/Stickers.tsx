// Hand-drawn sticker artifacts traced in the same thick-outline style as
// the logo (see public/logo.jpg): navy ink outlines, flat color fills, a
// slight hand-wobble instead of true circles/polygons. Each sticker is a
// piece of the actual clutter-sale story — the item, the tag, the box it
// came in, the new growth it funds — not generic decoration.

const NAVY = "#12333A";
const CREAM = "#F7F3EC";
const PINK = "#F5D9DE";
const TERRACOTTA = "#D97757";
const TERRACOTTA_DARK = "#BB3F18";
const SLATE = "#5C8A94";

type StickerProps = { className?: string };

// The logo's lamp: a sold/donated item on its own, tipped at a slight angle
export function LampSticker({ className }: StickerProps) {
  return (
    <svg viewBox="0 0 60 70" fill="none" className={className} aria-hidden="true">
      <g stroke={NAVY} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
        <path d="M28 38v22" />
        <path d="M20 60c3-1 13-1 16 0" />
        <path
          d="M14 20c1-6 8-11 14-11s13 5 14 11c1 3-1 5-4 5H18c-3 0-5-2-4-5z"
          fill={TERRACOTTA}
        />
        <path d="M18 25 14 20h28l-4 5z" fill={TERRACOTTA_DARK} />
      </g>
    </svg>
  );
}

// The logo's price tag: hole, string loop, dollar mark
export function TagSticker({ className }: StickerProps) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className} aria-hidden="true">
      <g stroke={NAVY} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
        <path d="M37 8c3-2 7-2 9 0" />
        <circle cx="41" cy="13" r="4" fill={CREAM} />
        <path
          d="M32 6h-9L7 22c-2 2-2 5 0 7l17 17c2 2 5 2 7 0l16-16c2-2 2-5 0-7L32 6z"
          fill={TERRACOTTA}
        />
        <text x="24" y="34" fontSize="15" fontWeight="700" fill={CREAM} textAnchor="middle">
          $
        </text>
      </g>
    </svg>
  );
}

// A sprig of new growth, echoing the logo's small leaf accent
export function SproutSticker({ className }: StickerProps) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className} aria-hidden="true">
      <g stroke={NAVY} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
        <path d="M30 52c1-10 0-18-1-24" />
        <path
          d="M29 30c-4-9-12-13-21-12-1 10 4 18 13 21 4 1 7 0 8-2z"
          fill={SLATE}
        />
        <path
          d="M30 26c3-11 11-16 21-16 2 11-3 20-13 23-4 1-7 0-8-3z"
          fill={TERRACOTTA}
        />
      </g>
    </svg>
  );
}

// One open flap of the logo's cardboard box, as if a corner drifted loose
export function BoxFlapSticker({ className }: StickerProps) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className} aria-hidden="true">
      <g stroke={NAVY} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
        <path d="M6 22 30 10 54 22 30 34Z" fill={CREAM} />
        <path d="M6 22v8l24 12v-8Z" fill={SLATE} />
        <path d="M54 22v8L30 42v-8Z" fill={TERRACOTTA} />
      </g>
    </svg>
  );
}

// Care behind the transaction: not in the logo, but the emotional register
export function HeartSticker({ className }: StickerProps) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className} aria-hidden="true">
      <path
        d="M30 52c-9-7-24-17-26-31-1-9 6-16 14-15 6 1 10 5 12 9 2-4 6-8 12-9 8-1 15 6 14 15-2 14-17 24-26 31z"
        fill={TERRACOTTA}
        stroke={NAVY}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// The money that results, once the item sells
export function CoinSticker({ className }: StickerProps) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className} aria-hidden="true">
      <g stroke={NAVY} strokeWidth="2.5" strokeLinejoin="round">
        <path
          d="M30 8c13 0 22 8 23 20 1 13-9 24-23 24S7 41 8 28C9 16 17 8 30 8z"
          fill={SLATE}
        />
        <path
          d="M30 13c10 0 18 6 18 15 0 10-8 17-18 17s-18-7-18-17c0-9 8-15 18-15z"
          fill={TERRACOTTA}
        />
        <text x="30" y="38" fontSize="17" fontWeight="700" fill={CREAM} textAnchor="middle">
          $
        </text>
      </g>
    </svg>
  );
}

// A hand-drawn wavering line, used to connect timeline moments
export function SquiggleConnector({ className }: StickerProps) {
  return (
    <svg
      viewBox="0 0 20 200"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10 0c6 20-8 35-2 55s10 35 2 55 6 35 0 55 8 25 0 35"
        fill="none"
        stroke={NAVY}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="1 10"
      />
    </svg>
  );
}
