// Organic hand-drawn sticker artifacts, matching the logo's thick-outline
// style. Silhouettes use uneven, wobbled curves rather than true circles/
// polygons so they read as sketched rather than vector-perfect.

const NAVY = "#12333A";
const CREAM = "#F7F3EC";
const PINK = "#F5D9DE";
const TERRACOTTA = "#D97757";
const SLATE = "#5C8A94";

type StickerProps = { className?: string };

export function SproutSticker({ className }: StickerProps) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className} aria-hidden="true">
      <g stroke={NAVY} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
        <path
          d="M30 52c1-10 0-18-1-24"
          fill="none"
        />
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

export function GiftSticker({ className }: StickerProps) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className} aria-hidden="true">
      <g stroke={NAVY} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
        <path
          d="M11 27c-1-2-1-5 1-6 3-2 34-2 37 0 2 1 2 4 1 6-3 2-36 2-39 0z"
          fill={PINK}
        />
        <path d="M14 28c-1 6-1 17 0 24 5 2 27 2 32 0 1-7 1-18 0-24" fill={TERRACOTTA} />
        <path d="M30 27c0 9-1 18 0 25" />
        <path
          d="M29 22c-6 2-13-1-13-7 0-4 4-6 7-4 4 2 6 7 6 11z"
          fill={SLATE}
        />
        <path
          d="M31 22c6 2 13-1 13-7 0-4-4-6-7-4-4 2-6 7-6 11z"
          fill={SLATE}
        />
      </g>
    </svg>
  );
}

export function TagBlobSticker({ className }: StickerProps) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className} aria-hidden="true">
      <g stroke={NAVY} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
        <path
          d="M9 9c8-2 17-2 24 1 3 1 5 3 7 5 6 6 12 12 17 19 2 3 2 6-1 9-6 6-13 12-20 17-3 2-6 2-9-1-7-7-13-14-19-22-2-3-3-6-3-10 0-6 1-13 4-18z"
          fill={TERRACOTTA}
        />
        <circle cx="21" cy="21" r="4.5" fill={CREAM} />
      </g>
    </svg>
  );
}

export function HeartBlobSticker({ className }: StickerProps) {
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

export function StarBlobSticker({ className }: StickerProps) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className} aria-hidden="true">
      <path
        d="M31 6c2 8 4 14 9 19 5 4 11 6 18 7-7 2-13 5-18 9-5 5-7 11-9 19-2-8-4-14-9-19-5-4-11-6-18-7 7-2 13-5 18-9 5-5 7-11 9-19z"
        fill={CREAM}
        stroke={NAVY}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CoinBlobSticker({ className }: StickerProps) {
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
