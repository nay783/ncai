import Image from "next/image";
import { useTranslations } from "next-intl";
import { business, contactLinks } from "@/data/business";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();
  const linkClass = "link-line inline-block py-1";

  return (
    <footer className="on-dark relative z-[1] border-t border-[var(--rule)]">
      <div className="wrap grid-12 gap-y-12 py-16">
        <div className="col-span-12 md:col-span-5">
          <Image
            src="/images/branding/ncai-logo-lockup.png"
            alt={business.legalName}
            width={209}
            height={79}
            className="h-auto w-[209px] max-w-full"
          />
          <p className="muted mt-6 max-w-[34ch]">{t("footer.tagline")}</p>
        </div>

        <nav aria-label={t("footer.navigate")} className="col-span-12 xs:col-span-5 md:col-span-3 md:col-start-7">
          <p className="label">{t("footer.navigate")}</p>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/work" className={linkClass}>
                {t("nav.work")}
              </Link>
            </li>
            <li>
              <Link href="/services" className={linkClass}>
                {t("nav.services")}
              </Link>
            </li>
            <li>
              <Link href="/about" className={linkClass}>
                {t("nav.about")}
              </Link>
            </li>
            <li>
              <Link href="/contact" className={linkClass}>
                {t("nav.contact")}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="col-span-12 min-w-0 xs:col-span-7 md:col-span-3">
          <p className="label">{t("footer.contact")}</p>
          <ul className="mt-4 space-y-2">
            <li>
              <a
                href={contactLinks.whatsapp()}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a href={contactLinks.email} className={`${linkClass} break-all`}>
                {business.email}
              </a>
            </li>
            <li>
              <a href={contactLinks.phone} className={linkClass}>
                {business.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="wrap flex flex-col gap-2 border-t border-[var(--rule)] py-6 text-sm text-ash md:flex-row md:items-center md:justify-between">
        <p>
          © {year} {business.legalName}. {t("footer.rights")} {t("footer.country")}.
        </p>
        <Link href="/privacy" className="inline-flex min-h-11 items-center hover:text-paper">
          {t("footer.privacy")}
        </Link>
      </div>
    </footer>
  );
}
