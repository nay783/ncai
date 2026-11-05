import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ExternalButton } from "@/components/ui/ButtonLink";
import { FinalCta } from "@/components/ui/FinalCta";
import { getProject, nextProject, projectName, projects } from "@/data/projects";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { resolveLocale } from "@/lib/page";
import { alternatesFor } from "@/lib/site";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = resolveLocale(raw);
  const project = getProject(slug);
  if (!project) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = `${projectName(project, locale)} | ${t("caseStudySuffix")}`;
  const description = project.summary[locale];
  return {
    title,
    description,
    alternates: alternatesFor(locale, `/work/${slug}`),
    openGraph: {
      title,
      description,
      images: [{ url: project.hero.src, width: 1920, height: 1200, alt: project.hero.alt[locale] }],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  const locale = resolveLocale(raw);
  setRequestLocale(locale);
  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations({ locale });
  const companion = project.companionSlug ? getProject(project.companionSlug) : undefined;
  const next = nextProject(slug);
  const isApp = slug === "saaj-virtual-application";
  const newTab = t("project.opensNewTab");
  const appLink = isApp ? project : companion;
  const siteLink = isApp ? companion : project;

  return (
    <article>
      <header className="on-dark pb-10 pt-[calc(var(--header-h)+clamp(3rem,7vw,6rem))]">
        <div className="wrap">
          <Link href="/work" className="label link-line inline-block">
            {t("project.backToWork")}
          </Link>
          <h1 className="type-mega mt-8 max-w-[14ch]">{projectName(project, locale)}</h1>
          <div className="grid-12 mt-10 gap-y-8">
            <p className="type-lead col-span-12 lg:col-span-7">{project.summary[locale]}</p>
            <dl className="col-span-12 grid grid-cols-2 gap-6 lg:col-span-4 lg:col-start-9">
              <div>
                <dt className="label">{t("project.category")}</dt>
                <dd className="mt-1">{t(`categories.${project.category}`)}</dd>
              </div>
              {project.location ? (
                <div>
                  <dt className="label">{t("project.location")}</dt>
                  <dd className="mt-1">{project.location[locale]}</dd>
                </div>
              ) : null}
            </dl>
          </div>
        </div>
      </header>

      <div className="relative">
        <div aria-hidden className="on-dark absolute inset-x-0 top-0 h-1/2" />
        <div className="wrap relative">
          <div className="shot relative aspect-[16/10]">
            <Image
              src={project.hero.src}
              alt={project.hero.alt[locale]}
              fill
              priority
              sizes="(min-width: 1800px) 1700px, 100vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>

      <section className="on-light section">
        <div className="wrap grid-12 gap-y-12">
          <h2 className="label col-span-12 md:col-span-3">{t("project.overview")}</h2>
          <div className="col-span-12 md:col-span-8">
            <div className="space-y-6">
              {project.overview[locale].map((para) => (
                <p key={para} className="type-lead reveal">
                  {para}
                </p>
              ))}
            </div>
            <div className="mt-10">
              <ExternalButton href={project.url} variant="solid" newTabLabel={newTab}>
                {isApp ? t("project.visitApp") : t("project.visit")}
              </ExternalButton>
            </div>
          </div>

          <h2 className="label col-span-12 md:col-span-3">{t("project.features")}</h2>
          <ul className="col-span-12 border-t border-[var(--rule)] md:col-span-8">
            {project.features[locale].map((f) => (
              <li key={f} className="border-b border-[var(--rule)] py-3">
                {f}
              </li>
            ))}
          </ul>

          {project.stack ? (
            <>
              <h2 className="label col-span-12 md:col-span-3">{t("project.technology")}</h2>
              <p className="col-span-12 md:col-span-8">{project.stack.join(", ")}</p>
            </>
          ) : null}
        </div>
      </section>

      {project.journey ? (
        <section className="on-dark section">
          <div className="wrap">
            <p className="label">{t("project.journeyLabel")}</p>
            <h2 className="type-display mt-6 max-w-[16ch]">{t("project.journeyTitle")}</h2>
            <ol className="-mx-[var(--gutter)] mt-[clamp(3rem,6vw,5rem)] flex snap-x gap-6 overflow-x-auto px-[var(--gutter)] pb-4">
              {project.journey.map((step, i) => (
                <li
                  key={step.image.src}
                  className="w-[72vw] max-w-[20rem] shrink-0 snap-start sm:w-[18rem] xl:w-auto xl:min-w-0 xl:flex-1"
                >
                  <div className="shot relative aspect-[9/16]">
                    <Image
                      src={step.image.src}
                      alt={step.image.alt[locale]}
                      fill
                      sizes="(min-width: 1280px) 20vw, 72vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <p aria-hidden className="label mt-4">
                    0{i + 1}
                  </p>
                  <h3 className="mt-2 font-display text-xl leading-tight">{step.title[locale]}</h3>
                  <p className="muted mt-2 text-[0.9375rem]">{step.body[locale]}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {companion && appLink && siteLink ? (
        <section className="on-mist section">
          <div className="wrap grid-12 gap-y-8">
            <p className="label col-span-12 md:col-span-3">{t("project.relationLabel")}</p>
            <div className="col-span-12 md:col-span-9">
              <h2 className="type-title reveal max-w-[20ch]">{t("project.relationTitle")}</h2>
              <p className="muted type-lead reveal mt-6 max-w-[48ch]">{t("project.relationBody")}</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <ExternalButton href={appLink.url} variant="solid" newTabLabel={newTab}>
                  {t("project.visitApp")}
                </ExternalButton>
                <ExternalButton href={siteLink.url} variant="outline" newTabLabel={newTab}>
                  {t("project.visitSite")}
                </ExternalButton>
              </div>
              <Link href={`/work/${companion.slug}`} className="link-line mt-6 inline-block">
                {t("project.caseStudy")}: {projectName(companion, locale)}
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {project.gallery.length > 0 ? (
        <section className="on-light py-[var(--section-y)]">
          <div className="wrap">
            <h2 className="label border-t border-[var(--rule)] pt-6">{t("project.gallery")}</h2>
            <div className="grid-12 mt-8 gap-y-6">
              {project.gallery.map((image, i) => (
                <figure
                  key={image.src}
                  className={`reveal col-span-12 ${i > 0 ? "md:col-span-6" : ""}`}
                >
                  <div className="shot relative aspect-[16/10]">
                    <Image
                      src={image.src}
                      alt={image.alt[locale]}
                      fill
                      sizes={i === 0 ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
                      className="object-cover object-top"
                    />
                  </div>
                </figure>
              ))}
              <figure className="reveal col-span-8 col-start-3 mt-8 sm:col-span-4 sm:col-start-5 md:col-span-3 md:col-start-10">
                <figcaption className="label mb-3">{t("project.mobile")}</figcaption>
                <div className="shot relative aspect-[390/844]">
                  <Image
                    src={project.mobile.src}
                    alt={project.mobile.alt[locale]}
                    fill
                    sizes="(min-width: 768px) 25vw, 66vw"
                    className="object-cover object-top"
                  />
                </div>
              </figure>
            </div>
          </div>
        </section>
      ) : null}

      {project.note ? (
        <aside className="on-light pb-[var(--section-y)] pt-[clamp(2rem,4vw,3rem)]">
          <div className="wrap grid-12">
            <p className="muted col-span-12 border-t border-[var(--rule)] pt-6 text-[0.9375rem] md:col-span-8 md:col-start-4">
              {project.note[locale]}
            </p>
          </div>
        </aside>
      ) : null}

      <nav aria-label={t("project.next")} className="on-dark">
        <Link href={`/work/${next.slug}`} className="group block">
          <div className="wrap grid-12 items-center gap-y-6 py-[clamp(3rem,7vw,6rem)]">
            <div className="col-span-12 md:col-span-7">
              <p className="label">{t("project.next")}</p>
              <p className="type-display mt-4 flex items-center gap-4 font-display font-medium">
                <span>{projectName(next, locale)}</span>
                <ArrowRight
                  aria-hidden
                  strokeWidth={1}
                  className="size-[0.7em] shrink-0 transition-transform duration-500 ease-editorial group-hover:translate-x-2"
                />
              </p>
            </div>
            <div className="shot relative col-span-12 aspect-[16/10] md:col-span-4 md:col-start-9">
              <Image
                src={next.hero.src}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </Link>
      </nav>
      <FinalCta />
    </article>
  );
}
