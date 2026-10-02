import Link from "next/link";
import type { Metadata } from "next";
import { Container, Section } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { PageIntro } from "@/components/PageIntro";
import { brands, products } from "@/lib/data";
import { buildMetadata, collectionPageLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Brands — Makers Who Sell Spare Parts",
  description:
    "Twelve independent makers listed on Marlowe, with their origin, founding year and specific repair or spares commitment stated for each.",
  path: "/brands",
  keywords: ["independent makers", "repairable brands", "design studios"],
});

export default function BrandsPage() {
  const sorted = [...brands].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <JsonLd
        data={collectionPageLd({
          name: "Brands",
          description: "Independent makers listed in the Marlowe catalogue.",
          path: "/brands",
          items: sorted.map((b) => ({ name: b.name, path: `/brands/${b.slug}` })),
        })}
      />

      <PageIntro
        eyebrow="Brands"
        title="Makers with a stated repair commitment"
        description="We list the origin, founding year and the specific commitment each maker makes about spare parts, repair or service. Vague quality claims are not enough to appear here."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Brands", path: "/brands" },
        ]}
      />

      <Section className="py-10 md:py-14">
        <Container>
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sorted.map((brand) => {
              const count = products.filter((p) => p.brand === brand.slug).length;
              return (
                <li key={brand.slug}>
                  <article className="card flex h-full flex-col gap-3 p-6">
                    <div>
                      <h2 className="text-2xl">
                        <Link href={`/brands/${brand.slug}`} className="link-underline">
                          {brand.name}
                        </Link>
                      </h2>
                      <p className="mt-1 text-xs text-[var(--color-muted)]">
                        {brand.origin} · est. {brand.founded} · {count}{" "}
                        {count === 1 ? "entry" : "entries"}
                      </p>
                    </div>
                    <p className="text-sm text-[var(--color-ink-soft)]">{brand.description}</p>
                    <p className="mt-auto border-t border-[var(--color-line)] pt-3 text-xs text-[var(--color-ink-soft)]">
                      <span className="eyebrow mr-2">Commitment</span>
                      {brand.ethos}
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
