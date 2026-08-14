import { defineType, defineField } from "sanity";

// Настройки сайта — единый документ (контакты, реквизиты, счётчики).
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Настройки сайта",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Название", type: "string" }),
    defineField({ name: "domain", title: "Домен", type: "string" }),
    defineField({ name: "phone", title: "Телефон", type: "string" }),
    defineField({ name: "telegram", title: "Telegram (@username)", type: "string" }),
    defineField({ name: "whatsapp", title: "WhatsApp (номер)", type: "string" }),
    defineField({ name: "entity", title: "Юр. лицо (ИП/ООО)", type: "string" }),
    defineField({ name: "inn", title: "ИНН", type: "string" }),
    defineField({ name: "vat", title: "Работаем с НДС", type: "boolean", initialValue: true }),
    defineField({
      name: "stats",
      title: "Счётчики доверия",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", title: "Значение (напр. 500+ т)", type: "string" },
            { name: "label", title: "Подпись", type: "string" },
          ],
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Настройки сайта" }) },
});
