import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Rule: Never block a page from crawling (disallow) if it needs to be hidden via 'noindex'
// because search engine bots must be able to crawl the page to see the 'noindex' tag.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
