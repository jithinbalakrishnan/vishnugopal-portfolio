import Link from "next/link";
import CoverImage from "@/components/CoverImage";
import ProjectCard from "@/components/ProjectCard";
import { FadeIn, Reveal, WordReveal } from "@/components/Motion";
import { getFeaturedProjects, getSettings } from "@/sanity/data";

/**
 * Splits "Hello, I'm Vishnu Gopal. I design" into the sentence and whatever
 * trails it, so a phone can break between the two rather than stranding a
 * lone "I" at the end of the first line. Returns the whole string as the
 * first part when there is no sentence break to use.
 */
function splitAtSentence(text: string): [string, string] {
  const match = text.match(/^([\s\S]*?[.!?])\s+([\s\S]+)$/);
  return match ? [match[1], match[2]] : [text, ""];
}

const WORD_STAGGER = 0.035;
const wordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

export default async function Home() {
  const [settings, featured] = await Promise.all([
    getSettings(),
    getFeaturedProjects(),
  ]);

  const [leadSentence, leadRest] = splitAtSentence(settings?.heroLead ?? "");
  const restDelay = 0.1 + wordCount(leadSentence) * WORD_STAGGER;
  const trailDelay = restDelay + wordCount(leadRest) * WORD_STAGGER;

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
        {/* Two size curves. Below md the text scales with the viewport so the
            name always fits one line — a fixed minimum here is what used to
            split it on a phone. The cap of 2.75rem lands within 2px of what the
            md curve starts at, so the handover at the breakpoint is invisible.
            The headline always breaks after the first sentence, so the line
            never ends on a stranded "I". */}
        <h1 className="max-w-[22ch] font-heading text-[clamp(1.5rem,7.2vw,2.75rem)] leading-[1.08] font-medium tracking-tight md:text-[clamp(2rem,6vw,4.25rem)]">
          {leadSentence && <WordReveal text={leadSentence} delay={0.1} />}{" "}
          {leadRest && (
            <>
              <br />
              <WordReveal text={leadRest} delay={restDelay} />{" "}
            </>
          )}
          {settings?.heroTrail && (
            <span className="text-muted">
              <WordReveal text={settings.heroTrail} delay={trailDelay} />
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
