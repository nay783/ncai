import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { business } from "@/data/business";
import { routing } from "@/i18n/routing";
import { alternatesFor, siteUrl } from "@/lib/site";
import "@/styles/globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

type Props = { children: ReactNode; params: Promise<{ locale: string }> };

export const viewport: Viewport = { themeColor: "#0a0a0a" };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(siteUrl),
    title: t("home.title"),
    description: t("home.description"),
    applicationName: t("siteName"),
    alternates: alternatesFor(locale),
    openGraph: {
      type: "website",
      siteName: t("siteName"),
      title: t("home.title"),
      description: t("home.description"),
      locale: locale === "pt" ? "pt_MZ" : "en",
      url: `${siteUrl}/${locale}`,
      images: [
        { url: "/images/branding/og-image.png", width: 1200, height: 630, alt: t("siteName") },
      ],
    },
    twitter: { card: "summary_large_image", images: ["/images/branding/og-image.png"] },
  };
}

const organisationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: business.brandName,
  legalName: business.legalName,
  url: siteUrl,
  logo: `${siteUrl}/images/branding/ncai-logo-original.jpg`,
  email: business.email,
  telephone: business.phoneE164,
  address: { "@type": "PostalAddress", addressCountry: business.countryCode },
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const [messages, t] = await Promise.all([getMessages(), getTranslations()]);

  return (
    <html
      lang={locale === "pt" ? "pt-MZ" : "en"}
      className={`${spaceGrotesk.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organisationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={{ errors: messages.errors }}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
          >
            {t("skipLink")}
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <RevealObserver />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
