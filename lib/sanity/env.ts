// Конфигурация подключения к Sanity. Пока проект не создан — projectId пустой,
// и слой данных (content-source) автоматически использует файловый фолбэк.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-07-01";

// true — если Sanity сконфигурирован и им можно пользоваться.
export const sanityEnabled = projectId.length > 0;
