import { useLocale, useTranslations } from "next-intl";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { featuredProjects } from "@/data/projects";

/** Deliberately asymmetric columns; order comes from featuredOrder in projects.ts. */
const layout = [
  { className: "col-span-12", sizes: "100vw" },
  { className: "col-span-12 md:col-span-7", sizes: "(min-width: 768px) 58vw, 100vw" },
  {
    className: "col-span-12 md:col-span-5 md:mt-[clamp(4rem,12vw,11rem)]",
    sizes: "(min-width: 768px) 42vw, 100vw",
  },
  { className: "col-span-12 md:col-span-5", sizes: "(min-width: 768px) 42vw, 100vw" },
  {
    className: "col-span-12 md:col-span-7 md:mt-[clamp(3rem,8vw,7rem)]",
    sizes: "(min-width: 768px) 58vw, 100vw",
  },
];

export function FeaturedWork() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section className="on-light stack-over section">
      <div className="wrap">
        <SectionIntro label={t("home.work.label")} title={t("home.work.title")}>
          {t("home.work.body")}
        </SectionIntro>
        <div className="grid-12 mt-[clamp(3.5rem,7vw,6rem)] gap-y-14">
          {featuredProjects.map((project, i) => (
            <div
              key={project.slug}
              className={`reveal ${layout[i]?.className ?? "col-span-12 md:col-span-6"}`}
            >
              <ProjectCard
                project={project}
                locale={locale}
                categoryLabel={t(`categories.${project.category}`)}
                sizes={layout[i]?.sizes ?? "100vw"}
              />
            </div>
          ))}
        </div>
        <div className="mt-16 flex justify-end">
          <ButtonLink href="/work" variant="solid">
            {t("cta.viewAll")}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
