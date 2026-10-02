# Marlowe — Considered Objects for Everyday Life

An original, production-ready editorial catalogue built with the Next.js App Router.
Marlowe is a curated index of durable, repairable objects for the home, desk, kitchen and
everyday carry. Every entry states its warranty, its spare-parts position and the material
that will wear first.

The project is **inspired by the structure and information architecture** of
[curated.supply](https://www.curated.supply/) — a curated product-discovery site — but it is
not a copy of it. The brand, name, copy, product data, editorial content and every visual
asset are original to this repository.

---

## Originality and asset provenance

| Item | Status |
| --- | --- |
| Brand name, wordmark, monogram | Original ("Marlowe" / Marlowe Supply Co.) |
| Products, prices, specifications | Fictional, except the DWC Terra (see note below) |
| Brands (Norr, Halden, Kioku, …) | Fictional makers invented for this project |
| Editorial copy, guides, FAQs | Original writing |
| Product artwork | Generated from deterministic geometry by `scripts/generate-assets.mjs` |
| Photographs, logos, brand imagery | **None used.** No asset is copied or hotlinked from any third party |
| Fonts | System font stacks only — no third-party font requests |

**One real brand.** `Delhi Watch Company` (DWC) and its `DWC Terra` field watch are real
products. The Terra is listed with specifications taken from the brand's own public product
page on 2 October 2026, priced in Indian rupees, and marked as a batch release because
pre-orders for that run had closed. Nothing about DWC is invented, but its price, warranty
wording and availability changed between visits to the page, so verify them before buying.
Every other maker on this site, every other product, and all warranty or repair language
attached to those fictional makers is written for this project.

The reference site's *layout ideas* (a chip filter row, a product grid with
brand · category · price, a curated-lists section, a newsletter hero, an affiliate-disclosure
footer) informed the design brief. Nothing was transcribed from it.

---

## Tech stack

- **Next.js 15** (App Router, React Server Components, static generation)
- **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-first `@theme` tokens, no `tailwind.config`)
- **Playwright** for the end-to-end audit (dev dependency)
- No database, no runtime third-party services

Client-side JavaScript is limited to three components: the mobile menu, the newsletter form
and the contact form. Navigation, search, filters, sorting, pagination, FAQs and breadcrumbs
all work **with JavaScript disabled**.

---

## Getting started

```bash
npm install
npm run assets      # regenerate the original SVG artwork (already committed)
npm run dev         # http://localhost:3000
```

### Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (prerenders all routes) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (`next/core-web-vitals` + TypeScript rules) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run assets` | Regenerate logo, icon and product artwork |
| `npm run audit` | Full end-to-end audit against a running server |
| `npm run audit:build` | Build, then audit |

### Running the audit

```bash
npm run build
npx next start -p 3210 &
node scripts/audit.mjs http://127.0.0.1:3210
```

The audit visits every route, then checks:

- HTTP status (including that unknown slugs return a real `404`)
- Exactly one `<h1>` per page, plus presence of a canonical URL and meta description
- `og:`/`twitter:` metadata presence
- JSON-LD parses cleanly
- Every `<img>` has an `alt` attribute
- Console errors and failed network requests
- Broken internal links (crawled from seed pages)
- The mobile menu opens, closes on `Escape`, and that the first `Tab` stop has a visible focus ring
- Screenshots 11 pages at 1440px, 1024px and 390px into `screenshots/`

### Environment

Copy `.env.example` to `.env.local` to override the canonical origin (used for canonical
URLs, Open Graph URLs, `sitemap.xml` and JSON-LD):

```
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

---

## Routes implemented

All requested routes are present, plus loading / empty / error / 404 states.

| Route | Kind | Notes |
| --- | --- | --- |
| `/` | Static | Hero, newsletter, featured grid, categories, lists, guides, blog, trust panel, FAQ |
| `/discover` | Static | Discovery hub: newest, staff picks, browse-by entry points |
| `/products` | Dynamic | Filter by category/brand, sort, paginate |
| `/products/[slug]` | SSG | Product detail, specs, FAQ, alternatives, JSON-LD `Product` |
| `/categories` | Static | Category index with entry counts |
| `/categories/[slug]` | Hybrid | Intro, filters/sort/pagination, related guides, category FAQ |
| `/products/dwc-terra-field-watch` | SSG | Real product (DWC Terra), priced in INR, batch-release availability |
| `/brands` | Static | Maker index with stated repair commitments |
| `/brands/[slug]` | Hybrid | Maker story, repair commitment, scoped catalogue |
| `/lists` | Static | Curated collection index |
| `/lists/[slug]` | SSG | Collection detail, `CollectionPage` + `ItemList` |
| `/guides` | Static | Buying-guide index with reading times |
| `/guides/[slug]` | SSG | Answer-first guide, tables, FAQ, references, author |
| `/blog` | Static | Editorial index |
| `/blog/[slug]` | SSG | Article with author bio and dates |
| `/search` | Dynamic | Server-rendered search, `noindex` by design |
| `/about` | Static | Methodology, selection criteria, named editor, trust info |
| `/contact` | Static | Validated contact form, direct details, FAQ |
| `/privacy` | Static | Privacy policy |
| `/terms` | Static | Terms of use |
| `app/not-found.tsx` | Static | Branded 404, reached by middleware for unknown slugs |
| `app/error.tsx` | Client | Route error boundary with retry |
| `app/loading.tsx` | Static | Skeleton loading state |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` | Generated | `sitemap.ts`, `robots.ts`, `manifest.ts` |
| `/api/newsletter`, `/api/contact` | Route handlers | Server-side validation, JSON responses |
| `/api/og` | Edge route | Dynamic 1200×630 Open Graph images via `next/og` |

### Routes intentionally not indexed

`/search` is set to `noindex, nofollow` and disallowed in `robots.txt`. The same content is
reachable through permanent canonical pages, so indexing query URLs would create thin,
duplicate pages. There are no doorway pages and no keyword-stuffed landing pages.

---

## SEO features

- **Unique title and meta description** on every page, composed in `src/lib/seo.ts`.
- **Canonical URL** on every page, derived from `NEXT_PUBLIC_SITE_URL`.
- **One `<h1>` per page**, verified by the audit; headings descend logically (`h2` → `h3`).
- **Descriptive, hyphenated URLs** (`/products/halo-task-light`, `/guides/how-to-choose-a-task-lamp`).
- **Open Graph and Twitter** tags on every page, each with a generated 1200×630 image from
  `/api/og`, so no binary social assets need to be shipped.
- **`sitemap.xml`** with per-page `lastModified` (78 URLs), and **`robots.txt`** that
  advertises the sitemap and blocks `/api/` and `/search`.
- **Breadcrumbs** on every detail and section page — rendered visibly *and* emitted as
  `BreadcrumbList`.
- **Internal linking / topic clusters**: categories ↔ guides ↔ products ↔ lists ↔ brands are
  cross-linked; every guide links to its related category and products; every product links to
  its brand, category and the lists it appears in.
- **Editorial trust signals**: named author with a bio, publication *and* update dates on
  every article and guide, a quarterly review statement, a physical address, contact details,
  affiliate disclosure and a corrections policy.
- **Security headers** (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`) and
  `poweredByHeader: false`.

### Structured data (JSON-LD)

Every block is generated from the same data the page renders, so the markup cannot drift
from the visible content. Verified present per route by the audit:

| Schema type | Where |
| --- | --- |
| `Organization` (+ `PostalAddress`, `ContactPoint`) | Site-wide |
| `WebSite` + `SearchAction` | Site-wide |
| `BreadcrumbList` | Every page with breadcrumbs |
| `CollectionPage` + `ItemList` | Home, discover, products, categories, brands, lists, guides, blog |
| `Product` (+ `Offer`, `Brand`, `PropertyValue`) | `/products/[slug]` |
| `Article` (+ `Person` author, publisher) | `/guides/[slug]`, `/blog/[slug]` |
| `FAQPage` (+ `Question`, `Answer`) | Home, product, category, guide, about, contact |
| `HowTo` helper | Available in `src/lib/seo.ts` for step-based guides |

---

## Optimising for AI search systems

Answer engines reward content that is *extractable* and *attributable*. Concretely:

- **Answer-first sections.** Every guide opens with a "short answer" box that directly
  answers the title's question in two or three sentences, before any nuance. That block is
  also what the FAQ/Article markup describes.
- **Definitions and specifics over adjectives.** Sentences carry numbers and named facts
  ("3000K", "CRI 90 or above", "600gsm", "bar-tacked stress points") rather than
  unverifiable quality claims, which makes them quotable without distortion.
- **Comparison tables** for the decision points that people actually ask about (carbon steel
  vs stainless; waxed canvas vs nylon; three approaches to task lighting).
- **Explicit FAQ blocks** on category, product, guide and site pages, rendered as visible
  `<details>` elements *and* mirrored as `FAQPage` structured data.
- **Attribution surface.** Author name, role, bio, contact email, publication date, update
  date and a stated review cadence on the same page as the claim.
- **No llms.txt dependency, no cloaking.** The text served to a crawler is byte-identical to
  the text served to a browser; there is no hidden text and no user-agent branching.
- **Crawlable without JavaScript.** Because the site is server-rendered, the content is fully
  present in the initial HTML — important for smaller crawlers that do not execute JS.

Nothing here guarantees rankings, and this README makes no ranking claims.

---

## Keyword and topic clusters

The information architecture maps to four clusters that reinforce each other through internal
linking:

1. **Repairable / buy-it-for-life** (head term: *durable, repairable products*)
   `/about` → `/guides/choosing-an-everyday-carry-bag` → `/brands/halden`, `/brands/vantage` →
   `/lists/pack-light`
2. **Home-office and lighting** (head term: *task lamp buying guide*)
   `/categories/workspace`, `/categories/lighting` →
   `/guides/how-to-choose-a-task-lamp`, `/guides/building-a-calm-desk-setup` →
   `/lists/the-quiet-desk`, `/lists/warm-light` → `/products/halo-task-light`
3. **Small-space kitchen and coffee** (head term: *pour-over starter gear*)
   `/categories/kitchen` → `/guides/pour-over-coffee-starter-gear` →
   `/lists/morning-ritual`, `/lists/small-kitchen-well-kept` → `/products/sette-pour-over-kettle`
4. **Everyday carry** (head term: *everyday carry bag that lasts*)
   `/categories/carry` → `/guides/choosing-an-everyday-carry-bag` → `/lists/pack-light` →
   `/products/field-tote`

Each cluster has: a hub (category), an informational page (guide), a commercial-intent page
(product), a curated set (list) and a maker page (brand) — linked in both directions.

---

## Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `article`, `aside`, `footer`) with `aria-label`
  on every navigation region and `aria-current="page"` on the active link.
- A skip-to-content link as the first focusable element.
- Visible 2px focus outline on every interactive element (verified by the audit's `Tab` check).
- `aria-expanded` / `aria-controls` on the mobile menu; `Escape` closes it and focus returns.
- Forms: explicit `<label>`s, `aria-invalid`, `aria-describedby` error text, and
  `role="status"` / `aria-live="polite"` regions for loading, success and failure.
- Native `<details>`/`<summary>` for FAQs (keyboard-accessible without JavaScript).
- `prefers-reduced-motion` disables transitions and smooth scrolling.
- Tables use `<caption>`, `<thead>` and `scope="col"`.
- Images use meaningful `alt` text; decorative images use empty `alt`.

## Performance and Core Web Vitals

- **No third-party requests**: system fonts, no analytics scripts, no CDN assets.
- SVGs are used for all artwork, so they are resolution-independent and tiny, and cannot
  produce layout shift because every image is rendered with a fixed aspect ratio
  (`next/image` with `fill` inside a sized container).
- Static generation for all content routes; only `/products`, `/search` and the API routes
  render on demand.
- `next/image` is configured for AVIF/WebP output with an explicit `deviceSizes` set.
- Shared first-load JavaScript is ~103 kB; the only client bundles are the menu and two forms.

---

## Audit results

Measured against the production build with `scripts/audit.mjs`:

```
Routes audited:        30
Hard failures:         0
Console/net notes:     0
Internal links:        58 checked, 0 broken
Prerendered pages:     88
Screenshots:           36 (12 pages × 1440 / 1024 / 390)
Mobile menu:           opens (aria-expanded=true), closes on Escape
Focus indicator:       solid 2px outline on first Tab stop
```

Viewports tested: **1440×900**, **1024×768**, **768×1024** (tablet breakpoint),
**390×844**.

Screenshots are committed under `screenshots/` as
`<page>-<width>.png` (for example `home-1440.png`, `product-detail-390.png`).

---

## Deployment

The app builds to a standard Next.js server output and works on any Node host or edge
platform that supports Next 15.

**Vercel**

```bash
npx vercel        # or connect the Git repository in the dashboard
```

Set `NEXT_PUBLIC_SITE_URL` to the production origin in the project's environment variables,
then redeploy so canonical URLs, `sitemap.xml` and JSON-LD point at the right host.

**Any Node host**

```bash
npm ci
npm run build
NEXT_PUBLIC_SITE_URL=https://your-domain.example npm run start
```

**Static export** is possible (`output: "export"` in `next.config.mjs`) if you drop the
`/api/*` route handlers and adapt the two forms, since route handlers need a server.

### Connecting the forms

`/api/newsletter` and `/api/contact` validate input and return JSON so the UI has a genuine
loading/success/error cycle, but they do not persist anything. To launch for real, call your
provider from inside those handlers (for example a transactional-email provider for the
newsletter and a form-to-email service for contact). Keep the server-side validation in place.

---

## Project structure

```
src/
  app/                      # routes, metadata routes, API handlers
    api/{newsletter,contact,og}/
    products/[slug]/        # SSG detail pages
    categories/[slug]/ brands/[slug]/ lists/[slug]/ guides/[slug]/ blog/[slug]/
    sitemap.ts robots.ts manifest.ts not-found.tsx error.tsx loading.tsx
  components/               # reusable, mostly server components
    Header (client) Footer ProductCard FilterBar Breadcrumbs FaqList
    EditorialBlocks Pagination EmptyState SearchForm NewsletterForm (client)
    ContactForm (client) PageIntro Container JsonLd
  lib/
    site.ts                 # brand config, navigation, trust copy
    types.ts                # content model types
    seo.ts                  # metadata builder + JSON-LD builders
    catalog.ts              # filtering, sorting, pagination
    utils.ts                # formatting helpers
    data/                   # products, categories, brands, collections, guides, posts
  middleware.ts             # validates detail-page slugs before rendering
public/
  logo.svg, media/products/*.svg
scripts/
  generate-assets.mjs       # deterministic artwork generator
  audit.mjs                 # end-to-end audit + screenshots
```

### A note on soft 404s

Category and brand pages read `searchParams` for their filters, which makes Next render them
dynamically. In that streaming path a `notFound()` thrown inside the page arrives after the
status line has been sent, producing HTTP 200 with not-found content — a soft 404. Unknown
slugs are therefore rejected in `src/middleware.ts` *before* rendering, which keeps the
status code honest. Detail routes that do not read `searchParams` additionally set
`export const dynamicParams = false`.

---

## Remaining limitations

- **No commerce backend.** There is no cart, checkout, inventory or account system; prices are
  reference figures recorded at the last review. This is intentional and disclosed on-page.
- **Images are generated abstract artwork**, not photography. They are original and
  optimised, but a real deployment would replace them with licensed product photography.
- **Forms do not persist data** (see "Connecting the forms").
- **Search is a simple term-overlap scorer** over the catalogue, not a typo-tolerant engine;
  it is deliberately `noindex`.
- **No automated a11y test suite.** The audit checks focus visibility, landmarks, labels and
  alt coverage, but axe-core or manual screen-reader testing is not included.
- **No Lighthouse/CWV run is committed.** The measures in this repo (no third-party requests,
  system fonts, fixed image aspect ratios, static generation, ~103 kB shared JS) are
  structural, and a Lighthouse run should be performed against the deployed URL.
- **`NEXT_PUBLIC_SITE_URL` defaults to `https://marlowe.supply`** so the build is
  deterministic. Set it to your real origin before deploying, or canonical URLs and the
  sitemap will point at the placeholder.
- **Third-party SEO tooling** (`seoskill.dev`, `openseo.so`) was not run as part of this build
  because it requires account access; the in-repo audit reproduces the checks that matter for
  this site. Structured data should additionally be validated with the Rich Results Test.
- **No license file.** Add one before distributing if you intend to open-source this.

---

## Content licensing

All editorial text, product data, brand fiction and generated artwork in this repository were
produced for this project. Brand and product names referenced in the *reference site's*
catalogue are not used here. If you deploy this, replace the fictional brands and products
with real ones before publishing any commercial claims.
