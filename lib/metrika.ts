// Яндекс.Метрика — единая точка. ID берётся из env NEXT_PUBLIC_YM_ID.
// Пока ID не задан — счётчик не подключается, а reachGoal тихо ничего не делает
// (безопасно для сборки и для разработки). Достаточно вписать номер счётчика в .env.
import { pushEvent } from "@/lib/gtm";

export const YM_ID = process.env.NEXT_PUBLIC_YM_ID;

type YmParams = Record<string, unknown>;

declare global {
  interface Window {
    ym?: (id: string | number, action: string, ...args: unknown[]) => void;
  }
}

// Достижение цели Метрики. Названия целей заводятся в интерфейсе Метрики
// с теми же идентификаторами (см. GOALS ниже).
export function reachGoal(goal: string, params?: YmParams) {
  if (typeof window === "undefined" || !window.ym || !YM_ID) return;
  window.ym(YM_ID, "reachGoal", goal, params);
}

// Единая точка фиксации конверсии: цель Метрики + событие в dataLayer.
// dataLayer нужен пикселям Авито / VK Рекламы / партнёрок (через GTM) —
// событие пишется всегда, независимо от того, подключён ли GTM.
export function reportConversion(goal: string, params?: YmParams) {
  reachGoal(goal, params);
  pushEvent(goal, params);
}

// Идентификаторы целей — заводятся в Метрике один в один.
export const GOALS = {
  leadSubmit: "lead_submit", // отправлена форма заявки
  contactTelegram: "contact_telegram",
  contactWhatsApp: "contact_whatsapp",
  contactPhone: "contact_phone",
} as const;
