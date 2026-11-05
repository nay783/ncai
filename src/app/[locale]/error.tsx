"use client";

import { useTranslations } from "next-intl";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  const t = useTranslations("errors");
  return (
    <section className="on-dark flex min-h-[80svh] items-end pb-16 pt-40">
      <div className="wrap">
        <p className="label">{t("errorLabel")}</p>
        <h1 className="type-display mt-6 max-w-[16ch]">{t("errorTitle")}</h1>
        <p className="muted type-lead mt-6 max-w-[40ch]">{t("errorBody")}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-10 inline-flex min-h-12 items-center bg-paper px-6 font-display font-medium text-ink"
        >
          {t("retry")}
        </button>
      </div>
    </section>
  );
}
