import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image } from "sanity";
import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * Callers set width/height and fit, so the hotspot and crop set in the Studio
 * are applied server side rather than being thrown away by CSS cropping.
 */
export function urlFor(source: Image) {
  return builder.image(source).auto("format");
}
