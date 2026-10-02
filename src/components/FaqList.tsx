import { JsonLd } from "@/components/JsonLd";
import { faqLd } from "@/lib/seo";
import { slugify } from "@/components/EditorialBlocks";

/**
 * Accessible FAQ accordion built on native <details>, so it works without
 * JavaScript and exposes the same questions to FAQPage structured data.
 */
export function FaqList({
  faqs,
  heading = "Frequently asked questions",
  emitStructuredData = true,
}: {
  faqs: { q: string; a: string }[];
  heading?: string;
  emitStructuredData?: boolean;
}) {
  if (faqs.length === 0) return null;

  return (
    <section aria-labelledby="faq-heading" className="mt-16">
      {emitStructuredData && <JsonLd data={faqLd(faqs)} />}
      <h2 id="faq-heading" className="text-2xl">
        {heading}
      </h2>
      <div className="mt-6 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
        {faqs.map((faq) => (
          <details key={faq.q} className="group py-4" id={slugify(faq.q)}>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-medium marker:content-none">
              <span>{faq.q}</span>
              <span
                aria-hidden="true"
                className="mt-1 shrink-0 text-[var(--color-muted)] transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 max-w-prose text-sm text-[var(--color-ink-soft)]">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
