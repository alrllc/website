import { createClient } from "@sanity/client";
import content from "../src/content/site-content.json" with { type: "json" };

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in the environment.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-01",
  useCdn: false,
});

await client.createOrReplace({
  _id: "siteSettings",
  _type: "siteSettings",
  ...content,
});

console.log("Seeded Sanity siteSettings document.");
