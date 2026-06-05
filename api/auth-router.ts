import { createRouter, authedQuery } from "./middleware";

export const authRouter = createRouter({
  // Returns the persisted user for the verified Firebase ID token.
  // Sign-out is handled entirely client-side via the Firebase SDK.
  me: authedQuery.query((opts) => opts.ctx.user),
});
