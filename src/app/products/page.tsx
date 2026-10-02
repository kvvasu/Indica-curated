import type { Metadata } from "next";
import { Container, Section } from "@/components/Container";
import { EmptyState } from "@/components/EmptyState";
import { FilterBar } from "@/components/FilterBar";
import { JsonLd } from "@/components/JsonLd";
import { Pagination } from "@/components/Pagination";
import { PageIntro } from "@/components/PageIntro";
import { ProductGrid } from "@/components/ProductCard";
import { brandName, categoryName } from "@/lib/data";
import { filterCatalog, PER_PAGE, SORT_OPTIONS } from "@/lib/catalog";
import { buildMetadata, collectionPageLd } from "@/lib/seo";
import { parsePage } from "@/lib/utils";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export const metadata: Metadata = buildMetadata({
  title: "All Products — The Marlowe Catalogue",
  description:
    "Browse every entry in the Marlowe catalogue: lighting, workspace, kitchen, audio, carry, textiles, paper and wellness objects, each with warranty and spare-parts details.",
  path: "/products",
  keywords: ["curated product catalogue", "repairable products", "durable homeware"],
});

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const get = (key: string) => {
    const v = params[key];
    return Array.isArray(v) ? v[0] : v;
  };

  const category = get("category");
  const brand = get("brand");
  const sort = get("sort") ?? "featured";
  const page = parsePage(get("page"));

  const result = filterCatalog({ category, brand, sort, page });

  const applied = [
    category ? categoryName(category) : null,
    brand ? brandName(brand) : null,
  ].filter(Boolean);

  const title = applied.length
    ? `Products filtered by ${applied.join(" and ")}`
    : "All products";

  return (
    <>
      <JsonLd
        data={collectionPageLd({
          name: "Marlowe catalogue",
          description:
            "Every entry in the Marlowe catalogue, with filters for category and brand and sorting by price, name and review date.",
          path: "/products",
          items: result.items.map((p) => ({ name: p.name, path: `/products/${p.slug}` })),
        })}
      />

      <PageIntro
        eyebrow="Catalogue"
        title={title}
        description="Filter by category or brand, then sort by price, name or the most recently reviewed. Filters are plain links and form fields, so every result has a shareable URL."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
        ]}
      />

      <Section className="py-10 md:py-12">
        <Container>
          <FilterBar
            action="/products"
            category={category}
            brand={brand}
            sort={sort}
            resultCount={result.total}
            sortOptions={[...SORT_OPTIONS]}
          />

          <h2 className="sr-only">Product results</h2>

          {result.items.length === 0 ? (
            <EmptyState
              title="No products match these filters"
              description="Try removing a filter, or browse the full catalogue. Every entry is reviewed quarterly, so the set changes slowly by design."
              action={{ href: "/products", label: "Clear filters" }}
            />
          ) : (
            <>
              <ProductGrid products={result.items} priorityCount={3} />
              <Pagination
                basePath="/products"
                current={result.current}
                totalPages={result.totalPages}
                query={{ category, brand, sort: sort === "featured" ? undefined : sort }}
                label="Product pages"
              />
              <p className="mt-6 text-center text-xs text-[var(--color-muted)]">
                Showing {(result.current - 1) * PER_PAGE + 1}–
                {(result.current - 1) * PER_PAGE + result.items.length} of {result.total} entries.
              </p>
            </>
          )}
        </Container>
      </Section>
    </>
  );
}
