import { products as allProducts } from "@/lib/data";
import type { Product } from "@/lib/types";
import { paginate } from "@/lib/utils";

export const PER_PAGE = 9;

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "recent", label: "Recently reviewed" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name", label: "Name: A–Z" },
] as const;

export type SortKey = (typeof SORT_OPTIONS)[number]["value"];

export function isSortKey(value: string | undefined): value is SortKey {
  return SORT_OPTIONS.some((o) => o.value === value);
}

export function sortProducts(list: Product[], sort: SortKey): Product[] {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price || a.featuredRank - b.featuredRank);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price || a.featuredRank - b.featuredRank);
    case "name":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case "recent":
      return copy.sort((a, b) => b.updated.localeCompare(a.updated));
    case "featured":
    default:
      return copy.sort((a, b) => a.featuredRank - b.featuredRank);
  }
}

export type CatalogQuery = {
  category?: string;
  brand?: string;
  sort?: string;
  page?: number;
  perPage?: number;
  /** Restrict the pool before filtering (e.g. a single category page). */
  pool?: Product[];
};

export function filterCatalog({
  category,
  brand,
  sort,
  page = 1,
  perPage = PER_PAGE,
  pool = allProducts,
}: CatalogQuery) {
  let list = pool;
  if (category) list = list.filter((p) => p.category === category);
  if (brand) list = list.filter((p) => p.brand === brand);
  const sorted = sortProducts(list, isSortKey(sort) ? sort : "featured");
  return paginate(sorted, page, perPage);
}

export function priceRange(list: Product[]) {
  if (list.length === 0) return { min: 0, max: 0 };
  const prices = list.map((p) => p.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}
