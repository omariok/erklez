import Link from "next/link";
import type { SiteConfig } from "@/types/content";
import { documents } from "@/content/documents";
import { sites } from "@/content/logistics";
import { ConsentSettingsLink } from "@/components/consent/ConsentSettingsLink";

// Контакты/реквизиты приходят с сервера (lib/content-source — Sanity или файлы);
// документы и площадки пока живут только в файлах (в схеме Sanity их нет).
export function Footer({ site }: { site: SiteConfig }) {
  const phoneHref = `tel:${site.phone.replace(/[^\d+]/g, "")}`;

  return (
    <footer className="border-t border-white/10 bg-graphite-950 text-graphite-50">
      <div className="container grid gap-10 py-14 md:grid-cols-3">
        <div>
          <div className="font-display text-xl font-semibold tracking-[0.2em]">ЭРКЛЁЗ</div>
          <p className="mt-3 max-w-xs text-sm text-graphite-50/70">
            Декоративное кусковое стекло напрямую из печи. От 1 камня до 100+ тонн с НДС по всей
            России.
          </p>
        </div>
        <div className="text-sm text-graphite-50/80">
          <div className="mb-3 font-semibold">Площадки</div>
          {sites.map((s) => (
            <div key={s.title} className="mb-2">
              {s.title}
            </div>
          ))}
          <div className="mt-3 text-graphite-50/60">Доставка по всей стране</div>
        </div>
        <div className="text-sm text-graphite-50/80">
          <div className="mb-3 font-semibold">Контакты</div>
          <a href={phoneHref} className="block hover:text-white">
            {site.phone}
          </a>
          <a
            href={`https://t.me/${site.telegram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block hover:text-white"
          >
            Telegram: @{site.telegram}
          </a>
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block hover:text-white"
          >
            WhatsApp
          </a>
          <div className="mt-3 text-graphite-50/60">
            {site.legal.entity}, ИНН {site.legal.inn}
          </div>
          <a
            href={documents.certificates ?? "#quiz"}
            className="mt-3 block underline underline-offset-2 hover:text-white"
          >
            {documents.certificates ? "Сертификаты и паспорта качества" : "Запросить сертификаты"}
          </a>
          <Link href="/privacy" className="mt-2 block underline underline-offset-2 hover:text-white">
            Политика обработки данных
          </Link>
          <div className="mt-2">
            <ConsentSettingsLink />
          </div>
        </div>
      </div>
      {/* Запас снизу на мобильных — под плавающей панелью связи */}
      <div className="border-t border-white/10 py-5 pb-24 text-center text-xs text-graphite-50/50 sm:pb-5">
        © {new Date().getFullYear()} {site.name}. Все права защищены.
      </div>
    </footer>
  );
}
