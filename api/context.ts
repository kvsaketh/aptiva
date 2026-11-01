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
  return { req: opts.req, resHeaders: opts.resHeaders, user: await userFromRequest(opts.req) };
}

// Authenticate via the Firebase ID token sent as a Bearer header.
// Optional — unauthenticated requests just get no user.
export async function userFromRequest(req: Request): Promise<User | undefined> {
  const authz = req.headers.get("authorization") ?? "";
  if (!authz.startsWith("Bearer ")) return undefined;
  try {
    return await upsertAndGetUser(await verifyFirebaseToken(authz.slice(7)));
  } catch (err) {
    console.warn("[auth] token verification failed:", (err as Error).message);
    return undefined;
  }
}
