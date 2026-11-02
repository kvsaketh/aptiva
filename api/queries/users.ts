import { eq } from "drizzle-orm";
import * as schema from "@db/schema";
import type { User } from "@db/schema";
import { getDb } from "./connection";
import { env } from "../lib/env";
import type { FirebaseClaims } from "../auth/firebase";

export async function findUserByUnionId(unionId: string) {
  const rows = await getDb()
    .select()
    .from(schema.users)
    .where(eq(schema.users.unionId, unionId))
    .limit(1);
  return rows.at(0);
}

/**
 * Upsert the signed-in Firebase user and return the persisted row. The "admin"
 * role is driven entirely by the OWNER_EMAIL allowlist and re-synced on every
 * login, so granting/revoking admin is just an env change + re-login.
 */
// Admin needs a verified email: otherwise anyone could sign up with an admin's address without owning the inbox.
export function adminRole(claims: Pick<FirebaseClaims, "email" | "emailVerified">, owners: string[]): "admin" | "user" {
  return claims.email && claims.emailVerified && owners.includes(claims.email.toLowerCase()) ? "admin" : "user";
}

export async function upsertAndGetUser(claims: FirebaseClaims): Promise<User> {
  const role = adminRole(claims, env.ownerEmails);

  const fields = {
    name: claims.name,
    email: claims.email,
    avatar: claims.picture,
    role,
    lastSignInAt: new Date(),
  };

  await getDb()
    .insert(schema.users)
    .values({ unionId: claims.uid, ...fields })
    .onDuplicateKeyUpdate({ set: fields });

  const user = await findUserByUnionId(claims.uid);
  if (!user) throw new Error("Failed to persist user");
  return user;
}
