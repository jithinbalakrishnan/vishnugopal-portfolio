import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { Reveal } from "@/components/Motion";
import { getSettings } from "@/sanity/data";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: "Contact",
    description: `Get in touch with ${settings?.name ?? ""}.`,
  };
}

export default async function ContactPage() {
  const settings = await getSettings();
  const socials = settings?.socials ?? [];

  return (
    <div className="mx-auto max-w-[1400px] px-6 pt-24 md:px-10 md:pt-40 lg:px-16">
      <Reveal>
        <h1 className="max-w-[18ch] font-heading text-[clamp(1.75rem,4.5vw,3rem)] leading-[1.2] font-medium tracking-tight">
          If you&rsquo;re interested in any form of collaboration, drop a line at{" "}
          {settings?.email && (
            <a
              href={`mailto:${settings.email}`}
              className="text-muted transition-colors hover:text-foreground"
            >
              {settings.email}
            </a>
          )}
        </h1>
      </Reveal>

      <section className="grid gap-12 pt-28 md:grid-cols-2 md:gap-20 md:pt-40">
        <Reveal>
          <h2 className="font-heading text-[clamp(1.25rem,2.5vw,1.75rem)] font-medium tracking-tight">
            Or send me a message
          </h2>

          <dl className="mt-12 space-y-8">
            {settings?.location && (
              <div>
                <dt className="font-sans text-[11px] tracking-[0.2em] text-muted uppercase">
                  Now at
                </dt>
                <dd className="mt-2 font-sans text-sm">{settings.location}</dd>
              </div>
            )}
            {settings?.phone && (
              <div>
                <dt className="font-sans text-[11px] tracking-[0.2em] text-muted uppercase">
                  Phone
                </dt>
                <dd className="mt-2 font-sans text-sm">
                  <a
                    href={`tel:${settings.phone.replace(/[^+\d]/g, "")}`}
                    className="transition-opacity hover:opacity-60"
                  >
                    {settings.phone}
                  </a>
                </dd>
              </div>
            )}
            {socials.length > 0 && (
              <div>
                <dt className="font-sans text-[11px] tracking-[0.2em] text-muted uppercase">
                  Elsewhere
                </dt>
                <dd className="mt-2 flex gap-6">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="font-sans text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {s.label}
                    </a>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </section>
    </div>
  );
}
