import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container, Section } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { PageIntro } from "@/components/PageIntro";
import { ProductGrid } from "@/components/ProductCard";
import { collectionBySlug, collections, productBySlug } from "@/lib/data";
import { buildMetadata, collectionPageLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

type Params = Promise<{ slug: string }>;

// Every valid slug is known at build time, so unknown slugs return a real 404
// instead of an on-demand render (which would be a soft 404).
export const dynamicParams = false;

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const list = collectionBySlug.get(slug);
  if (!list) {
    return buildMetadata({ title: "List not found", description: "", path: `/lists/${slug}`, noindex: true });
  }
  return buildMetadata({
    title: `${list.title} — Curated List`,
    description: list.description,
    path: `/lists/${list.slug}`,
    modifiedTime: list.updated,
    keywords: [list.title, "curated list", "buying list"],
  });
}

export default async function ListDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const list = collectionBySlug.get(slug);
  if (!list) notFound();

  const items = list.productSlugs
    .map((s) => productBySlug.get(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const otherLists = collections.filter((c) => c.slug !== list.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={collectionPageLd({
          name: list.title,
          description: list.description,
          path: `/lists/${list.slug}`,
          items: items.map((p) => ({ name: p.name, path: `/products/${p.slug}` })),
        })}
      />

      <PageIntro
        eyebrow={`${items.length} objects · curated by ${list.curator}`}
        title={list.title}
        description={list.subtitle}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Lists", path: "/lists" },
          { name: list.title, path: `/lists/${list.slug}` },
        ]}
      />

      <Section className="py-10 md:py-14">
        <Container>
          <div className="prose-editorial mb-10 max-w-3xl">
            {list.intro.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            <p className="text-xs text-[var(--color-muted)]">
              Last updated {formatDate(list.updated)}.
            </p>
          </div>

          <h2 className="mb-6 text-3xl">The list</h2>
          <ProductGrid products={items} priorityCount={3} />

          <div className="mt-16 border-t border-[var(--color-line)] pt-10">
            <h2 className="mb-6 text-2xl">Other lists</h2>
            <ul className="grid gap-4 md:grid-cols-3">
              {otherLists.map((other) => (
                <li key={other.slug} className="card p-5">
                  <Link href={`/lists/${other.slug}`} className="link-underline text-lg">
                    {other.title}
                  </Link>
                  <p className="mt-1 text-sm text-[var(--color-ink-soft)]">{other.subtitle}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
    </>
  );
}
