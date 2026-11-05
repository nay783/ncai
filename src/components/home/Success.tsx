import { useMessages, useTranslations } from "next-intl";

export function Success() {
  const t = useTranslations("home.success");
  const { home } = useMessages();

  return (
    <section className="on-light stack-over section">
      <div className="wrap grid-12 gap-y-12">
        <p className="label col-span-12 md:col-span-3">{t("label")}</p>
        <h2 className="type-display reveal col-span-12 max-w-[16ch] md:col-span-9">{t("title")}</h2>
        <div className="col-span-12 grid gap-10 md:col-span-9 md:col-start-4 md:grid-cols-2 md:gap-8">
          <div className="reveal">
            <h3 className="label border-b border-[var(--rule)] pb-3">{t("withoutLabel")}</h3>
            <ul>
              {home.success.without.map((line) => (
                <li key={line} className="muted border-b border-[var(--rule)] py-4">
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal">
            <h3 className="label border-b border-[var(--rule)] pb-3 !text-ink">{t("withLabel")}</h3>
            <ul>
              {home.success.with.map((line) => (
                <li key={line} className="border-b border-[var(--rule)] py-4 font-medium">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
