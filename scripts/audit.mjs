/**
 * End-to-end audit for Marlowe.
 *
 * - Visits every route, recording status, title, meta description, canonical,
 *   H1 count, JSON-LD parse validity and image alt coverage
 * - Captures console errors and failed requests (ignoring benign aborted
 *   RSC link prefetches, which Next cancels on navigation)
 * - Screenshots key pages at desktop, tablet and mobile widths
 * - Crawls internal links from seed pages and reports broken ones
 * - Exercises the mobile menu and verifies a visible focus indicator
 *
 * Usage: node scripts/audit.mjs [baseUrl]
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = (process.argv[2] ?? "http://127.0.0.1:3210").replace(/\/$/, "");

const ROUTES = [
  "/",
  "/discover",
  "/products",
  "/products?category=kitchen&sort=price-asc",
  "/products/halo-task-light",
  "/products/field-tote",
  "/categories",
  "/categories/kitchen",
  "/categories/kitchen?brand=cinder",
  "/brands",
  "/brands/norr",
  "/lists",
  "/lists/the-quiet-desk",
  "/guides",
  "/guides/how-to-choose-a-task-lamp",
  "/blog",
  "/blog/buying-once-is-a-skill",
  "/search",
  "/search?q=lamp",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/sitemap.xml",
  "/robots.txt",
  "/manifest.webmanifest",
  "/does-not-exist",
];

const SHOT_ROUTES = [
  ["home", "/"],
  ["discover", "/discover"],
  ["products", "/products"],
  ["product-detail", "/products/halo-task-light"],
  ["category", "/categories/kitchen"],
  ["brand", "/brands/norr"],
  ["list", "/lists/the-quiet-desk"],
  ["guide", "/guides/how-to-choose-a-task-lamp"],
  ["blog-post", "/blog/buying-once-is-a-skill"],
  ["contact", "/contact"],
  ["not-found", "/does-not-exist"],
];

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 1024, height: 768 },
  { name: "mobile", width: 390, height: 844 },
];

const problems = [];
const results = [];
const note = (level, message) => problems.push({ level, message });

async function inspect(page, url) {
  const consoleErrors = [];
  const failedRequests = [];

  const onConsole = (msg) => {
    if (msg.type() !== "error") return;
    const text = msg.text();
    if (text.includes("ERR_ABORTED")) return;
    consoleErrors.push(text);
  };
  const onFailed = (req) => {
    const failure = req.failure()?.errorText ?? "";
    if (failure.includes("ERR_ABORTED")) return;
    failedRequests.push(`${req.url()} -> ${failure}`);
  };

  page.on("console", onConsole);
  page.on("requestfailed", onFailed);

  let response = null;
  let error = null;
  try {
    response = await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
  }

  const data = await page.evaluate(() => {
    const meta = (name) =>
      document.querySelector(`meta[name="${name}"]`)?.getAttribute("content") ?? null;
    const prop = (name) =>
      document.querySelector(`meta[property="${name}"]`)?.getAttribute("content") ?? null;
    const scripts = [...document.querySelectorAll('script[type="application/ld+json"]')];
    let jsonLdErrors = 0;
    const types = [];
    for (const s of scripts) {
      try {
        const parsed = JSON.parse(s.textContent ?? "null");
        for (const node of Array.isArray(parsed) ? parsed : [parsed]) {
          if (node && node["@type"]) types.push(node["@type"]);
        }
      } catch {
        jsonLdErrors += 1;
      }
    }
    return {
      title: document.title,
      description: meta("description"),
      robots: meta("robots"),
      ogImage: prop("og:image"),
      twitterCard: meta("twitter:card"),
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null,
      h1Count: document.querySelectorAll("h1").length,
      jsonLdScripts: scripts.length,
      jsonLdErrors,
      jsonLdTypes: types,
      lang: document.documentElement.lang,
      hasSkipLink: Boolean(document.querySelector('a[href="#main"]')),
      imgWithoutAlt: [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt")).length,
    };
  });

  page.off("console", onConsole);
  page.off("requestfailed", onFailed);
  return { status: response?.status() ?? 0, error, ...data, consoleErrors, failedRequests };
}

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();

console.log(`\nAuditing ${BASE}`);
console.log("=".repeat(76));

for (const route of ROUTES) {
  const r = await inspect(page, `${BASE}${route}`);
  const isDoc = !/\.(xml|txt|webmanifest)$/.test(route);
  const expect404 = route === "/does-not-exist";
  const expectedStatus = expect404 ? 404 : 200;
  results.push({ route, ...r });

  // The deliberate 404 route logs a 404 resource error by design.
  if (expect404) {
    r.consoleErrors = [];
  }

  const flags = [];
  if (r.error) flags.push(`ERROR ${r.error}`);
  if (r.status !== expectedStatus) flags.push(`status ${r.status} expected ${expectedStatus}`);
  if (isDoc) {
    if (r.h1Count !== 1) flags.push(`h1 count=${r.h1Count}`);
    if (!r.canonical) flags.push("missing canonical");
    if (!r.description) flags.push("missing meta description");
    if (!r.ogImage) flags.push("missing og:image");
    if (r.jsonLdErrors > 0) flags.push(`json-ld parse errors=${r.jsonLdErrors}`);
    if (r.consoleErrors.length) flags.push(`console errors=${r.consoleErrors.length}`);
    if (r.failedRequests.length) flags.push(`failed requests=${r.failedRequests.length}`);
    if (r.imgWithoutAlt > 0) flags.push(`images without alt=${r.imgWithoutAlt}`);
    if (!r.lang) flags.push("missing lang attribute");
  }

  const ok = flags.length === 0;
  console.log(
    `${ok ? "OK  " : "FAIL"} ${route.padEnd(48)} ${String(r.status).padEnd(4)} ld=${r.jsonLdScripts}`,
  );
  if (!ok) {
    console.log(`       ${flags.join("; ")}`);
    note("fail", `${route}: ${flags.join("; ")}`);
  }
  for (const c of [...r.consoleErrors, ...r.failedRequests]) note("console", `${route}: ${c}`);
}

console.log(`\nCapturing screenshots…`);
for (const vp of VIEWPORTS) {
  await page.setViewportSize({ width: vp.width, height: vp.height });
  for (const [name, route] of SHOT_ROUTES) {
    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle", timeout: 30000 });
    mkdirSync("screenshots", { recursive: true });
    await page.screenshot({ path: `screenshots/${name}-${vp.width}.png`, fullPage: false });
  }
  console.log(`  ${SHOT_ROUTES.length} pages at ${vp.width}px (${vp.name})`);
}

console.log(`\nChecking internal links…`);
await page.setViewportSize({ width: 1440, height: 900 });
const seeds = ["/", "/products", "/categories/kitchen", "/guides/how-to-choose-a-task-lamp", "/about"];
const links = new Set();
for (const seed of seeds) {
  await page.goto(`${BASE}${seed}`, { waitUntil: "networkidle" });
  const found = await page.evaluate(() =>
    [...document.querySelectorAll("a[href]")]
      .map((a) => a.getAttribute("href"))
      .filter((h) => typeof h === "string" && h.startsWith("/") && !h.startsWith("//")),
  );
  for (const href of found) links.add(href.split("#")[0]);
}
let broken = 0;
for (const link of [...links].sort()) {
  if (!link) continue;
  const res = await context.request.get(`${BASE}${link}`);
  if (res.status() >= 400) {
    broken += 1;
    console.log(`  BROKEN ${link} -> ${res.status()}`);
    note("fail", `broken link ${link} -> ${res.status()}`);
  }
}
console.log(`  ${links.size} unique internal links checked, ${broken} broken`);

console.log(`\nMobile menu and keyboard checks…`);
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
try {
  const trigger = page.locator("header button[aria-controls]").first();
  await trigger.waitFor({ state: "visible", timeout: 10000 });
  await trigger.click();
  const expanded = await trigger.getAttribute("aria-expanded");
  const navVisible = await page.locator('nav[aria-label="Mobile"]').isVisible();
  console.log(`  menu opened: aria-expanded=${expanded} navVisible=${navVisible}`);
  if (expanded !== "true" || !navVisible) note("fail", "mobile menu did not open");

  await page.keyboard.press("Escape");
  const closed = await trigger.getAttribute("aria-expanded");
  console.log(`  Escape closes: aria-expanded=${closed}`);
  if (closed !== "false") note("fail", "mobile menu did not close on Escape");

  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  const focused = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el) return null;
    const s = getComputedStyle(el);
    return { tag: el.tagName, outlineStyle: s.outlineStyle, outlineWidth: s.outlineWidth };
  });
  console.log(`  first Tab stop: ${JSON.stringify(focused)}`);
  if (!focused || focused.outlineStyle === "none") note("fail", "no visible focus indicator");
} catch (e) {
  note("fail", `menu/focus check errored: ${e instanceof Error ? e.message : e}`);
}

await browser.close();

const fails = problems.filter((p) => p.level === "fail");
const consoleIssues = problems.filter((p) => p.level === "console");
console.log(`\n${"=".repeat(76)}`);
console.log(`Routes audited:        ${results.length}`);
console.log(`Hard failures:         ${fails.length}`);
console.log(`Console/net notes:     ${consoleIssues.length}`);
if (fails.length) {
  console.log("\nFailures:");
  for (const f of fails) console.log(` - ${f.message}`);
}
if (consoleIssues.length) {
  console.log("\nConsole/network notes:");
  for (const c of consoleIssues.slice(0, 15)) console.log(` - ${c.message}`);
}
process.exit(fails.length > 0 ? 1 : 0);
