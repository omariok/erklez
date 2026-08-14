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

export default function HomePage() {
  const jsonLd = [organizationJsonLd(), productsJsonLd(), faqJsonLd()];
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
        <Catalog />
        <Quiz />
        <Applications />
        <Faq />
        <Logistics />
        <Gallery />
        <FinalCta />
      </main>
      <Footer />
      <StickyContactBar />
    </>
  );
}
