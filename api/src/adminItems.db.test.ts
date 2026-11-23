// @vitest-environment node
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import pg from "pg";
import { createApp } from "./app";
import { createSession } from "./auth";
import type { Db } from "./db";

try {
  process.loadEnvFile(".env");
} catch {
  // No .env file: rely on the environment (CI).
}

const ORIGIN = "http://localhost:5173";
const url = process.env.DATABASE_URL;
const client = new pg.Client({ connectionString: url });
const txDb = { query: (t: string, p?: unknown[]) => client.query(t, p) } as Db;

interface Ctx {
  send: (method: string, path: string, body?: unknown) => Promise<Response>;
  categoryId: string;
  tag: Record<string, string>;
}

/** Runs a test as a signed-in admin inside a transaction that is always rolled back. */
async function withApi(fn: (ctx: Ctx) => Promise<void>) {
  await client.query("begin");
  try {
    const admin = await client.query(
      "insert into admins (email, password_hash) values ($1, $2) returning id",
      ["tx-items@example.com", "x"],
    );
    const token = await createSession(txDb, admin.rows[0].id as string);
    const app = createApp(txDb, { corsOrigin: ORIGIN });
    const send: Ctx["send"] = async (method, path, body) =>
      app.request(`/api/admin/items${path}`, {
        method,
        headers: {
          "content-type": "application/json",
          origin: ORIGIN,
          cookie: `golden_plate_session=${token}`,
        },
        body: body === undefined ? undefined : JSON.stringify(body),
      });
    const category = await client.query(
      "insert into categories (name_en) values ('TX items category') returning id",
    );
    // The test makes its own tags (rolled back with everything else), so it
    // does not depend on which tags exist in the database it runs against.
    const tags = await client.query(
      `insert into tags (slug, group_key, name_en, sort_order) values
         ('tx-hot', 'temperature', 'TX Hot', 900),
         ('tx-fasting', 'fasting', 'TX Fasting', 901)
       returning id, slug`,
    );
    const idOf = (slug: string) =>
      tags.rows.find((r) => r.slug === slug)?.id as string;
    await fn({
      send,
      categoryId: category.rows[0].id as string,
      tag: { hot: idOf("tx-hot"), fasting: idOf("tx-fasting") },
    });
  } finally {
    await client.query("rollback");
  }
}

describe.skipIf(!url)("admin items (real Postgres, rolled back)", () => {
  beforeAll(() => client.connect());
  afterAll(() => client.end());

  it("creates, updates, toggles and deletes an item, with tags", () =>
    withApi(async ({ send, categoryId, tag }) => {
      const created = await send("POST", "", {
        categoryId,
        nameEn: "TX Macchiato",
        priceEtb: 55.5,
        tagIds: [tag.hot],
      });
      expect(created.status).toBe(201);
      const item = await created.json();
      expect(item).toMatchObject({
        nameEn: "TX Macchiato",
        priceEtb: 55.5,
        tagIds: [tag.hot],
        isAvailable: true,
      });

      const put = async (tagIds: string[]) =>
        (
          await send("PUT", `/${item.id}`, {
            categoryId,
            nameEn: "TX Macchiato 2",
            priceEtb: 60,
            tagIds,
          })
        ).json();

      expect((await put([tag.fasting])).tagIds).toEqual([tag.fasting]);
      expect([...(await put([tag.fasting, tag.hot])).tagIds].sort()).toEqual(
        [tag.fasting, tag.hot].sort(),
      );
      expect((await put([])).tagIds).toEqual([]);

      const off = await (
        await send("PATCH", `/${item.id}/availability`, { isAvailable: false })
      ).json();
      expect(off.isAvailable).toBe(false);

      const list = await (await send("GET", "")).json();
      expect(list.map((i: { id: string }) => i.id)).toContain(item.id);

      expect((await send("DELETE", `/${item.id}`)).status).toBe(204);
      expect((await send("DELETE", `/${item.id}`)).status).toBe(404);
    }));

  it("returns 400 for a category that does not exist", () =>
    withApi(async ({ send }) => {
      const res = await send("POST", "", {
        categoryId: "00000000-0000-4000-8000-000000000000",
        nameEn: "TX Orphan",
        priceEtb: 10,
      });
      expect(res.status).toBe(400);
    }));
});
