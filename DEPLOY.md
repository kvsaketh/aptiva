# Deploy to Hostinger Cloud Hosting (Node.js Web App)

This is a full-stack app: one Node process (Hono + tRPC) serves both the React/Vite
frontend and the `/api` routes. Deploy it as a **server-side Node.js app** via hPanel
(Business/Cloud plan), not as a static site.

## 1. Create the app
- hPanel → Websites → Add Website → **Node.js App**
- Source: connect this **GitHub repo** (or upload)
- Framework type: **Other / server-side app**
- Node version: 20.x (or 22.x)
- **Build command:** `npm run build`
- **Entry file:** `dist/boot.js`  (start = `NODE_ENV=production node dist/boot.js`)
- Port: no change needed — `api/boot.ts` reads `process.env.PORT` (Hostinger injects it)

## 2. Database (MySQL)
- Create a MySQL database in hPanel
- Set `DATABASE_URL=mysql://USER:PASS@HOST:3306/DB`
- Apply schema once (from laptop pointed at the remote DB, or via SSH):
  - `npm run db:push`
  - optional seed data: `tsx db/seed.ts`

## 3. Environment variables (hPanel → Environment Variables)
Set ALL of these. The `VITE_*` ones are baked in at **build time** — they must exist
**before** `npm run build` runs, or the login button breaks.

```
APP_ID=
APP_SECRET=
DATABASE_URL=
KIMI_AUTH_URL=
KIMI_OPEN_URL=
OWNER_UNION_ID=
VITE_KIMI_AUTH_URL=
VITE_APP_ID=
```

## 4. SSL & auth
- Enable Hostinger free SSL (required: auth cookies use `Secure` + `SameSite=None` off-localhost)
- In the Kimi OAuth app, set the allowed redirect URI to:
  `https://YOURDOMAIN/api/oauth/callback`
- Login/admin only works if the external Kimi OAuth service is reachable and configured.
  The public site renders without it.

## Gotchas
- **Do NOT use the `Dockerfile`** — it has a hardcoded internal proxy + private npm
  registry from the build farm and fails anywhere else. Hostinger builds via npm directly.
- `@aws-sdk/*` is an unused leftover dependency — no S3 credentials needed.
- Drizzle runs in `mode: "planetscale"` (`api/queries/connection.ts`); works on standard
  MySQL but assumes no foreign keys.

## Verify
- App status shows "Running" in hPanel; visit the domain → SPA loads
- `GET https://YOURDOMAIN/api/trpc/...` responds (not 404)
- Login redirects to Kimi and back successfully
