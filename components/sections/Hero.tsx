"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { documents } from "@/content/documents";

// Блок 1 — Главный экран по дизайн-макету.
// Тёмный фон + видеофон стекла, «заметающий» бирюзовый свет, eyebrow-пилюля,
// заголовок Cormorant с курсивным акцентом «из печи», 2 CTA и нумерованные пикто.
// Появление — CSS-классы .hero-reveal (без framer-motion), чтобы без JS контент
// оставался видимым (см. html.js в layout и globals.css).

const pictos = [
  { big: "01", label: "Напрямую из печи" },
  { big: "1", label: "От одного камня" },
  { big: "НДС", label: "ИП / ООО" },
  { big: "2", label: "Площадки в РФ" },
];

export function Hero() {
  const [shown, setShown] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    // Раскрываем на следующем кадре после монтирования — стаггер задаётся
    // через transition-delay у каждого элемента.
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const reveal = (i: number) => cn("hero-reveal", shown && "is-visible");
  const delay = (i: number) => ({ transitionDelay: `${i * 90}ms` });

  // Прайса пока нет — ведём в квиз, чтобы не отдавать 404.
  const priceHref = documents.price ?? "#quiz";
  const priceLabel = documents.price ? "Скачать оптовый прайс с НДС" : "Запросить оптовый прайс с НДС";

  // overflow-hidden намеренно НЕ на секции: иначе на низких экранах контент,
  // выровненный по низу, обрезается сверху. Клипим только фоновые слои.
  return (
    <section
      id="top"
      className="relative flex min-h-[88svh] items-end bg-graphite-900 px-5 pb-16 pt-20 sm:px-10 sm:pb-20 sm:pt-24 lg:px-[72px]"
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Видеофон стекла — декоративный, скрыт от скринридеров */}
        <video
          className="absolute inset-0 z-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          poster="/media/hero-poster.jpg"
        >
          <source src="/media/hero.mp4" type="video/mp4" />
        </video>

        {/* Затемнение для читаемости */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,23,42,0.55) 0%, rgba(15,23,42,0.18) 40%, rgba(15,23,42,0.82) 100%)",
          }}
        />
        {/* Заметающий бирюзовый свет (при reduced-motion — статичное свечение) */}
        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 z-[2] w-[45%]",
            reduce ? "opacity-30" : "animate-sweep"
          )}
          style={{
            background: "linear-gradient(120deg, rgba(14,116,144,0.35), transparent 70%)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      <div className="relative z-[3] mx-auto w-full max-w-[1180px]">
        <h1
          className={cn(
            reveal(0),
            "m-0 mb-6 max-w-[15ch] font-display text-[clamp(40px,7vw,104px)] font-medium leading-[1] tracking-[-0.01em] text-paper text-balance"
          )}
          style={delay(0)}
        >
          Эрклёз напрямую <span className="italic text-aqua">из печи</span> — от одного камня до 100+ тонн
        </h1>

        <p
          className={cn(
            reveal(1),
            "m-0 mb-5 max-w-[46ch] text-[clamp(16px,1.5vw,21px)] font-light leading-[1.55] text-slate-300"
          )}
          style={delay(1)}
        >
          Декоративное кусковое стекло с игрой света, как у хрусталя. Работаем с НДС, отгружаем по всей России с двух площадок.
        </p>

        <div className={cn(reveal(2), "mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap")} style={delay(2)}>
          <a href="#quiz" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}>
            Рассчитать и получить цену →
          </a>
          <a
            href={priceHref}
            className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full border border-paper/25 bg-paper/[0.08] px-8 text-base font-semibold text-paper transition-all hover:bg-paper/[0.16] sm:w-auto"
          >
            {priceLabel}
          </a>
        </div>

        <div
          className={cn(
            reveal(3),
            "mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-paper/15 pt-6 sm:flex sm:flex-wrap sm:gap-x-16"
          )}
          style={delay(3)}
        >
          {pictos.map((p) => (
            <div key={p.label} className="flex flex-col gap-1">
              <span className="font-display text-3xl font-semibold leading-none text-aqua">{p.big}</span>
              <span className="text-[13px] tracking-[0.02em] text-slate-400">{p.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
