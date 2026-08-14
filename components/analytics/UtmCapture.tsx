"use client";

import { useEffect } from "react";
import { captureMarketing } from "@/lib/utm";

// Ловит рекламные метки из URL при первой загрузке страницы.
// Ничего не рендерит.
export function UtmCapture() {
  useEffect(() => {
    captureMarketing();
  }, []);
  return null;
}
