import { LeadForm } from "@/components/forms/LeadForm";
import { SectionReveal } from "@/components/motion/SectionReveal";

// Блок 8 — Финальный CTA. Контрастный тёмный экран, короткая форма.
export function FinalCta() {
  return (
    <section id="contact" className="bg-graphite-950 py-14 text-white md:py-20">
      <div className="container grid items-center gap-12 lg:grid-cols-2">
        <SectionReveal>
          <h2 className="font-display text-[clamp(32px,4vw,56px)] font-medium leading-[1.03] text-balance">
            Получите расчёт под ваш объём
          </h2>
          <p className="mt-5 max-w-md text-white/70">
            Оставьте контакты — подготовим цену и наличие. Заявка мгновенно приходит менеджеру в Telegram.
          </p>
        </SectionReveal>
        <SectionReveal delay={0.1} className="w-full max-w-md justify-self-end">
          <LeadForm source="Финальный CTA" />
        </SectionReveal>
      </div>
    </section>
  );
}
