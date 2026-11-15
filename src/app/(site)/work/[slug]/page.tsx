import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CoverImage from "@/components/CoverImage";
import { FadeIn, Reveal } from "@/components/Motion";
import { getAllProjects, getProject, getProjectSlugs } from "@/sanity/data";

type Params = { slug: string };

// The whole page is driven by the slug, so render it as a blocking route
// rather than splitting an instant shell out of it.
export const instant = false;

export async function generateStaticParams(): Promise<Params[]> {
  return getProjectSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const all = await getAllProjects();
  const index = all.findIndex((p) => p.slug === slug);
  const next = all[(index + 1) % all.length] ?? null;

  const meta = [
    { label: "Client", value: project.client },
    { label: "Category", value: project.category },
    { label: "Year", value: project.year },
    { label: "Role", value: project.role },
  ].filter((m) => Boolean(m.value));

  return (
    <article>
      {/* Title block */}
      <header className="mx-auto max-w-[1400px] px-6 pt-16 md:px-10 md:pt-28 lg:px-16">
        <FadeIn>
          <Link
            href="/portfolio"
            className="font-sans text-[12px] tracking-wide text-muted transition-colors hover:text-foreground"
          >
            ← Back to portfolio
          </Link>

          <h1 className="mt-10 font-heading text-[clamp(2.5rem,8vw,6rem)] leading-[0.95] font-semibold tracking-tight">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="mt-4 max-w-[32ch] font-heading text-[clamp(1rem,2.5vw,1.5rem)] font-normal tracking-tight text-muted">
              {project.subtitle}
            </p>
          )}
        </FadeIn>
      </header>

      {/* Cover */}
      <div className="mt-14 md:mt-20">
        <FadeIn y={0} delay={0.1}>
          <CoverImage
            image={project.coverImage}
            label={`${project.title} — cover`}
            tone={project.tone}
            ratio="16 / 9"
            sizes="100vw"
            priority
          />
        </FadeIn>
      </div>

      {/* Meta + summary */}
      <section className="mx-auto max-w-[1400px] px-6 pt-20 md:px-10 md:pt-32 lg:px-16">
        <div className="grid gap-12 md:grid-cols-[260px_1fr] md:gap-20">
          <Reveal>
            <dl className="space-y-7 border-t border-line pt-8">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="font-sans text-[11px] tracking-[0.2em] text-muted uppercase">
                    {m.label}
                  </dt>
                  <dd className="mt-2 font-sans text-sm">{m.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.08}>
            {project.summary && (
              <p className="max-w-[50ch] font-heading text-[clamp(1.125rem,2.4vw,1.75rem)] leading-[1.4] font-normal tracking-tight">
                {project.summary}
              </p>
            )}

            <div className="mt-14 grid gap-10 sm:grid-cols-2">
              {project.challenge && (
                <div>
                  <h2 className="font-sans text-[11px] tracking-[0.2em] text-muted uppercase">
                    Challenge
                  </h2>
                  <p className="mt-3 font-sans text-[15px] leading-relaxed text-muted">
                    {project.challenge}
                  </p>
                </div>
              )}
              {project.approach && (
                <div>
                  <h2 className="font-sans text-[11px] tracking-[0.2em] text-muted uppercase">
                    Approach
                  </h2>
                  <p className="mt-3 font-sans text-[15px] leading-relaxed text-muted">
                    {project.approach}
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process sections */}
      {project.sections && project.sections.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-6 pt-28 md:px-10 md:pt-40 lg:px-16">
          <div className="space-y-24 md:space-y-36">
            {project.sections.map((section, i) => (
              <Reveal key={`${section.heading}-${i}`}>
                <CoverImage
                  image={section.image}
                  label={section.heading}
                  tone={section.tone}
                  ratio={i % 2 === 0 ? "16 / 9" : "4 / 3"}
                  sizes="(min-width: 1400px) 1400px, 100vw"
                />
                <div className="mt-6 grid gap-4 md:grid-cols-[260px_1fr] md:gap-20">
                  <h3 className="font-heading text-base font-medium tracking-tight">
                    {section.heading}
                  </h3>
                  {section.body && (
                    <p className="max-w-[50ch] font-sans text-[15px] leading-relaxed text-muted">
                      {section.body}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Outcome */}
      {project.outcome && (
        <section className="mx-auto max-w-[1400px] px-6 pt-28 md:px-10 md:pt-40 lg:px-16">
          <Reveal>
            <div className="grid gap-4 border-t border-line pt-10 md:grid-cols-[260px_1fr] md:gap-20">
              <h2 className="font-sans text-[11px] tracking-[0.2em] text-muted uppercase">
                Outcome
              </h2>
              <p className="max-w-[50ch] font-heading text-[clamp(1.125rem,2.2vw,1.5rem)] leading-[1.45] tracking-tight">
                {project.outcome}
              </p>
            </div>
          </Reveal>
        </section>
      )}

      {/* Next project */}
      {next && (
        <section className="mx-auto max-w-[1400px] px-6 pt-28 md:px-10 md:pt-40 lg:px-16">
          <Reveal>
            <Link href={`/work/${next.slug}`} className="group block">
              <p className="font-sans text-[11px] tracking-[0.2em] text-muted uppercase">
                Next project
              </p>
              <h2 className="mt-4 font-heading text-[clamp(2rem,6vw,4rem)] leading-none font-medium tracking-tight transition-opacity group-hover:opacity-50">
                {next.title}
              </h2>
              {next.subtitle && (
                <p className="mt-3 font-sans text-sm text-muted">
                  {next.subtitle}
                </p>
              )}
            </Link>
          </Reveal>
        </section>
      )}
    </article>
  );
}
