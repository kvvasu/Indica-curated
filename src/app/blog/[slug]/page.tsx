import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container, Section } from "@/components/Container";
import { EditorialBlocks } from "@/components/EditorialBlocks";
import { JsonLd } from "@/components/JsonLd";
import { PageIntro } from "@/components/PageIntro";
import { ProductGrid } from "@/components/ProductCard";
import { postBySlug, posts, productBySlug } from "@/lib/data";
import { buildMetadata, postArticleLd } from "@/lib/seo";
import { formatDate, readingTime } from "@/lib/utils";
import { site } from "@/lib/site";

type Params = Promise<{ slug: string }>;

// Every valid slug is known at build time, so unknown slugs return a real 404
// instead of an on-demand render (which would be a soft 404).
export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug.get(slug);
  if (!post) {
    return buildMetadata({ title: "Article not found", description: "", path: `/blog/${slug}`, noindex: true });
  }
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.published,
    modifiedTime: post.updated,
    keywords: post.tags,
  });
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = postBySlug.get(slug);
  if (!post) notFound();

  const related = post.relatedProducts
    .map((s) => productBySlug.get(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const words = post.blocks
    .map((b) => (b.type === "p" ? b.text : b.type === "list" ? b.items.join(" ") : ""))
    .join(" ");

  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={postArticleLd(post, `/blog/${post.slug}`)} />

      <PageIntro
        eyebrow={post.tags.join(" · ")}
        title={post.title}
        description={post.description}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      >
        <p className="mt-5 text-xs text-[var(--color-muted)]">
          By{" "}
          <Link href="/about#editor" className="link-underline">
            {post.author}
          </Link>
          , {site.author.role} · {formatDate(post.published)} · {readingTime(words)} min read
          {post.updated !== post.published && <> · updated {formatDate(post.updated)}</>}
        </p>
      </PageIntro>

      <Section className="py-10 md:py-14">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <article>
            <EditorialBlocks blocks={post.blocks} />

            <div className="mt-12 border-t border-[var(--color-line)] pt-8 text-sm text-[var(--color-ink-soft)]">
              <h2 className="text-xl">About the author</h2>
              <p className="mt-2 max-w-prose">
                {post.author} is {site.author.role} at {site.legalName} and writes about durable
                goods, small-space living and the economics of buying once.{" "}
                <Link href="/about#editor" className="link-underline">
                  More about the editorial process
                </Link>
                .
              </p>
            </div>
          </article>

          <aside className="grid gap-6 lg:sticky lg:top-24 lg:self-start">
            <div className="card p-5">
              <h2 className="text-lg">More articles</h2>
              <ul className="mt-3 grid gap-2 text-sm">
                {others.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`} className="link-underline">
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-5">
              <h2 className="text-lg">Keep reading</h2>
              <ul className="mt-3 grid gap-2 text-sm">
                <li>
                  <Link href="/guides" className="link-underline">
                    Buying guides with specifications
                  </Link>
                </li>
                <li>
                  <Link href="/lists" className="link-underline">
                    Curated lists by purpose
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="link-underline">
                    How we choose what to list
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
          <Container>
            <h2 className="mb-8 text-3xl">Objects mentioned</h2>
            <ProductGrid products={related} />
          </Container>
        </Section>
      )}
    </>
  );
}
