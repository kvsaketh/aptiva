import { describe, expect, it } from "vitest";
import { adminRole } from "./users";

describe("adminRole", () => {
  const owners = ["boss@aptivacorp.ae"];
  it("needs a listed and verified email", () => {
    expect(adminRole({ email: "Boss@aptivacorp.ae", emailVerified: true }, owners)).toBe("admin");
    expect(adminRole({ email: "boss@aptivacorp.ae", emailVerified: false }, owners)).toBe("user");
    expect(adminRole({ email: "other@aptivacorp.ae", emailVerified: true }, owners)).toBe("user");
    expect(adminRole({ email: null, emailVerified: true }, owners)).toBe("user");
  });
});
