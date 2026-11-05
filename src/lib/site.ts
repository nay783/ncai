import { routing, type Locale } from "@/i18n/routing";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

/** Canonical plus hreflang alternates for a locale-relative path such as "/work". */
export function alternatesFor(locale: Locale, path = "") {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = `${siteUrl}/${l}${path}`;
  languages["x-default"] = `${siteUrl}/${routing.defaultLocale}${path}`;
  return { canonical: `${siteUrl}/${locale}${path}`, languages };
}
