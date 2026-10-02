import Link from "next/link";
import type { Metadata } from "next";
import { Container, Section } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";
import { FaqList } from "@/components/FaqList";
import { PageIntro } from "@/components/PageIntro";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact Marlowe — Corrections, Suggestions, Press",
  description:
    "Contact the Marlowe editorial team with corrections, product suggestions or press enquiries. We reply within two working days and make corrections on the page itself.",
  path: "/contact",
  keywords: ["contact", "editorial corrections", "product suggestion"],
});

const contactFaqs = [
  {
    q: "How quickly will I hear back?",
    a: "We aim to reply within two working days. Corrections are prioritised and are usually fixed the same week.",
  },
  {
    q: "Do you accept paid placements?",
    a: "No. Brands cannot pay for inclusion or for a favourable write-up. If you are a maker and think your product qualifies on the four criteria, an unpaid suggestion is very welcome.",
  },
  {
    q: "Can you review a product I make?",
    a: `Yes — email ${site.editorialEmail} with the material specifics, the warranty terms and a link to where spare parts are sold. We do not accept review units on the condition of coverage.`,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Get in touch"
        description="Corrections, product suggestions and press enquiries all come to the same inbox and are read by the editor."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />

      <Section className="py-10 md:py-14">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="text-3xl">Send a message</h2>
            <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
              Required fields are validated before sending. Nothing is submitted anywhere except our
              own inbox.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <aside className="grid h-fit gap-6">
            <div className="card p-6">
              <h2 className="text-xl">Direct details</h2>
              <dl className="mt-4 grid gap-3 text-sm">
                <div>
                  <dt className="eyebrow mb-1">General</dt>
                  <dd>
                    <a href={`mailto:${site.email}`} className="link-underline">
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-1">Editorial and corrections</dt>
                  <dd>
                    <a href={`mailto:${site.editorialEmail}`} className="link-underline">
                      {site.editorialEmail}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-1">Post</dt>
                  <dd>
                    <address className="not-italic text-[var(--color-ink-soft)]">
                      {site.legalName}
                      <br />
                      {site.contactAddress.street}
                      <br />
                      {site.contactAddress.city}, {site.contactAddress.region}{" "}
                      {site.contactAddress.postalCode}
                      <br />
                      {site.contactAddress.country}
                    </address>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="card p-6">
              <h2 className="text-xl">Before you write</h2>
              <ul className="mt-3 grid gap-2 text-sm text-[var(--color-ink-soft)]">
                <li>
                  For product questions, check the{" "}
                  <Link href="/guides" className="link-underline">
                    buying guides
                  </Link>{" "}
                  first — most specifications are covered there.
                </li>
                <li>
                  To suggest a product, include the warranty, the spare parts position and the
                  material that wears first.
                </li>
                <li>
                  For corrections, link the page and quote the sentence so we can fix it precisely.
                </li>
              </ul>
            </div>
          </aside>
        </Container>
      </Section>

      <Section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
        <Container className="max-w-3xl">
          <FaqList faqs={contactFaqs} heading="Contact questions" />
        </Container>
      </Section>
    </>
  );
}
