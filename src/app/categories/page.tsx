import Link from "next/link";
import type { Metadata } from "next";
import { Container, Section } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { PageIntro } from "@/components/PageIntro";
import { categories, products } from "@/lib/data";
import { buildMetadata, collectionPageLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Categories — Browse Objects by Use",
  description:
    "Deliberately narrow categories — audio, workspace, kitchen, lighting, watches, carry, textiles, paper and wellness — each explaining what we look for and why.",
  path: "/categories",
  keywords: ["product categories", "homeware categories", "kitchen lighting carry"],
});

export default function CategoriesPage() {
  return (
    <>
      <JsonLd
        data={collectionPageLd({
          name: "Categories",
          description: "Browse the Marlowe catalogue by category.",
          path: "/categories",
          items: categories.map((c) => ({ name: c.name, path: `/categories/${c.slug}` })),
        })}
      />

      <PageIntro
        eyebrow="Categories"
        title="Browse by what an object is for"
        description="Categories are narrow on purpose. A small set with clear criteria is easier to trust than a long list sorted by trend."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Categories", path: "/categories" },
        ]}
      />

      <Section className="py-10 md:py-14">
        <Container>
          <ul className="grid gap-6 md:grid-cols-2">
            {categories.map((category) => {
              const count = products.filter((p) => p.category === category.slug).length;
              return (
                <li key={category.slug}>
                  <article className="card flex h-full flex-col gap-3 p-6">
                    <div className="flex items-baseline justify-between gap-4">
                      <h2 className="text-2xl">
                        <Link href={`/categories/${category.slug}`} className="link-underline">
                          {category.name}
                        </Link>
                      </h2>
                      <span className="text-xs text-[var(--color-muted)]">{count} entries</span>
                    </div>
                    <p className="text-sm text-[var(--color-ink-soft)]">{category.description}</p>
                    <ul className="mt-2 grid gap-1 text-sm text-[var(--color-ink-soft)]">
                      {category.faqs.slice(0, 1).map((f) => (
                        <li key={f.q} className="text-xs text-[var(--color-muted)]">
                          {f.q}
                        </li>
                      ))}
                    </ul>
                    <Link href={`/categories/${category.slug}`} className="link-underline mt-auto text-sm">
                      Explore {category.name}
                    </Link>
                  </article>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>
    </>
  );
}
