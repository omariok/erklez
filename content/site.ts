import type { SiteConfig } from "@/types/content";

// ⚠️ ПЛЕЙСХОЛДЕРЫ — заменить на реальные данные владельца перед продом.
// Это единственное место для контактов, реквизитов и счётчиков.
export const site: SiteConfig = {
  name: "Эрклёз",
  domain: "erklez.ru",
  phone: "+7 (921) 441-64-45",
  telegram: "ddjoint",
  whatsapp: "79214416445",
  legal: {
    entity: "ИП/ООО (уточнить)",
    inn: "0000000000",
    vat: true,
  },
  stats: [
    { label: "Отгружено", value: "500+ т" },
    { label: "На рынке", value: "с 20XX" },
    { label: "Склада в РФ", value: "2" },
  ],
};
