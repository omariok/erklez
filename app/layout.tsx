import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Manrope, Cormorant, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/seo";
import { YandexMetrika } from "@/components/analytics/YandexMetrika";
import { GoogleTagManager } from "@/components/analytics/GoogleTagManager";
import { UtmCapture } from "@/components/analytics/UtmCapture";
import { CookieBanner } from "@/components/consent/CookieBanner";
import "./globals.css";

// Дизайн-макет: тело — Manrope, заголовки — Cormorant (serif), подписи/цифры — моно.
// Важно: Space Mono из макета НЕ поддерживает кириллицу (только latin/latin-ext/vietnamese),
// поэтому русские подписи ломались на системный шрифт. Взят JetBrains Mono — тот же
// «технический» характер, но с полноценной кириллицей.
const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});
const cormorant = Cormorant({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});
const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Эрклёз купить — декоративное кусковое стекло напрямую из печи | с НДС, опт и розница",
    template: "%s | Эрклёз",
  },
  description:
    "Эрклёз (кусковое декоративное стекло) напрямую из печи. От 1 камня до 100+ тонн с НДС по всей России. Бирюза, Шампань, Зелёный, Тёмный. Склады Клин и Саранск.",
  keywords: [
    "эрклёз купить", "кусковое стекло декоративное", "эрклёз цена", "эрклёз оптом",
    "эрклёз для габионов", "эрклёз с НДС", "декоративное стекло для ландшафта",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    siteName: site.name,
    title: "Эрклёз напрямую из печи — от 1 камня до 100+ тонн с НДС",
    description: "Переработчик эрклёза. Бирюза, Шампань, Зелёный, Тёмный. Склады Клин и Саранск.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Эрклёз — декоративное кусковое стекло напрямую из печи",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Эрклёз напрямую из печи — от 1 камня до 100+ тонн с НДС",
    description: "Переработчик эрклёза. Бирюза, Шампань, Зелёный, Тёмный. Склады Клин и Саранск.",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
  // Подтверждение прав в Вебмастере и Search Console — впишите коды в .env.
  verification: {
    ...(process.env.NEXT_PUBLIC_YANDEX_VERIFICATION
      ? { yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION }
      : {}),
    ...(process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION }
      : {}),
  },
};

// Цвет браузерной хромы на мобильных — под тёмный фон сайта.
// В Next 15 themeColor живёт в отдельном viewport-экспорте, не в metadata.
export const viewport: Viewport = {
  themeColor: "#0a0f1a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={`${manrope.variable} ${cormorant.variable} ${mono.variable}`}
    >
      <body>
        {/* Флаг включённого JS: ставится ДО первой отрисовки. CSS-анимации
            проявления (.reveal / .hero-reveal) работают только при наличии
            html.js — без JS весь контент остаётся видимым. */}
        <Script id="js-flag" strategy="beforeInteractive">
          {`document.documentElement.classList.add('js');`}
        </Script>
        {children}
        <Toaster position="top-center" richColors />
        <UtmCapture />
        <YandexMetrika />
        <GoogleTagManager />
        <CookieBanner />
      </body>
    </html>
  );
}
