// Согласие на cookie/аналитику.
//
// Правовая рамка (РФ):
// • cookie, позволяющие выделить пользователя, относятся к персональным данным →
//   действует 152-ФЗ: информировать, описать в политике, дать возможность отказаться;
// • для аналитических и рекламных трекеров (Яндекс.Метрика и т.п.) требуется
//   явное согласие — просто уведомления «мы используем cookie» недостаточно;
// • срок действия согласия — не более 12 месяцев, затем спрашиваем снова.
//
// Поэтому: технически необходимые cookie работают всегда, аналитика включается
// только после явного «Принять». Отказ — равноценная по доступности кнопка.

export const CONSENT_KEY = "erklez_consent_v1";
export const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000; // 12 месяцев

export const CONSENT_CHANGE_EVENT = "erklez:consent-change";
export const CONSENT_OPEN_EVENT = "erklez:consent-open";

export interface ConsentValue {
  analytics: boolean;
  ts: number; // когда дано согласие
}

export function getConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentValue;
    if (typeof parsed?.analytics !== "boolean" || typeof parsed?.ts !== "number") return null;
    // Согласие «протухло» — спрашиваем заново.
    if (Date.now() - parsed.ts > CONSENT_MAX_AGE_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function setConsent(analytics: boolean): void {
  if (typeof window === "undefined") return;
  const value: ConsentValue = { analytics, ts: Date.now() };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
  } catch {
    /* приватный режим — не критично */
  }
  window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_CHANGE_EVENT, { detail: value }));
}

// Повторно открыть баннер (ссылка «Настройки cookie» в подвале).
export function openConsentSettings(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}
