import { test, expect } from "@playwright/test";
import { postJson } from "../../src/StatFin/queryStatFin/modules/postJson.js";

test.describe("postJson", () => {
  let originalFetch: typeof fetch;
  let originalCaches: CacheStorage | undefined;
  let hadCaches = false;

  test.beforeEach(() => {
    originalFetch = globalThis.fetch;
    hadCaches = "caches" in globalThis;
    originalCaches = globalThis.caches;
  });

  test.afterEach(() => {
    globalThis.fetch = originalFetch;
    if (hadCaches) {
      globalThis.caches = originalCaches as CacheStorage;
    } else {
      delete (globalThis as { caches?: CacheStorage }).caches;
    }
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

  test("returns cached response when available", async () => {
    const cachedResponse = new Response(JSON.stringify({ status: "cached" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
    let matchKey: RequestInfo | undefined;

    globalThis.caches = {
      open: async (name: string) => {
        expect(name).toBe("statfin-sdk");
        return {
          match: async (key: RequestInfo) => {
            matchKey = key;
            return cachedResponse;
          },
          put: async () => {
            throw new Error("cache.put should not be called");
          },
        } as Cache;
      },
    } as CacheStorage;

    let fetchCalled = false;
    globalThis.fetch = (async () => {
      fetchCalled = true;
      return new Response(JSON.stringify({ status: "ok" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }) as typeof fetch;

    const result = await postJson("https://example.test", { ok: true });
    expect(result).toEqual({ status: "cached" });
    expect(fetchCalled).toBe(false);
    expect(typeof matchKey).toBe("string");
    expect(matchKey as string).toContain("__statfin_cache=");
  });

  test("stores successful responses in cache when available", async () => {
    let putKey: RequestInfo | undefined;
    let putResponse: Response | undefined;

    globalThis.caches = {
      open: async () => {
        return {
          match: async () => undefined,
          put: async (key: RequestInfo, response: Response) => {
            putKey = key;
            putResponse = response;
          },
        } as Cache;
      },
    } as CacheStorage;

    globalThis.fetch = (async () =>
      new Response(JSON.stringify({ status: "ok" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })) as typeof fetch;

    const result = await postJson("https://example.test", { ok: true });
    expect(result).toEqual({ status: "ok" });
    expect(typeof putKey).toBe("string");
    expect(putKey as string).toContain("__statfin_cache=");
    expect(putResponse?.status).toBe(200);
  });
});
