import Link from "next/link";
import { buildQuery } from "@/lib/utils";

type Props = {
  basePath: string;
  current: number;
  totalPages: number;
  query?: Record<string, string | undefined>;
  /** Label announced to screen readers, e.g. "Product pages". */
  label?: string;
};

export function Pagination({ basePath, current, totalPages, query = {}, label = "Pages" }: Props) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - current) <= 1,
  );

  const hrefFor = (page: number) =>
    `${basePath}${buildQuery(query, { page: page === 1 ? undefined : String(page) })}`;

  return (
    <nav aria-label={label} className="mt-12 flex flex-wrap items-center justify-center gap-2">
      {current > 1 && (
        <Link rel="prev" href={hrefFor(current - 1)} className="chip">
          Previous
        </Link>
      )}
      {pages.map((page, i) => (
        <span key={page} className="flex items-center gap-2">
          {i > 0 && pages[i - 1] !== page - 1 && (
            <span aria-hidden="true" className="px-1 text-[var(--color-muted)]">
              …
            </span>
          )}
          <Link
            href={hrefFor(page)}
            aria-current={page === current ? "page" : undefined}
            className="chip"
          >
            <span className="sr-only">Page </span>
            {page}
          </Link>
        </span>
      ))}
      {current < totalPages && (
        <Link rel="next" href={hrefFor(current + 1)} className="chip">
          Next
        </Link>
      )}
    </nav>
  );
}
