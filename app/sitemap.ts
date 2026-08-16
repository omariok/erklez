import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  // /privacy намеренно не включён: страница помечена noindex.
  return [{ url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 }];
}
