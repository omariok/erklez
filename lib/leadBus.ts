"use client";

// Лёгкая шина событий: карточки/калькулятор предзаполняют квиз,
// не связывая компоненты напрямую. Работает только в браузере.
export interface LeadPrefill {
  color?: string;
  volume?: string;
  source?: string;
}

const EVENT = "erklez:prefill-quiz";

export function openQuizWith(prefill: LeadPrefill) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<LeadPrefill>(EVENT, { detail: prefill }));
  document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" });
}

export function onQuizPrefill(cb: (p: LeadPrefill) => void) {
  const handler = (e: Event) => cb((e as CustomEvent<LeadPrefill>).detail);
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}
