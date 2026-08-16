"use client";

import type { Fraction } from "@/types/content";
import { openQuizWith } from "@/lib/leadBus";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { FractionCard } from "@/components/catalog/FractionCard";

// Блок 2 — Каталог: 4 фракции. Стиль по дизайн-макету (eyebrow + Cormorant, тёмные карточки).
// Данные приходят с сервера (lib/content-source — Sanity или файлы).
export function Catalog({ fractions }: { fractions: Fraction[] }) {
  return (
    <section id="catalog" className="py-14 md:py-20">
      <div className="container">
        <SectionReveal className="mb-8 max-w-2xl">
          <span className="font-mono text-[13px] uppercase tracking-[0.14em] text-turquoise">
            01 — Каталог
          </span>
          <h2 className="mt-3.5 max-w-[18ch] font-display text-[clamp(34px,4.5vw,60px)] font-medium leading-[1.02] tracking-[-0.01em] text-graphite-900">
            Четыре цвета эрклёза
          </h2>
          <p className="mt-4 max-w-[46ch] text-base font-light leading-relaxed text-slate-500">
            Фракция 70–150 мм и крупнее. Куб весит 1,2–1,4 т. Наведите на карточку — материал
            оживает.
          </p>
        </SectionReveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {fractions.map((f, i) => (
            <SectionReveal key={f.slug} delay={i * 0.05}>
              <FractionCard
                fraction={f}
                onRequest={(color) => openQuizWith({ color, source: "Каталог" })}
              />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
