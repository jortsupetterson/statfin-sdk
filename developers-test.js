import { buildJsonQuery, queryStatFin } from "./dist/index.js";

const dynamicVar = ["2024Q1", "2024Q2", "2024Q3", "2024Q4"];

const main = async () => {
  const result = await queryStatFin(
    "https://statfin.stat.fi/PxWeb/api/v1/fi/StatFin_Passiivi/aly/statfinpas_aly_pxt_11zm.px",
    buildJsonQuery([
      {
        code: "Vuosineljännes",
        selection: {
          filter: "item",
          values: dynamicVar,
        },
      },
      {
        code: "Oikeudellinen muoto",
        selection: {
          filter: "item",
          values: [
            "SSS",
            "11",
            "12",
            "13",
            "14",
            "15",
            "21",
            "22",
            "31",
            "33",
            "35",
            "41",
            "53",
            "54",
            "62",
            "90",
          ],
        },
      },
      {
        code: "Toimiala",
        selection: {
          filter: "item",
          values: ["F"],
        },
      },
      {
        code: "Tiedot",
        selection: {
          filter: "item",
          values: ["aloittaneita", "lopettaneita"],
        },
      },
    ]),
  );
  console.log(result);
};

main().catch((error) => {
  console.error("Walkthrough failed:", error);
  process.exitCode = 1;
});
