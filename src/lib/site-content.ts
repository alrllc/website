import { promises as fs } from "fs";
import path from "path";
import defaultContent from "@/content/site-content.json";
import { sanityClient } from "@/sanity/client";

export type SiteContent = typeof defaultContent;

const contentPath = path.join(process.cwd(), "src", "content", "site-content.json");

export async function getSiteContent(): Promise<SiteContent> {
  if (sanityClient) {
    const sanityContent = await sanityClient.fetch<SiteContent | null>(
      `*[_type == "siteSettings"][0]{
        brand,
        seo,
        hero,
        heroPanel,
        servicesIntro,
        services,
        servicePaths,
        journey,
        expectations,
        vision,
        about,
        cta,
        contact
      }`,
      {},
      { next: { revalidate: 30 } },
    );

    if (sanityContent) {
      return sanityContent;
    }
  }

  try {
    const file = await fs.readFile(contentPath, "utf8");
    return JSON.parse(file) as SiteContent;
  } catch {
    return defaultContent;
  }
}

export async function saveSiteContent(content: SiteContent) {
  await fs.writeFile(contentPath, `${JSON.stringify(content, null, 2)}\n`);
}
