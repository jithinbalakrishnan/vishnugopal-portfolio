import Link from "next/link";
import { copyrightYear, nav } from "@/lib/content";
import { Reveal } from "@/components/Motion";
import type { SiteSettings } from "@/sanity/types";

export default function Footer({ settings }: { settings: SiteSettings | null }) {
  const name = settings?.name ?? "";
  const email = settings?.email;
  const phone = settings?.phone;
  const socials = settings?.socials ?? [];

  return (
    <footer className="mt-32 border-t border-line md:mt-48">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-24 lg:px-16">
        <Reveal>
          <div className="grid gap-12 md:grid-cols-[1fr_auto] md:gap-16">
            <div>
              <p className="font-sans text-[11px] tracking-[0.25em] text-muted uppercase">
                Let&rsquo;s talk
              </p>

              {email && (
                <h2 className="mt-5 font-heading text-[clamp(1.75rem,5vw,3.25rem)] leading-[1.1] font-medium tracking-tight">
                  <a
                    href={`mailto:${email}`}
                    className="inline-block transition-opacity hover:opacity-50"
                  >
                    {email}
                  </a>
                </h2>
              )}

              <div className="mt-12 flex flex-wrap gap-x-20 gap-y-8">
                {settings?.location && (
                  <div>
                    <p className="font-sans text-[11px] tracking-[0.2em] text-muted uppercase">
                      Now at
                    </p>
                    <p className="mt-2 font-sans text-sm">{settings.location}</p>
                  </div>
                )}
                {phone && (
                  <div>
                    <p className="font-sans text-[11px] tracking-[0.2em] text-muted uppercase">
                      Phone
                    </p>
                    <a
                      href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                      className="mt-2 block font-sans text-sm transition-opacity hover:opacity-50"
                    >
                      {phone}
                    </a>
                  </div>
                )}
              </div>
            </div>

            <ul className="flex flex-col gap-3 md:items-end">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-sans text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="mt-20 flex flex-col gap-3 border-t border-line pt-8 text-[11px] tracking-wide text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {copyrightYear} {name}. All rights reserved.
          </p>
          <nav className="flex gap-6">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
