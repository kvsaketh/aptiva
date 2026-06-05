#!/usr/bin/env bash
# Build & (re)start Aptiva. Run from the app directory after .env exists:
#   bash deploy/deploy.sh
# Re-run any time you pull new code.
set -euo pipefail
cd "$(dirname "$0")/.."

if [ ! -f .env ]; then
  echo "ERROR: .env missing. Copy .env.production.example -> .env and fill it in first."
  echo "       (VITE_* are baked at build time, so .env MUST exist before building.)"
  exit 1
fi

echo "==> Install deps"
npm ci

echo "==> Build (frontend + server bundle)"
npm run build

# Apply DB schema. Safe to run repeatedly; comment out if you manage schema manually.
echo "==> Push DB schema"
npm run db:push || echo "WARN: db:push failed (check DATABASE_URL / MySQL is up). Continuing."

echo "==> (Re)start via PM2"
if pm2 describe aptiva >/dev/null 2>&1; then
  pm2 reload deploy/ecosystem.config.cjs --update-env
else
  pm2 start deploy/ecosystem.config.cjs
  pm2 save
fi

echo "==> Live. Logs: pm2 logs aptiva"
