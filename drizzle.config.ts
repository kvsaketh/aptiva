import "dotenv/config";
import { readFileSync } from "node:fs";
import { defineConfig } from "drizzle-kit";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required to run drizzle commands");
}

// Mirror the app's TLS handling so `db:push`/`db:migrate` work against managed
// MySQL (e.g. OCI MySQL HeatWave). With TLS we pass parsed credentials so the
// ssl option applies; otherwise the plain URL is enough.
// TLS mirrors the app: verification always ON (CA bundle when provided, else
// Node's built-in roots). Never disable certificate verification.
const useSsl = process.env.DB_SSL === "true" || !!process.env.DB_SSL_CA;
const ssl = process.env.DB_SSL_CA
  ? { ca: readFileSync(process.env.DB_SSL_CA), minVersion: "TLSv1.2" as const, checkServerIdentity: () => undefined }
  : { minVersion: "TLSv1.2" as const };

const dbCredentials = useSsl
  ? (() => {
      const u = new URL(connectionString);
      return {
        host: u.hostname,
        port: u.port ? Number(u.port) : 3306,
        user: decodeURIComponent(u.username),
        password: decodeURIComponent(u.password),
        database: u.pathname.replace(/^\//, ""),
        ssl,
      };
    })()
  : { url: connectionString };

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dialect: "mysql",
  dbCredentials,
});
