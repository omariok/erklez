import Image from "next/image";

// Лента фотографий материала — медленная «бегущая строка».
// Только реальные снимки со складов и крупные планы: ничего выдуманного.
// Анимация чисто CSS (без JS), движется постоянно (в том числе при наведении),
// останавливается при prefers-reduced-motion (глобальное правило в globals.css).

const shots = [
  { src: "/media/gallery/g01.jpg", w: 480, h: 640, alt: "Эрклёз бирюза — россыпь кускового стекла на складе" },
  { src: "/media/gallery/g02.jpg", w: 480, h: 640, alt: "Бирюзовый эрклёз — крупная партия на площадке" },
  { src: "/media/gallery/g03.jpg", w: 480, h: 640, alt: "Эрклёз бирюза в биг-бэге, фракция 70–150 мм" },
  { src: "/media/gallery/g04.jpg", w: 854, h: 640, alt: "Тёмный эрклёз — куски стекла с зеркальными сколами" },
  { src: "/media/gallery/g05.jpg", w: 480, h: 640, alt: "Зелёный эрклёз в биг-бэге на солнце" },
  { src: "/media/gallery/g06.jpg", w: 480, h: 640, alt: "Зелёный эрклёз крупным планом — прозрачные сколы" },
  { src: "/media/gallery/g07.jpg", w: 480, h: 640, alt: "Эрклёз с переливами — игра света на гранях стекла" },
  { src: "/media/gallery/g08.jpg", w: 480, h: 640, alt: "Оливково-зелёный эрклёз, фактура скола" },
  { src: "/media/gallery/g09.jpg", w: 480, h: 640, alt: "Тёмный эрклёз с радужным отливом в биг-бэге" },
  { src: "/media/gallery/g10.jpg", w: 480, h: 640, alt: "Тёмный эрклёз — подготовленная к отгрузке партия" },
];

export function Gallery() {
  // Дублируем список — вторая половина обеспечивает бесшовный цикл.
  const track = [...shots, ...shots];

  return (
    <section id="gallery" className="overflow-hidden bg-graphite-950 py-14 md:py-20">
      <div className="container mb-8">
        <span className="font-mono text-[13px] uppercase tracking-[0.14em] text-aqua">
          06 — Материал
        </span>
        <h2 className="mt-3.5 max-w-[20ch] font-display text-[clamp(34px,4.5vw,60px)] font-medium leading-[1.02] tracking-[-0.01em] text-paper">
          Живые фото
        </h2>
      </div>

      <div className="relative">
        {/* Отступ задаём каждому элементу (а не gap контейнеру): иначе при
            translateX(-50%) в точке стыка двух половин ленты возникает скачок
            на половину зазора. С per-item margin цикл бесшовный. */}
        <div className="flex w-max animate-marquee">
          {track.map((s, i) => (
            <figure
              key={`${s.src}-${i}`}
              className="relative mr-4 h-[220px] shrink-0 overflow-hidden rounded-2xl md:h-[300px]"
            >
              <Image
                src={s.src}
                alt={i < shots.length ? s.alt : ""}
                width={s.w}
                height={s.h}
                sizes="(max-width: 768px) 60vw, 30vw"
                aria-hidden={i >= shots.length}
                className="h-full w-auto object-cover"
              />
            </figure>
          ))}
        </div>

        {/* Мягкое затухание по краям ленты */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-graphite-950 to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-graphite-950 to-transparent md:w-32" />
      </div>
    </section>
  );
}
