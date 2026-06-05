import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { User } from "@db/schema";
import { verifyFirebaseToken } from "./auth/firebase";
import { upsertAndGetUser } from "./queries/users";

export type TrpcContext = {
  req: Request;
  resHeaders: Headers;
  user?: User;
};

export async function createContext(
  opts: FetchCreateContextFnOptions,
): Promise<TrpcContext> {
  const ctx: TrpcContext = { req: opts.req, resHeaders: opts.resHeaders };

  // Authenticate via the Firebase ID token sent as a Bearer header.
  // Optional — unauthenticated requests just get no ctx.user.
  const authz = opts.req.headers.get("authorization") ?? "";
  if (authz.startsWith("Bearer ")) {
    try {
      const claims = await verifyFirebaseToken(authz.slice(7));
      ctx.user = await upsertAndGetUser(claims);
    } catch (err) {
      console.warn("[auth] token verification failed:", (err as Error).message);
    }
  }
  return ctx;
}
