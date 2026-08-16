import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { StickyContactBar } from "@/components/layout/StickyContactBar";
import { Hero } from "@/components/sections/Hero";
import { Catalog } from "@/components/sections/Catalog";
import { Quiz } from "@/components/sections/Quiz";
import { Faq } from "@/components/sections/Faq";
import { Logistics } from "@/components/sections/Logistics";
import { Applications } from "@/components/sections/Applications";
import { Gallery } from "@/components/sections/Gallery";
import { FinalCta } from "@/components/sections/FinalCta";
import { organizationJsonLd, productsJsonLd, faqJsonLd } from "@/lib/seo";
import { getSite, getFractions, getApplications, getFaq } from "@/lib/content-source";

export default async function HomePage() {
  // Контент идёт через content-source (Sanity → файловый фолбэк) единым запросом.
  const [site, fractions, applications, faq] = await Promise.all([
    getSite(), getFractions(), getApplications(), getFaq(),
  ]);
  const jsonLd = [organizationJsonLd(site), productsJsonLd(fractions, site), faqJsonLd(faq)];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Catalog fractions={fractions} />
        <Quiz fractions={fractions} />
        <Applications applications={applications} />
        <Faq items={faq} />
        <Logistics />
        <Gallery />
        <FinalCta />
      </main>
      <Footer site={site} />
      <StickyContactBar site={site} />
    </>
  );
}
