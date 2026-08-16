"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ConsentCheckbox } from "@/components/forms/ConsentCheckbox";
import { submitLead } from "@/lib/submitLead";
import { reportConversion, GOALS } from "@/lib/metrika";

// Короткая форма: Имя + Телефон + Комментарий (минимальное трение) — Блок 8.
export function LeadForm({ source = "Финальный CTA" }: { source?: string }) {
  const [form, setForm] = useState({ name: "", phone: "", comment: "" });
  // Honeypot: реальные пользователи это поле не видят и не заполняют.
  const [website, setWebsite] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) return toast.error("Требуется согласие на обработку данных");
    if (form.name.length < 2 || form.phone.length < 10)
      return toast.error("Заполните имя и телефон");

    setLoading(true);
    const res = await submitLead({ ...form, website, consent: true as const, source });
    setLoading(false);

    if (res.ok) {
      setDone(true);
      reportConversion(GOALS.leadSubmit, { source });
      toast.success("Заявка принята! Менеджер свяжется с вами.");
    } else {
      toast.error(res.error ?? "Ошибка");
    }
  }

  if (done)
    return (
      <div className="rounded-2xl bg-white/10 p-8 text-center text-white">
        <div className="font-display text-2xl font-bold">Заявка принята ✓</div>
        <p className="mt-2 text-white/70">Менеджер свяжется с вами.</p>
      </div>
    );

  return (
    <form onSubmit={handleSubmit} className="relative grid gap-3">
      {/* Honeypot — скрыт от людей, видим для ботов */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      <input
        placeholder="Имя"
        aria-label="Имя"
        name="name"
        autoComplete="name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="h-12 rounded-xl border border-white/20 bg-white/10 px-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-turquoise"
      />
      <input
        placeholder="Телефон"
        aria-label="Телефон"
        name="phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="h-12 rounded-xl border border-white/20 bg-white/10 px-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-turquoise"
      />
      <textarea
        placeholder="Опишите задачу"
        aria-label="Опишите задачу"
        name="comment"
        rows={4}
        maxLength={600}
        value={form.comment}
        onChange={(e) => setForm({ ...form, comment: e.target.value })}
        className="min-h-28 w-full resize-y rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-turquoise"
      />
      <ConsentCheckbox checked={consent} onChange={setConsent} />
      <Button type="submit" size="lg" disabled={loading} className="mt-1">
        {loading ? "Отправляем…" : "Получить расчёт"}
      </Button>
    </form>
  );
}
