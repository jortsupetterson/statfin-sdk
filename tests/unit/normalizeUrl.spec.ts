import { test, expect } from "@playwright/test";
import { normalizeUrl } from "../../src/StatFin/queryStatFin/modules/normalizeUrl.js";

test.describe("normalizeUrl", () => {
  test("returns a trimmed valid url", () => {
    expect(normalizeUrl("  https://example.test/api  ")).toBe(
      "https://example.test/api",
    );
  });

  test("throws on empty input", () => {
    expect(() => normalizeUrl("   ")).toThrow("StatFin URL is required.");
  });

  test("throws on invalid url", () => {
    expect(() => normalizeUrl("not-a-url")).toThrow("Invalid StatFin URL");
  });
});
