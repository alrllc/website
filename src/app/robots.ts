import type { MetadataRoute } from "next";
import { getSiteContent } from "@/lib/site-content";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const content = await getSiteContent();
  const siteUrl = content.seo.siteUrl.replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/studio", "/api"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
