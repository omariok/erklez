import { NextResponse } from "next/server";
import { leadSchema } from "@/types/lead";
import { sendLeadToTelegram } from "@/lib/telegram";

export const runtime = "nodejs";

// Простейший лимит частоты (в памяти процесса): защищает от спама формой.
// Для одного инстанса этого достаточно; при масштабировании заменить на Redis.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  // Подчищаем карту, чтобы не росла бесконечно.
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (!times.some((t) => now - t < WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

// Защита от CSRF: браузер обязан прислать Origin (или Referer как запасной
// вариант), и хост в нём должен совпадать с хостом запроса. Чужие сайты,
// отправляющие форму скриптом от имени посетителя, отсекаются здесь.
// За прокси реальный хост даёт x-forwarded-host.
function isSameOrigin(req: Request): boolean {
  const originHeader = req.headers.get("origin") ?? req.headers.get("referer");
  if (!originHeader) return false;
  let origin: URL;
  try {
    origin = new URL(originHeader);
  } catch {
    return false;
  }
  const requestHost = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  return !!requestHost && origin.host === requestHost;
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (!isSameOrigin(req)) {
      return NextResponse.json(
        { error: "Не удалось подтвердить источник заявки. Отправьте форму с сайта." },
        { status: 403 }
      );
    }

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Слишком много попыток. Попробуйте через минуту или позвоните нам." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Проверьте поля формы" },
        { status: 400 }
      );
    }

    // Honeypot: если бот заполнил скрытое поле — молча «успех».
    if (parsed.data.website) {
      return NextResponse.json({ ok: true });
    }

    await sendLeadToTelegram(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead error:", err);
    return NextResponse.json(
      { error: "Не удалось отправить заявку. Попробуйте позвонить." },
      { status: 500 }
    );
  }
}
