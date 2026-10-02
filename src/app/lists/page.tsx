import Link from "next/link";
import type { Metadata } from "next";
import { Container, Section } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { PageIntro } from "@/components/PageIntro";
import { collections } from "@/lib/data";
import { buildMetadata, collectionPageLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Curated Lists — Small Sets With One Purpose",
  description:
    "Six curated lists — a quiet desk, a small kitchen, a reading corner and more. Each list is a small, explained set of objects with a single purpose.",
  path: "/lists",
  keywords: ["curated lists", "desk setup", "small kitchen kit", "everyday carry list"],
});

export default function ListsPage() {
  return (
    <>
      <JsonLd
        data={collectionPageLd({
          name: "Curated lists",
          description: "Small, purpose-built sets of objects.",
          path: "/lists",
          items: collections.map((c) => ({ name: c.title, path: `/lists/${c.slug}` })),
        })}
      />

      <PageIntro
        eyebrow="Lists"
        title="Small sets, each with one job"
        description="A list is more useful than a category when you are solving a specific problem — a quiet desk, a small kitchen, a reading corner. Each one explains why the pieces were chosen together."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Lists", path: "/lists" },
        ]}
      />

      <Section className="py-10 md:py-14">
        <Container>
          <ul className="grid gap-6 md:grid-cols-2">
            {collections.map((list) => (
              <li key={list.slug}>
                <article className="card flex h-full flex-col gap-3 p-6 md:p-8">
                  <p className="eyebrow">
                    {list.productSlugs.length} objects · curated by {list.curator}
                  </p>
                  <h2 className="text-2xl md:text-3xl">
                    <Link href={`/lists/${list.slug}`} className="link-underline">
                      {list.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-[var(--color-ink-soft)]">{list.description}</p>
                  <p className="mt-auto text-xs text-[var(--color-muted)]">
                    Updated {formatDate(list.updated)}
                  </p>
                  <Link href={`/lists/${list.slug}`} className="link-underline text-sm">
                    Open the list
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
