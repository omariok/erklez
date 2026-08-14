import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { projectId, dataset, sanityEnabled } from "./env";

const builder = sanityEnabled ? imageUrlBuilder({ projectId, dataset }) : null;

// Строит оптимизированный URL картинки из Sanity.
export function urlForImage(source: SanityImageSource, width = 1200): string {
  if (!builder) return "";
  return builder.image(source).width(width).auto("format").url();
}
