import { describe, expect, it } from "vitest";
import { galleryUrls, isMediaKey } from "./gallery-router";

const id = "0b5f3a52-8f0e-4c55-9d1f-7f0c6b3a9e21";

describe("gallery media keys", () => {
  it("serves only generated photo files", () => {
    for (const u of Object.values(galleryUrls({ prefix: `gallery/${id}`, originalExt: "heic" }))) {
      expect(isMediaKey(u.slice("/media/".length))).toBe(true);
    }
    expect(isMediaKey(`gallery/${id}/../../secret.txt`)).toBe(false);
    expect(isMediaKey(`gallery/${id}/original.html`)).toBe(false);
    expect(isMediaKey("backups/db.sql")).toBe(false);
  });
});
