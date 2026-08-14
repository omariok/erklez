import { siteSettings } from "./siteSettings";
import { fraction } from "./fraction";
import { application } from "./application";
import { faqItem } from "./faqItem";

// Только типы, которые реально используются на сайте (см. lib/sanity/queries.ts).
// Схемы удалённых блоков (кейсы, «Авторские глыбы», карта складов) убраны,
// чтобы владелец не видел в админке разделы, ни на что не влияющие.
export const schemaTypes = [
  siteSettings,
  fraction,
  application,
  faqItem,
];
