import type { Metadata } from "next";
import CoverImage from "@/components/CoverImage";
import { Reveal } from "@/components/Motion";
import { getEntries, getSettings } from "@/sanity/data";
import type { TimelineEntry } from "@/sanity/types";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: "About",
    description: `About ${settings?.name ?? ""}.`,
  };
}

function Timeline({ items }: { items: TimelineEntry[] }) {
  return (
    <ul className="mt-10">
      {items.map((item, i) => (
        <Reveal key={`${item.title}-${i}`} delay={i * 0.06}>
          <li className="grid gap-3 border-t border-line py-7 md:grid-cols-[150px_1fr] md:gap-10">
            <div className="flex gap-2 font-sans text-[12px] tracking-wide text-muted md:flex-col md:gap-1">
              <span>{item.from}</span>
              <span className="md:hidden">—</span>
              <span>{item.to}</span>
            </div>
            <div>
              <h3 className="font-heading text-base font-medium tracking-tight">
                {item.title}
              </h3>
              <p className="mt-1 font-sans text-sm text-muted">
                {[item.company, item.place].filter(Boolean).join(" · ")}
              </p>
            </div>
          </li>
        </Reveal>
      ))}
    </ul>
  );
}

export default async function AboutPage() {
  const [settings, entries] = await Promise.all([getSettings(), getEntries()]);

  const experience = entries.filter((e) => e.kind === "experience");
  const education = entries.filter((e) => e.kind === "education");
  const capabilities = settings?.capabilities ?? [];
  const firstName = settings?.name?.split(" ")[0] ?? "";

  return (
    <div className="mx-auto max-w-[1400px] px-6 pt-16 md:px-10 md:pt-24 lg:px-16">
      <section className="grid gap-12 md:grid-cols-[minmax(0,380px)_1fr] md:gap-20">
        <Reveal>
          <CoverImage
            image={settings?.portrait}
            label="Portrait"
            tone="#e9e9e9"
            ratio="3 / 4"
            sizes="(min-width: 768px) 380px, 100vw"
            priority
          />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="font-sans text-[11px] tracking-[0.25em] text-muted uppercase">
            Hi
          </p>

          <h1 className="mt-5 max-w-[20ch] font-heading text-[clamp(1.75rem,4.5vw,3rem)] leading-[1.15] font-medium tracking-tight">
            I&rsquo;m {firstName}
            {settings?.role ? ` — an ${settings.role}` : ""}{" "}
            {settings?.location && (
              <span className="text-muted">based in {settings.location}.</span>
            )}
          </h1>

          {settings?.bio && (
            <div className="mt-10 max-w-[56ch] font-sans text-[15px] leading-relaxed text-muted md:text-base">
              <p>{settings.bio}</p>
            </div>
          )}
        </Reveal>
      </section>

      {experience.length > 0 && (
        <section className="pt-28 md:pt-40">
          <Reveal>
            <h2 className="font-heading text-[clamp(1.25rem,2.5vw,1.75rem)] font-medium tracking-tight">
              Experience
            </h2>
          </Reveal>
          <Timeline items={experience} />
        </section>
      )}

      {education.length > 0 && (
        <section className="pt-24 md:pt-32">
          <Reveal>
            <h2 className="font-heading text-[clamp(1.25rem,2.5vw,1.75rem)] font-medium tracking-tight">
              Education
            </h2>
          </Reveal>
          <Timeline items={education} />
        </section>
      )}

      {capabilities.length > 0 && (
        <section className="pt-24 md:pt-32">
          <Reveal>
            <h2 className="font-heading text-[clamp(1.25rem,2.5vw,1.75rem)] font-medium tracking-tight">
              Capabilities
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="mt-10 grid gap-y-4 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
              {capabilities.map((c) => (
                <li key={c} className="font-sans text-sm text-muted">
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      )}
    </div>
  );
}
