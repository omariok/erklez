import { site } from "@/content/site";
import { faq } from "@/content/faq";
import { fractions, wholesale } from "@/content/catalog";

const url = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${site.domain}`;

// JSON-LD для расширенных сниппетов Яндекса и Google (Schema.org).
// Важно: адреса площадок намеренно НЕ публикуются как PostalAddress —
// точных адресов пока нет, а фейковый NAP вредит локальному SEO и доверию.
// Вместо LocalBusiness используем Organization + зона обслуживания «Россия».
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${url}#organization`,
    name: site.name,
    url,
    logo: `${url}/og.jpg`,
    image: `${url}/og.jpg`,
    description:
      "Переработчик эрклёза — декоративного кускового стекла. Отгрузка от 1 камня до 100+ тонн с НДС по всей России.",
    telephone: site.phone,
    areaServed: { "@type": "Country", name: "Россия" },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: site.phone,
        contactType: "sales",
        areaServed: "RU",
        availableLanguage: "Russian",
      },
    ],
    sameAs: [`https://t.me/${site.telegram}`],
  };
}

// Каталог цветов как товарные предложения — даёт цену в сниппете.
export function productsJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Цвета эрклёза",
    itemListElement: fractions.map((f, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: `Эрклёз ${f.name}`,
        description: f.tagline,
        category: "Декоративное кусковое стекло",
        brand: { "@type": "Brand", name: site.name },
        image: f.images[0]?.src?.startsWith("/") ? `${url}${f.images[0].src}` : f.images[0]?.src,
        offers: {
          "@type": "Offer",
          priceCurrency: "RUB",
          price: wholesale.pricePerTon,
          eligibleQuantity: {
            "@type": "QuantitativeValue",
            value: wholesale.minTons,
            unitCode: "TNE",
          },
          availability: "https://schema.org/InStock",
          seller: { "@id": `${url}#organization` },
        },
      },
    })),
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export const siteUrl = url;
