import { getTranslations, setRequestLocale } from "next-intl/server";
import { FinalCta } from "@/components/ui/FinalCta";
import { PageHero } from "@/components/ui/PageHero";
import { getProject, projectName } from "@/data/projects";
import { services } from "@/data/services";
import { Link } from "@/i18n/navigation";
import { pageMetadata, resolveLocale, type LocaleParams } from "@/lib/page";

export async function generateMetadata({ params }: LocaleParams) {
  return pageMetadata((await params).locale, "services");
}

export default async function ServicesPage({ params }: LocaleParams) {
  const locale = resolveLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });

  return (
    <>
      <PageHero label={t("label")} title={t("title")} body={t("body")} />
      <section className="on-light pb-[var(--section-y)]">
        <div className="wrap">
          {services.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              className="grid-12 gap-y-6 border-b border-[var(--rule)] py-[clamp(3rem,7vw,6rem)]"
            >
              <p aria-hidden className="label col-span-12 md:col-span-3">
                0{i + 1}
              </p>
              <div className="col-span-12 md:col-span-9">
                <h2 className="type-title reveal max-w-[20ch]">{s.title[locale]}</h2>
                <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
                  <p className="type-lead reveal">{s.detail[locale]}</p>
                  <div className="reveal space-y-8">
                    <div>
                      <h3 className="label">{t("includes")}</h3>
                      <ul className="mt-3 space-y-1">
                        {s.includes[locale].map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="label">{t("seeWork")}</h3>
                      <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                        {s.work.map((slug) => {
                          const project = getProject(slug);
                          if (!project) return null;
                          return (
                            <li key={slug}>
                              <Link href={`/work/${slug}`} className="link-line inline-block py-1">
                                {projectName(project, locale)}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <FinalCta />
    </>
  );
}
