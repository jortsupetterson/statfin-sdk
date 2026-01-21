import { test, expect } from "@playwright/test";

test.describe("StatFin browser environments", () => {
  test("fetches json-stat2 via browser fetch", async ({ page }) => {
    test.setTimeout(30000);

    const url =
      "https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/vaerak/statfin_vaerak_pxt_11re.px";
    const body = {
      query: [
        {
          code: "Vuosi",
          selection: { filter: "item", values: ["2023"] },
        },
        {
          code: "Alue",
          selection: { filter: "item", values: ["SSS"] },
        },
        {
          code: "Tiedot",
          selection: { filter: "item", values: ["vaesto"] },
        },
      ],
      response: { format: "json-stat2" },
    };

    await page.goto("about:blank");
    const result = await page.evaluate(async ({ url, body }) => {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return {
        ok: response.ok,
        status: response.status,
        class: data?.class,
        valueCount: Array.isArray(data?.value) ? data.value.length : 0,
        idCount: Array.isArray(data?.id) ? data.id.length : 0,
      };
    }, { url, body });

    expect(result.ok).toBe(true);
    expect(result.status).toBe(200);
    expect(result.class).toBe("dataset");
    expect(result.idCount).toBeGreaterThan(0);
    expect(result.valueCount).toBeGreaterThan(0);
  });
});
