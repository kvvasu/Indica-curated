import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container, Section } from "@/components/Container";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageIntro } from "@/components/PageIntro";
import { ProductGrid } from "@/components/ProductCard";
import {
  brandBySlug,
  brandName,
  categoryBySlug,
  categoryName,
  collections,
  productBySlug,
  products,
} from "@/lib/data";
import { buildMetadata, productLd } from "@/lib/seo";
import { formatDate, formatPrice } from "@/lib/utils";
import { site } from "@/lib/site";

type Params = Promise<{ slug: string }>;

// Every valid slug is known at build time, so unknown slugs return a real 404
// instead of an on-demand render (which would be a soft 404).
export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug.get(slug);
  if (!product) return buildMetadata({ title: "Product not found", description: "", path: `/products/${slug}`, noindex: true });

  return buildMetadata({
    title: `${product.name} by ${brandName(product.brand)} — Review & Specs`,
    description: `${product.tagline} ${product.description.slice(0, 110)}…`,
    path: `/products/${product.slug}`,
    type: "product",
    modifiedTime: product.updated,
    imageAlt: product.name,
    keywords: [product.name, brandName(product.brand), categoryName(product.category), ...product.tags],
  });
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = productBySlug.get(slug);
  if (!product) notFound();

  const brand = brandBySlug.get(product.brand);
  const category = categoryBySlug.get(product.category);
  const related = products
    .filter((p) => p.slug !== product.slug && (p.category === product.category || p.brand === product.brand))
    .sort((a, b) => a.featuredRank - b.featuredRank)
    .slice(0, 3);

  const inLists = collections.filter((c) => c.productSlugs.includes(product.slug));

  const productFaqs = [
    {
      q: `Is the ${product.name} repairable?`,
      a: product.tags.includes("repairable") || product.tags.includes("standard-parts")
        ? `Yes. ${brandName(product.brand)} supplies spare parts for this product, and the listing above names the parts that are replaceable.`
        : product.tags.includes("serviceable-movement")
          ? `The case is not user-serviceable, but the movement is mechanical and can be serviced by a watchmaker rather than replaced as a sealed module. Confirm the current warranty terms with ${brandName(product.brand)} before buying.`
          : `Partially. ${brandName(product.brand)} supports the consumable parts listed in the specifications, but the core assembly is not designed to be opened.`,
    },
    {
      q: `What warranty does the ${product.name} carry?`,
      a: `${
        product.specs.find((s) => s.label.toLowerCase().includes("warranty"))?.value ??
        "The manufacturer's standard warranty applies."
      } We recommend keeping the receipt; warranty handling is done by the brand, not by Marlowe.`,
    },
    {
      q: `How was the ${product.name} selected for the catalogue?`,
      a: `It passed all four selection criteria: repairability with real spare parts, a five-year useful life, specific and verifiable material claims, and a price that reflects construction rather than branding. It is re-reviewed every quarter.`,
    },
    {
      q: `Is the price on this page current?`,
      a: `The price shown (${formatPrice(product.price, product.currency)}) is a reference figure recorded at the last review on ${formatDate(product.updated)}. Prices change, and the retailer's page is always authoritative.`,
    },
  ];

  return (
    <>
      <JsonLd data={productLd(product)} />

      <PageIntro
        eyebrow={`${brandName(product.brand)} · ${categoryName(product.category)}`}
        title={product.name}
        description={product.tagline}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: product.name, path: `/products/${product.slug}` },
        ]}
      />

      <Section className="py-10 md:py-14">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden border border-[var(--color-line)]">
              <Image
                src={`/media/products/${product.art}.svg`}
                alt={`${product.name} by ${brandName(product.brand)} — abstract artwork`}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-xs text-[var(--color-muted)]">
              Artwork is original to Marlowe and generated from deterministic geometry; it is not a
              photograph of the product.
            </p>

            <div className="prose-editorial mt-10">
              <h2>Why this made the catalogue</h2>
              <p>{product.description}</p>
              <h2>Care and ownership</h2>
              <p>
                {product.tags.includes("washable")
                  ? "This piece is washable, which is rare for its category and is the main reason it ages well. Follow the care note in the specifications rather than improvising."
                  : product.tags.includes("repairable")
                    ? "Wear parts are named in the specifications and sold by the brand, so the object can be kept in service rather than replaced."
                    : product.tags.includes("serviceable-movement")
                      ? "Keep the case away from solvents, rinse it with fresh water if it meets salt or sweat, and have the movement serviced every five to seven years. A mechanical caliber is a service item, not a consumable."
                      : "Store it dry and handle it as a tool rather than a display piece; the specifications list the material that will show wear first."}
              </p>
              <h2>What to check before buying</h2>
              <ul>
                <li>Confirm the size and finish variants on the brand&apos;s own page.</li>
                <li>Check that the spare parts listed here are in stock in your region.</li>
                <li>Compare with the alternatives below before deciding.</li>
              </ul>
            </div>

            <FaqList faqs={productFaqs} heading={`${product.name}: common questions`} />
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start" aria-label="Product summary">
            <div className="card p-6">
              <p className="eyebrow mb-2">Reference price</p>
              <p className="text-3xl tabular-nums">{formatPrice(product.price, product.currency)}</p>
              <p className="mt-2 text-xs text-[var(--color-muted)]">
                Recorded {formatDate(product.updated)}. {site.affiliateDisclosure}
              </p>

              <dl className="mt-6 grid gap-3 border-t border-[var(--color-line)] pt-6 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-[var(--color-muted)]">Brand</dt>
                  <dd>
                    <Link href={`/brands/${product.brand}`} className="link-underline">
                      {brandName(product.brand)}
                    </Link>
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[var(--color-muted)]">Category</dt>
                  <dd>
                    <Link href={`/categories/${product.category}`} className="link-underline">
                      {categoryName(product.category)}
                    </Link>
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[var(--color-muted)]">Last reviewed</dt>
                  <dd>{formatDate(product.updated)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[var(--color-muted)]">Staff pick</dt>
                  <dd>{product.staffPick ? "Yes" : "No"}</dd>
                </div>
                {product.availability && product.availability !== "InStock" && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-[var(--color-muted)]">Availability</dt>
                    <dd className="text-right">
                      {product.availability === "PreOrder"
                        ? "Pre-order"
                        : "Batch release — check before ordering"}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="card mt-6 p-6">
              <h2 className="text-xl">Specifications</h2>
              <dl className="mt-4 grid gap-3 text-sm">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between gap-4 border-b border-[var(--color-line)] pb-3 last:border-0 last:pb-0">
                    <dt className="text-[var(--color-muted)]">{spec.label}</dt>
                    <dd className="text-right">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {brand && (
              <div className="card mt-6 p-6">
                <h2 className="text-xl">About {brand.name}</h2>
                <p className="mt-2 text-sm text-[var(--color-ink-soft)]">{brand.description}</p>
                <p className="mt-3 text-xs text-[var(--color-muted)]">
                  {brand.origin} · founded {brand.founded}
                </p>
                <Link href={`/brands/${brand.slug}`} className="link-underline mt-4 inline-block text-sm">
                  More from {brand.name}
                </Link>
              </div>
            )}

            {category && (
              <div className="card mt-6 p-6">
                <h2 className="text-xl">Buying help</h2>
                <p className="mt-2 text-sm text-[var(--color-ink-soft)]">{category.description}</p>
                <Link href={`/categories/${category.slug}`} className="link-underline mt-4 inline-block text-sm">
                  Read the {category.name} category guide
                </Link>
              </div>
            )}

            {inLists.length > 0 && (
              <div className="card mt-6 p-6">
                <h2 className="text-xl">Appears in</h2>
                <ul className="mt-3 grid gap-2 text-sm">
                  {inLists.map((list) => (
                    <li key={list.slug}>
                      <Link href={`/lists/${list.slug}`} className="link-underline">
                        {list.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
          <Container>
            <h2 className="mb-8 text-3xl">Alternatives to consider</h2>
            <ProductGrid products={related} />
          </Container>
        </Section>
      )}
    </>
  );
}
