import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { services } from "@/data/services";
import { Link } from "@/i18n/navigation";

export function ServicesList() {
  const t = useTranslations("home.services");
  const locale = useLocale();

  return (
    <section className="on-dark stack-over section">
      <div className="wrap">
        <SectionIntro label={t("label")} title={t("title")} />
        <ol className="mt-[clamp(3.5rem,7vw,6rem)] border-t border-[var(--rule)]">
          {services.map((s, i) => (
            <li key={s.id} className="reveal border-b border-[var(--rule)]">
              <Link
                href={{ pathname: "/services", hash: s.id }}
                className="group grid-12 items-baseline gap-y-2 py-7 md:py-9"
              >
                <span aria-hidden className="label col-span-2 md:col-span-3">
                  0{i + 1}
                </span>
                <h3 className="col-span-10 font-display text-[clamp(1.5rem,3vw,2.75rem)] leading-tight transition-transform duration-500 ease-editorial group-hover:translate-x-2 md:col-span-5">
                  {s.title[locale]}
                </h3>
                <p className="muted col-span-10 col-start-3 md:col-span-3 md:col-start-9">
                  {s.summary[locale]}
                </p>
                <ArrowRight
                  aria-hidden
                  size={22}
                  strokeWidth={1.25}
                  className="col-span-1 col-start-12 row-start-1 hidden justify-self-end transition-transform duration-500 ease-editorial group-hover:translate-x-1 md:block"
                />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
