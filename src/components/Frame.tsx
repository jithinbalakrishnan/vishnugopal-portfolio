import type { CSSProperties } from "react";

type FrameProps = {
  /** Placeholder label shown until a real image is dropped in; null hides it. */
  label?: string | null;
  tone?: string;
  /** Any CSS aspect-ratio value, e.g. "4 / 3" or "16 / 9". */
  ratio?: string;
  className?: string;
  rounded?: boolean;
};

/**
 * Stand-in for project imagery. Swap the inner markup for next/image once the
 * real assets (or Sanity) are wired up — the sizing lives here, not at the
 * call site.
 */
export default function Frame({
  label,
  tone = "#efefef",
  ratio = "4 / 3",
  className = "",
  rounded = false,
}: FrameProps) {
  const style: CSSProperties = { aspectRatio: ratio, backgroundColor: tone };

  return (
    <div
      style={style}
      className={`relative w-full overflow-hidden ${
        rounded ? "rounded-sm" : ""
      } ${className}`}
    >
      {label !== null && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-heading text-[10px] tracking-[0.3em] text-black/25 uppercase">
            {label ?? "Image"}
          </span>
        </div>
      )}
    </div>
  );
}
