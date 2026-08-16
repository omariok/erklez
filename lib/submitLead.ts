import type { Lead } from "@/types/lead";
import { getMarketing } from "@/lib/utm";
import { YM_ID } from "@/lib/metrika";

// ClientID Яндекс.Метрики: привязывает заявку к конкретному посетителю.
// Нужен для офлайн-конверсий Директа — загрузки конверсий по ClientID/yclid
// в кабинете рекламы. Если Метрика не подключена — тихо пропускаем.
function getClientId(): Promise<string | undefined> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !window.ym || !YM_ID) {
      resolve(undefined);
      return;
    }
    let settled = false;
    const done = (v?: string) => {
      if (!settled) {
        settled = true;
        resolve(v);
      }
    };
    try {
      window.ym(YM_ID, "getClientID", (id: string) => done(id || undefined));
      // Страховка: если колбэк Метрики не придёт, не держим отправку заявки.
      setTimeout(() => done(undefined), 2000);
    } catch {
      done(undefined);
    }
  });
}

export async function submitLead(payload: Partial<Lead>): Promise<{ ok: boolean; error?: string }> {
  try {
    // Автоматически подмешиваем рекламные метки (UTM/yclid) + ClientID Метрики —
    // работает и для короткой формы, и для квиза, без изменений в самих формах.
    const clientId = await getClientId();
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...getMarketing(),
        ...payload,
        ...(clientId ? { clientId } : {}),
      }),
    });
    const data = await res.json();
    if (!res.ok) return { ok: false, error: data?.error ?? "Ошибка отправки" };
    return { ok: true };
  } catch {
    return { ok: false, error: "Сеть недоступна. Попробуйте позвонить." };
  }
}
