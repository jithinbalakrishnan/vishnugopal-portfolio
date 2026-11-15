import type { Metadata } from "next";
import Frame from "@/components/Frame";
import ProjectCard from "@/components/ProjectCard";
import { FadeIn, Reveal } from "@/components/Motion";
import { getAllProjects, getSettings } from "@/sanity/data";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: "Portfolio",
    description: `Selected work by ${settings?.name ?? ""}.`,
  };
}

export default async function PortfolioPage() {
  const [settings, projects] = await Promise.all([
    getSettings(),
    getAllProjects(),
  ]);

  const categories = Array.from(
    new Set(projects.map((p) => p.category).filter(Boolean)),
  );

  return (
    <>
      {/* Cover */}
      <section className="relative">
        <FadeIn y={0}>
          <Frame label={null} tone="#f1f1f1" ratio="16 / 9" />
        </FadeIn>

        <div className="pointer-events-none absolute inset-0">
          <div className="mx-auto flex h-full max-w-[1400px] flex-col justify-center px-6 md:px-10 lg:px-16">
            <FadeIn delay={0.2}>
              <p className="font-heading text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] font-semibold tracking-tight">
                Portfolio
              </p>
              <p className="font-heading text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] font-semibold tracking-tight text-foreground/15">
                2026
              </p>
              {settings?.role && (
                <p className="mt-6 font-sans text-sm tracking-wide text-foreground/60">
                  {settings.role}
                </p>
              )}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-[1400px] px-6 pt-20 md:px-10 md:pt-32 lg:px-16">
        <Reveal>
          <p className="font-sans text-[11px] tracking-[0.25em] text-muted uppercase">
            Hi, I&rsquo;m
          </p>
          <h1 className="mt-4 font-heading text-[clamp(1.75rem,5vw,3.25rem)] leading-tight font-medium tracking-tight">
            {settings?.name}
          </h1>
          {settings?.bio && (
            <p className="mt-8 max-w-[52ch] font-sans text-[15px] leading-relaxed text-muted md:text-base">
              {settings.bio}
            </p>
          )}
        </Reveal>

        {categories.length > 0 && (
          <Reveal delay={0.1} className="mt-12">
            <ul className="flex flex-wrap gap-x-3 gap-y-2">
              {categories.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-line px-4 py-1.5 font-sans text-[12px] text-muted"
                >
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </section>

      {/* All work */}
      <section className="mx-auto max-w-[1400px] px-6 pt-24 md:px-10 md:pt-36 lg:px-16">
        <Reveal>
          <div className="flex items-baseline justify-between border-b border-line pb-5">
            <h2 className="font-heading text-[clamp(1.25rem,2.5vw,1.75rem)] font-medium tracking-tight">
              All <span className="text-muted">Work</span>
            </h2>
            <span className="font-sans text-[11px] tracking-[0.2em] text-muted uppercase">
              {projects.length} projects
            </span>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-x-8 gap-y-16 md:mt-16 md:grid-cols-2 md:gap-y-24">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 0.08}>
              <ProjectCard project={project} priority={i < 2} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
