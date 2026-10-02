import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Container, Section } from "@/components/Container";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { NewsletterForm } from "@/components/NewsletterForm";
import { ProductGrid } from "@/components/ProductCard";
import { SearchForm } from "@/components/SearchForm";
import { categories, collections, featuredProducts, guides, posts } from "@/lib/data";
import { buildMetadata, collectionPageLd, itemListLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: `${site.name} — ${site.tagline}`,
  description:
    "Marlowe is an independent, editorially curated index of durable, well-made objects for the home, desk, kitchen and everyday carry. Every entry lists warranty, spare parts and what will wear first.",
  path: "/",
  keywords: [
    "curated objects",
    "design-led homeware",
    "repairable products",
    "buy it for life",
    "durable desk accessories",
  ],
});

const homeFaqs = [
  {
    q: "What is Marlowe?",
    a: "Marlowe is an independent curated index of durable, well-made objects for the home, desk, kitchen and everyday carry. Each entry is chosen by an editor, described with specific facts and reviewed every quarter.",
  },
  {
    q: "How are products selected?",
    a: "We ask four questions: can it be repaired with parts that are actually sold, will it still work in five years, are the material claims specific, and does the price buy construction rather than branding. Products that fail any of these are not listed.",
  },
  {
    q: "Do you earn commission on links?",
    a: "Some outbound links are affiliate links and may earn a small commission at no cost to you. Commission never changes what is listed, and we disclose this on every page footer.",
  },
  {
    q: "How often is the catalogue updated?",
    a: "Every catalogue entry is re-reviewed each quarter and carries an updated date. Discontinued products, or products whose spare parts stop being available, are removed.",
  },
];

export default function HomePage() {
  const featured = featuredProducts.slice(0, 6);
  const recentGuides = guides.slice(0, 3);
  const recentPosts = posts.slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          collectionPageLd({
            name: "Marlowe curated index",
            description: site.shortDescription,
            path: "/",
            items: featured.map((p) => ({ name: p.name, path: `/products/${p.slug}` })),
          }),
          itemListLd(
            "Featured objects",
            featured.map((p) => ({ name: p.name, path: `/products/${p.slug}` })),
          ),
        ]}
      />

      {/* Hero */}
      <section className="border-b border-[var(--color-line)] bg-[var(--color-surface)]">
        <Container className="grid gap-10 py-14 md:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="eyebrow mb-4">Updated {formatDate(posts[0].published)}</p>
            <h1 className="max-w-2xl text-[2.5rem] leading-[1.05] md:text-6xl">
              Considered objects for everyday life
            </h1>
            <p className="mt-6 max-w-xl text-base text-[var(--color-ink-soft)] md:text-lg">
              A small, opinionated index of durable, repairable objects — with the warranty, the
              spare parts and the material that will wear first stated plainly on every page.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/discover" className="btn">
                Start discovering
              </Link>
              <Link href="/lists" className="btn btn-ghost">
                Browse curated lists
              </Link>
            </div>
          </div>

          <div className="card p-6 md:p-8">
            <p className="eyebrow mb-3">The weekly dispatch</p>
            <h2 className="text-2xl">One email. Five objects. No noise.</h2>
            <p className="mt-3 text-sm text-[var(--color-ink-soft)]">
              A short Monday email with new catalogue entries, price checks and one honest
              explanation of why each object qualifies.
            </p>
            <div className="mt-6">
              <NewsletterForm />
            </div>
          </div>
        </Container>
      </section>

      {/* Featured products */}
      <Section labelledBy="featured-heading">
        <Container>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2">Featured</p>
              <h2 id="featured-heading" className="text-3xl md:text-4xl">
                Objects that earned their place
              </h2>
            </div>
            <Link href="/products" className="link-underline text-sm">
              View all {featuredProducts.length} entries
            </Link>
          </div>
          <ProductGrid products={featured} priorityCount={3} />
        </Container>
      </Section>

      {/* Categories */}
      <Section className="border-y border-[var(--color-line)] bg-[var(--color-surface)]" labelledBy="categories-heading">
        <Container>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2">Browse</p>
              <h2 id="categories-heading" className="text-3xl md:text-4xl">
                Eight categories, deliberately narrow
              </h2>
            </div>
            <Link href="/categories" className="link-underline text-sm">
              All categories
            </Link>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link href={`/categories/${category.slug}`} className="card flex h-full flex-col gap-2 p-5">
                  <span className="eyebrow">{category.slug}</span>
                  <span className="font-[family-name:var(--font-display)] text-xl">
                    {category.name}
                  </span>
                  <span className="text-sm text-[var(--color-ink-soft)]">{category.short}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Lists */}
      <Section labelledBy="lists-heading">
        <Container>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2">Curated lists</p>
              <h2 id="lists-heading" className="text-3xl md:text-4xl">
                Small sets, one purpose each
              </h2>
            </div>
            <Link href="/lists" className="link-underline text-sm">
              All lists
            </Link>
          </div>
          <ul className="grid gap-5 md:grid-cols-3">
            {collections.slice(0, 3).map((list) => (
              <li key={list.slug}>
                <Link href={`/lists/${list.slug}`} className="card flex h-full flex-col gap-3 p-6">
                  <span className="eyebrow">{list.productSlugs.length} objects</span>
                  <span className="font-[family-name:var(--font-display)] text-2xl">
                    {list.title}
                  </span>
                  <span className="flex-1 text-sm text-[var(--color-ink-soft)]">{list.subtitle}</span>
                  <span className="link-underline text-sm">Read the list</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Guides + blog */}
      <Section className="border-y border-[var(--color-line)] bg-[var(--color-surface)]">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-2">Buying guides</p>
            <h2 className="mb-6 text-3xl">Research before you buy</h2>
            <ul className="grid gap-4">
              {recentGuides.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="card flex flex-col gap-2 p-5"
                  >
                    <span className="text-lg font-medium">{guide.title}</span>
                    <span className="text-sm text-[var(--color-ink-soft)]">{guide.description}</span>
                    <span className="text-xs text-[var(--color-muted)]">
                      Updated {formatDate(guide.updated)} · {guide.author}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-2">From the blog</p>
            <h2 className="mb-6 text-3xl">Notes on buying well</h2>
            <ul className="grid gap-4">
              {recentPosts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="card flex flex-col gap-2 p-5">
                    <span className="text-lg font-medium">{post.title}</span>
                    <span className="text-sm text-[var(--color-ink-soft)]">{post.description}</span>
                    <span className="text-xs text-[var(--color-muted)]">
                      {formatDate(post.published)} · {post.author}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/blog" className="link-underline mt-6 inline-block text-sm">
              All articles
            </Link>
          </div>
        </Container>
      </Section>

      {/* Editorial trust + search */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="eyebrow mb-2">How this works</p>
            <h2 className="text-3xl">Editorial standards, stated up front</h2>
            <div className="prose-editorial mt-6">
              <p>
                Marlowe is written and maintained by {site.author.name}, {site.author.role}. There is
                no sponsored placement: brands cannot pay to be listed, and commission does not
                change the order of results.
              </p>
              <ul>
                <li>{site.reviewCadence}</li>
                <li>Every listing states the warranty and whether spare parts are sold.</li>
                <li>Corrections are made on the page and dated, not hidden in a comment.</li>
                <li>Structured data on each page mirrors the visible content exactly.</li>
              </ul>
            </div>
            <Link href="/about" className="link-underline mt-6 inline-block text-sm">
              Read the full methodology
            </Link>
          </div>

          <div className="card p-6 md:p-8">
            <SearchForm />
            <p className="mt-4 text-xs text-[var(--color-muted)]">
              Search matches product names, brands, categories and tags. It is a plain form, so it
              works with JavaScript disabled.
            </p>
            <div className="mt-8 border-t border-[var(--color-line)] pt-6">
              <p className="eyebrow mb-2">Popular starting points</p>
              <div className="flex flex-wrap gap-2">
                {["task lamp", "stoneware", "pour-over", "everyday carry", "linen"].map((term) => (
                  <Link key={term} href={`/search?q=${encodeURIComponent(term)}`} className="chip">
                    {term}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* A single decorative image keeps the page from feeling like a list */}
      <Container className="pb-4">
        <div className="relative aspect-[21/9] overflow-hidden border border-[var(--color-line)]">
          <Image
            src="/media/products/4.svg"
            alt="Abstract illustration of a warm-lit interior in the Marlowe palette"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </Container>

      <Section>
        <Container className="max-w-3xl">
          <FaqList faqs={homeFaqs} heading="Questions about Marlowe" />
        </Container>
      </Section>
    </>
  );
}
