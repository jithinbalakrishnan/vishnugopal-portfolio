import Link from "next/link";
import CoverImage from "@/components/CoverImage";
import type { ProjectCard as ProjectCardType } from "@/sanity/types";

export default function ProjectCard({
  project,
  ratio = "4 / 3",
  priority = false,
}: {
  project: ProjectCardType;
  ratio?: string;
  priority?: boolean;
}) {
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <div className="overflow-hidden">
        <div className="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]">
          <CoverImage
            image={project.coverImage}
            label={project.title}
            tone={project.tone}
            ratio={ratio}
            priority={priority}
          />
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <div>
          <h3 className="font-heading text-[15px] font-medium tracking-tight">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="mt-1 font-sans text-[13px] text-muted">
              {project.subtitle}
            </p>
          )}
        </div>
        {project.year && (
          <span className="shrink-0 font-sans text-[11px] tracking-[0.2em] text-muted uppercase">
            {project.year}
          </span>
        )}
      </div>
    </Link>
  );
}
