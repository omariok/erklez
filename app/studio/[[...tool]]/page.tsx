import Studio from "./Studio";

// Встроенная Sanity Studio на /studio — владелец правит контент здесь.
// Сам компонент — клиентский (см. Studio.tsx): серверный React не умеет
// createContext, на котором построен граф модулей Sanity.
export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <Studio />;
}
