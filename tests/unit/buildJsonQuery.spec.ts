import { test, expect } from "@playwright/test";
import { buildJsonQuery, q } from "../../src/StatFin/buildJsonQuery/index.js";

test.describe("buildJsonQuery", () => {
  test("builds a json-stat2 query with provided items", () => {
    const items = [
      q("Year", ["2023"]),
      q("Metric", ["value"], "item"),
    ];

    const json = buildJsonQuery(items);
    const parsed = JSON.parse(json);

    expect(parsed).toEqual({
      query: [
        { code: "Year", selection: { filter: "item", values: ["2023"] } },
        { code: "Metric", selection: { filter: "item", values: ["value"] } },
      ],
      response: { format: "json-stat2" },
    });
  });

  test("supports custom filters", () => {
    const items = [
      q("Year", ["2020", "2021"], "top"),
      q("Region", ["01*"], "all"),
      q("Sector", ["S"], "vs"),
      q("Period", ["2023"], "from"),
    ];

    const parsed = JSON.parse(buildJsonQuery(items));
    expect(parsed.query).toEqual([
      { code: "Year", selection: { filter: "top", values: ["2020", "2021"] } },
      { code: "Region", selection: { filter: "all", values: ["01*"] } },
      { code: "Sector", selection: { filter: "vs", values: ["S"] } },
      { code: "Period", selection: { filter: "from", values: ["2023"] } },
    ]);
  });

  test("allows empty queries", () => {
    const parsed = JSON.parse(buildJsonQuery([]));
    expect(parsed).toEqual({ query: [], response: { format: "json-stat2" } });
  });
});
