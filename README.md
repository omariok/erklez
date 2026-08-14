# Эрклёз — премиум-сайт

Next.js (App Router) · TypeScript · Tailwind · Framer Motion · Lucide. Заявки → Telegram.

## Запуск

```bash
npm install
cp .env.example .env      # заполнить TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID
npm run dev               # http://localhost:3000
```

## Правка контента (Sanity CMS)

Владелец правит цены/фото/тексты в визуальной админке на `/studio` — без кода.

Пока проект Sanity не создан, сайт берёт контент из файлов `content/` (фолбэк):
`site.ts`, `catalog.ts`, `faq.ts`, `applications.ts`, `cases.ts`, `logistics.ts`.

### Подключить Sanity (один раз, ~15 минут)

1. Зарегистрироваться на [sanity.io](https://sanity.io), создать проект (dataset `production`).
2. Скопировать **Project ID** в `.env` → `NEXT_PUBLIC_SANITY_PROJECT_ID`.
3. В настройках проекта Sanity → API → CORS добавить адрес сайта (и `http://localhost:3000`).
4. Открыть `/studio`, войти, заполнить контент. Сайт сразу начнёт брать данные из CMS.

Слой данных: `lib/content-source.ts` (async-геттеры с фолбэком), схемы: `sanity/schemaTypes/`.

> Остаётся один шаг wiring: перевести секции с прямого импорта `@/content/*`
> на async-геттеры `content-source` (главная страница фетчит и передаёт пропсами).
> Делается после создания проекта Sanity, чтобы сразу протестировать на реальных данных.

## Заявки в Telegram

`app/api/lead/route.ts` валидирует (zod) и шлёт в Telegram Bot API (`lib/telegram.ts`).
Создать бота через @BotFather → токен и chat_id в `.env`.

## Деплой

Vercel: импорт репозитория, env-переменные, домен `erklez.ru`. Далее Метрика + Вебмастер.

## Что заменить (плейсхолдеры)

Hero-видео (`public/media/`), реальные фото каталога/кейсов, прайс и сертификаты (`public/documents/`),
контакты и реквизиты в `content/site.ts`, координаты складов в `content/logistics.ts`.

Полный план — `Docs/ARCHITECTURE.md`.
