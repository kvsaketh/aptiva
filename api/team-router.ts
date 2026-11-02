import { z } from "zod";
import { desc, eq, inArray } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { createRouter, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { upsertAndGetUser } from "./queries/users";
import { verifyFirebaseToken } from "./auth/firebase";
import { users } from "../db/schema";

const role = z.enum(["user", "staff", "admin"]);

export const teamRouter = createRouter({
  list: adminQuery.query(() =>
    getDb().select({ id: users.id, name: users.name, email: users.email, role: users.role, lastSignInAt: users.lastSignInAt })
      .from(users).where(inArray(users.role, ["staff", "admin"])).orderBy(desc(users.createdAt))),

  // The admin's browser creates the Firebase login, then sends that new account's
  // ID token, so the role is bound to the real uid rather than to a typed email.
  register: adminQuery
    .input(z.object({ idToken: z.string().min(1), name: z.string().trim().max(255).optional(), role: role.exclude(["user"]) }))
    .mutation(async ({ input }) => {
      const claims = await verifyFirebaseToken(input.idToken).catch(() => {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Could not verify the new login" });
      });
      await upsertAndGetUser({ ...claims, name: input.name || claims.name }, input.role);
      return { ok: true };
    }),

  setRole: adminQuery
    .input(z.object({ id: z.number(), role }))
    .mutation(async ({ input, ctx }) => {
      if (input.id === ctx.user.id) throw new TRPCError({ code: "BAD_REQUEST", message: "You can't change your own access" });
      await getDb().update(users).set({ role: input.role }).where(eq(users.id, input.id));
      return { ok: true };
    }),
});
