import { createClient } from "@sanity/client";
import { existsSync, readFileSync } from "fs";
import content from "../src/content/site-content.json" with { type: "json" };

const envPath = new URL("../.env.local", import.meta.url);

if (existsSync(envPath)) {
  const envFile = readFileSync(envPath, "utf8");

  for (const line of envFile.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
      continue;
    }

    const [key, ...valueParts] = trimmed.split("=");
    process.env[key] ??= valueParts.join("=");
  }
}

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

function slug(value) {
  return (
    String(value || "item")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 32) || "item"
  );
}

function addKeys(value, path = "root") {
  if (Array.isArray(value)) {
    return value.map((item, index) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) {
        return item;
      }

      const keyedItem = Object.fromEntries(
        Object.entries(item).map(([key, nested]) => [
          key,
          addKeys(nested, `${path}-${key}`),
        ]),
      );

      return {
        _key:
          item._key ||
          `${slug(item.title || item.word || path)}-${String(index + 1)}`,
        ...keyedItem,
      };
    });
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nested]) => [
        key,
        addKeys(nested, `${path}-${key}`),
      ]),
    );
  }

  return value;
}

await client.createOrReplace({
  _id: "siteSettings",
  _type: "siteSettings",
  ...addKeys(content),
});

console.log("Seeded Sanity siteSettings document.");
