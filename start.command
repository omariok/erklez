#!/usr/bin/env bash
# «Эрклёз» — запуск сайта для просмотра на macOS.
# Двойной клик по этому файлу: установит зависимости (при первом запуске),
# соберёт и запустит сайт, откроет его в браузере.
# Окно Терминала можно закрыть — сайт остановится.
set -euo pipefail
cd "$(dirname "$0")"

note() { printf '\n\033[1;36m%s\033[0m\n\n' "$*"; }
fail() { printf '\n\033[1;31m%s\033[0m\n\n' "$*" >&2; }
pause_exit() { read -r -p "Нажмите Enter, чтобы закрыть окно…" _; exit "${1:-1}"; }

# --- Node.js ---
if ! command -v node >/dev/null 2>&1; then
  if command -v brew >/dev/null 2>&1; then
    note "Node.js не найден. Найден Homebrew — устанавливаю Node.js (LTS)…"
    brew install node@22 || brew install node
  else
    fail "Нужен Node.js 18 или новее. Скачайте LTS-версию с https://nodejs.org, установите и запустите этот файл ещё раз."
    pause_exit
  fi
fi

NODE_MAJOR="$(node -v | sed 's/^v\([0-9]*\).*/\1/')"
if [ "${NODE_MAJOR:-0}" -lt 18 ]; then
  fail "Обнаружен Node.js $(node -v) — нужен 18+. Обновите LTS-версию на https://nodejs.org"
  pause_exit
fi

# --- Зависимости (только при первом запуске) ---
if [ ! -d node_modules ]; then
  note "Первый запуск: устанавливаю зависимости — это займёт 2–4 минуты…"
  npm install --no-audit --no-fund
fi

# --- Сборка (только если ещё не собрано) ---
if [ ! -f .next/BUILD_ID ]; then
  note "Собираю финальную версию сайта — около минуты…"
  npm run build
fi

# --- Свободный порт ---
PORT=3000
while lsof -i "tcp:$PORT" -sTCP:LISTEN >/dev/null 2>&1; do
  PORT=$((PORT + 1))
done

note "Запускаю сайт на http://localhost:$PORT
(чтобы остановить — закройте это окно Терминала)"
npm start -- -p "$PORT" &
SERVER_PID=$!

# Ждём готовности сервера и открываем браузер
for _ in $(seq 1 60); do
  curl -fsS -o /dev/null "http://localhost:$PORT" && break
  sleep 1
done
open "http://localhost:$PORT"

wait "$SERVER_PID"
