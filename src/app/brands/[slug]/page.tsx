import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container, Section } from "@/components/Container";
import { EmptyState } from "@/components/EmptyState";
import { FilterBar } from "@/components/FilterBar";
import { JsonLd } from "@/components/JsonLd";
import { PageIntro } from "@/components/PageIntro";
import { Pagination } from "@/components/Pagination";
import { ProductGrid } from "@/components/ProductCard";
import { brandBySlug, brands, categoryName, productsByBrand } from "@/lib/data";
import { filterCatalog, SORT_OPTIONS } from "@/lib/catalog";
import { buildMetadata, collectionPageLd } from "@/lib/seo";
import { parsePage } from "@/lib/utils";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

// Every valid slug is known at build time, so unknown slugs return a real 404
// instead of an on-demand render (which would be a soft 404).
export const dynamicParams = false;

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const brand = brandBySlug.get(slug);
  // Signal the 404 from metadata as well as the page body so the response
  // carries a real 404 status (a 200 here would be a soft 404).
  if (!brand) notFound();
  return buildMetadata({
    title: `${brand.name} — ${brand.focus} from ${brand.origin}`,
    description: `${brand.description} ${brand.ethos}`,
    path: `/brands/${brand.slug}`,
    keywords: [brand.name, brand.focus, brand.origin],
  });
}

export default async function BrandPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const brand = brandBySlug.get(slug);
  if (!brand) notFound();

  const get = (key: string) => {
    const v = sp[key];
    return Array.isArray(v) ? v[0] : v;
  };

  const category = get("category");
  const sort = get("sort") ?? "featured";
  const page = parsePage(get("page"));

  const pool = productsByBrand(brand.slug);
  const result = filterCatalog({ category, sort, page, pool });
  const categoriesUsed = [...new Set(pool.map((p) => p.category))];

  return (
    <>
      <JsonLd
        data={collectionPageLd({
          name: `${brand.name} — Marlowe`,
          description: brand.description,
          path: `/brands/${brand.slug}`,
          items: result.items.map((p) => ({ name: p.name, path: `/products/${p.slug}` })),
        })}
      />

      <PageIntro
        eyebrow={`${brand.origin} · est. ${brand.founded}`}
        title={brand.name}
        description={brand.description}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Brands", path: "/brands" },
          { name: brand.name, path: `/brands/${brand.slug}` },
        ]}
      />

      <Section className="py-10 md:py-12">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="prose-editorial max-w-3xl">
              <h2>About the maker</h2>
              {brand.story.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <aside className="card h-fit p-6">
              <h2 className="text-xl">Repair commitment</h2>
              <p className="mt-2 text-sm text-[var(--color-ink-soft)]">{brand.ethos}</p>
              <dl className="mt-4 grid gap-2 border-t border-[var(--color-line)] pt-4 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-[var(--color-muted)]">Focus</dt>
                  <dd>{brand.focus}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[var(--color-muted)]">Origin</dt>
                  <dd>{brand.origin}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[var(--color-muted)]">Catalogue entries</dt>
                  <dd>{pool.length}</dd>
                </div>
              </dl>
              <p className="mt-4 text-xs text-[var(--color-muted)]">
                Categories:{" "}
                {categoriesUsed.map((c, i) => (
                  <span key={c}>
                    {i > 0 && ", "}
                    <Link href={`/categories/${c}`} className="link-underline">
                      {categoryName(c)}
                    </Link>
                  </span>
                ))}
              </p>
            </aside>
          </div>

          <div className="mt-12">
            <h2 className="mb-6 text-3xl">Entries from {brand.name}</h2>

            <FilterBar
              action={`/brands/${brand.slug}`}
              category={category}
              sort={sort}
              scope="brand"
              resultCount={result.total}
              sortOptions={[...SORT_OPTIONS]}
            />

            {result.items.length === 0 ? (
              <EmptyState
                title="No entries match this filter"
                description="Clear the category filter to see everything from this maker."
                action={{ href: `/brands/${brand.slug}`, label: "Clear filter" }}
              />
            ) : (
              <>
                <ProductGrid products={result.items} priorityCount={3} />
                <Pagination
                  basePath={`/brands/${brand.slug}`}
                  current={result.current}
                  totalPages={result.totalPages}
                  query={{ category, sort: sort === "featured" ? undefined : sort }}
                  label={`${brand.name} entries`}
                />
              </>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}
