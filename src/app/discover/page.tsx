import Link from "next/link";
import type { Metadata } from "next";
import { Container, Section } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { PageIntro } from "@/components/PageIntro";
import { ProductGrid } from "@/components/ProductCard";
import { SearchForm } from "@/components/SearchForm";
import {
  brands,
  categories,
  collections,
  featuredProducts,
  guides,
  posts,
  products,
} from "@/lib/data";
import { buildMetadata, itemListLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Discover Curated Objects — Start Here",
  description:
    "Start discovering: the newest catalogue entries, staff picks, curated lists, categories and buying guides — organised so you can find a durable object in a few clicks.",
  path: "/discover",
  keywords: ["discover curated products", "staff picks", "durable objects"],
});

export default function DiscoverPage() {
  const newest = [...products].sort((a, b) => b.updated.localeCompare(a.updated)).slice(0, 3);
  const staffPicks = products.filter((p) => p.staffPick).slice(0, 3);

  return (
    <>
      <JsonLd
        data={itemListLd(
          "Discover",
          featuredProducts.slice(0, 6).map((p) => ({ name: p.name, path: `/products/${p.slug}` })),
        )}
      />

      <PageIntro
        eyebrow="Discover"
        title="Find a durable object in a few clicks"
        description="Four ways in: browse a category, follow a brand, read a curated list, or search for exactly what you need. Everything here is reviewed quarterly."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Discover", path: "/discover" },
        ]}
      >
        <div className="mt-8 max-w-xl">
          <SearchForm />
        </div>
      </PageIntro>

      <Section className="py-10 md:py-14">
        <Container className="grid gap-12">
          <div>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-3xl">Newest entries</h2>
              <Link href="/products?sort=recent" className="link-underline text-sm">
                Sort the full catalogue by review date
              </Link>
            </div>
            <ProductGrid products={newest} priorityCount={3} />
          </div>

          <div>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-3xl">Staff picks</h2>
              <Link href="/products" className="link-underline text-sm">
                All products
              </Link>
            </div>
            <ProductGrid products={staffPicks} />
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div>
              <h2 className="mb-4 text-2xl">By category</h2>
              <ul className="grid gap-2 text-sm">
                {categories.map((c) => (
                  <li
                    key={c.slug}
                    className="flex items-center justify-between gap-3 border-b border-[var(--color-line)] pb-2"
                  >
                    <Link href={`/categories/${c.slug}`} className="link-underline">
                      {c.name}
                    </Link>
                    <span className="text-xs text-[var(--color-muted)]">
                      {products.filter((p) => p.category === c.slug).length}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-2xl">By brand</h2>
              <ul className="grid gap-2 text-sm">
                {brands.slice(0, 10).map((b) => (
                  <li
                    key={b.slug}
                    className="flex items-center justify-between gap-3 border-b border-[var(--color-line)] pb-2"
                  >
                    <Link href={`/brands/${b.slug}`} className="link-underline">
                      {b.name}
                    </Link>
                    <span className="text-xs text-[var(--color-muted)]">{b.focus}</span>
                  </li>
                ))}
              </ul>
              <Link href="/brands" className="link-underline mt-4 inline-block text-sm">
                All {brands.length} brands
              </Link>
            </div>

            <div>
              <h2 className="mb-4 text-2xl">By list</h2>
              <ul className="grid gap-2 text-sm">
                {collections.map((c) => (
                  <li key={c.slug} className="border-b border-[var(--color-line)] pb-2">
                    <Link href={`/lists/${c.slug}`} className="link-underline">
                      {c.title}
                    </Link>
                    <p className="text-xs text-[var(--color-muted)]">{c.subtitle}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid gap-8 border-t border-[var(--color-line)] pt-10 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl">Read before you buy</h2>
              <ul className="grid gap-3 text-sm">
                {guides.map((g) => (
                  <li key={g.slug}>
                    <Link href={`/guides/${g.slug}`} className="link-underline">
                      {g.title}
                    </Link>
                    <p className="text-xs text-[var(--color-muted)]">
                      Updated {formatDate(g.updated)} · {g.author}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-2xl">Latest from the blog</h2>
              <ul className="grid gap-3 text-sm">
                {posts.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`} className="link-underline">
                      {p.title}
                    </Link>
                    <p className="text-xs text-[var(--color-muted)]">
                      {formatDate(p.published)} · {p.author}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
