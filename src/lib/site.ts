/**
 * Central site configuration. Everything brand-level lives here so copy,
 * navigation and trust signals stay consistent across every page.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://marlowe.supply"
).replace(/\/$/, "");

export const site = {
  name: "Marlowe",
  legalName: "Marlowe Supply Co.",
  tagline: "Considered objects for everyday life",
  shortDescription:
    "A curated index of durable, well-made objects for the home, desk and kitchen.",
  description:
    "Marlowe is an independent, editorially curated index of durable, well-made objects for the home, desk, kitchen and everyday carry. Every entry is chosen by hand, described honestly and reviewed on a schedule we publish.",
  locale: "en_US",
  language: "en",
  founded: "2021",
  email: "hello@marlowe.supply",
  editorialEmail: "editors@marlowe.supply",
  contactAddress: {
    street: "18 Ossington Lane, Studio 4",
    city: "Toronto",
    region: "ON",
    postalCode: "M6J 2Y9",
    country: "CA",
  },
  social: {
    instagram: "https://instagram.com/marlowe.supply",
    pinterest: "https://pinterest.com/marlowe",
    // Update this address if you fork the project.
    email: "mailto:hello@marlowe.supply",
  },
  /** Human author responsible for the editorial content on the site. */
  author: {
    name: "Vasu Yadav",
    role: "Editor",
    bio: "Editor at Marlowe. Writes about durable goods, small-space living and the economics of buying once.",
    url: SITE_URL + "/about#editor",
  },
  /** How often the catalogue is reviewed — a trust signal we repeat in copy. */
  reviewCadence: "Every catalogue entry is re-reviewed each quarter.",
  affiliateDisclosure:
    "Some outbound links on this site are affiliate links. If you buy through one we may earn a small commission at no extra cost to you. Prices shown are for reference and can change.",
} as const;

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Discover", href: "/discover" },
  { label: "Products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Brands", href: "/brands" },
  { label: "Lists", href: "/lists" },
  { label: "Guides", href: "/guides" },
  { label: "Blog", href: "/blog" },
];

export const secondaryNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Search", href: "/search" },
];
