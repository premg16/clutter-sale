/**
 * Recolour the four Freepik "rafiki" illustrations onto the clutter.sale palette
 * and make them background-free so they blend into any surface.
 *
 * Run: node scripts/recolor-illustrations.mjs
 *
 * Source SVGs (asset-15/16/17/18) ship with:
 *   - a teal accent (#00807D) that clashes with our terracotta
 *   - an opaque white card + a big grey page <rect> baked behind the artwork
 *   - neutral greys tuned for a white page, which go muddy on cream
 *
 * Rather than hand-editing ~270KB of paths, we map colours and drop the
 * background rects. Skin tones are deliberately preserved: recolouring people
 * to brand hues makes them read as objects, not humans.
 */
import { readFileSync, writeFileSync } from "node:fs";

const DIR = "public/assets";

// Brand palette (from src/app/globals.css @theme)
const NAVY = "#12262b"; // --color-brand-text / ink
const TERRACOTTA = "#e8623a";
const TERRACOTTA_DEEP = "#c94a24";
const SLATE = "#3f8d99";
const PINK = "#ffd4dd";

// Neutrals: tuned to sit on cream (#fbf7f0) instead of white. The originals
// are cool greys that look dirty against a warm ground.
const NEUTRAL_DARK = "#c9beb0";
const NEUTRAL_MID = "#ddd3c6";
const NEUTRAL_LIGHT = "#ebe3d8";
const NEUTRAL_FAINT = "#f2ebe1";

const MAP = {
  // Accent: teal -> terracotta. This is the主 brand swap.
  "#00807D": TERRACOTTA,
  // Ink / line work
  "#263238": NAVY,
  "#2E353A": NAVY,
  // Cool greys -> warm neutrals that sit on cream
  "#E0E0E0": NEUTRAL_MID,
  "#EBEBEB": NEUTRAL_LIGHT,
  "#F0F0F0": NEUTRAL_LIGHT,
  "#E6E6E6": NEUTRAL_MID,
  "#FAFAFA": NEUTRAL_FAINT,
  // Secondary object colours -> brand accents, so props feel intentional
  "#E4897B": TERRACOTTA_DEEP,
  "#EB996E": TERRACOTTA,
  "#EBB376": SLATE,
  "#DE5753": TERRACOTTA_DEEP,
  // Skin tones: PRESERVED. Mapping these to brand colours turns the people
  // into props. Left as-is on purpose.
  // #FFC3BD #FFBE9D #EEC1BB #B55B52 #ED847E #D4827D
};

let report = [];

for (const file of ["asset-15.svg", "asset-16.svg", "asset-17.svg", "asset-18.svg"]) {
  const path = `${DIR}/${file}`;
  let svg = readFileSync(path, "utf8");
  const before = svg;

  // 1. Recolour.
  for (const [from, to] of Object.entries(MAP)) {
    svg = svg.replaceAll(new RegExp(from, "gi"), to);
  }

  // 2. Strip the baked-in backgrounds so the art is transparent:
  //    (a) the huge grey page rect (width="1440" height="2879" etc.)
  //    (b) the white rounded card the artwork sits on
  //    (c) any full-bleed white/near-white rect
  svg = svg
    // the oversized page rect Freepik leaves in
    .replace(/<rect[^>]*width="1440"[^>]*\/>/gi, "")
    // The white card behind the art has a stroked twin drawing its border. It
    // appears as a <path> in some files and a <rect> in others, so match ANY
    // element carrying the card's border colour — miss it and a grey rounded
    // frame survives the fill removal and boxes the illustration in.
    .replace(/<(path|rect)[^>]*stroke="#E5E5E5"[^>]*\/>/gi, "")
    .replace(/<path d="M4 -19\.5H5[^"]*"[^>]*\/>/gi, "")
    // the drop shadow ellipse under the character
    .replace(/<path[^>]*id="freepik--path--inject[^"]*"[^>]*\/>/gi, "")
    // any remaining full-canvas white rect
    .replace(/<rect[^>]*fill="white"[^>]*\/>/gi, "")
    .replace(/<rect[^>]*fill="#FFFFFF"[^>]*\/>/gi, "");

  // 3. Neutralise leftover opaque whites INSIDE the art (paper, screens). Keep
  //    them light but let them read on cream rather than punching a white hole.
  svg = svg.replaceAll('fill="white"', `fill="${NEUTRAL_FAINT}"`);
  svg = svg.replaceAll('fill="#FFFFFF"', `fill="${NEUTRAL_FAINT}"`);

  writeFileSync(path, svg);
  report.push({
    file,
    changed: svg !== before,
    teal: (svg.match(/00807D/gi) || []).length,
    white: (svg.match(/fill="white"/gi) || []).length,
  });
}

console.table(report);
