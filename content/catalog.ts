import type { Fraction } from "@/types/content";

// Каталог фракций. Цены и наличие цветов — уточнить у владельца.
// Фото бирюзы, зелёного и тёмного — реальные (public/media/catalog).
// Шампань — плейсхолдер (янтарное стекло, Pexels): реального фото этого цвета пока нет.

export const fractions: Fraction[] = [
  {
    slug: "biryuza",
    name: "Бирюза",
    color: "turquoise",
    tagline: "Самый популярный цвет — играет светом в воде",
    sizes: ["70–150 мм", "крупнее"],
    weightPerCubic: "1,2–1,4 т/м³",
    packaging: ["Биг-бэг 1 т", "Деревянный ящик / паллета", "Штучно в коробках"],
    hex: "#0E7490",
    images: [
      { src: "/media/catalog/biryuza-1.jpg", alt: "Эрклёз бирюза — крупный кусок декоративного стекла крупным планом", width: 960, height: 1280 },
      { src: "/media/catalog/biryuza-2.jpg", alt: "Эрклёз бирюза оптом — россыпь кускового стекла на складе", width: 960, height: 1280 },
      { src: "/media/catalog/biryuza-3.jpg", alt: "Эрклёз бирюза — прозрачный кусок стекла, оценка размера в руке", width: 960, height: 1280 },
    ],
    applications: ["Габионы", "Ландшафт", "Интерьер"],
  },
  {
    slug: "shampan",
    name: "Шампань",
    color: "champagne",
    tagline: "Тёплый оттенок — вплоть до метровых глыб",
    sizes: ["70–150 мм", "до метровых глыб"],
    weightPerCubic: "1,2–1,4 т/м³",
    packaging: ["Биг-бэг 1 т", "Деревянный ящик / паллета", "Штучно в коробках"],
    hex: "#E7D3A1",
    images: [
      { src: "/media/catalog/shampan-1.jpg", alt: "Эрклёз шампань — янтарное стекло тёплого оттенка", width: 1600, height: 2400 },
    ],
    applications: ["Интерьер", "Камины", "Флористика"],
  },
  {
    slug: "zelenyy",
    name: "Зелёный",
    color: "green",
    tagline: "Изумрудная глубина для сада и воды",
    sizes: ["70–150 мм", "крупнее"],
    weightPerCubic: "1,2–1,4 т/м³",
    packaging: ["Биг-бэг 1 т", "Деревянный ящик / паллета", "Штучно в коробках"],
    hex: "#0f766e",
    images: [
      { src: "/media/catalog/zelenyy-1.jpg", alt: "Эрклёз зелёный — кусковое декоративное стекло крупным планом", width: 960, height: 1280 },
      { src: "/media/catalog/zelenyy-2.jpg", alt: "Эрклёз зелёный — куски стекла в биг-бэге", width: 960, height: 1280 },
      { src: "/media/catalog/zelenyy-3.jpg", alt: "Эрклёз зелёный — фактура скола стекла на солнце", width: 960, height: 1280 },
    ],
    applications: ["Ландшафт", "Габионы", "Водоёмы"],
  },
  {
    slug: "temnyy",
    name: "Тёмный",
    color: "dark",
    tagline: "Редкий цвет — графит с хрустальными сколами",
    sizes: ["70–150 мм", "крупнее"],
    weightPerCubic: "1,2–1,4 т/м³",
    packaging: ["Биг-бэг 1 т", "Деревянный ящик / паллета", "Штучно в коробках"],
    hex: "#1E293B",
    images: [
      { src: "/media/catalog/temnyy-1.jpg", alt: "Эрклёз тёмный — колотое декоративное стекло с переливами", width: 1280, height: 960 },
      { src: "/media/catalog/temnyy-2.jpg", alt: "Эрклёз тёмный — куски стекла с хрустальными сколами в биг-бэге", width: 960, height: 1280 },
      { src: "/media/catalog/temnyy-3.jpg", alt: "Эрклёз тёмный — фактура графитового стекла крупным планом", width: 960, height: 1280 },
    ],
    applications: ["Интерьер", "Арт-объекты", "Кино и декор"],
    rare: true,
  },
];

// Оптовая цена — вынесена отдельно, часто меняется.
export const wholesale = {
  pricePerTon: 22000, // ₽/т от 10 тонн
  minTons: 10,
};
