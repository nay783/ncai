import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const t = useTranslations();
  const links = [
    { href: "/work", label: t("nav.work") },
    { href: "/services", label: t("nav.services") },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    // Always black: the official logo only exists in white on black, and must not be recoloured.
    // Sticky rather than fixed: iOS browsers move fixed bars out of place as their toolbars collapse.
    // The negative margin keeps the bar overlaying the page, so sections keep their own header offset.
    <header className="site-header on-dark sticky top-0 z-50 mb-[calc(-1*var(--header-h)-1px)] border-b border-[var(--rule)]">
      <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href="/" aria-label={t("nav.home")} className="relative z-10 inline-flex min-h-11 items-center">
          <Image
            src="/images/branding/ncai-logo-wordmark.png"
            alt="NCAI"
            width={186}
            height={45}
            priority
            className="h-7 w-auto"
          />
        </Link>

        <nav aria-label={t("nav.label")} className="hidden md:block">
          <ul className="flex items-center gap-8 font-display text-[0.9375rem]">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center text-ash transition-colors hover:text-paper"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <LanguageSwitcher label={t("nav.language")} />
          <Link
            href="/contact"
            className="inline-flex min-h-10 items-center bg-paper px-4 font-display text-sm font-medium text-ink transition-opacity hover:opacity-85"
          >
            {t("cta.start")}
          </Link>
        </div>

        <MobileMenu
          links={links}
          ctaLabel={t("cta.start")}
          openLabel={t("nav.open")}
          closeLabel={t("nav.close")}
          languageLabel={t("nav.language")}
        />
      </div>
    </header>
  );
}
