import Link from "next/link";

// Брендированная 404 — на неё попадает трафик с битых ссылок рекламы
// и партнёрок: вместо «дефолтной» страницы Next.js человек видит сайт
// и один клик до главной, а не уходит обратно в выдачу.
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-graphite-950 px-6 text-center">
      <span className="font-mono text-[13px] uppercase tracking-[0.14em] text-aqua">Ошибка 404</span>
      <h1 className="mt-4 max-w-[16ch] font-display text-[clamp(40px,6vw,72px)] font-medium leading-[1.05] text-paper text-balance">
        Страница не найдена
      </h1>
      <p className="mt-3 max-w-md text-slate-400">
        Возможно, ссылка устарела или страница переехала. Загляните на главную — там всё самое важное.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center rounded-full bg-turquoise px-8 font-semibold text-white transition-colors hover:bg-turquoise-700"
      >
        На главную
      </Link>
    </main>
  );
}
