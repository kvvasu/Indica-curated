import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Search results and API routes are excluded: the same information is
 * available on permanent, canonical pages, so letting crawlers index query
 * URLs would create thin duplicates.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/search"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
