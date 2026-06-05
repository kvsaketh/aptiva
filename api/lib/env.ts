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

  // Firebase Auth — project id used to verify ID tokens (issuer/audience).
  // Not "required()" so the public site still boots before auth is configured.
  firebaseProjectId: process.env.FIREBASE_PROJECT_ID ?? "",

  // Comma-separated email allowlist; these accounts get the "admin" role.
  ownerEmails: (process.env.OWNER_EMAIL ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean),
};
