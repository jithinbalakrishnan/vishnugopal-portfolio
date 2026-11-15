/**
 * The mark, rebuilt from the supplied PNG as a single even-odd path: the three
 * dots and the flag are holes, not white shapes, so the page colour shows
 * through them. Combined with currentColor that means one file works on a
 * white page, a near-black page, or anything else.
 *
 * Geometry is measured from the original artwork — disc r=140.5 at (140.5,
 * 140.5), dots r=18.75 at y=134 spaced 47 apart, flag spanning (180..238,
 * 86..117) in a 281x281 box.
 */
export default function Logo({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 281 281"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M140.5 0A140.5 140.5 0 1 1 140.5 281 140.5 140.5 0 1 1 140.5 0ZM56.5 115.25a18.75 18.75 0 1 0 0 37.5 18.75 18.75 0 1 0 0-37.5ZM103.5 115.25a18.75 18.75 0 1 0 0 37.5 18.75 18.75 0 1 0 0-37.5ZM150.5 115.25a18.75 18.75 0 1 0 0 37.5 18.75 18.75 0 1 0 0-37.5ZM187 88 238 86 234 113 180 117Z"
      />
    </svg>
  );
}
