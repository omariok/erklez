import { defineType, defineField } from "sanity";

// Вопрос-ответ FAQ.
export const faqItem = defineType({
  name: "faqItem",
  title: "Вопрос FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Вопрос", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", title: "Ответ", type: "text", rows: 3 }),
    defineField({ name: "order", title: "Порядок", type: "number" }),
  ],
});
