import { Hono } from "hono";
import { describe, expect, it } from "vitest";
import { clientIp } from "./clientIp";

const SECRET = "s3cret-value";

async function ipFor(headers: Record<string, string>, secret?: string) {
  const app = new Hono();
  app.get("/", (c) => c.text(clientIp(c, secret)));
  const res = await app.request("/", { headers });
  return res.text();
}

describe("clientIp", () => {
  it("uses 'local' when no proxy headers exist", async () => {
    expect(await ipFor({})).toBe("local");
  });

  it("ignores a visitor-written first X-Forwarded-For entry", async () => {
    expect(await ipFor({ "x-forwarded-for": "1.2.3.4, 9.9.9.9" })).toBe(
      "9.9.9.9",
    );
  });

  it("trusts x-client-ip only with the matching secret", async () => {
    const headers = { "x-client-ip": "5.6.7.8", "x-proxy-secret": SECRET };
    expect(await ipFor(headers, SECRET)).toBe("5.6.7.8");
  });

  it("rejects x-client-ip with a wrong or missing secret", async () => {
    const forged = { "x-client-ip": "5.6.7.8", "x-forwarded-for": "9.9.9.9" };
    expect(await ipFor({ ...forged, "x-proxy-secret": "nope" }, SECRET)).toBe(
      "9.9.9.9",
    );
    expect(await ipFor(forged, SECRET)).toBe("9.9.9.9");
  });

  it("never trusts x-client-ip when no secret is configured", async () => {
    const headers = { "x-client-ip": "5.6.7.8", "x-proxy-secret": SECRET };
    expect(await ipFor(headers)).toBe("local");
  });
});
