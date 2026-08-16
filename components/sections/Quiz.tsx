"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ConsentCheckbox } from "@/components/forms/ConsentCheckbox";
import { submitLead } from "@/lib/submitLead";
import { onQuizPrefill } from "@/lib/leadBus";
import { reportConversion, GOALS } from "@/lib/metrika";
import { fractions } from "@/content/catalog";

// Блок 3 — умный квиз с ветвлением частник/бизнес (3–4 шага).
type Audience = "private" | "business" | null;

const purposes = ["Сад / ландшафт", "Камин", "Интерьер", "Видеосъёмка", "Габионы"];
const privateVolumes = ["До 1 тонны", "1–5 тонн", "Другой объём"];
const businessVolumes = ["От 10 тонн", "20–50 тонн", "50+ тонн"];

export function Quiz() {
  const [step, setStep] = useState(0);
  const [audience, setAudience] = useState<Audience>(null);
  const [data, setData] = useState<Record<string, string | boolean>>({});
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [source, setSource] = useState("Квиз");
  // Пока играет exit-анимация старого шага (0.35s), его кнопки ещё кликабельны.
  // ref-блокировка (синхронная, без re-render) не даёт быстрому двойному клику
  // проскочить шаг (0→2), а setTimeout снимает её сразу после анимации.
  const busyRef = useRef(false);

  // Предзаполнение из каталога/калькулятора
  useEffect(() => {
    return onQuizPrefill((p) => {
      setData((d) => ({ ...d, ...(p.color ? { color: p.color } : {}), ...(p.volume ? { volume: p.volume } : {}) }));
      if (p.source) setSource(p.source);
    });
  }, []);

  const set = (k: string, v: string | boolean) => setData((d) => ({ ...d, [k]: v }));
  // Шагов ровно три (0–2). Ограничение сверху обязательно: пока старый шаг
  // проигрывает exit-анимацию, его кнопки ещё кликабельны, и повторный клик
  // (двойной клик) без лимита уводил step в 3 — там нет ветки рендера, и
  // карточка квиза становилась пустой.
  const lockStep = () => {
    if (busyRef.current) return false;
    busyRef.current = true;
    setTimeout(() => { busyRef.current = false; }, 400);
    return true;
  };
  const next = () => {
    // На шаге выбора цвет и объём подписаны как обязательные — проверяем,
    // чтобы «Далее» не пропускал пустые ответы (или вариант «Не знаю»).
    if (step === 1) {
      if (audience === "private" && !data.color)
        return toast.error("Выберите цвет или отметьте «Не знаю»");
      if (!data.volume) return toast.error("Укажите объём");
    }
    if (!lockStep()) return;
    setStep((s) => Math.min(2, s + 1));
  };
  const back = () => {
    if (!lockStep()) return;
    setStep((s) => Math.max(0, s - 1));
  };

  async function submit() {
    if (!consent) return toast.error("Требуется согласие на обработку данных");
    if (!data.name || String(data.phone ?? "").length < 10)
      return toast.error("Укажите имя и телефон");
    setLoading(true);
    const res = await submitLead({
      name: String(data.name),
      phone: String(data.phone),
      audience: audience ?? "private",
      color: data.color as string | undefined,
      purpose: data.purpose as string | undefined,
      volume: data.volume as string | undefined,
      inn: data.inn as string | undefined,
      comment: data.comment as string | undefined,
      needVat: audience === "business",
      consent: true as const,
      source,
    });
    setLoading(false);
    if (res.ok) {
      setDone(true);
      // Квиз — основной путь конверсии: цель Метрики + dataLayer для пикселей
      // (Авито/VK/партнёрки), иначе заявки из квиза не считаются.
      reportConversion(GOALS.leadSubmit, { source });
    } else {
      toast.error(res.error ?? "Ошибка");
    }
  }

  const inputCls =
    "h-12 w-full rounded-xl border border-border bg-white px-4 focus:outline-none focus:ring-2 focus:ring-turquoise";

  return (
    <section id="quiz" className="bg-graphite-50 py-14 md:py-20">
      <div className="container">
        <div>
          <span className="font-mono text-[13px] uppercase tracking-[0.14em] text-turquoise">
            02 — Расчёт
          </span>
          <h2 className="mt-3.5 font-display text-[clamp(34px,4.5vw,60px)] font-medium leading-[1.02] tracking-[-0.01em] text-graphite-900">
            Рассчитайте цену под ваш проект
          </h2>
        </div>
        <p className="mt-3 max-w-xl text-muted-foreground">
          3 шага — и мы подготовим индивидуальное предложение.
        </p>

        <div className="mx-auto mt-8 max-w-2xl rounded-3xl border border-border bg-card p-6 shadow-glass sm:p-10">
          {done ? (
            <div className="py-8 text-center">
              <div className="font-display text-2xl font-bold text-graphite-900">Заявка принята ✓</div>
              <p className="mt-2 text-muted-foreground">
                Ваша заявка принята, менеджер свяжется с вами.
              </p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {step === 0 && (
                  <div>
                    <h3 className="text-lg font-semibold">Вы покупаете для частного проекта или для бизнеса?</h3>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <button
                        onClick={() => { setAudience("private"); next(); }}
                        className="rounded-2xl border border-border p-6 text-left transition-colors hover:border-turquoise hover:bg-turquoise/5"
                      >
                        <div className="font-semibold">Частный проект</div>
                        <div className="mt-1 text-sm text-muted-foreground">Сад, камин, интерьер, съёмка</div>
                      </button>
                      <button
                        onClick={() => { setAudience("business"); next(); }}
                        className="rounded-2xl border border-border p-6 text-left transition-colors hover:border-turquoise hover:bg-turquoise/5"
                      >
                        <div className="font-semibold">Бизнес (нужен НДС)</div>
                        <div className="mt-1 text-sm text-muted-foreground">Опт от 10 т, документы, тендеры</div>
                      </button>
                    </div>
                  </div>
                )}

                {step === 1 && audience === "private" && (
                  <div>
                    <h3 className="text-lg font-semibold">Выберите цвет, назначение и объём</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Отметьте по одному варианту в каждой группе — цвет и объём обязательны.
                    </p>
                    <FieldGroup label="Цвет" required>
                      {fractions.map((f) => (
                        <Chip key={f.slug} active={data.color === f.name} onClick={() => set("color", f.name)}>
                          {f.name}
                        </Chip>
                      ))}
                      <Chip active={data.color === "Не знаю"} onClick={() => set("color", "Не знаю")}>
                        Не знаю
                      </Chip>
                    </FieldGroup>
                    <FieldGroup label="Для чего">
                      {purposes.map((p) => (
                        <Chip key={p} active={data.purpose === p} onClick={() => set("purpose", p)}>
                          {p}
                        </Chip>
                      ))}
                    </FieldGroup>
                    <FieldGroup label="Объём" required>
                      {privateVolumes.map((v) => (
                        <Chip key={v} active={data.volume === v} onClick={() => set("volume", v)}>
                          {v}
                        </Chip>
                      ))}
                    </FieldGroup>
                    <StepNav onBack={back} onNext={next} />
                  </div>
                )}

                {step === 1 && audience === "business" && (
                  <div>
                    <h3 className="text-lg font-semibold">Объём и документы</h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {businessVolumes.map((v) => (
                        <Chip key={v} active={data.volume === v} onClick={() => set("volume", v)}>
                          {v}
                        </Chip>
                      ))}
                    </div>
                    <input
                      placeholder="ИНН (для закрывающих документов)"
                      aria-label="ИНН"
                      inputMode="numeric"
                      className={`${inputCls} mt-4`}
                      value={(data.inn as string) ?? ""}
                      onChange={(e) => set("inn", e.target.value)}
                    />
                    <StepNav onBack={back} onNext={next} />
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h3 className="text-lg font-semibold">Куда отправить расчёт?</h3>
                    <div className="mt-4 grid gap-3">
                      <input
                        placeholder="Имя"
                        aria-label="Имя"
                        name="name"
                        autoComplete="name"
                        className={inputCls}
                        value={(data.name as string) ?? ""}
                        onChange={(e) => set("name", e.target.value)}
                      />
                      <input
                        placeholder="Телефон"
                        aria-label="Телефон"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        className={inputCls}
                        value={(data.phone as string) ?? ""}
                        onChange={(e) => set("phone", e.target.value)}
                      />
                      <textarea
                        placeholder="Дополнительная информация"
                        aria-label="Дополнительная информация"
                        name="comment"
                        rows={4}
                        maxLength={600}
                        className="min-h-28 w-full resize-none rounded-xl border border-border bg-white px-4 py-3 text-[15px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-turquoise sm:resize-y"
                        value={(data.comment as string) ?? ""}
                        onChange={(e) => set("comment", e.target.value)}
                      />
                      <ConsentCheckbox checked={consent} onChange={setConsent} />
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <button onClick={back} className="text-sm text-muted-foreground hover:text-graphite-900">
                        Назад
                      </button>
                      <Button onClick={submit} disabled={loading}>
                        {loading ? "Отправляем…" : "Получить расчёт"}
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
}

function Chip({ children, active, onClick }: { children: React.ReactNode; active?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm transition-colors ${
        active ? "border-turquoise bg-turquoise text-white" : "border-border hover:border-turquoise"
      }`}
    >
      {children}
    </button>
  );
}

// Подписанная группа чипов — чтобы было видно, что это отдельные поля
// (цвет, назначение, объём), а не одна общая куча вариантов.
function FieldGroup({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5">
      <div className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-turquoise">
        {label}
        {required && (
          <>
            <span aria-hidden="true"> *</span>
            <span className="sr-only"> (обязательно)</span>
          </>
        )}
      </div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function StepNav({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <div className="mt-6 flex items-center justify-between">
      <button onClick={onBack} className="text-sm text-muted-foreground hover:text-graphite-900">
        Назад
      </button>
      <Button onClick={onNext}>Далее</Button>
    </div>
  );
}
