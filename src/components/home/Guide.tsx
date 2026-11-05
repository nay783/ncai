import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function Guide() {
  const t = useTranslations();
  return (
    <section className="on-mist stack-over section">
      <div className="wrap grid-12 gap-y-12">
        <p className="label col-span-12 md:col-span-3">{t("home.guide.label")}</p>
        <div className="col-span-12 md:col-span-9">
          <h2 className="type-display reveal max-w-[16ch]">{t("home.guide.title")}</h2>
          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <p className="type-lead reveal">{t("home.guide.body")}</p>
            <div className="reveal border-t border-[var(--rule)] pt-6">
              <h3 className="font-display text-2xl">{t("home.guide.proofTitle")}</h3>
              <p className="muted mt-3">{t("home.guide.proofBody")}</p>
              <ButtonLink href="/work" variant="outline" className="mt-6">
                {t("cta.explore")}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
