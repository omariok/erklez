import type { Application } from "@/types/content";

const ph = (q: string, alt: string) => ({
  src: `https://images.unsplash.com/${q}?auto=format&fit=crop&w=1000&q=80`,
  alt,
  width: 1000,
  height: 750,
});

// Блок 6 — 6 сфер применения. Закрывает вопрос «для чего берут».
export const applications: Application[] = [
  {
    slug: "gabiony",
    title: "Габионы и ограждения",
    blurb: "Тонна эрклёза = 3–4 метра забора с подсветкой.",
    image: ph("photo-1558904541-efa843a96f01", "габион из эрклёза с подсветкой"),
  },
  {
    slug: "landshaft",
    title: "Ландшафтный дизайн",
    blurb: "Сухие ручьи, клумбы, водоёмы, сады камней.",
    image: ph("photo-1585320806297-9794b3e4eeae", "сухой ручей из кускового стекла в саду"),
  },
  {
    slug: "kino",
    title: "Кино и декорации",
    blurb: "Нас выбирают кинопродакшны и театры.",
    image: ph("photo-1485846234645-a62644f84728", "декорации из эрклёза для съёмок"),
  },
  {
    slug: "interer",
    title: "Интерьер и камины",
    blurb: "Столешницы, полы со стеклом, декоративные вставки.",
    image: ph("photo-1616486338812-3dadae4b4ace", "декоративное стекло в интерьере и камине"),
  },
  {
    slug: "vitrazhi",
    title: "Витражи и остекление",
    blurb: "Панели, перегородки, вставки в фасады.",
    image: ph("photo-1513475382585-d06e58bcb0e0", "витраж из кускового стекла"),
  },
  {
    slug: "florist",
    title: "Флористика и арт-объекты",
    blurb: "Инсталляции, вазы, выставочные стенды.",
    image: ph("photo-1565193566173-7a0ee3dbe261", "арт-объект из эрклёза"),
  },
];
