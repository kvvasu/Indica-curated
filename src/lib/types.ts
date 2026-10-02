export type Product = {
  slug: string;
  name: string;
  brand: string; // brand slug
  category: string; // category slug
  price: number; // in whole currency units
  currency: "USD";
  tagline: string;
  description: string;
  specs: { label: string; value: string }[];
  tags: string[];
  staffPick?: boolean;
  /** Lower number = higher placement in the featured ordering. */
  featuredRank: number;
  updated: string; // ISO date
  /** Deterministic seed for the generated artwork. */
  art: number;
};

export type Brand = {
  slug: string;
  name: string;
  origin: string;
  founded: string;
  focus: string;
  description: string;
  story: string[];
  ethos: string;
};

export type Category = {
  slug: string;
  name: string;
  short: string;
  description: string;
  intro: string[];
  faqs: { q: string; a: string }[];
};

export type Collection = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  intro: string[];
  productSlugs: string[];
  curator: string;
  updated: string;
};

export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] };

export type Guide = {
  slug: string;
  title: string;
  description: string;
  /** Short answer-first summary rendered directly under the H1. */
  answer: string;
  intent: string;
  published: string;
  updated: string;
  author: string;
  blocks: GuideBlock[];
  faqs: { q: string; a: string }[];
  relatedProducts: string[];
  relatedCategories: string[];
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  published: string;
  updated: string;
  author: string;
  tags: string[];
  blocks: GuideBlock[];
  relatedProducts: string[];
};
