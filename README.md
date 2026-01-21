# statfin-sdk

Unofficial StatFin (Tilastokeskus) SDK for querying the Statistics Finland PxWeb API.

ESM only. Requires Node 18+ (built-in `fetch`).

## Goals

- Developer friendly API for StatFin PxWeb data
- Simple, typed query building for JSON-stat2
- Return a flat row array with labels so developers can programmatically work with the data more easily

## Installation

```sh
npm install statfin-sdk
# or
pnpm add statfin-sdk
# or
yarn add statfin-sdk
```

## Usage

```ts
import { buildJsonQuery, queryStatFin } from "statfin-sdk";

const url =
  "https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/vaerak/statfin_vaerak_pxt_11re.px";

const jsonQuery = buildJsonQuery([
  { code: "Vuosi", selection: { filter: "item", values: ["2023"] } },
  { code: "Alue", selection: { filter: "item", values: ["SSS"] } },
  { code: "Tiedot", selection: { filter: "item", values: ["vaesto"] } },
]);

const rows = await queryStatFin(url, jsonQuery);
console.log(rows[0]);
```

## Row format

`queryStatFin` returns an array of rows. Each row contains:

- One key per dimension (e.g. `Vuosi`, `Tiedot`)
- A label field for each dimension (e.g. `Vuosi_label`)
- `value` for the numeric value

## Use a raw JSON query

If you copied the JSON query from the PxWeb UI, pass it directly:

```ts
const rows = await queryStatFin(url, jsonQueryStringFromUi);
```

## How to get the URL and JSON query

Use the StatFin PxWeb UI and copy the URL + JSON query from
"Make this table available in your application".

- FI: https://stat.fi/media/uploads/org/avoindata/pxweb_api-ohje.pdf
- SV: https://stat.fi/media/uploads/org_sv/avoindata/px-web_api-anvisning.pdf
- EN: https://stat.fi/media/uploads/org_en/avoindata/px-web_api-help.pdf
