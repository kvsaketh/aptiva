import { z } from "zod";
import { desc } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { enquiries } from "../db/schema";

// shortcut: per-process memory, resets on restart and isn't shared across instances; move to Redis/DB if we run >1 process.
const recent = new Map<string, number[]>();
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;

export function allowSubmission(ip: string, now = Date.now()) {
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW) return false;
  hits.push(now);
  recent.set(ip, hits);
  return true;
}

const clientIp = (req: Request) =>
  req.headers.get("x-real-ip") ?? req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

export const contactRouter = createRouter({
  submit: publicQuery
    .input(z.object({
      name: z.string().trim().min(1).max(200),
      company: z.string().trim().max(200).optional(),
      email: z.string().trim().email().max(320),
      phone: z.string().trim().max(50).optional(),
      interest: z.string().trim().max(100).optional(),
      message: z.string().trim().min(1).max(5000),
      eventId: z.string().trim().max(100).optional(),
      website: z.string().max(0).optional(), // honeypot: humans never fill this hidden field
    }))
    .mutation(async ({ input, ctx }) => {
      if (!allowSubmission(clientIp(ctx.req))) {
        throw new TRPCError({ code: "TOO_MANY_REQUESTS", message: "Too many messages. Please try again in a few minutes." });
      }
      const { website: _honeypot, ...row } = input;
      await getDb().insert(enquiries).values({
        ...row,
        company: row.company || null,
        phone: row.phone || null,
        interest: row.interest || null,
        eventId: row.eventId || null,
      });
      return { ok: true };
    }),
  list: adminQuery.query(() => getDb().select().from(enquiries).orderBy(desc(enquiries.createdAt)).limit(500)),
});
