#!/usr/bin/env bash
# «Эрклёз» — запуск сайта для просмотра на macOS. Node.js НЕ требуется:
# при первом запуске скрипт скачает персональную копию Node.js прямо в папку
# проекта (.node/) — система не изменяется, права администратора не нужны.
# Двойной клик: скачать Node → поставить зависимости → собрать → открыть сайт.
set -euo pipefail
cd "$(dirname "$0")"

note() { printf '\n\033[1;36m%s\033[0m\n\n' "$*"; }
fail() { printf '\n\033[1;31m%s\033[0m\n\n' "$*" >&2; }
pause_exit() { read -r -p "Нажмите Enter, чтобы закрыть окно…" _; exit "${1:-1}"; }
trap 'fail "Что-то пошло не так (чаще всего — нет доступа к интернету). Запустите файл ещё раз."; pause_exit' ERR

# --- Node.js: уже скачанный в .node/ → системный → скачиваем ---
if [ -x .node/bin/node ]; then
  export PATH="$PWD/.node/bin:$PATH"
elif ! command -v node >/dev/null 2>&1; then
  note "Node.js не найден. Скачиваю персональную копию в папку проекта
(~50 МБ, нужна сеть; система и настройки Mac не затрагиваются)…"
  case "$(uname -m)" in
    arm64) ARCH="arm64" ;;   # Apple Silicon (M1/M2/M3…)
    *)     ARCH="x64"   ;;   # Intel
  esac
  DIST="https://nodejs.org/dist/latest-v22.x"
  curl -fsS "$DIST/SHASUMS256.txt" -o .node-shasums.txt
  FILE="$(grep "darwin-$ARCH.tar.gz\$" .node-shasums.txt | awk '{print $2}')"
  if [ -z "$FILE" ]; then
    fail "Не удалось найти Node.js для этой версии macOS. Обратитесь к отправителю архива."
    pause_exit
  fi
  curl -fL "$DIST/$FILE" -o "$FILE"
  # Контрольная сумма с официального сайта nodejs.org
  grep " $FILE\$" .node-shasums.txt > .node-check.txt
  shasum -a 256 -c .node-check.txt
  mkdir -p .node
  tar -xzf "$FILE" --strip-components=1 -C .node
  rm -f "$FILE" .node-shasums.txt .node-check.txt
  export PATH="$PWD/.node/bin:$PATH"
fi

NODE_MAJOR="$(node -v | sed 's/^v\([0-9]*\).*/\1/')"
if [ "${NODE_MAJOR:-0}" -lt 18 ]; then
  fail "Обнаружен Node.js $(node -v), нужен 18+. Удалите старый Node или скачайте LTS с https://nodejs.org"
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

wait "$SERVER_PID" || true
note "Сайт остановлен."
