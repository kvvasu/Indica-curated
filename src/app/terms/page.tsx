import type { Metadata } from "next";
import { Container, Section } from "@/components/Container";
import { PageIntro } from "@/components/PageIntro";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use",
  description:
    "The terms that apply when you use Marlowe: accuracy of product information, reference pricing, affiliate disclosure, intellectual property and acceptable use.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Legal"
        title="Terms of use"
        description="The rules that apply when you read, search or subscribe on this site."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Terms", path: "/terms" },
        ]}
      />

      <Section className="py-10 md:py-14">
        <Container className="max-w-3xl">
          <div className="prose-editorial">
            <p className="eyebrow">Last updated 1 October 2026</p>

            <h2>Editorial content</h2>
            <p>
              Everything on this site is editorial opinion based on published specifications and
              hands-on use where stated. It is not professional advice, and it is not a guarantee
              that a product will suit your particular circumstances.
            </p>

            <h2>Reference pricing</h2>
            <p>
              Prices are recorded at the date shown on each entry and are for reference only. Prices
              change frequently, availability varies by region, and the maker or retailer&apos;s own
              page is always authoritative.
            </p>

            <h2>Affiliate disclosure</h2>
            <p>{site.affiliateDisclosure}</p>
            <p>
              Commission never changes what is listed, the order of results, or the wording of an
              entry. Where a product is not the right fit for a stated purpose, we say so even when
              it is the commission-bearing option.
            </p>

            <h2>Accuracy and corrections</h2>
            <p>
              We correct errors on the page and update the review date. If you believe something is
              inaccurate, email{" "}
              <a href={`mailto:${site.editorialEmail}`} className="link-underline">
                {site.editorialEmail}
              </a>{" "}
              with the page and the specific claim.
            </p>

            <h2>Intellectual property</h2>
            <p>
              All original text, the Marlowe name, the monogram and the generated artwork on this
              site are the property of {site.legalName}. Brand names and product names referenced in
              editorial content remain the property of their respective owners and are used for
              identification only. No brand imagery is reproduced or hotlinked.
            </p>

            <h2>Acceptable use</h2>
            <ul>
              <li>Do not scrape the site at a rate that degrades service for others.</li>
              <li>Do not republish substantial portions of the editorial content without credit.</li>
              <li>Do not use the contact form to send unsolicited commercial messages.</li>
            </ul>

            <h2>Limitation of liability</h2>
            <p>
              The site is provided as is. To the extent permitted by law, {site.legalName} is not
              liable for decisions made on the basis of the editorial content, or for the conduct of
              third-party sites reached by outbound links.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these terms:{" "}
              <a href={`mailto:${site.email}`} className="link-underline">
                {site.email}
              </a>
              .
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
