import Link from "next/link";
import type { Metadata } from "next";
import { Container, Section } from "@/components/Container";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageIntro } from "@/components/PageIntro";
import { buildMetadata, faqLd, organizationLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "About Marlowe — Editorial Standards and Methodology",
  description:
    "How Marlowe works: the four selection criteria, the quarterly review process, the named editor, how corrections are handled and how affiliate links are disclosed.",
  path: "/about",
  keywords: ["editorial standards", "product selection methodology", "about Marlowe"],
});

const aboutFaqs = [
  {
    q: "Who writes Marlowe?",
    a: `Marlowe is written and maintained by ${site.author.name}, ${site.author.role}. There is no sponsored placement and no ghostwritten content.`,
  },
  {
    q: "Can brands pay to be listed?",
    a: "No. Brands cannot pay for inclusion, for a better position, or for a positive write-up. Affiliate commission exists on some outbound links but never changes what is listed or how it is ordered.",
  },
  {
    q: "How do you handle corrections?",
    a: "Corrections are made on the page itself and the updated date is changed. If a correction changes the substance of a recommendation, we say so in the entry rather than editing silently.",
  },
  {
    q: "How current is the catalogue?",
    a: "Every entry is re-reviewed each quarter. Discontinued products, or products whose spare parts are no longer sold, are removed rather than left as dead listings.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[organizationLd(), faqLd(aboutFaqs)]} />

      <PageIntro
        eyebrow="About"
        title="An index, not a shop"
        description="Marlowe exists to answer one question well: which objects are worth owning for a long time, and what specifically makes them that way."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />

      <Section className="py-10 md:py-14">
        <Container className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="prose-editorial max-w-3xl">
            <h2>What this site is</h2>
            <p>
              Marlowe is a small, independently run catalogue of durable, repairable objects. Every
              entry states the warranty, whether spare parts are sold, the material that will wear
              first, and a reference price recorded at the last review.
            </p>
            <p>
              There is no inventory and no checkout. When you want an object, you follow the link to
              the maker or a retailer. That keeps the incentive where it belongs: on describing
              products accurately rather than on moving stock.
            </p>

            <h2>The four selection criteria</h2>
            <ul>
              <li>
                <strong>Repairability.</strong> Wear parts must be named, and spare parts must
                actually be sold. A verbal commitment is not enough.
              </li>
              <li>
                <strong>Five-year usefulness.</strong> The object must still work and still make
                sense in five years, without a subscription or an app.
              </li>
              <li>
                <strong>Verifiable claims.</strong> Materials, weights and specifications must be
                specific enough to check.
              </li>
              <li>
                <strong>Honest pricing.</strong> The price should buy construction rather than
                branding.
              </li>
            </ul>

            <h2>What we reject</h2>
            <p>
              Sealed batteries with no replacement path, proprietary cables, features locked behind
              an account, and products whose only proposition is a finish or a colourway. We also
              reject anything where the maker will not publish basic facts such as material or
              weight.
            </p>

            <h2 id="editor">The editor</h2>
            <p>
              <strong>{site.author.name}</strong> — {site.author.role}. {site.author.bio}
            </p>
            <p>
              The editor is reachable directly at{" "}
              <a href={`mailto:${site.editorialEmail}`} className="link-underline">
                {site.editorialEmail}
              </a>{" "}
              for corrections, product suggestions and questions about the review process.
            </p>

            <h2>How the catalogue stays current</h2>
            <p>
              {site.reviewCadence} Each entry carries a last-reviewed date, and the{" "}
              <Link href="/products?sort=recent" className="link-underline">
                recently reviewed
              </Link>{" "}
              sort shows the most recent checks first. If a product is discontinued or its spare
              parts stop being available, the entry is removed.
            </p>

            <h2>How we make money</h2>
            <p>{site.affiliateDisclosure}</p>
            <p>
              Commission never determines inclusion, ordering or the wording of an entry. Where a
              product is not the best choice for a stated purpose, we say so even when it is the one
              that pays.
            </p>

            <h2>Accessibility and performance</h2>
            <p>
              The site is built with semantic HTML, works without JavaScript for navigation, search,
              filters and FAQs, ships system fonts to avoid third-party requests, and keeps
              client-side JavaScript to the two forms and the mobile menu. Keyboard focus is visible
              on every interactive element.
            </p>
          </div>

          <aside className="grid h-fit gap-6 lg:sticky lg:top-24">
            <div className="card p-5">
              <h2 className="text-lg">At a glance</h2>
              <dl className="mt-3 grid gap-2 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-[var(--color-muted)]">Founded</dt>
                  <dd>{site.founded}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[var(--color-muted)]">Editor</dt>
                  <dd>{site.author.name}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[var(--color-muted)]">Review cycle</dt>
                  <dd>Quarterly</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[var(--color-muted)]">Sponsored posts</dt>
                  <dd>None</dd>
                </div>
              </dl>
            </div>

            <div className="card p-5">
              <h2 className="text-lg">Contact</h2>
              <address className="mt-3 text-sm not-italic text-[var(--color-ink-soft)]">
                {site.legalName}
                <br />
                {site.contactAddress.street}
                <br />
                {site.contactAddress.city}, {site.contactAddress.region}{" "}
                {site.contactAddress.postalCode}
                <br />
                {site.contactAddress.country}
              </address>
              <p className="mt-3 text-sm">
                <a href={`mailto:${site.email}`} className="link-underline">
                  {site.email}
                </a>
              </p>
              <Link href="/contact" className="btn mt-4 w-full">
                Send a message
              </Link>
            </div>
          </aside>
        </Container>
      </Section>

      <Section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
        <Container className="max-w-3xl">
          <FaqList faqs={aboutFaqs} heading="Questions about the process" emitStructuredData={false} />
        </Container>
      </Section>
    </>
  );
}
