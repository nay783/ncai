import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { projectName, type Project } from "@/data/projects";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";

type Props = {
  project: Project;
  locale: Locale;
  categoryLabel: string;
  sizes: string;
};

export function ProjectCard({ project, locale, categoryLabel, sizes }: Props) {
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <div className="shot relative aspect-[16/10]">
        <Image
          src={project.hero.src}
          alt={project.hero.alt[locale]}
          fill
          sizes={sizes}
          className="object-cover object-top"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-display text-[clamp(1.25rem,2vw,1.75rem)] leading-tight">
            {projectName(project, locale)}
          </h3>
          <p className="label mt-2">{categoryLabel}</p>
        </div>
        <ArrowUpRight
          aria-hidden
          size={24}
          strokeWidth={1.25}
          className="shrink-0 transition-transform duration-500 ease-editorial group-hover:-translate-y-1 group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}
