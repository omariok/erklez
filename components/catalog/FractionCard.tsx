"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Fraction } from "@/types/content";

// Карточка фракции по дизайн-макету: тёмная, формат 3/4, фото на всю площадь,
// подсветка цветом при наведении, подписи Cormorant / Space Mono.
export function FractionCard({
  fraction,
  onRequest,
}: {
  fraction: Fraction;
  onRequest: (name: string) => void;
}) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      onClick={() => onRequest(fraction.name)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onRequest(fraction.name);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Запросить цену — ${fraction.name}`}
      className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-[20px] bg-graphite-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise focus-visible:ring-offset-2"
    >
      <Image
        src={fraction.images[0].src}
        alt={fraction.images[0].alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Затемнение снизу для читаемости подписи */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite-900/90 via-transparent to-transparent" />
      {/* Подсветка цветом фракции при наведении */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(120% 90% at 30% 20%, ${fraction.hex}66, transparent 55%)`,
          mixBlendMode: "screen",
        }}
      />

      {fraction.rare && (
        <span className="absolute left-4 top-4 z-10 rounded-full bg-graphite-900/70 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-paper backdrop-blur">
          Редкий цвет
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 z-[2] p-5">
        <span
          className="mb-2 block h-3.5 w-3.5 rounded-full border border-white/40"
          style={{ background: fraction.hex }}
        />
        <h3 className="font-display text-[28px] font-semibold leading-tight text-paper">
          {fraction.name}
        </h3>
        <span className="mt-2.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-aqua">
          Запросить цену <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </motion.article>
  );
}
