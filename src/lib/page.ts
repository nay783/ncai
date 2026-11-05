import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { alternatesFor } from "./site";

export type LocaleParams = { params: Promise<{ locale: string }> };

export function resolveLocale(locale: string): Locale {
  return hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
}

type PageKey = "work" | "services" | "about" | "contact" | "privacy";

/** Title, description, canonical and hreflang for a simple page. */
export async function pageMetadata(rawLocale: string, key: PageKey): Promise<Metadata> {
  const locale = resolveLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t(`${key}.title`);
  const description = t(`${key}.description`);
  return {
    title,
    description,
    alternates: alternatesFor(locale, `/${key}`),
    openGraph: { title, description },
  };
}
