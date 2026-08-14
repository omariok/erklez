import Link from "next/link";

// Шапка по дизайн-макету: логотип Cormorant с широким трекингом, навигация, CTA.
// Переключатель аудитории убран — выбор происходит в квизе.
const nav = [
  { href: "#catalog", label: "Каталог" },
  { href: "#applications", label: "Применение" },
  { href: "#quiz", label: "Расчёт" },
  { href: "#logistics", label: "Склады" },
  { href: "#faq", label: "Вопросы" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-[100] flex flex-wrap items-center justify-between gap-4 border-b border-graphite-900/10 bg-paper/70 px-5 py-3.5 backdrop-blur-xl sm:px-10 lg:px-[72px]">
      <Link
        href="#top"
        className="pl-1.5 font-display text-[26px] font-semibold tracking-[0.26em] text-graphite-900 min-[380px]:tracking-[0.42em]"
      >
        ЭРКЛЁЗ
      </Link>

      <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 lg:flex">
        {nav.map((n) => (
          <a key={n.href} href={n.href} className="transition-colors hover:text-turquoise">
            {n.label}
          </a>
        ))}
      </nav>

      <a
        href="#quiz"
        className="inline-flex items-center gap-2 rounded-full bg-graphite-900 px-5 py-2.5 text-sm font-semibold text-paper transition-all hover:-translate-y-px hover:bg-turquoise"
      >
        Получить цену
      </a>
    </header>
  );
}
