import { authRouter } from "./auth-router";
import { mediaRouter } from "./media-router";
import { contentRouter } from "./content-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  media: mediaRouter,
  content: contentRouter,
});

export type AppRouter = typeof appRouter;
