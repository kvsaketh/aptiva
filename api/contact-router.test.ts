import { describe, expect, it } from "vitest";
import { allowSubmission } from "./contact-router";

describe("contact rate limit", () => {
  it("allows 5 messages per 10 minutes per IP, then blocks, then recovers", () => {
    const t = 1_000_000;
    for (let i = 0; i < 5; i++) expect(allowSubmission("1.2.3.4", t + i)).toBe(true);
    expect(allowSubmission("1.2.3.4", t + 10)).toBe(false);
    expect(allowSubmission("5.6.7.8", t + 10)).toBe(true);
    expect(allowSubmission("1.2.3.4", t + 10 * 60_000 + 10)).toBe(true);
  });
});

import { enquiryEmail } from "./lib/notify";
describe("enquiryEmail", () => {
  it("lists filled fields and keeps the subject on one line", () => {
    const m = enquiryEmail({ name: "A\r\nBcc: x@y.z", email: "a@b.co", message: "hi", company: "Co" });
    expect(m.subject).not.toMatch(/[\r\n]/);
    expect(m.text).toContain("Company: Co");
    expect(m.text).not.toContain("Phone:");
  });
});
