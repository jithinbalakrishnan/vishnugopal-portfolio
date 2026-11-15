import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSettings } from "@/sanity/data";

export default async function NotFound() {
  const settings = await getSettings();

  return (
    <>
      <Header name={settings?.name ?? ""} />
      <main className="flex-1">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start px-6 py-40 md:px-10 lg:px-16">
          <p className="font-sans text-[11px] tracking-[0.25em] text-muted uppercase">
            404
          </p>
          <h1 className="mt-5 font-heading text-[clamp(2rem,6vw,4rem)] leading-tight font-medium tracking-tight">
            This page doesn&rsquo;t exist.
          </h1>
          <Link
            href="/"
            className="mt-10 font-sans text-sm underline underline-offset-4 transition-opacity hover:opacity-60"
          >
            Back home
          </Link>
        </div>
      </main>
      <Footer settings={settings} />
    </>
  );
}
