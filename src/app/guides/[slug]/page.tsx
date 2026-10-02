import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container, Section } from "@/components/Container";
import { EditorialBlocks } from "@/components/EditorialBlocks";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageIntro } from "@/components/PageIntro";
import { ProductGrid } from "@/components/ProductCard";
import { categoryBySlug, guides, guideBySlug, productBySlug } from "@/lib/data";
import { buildMetadata, faqLd, guideArticleLd, itemListLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { site } from "@/lib/site";

type Params = Promise<{ slug: string }>;

// Every valid slug is known at build time, so unknown slugs return a real 404
// instead of an on-demand render (which would be a soft 404).
export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const guide = guideBySlug.get(slug);
  if (!guide) {
    return buildMetadata({ title: "Guide not found", description: "", path: `/guides/${slug}`, noindex: true });
  }
  return buildMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    type: "article",
    publishedTime: guide.published,
    modifiedTime: guide.updated,
    keywords: [guide.title, "buying guide", ...guide.relatedCategories],
  });
}

export default async function GuidePage({ params }: { params: Params }) {
  const { slug } = await params;
  const guide = guideBySlug.get(slug);
  if (!guide) notFound();

  const relatedProducts = guide.relatedProducts
    .map((s) => productBySlug.get(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const relatedCategories = guide.relatedCategories
    .map((s) => categoryBySlug.get(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const otherGuides = guides.filter((g) => g.slug !== guide.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          guideArticleLd(guide, `/guides/${guide.slug}`),
          faqLd(guide.faqs),
          itemListLd(
            `Products in ${guide.title}`,
            relatedProducts.map((p) => ({ name: p.name, path: `/products/${p.slug}` })),
          ),
        ]}
      />

      <PageIntro
        eyebrow={guide.intent}
        title={guide.title}
        description={guide.description}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: guide.title, path: `/guides/${guide.slug}` },
        ]}
      >
        <p className="mt-5 text-xs text-[var(--color-muted)]">
          By{" "}
          <Link href="/about#editor" className="link-underline">
            {guide.author}
          </Link>
          , {site.author.role} · published {formatDate(guide.published)} · updated{" "}
          {formatDate(guide.updated)}
        </p>
      </PageIntro>

      <Section className="py-10 md:py-14">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <article>
            {/* Answer-first summary, repeated in the FAQ structured data below. */}
            <div className="border-l-2 border-[var(--color-accent)] bg-[var(--color-surface)] p-5 md:p-6">
              <h2 className="text-sm uppercase tracking-[0.14em] text-[var(--color-muted)]">
                The short answer
              </h2>
              <p className="mt-3 text-lg leading-relaxed">{guide.answer}</p>
            </div>

            <div className="mt-10">
              <EditorialBlocks blocks={guide.blocks} />
            </div>

            <FaqList faqs={guide.faqs} heading="Frequently asked questions" emitStructuredData={false} />

            <div className="mt-12 border-t border-[var(--color-line)] pt-8 text-sm text-[var(--color-ink-soft)]">
              <h2 className="text-xl">Editorial note</h2>
              <p className="mt-2 max-w-prose">
                This guide was written and last reviewed by {guide.author}, {site.author.role} at{" "}
                {site.legalName}. It is re-checked every quarter and whenever a referenced product is
                discontinued. Spotted an error?{" "}
                <Link href="/contact" className="link-underline">
                  Tell us
                </Link>{" "}
                and we will correct the page and update the date.
              </p>
            </div>
          </article>

          <aside className="grid gap-6 lg:sticky lg:top-24 lg:self-start">
            <div className="card p-5">
              <h2 className="text-lg">On this page</h2>
              <ul className="mt-3 grid gap-2 text-sm">
                {guide.blocks
                  .filter((b) => b.type === "h2")
                  .map((b) => (
                    <li key={b.text}>
                      <a
                        href={`#${b.text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-")}`}
                        className="link-underline"
                      >
                        {b.text}
                      </a>
                    </li>
                  ))}
                <li>
                  <a href="#faq-heading" className="link-underline">
                    Frequently asked questions
                  </a>
                </li>
              </ul>
            </div>

            {relatedCategories.length > 0 && (
              <div className="card p-5">
                <h2 className="text-lg">Related categories</h2>
                <ul className="mt-3 grid gap-2 text-sm">
                  {relatedCategories.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/categories/${c.slug}`} className="link-underline">
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="card p-5">
              <h2 className="text-lg">More guides</h2>
              <ul className="mt-3 grid gap-2 text-sm">
                {otherGuides.map((g) => (
                  <li key={g.slug}>
                    <Link href={`/guides/${g.slug}`} className="link-underline">
                      {g.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Container>
      </Section>

      {relatedProducts.length > 0 && (
        <Section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
          <Container>
            <h2 className="mb-8 text-3xl">Products referenced in this guide</h2>
            <ProductGrid products={relatedProducts} />
          </Container>
        </Section>
      )}
    </>
  );
}
