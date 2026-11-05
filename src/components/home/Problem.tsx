import type { CSSProperties } from "react";
import { useMessages, useTranslations } from "next-intl";
import { SectionIntro } from "@/components/ui/SectionIntro";

export function Problem() {
  const t = useTranslations("home.problem");
  const { home } = useMessages();

  return (
    <section className="on-light stack-over section">
      <div className="wrap">
        <SectionIntro label={t("label")} title={t("title")}>
          {t("body")}
        </SectionIntro>
        <ol className="mt-[clamp(3.5rem,7vw,6rem)] grid border-t border-[var(--rule)] md:grid-cols-3">
          {home.problem.items.map((item, i) => (
            <li
              key={item.title}
              className="reveal border-b border-[var(--rule)] py-8 md:border-b-0 md:border-l md:px-6 md:py-10 md:first:border-l-0 md:first:pl-0"
              style={{ "--reveal-delay": `${i * 90}ms` } as CSSProperties}
            >
              <h3 className="font-display text-2xl leading-tight">{item.title}</h3>
              <p className="muted mt-4 max-w-[34ch]">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
