import type { Lead } from "@/types/lead";

// Экранируем данные пользователя: они попадают в parse_mode "HTML".
// Иначе «<» или «&» в имени/комментарии ломают разметку, и Telegram
// отвечает 400 «can't parse entities» — заявка теряется.
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Отправка структурированного уведомления в Telegram (Bot API).
// Формат — как в PROJECT_BRIEF §5.
export async function sendLeadToTelegram(lead: Lead): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error("Telegram credentials are not configured");
  }

  const type = lead.audience === "business" ? "Бизнес (нужен НДС)" : "Частник";
  const lines = [
    "🟢 <b>НОВАЯ ЗАЯВКА с сайта</b>",
    `Имя: ${esc(lead.name)}`,
    `Тел: ${esc(lead.phone)}`,
    `Тип: ${type}`,
    lead.color ? `Цвет: ${esc(lead.color)}` : null,
    lead.volume ? `Объём: ${esc(lead.volume)}` : null,
    lead.purpose ? `Проект: ${esc(lead.purpose)}` : null,
    lead.inn ? `ИНН: ${esc(lead.inn)}` : null,
    lead.needVat ? "Нужен НДС / закрывающие: да" : null,
    lead.comment ? `Комментарий: ${esc(lead.comment)}` : null,
    `Источник: ${esc(lead.source ?? "Форма")}`,
  ].filter(Boolean);

  // Блок рекламных меток — видно, с какого объявления/кампании пришёл лид.
  const marketing = [
    lead.utmSource ? `utm_source: ${esc(lead.utmSource)}` : null,
    lead.utmMedium ? `utm_medium: ${esc(lead.utmMedium)}` : null,
    lead.utmCampaign ? `utm_campaign: ${esc(lead.utmCampaign)}` : null,
    lead.utmContent ? `utm_content: ${esc(lead.utmContent)}` : null,
    lead.utmTerm ? `utm_term: ${esc(lead.utmTerm)}` : null,
    lead.yclid ? `yclid: ${esc(lead.yclid)}` : null,
    lead.referrer ? `referrer: ${esc(lead.referrer)}` : null,
    lead.landingUrl ? `страница: ${esc(lead.landingUrl)}` : null,
  ].filter(Boolean);
  if (marketing.length) {
    lines.push("", "📣 <b>Реклама</b>", ...(marketing as string[]));
  }

  const res = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines.join("\n"),
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    }
  );

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Telegram API error: ${res.status} ${detail}`);
  }
}
