import { NextResponse, type NextRequest } from "next/server";
import { categories } from "@/lib/data/categories";
import { brands } from "@/lib/data/brands";
import { products } from "@/lib/data/products";
import { collections } from "@/lib/data/collections";
import { guides } from "@/lib/data/guides";
import { posts } from "@/lib/data/posts";

/**
 * Rejects unknown detail-page slugs before rendering.
 *
 * Category and brand pages read `searchParams`, which makes Next render them
 * dynamically. In that streaming path a `notFound()` thrown inside the page
 * arrives after the status line has been sent, producing a soft 404 (HTTP 200
 * with not-found content). Validating here — before any rendering — keeps the
 * status code honest, which matters for crawlers and for link checkers.
 */
const knownSlugs: Record<string, Set<string>> = {
  products: new Set(products.map((p) => p.slug)),
  categories: new Set(categories.map((c) => c.slug)),
  brands: new Set(brands.map((b) => b.slug)),
  lists: new Set(collections.map((c) => c.slug)),
  guides: new Set(guides.map((g) => g.slug)),
  blog: new Set(posts.map((p) => p.slug)),
};

export function middleware(request: NextRequest) {
  const segments = request.nextUrl.pathname.split("/").filter(Boolean);

  if (segments.length === 2) {
    const [section, slug] = segments;
    const set = knownSlugs[section];
    if (set && !set.has(slug)) {
      const url = request.nextUrl.clone();
      url.pathname = "/_not-found";
      url.search = "";
      return NextResponse.rewrite(url, { status: 404 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/products/:path*",
    "/categories/:path*",
    "/brands/:path*",
    "/lists/:path*",
    "/guides/:path*",
    "/blog/:path*",
  ],
};
