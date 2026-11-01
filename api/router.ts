import { authRouter } from "./auth-router";
import { mediaRouter } from "./media-router";
import { contentRouter } from "./content-router";
import { contactRouter } from "./contact-router";
import { galleryRouter } from "./gallery-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  media: mediaRouter,
  content: contentRouter,
  contact: contactRouter,
  gallery: galleryRouter,
});

export type AppRouter = typeof appRouter;
