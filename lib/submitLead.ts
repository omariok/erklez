import type { Lead } from "@/types/lead";
import { getMarketing } from "@/lib/utm";

export async function submitLead(payload: Partial<Lead>): Promise<{ ok: boolean; error?: string }> {
  try {
    // Автоматически подмешиваем рекламные метки (UTM/yclid) — работает
    // и для короткой формы, и для квиза, без изменений в самих формах.
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...getMarketing(), ...payload }),
    });
    const data = await res.json();
    if (!res.ok) return { ok: false, error: data?.error ?? "Ошибка отправки" };
    return { ok: true };
  } catch {
    return { ok: false, error: "Сеть недоступна. Попробуйте позвонить." };
  }
}
