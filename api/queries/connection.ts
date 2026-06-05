import { readFileSync } from "node:fs";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2";
import { env } from "../lib/env";
import * as schema from "@db/schema";
import * as relations from "@db/relations";

const fullSchema = { ...schema, ...relations };

let instance: ReturnType<typeof drizzle<typeof fullSchema>>;

/**
 * TLS for managed MySQL (e.g. OCI MySQL HeatWave). Preferred: set DB_SSL_CA to the
 * provider's CA bundle path for full certificate verification. If DB_SSL=true but
 * no CA is given, the connection is still encrypted but not cert-verified — only
 * acceptable over a private VCN (never the public internet).
 */
function sslOptions() {
  if (env.dbSslCa) return { ca: readFileSync(env.dbSslCa) };
  if (env.dbSsl) return { rejectUnauthorized: false };
  return undefined;
}

export function getDb() {
  if (!instance) {
    const ssl = sslOptions();
    const pool = ssl
      ? mysql.createPool({ uri: env.databaseUrl, ssl })
      : mysql.createPool(env.databaseUrl);
    instance = drizzle(pool, { mode: "planetscale", schema: fullSchema });
  }
  return instance;
}
