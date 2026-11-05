import { getTranslations, setRequestLocale } from "next-intl/server";
import { WorkFilter, type WorkItem } from "@/components/portfolio/WorkFilter";
import { FinalCta } from "@/components/ui/FinalCta";
import { PageHero } from "@/components/ui/PageHero";
import { categoryIds, projectName, projects } from "@/data/projects";
import { pageMetadata, resolveLocale, type LocaleParams } from "@/lib/page";

export async function generateMetadata({ params }: LocaleParams) {
  return pageMetadata((await params).locale, "work");
}

export default async function WorkPage({ params }: LocaleParams) {
  const locale = resolveLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  const items: WorkItem[] = projects.map((p) => ({
    slug: p.slug,
    name: projectName(p, locale),
    category: p.category,
    categoryLabel: t(`categories.${p.category}`),
    image: p.hero.src,
    alt: p.hero.alt[locale],
    summary: p.summary[locale],
  }));

  const countLabels: Record<string, string> = {
    all: t("work.count", { count: projects.length }),
  };
  for (const id of categoryIds) {
    countLabels[id] = t("work.count", {
      count: projects.filter((p) => p.category === id).length,
    });
  }

  return (
    <>
      <PageHero label={t("work.label")} title={t("work.title")} body={t("work.body")} />
      <section className="on-light pb-[var(--section-y)] pt-[clamp(2.5rem,5vw,4rem)]">
        <div className="wrap">
          <WorkFilter
            items={items}
            categories={categoryIds.map((id) => ({ id, label: t(`categories.${id}`) }))}
            allLabel={t("work.all")}
            filterLabel={t("work.filterLabel")}
            countLabels={countLabels}
            emptyLabel={t("work.empty")}
          />
        </div>
      </section>
      <FinalCta />
    </>
  );
}
