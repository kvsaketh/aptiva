import { describe, expect, it } from "vitest";
import { publishedArticles, scheduledArticles } from "./articles";

const at = (iso: string) => new Date(iso).getTime();

describe("scheduled articles", () => {
  const eventSeason = ["from-ai-investment-to-enterprise-impact", "agents-robots-and-people", "trust-by-design-ai-for-regulated-industries", "running-automation-at-scale", "grounded-genai-enterprise-knowledge"];

  it("shows the back-dated library now but none of the event-season articles before 2 Nov", () => {
    const live = publishedArticles(at("2026-11-02T07:59:00+04:00")).map((a) => a.slug);
    expect(live).toHaveLength(18);
    expect(live.filter((s) => eventSeason.includes(s))).toEqual([]);
  });

  it("has at least 3 articles in every month from May to October", () => {
    for (const m of ["2026-05", "2026-06", "2026-07", "2026-08", "2026-09", "2026-10"]) {
      expect(scheduledArticles.filter((a) => a.publishAt.startsWith(m)).length, m).toBeGreaterThanOrEqual(3);
    }
  });

  it("has unique slugs", () => {
    expect(new Set(scheduledArticles.map((a) => a.slug)).size).toBe(scheduledArticles.length);
  });

  it("releases one article every other day, newest first", () => {
    expect(publishedArticles(at("2026-11-02T08:00:00+04:00"))[0].slug).toBe("from-ai-investment-to-enterprise-impact");
    expect(publishedArticles(at("2026-11-05T12:00:00+04:00"))).toHaveLength(20);
    expect(publishedArticles(at("2026-11-10T08:00:00+04:00"))[0].slug).toBe("grounded-genai-enterprise-knowledge");
  });

  it("never names clients or project specifics", () => {
    const text = JSON.stringify(scheduledArticles).toLowerCase();
    for (const banned of ["etisalat", "e&", "eand", "du telecom", "fab", "aldar", "enec", "etihad", "aed ", "1,000 bots", "900+", "rakbank", "dp world", "emirates nbd"]) {
      expect(text, banned).not.toContain(banned);
    }
  });
});
