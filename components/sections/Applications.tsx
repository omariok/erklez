import Image from "next/image";
import type { Application } from "@/types/content";
import { SectionReveal } from "@/components/motion/SectionReveal";

// Блок 6 — Сферы применения. 6 плиток «для чего берут».
export function Applications({ applications }: { applications: Application[] }) {
  return (
    <section id="applications" className="bg-graphite-50 py-14 md:py-20">
      <div className="container">
        <SectionReveal className="mb-8">
          <span className="font-mono text-[13px] uppercase tracking-[0.14em] text-turquoise">
            03 — Применение
          </span>
          <h2 className="mt-3.5 font-display text-[clamp(34px,4.5vw,60px)] font-medium leading-[1.02] tracking-[-0.01em] text-graphite-900">
            Где применяют эрклёз
          </h2>
        </SectionReveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {applications.map((a, i) => (
            <SectionReveal key={a.slug} delay={i * 0.05}>
              <article className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={a.image.src}
                  alt={a.image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite-950/90 via-graphite-950/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <h3 className="font-display text-lg font-semibold">{a.title}</h3>
                  <p className="mt-1 text-sm text-white/80">{a.blurb}</p>
                </div>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
