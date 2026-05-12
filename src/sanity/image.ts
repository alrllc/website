import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image } from "sanity";
import { sanityClient } from "@/sanity/client";

const builder = sanityClient ? createImageUrlBuilder(sanityClient) : null;

export type SanityImageValue = Image & {
  alt?: string;
};

export function urlForImage(image?: SanityImageValue | null) {
  if (!builder || !image?.asset) {
    return null;
  }

  return builder.image(image);
}
