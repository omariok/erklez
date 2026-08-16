"use client";

import { Phone, Send, MessageCircle } from "lucide-react";
import type { SiteConfig } from "@/types/content";
import { reachGoal, GOALS } from "@/lib/metrika";

// Sticky-панель связи всегда на экране — Telegram / WhatsApp / звонок.
export function StickyContactBar({ site }: { site: SiteConfig }) {
  const items = [
    { icon: Send, label: "Telegram", href: `https://t.me/${site.telegram}`, cls: "bg-turquoise", goal: GOALS.contactTelegram },
    { icon: MessageCircle, label: "WhatsApp", href: `https://wa.me/${site.whatsapp}`, cls: "bg-emerald", goal: GOALS.contactWhatsApp },
    { icon: Phone, label: "Позвонить", href: `tel:${site.phone.replace(/[^\d+]/g, "")}`, cls: "bg-graphite-900", goal: GOALS.contactPhone },
  ];
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-3">
      {items.map(({ icon: Icon, label, href, cls, goal }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          onClick={() => reachGoal(goal)}
          className={`flex h-12 w-12 items-center justify-center rounded-full ${cls} text-white shadow-elevated transition-transform hover:scale-110`}
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}
