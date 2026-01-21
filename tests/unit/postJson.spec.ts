import { test, expect } from "@playwright/test";
import { postJson } from "../../src/StatFin/queryStatFin/modules/postJson.js";

test.describe("postJson", () => {
  let originalFetch: typeof fetch;

  test.beforeEach(() => {
    originalFetch = globalThis.fetch;
  });

  test.afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  test("returns parsed json on success", async () => {
    globalThis.fetch = (async (_input, init) => {
      expect(init?.method).toBe("POST");
      expect(init?.headers).toEqual({ "Content-Type": "application/json" });
      expect(init?.body).toBe(JSON.stringify({ ok: true }));
      return new Response(JSON.stringify({ status: "ok" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }) as typeof fetch;

    const result = await postJson("https://example.test", { ok: true });
    expect(result).toEqual({ status: "ok" });
  });

  test("throws on non-ok response", async () => {
    globalThis.fetch = (async () =>
      new Response("bad", { status: 500, statusText: "Server Error" })) as typeof fetch;

    await expect(postJson("https://example.test", {})).rejects.toThrow(
      "StatFin request failed: 500 Server Error bad",
    );
  });
});
