import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Служебные разделы не должны попадать в индекс.
      disallow: ["/studio", "/api"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    // Яндекс: директива Host — зеркало сайта, домен БЕЗ протокола и www.
    host: site.domain,
  };
}
