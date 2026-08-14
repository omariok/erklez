import { defineType, defineField } from "sanity";

// Фракция каталога (цвет эрклёза).
export const fraction = defineType({
  name: "fraction",
  title: "Фракция (цвет)",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Название", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Слаг", type: "slug", options: { source: "name" } }),
    defineField({
      name: "color",
      title: "Цвет",
      type: "string",
      options: {
        list: [
          { title: "Бирюза", value: "turquoise" },
          { title: "Шампань", value: "champagne" },
          { title: "Зелёный", value: "green" },
          { title: "Тёмный", value: "dark" },
        ],
      },
    }),
    defineField({ name: "hex", title: "HEX для подсветки", type: "string" }),
    defineField({ name: "tagline", title: "Короткая подпись", type: "string" }),
    defineField({ name: "sizes", title: "Фракции (размеры)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "weightPerCubic", title: "Вес куба", type: "string", initialValue: "1,2–1,4 т/м³" }),
    defineField({ name: "packaging", title: "Фасовки", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "applications", title: "Применение", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "rare", title: "Редкий цвет", type: "boolean", initialValue: false }),
    defineField({
      name: "images",
      title: "Фото (с alt для SEO)",
      type: "array",
      of: [{ type: "image", options: { hotspot: true }, fields: [{ name: "alt", title: "Alt", type: "string" }] }],
    }),
    defineField({ name: "order", title: "Порядок", type: "number" }),
  ],
});
