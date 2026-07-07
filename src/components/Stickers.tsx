// Professional-grade icon illustrations (Solar / Phosphor duotone sets, MIT/Apache
// licensed via Iconify), recolored to the clutter.sale palette used in public/logo.svg.

const NAVY = "#12333A";
const CREAM = "#F7F3EC";
const PINK = "#F5D9DE";
const TERRACOTTA = "#D97757";
const TERRACOTTA_DARK = "#BB3F18";
const SLATE = "#5C8A94";

type StickerProps = { className?: string };

// solar:lamp-bold-duotone
export function LampSticker({ className }: StickerProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill={TERRACOTTA}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.968 7.445c.609-2.346.913-3.519 1.7-4.294a4 4 0 0 1 .756-.585C8.372 2 9.584 2 12.007 2s3.634 0 4.582.566a4 4 0 0 1 .757.585c.786.775 1.09 1.948 1.699 4.294l.084.324c.828 3.189 1.242 4.783.49 5.903a3 3 0 0 1-.247.319c-.285.322-.648.541-1.116.69c-.596.146-1.246.23-1.497.254c-.849.065-1.904.065-3.223.065h-3.059c-3.294 0-4.941 0-5.836-1.01a3 3 0 0 1-.247-.318c-.752-1.12-.338-2.714.49-5.903z"
      />
      <path
        fill={NAVY}
        d="m16.759 14.935-.003.065v2a.75.75 0 1 0 1.5 0v-2.318c-.596.145-1.246.23-1.497.253"
      />
      <path fill={NAVY} fillRule="evenodd" clipRule="evenodd" d="M11.256 21.25V15h1.5v6.25z" />
      <path
        fill={NAVY}
        d="M11.256 21.25h-2.25a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5z"
      />
    </svg>
  );
}

// solar:tag-bold-duotone
export function TagSticker({ className }: StickerProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill={TERRACOTTA}
        d="M4.728 16.137c-1.545-1.546-2.318-2.318-2.605-3.321c-.288-1.003-.042-2.068.45-4.197l.283-1.228c.413-1.792.62-2.688 1.233-3.302s1.51-.82 3.302-1.233l1.228-.284c2.13-.491 3.194-.737 4.197-.45c1.003.288 1.775 1.061 3.32 2.606l1.83 1.83C20.657 9.248 22 10.592 22 12.262c0 1.671-1.344 3.015-4.033 5.704c-2.69 2.69-4.034 4.034-5.705 4.034c-1.67 0-3.015-1.344-5.704-4.033z"
      />
      <path
        fill={NAVY}
        d="M10.124 7.271a2.017 2.017 0 1 1-2.853 2.852a2.017 2.017 0 0 1 2.853-2.852m8.927 4.78-6.979 6.98a.75.75 0 1 1-1.06-1.06l6.979-6.98a.75.75 0 1 1 1.06 1.06"
      />
    </svg>
  );
}

// solar:box-bold-duotone — three faces mapped to cream / slate / terracotta
export function BoxFlapSticker({ className }: StickerProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill={SLATE}
        d="M8.422 20.618C10.178 21.54 11.056 22 12 22V12L2.638 7.073l-.04.067C2 8.154 2 9.417 2 11.942v.117c0 2.524 0 3.787.597 4.801c.598 1.015 1.674 1.58 3.825 2.709z"
      />
      <path
        fill={CREAM}
        d="m17.577 4.432-2-1.05C13.822 2.461 12.944 2 12 2c-.945 0-1.822.46-3.578 1.382l-2 1.05C4.318 5.536 3.242 6.1 2.638 7.072L12 12l9.362-4.927c-.606-.973-1.68-1.537-3.785-2.641"
      />
      <path
        fill={TERRACOTTA}
        d="m21.403 7.14-.041-.067L12 12v10c.944 0 1.822-.46 3.578-1.382l2-1.05c2.151-1.129 3.227-1.693 3.825-2.708c.597-1.014.597-2.277.597-4.8v-.117c0-2.525 0-3.788-.597-4.802"
      />
      <path
        fill={NAVY}
        d="m6.323 4.484.1-.052 1.493-.784l9.1 5.005l4.025-2.011q.205.232.362.498c.15.254.262.524.346.825L17.75 9.964V13a.75.75 0 0 1-1.5 0v-2.286l-3.5 1.75v9.44A3 3 0 0 1 12 22c-.248 0-.493-.032-.75-.096v-9.44l-8.998-4.5c.084-.3.196-.57.346-.824q.156-.266.362-.498l9.04 4.52l3.387-1.693z"
      />
    </svg>
  );
}

// solar:heart-bold-duotone
export function HeartSticker({ className }: StickerProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill={PINK}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.106 18.247C5.298 16.083 2 13.542 2 9.137C2 4.274 7.5.825 12 5.501V20.5c-1 0-2-.77-3.038-1.59q-.417-.326-.856-.663"
      />
      <path
        fill={TERRACOTTA}
        d="M15.038 18.91C17.981 16.592 22 14 22 9.138S16.5.825 12 5.501V20.5c1 0 2-.77 3.038-1.59"
      />
    </svg>
  );
}

// ph:coin-duotone
export function CoinSticker({ className }: StickerProps) {
  return (
    <svg viewBox="0 0 256 256" className={className} aria-hidden="true">
      <path
        fill={SLATE}
        d="M232 104c0 24-40 48-104 48S24 128 24 104s40-48 104-48s104 24 104 48"
      />
      <path
        fill={TERRACOTTA}
        d="M207.58 63.84C186.85 53.48 159.33 48 128 48s-58.85 5.48-79.58 15.84S16 88.78 16 104v48c0 15.22 11.82 29.85 32.42 40.16S96.67 208 128 208s58.85-5.48 79.58-15.84S240 167.22 240 152v-48c0-15.22-11.82-29.85-32.42-40.16M128 64c62.64 0 96 23.23 96 40s-33.36 40-96 40s-96-23.23-96-40s33.36-40 96-40m-8 95.86v32c-19-.62-35-3.42-48-7.49v-31.32a203.4 203.4 0 0 0 48 6.81m16 0a203.4 203.4 0 0 0 48-6.81v31.31c-13 4.07-29 6.87-48 7.49ZM32 152v-18.47a83 83 0 0 0 16.42 10.63c2.43 1.21 5 2.35 7.58 3.43V178c-15.83-7.84-24-17.71-24-26m168 26v-30.41c2.61-1.08 5.15-2.22 7.58-3.43A83 83 0 0 0 224 133.53V152c0 8.29-8.17 18.16-24 26"
      />
    </svg>
  );
}

// ph:plant-duotone — the logo's sprig of new growth
export function SproutSticker({ className }: StickerProps) {
  return (
    <svg viewBox="0 0 256 256" className={className} aria-hidden="true">
      <path
        fill={TERRACOTTA}
        d="M138.54 149.46C106.62 96.25 149.18 43.05 239.63 48.37c5.37 90.45-47.88 133.02-101.09 101.09M16.26 88.26c-3.8 64.61 34.21 95 72.21 72.21c22.8-38-7.6-76.01-72.21-72.21"
      />
      <path
        fill={NAVY}
        d="M247.63 47.89a8 8 0 0 0-7.52-7.52c-51.76-3-93.32 12.74-111.18 42.22c-11.8 19.48-11.78 43.16-.16 65.74a71.4 71.4 0 0 0-14.17 26.95L98.33 159c7.82-16.33 7.52-33.36-1-47.49C84.09 89.73 53.62 78 15.79 80.27a8 8 0 0 0-7.52 7.52c-2.23 37.83 9.46 68.3 31.25 81.5A45.8 45.8 0 0 0 63.44 176A54.6 54.6 0 0 0 87 170.33l25 25V224a8 8 0 0 0 16 0v-29.49a55.6 55.6 0 0 1 12.27-35a73.9 73.9 0 0 0 33.31 8.4a60.9 60.9 0 0 0 31.83-8.86c29.48-17.84 45.26-59.4 42.22-111.16M86.06 146.74l-24.41-24.4a8 8 0 0 0-11.31 11.31l24.41 24.41c-9.61 3.18-18.93 2.39-26.94-2.46C32.47 146.31 23.79 124.32 24 96c28.31-.25 50.31 8.47 59.6 23.81c4.85 8.01 5.64 17.33 2.46 26.93m111.06-1.36c-13.4 8.11-29.15 8.73-45.15 2l53.69-53.7a8 8 0 0 0-11.31-11.32L140.65 136c-6.76-16-6.15-31.76 2-45.15c13.94-23 47-35.8 89.33-34.83c.96 42.32-11.84 75.42-34.86 89.36"
      />
    </svg>
  );
}

// A hand-drawn wavering line, used to connect timeline moments. Stroke uses
// currentColor so callers control it per-theme (see the how-it-works spine).
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
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="1 10"
      />
    </svg>
  );
}
