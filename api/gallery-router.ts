import { z } from "zod";
import { desc, eq } from "drizzle-orm";
import type { Context } from "hono";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { galleryPhotos } from "../db/schema";
import { userFromRequest } from "./context";
import { deleteObjects, getObject, putObject, storageReady } from "./lib/storage";

const IMAGE_TYPES: Record<string, string> = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", heic: "image/heic", heif: "image/heif" };
const MAX_ORIGINAL = 40 * 1024 * 1024;
const MAX_DERIVED = 5 * 1024 * 1024;

export const galleryUrls = (p: { prefix: string; originalExt: string }) => ({
  thumb: `/media/${p.prefix}/thumb.jpg`,
  web: `/media/${p.prefix}/web.jpg`,
  original: `/media/${p.prefix}/original.${p.originalExt}`,
});

const withUrls = <T extends { prefix: string; originalExt: string }>(rows: T[]) => rows.map((r) => ({ ...r, ...galleryUrls(r) }));

export const galleryRouter = createRouter({
  list: publicQuery.query(async () =>
    withUrls(await getDb().select().from(galleryPhotos).where(eq(galleryPhotos.isPublic, true)).orderBy(desc(galleryPhotos.createdAt)))),
  listAll: adminQuery.query(async () =>
    withUrls(await getDb().select().from(galleryPhotos).orderBy(desc(galleryPhotos.createdAt)))),
  update: adminQuery
    .input(z.object({
      id: z.number(),
      album: z.string().trim().min(1).max(150).optional(),
      caption: z.string().trim().max(300).nullable().optional(),
      isPublic: z.boolean().optional(),
    }))
    .mutation(async ({ input: { id, ...data } }) => {
      await getDb().update(galleryPhotos).set(data).where(eq(galleryPhotos.id, id));
      return { ok: true };
    }),
  delete: adminQuery.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
    const db = getDb();
    const [p] = await db.select().from(galleryPhotos).where(eq(galleryPhotos.id, input.id));
    if (!p) return { ok: true };
    await deleteObjects(Object.values(galleryUrls(p)).map((u) => u.slice("/media/".length)));
    await db.delete(galleryPhotos).where(eq(galleryPhotos.id, input.id));
    return { ok: true };
  }),
});

// POST /api/gallery/upload (multipart): original, web, thumb, album, caption?, width, height.
// The browser makes web.jpg/thumb.jpg; we only store them.
export async function uploadHandler(c: Context) {
  const user = await userFromRequest(c.req.raw);
  if (user?.role !== "admin") return c.json({ error: "Admin only" }, 403);
  if (!storageReady) return c.json({ error: "Photo storage is not configured yet" }, 503);

  const form = await c.req.raw.formData();
  const original = form.get("original"), web = form.get("web"), thumb = form.get("thumb");
  const meta = z.object({
    album: z.string().trim().min(1).max(150),
    caption: z.string().trim().max(300).optional(),
    width: z.coerce.number().int().positive().max(20000),
    height: z.coerce.number().int().positive().max(20000),
  }).safeParse(Object.fromEntries(["album", "caption", "width", "height"].map((k) => [k, form.get(k) ?? undefined])));
  if (!(original instanceof File) || !(web instanceof File) || !(thumb instanceof File) || !meta.success) {
    return c.json({ error: "Missing photo or details" }, 400);
  }
  const ext = (original.name.split(".").pop() ?? "").toLowerCase();
  if (!IMAGE_TYPES[ext]) return c.json({ error: "Only JPG, PNG, WEBP or HEIC photos" }, 400);
  if (original.size > MAX_ORIGINAL || web.size > MAX_DERIVED || thumb.size > MAX_DERIVED) return c.json({ error: "Photo too large" }, 413);

  const prefix = `gallery/${crypto.randomUUID()}`;
  const bytes = async (f: File) => new Uint8Array(await f.arrayBuffer());
  await putObject(`${prefix}/original.${ext}`, await bytes(original), IMAGE_TYPES[ext]);
  await putObject(`${prefix}/web.jpg`, await bytes(web), "image/jpeg");
  await putObject(`${prefix}/thumb.jpg`, await bytes(thumb), "image/jpeg");
  await getDb().insert(galleryPhotos).values({ ...meta.data, caption: meta.data.caption || null, prefix, originalExt: ext });
  return c.json({ ok: true });
}

// Only our own generated keys are servable, so /media can't be used to read anything else in the bucket.
export const isMediaKey = (key: string) => /^gallery\/[0-9a-f-]{36}\/(thumb\.jpg|web\.jpg|original\.(jpg|jpeg|png|webp|heic|heif))$/.test(key)

// GET /media/gallery/<uuid>/<file>: streams from storage. nginx caches these, so each file is fetched from OCI about once.
export async function mediaHandler(c: Context) {
  const key = c.req.path.slice("/media/".length);
  if (!isMediaKey(key)) return c.notFound();
  try {
    const obj = await getObject(key);
    return new Response(obj.Body!.transformToWebStream(), {
      headers: {
        "Content-Type": obj.ContentType ?? "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
        ...(obj.ContentLength ? { "Content-Length": String(obj.ContentLength) } : {}),
      },
    });
  } catch {
    return c.notFound();
  }
}
