"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faq } from "@/content/faq";
import { SectionReveal } from "@/components/motion/SectionReveal";

// Блок 4 — FAQ / борьба с возражениями. (JSON-LD FAQPage добавляется в page.tsx)
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-14 md:py-20">
      <div className="container">
        <SectionReveal>
          <span className="font-mono text-[13px] uppercase tracking-[0.14em] text-turquoise">
            04 — Вопросы
          </span>
          <h2 className="mt-3.5 font-display text-[clamp(34px,4.5vw,60px)] font-medium leading-[1.02] tracking-[-0.01em] text-graphite-900">
            Частые вопросы
          </h2>
        </SectionReveal>
        <div className="mx-auto mt-8 max-w-3xl divide-y divide-border border-y border-border">
          {faq.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-medium text-graphite-900">{item.question}</span>
                <Plus
                  className={`h-5 w-5 shrink-0 text-turquoise transition-transform ${open === i ? "rotate-45" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-muted-foreground">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
