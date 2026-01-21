import { JsonStat2Row, jsonStat2ToRows } from "./modules/jsonStat2ToRows.js";
import { normalizeUrl } from "./modules/normalizeUrl.js";
import { parseJsonQuery } from "./modules/parseJsonQuery.js";
import { postJson } from "./modules/postJson.js";

export async function queryStatFin(
  url: string,
  jsonQuery: string,
): Promise<Array<JsonStat2Row>> {
  const targetUrl = normalizeUrl(url);
  const body = parseJsonQuery(jsonQuery);
  const jsonStat2 = await postJson(targetUrl, body);
  const rows = jsonStat2ToRows(jsonStat2);
  return rows;
}
