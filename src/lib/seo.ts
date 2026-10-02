import type { Metadata } from "next";
import { SITE_URL, site } from "@/lib/site";
import type { Guide, Post, Product } from "@/lib/types";
import { brandName, categoryName } from "@/lib/data";

export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type MetaInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "product";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  keywords?: string[];
  imageAlt?: string;
};

/**
 * Builds a consistent Metadata object: unique title, unique description,
 * canonical URL, Open Graph and Twitter tags, and robots directives.
 */
export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
  noindex = false,
  keywords,
  imageAlt,
}: MetaInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(title)}&kind=${type}`;
  const alt = imageAlt ?? title;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type: type === "product" ? "website" : type,
      images: [{ url: ogImage, width: 1200, height: 630, alt }],
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/* ---------------------------------- JSON-LD --------------------------------- */

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    alternateName: site.name,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/logo.svg"),
      width: 512,
      height: 512,
    },
    email: site.email,
    foundingDate: site.founded,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contactAddress.street,
      addressLocality: site.contactAddress.city,
      addressRegion: site.contactAddress.region,
      postalCode: site.contactAddress.postalCode,
      addressCountry: site.contactAddress.country,
    },
    sameAs: [site.social.instagram, site.social.pinterest],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "editorial",
        email: site.editorialEmail,
        availableLanguage: ["English"],
      },
    ],
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: SITE_URL,
    inLanguage: site.language,
    description: site.shortDescription,
    publisher: { "@type": "Organization", name: site.legalName, url: SITE_URL },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbLd(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function productLd(product: Product) {
  const brand = brandName(product.brand);
  const category = categoryName(product.category);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.slug,
    category,
    brand: { "@type": "Brand", name: brand },
    image: [absoluteUrl(`/media/products/${product.art}.svg`)],
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      availability: `https://schema.org/${product.availability ?? "InStock"}`,
      url: absoluteUrl(`/products/${product.slug}`),
    },
    additionalProperty: product.specs.map((s) => ({
      "@type": "PropertyValue",
      name: s.label,
      value: s.value,
    })),
  };
}

export function itemListLd(
  name: string,
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

export function collectionPageLd(input: {
  name: string;
  description: string;
  path: string;
  items: { name: string; path: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: { "@type": "WebSite", name: site.name, url: SITE_URL },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: input.items.length,
      itemListElement: input.items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        url: absoluteUrl(item.path),
      })),
    },
  };
}

export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleLd(input: {
  title: string;
  description: string;
  path: string;
  published: string;
  updated: string;
  author: string;
  section?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    datePublished: input.published,
    dateModified: input.updated,
    inLanguage: site.language,
    articleSection: input.section,
    author: {
      "@type": "Person",
      name: input.author,
      url: site.author.url,
      jobTitle: site.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: site.legalName,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: absoluteUrl("/logo.svg") },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(input.path) },
  };
}

export function guideArticleLd(guide: Guide, path: string) {
  return articleLd({
    title: guide.title,
    description: guide.description,
    path,
    published: guide.published,
    updated: guide.updated,
    author: guide.author,
    section: "Guides",
  });
}

export function postArticleLd(post: Post, path: string) {
  return articleLd({
    title: post.title,
    description: post.description,
    path,
    published: post.published,
    updated: post.updated,
    author: post.author,
    section: "Blog",
  });
}

export function howToLd(input: {
  name: string;
  description: string;
  path: string;
  steps: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    step: input.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text: s,
    })),
  };
}
