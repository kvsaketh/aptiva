import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  int,
  boolean,
} from "drizzle-orm/mysql-core";

// ─── USERS (auth) ───
export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─── CLIENT LOGOS ───
export const clientLogos = mysqlTable("client_logos", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  displayOrder: int("display_order").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type ClientLogo = typeof clientLogos.$inferSelect;
export type InsertClientLogo = typeof clientLogos.$inferInsert;

// ─── PARTNER LOGOS ───
export const partnerLogos = mysqlTable("partner_logos", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  category: varchar("category", { length: 100 }),
  description: text("description"),
  tier: varchar("tier", { length: 50 }),
  displayOrder: int("display_order").default(0).notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type PartnerLogo = typeof partnerLogos.$inferSelect;
export type InsertPartnerLogo = typeof partnerLogos.$inferInsert;

// ─── SITE IMAGES ───
export const siteImages = mysqlTable("site_images", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  section: varchar("section", { length: 100 }),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type SiteImage = typeof siteImages.$inferSelect;
export type InsertSiteImage = typeof siteImages.$inferInsert;

// ─── ENQUIRIES (contact form) ───
export const enquiries = mysqlTable("enquiries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  company: varchar("company", { length: 200 }),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  interest: varchar("interest", { length: 100 }),
  message: text("message").notNull(),
  eventId: varchar("event_id", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Enquiry = typeof enquiries.$inferSelect;

// ─── GALLERY (photos stored in OCI Object Storage under gallery/<id>/) ───
export const galleryPhotos = mysqlTable("gallery_photos", {
  id: serial("id").primaryKey(),
  album: varchar("album", { length: 150 }).notNull(),
  caption: varchar("caption", { length: 300 }),
  prefix: varchar("prefix", { length: 100 }).notNull(), // object key prefix, e.g. gallery/<uuid>
  originalExt: varchar("original_ext", { length: 10 }).notNull(),
  width: int("width").notNull(),
  height: int("height").notNull(),
  isPublic: boolean("is_public").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type GalleryPhoto = typeof galleryPhotos.$inferSelect;
