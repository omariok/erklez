"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CONSENT_OPEN_EVENT,
  getConsent,
  setConsent,
} from "@/lib/consent";

// Баннер согласия на cookie. Показывается при первом заходе и повторно —
// когда согласие старше 12 месяцев или пользователь открыл настройки.
// «Принять» и «Только необходимые» — равнозначные кнопки (отказ не спрятан).
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getConsent()) setVisible(true);
    const open = () => setVisible(true);
    window.addEventListener(CONSENT_OPEN_EVENT, open);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, open);
  }, []);

  if (!visible) return null;

  const decide = (analytics: boolean) => {
    setConsent(analytics);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Использование cookie"
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-graphite-950/95 p-5 text-paper shadow-elevated backdrop-blur-xl sm:p-6">
        <p className="font-display text-lg font-semibold">Мы используем cookie</p>
        <p className="mt-2 text-sm leading-relaxed text-graphite-50/75">
          Технически необходимые cookie обеспечивают работу сайта и формы заявки — без них он
          не функционирует. Аналитические cookie (Яндекс.Метрика) помогают понять, как
          посетители пользуются сайтом, и включаются только с вашего согласия. Подробнее —
          в{" "}
          <Link href="/privacy#cookies" className="underline underline-offset-2 hover:text-white">
            политике обработки персональных данных
          </Link>
          .
        </p>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <button
            onClick={() => decide(true)}
            className="inline-flex h-11 items-center justify-center rounded-full bg-turquoise px-6 text-sm font-semibold text-white transition-colors hover:bg-turquoise-700"
          >
            Принять все
          </button>
          <button
            onClick={() => decide(false)}
            className="inline-flex h-11 items-center justify-center rounded-full border border-white/25 px-6 text-sm font-semibold text-paper transition-colors hover:bg-white/10"
          >
            Только необходимые
          </button>
        </div>
      </div>
    </div>
  );
}
