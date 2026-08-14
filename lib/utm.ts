// Захват рекламных меток (UTM + yclid Яндекс.Директа) и сохранение на сессию.
// Логика last-touch: если в URL есть метки — перезаписываем; если нет — храним
// то, что поймали на входе. Значения затем автоматически подмешиваются в заявку
// (см. lib/submitLead) и уходят в Telegram — так видно, с какого объявления лид.

const STORAGE_KEY = "erklez_mkt";

// param в URL -> поле заявки
const PARAM_MAP: Record<string, string> = {
  utm_source: "utmSource",
  utm_medium: "utmMedium",
  utm_campaign: "utmCampaign",
  utm_content: "utmContent",
  utm_term: "utmTerm",
  yclid: "yclid", // click id Яндекс.Директа
};

export type Marketing = Partial<Record<string, string>>;

export function captureMarketing(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const hasAny = Object.keys(PARAM_MAP).some((k) => params.get(k));
  if (!hasAny) return; // прямой заход — не затираем прошлый источник

  const data: Marketing = {};
  for (const [param, field] of Object.entries(PARAM_MAP)) {
    const v = params.get(param);
    if (v) data[field] = v.slice(0, 200);
  }
  data.landingUrl = window.location.href.slice(0, 300);
  if (document.referrer) data.referrer = document.referrer.slice(0, 300);

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* приватный режим / storage недоступен — не критично */
  }
}

export function getMarketing(): Marketing {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}") as Marketing;
  } catch {
    return {};
  }
}
