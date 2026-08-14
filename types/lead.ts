import { z } from "zod";

// Схема заявки — используется и на клиенте (валидация формы),
// и на сервере (api/lead). Минимум трения, мгновенная валидация.
export const leadSchema = z.object({
  name: z.string().min(2, "Укажите имя"),
  phone: z
    .string()
    .min(10, "Укажите телефон")
    .regex(/^[\d\s()+-]+$/, "Некорректный телефон"),
  audience: z.enum(["private", "business"]).default("private"),
  color: z.string().optional(),
  purpose: z.string().optional(),
  volume: z.string().optional(),
  inn: z.string().optional(),
  needVat: z.boolean().optional(),
  comment: z.string().max(600).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Требуется согласие на обработку данных" }),
  }),
  source: z.string().optional(), // «Квиз» / «Финальный CTA» / «Каталог»
  // Рекламные метки — подмешиваются автоматически (lib/utm).
  utmSource: z.string().max(200).optional(),
  utmMedium: z.string().max(200).optional(),
  utmCampaign: z.string().max(200).optional(),
  utmContent: z.string().max(200).optional(),
  utmTerm: z.string().max(200).optional(),
  yclid: z.string().max(200).optional(),
  referrer: z.string().max(300).optional(),
  landingUrl: z.string().max(300).optional(),
  // Honeypot — у людей пустое. Не режем валидацией: пусть заявка пройдёт схему,
  // а роут тихо ответит «успех» боту (см. app/api/lead/route.ts).
  website: z.string().optional(),
});

export type Lead = z.infer<typeof leadSchema>;
