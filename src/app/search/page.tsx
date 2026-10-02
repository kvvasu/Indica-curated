import Link from "next/link";
import type { Metadata } from "next";
import { Container, Section } from "@/components/Container";
import { EmptyState } from "@/components/EmptyState";
import { PageIntro } from "@/components/PageIntro";
import { ProductGrid } from "@/components/ProductCard";
import { SearchForm } from "@/components/SearchForm";
import { brands, categories, collections, searchProducts } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

/**
 * Search results are intentionally excluded from the index: the same content
 * is reachable through permanent, canonical pages, so indexing query URLs
 * would create thin duplicates.
 */
export const metadata: Metadata = buildMetadata({
  title: "Search the Catalogue",
  description:
    "Search the Marlowe catalogue by product name, brand, category or tag. Try task lamp, stoneware, linen or pour-over.",
  path: "/search",
  noindex: true,
});

const suggestions = ["task lamp", "stoneware", "linen", "pour-over", "everyday carry", "oak"];

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const raw = params.q;
  const query = (Array.isArray(raw) ? raw[0] : raw)?.trim() ?? "";
  const results = query ? searchProducts(query) : [];

  return (
    <>
      <PageIntro
        eyebrow="Search"
        title={query ? `Results for \u201C${query}\u201D` : "Search the catalogue"}
        description="Search matches product names, taglines, descriptions, tags, brands and categories. It is a plain GET form, so results are shareable and work without JavaScript."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Search", path: "/search" },
        ]}
      />

      <Section className="py-10 md:py-12">
        <Container>
          <div className="max-w-2xl">
            <SearchForm defaultValue={query} />
          </div>

          {!query && (
            <div className="mt-10">
              <h2 className="text-2xl">Try a search</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {suggestions.map((term) => (
                  <Link key={term} href={`/search?q=${encodeURIComponent(term)}`} className="chip">
                    {term}
                  </Link>
                ))}
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-3">
                <div>
                  <h3 className="eyebrow mb-3">Browse categories</h3>
                  <ul className="grid gap-2 text-sm">
                    {categories.map((c) => (
                      <li key={c.slug}>
                        <Link href={`/categories/${c.slug}`} className="link-underline">
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="eyebrow mb-3">Browse brands</h3>
                  <ul className="grid gap-2 text-sm">
                    {brands.slice(0, 8).map((b) => (
                      <li key={b.slug}>
                        <Link href={`/brands/${b.slug}`} className="link-underline">
                          {b.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="eyebrow mb-3">Browse lists</h3>
                  <ul className="grid gap-2 text-sm">
                    {collections.slice(0, 6).map((c) => (
                      <li key={c.slug}>
                        <Link href={`/lists/${c.slug}`} className="link-underline">
                          {c.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {query && results.length === 0 && (
            <div className="mt-10">
              <EmptyState
                title={`No entries match \u201C${query}\u201D`}
                description="The catalogue is deliberately small, so a miss is common. Try a broader term, or browse by category — every entry is reviewed quarterly."
                action={{ href: "/products", label: "Browse all products" }}
              >
                <div className="mt-2 flex flex-wrap gap-2">
                  {suggestions.map((term) => (
                    <Link key={term} href={`/search?q=${encodeURIComponent(term)}`} className="chip">
                      {term}
                    </Link>
                  ))}
                </div>
              </EmptyState>
            </div>
          )}

          {query && results.length > 0 && (
            <div className="mt-10">
              <p className="mb-6 text-sm text-[var(--color-muted)]" role="status">
                {results.length} {results.length === 1 ? "entry" : "entries"} match this query.
              </p>
              <ProductGrid products={results} priorityCount={3} />
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
