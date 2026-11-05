import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { business, contactLinks } from "@/data/business";
import { pageMetadata, resolveLocale, type LocaleParams } from "@/lib/page";

export async function generateMetadata({ params }: LocaleParams) {
  return pageMetadata((await params).locale, "contact");
}

export default async function ContactPage({ params }: LocaleParams) {
  const locale = resolveLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  const options = [
    {
      href: contactLinks.whatsapp(t("contact.whatsappMessage")),
      label: t("cta.whatsapp"),
      hint: t("contact.whatsappHint"),
      Icon: MessageCircle,
      newTab: true,
      light: true,
    },
    {
      href: contactLinks.email,
      label: t("cta.email"),
      hint: t("contact.emailHint"),
      detail: business.email,
      Icon: Mail,
      newTab: false,
      light: false,
    },
  ];

  return (
    <section className="on-dark flex min-h-svh flex-col justify-end pb-[clamp(2.5rem,5vw,4rem)] pt-[calc(var(--header-h)+4rem)]">
      <div className="wrap">
        <p className="label">{t("contact.label")}</p>
        <h1 className="type-mega mt-6 max-w-[13ch]">{t("contact.title")}</h1>
        <p className="muted type-lead mt-8 max-w-[40ch]">{t("contact.body")}</p>

        <div className="mt-[clamp(2.5rem,6vw,5rem)] grid gap-px border border-[var(--rule)] bg-[var(--rule)] md:grid-cols-2">
          {options.map(({ href, label, hint, detail, Icon, newTab, light }) => (
            <a
              key={label}
              href={href}
              {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`group flex min-h-56 flex-col justify-between gap-10 p-6 transition-colors duration-500 md:p-8 ${
                light ? "bg-paper text-ink" : "bg-ink text-paper hover:bg-[#141414]"
              }`}
            >
              <span className="flex items-start justify-between">
                <Icon aria-hidden size={28} strokeWidth={1.25} />
                <ArrowUpRight
                  aria-hidden
                  size={28}
                  strokeWidth={1.25}
                  className="transition-transform duration-500 ease-editorial group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </span>
              <span className="min-w-0">
                <span className="block font-display text-[clamp(1.75rem,3.4vw,3rem)] leading-tight tracking-tight">
                  {label}
                </span>
                <span className={`mt-2 block ${light ? "text-graphite" : "text-ash"}`}>{hint}</span>
                {detail ? <span className="mt-1 block break-all text-ash">{detail}</span> : null}
                {newTab ? <span className="sr-only"> {t("project.opensNewTab")}</span> : null}
              </span>
            </a>
          ))}
        </div>

        <p className="mt-8 text-ash">
          {t("contact.phoneLabel")}{" "}
          <a href={contactLinks.phone} className="link-line inline-block py-1 text-paper">
            {business.phoneDisplay}
          </a>
        </p>
      </div>
    </section>
  );
}
