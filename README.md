# Aptiva Technologies

Marketing site + admin console for **Aptiva Technologies** — a full-stack IT,
agentic-AI, automation and digital-transformation partner for the Middle East & Africa.

## Stack
- **Frontend:** React 19 + TypeScript, Vite 7, Tailwind v3 + shadcn/ui, GSAP + Lenis
  (scroll/motion), three.js (interactive hero), React Router 7 (hash routing).
- **Backend:** Hono + tRPC (one Node process serves the SPA **and** `/api`),
  Drizzle ORM + MySQL, Firebase Auth (token verified server-side with `jose`).
- **Build:** `vite build` (SPA → `dist/public`) + `esbuild` bundles the server → `dist/boot.js`.

## Design system
Clash Display / Satoshi / JetBrains Mono. Two distinct brand gradients — **red**
(rose→crimson) and **blue** (sky→indigo-violet). Reusable kit in
`src/components/kit/` (KineticBackdrop, TiltCard, Counter, StatBand, Marquee,
CTASection) + `src/components/motion/`. See `src/components/kit/AUTHORING_GUIDE.md`.

## Develop
```bash
npm install
cp .env.example .env     # fill DATABASE_URL + VITE_FIREBASE_* (see deploy/FIREBASE.md)
npm run dev              # http://localhost:3000 (or: npm run dev -- --port 3004)
```
The public site renders without any DB/auth config (static fallbacks). `/login`
and `/admin` need Firebase + MySQL.

## Scripts
| | |
|---|---|
| `npm run dev` | Vite dev server (SPA + API via Hono dev middleware) |
| `npm run build` | Production build (`dist/public` + `dist/boot.js`) |
| `npm run start` | Run the production server (`NODE_ENV=production node dist/boot.js`) |
| `npm run check` | TypeScript typecheck |
| `npm run db:push` | Apply the Drizzle schema to MySQL |
| `node scripts/fetch-logos.mjs` | Refresh client/partner logos in `public/logos/` |

## Auth (Firebase)
Email/password + Google sign-in. The client attaches the Firebase ID token as a
`Bearer` header; the backend (`api/auth/firebase.ts`) verifies it against Google's
public keys using `FIREBASE_PROJECT_ID` (no service-account secret). Admin access
is granted to emails in `OWNER_EMAIL`. Full setup: **`deploy/FIREBASE.md`**.

## Deploy
Target: **Oracle Cloud Always Free** VM + self-hosted MySQL. Step-by-step runbook
and config (Nginx, PM2, setup/deploy scripts) live in **`deploy/ORACLE_CLOUD.md`**.
Production env template: `.env.production.example`.
