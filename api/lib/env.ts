import "dotenv/config";

function required(name: string): string {
  const value = process.env[name];
  if (!value && process.env.NODE_ENV === "production") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value ?? "";
}

export const env = {
  isProduction: process.env.NODE_ENV === "production",
  databaseUrl: required("DATABASE_URL"),
  // TLS for managed MySQL. DB_SSL_CA (path to provider CA PEM) = verified TLS;
  // DB_SSL=true without a CA = encrypted-but-unverified (private VCN only).
  dbSsl: process.env.DB_SSL === "true",
  dbSslCa: process.env.DB_SSL_CA ?? "",

  // Firebase Auth — project id used to verify ID tokens (issuer/audience).
  // Not "required()" so the public site still boots before auth is configured.
  firebaseProjectId: process.env.FIREBASE_PROJECT_ID ?? "",

  // Comma-separated email allowlist; these accounts get the "admin" role.
  ownerEmails: (process.env.OWNER_EMAIL ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean),
};
