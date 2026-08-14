import { MapPin, Truck, Boxes, FileCheck } from "lucide-react";
import { delivery, sites } from "@/content/logistics";
import { SectionReveal } from "@/components/motion/SectionReveal";

// Блок 5 — Логистика. Две площадки + доставка по всей России (без точных адресов/карты).

export function Logistics() {
  return (
    <section id="logistics" className="bg-paper py-14 md:py-20">
      <div className="container">
        <SectionReveal className="mb-8 max-w-2xl">
          <span className="font-mono text-[13px] uppercase tracking-[0.14em] text-turquoise">
            05 — Логистика
          </span>
          <h2 className="mt-3.5 font-display text-[clamp(34px,4.5vw,60px)] font-medium leading-[1.02] tracking-[-0.01em] text-graphite-900">
            Две площадки и доставка по всей России
          </h2>
          <p className="mt-4 text-base font-light leading-relaxed text-slate-500">
            Отгружаем с двух собственных площадок — это позволяет быстро комплектовать заказы и
            оптимизировать доставку в обе стороны.
          </p>
        </SectionReveal>

        <div className="grid gap-6 lg:grid-cols-2">
          {sites.map((s) => (
            <SectionReveal key={s.title}>
              <div className="flex h-full gap-4 rounded-2xl border border-border bg-white p-6">
                <MapPin className="mt-0.5 h-6 w-6 shrink-0 text-turquoise" />
                <div>
                  <div className="font-display text-xl font-semibold text-graphite-900">
                    {s.title}
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.1} className="mt-6 grid gap-6 rounded-2xl border border-border bg-white p-6 sm:grid-cols-3">
          <div className="flex gap-3">
            <Truck className="mt-0.5 h-5 w-5 shrink-0 text-turquoise" />
            <div className="text-sm text-muted-foreground">
              Доставка по всей стране: {delivery.carriers.join(", ")}. {delivery.note}
            </div>
          </div>
          <div className="flex gap-3">
            <Boxes className="mt-0.5 h-5 w-5 shrink-0 text-turquoise" />
            <div className="text-sm text-muted-foreground">
              Фасовка: {delivery.packaging.join(", ")}.
            </div>
          </div>
          <div className="flex gap-3">
            <FileCheck className="mt-0.5 h-5 w-5 shrink-0 text-turquoise" />
            <div className="text-sm text-muted-foreground">
              Оформление: физлицо (перевод на карту) или ИП/ООО с НДС и закрывающими документами.
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
