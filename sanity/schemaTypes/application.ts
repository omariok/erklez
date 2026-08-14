import { defineType, defineField } from "sanity";

// Сфера применения (плитка).
export const application = defineType({
  name: "application",
  title: "Сфера применения",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Заголовок", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Слаг", type: "slug", options: { source: "title" } }),
    defineField({ name: "blurb", title: "Подпись", type: "string" }),
    defineField({
      name: "image",
      title: "Фото",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt", type: "string" }],
    }),
    defineField({ name: "order", title: "Порядок", type: "number" }),
  ],
});
