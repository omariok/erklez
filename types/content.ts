// Типы контент-слоя. UI ничего не хардкодит — всё берётся отсюда.
// Это делает правки простыми и позволяет позже подключить CMS (Sanity/Sheets)
// без изменения компонентов.

export type FractionColor = "turquoise" | "champagne" | "green" | "dark";

export interface Fraction {
  slug: string;
  name: string;            // «Бирюза»
  color: FractionColor;
  tagline: string;         // короткая подпись
  sizes: string[];         // «70–150 мм», «крупнее»
  weightPerCubic: string;  // «1,2–1,4 т/м³»
  packaging: string[];     // фасовки
  hex: string;             // цвет для подсветки карточки
  images: MediaAsset[];
  applications: string[];  // где применяется
  rare?: boolean;
}

export interface MediaAsset {
  src: string;
  alt: string;             // SEO: «эрклёз бирюза 100мм»
  width?: number;
  height?: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Application {
  slug: string;
  title: string;
  blurb: string;
  image: MediaAsset;
}

export interface SiteConfig {
  name: string;
  domain: string;
  phone: string;
  telegram: string;   // @username
  whatsapp: string;   // wa.me number
  legal: {
    entity: string;   // ИП/ООО ...
    inn: string;
    vat: boolean;
  };
  stats: { label: string; value: string }[];
}
