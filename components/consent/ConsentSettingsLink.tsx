"use client";

import { openConsentSettings } from "@/lib/consent";

// Позволяет пользователю изменить решение о cookie в любой момент —
// требование прозрачности: согласие должно легко отзываться.
export function ConsentSettingsLink() {
  return (
    <button
      type="button"
      onClick={openConsentSettings}
      className="underline underline-offset-2 hover:text-white"
    >
      Настройки cookie
    </button>
  );
}
