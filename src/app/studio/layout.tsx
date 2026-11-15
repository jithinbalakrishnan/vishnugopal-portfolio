/**
 * The Studio renders its own chrome, so it skips the site header and footer.
 */
export default function StudioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
