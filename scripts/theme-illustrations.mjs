/**
 * Make the four illustrations THEME-AWARE.
 *
 * Run: node scripts/theme-illustrations.mjs
 *
 * The recolour pass baked in warm neutrals tuned for the cream page
 * (#ebe3d8 / #ddd3c6 / #f2ebe1). On the dark surface those are light values, so
 * they glow as bright patches — the same "wrong for the background" problem the
 * original white card had.
 *
 * Fix: swap the hardcoded neutrals for CSS custom properties with a light-mode
 * fallback. One file then serves both themes — no second copy to keep in sync.
 * `globals.css` already flips `.dark`, so we only need to define the vars.
 *
 * Accent (terracotta) and ink stay hardcoded: terracotta reads correctly on both
 * grounds, and the ink is only ever line-work on a light shape. Skin tones are
 * left alone — recolouring people makes them read as props.
 */
import { readFileSync, writeFileSync } from "node:fs";

const DIR = "public/assets";
const FILES = ["asset-15.svg", "asset-16.svg", "asset-17.svg", "asset-18.svg"];

// Baked neutral -> CSS var. The fallback keeps the SVG correct if opened alone.
const VARS = {
  "#f2ebe1": "var(--illo-paper, #f2ebe1)", // lightest: paper, screens, card faces
  "#ebe3d8": "var(--illo-light, #ebe3d8)", // light fill
  "#ddd3c6": "var(--illo-mid, #ddd3c6)", // mid fill / edges
  "#c9beb0": "var(--illo-dark, #c9beb0)", // darkest neutral
  "#12262b": "var(--illo-ink, #12262b)", // line work
};

const report = [];

for (const file of FILES) {
  const path = `${DIR}/${file}`;
  let svg = readFileSync(path, "utf8");
  const before = svg;

  for (const [hex, cssVar] of Object.entries(VARS)) {
    // Only inside fill="" / stroke="" — never touch path data.
    svg = svg.replaceAll(new RegExp(`(fill|stroke)="${hex}"`, "gi"), `$1="${cssVar}"`);
  }

  writeFileSync(path, svg);
  report.push({
    file,
    changed: svg !== before,
    vars: (svg.match(/var\(--illo-/g) || []).length,
    // any light neutral still hardcoded? (would glow in dark mode)
    bakedNeutrals: (svg.match(/#(f2ebe1|ebe3d8|ddd3c6|c9beb0)"/gi) || []).length,
  });
}

console.table(report);
