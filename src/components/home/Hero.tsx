import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function Hero() {
  const t = useTranslations();
  return (
    <section className="on-dark stack-pin relative flex min-h-svh flex-col justify-end overflow-hidden pb-[clamp(2rem,5vw,4rem)] pt-[calc(var(--header-h)+3rem)]">
      <div className="hairlines" aria-hidden>
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="wrap relative">
        <p className="label mb-6">{t("home.heroKicker")}</p>
        <h1 className="type-mega max-w-[13ch] lg:max-w-[15ch]">
          {t.rich("home.heroTitle", {
            strike: (chunks) => <span className="strike">{chunks}</span>,
          })}
        </h1>
        <div className="grid-12 mt-10 gap-y-8 lg:mt-14">
          <p className="type-lead col-span-12 max-w-[40ch] md:col-span-7 lg:col-span-5">
            {t("home.heroDescription")}
          </p>
          <div className="col-span-12 flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:col-start-7 lg:items-end lg:justify-end">
            <ButtonLink href="/contact" variant="solid">
              {t("cta.start")}
            </ButtonLink>
            <ButtonLink href="/work" variant="outline" className="bg-[var(--bg)]">
              {t("cta.explore")}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
