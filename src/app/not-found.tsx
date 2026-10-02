import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SearchForm } from "@/components/SearchForm";
import { categories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page does not exist. Browse the catalogue, or search for an object.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container className="py-20 md:py-28">
      <p className="eyebrow mb-4">404</p>
      <h1 className="max-w-2xl text-4xl md:text-5xl">That page does not exist</h1>
      <p className="mt-4 max-w-xl text-[var(--color-ink-soft)]">
        The link may be old, or the entry may have been removed because the product was discontinued
        or its spare parts stopped being sold.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/products" className="btn">
          Browse all products
        </Link>
        <Link href="/" className="btn btn-ghost">
          Back to the homepage
        </Link>
      </div>

      <div className="mt-12 max-w-xl">
        <SearchForm />
      </div>

      <div className="mt-10">
        <h2 className="eyebrow mb-3">Popular categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link key={c.slug} href={`/categories/${c.slug}`} className="chip">
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
