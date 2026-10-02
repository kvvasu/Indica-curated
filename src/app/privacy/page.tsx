import type { Metadata } from "next";
import { Container, Section } from "@/components/Container";
import { PageIntro } from "@/components/PageIntro";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Marlowe handles personal data: what the newsletter stores, how the contact form works, what analytics are used and how to request deletion.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        eyebrow="Legal"
        title="Privacy policy"
        description="A short, plain-language summary of the personal data this site handles and why."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy" },
        ]}
      />

      <Section className="py-10 md:py-14">
        <Container className="max-w-3xl">
          <div className="prose-editorial">
            <p className="eyebrow">Last updated 1 October 2026</p>

            <h2>What we collect</h2>
            <p>
              Two things only. If you subscribe, we store the email address you provide. If you use
              the contact form, we store your name, email address, chosen topic and message so we can
              reply.
            </p>

            <h2>Why we collect it</h2>
            <ul>
              <li>To send the weekly email you asked for, until you unsubscribe.</li>
              <li>To answer the message you sent us.</li>
              <li>To keep a record of corrections requested, so the same fix is not repeated.</li>
            </ul>

            <h2>What we do not do</h2>
            <ul>
              <li>We do not sell or rent personal data.</li>
              <li>We do not use tracking pixels in the newsletter.</li>
              <li>We do not build advertising profiles or run third-party ad networks.</li>
              <li>We do not set marketing cookies.</li>
            </ul>

            <h2>Outbound links and affiliates</h2>
            <p>{site.affiliateDisclosure}</p>
            <p>
              When you follow an outbound link, the destination site may set its own cookies under
              its own policy. We have no control over that and receive no personal data from it.
            </p>

            <h2>Retention</h2>
            <p>
              Newsletter addresses are kept until you unsubscribe or ask us to delete them. Contact
              messages are kept for twelve months and then deleted.
            </p>

            <h2>Your rights</h2>
            <p>
              You can ask for a copy of what we hold about you, ask for it to be corrected, or ask
              for it to be deleted. Email{" "}
              <a href={`mailto:${site.email}`} className="link-underline">
                {site.email}
              </a>{" "}
              and we will confirm within 30 days.
            </p>

            <h2>Hosting</h2>
            <p>
              The site is served as static output from a hosting provider. Server logs may record IP
              addresses for security and abuse prevention; those logs are short-lived and are not
              used for profiling.
            </p>

            <h2>Contact</h2>
            <p>
              {site.legalName}, {site.contactAddress.street}, {site.contactAddress.city},{" "}
              {site.contactAddress.region} {site.contactAddress.postalCode},{" "}
              {site.contactAddress.country}. Or email{" "}
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
