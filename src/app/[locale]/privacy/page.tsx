import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { business, contactLinks } from "@/data/business";
import { pageMetadata, resolveLocale, type LocaleParams } from "@/lib/page";

export async function generateMetadata({ params }: LocaleParams) {
  return pageMetadata((await params).locale, "privacy");
}

export default async function PrivacyPage({ params }: LocaleParams) {
  const locale = resolveLocale((await params).locale);
  setRequestLocale(locale);
  const [t, messages] = await Promise.all([
    getTranslations({ locale, namespace: "privacy" }),
    getMessages({ locale }),
  ]);

  return (
    <>
      <PageHero label={t("label")} title={t("title")} body={t("updated")} />
      <section className="on-light section">
        <div className="wrap grid-12">
          <div className="col-span-12 md:col-span-8 md:col-start-4 lg:col-span-6 lg:col-start-4">
            {messages.privacy.sections.map((s) => (
              <section key={s.title} className="border-b border-[var(--rule)] py-8 first:pt-0">
                <h2 className="font-display text-2xl leading-tight">{s.title}</h2>
                <p className="muted mt-3">{s.body}</p>
              </section>
            ))}
            <p className="mt-8">
              {t("contactLine")}{" "}
              <a href={contactLinks.email} className="link-line inline-block break-all">
                {business.email}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
