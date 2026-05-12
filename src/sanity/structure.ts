import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Website")
    .items([
      S.listItem()
        .id("websiteEditor")
        .title("Website Editor")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("ALR Website Content"),
        ),
    ]);
