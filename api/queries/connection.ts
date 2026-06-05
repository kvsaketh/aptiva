import { readFileSync } from "node:fs";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2";
import { env } from "../lib/env";
import * as schema from "@db/schema";
import * as relations from "@db/relations";

const fullSchema = { ...schema, ...relations };

let instance: ReturnType<typeof drizzle<typeof fullSchema>>;

/**
 * TLS for managed MySQL (e.g. OCI MySQL HeatWave). Certificate verification is
 * always ON. Set DB_SSL_CA to the provider's CA bundle for providers whose cert
 * isn't in the public trust store (OCI MySQL); with DB_SSL=true and no CA we
 * verify against Node's built-in roots. We never disable verification.
 */
function sslOptions() {
  if (env.dbSslCa) return { ca: readFileSync(env.dbSslCa), minVersion: "TLSv1.2" as const };
  if (env.dbSsl) return { minVersion: "TLSv1.2" as const };
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
