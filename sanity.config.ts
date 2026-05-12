import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "@/sanity/schemaTypes";
import {
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
} from "@/sanity/env";

export default defineConfig({
  name: "alr_career_consulting",
  title: "ALR Career Consulting",
  projectId: sanityProjectId || "missing-project-id",
  dataset: sanityDataset || "production",
  apiVersion: sanityApiVersion,
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
