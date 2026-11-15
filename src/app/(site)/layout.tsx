import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSettings } from "@/sanity/data";

/** Everything except the Studio gets the site header and footer. */
export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSettings();

  return (
    <>
      <Header name={settings?.name ?? ""} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </>
  );
}
