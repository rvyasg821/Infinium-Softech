import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import seo from "@/content/seo.json";
import { PRODUCT_ITEMS } from "@/data/productsData";

type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = Object.entries(seo.routes);
  const staticSitemapItems: MetadataRoute.Sitemap = [];

  for (const [path, data] of routes) {
    if (path.includes("[")) continue; // skip unparsed dynamic tokens

    const routePath = path === "/" ? "" : path;
    staticSitemapItems.push({
      url: `${SITE_URL}${routePath}`,
      lastModified: new Date(),
      changeFrequency: (data.changeFrequency || "weekly") as ChangeFrequency,
      priority: data.priority ?? 0.7,
    });
  }

  const dynamicProductItems: MetadataRoute.Sitemap = PRODUCT_ITEMS.map((prod) => ({
    url: `${SITE_URL}/products/${prod.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as ChangeFrequency,
    priority: 0.8,
  }));

  return [...staticSitemapItems, ...dynamicProductItems];
}
