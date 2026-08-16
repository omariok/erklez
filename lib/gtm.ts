// Google Tag Manager — опциональный слот под пиксели рекламных сетей
// (Авито, VK Реклама, партнёрские сети). Пока NEXT_PUBLIC_GTM_ID не задан —
// сам GTM не грузится, но dataLayer работает всегда: в него падают события
// конверсий, и любой пиксель можно подключить позже без правок кода сайта.
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

// Событие конверсии в dataLayer. Формат { event: "lead_submit", ...params } —
// стандарт для GTM и большинства пикселей.
export function pushEvent(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
