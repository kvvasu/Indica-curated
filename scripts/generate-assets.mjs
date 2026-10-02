/**
 * Generates Marlowe's original visual assets.
 *
 * Everything is produced from deterministic geometry — no third-party images
 * are fetched or hotlinked. Run with: npm run assets
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const PALETTE = [
  { bg: "#F4F1EA", ink: "#1C1B18", a: "#C4623F", b: "#7C8B6E" },
  { bg: "#EFEAE1", ink: "#20201C", a: "#3F6B6B", b: "#C99A3E" },
  { bg: "#F6F2EC", ink: "#1B1A17", a: "#6B4E5E", b: "#A9765C" },
  { bg: "#F1EDE6", ink: "#232320", a: "#4A5568", b: "#D8C9A9" },
  { bg: "#F5F1E8", ink: "#1D1C19", a: "#A9765C", b: "#7C8B6E" },
  { bg: "#EDE9E2", ink: "#1A1A18", a: "#C99A3E", b: "#3F6B6B" },
];

function mulberry32(seed) {
  let t = seed + 0x6d2b79f5;
  return function () {
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function productArt(seed) {
  const rnd = mulberry32(seed * 7919);
  const p = PALETTE[seed % PALETTE.length];
  const W = 1200;
  const H = 900;
  const parts = [];

  // Soft wash of the accent colour.
  parts.push(
    `<rect width="${W}" height="${H}" fill="${p.bg}"/>`,
    `<circle cx="${180 + rnd() * 240}" cy="${H - 140}" r="${280 + rnd() * 120}" fill="${p.a}" opacity="0.14"/>`,
  );

  // Horizon band.
  const bandY = H * (0.55 + rnd() * 0.12);
  parts.push(
    `<rect x="0" y="${bandY.toFixed(0)}" width="${W}" height="${(H - bandY).toFixed(0)}" fill="${p.b}" opacity="0.12"/>`,
  );

  // Primary form: an arch, circle or stacked slab — chosen by seed.
  const shape = seed % 3;
  if (shape === 0) {
    const w = 300 + rnd() * 160;
    const h = 420 + rnd() * 200;
    const x = W / 2 - w / 2;
    const y = H - 180 - h;
    parts.push(
      `<path d="M${x} ${y + h} V${y + w / 2} A${w / 2} ${w / 2} 0 0 1 ${x + w} ${y + w / 2} V${y + h} Z" fill="${p.ink}" opacity="0.92"/>`,
      `<path d="M${x + w * 0.22} ${y + h} V${y + w / 2 + 20} A${w * 0.28} ${w * 0.28} 0 0 1 ${x + w * 0.78} ${y + w / 2 + 20} V${y + h} Z" fill="${p.bg}" opacity="0.85"/>`,
    );
  } else if (shape === 1) {
    const r = 190 + rnd() * 90;
    const cx = W / 2 + (rnd() - 0.5) * 220;
    const cy = H / 2 + 40;
    parts.push(
      `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${r.toFixed(0)}" fill="${p.a}" opacity="0.9"/>`,
      `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${(r * 0.55).toFixed(0)}" fill="${p.bg}"/>`,
      `<rect x="${(cx - r).toFixed(0)}" y="${(cy + r * 0.1).toFixed(0)}" width="${(r * 2).toFixed(0)}" height="${(r * 0.16).toFixed(0)}" fill="${p.ink}" opacity="0.85"/>`,
    );
  } else {
    const slabW = 520 + rnd() * 200;
    const x = W / 2 - slabW / 2;
    let y = H - 200;
    for (let i = 0; i < 3; i++) {
      const hh = 90 + rnd() * 80;
      y -= hh + 26;
      parts.push(
        `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${slabW.toFixed(0)}" height="${hh.toFixed(0)}" rx="10" fill="${i === 1 ? p.a : p.ink}" opacity="${i === 1 ? 0.9 : 0.88}"/>`,
      );
    }
  }

  // Fine construction lines for texture.
  for (let i = 0; i < 5; i++) {
    const y = 90 + i * 46 + rnd() * 12;
    parts.push(
      `<line x1="70" y1="${y.toFixed(0)}" x2="${(70 + 120 + rnd() * 260).toFixed(0)}" y2="${y.toFixed(0)}" stroke="${p.ink}" stroke-width="2" opacity="0.18"/>`,
    );
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Abstract product artwork"><rect width="${W}" height="${H}" fill="${p.bg}"/>${parts.join("")}</svg>\n`;
}

function brandMark(size, background) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="${size}" height="${size}" role="img" aria-label="Marlowe monogram">
  <rect width="512" height="512" rx="96" fill="${background}"/>
  <path d="M136 372 V208 A44 44 0 0 1 224 208 V372" fill="none" stroke="#F4F1EA" stroke-width="26" stroke-linecap="round"/>
  <path d="M288 372 V208 A44 44 0 0 1 376 208 V372" fill="none" stroke="#C4623F" stroke-width="26" stroke-linecap="round"/>
  <path d="M136 372 H376" stroke="#F4F1EA" stroke-width="26" stroke-linecap="round"/>
</svg>
`;
}

const files = [];
function emit(rel, content) {
  const full = resolve(root, rel);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content, "utf8");
  files.push(rel);
}

emit("public/logo.svg", brandMark(512, "#1C1B18"));
emit("src/app/icon.svg", brandMark(64, "#1C1B18"));

for (let seed = 1; seed <= 40; seed++) {
  emit(`public/media/products/${seed}.svg`, productArt(seed));
}

console.log(`Generated ${files.length} assets:`);
for (const f of files.slice(0, 6)) console.log(` - ${f}`);
console.log(" - ...");
