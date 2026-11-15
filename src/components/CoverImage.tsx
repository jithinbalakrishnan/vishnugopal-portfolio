import Image from "next/image";
import Frame from "@/components/Frame";
import { urlFor } from "@/sanity/image";
import type { SanityImage } from "@/sanity/types";

type CoverImageProps = {
  image?: SanityImage | null;
  /** Shown on the placeholder while no image has been uploaded. */
  label?: string | null;
  tone?: string;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Renders the Sanity image when one exists, and falls back to the toned
 * placeholder when the field is still empty.
 */
export default function CoverImage({
  image,
  label,
  tone = "#efefef",
  ratio = "4 / 3",
  sizes = "(min-width: 768px) 50vw, 100vw",
  priority = false,
  className = "",
}: CoverImageProps) {
  if (!image?.asset) {
    return <Frame label={label} tone={tone} ratio={ratio} className={className} />;
  }

  const lqip = image.asset.metadata?.lqip;

  // Crop to the rendered aspect ratio so the hotspot set in the Studio is
  // honoured, and the browser never downloads pixels it will crop away.
  const [rw, rh] = ratio.split("/").map((n) => Number.parseFloat(n.trim()));
  const width = 2000;
  const height = Math.round((width * rh) / rw);

  return (
    <div
      style={{ aspectRatio: ratio, backgroundColor: tone }}
      className={`relative w-full overflow-hidden ${className}`}
    >
      <Image
        src={urlFor(image).width(width).height(height).fit("crop").url()}
        alt={image.alt ?? label ?? ""}
        fill
        sizes={sizes}
        priority={priority}
        placeholder={lqip ? "blur" : "empty"}
        blurDataURL={lqip}
        className="object-cover"
      />
    </div>
  );
}
