import { eq } from "drizzle-orm";
import * as schema from "@db/schema";
import type { User } from "@db/schema";
import { getDb } from "./connection";
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
 * Upsert the signed-in Firebase user and return the persisted row. The role is
 * never set here: it lives in the DB, keyed by Firebase uid, and only an admin
 * (Team tab) changes it. Unknown accounts get "user" = no console access.
 */
export async function upsertAndGetUser(claims: FirebaseClaims, role?: User["role"]): Promise<User> {
  const fields = {
    // Keep a name set by an admin when the token has none.
    ...(claims.name ? { name: claims.name } : {}),
    email: claims.email,
    avatar: claims.picture,
    lastSignInAt: new Date(),
  };

  await getDb()
    .insert(schema.users)
    .values({ unionId: claims.uid, ...fields, ...(role ? { role } : {}) })
    .onDuplicateKeyUpdate({ set: { ...fields, ...(role ? { role } : {}) } });

  const user = await findUserByUnionId(claims.uid);
  if (!user) throw new Error("Failed to persist user");
  return user;
}
