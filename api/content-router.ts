import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createRouter, publicQuery } from "./middleware";
import { publishedArticles } from "./content/articles";

export const contentRouter = createRouter({
  // Only published articles ever leave the server; list omits the body to keep it light.
  articles: publicQuery.query(() => publishedArticles().map(({ body: _body, ...meta }) => meta)),
  article: publicQuery.input(z.object({ slug: z.string().max(200) })).query(({ input }) => {
    const a = publishedArticles().find((x) => x.slug === input.slug);
    if (!a) throw new TRPCError({ code: "NOT_FOUND" });
    return a;
  }),
});
