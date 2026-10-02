import Image from "next/image";
import Link from "next/link";
import { brandName, categoryName } from "@/lib/data";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <article className="card group flex h-full flex-col">
      <div className="relative aspect-[4/3] overflow-hidden border-b border-[var(--color-line)] bg-[var(--color-paper)]">
        <Link
          href={`/products/${product.slug}`}
          className="block h-full focus-visible:outline-offset-0"
          aria-label={`${product.name} by ${brandName(product.brand)}`}
        >
          <Image
            src={`/media/products/${product.art}.svg`}
            alt={`${product.name} — abstract illustration`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </Link>
        {/* Outside the link on purpose: an explicit aria-label overrides
            descendant text, so a visible badge inside the anchor would break
            WCAG 2.5.3 (label in name). */}
        {product.staffPick && (
          <span className="pointer-events-none absolute left-3 top-3 z-10 bg-[var(--color-ink)] px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-[var(--color-paper)]">
            Staff pick
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-muted)]">
          {brandName(product.brand)} · {categoryName(product.category)}
        </p>
        <h3 className="text-lg leading-snug">
          <Link href={`/products/${product.slug}`} className="link-underline">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 flex-1 text-sm text-[var(--color-ink-soft)]">{product.tagline}</p>
        <p className="mt-3 text-sm font-medium tabular-nums">
          {formatPrice(product.price, product.currency)}
        </p>
      </div>
    </article>
  );
}

export function ProductGrid({
  products,
  priorityCount = 0,
}: {
  products: Product[];
  priorityCount?: number;
}) {
  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, i) => (
        <li key={product.slug} className="h-full">
          <ProductCard product={product} priority={i < priorityCount} />
        </li>
      ))}
    </ul>
  );
}
