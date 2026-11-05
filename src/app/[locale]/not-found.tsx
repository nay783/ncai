import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  const t = useTranslations("errors");
  return (
    <section className="on-dark flex min-h-[80svh] items-end pb-16 pt-40">
      <div className="wrap">
        <p className="label">{t("notFoundLabel")}</p>
        <h1 className="type-display mt-6 max-w-[16ch]">{t("notFoundTitle")}</h1>
        <p className="muted type-lead mt-6 max-w-[40ch]">{t("notFoundBody")}</p>
        <div className="mt-10">
          <ButtonLink href="/" variant="solid">
            {t("backHome")}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
