import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { FinalCta } from "@/components/ui/FinalCta";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata, resolveLocale, type LocaleParams } from "@/lib/page";

export async function generateMetadata({ params }: LocaleParams) {
  return pageMetadata((await params).locale, "about");
}

export default async function AboutPage({ params }: LocaleParams) {
  const locale = resolveLocale((await params).locale);
  setRequestLocale(locale);
  const [t, tc, messages] = await Promise.all([
    getTranslations({ locale, namespace: "about" }),
    getTranslations({ locale, namespace: "cta" }),
    getMessages({ locale }),
  ]);

  return (
    <>
      <PageHero label={t("label")} title={t("title")} body={t("body")} />
      <section className="on-mist section">
        <div className="wrap grid-12">
          <h2 className="type-display reveal col-span-12 max-w-[20ch] md:col-span-10 md:col-start-3">
            {t("beliefTitle")}
          </h2>
        </div>
      </section>
      <section className="on-light section">
        <div className="wrap grid-12 gap-y-10">
          <p className="label col-span-12 md:col-span-3">{t("principlesLabel")}</p>
          <ol className="col-span-12 border-t border-[var(--rule)] md:col-span-9">
            {messages.about.principles.map((p, i) => (
              <li
                key={p.title}
                className="reveal grid gap-3 border-b border-[var(--rule)] py-8 md:grid-cols-[4rem_1fr_1fr] md:gap-8"
              >
                <span aria-hidden className="label">
                  0{i + 1}
                </span>
                <h3 className="font-display text-2xl leading-tight">{p.title}</h3>
                <p className="muted">{p.body}</p>
              </li>
            ))}
          </ol>
          <div className="col-span-12 flex flex-col gap-4 md:col-span-9 md:col-start-4">
            <p className="type-lead">{t("workCta")}</p>
            <ButtonLink href="/work" variant="solid" className="self-start">
              {tc("explore")}
            </ButtonLink>
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
