import { setRequestLocale } from "next-intl/server";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Guide } from "@/components/home/Guide";
import { Hero } from "@/components/home/Hero";
import { Plan } from "@/components/home/Plan";
import { Problem } from "@/components/home/Problem";
import { ServicesList } from "@/components/home/ServicesList";
import { Success } from "@/components/home/Success";
import { FinalCta } from "@/components/ui/FinalCta";
import { resolveLocale, type LocaleParams } from "@/lib/page";

export default async function HomePage({ params }: LocaleParams) {
  setRequestLocale(resolveLocale((await params).locale));

  return (
    <>
      <Hero />
      <Problem />
      <Guide />
      <ServicesList />
      <FeaturedWork />
      <Plan />
      <Success />
      <FinalCta />
    </>
  );
}
