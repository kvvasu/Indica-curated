import Link from "next/link";
import type { Metadata } from "next";
import { Container, Section } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { PageIntro } from "@/components/PageIntro";
import { guides } from "@/lib/data";
import { buildMetadata, collectionPageLd } from "@/lib/seo";
import { formatDate, readingTime } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Buying Guides — Specifications That Actually Matter",
  description:
    "Practical buying guides for task lighting, desk setups, pour-over coffee gear and everyday carry bags, each written answer-first and updated on a published schedule.",
  path: "/guides",
  keywords: ["buying guides", "task lamp guide", "pour-over gear guide", "everyday carry guide"],
});

export default function GuidesPage() {
  return (
    <>
      <JsonLd
        data={collectionPageLd({
          name: "Buying guides",
          description: "Practical, specification-led buying guides.",
          path: "/guides",
          items: guides.map((g) => ({ name: g.title, path: `/guides/${g.slug}` })),
        })}
      />

      <PageIntro
        eyebrow="Guides"
        title="Buying guides with the specifications up front"
        description="Each guide opens with a direct answer, then explains the trade-offs with tables and specific numbers. Written by a named editor and reviewed on a published schedule."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
        ]}
      />

      <Section className="py-10 md:py-14">
        <Container>
          <ul className="grid gap-6">
            {guides.map((guide) => {
              const words = guide.blocks
                .map((b) => (b.type === "p" ? b.text : b.type === "list" ? b.items.join(" ") : ""))
                .join(" ");
              return (
                <li key={guide.slug}>
                  <article className="card p-6 md:p-8">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <h2 className="text-2xl md:text-3xl">
                        <Link href={`/guides/${guide.slug}`} className="link-underline">
                          {guide.title}
                        </Link>
                      </h2>
                      <span className="text-xs text-[var(--color-muted)]">
                        {readingTime(words)} min read
                      </span>
                    </div>
                    <p className="mt-3 max-w-3xl text-sm text-[var(--color-ink-soft)]">
                      {guide.description}
                    </p>
                    <p className="mt-4 border-t border-[var(--color-line)] pt-3 text-xs text-[var(--color-muted)]">
                      By {guide.author} · published {formatDate(guide.published)} · updated{" "}
                      {formatDate(guide.updated)}
                    </p>
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
