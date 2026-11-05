import { useTranslations } from "next-intl";
import { ButtonLink } from "./ButtonLink";

export function FinalCta() {
  const t = useTranslations();
  return (
    <section className="on-dark stack-over section border-t border-[var(--rule)]">
      <div className="wrap grid-12 gap-y-10">
        <h2 className="type-mega reveal col-span-12 max-w-[15ch] lg:col-span-10">
          {t("finalCta.title")}
        </h2>
        <div className="col-span-12 flex flex-col gap-8 md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8">
          <p className="muted type-lead reveal">{t("finalCta.body")}</p>
          <ButtonLink href="/contact" variant="solid" className="reveal w-full sm:w-auto sm:self-start">
            {t("cta.start")}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
