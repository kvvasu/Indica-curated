import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container, Section } from "@/components/Container";
import { EmptyState } from "@/components/EmptyState";
import { FaqList } from "@/components/FaqList";
import { FilterBar } from "@/components/FilterBar";
import { JsonLd } from "@/components/JsonLd";
import { PageIntro } from "@/components/PageIntro";
import { Pagination } from "@/components/Pagination";
import { ProductGrid } from "@/components/ProductCard";
import { categories, categoryBySlug, guides, productsByCategory } from "@/lib/data";
import { filterCatalog, SORT_OPTIONS } from "@/lib/catalog";
import { buildMetadata, collectionPageLd } from "@/lib/seo";
import { formatDate, parsePage } from "@/lib/utils";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

// Every valid slug is known at build time, so unknown slugs return a real 404
// instead of an on-demand render (which would be a soft 404).
export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryBySlug.get(slug);
  // Signal the 404 from metadata as well as the page body so the response
  // carries a real 404 status (a 200 here would be a soft 404).
  if (!category) notFound();
  return buildMetadata({
    title: `${category.name} — Curated ${category.name} Objects`,
    description: category.description,
    path: `/categories/${category.slug}`,
    keywords: [`${category.name.toLowerCase()} objects`, `curated ${category.name.toLowerCase()}`, "repairable"],
  });
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const category = categoryBySlug.get(slug);
  if (!category) notFound();

  const get = (key: string) => {
    const v = sp[key];
    return Array.isArray(v) ? v[0] : v;
  };

  const brand = get("brand");
  const sort = get("sort") ?? "featured";
  const page = parsePage(get("page"));

  const pool = productsByCategory(category.slug);
  const result = filterCatalog({ brand, sort, page, pool });

  const relatedGuides = guides.filter((g) => g.relatedCategories.includes(category.slug));

  return (
    <>
      <JsonLd
        data={collectionPageLd({
          name: `${category.name} — Marlowe`,
          description: category.description,
          path: `/categories/${category.slug}`,
          items: result.items.map((p) => ({ name: p.name, path: `/products/${p.slug}` })),
        })}
      />

      <PageIntro
        eyebrow={`${result.total} entries`}
        title={`${category.name} objects, chosen to last`}
        description={category.short}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Categories", path: "/categories" },
          { name: category.name, path: `/categories/${category.slug}` },
        ]}
      />

      <Section className="py-10 md:py-12">
        <Container>
          <div className="prose-editorial mb-8 max-w-3xl">
            {category.intro.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>

          <FilterBar
            action={`/categories/${category.slug}`}
            brand={brand}
            sort={sort}
            scope="category"
            resultCount={result.total}
            sortOptions={[...SORT_OPTIONS]}
          />

          <h2 className="sr-only">{category.name} results</h2>

          {result.items.length === 0 ? (
            <EmptyState
              title={`No ${category.name.toLowerCase()} entries match these filters`}
              description="Try a different brand, or view the whole category."
              action={{ href: `/categories/${category.slug}`, label: "Clear brand filter" }}
            />
          ) : (
            <>
              <ProductGrid products={result.items} priorityCount={3} />
              <Pagination
                basePath={`/categories/${category.slug}`}
                current={result.current}
                totalPages={result.totalPages}
                query={{ brand, sort: sort === "featured" ? undefined : sort }}
                label={`${category.name} pages`}
              />
            </>
          )}

          {relatedGuides.length > 0 && (
            <div className="mt-16 border-t border-[var(--color-line)] pt-10">
              <h2 className="text-2xl">Buying guides for {category.name.toLowerCase()}</h2>
              <ul className="mt-4 grid gap-3">
                {relatedGuides.map((g) => (
                  <li key={g.slug} className="card p-5">
                    <Link href={`/guides/${g.slug}`} className="link-underline text-lg">
                      {g.title}
                    </Link>
                    <p className="mt-1 text-sm text-[var(--color-ink-soft)]">{g.description}</p>
                    <p className="mt-2 text-xs text-[var(--color-muted)]">
                      Updated {formatDate(g.updated)} · {g.author}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <FaqList faqs={category.faqs} heading={`${category.name}: frequently asked questions`} />
        </Container>
      </Section>
    </>
  );
}
