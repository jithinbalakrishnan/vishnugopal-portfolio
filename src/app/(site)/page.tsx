import Link from "next/link";
import CoverImage from "@/components/CoverImage";
import ProjectCard from "@/components/ProjectCard";
import { FadeIn, Reveal, WordReveal } from "@/components/Motion";
import { getFeaturedProjects, getSettings } from "@/sanity/data";

export default async function Home() {
  const [settings, featured] = await Promise.all([
    getSettings(),
    getFeaturedProjects(),
  ]);

  return (
    <>
      {/* Hero image */}
      <section className="px-0">
        <FadeIn y={0}>
          <CoverImage
            image={settings?.heroImage}
            label="Hero image"
            tone="#1a1a1a"
            ratio="21 / 9"
            sizes="100vw"
            priority
          />
        </FadeIn>
      </section>

      {/* Intro line + bio */}
      <section className="mx-auto max-w-[1400px] px-6 pt-16 md:px-10 md:pt-24 lg:px-16">
        <h1 className="max-w-[22ch] font-heading text-[clamp(2rem,6vw,4.25rem)] leading-[1.08] font-medium tracking-tight">
          {settings?.heroLead && (
            <WordReveal text={settings.heroLead} delay={0.1} />
          )}{" "}
          {settings?.heroTrail && (
            <span className="text-muted">
              <WordReveal text={settings.heroTrail} delay={0.35} />
            </span>
          )}
        </h1>

        {settings?.bio && (
          <Reveal delay={0.1} className="mt-12 md:mt-20">
            <p className="max-w-[46ch] font-sans text-[15px] leading-relaxed text-muted md:text-base">
              {settings.bio}
            </p>
          </Reveal>
        )}
      </section>

      {/* Featured projects */}
      <section className="mx-auto max-w-[1400px] px-6 pt-28 md:px-10 md:pt-40 lg:px-16">
        <Reveal>
          <h2 className="font-heading text-[clamp(1.25rem,2.5vw,1.75rem)] font-medium tracking-tight">
            Featured <span className="text-muted">Projects</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-x-8 gap-y-16 md:mt-16 md:grid-cols-2 md:gap-y-24">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 md:mt-24">
          <Link
            href="/portfolio"
            className="group inline-flex items-baseline gap-3 font-heading text-[clamp(1.25rem,3vw,2rem)] tracking-tight"
          >
            <span className="text-muted">Live :</span>
            <span className="relative font-medium">
              Portfolio 2026
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-foreground transition-all duration-500 group-hover:w-full" />
            </span>
          </Link>
        </Reveal>
      </section>
    </>
  );
}
