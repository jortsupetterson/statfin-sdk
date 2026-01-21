import { test, expect } from "@playwright/test";
import { buildJsonQuery, queryStatFin } from "../../src/index.js";

test.describe("queryStatFin integration", () => {
  let originalFetch: typeof fetch;

  test.beforeEach(() => {
    originalFetch = globalThis.fetch;
  });

  test.afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  test("posts json query and converts response to rows", async () => {
    const dataset = {
      id: ["A"],
      size: [1],
      dimension: {
        A: {
          category: {
            index: ["x"],
            label: { x: "X" },
          },
        },
      },
      value: [7],
    };

    globalThis.fetch = (async (input, init) => {
      expect(input).toBe("https://example.test/api");
      const body = JSON.parse(init?.body as string);
      expect(body).toEqual({ query: [], response: { format: "json-stat2" } });
      return new Response(JSON.stringify(dataset), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }) as typeof fetch;

    const rows = await queryStatFin(
      "https://example.test/api",
      buildJsonQuery([]),
    );

    expect(rows).toEqual([
      {
        A: "x",
        A_label: "X",
        value: 7,
      },
    ]);
  });

  test("bubbles invalid json errors", async () => {
    await expect(queryStatFin("https://example.test/api", "bad"))
      .rejects.toThrow("JSON query must be valid JSON.");
  });

  test("bubbles invalid url errors", async () => {
    const json = buildJsonQuery([]);
    await expect(queryStatFin(" ", json)).rejects.toThrow(
      "StatFin URL is required.",
    );
  });
});
