import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";
import { categories } from "@/lib/data";
import { primaryNav, secondaryNav, site } from "@/lib/site";

const legalNav = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Guides", href: "/guides" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-[var(--color-line)] bg-[var(--color-surface)]">
      <div className="wrap py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-[family-name:var(--font-display)] text-2xl">{site.name}</p>
            <p className="mt-2 max-w-sm text-sm text-[var(--color-ink-soft)]">
              {site.shortDescription} {site.reviewCadence}
            </p>
            <div className="mt-6 max-w-sm">
              <NewsletterForm compact />
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="eyebrow mb-3">Explore</h2>
            <ul className="grid gap-2 text-sm">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer categories">
            <h2 className="eyebrow mb-3">Categories</h2>
            <ul className="grid gap-2 text-sm">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/categories/${c.slug}`} className="link-underline">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer information">
            <h2 className="eyebrow mb-3">Information</h2>
            <ul className="grid gap-2 text-sm">
              {[...secondaryNav, ...legalNav].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={site.social.email} className="link-underline">
                  Email
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 grid gap-4 border-t border-[var(--color-line)] pt-6 text-xs text-[var(--color-muted)]">
          <p className="max-w-3xl">{site.affiliateDisclosure}</p>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p>
              © {year} {site.legalName}. All rights reserved.
            </p>
            <p>
              Contact:{" "}
              <a href={`mailto:${site.email}`} className="link-underline">
                {site.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
