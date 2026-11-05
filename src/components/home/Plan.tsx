import type { CSSProperties } from "react";
import { useMessages, useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionIntro } from "@/components/ui/SectionIntro";

export function Plan() {
  const t = useTranslations();
  const { home } = useMessages();

  return (
    <section className="on-dark stack-over section">
      <div className="wrap">
        <SectionIntro label={t("home.plan.label")} title={t("home.plan.title")} />
        <ol className="mt-[clamp(3.5rem,7vw,6rem)] grid gap-px border-y border-[var(--rule)] bg-[var(--rule)] md:grid-cols-3">
          {home.plan.steps.map((step, i) => (
            <li
              key={step.title}
              className="reveal bg-[var(--bg)] py-8 md:min-h-[22rem] md:px-6 md:first:pl-0"
              style={{ "--reveal-delay": `${i * 110}ms` } as CSSProperties}
            >
              <p
                aria-hidden
                className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-none tracking-tight text-ash"
              >
                0{i + 1}
              </p>
              <h3 className="mt-10 font-display text-2xl leading-tight md:mt-20">{step.title}</h3>
              <p className="muted mt-3 max-w-[32ch]">{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12">
          <ButtonLink href="/contact" variant="solid">
            {t("cta.start")}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
