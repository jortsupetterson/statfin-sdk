import { buildJsonQuery, queryStatFin } from "./dist/index.js";

const main = async () => {
  const result = await queryStatFin(
    "https://pxdata.stat.fi/PxWeb/api/v1/fi/StatFin/klv/statfin_klv_pxt_14kr.px",
    JSON.stringify({
      query: [
        {
          code: "Kuukausi",
          selection: {
            filter: "item",
            values: [
              "2024M01",
              "2024M02",
              "2024M03",
              "2024M04",
              "2024M05",
              "2024M06",
              "2024M07",
              "2024M08",
              "2024M09",
              "2024M10",
              "2024M11",
              "2024M12",
            ],
          },
        },
        {
          code: "Toimiala",
          selection: {
            filter: "item",
            values: ["G47"],
          },
        },
        {
          code: "Muuttuja",
          selection: {
            filter: "item",
            values: ["lv"],
          },
        },
      ],
      response: {
        format: "json-stat2",
      },
    }),
  );
  console.log(result);
};

main().catch((error) => {
  console.error("Walkthrough failed:", error);
  process.exitCode = 1;
});
