export { products, productBySlug, productsByCategory, productsByBrand } from "./products";
export { brands, brandBySlug } from "./brands";
export { categories, categoryBySlug } from "./categories";
export { collections, collectionBySlug } from "./collections";
export { guides, guideBySlug } from "./guides";
export { posts, postBySlug } from "./posts";

import { products } from "./products";
import { brands } from "./brands";
import { categories } from "./categories";
import type { Product } from "@/lib/types";

/** Products ordered for the "featured" sort across the site. */
export const featuredProducts: Product[] = [...products].sort(
  (a, b) => a.featuredRank - b.featuredRank,
);

export function brandName(slug: string): string {
  return brands.find((b) => b.slug === slug)?.name ?? slug;
}

export function categoryName(slug: string): string {
  return categories.find((c) => c.slug === slug)?.name ?? slug;
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);
  return products
    .map((p) => {
      const haystack = [
        p.name,
        p.tagline,
        p.description,
        p.tags.join(" "),
        brandName(p.brand),
        categoryName(p.category),
      ]
        .join(" ")
        .toLowerCase();
      const score = terms.reduce(
        (acc, term) => acc + (haystack.includes(term) ? 1 : 0),
        0,
      );
      return { p, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.p.featuredRank - b.p.featuredRank)
    .map((r) => r.p);
}
