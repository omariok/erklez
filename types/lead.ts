import { z } from "zod";

// Схема заявки — используется и на клиенте (валидация формы),
// и на сервере (api/lead). Минимум трения, мгновенная валидация.
export const leadSchema = z.object({
  name: z.string().min(2, "Укажите имя").max(100, "Слишком длинное имя"),
  phone: z
    .string()
    .min(10, "Укажите телефон")
    .max(30, "Некорректный телефон")
    .regex(/^[\d\s()+-]+$/, "Некорректный телефон"),
  audience: z.enum(["private", "business"]).default("private"),
  color: z.string().max(100).optional(),
  purpose: z.string().max(200).optional(),
  volume: z.string().max(100).optional(),
  inn: z.string().max(12).optional(),
  needVat: z.boolean().optional(),
  comment: z.string().max(600).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Требуется согласие на обработку данных" }),
  }),
  source: z.string().max(100).optional(), // «Квиз» / «Финальный CTA» / «Каталог»
  // Рекламные метки — подмешиваются автоматически (lib/utm).
  utmSource: z.string().max(200).optional(),
  utmMedium: z.string().max(200).optional(),
  utmCampaign: z.string().max(200).optional(),
  utmContent: z.string().max(200).optional(),
  utmTerm: z.string().max(200).optional(),
  yclid: z.string().max(200).optional(),
  clientId: z.string().max(200).optional(), // ClientID Яндекс.Метрики — для офлайн-конверсий Директа
  referrer: z.string().max(300).optional(),
  landingUrl: z.string().max(300).optional(),
  // Honeypot — у людей пустое. Не режем валидацией: пусть заявка пройдёт схему,
  // а роут тихо ответит «успех» боту (см. app/api/lead/route.ts).
  website: z.string().max(500).optional(),
});

export type Lead = z.infer<typeof leadSchema>;
