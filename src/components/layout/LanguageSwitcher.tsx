"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/** Keeps the visitor on the equivalent page, including project slugs. */
export function LanguageSwitcher({
  label,
  onNavigate,
}: {
  label: string;
  onNavigate?: () => void;
}) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={label} className="flex items-center gap-1 font-display text-sm">
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 ? (
            <span aria-hidden className="text-ash">
              /
            </span>
          ) : null}
          <Link
            href={pathname}
            locale={l}
            hrefLang={l}
            onClick={onNavigate}
            aria-current={l === locale ? "true" : undefined}
            className={`inline-flex min-h-11 min-w-9 items-center justify-center uppercase transition-colors ${
              l === locale ? "text-paper" : "text-ash hover:text-paper"
            }`}
          >
            {l}
          </Link>
        </span>
      ))}
    </nav>
  );
}
