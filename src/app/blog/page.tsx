import Link from "next/link";
import type { Metadata } from "next";
import { Container, Section } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { PageIntro } from "@/components/PageIntro";
import { posts } from "@/lib/data";
import { buildMetadata, collectionPageLd } from "@/lib/seo";
import { formatDate, readingTime } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Blog — Notes on Buying Well",
  description:
    "Editorial notes from Marlowe on durability, repairability and the economics of buying once, written by a named editor with dates and sources.",
  path: "/blog",
  keywords: ["buying well", "repairability editorial", "durability blog"],
});

export default function BlogPage() {
  const sorted = [...posts].sort((a, b) => b.published.localeCompare(a.published));

  return (
    <>
      <JsonLd
        data={collectionPageLd({
          name: "Marlowe blog",
          description: "Editorial notes on durability and repair.",
          path: "/blog",
          items: sorted.map((p) => ({ name: p.title, path: `/blog/${p.slug}` })),
        })}
      />

      <PageIntro
        eyebrow="Blog"
        title="Notes on buying well"
        description="Short, opinionated essays about durability, repair and the objects that survive trends. Every article carries an author, a publication date and an update date."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />

      <Section className="py-10 md:py-14">
        <Container>
          <ul className="grid gap-6 md:grid-cols-2">
            {sorted.map((post) => {
              const words = post.blocks
                .map((b) => (b.type === "p" ? b.text : b.type === "list" ? b.items.join(" ") : ""))
                .join(" ");
              return (
                <li key={post.slug}>
                  <article className="card flex h-full flex-col p-6 md:p-8">
                    <p className="eyebrow mb-3">{post.tags.join(" · ")}</p>
                    <h2 className="text-2xl">
                      <Link href={`/blog/${post.slug}`} className="link-underline">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-3 flex-1 text-sm text-[var(--color-ink-soft)]">
                      {post.description}
                    </p>
                    <p className="mt-4 border-t border-[var(--color-line)] pt-3 text-xs text-[var(--color-muted)]">
                      {formatDate(post.published)} · {readingTime(words)} min read · {post.author}
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
