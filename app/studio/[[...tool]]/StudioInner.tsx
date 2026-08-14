"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

// Здесь подключаем sanity.config.ts. Этот модуль живёт в отдельном чанке,
// который грузится только на клиенте (см. Studio.tsx → dynamic ssr:false),
// поэтому граф Sanity (structureTool → motion.create и т.п.) никогда не
// вычисляется серверным React.
export default function StudioInner() {
  return <NextStudio config={config} />;
}
