import { z } from "zod";
import { eq, and, asc } from "drizzle-orm";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { clientLogos, partnerLogos, siteImages } from "../db/schema";

export const mediaRouter = createRouter({
  // ─── CLIENT LOGOS ───
  clientLogo: createRouter({
    list: publicQuery.query(async () => {
      const db = getDb();
      return db.select().from(clientLogos)
        .where(eq(clientLogos.isActive, true))
        .orderBy(asc(clientLogos.displayOrder));
    }),
    listAll: adminQuery.query(async () => {
      const db = getDb();
      return db.select().from(clientLogos).orderBy(asc(clientLogos.displayOrder));
    }),
    create: adminQuery
      .input(z.object({
        name: z.string().min(1).max(255),
        imageUrl: z.string().min(1).max(500),
        displayOrder: z.number().default(0),
      }))
      .mutation(async ({ input }) => {
        const db = getDb();
        await db.insert(clientLogos).values({ ...input, isActive: true });
        return { success: true };
      }),
    update: adminQuery
      .input(z.object({
        id: z.number(),
        name: z.string().min(1).max(255).optional(),
        imageUrl: z.string().min(1).max(500).optional(),
        displayOrder: z.number().optional(),
        isActive: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = getDb();
        const { id, ...data } = input;
        await db.update(clientLogos).set(data).where(eq(clientLogos.id, id));
        return { success: true };
      }),
    delete: adminQuery
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const db = getDb();
        await db.delete(clientLogos).where(eq(clientLogos.id, input.id));
        return { success: true };
      }),
  }),

  // ─── PARTNER LOGOS ───
  partnerLogo: createRouter({
    list: publicQuery.query(async () => {
      const db = getDb();
      return db.select().from(partnerLogos)
        .where(eq(partnerLogos.isActive, true))
        .orderBy(asc(partnerLogos.displayOrder));
    }),
    listAll: adminQuery.query(async () => {
      const db = getDb();
      return db.select().from(partnerLogos).orderBy(asc(partnerLogos.displayOrder));
    }),
    featured: publicQuery.query(async () => {
      const db = getDb();
      return db.select().from(partnerLogos)
        .where(and(eq(partnerLogos.isActive, true), eq(partnerLogos.isFeatured, true)))
        .orderBy(asc(partnerLogos.displayOrder));
    }),
    create: adminQuery
      .input(z.object({
        name: z.string().min(1).max(255),
        imageUrl: z.string().min(1).max(500),
        category: z.string().max(100).optional(),
        description: z.string().optional(),
        tier: z.string().max(50).optional(),
        displayOrder: z.number().default(0),
        isFeatured: z.boolean().default(false),
      }))
      .mutation(async ({ input }) => {
        const db = getDb();
        await db.insert(partnerLogos).values({ ...input, isActive: true });
        return { success: true };
      }),
    update: adminQuery
      .input(z.object({
        id: z.number(),
        name: z.string().min(1).max(255).optional(),
        imageUrl: z.string().min(1).max(500).optional(),
        category: z.string().max(100).optional(),
        description: z.string().optional(),
        tier: z.string().max(50).optional(),
        displayOrder: z.number().optional(),
        isFeatured: z.boolean().optional(),
        isActive: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = getDb();
        const { id, ...data } = input;
        await db.update(partnerLogos).set(data).where(eq(partnerLogos.id, id));
        return { success: true };
      }),
    delete: adminQuery
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const db = getDb();
        await db.delete(partnerLogos).where(eq(partnerLogos.id, input.id));
        return { success: true };
      }),
  }),

  // ─── SITE IMAGES ───
  siteImage: createRouter({
    list: publicQuery.query(async () => {
      const db = getDb();
      return db.select().from(siteImages).orderBy(asc(siteImages.key));
    }),
    getByKey: publicQuery
      .input(z.object({ key: z.string() }))
      .query(async ({ input }) => {
        const db = getDb();
        const rows = await db.select().from(siteImages).where(eq(siteImages.key, input.key));
        return rows[0] || null;
      }),
    create: adminQuery
      .input(z.object({
        key: z.string().min(1).max(100),
        name: z.string().min(1).max(255),
        imageUrl: z.string().min(1).max(500),
        section: z.string().max(100).optional(),
        description: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = getDb();
        await db.insert(siteImages).values(input);
        return { success: true };
      }),
    update: adminQuery
      .input(z.object({
        id: z.number(),
        key: z.string().min(1).max(100).optional(),
        name: z.string().min(1).max(255).optional(),
        imageUrl: z.string().min(1).max(500).optional(),
        section: z.string().max(100).optional(),
        description: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = getDb();
        const { id, ...data } = input;
        await db.update(siteImages).set(data).where(eq(siteImages.id, id));
        return { success: true };
      }),
    delete: adminQuery
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const db = getDb();
        await db.delete(siteImages).where(eq(siteImages.id, input.id));
        return { success: true };
      }),
  }),
});
