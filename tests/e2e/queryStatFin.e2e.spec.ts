import { test, expect } from "@playwright/test";
import { buildJsonQuery, queryStatFin } from "../../src/index.js";

test.describe("queryStatFin e2e", () => {
  test("fetches StatFin data from the live API", async () => {
    test.setTimeout(30000);

    const url =
      "https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/vaerak/statfin_vaerak_pxt_11re.px";
    const jsonQuery = buildJsonQuery([
      { code: "Vuosi", selection: { filter: "item", values: ["2023"] } },
      { code: "Alue", selection: { filter: "item", values: ["SSS"] } },
      { code: "Tiedot", selection: { filter: "item", values: ["vaesto"] } },
    ]);

    const rows = await queryStatFin(url, jsonQuery);

    expect(rows.length).toBeGreaterThan(0);
    expect(typeof rows[0].value).toBe("number");
    expect(rows[0]).toHaveProperty("Vuosi");
    expect(rows[0]).toHaveProperty("Tiedot");
  });
});
