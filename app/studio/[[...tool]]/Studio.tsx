"use client";

import dynamic from "next/dynamic";

// Sanity Studio обязана грузиться только на клиенте: серверный React не умеет
// createContext / motion.create, на которых построен граф модулей Sanity.
// Поэтому сам компонент с конфигом подключаем через dynamic(ssr: false).
const StudioInner = dynamic(() => import("./StudioInner"), { ssr: false });

export default function Studio() {
  return <StudioInner />;
}
