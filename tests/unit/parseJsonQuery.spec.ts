import { test, expect } from "@playwright/test";
import { parseJsonQuery } from "../../src/StatFin/queryStatFin/modules/parseJsonQuery.js";

test.describe("parseJsonQuery", () => {
  test("parses valid json", () => {
    const result = parseJsonQuery(" { \"a\": 1 } ");
    expect(result).toEqual({ a: 1 });
  });

  test("throws on empty input", () => {
    expect(() => parseJsonQuery(" ")).toThrow("JSON query is required.");
  });

  test("throws on invalid json", () => {
    expect(() => parseJsonQuery("{invalid}")).toThrow(
      "JSON query must be valid JSON.",
    );
  });
});
