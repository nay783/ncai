import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/work",
    "/services",
    "/about",
    "/contact",
    "/privacy",
    ...projects.map((p) => `/work/${p.slug}`),
  ];

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${siteUrl}/${locale}${path}`,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, `${siteUrl}/${l}${path}`])),
      },
    })),
  );
}
