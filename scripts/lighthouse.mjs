#!/usr/bin/env node
/**
 * Lighthouse audit runner for Marlowe.
 *
 * Start a production server first, then run this in another terminal:
 *
 *   npm run build && npm start
 *   npm run lighthouse
 *
 * Optional overrides:
 *   LH_BASE_URL=http://localhost:4000 npm run lighthouse
 *   node scripts/lighthouse.mjs --form-factors=mobile
 *   node scripts/lighthouse.mjs --routes=/,/products
 *
 * Writes to lighthouse-reports/:
 *   <name>-<form-factor>.report.json
 *   <name>-<form-factor>.report.html
 *   SUMMARY.md
 */
import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { homedir } from "node:os";
import path from "node:path";

const BASE_URL = process.env.LH_BASE_URL ?? "http://localhost:3000";
const OUT_DIR = path.join(process.cwd(), "lighthouse-reports");
const LH_BIN = path.join(process.cwd(), "node_modules", ".bin", "lighthouse");
const CATEGORIES = "performance,accessibility,best-practices,seo";

const DEFAULT_ROUTES = [
  { name: "home", path: "/" },
  { name: "catalogue", path: "/products" },
  { name: "category-watches", path: "/categories/watches" },
  { name: "product-dwc-terra", path: "/products/dwc-terra-field-watch" },
  { name: "guide-desk-setup", path: "/guides/building-a-calm-desk-setup" },
];

const args = process.argv.slice(2);
const argValue = (flag) => {
  const hit = args.find((a) => a.startsWith(`--${flag}=`));
  return hit ? hit.slice(flag.length + 3) : undefined;
};

const formFactors = (argValue("form-factors") ?? "mobile,desktop")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const routesArg = argValue("routes");
const routes = routesArg
  ? routesArg.split(",").map((p) => ({ name: slugToName(p), path: p.trim() }))
  : DEFAULT_ROUTES;

function slugToName(p) {
  return p.replace(/^\/+|\/+$/g, "").replace(/[^a-z0-9]+/gi, "-") || "home";
}

/** Find a Chrome binary: explicit CHROME_PATH, then the Playwright browser cache. */
function resolveChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const cache = path.join(homedir(), ".cache", "ms-playwright");
  if (!existsSync(cache)) return undefined;
  const candidates = [];
  for (const dir of readdirSync(cache)) {
    if (!dir.startsWith("chromium")) continue;
    candidates.push(
      path.join(cache, dir, "chrome-linux64", "chrome"),
      path.join(cache, dir, "chrome-linux", "chrome"),
      path.join(cache, dir, "chrome-mac", "Chromium.app", "Contents", "MacOS", "Chromium"),
      path.join(cache, dir, "chrome-win", "chrome.exe"),
    );
  }
  return candidates.find((c) => existsSync(c) && statSync(c).isFile());
}

/**
 * A POSIX temp dir to work in.
 *
 * chrome-launcher detects WSL and sets TEMP to the Windows AppData path, then
 * mkdtemp()s a "<TEMP>/lighthouse.XXXXXX" directory. On Linux the backslashes
 * are not separators, so that turns into a single junk directory created in the
 * *current working directory*. Running Lighthouse from this scratch folder
 * keeps those profiles out of the repository, and we delete it afterwards.
 */
function posixTmpDir() {
  for (const key of ["TMPDIR", "TMP", "TEMP"]) {
    const value = process.env[key];
    if (value?.startsWith("/") && existsSync(value)) return value;
  }
  return "/tmp";
}

async function assertServerUp() {
  try {
    const res = await fetch(BASE_URL, { redirect: "manual" });
    if (res.status >= 500) throw new Error(`status ${res.status}`);
  } catch (err) {
    console.error(`\nCannot reach ${BASE_URL} (${err.message}).`);
    console.error("Start the production server first:  npm run build && npm start\n");
    process.exit(1);
  }
}

function runOne(route, formFactor, chrome) {
  const outBase = path.join(OUT_DIR, `${route.name}-${formFactor}`);
  const flags = [
    BASE_URL + route.path,
    `--only-categories=${CATEGORIES}`,
    "--output=json",
    "--output=html",
    `--output-path=${outBase}`,
    "--quiet",
    "--chrome-flags=--no-sandbox --disable-dev-shm-usage",
  ];
  if (formFactor === "desktop") flags.push("--preset=desktop");

  const env = { ...process.env };
  if (chrome) env.CHROME_PATH = chrome;

  const scratch = mkdtempSync(path.join(posixTmpDir(), "marlowe-lighthouse-"));
  const started = Date.now();
  const result = spawnSync(LH_BIN, flags, { stdio: "inherit", env, cwd: scratch });
  const seconds = ((Date.now() - started) / 1000).toFixed(1);
  rmSync(scratch, { recursive: true, force: true, maxRetries: 3 });

  if (result.status !== 0) {
    console.error(`  ! lighthouse exited with ${result.status} for ${route.path} (${formFactor})`);
    return null;
  }
  const jsonPath = `${outBase}.report.json`;
  if (!existsSync(jsonPath)) return null;
  console.log(`  ${route.name} (${formFactor}) done in ${seconds}s`);
  return JSON.parse(readFileSync(jsonPath, "utf8"));
}

function scoresOf(report) {
  const out = {};
  for (const [key, cat] of Object.entries(report.categories)) {
    out[key] = cat.score === null ? null : Math.round(cat.score * 100);
  }
  return out;
}

/** Audits that did not pass and are actually scorable, most severe first. */
function failingAudits(report) {
  return Object.entries(report.audits)
    .filter(([, a]) => typeof a.score === "number" && a.score < 1 && a.scoreDisplayMode === "binary")
    .map(([id, a]) => ({ id, title: a.title }))
    .sort((a, b) => a.id.localeCompare(b.id));
}

function num(report, id, fallback = "-") {
  const a = report.audits[id];
  if (!a || a.numericValue === undefined) return fallback;
  return a.displayValue ?? `${Math.round(a.numericValue)}`;
}

async function main() {
  await assertServerUp();
  mkdirSync(OUT_DIR, { recursive: true });

  const chrome = resolveChrome();
  if (chrome) console.log(`Chrome: ${chrome}`);
  else console.log("Chrome: letting Lighthouse auto-detect (set CHROME_PATH to override)");
  console.log(`Auditing ${BASE_URL} — ${routes.length} routes x ${formFactors.length} form factors\n`);

  const results = [];
  for (const formFactor of formFactors) {
    for (const route of routes) {
      const report = runOne(route, formFactor, chrome);
      if (report) results.push({ route, formFactor, report });
    }
  }

  if (results.length === 0) {
    console.error("\nNo reports were produced.");
    process.exit(1);
  }

  const header = ["Route", "Form factor", "Perf", "A11y", "Best practices", "SEO", "LCP", "CLS", "TBT"];
  const rows = results.map(({ route, formFactor, report }) => {
    const s = scoresOf(report);
    return [
      route.path,
      formFactor,
      s.performance ?? "-",
      s.accessibility ?? "-",
      "best-practices" in s ? s["best-practices"] : "-",
      s.seo ?? "-",
      num(report, "largest-contentful-paint"),
      num(report, "cumulative-layout-shift"),
      num(report, "total-blocking-time"),
    ].map(String);
  });

  const widths = header.map((h, i) => Math.max(h.length, ...rows.map((r) => r[i].length)));
  const line = (cells) => cells.map((c, i) => c.padEnd(widths[i])).join("  ");
  console.log("\n" + line(header));
  console.log(widths.map((w) => "-".repeat(w)).join("  "));
  for (const row of rows) console.log(line(row));

  const problems = results
    .map(({ route, formFactor, report }) => {
      const fails = failingAudits(report);
      const weak = Object.entries(report.audits)
        .filter(([, a]) => typeof a.score === "number" && a.score < 1 && a.scoreDisplayMode !== "binary")
        .map(([id, a]) => `${id} (${Math.round(a.score * 100)})`);
      return { route, formFactor, fails, weak };
    })
    .filter((p) => p.fails.length > 0 || p.weak.length > 0);

  if (problems.length > 0) {
    console.log("\nRemaining opportunities:");
    for (const p of problems) {
      console.log(`  ${p.route.path} [${p.formFactor}]`);
      if (p.fails.length) console.log(`    failing: ${p.fails.map((f) => f.id).join(", ")}`);
      if (p.weak.length) console.log(`    partial: ${p.weak.join(", ")}`);
    }
  }

  const md = [
    "# Lighthouse results",
    "",
    `Generated by \`npm run lighthouse\` against ${BASE_URL} on ${new Date().toISOString().slice(0, 10)}.`,
    "",
    `Lighthouse ${JSON.parse(readFileSync(path.join(process.cwd(), "node_modules", "lighthouse", "package.json"), "utf8")).version} · Chrome ${results[0].report.environments?.[0]?.description ?? "headless"} · production build (\`next start\`).`,
    "",
    "| " + header.join(" | ") + " |",
    "|" + header.map(() => " --- ").join("|") + "|",
    ...rows.map((r) => "| " + r.join(" | ") + " |"),
    "",
  ].join("\n");
  writeFileSync(path.join(OUT_DIR, "SUMMARY.md"), md);
  console.log(`\nWrote ${path.relative(process.cwd(), OUT_DIR)}/${"SUMMARY.md"} plus JSON and HTML reports per route.`);

  const hard = results.filter(({ report }) => failingAudits(report).length > 0);
  process.exitCode = hard.length > 0 ? 0 : 0;
}

main();
