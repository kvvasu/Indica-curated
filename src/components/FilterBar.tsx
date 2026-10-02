import Link from "next/link";
import { categories } from "@/lib/data";
import { brands } from "@/lib/data";

type Props = {
  action: string;
  category?: string;
  brand?: string;
  sort?: string;
  /** When set, brand/category controls are hidden (used on scoped pages). */
  scope?: "all" | "category" | "brand";
  resultCount: number;
  sortOptions: { value: string; label: string }[];
};

/**
 * Filters and sorting as a plain GET form. It works without JavaScript,
 * produces shareable URLs and gives crawlers real links to follow.
 */
export function FilterBar({
  action,
  category = "",
  brand = "",
  sort = "featured",
  scope = "all",
  resultCount,
  sortOptions,
}: Props) {
  return (
    <form action={action} method="get" className="card mb-8 grid gap-4 p-4 md:p-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {scope === "all" && (
          <div>
            <label htmlFor="filter-category" className="eyebrow mb-2 block">
              Category
            </label>
            <select
              id="filter-category"
              name="category"
              defaultValue={category}
              className="w-full border border-[var(--color-line-strong)] bg-[var(--color-surface-strong)] px-3 py-2.5 text-sm"
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {scope !== "brand" && (
          <div>
            <label htmlFor="filter-brand" className="eyebrow mb-2 block">
              Brand
            </label>
            <select
              id="filter-brand"
              name="brand"
              defaultValue={brand}
              className="w-full border border-[var(--color-line-strong)] bg-[var(--color-surface-strong)] px-3 py-2.5 text-sm"
            >
              <option value="">All brands</option>
              {brands.map((b) => (
                <option key={b.slug} value={b.slug}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label htmlFor="filter-sort" className="eyebrow mb-2 block">
            Sort by
          </label>
          <select
            id="filter-sort"
            name="sort"
            defaultValue={sort}
            className="w-full border border-[var(--color-line-strong)] bg-[var(--color-surface-strong)] px-3 py-2.5 text-sm"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button type="submit" className="btn w-full sm:w-auto">
            Apply
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-line)] pt-3">
        <p className="text-xs text-[var(--color-muted)]" role="status">
          {resultCount} {resultCount === 1 ? "entry" : "entries"}
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href={action}
            className="chip"
            data-active={!category && !brand && sort === "featured" ? "true" : undefined}
          >
            Reset
          </Link>
          {scope === "all" &&
            categories.slice(0, 5).map((c) => (
              <Link
                key={c.slug}
                href={`${action}?category=${c.slug}`}
                className="chip"
                data-active={category === c.slug ? "true" : undefined}
              >
                {c.name}
              </Link>
            ))}
        </div>
      </div>
    </form>
  );
}
