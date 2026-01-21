const CACHE_NAME = "statfin-sdk";
const CACHE_KEY_PARAM = "__statfin_cache";

const hashBody = (bodyJson: string): string => {
  let hash = 2166136261;
  for (let i = 0; i < bodyJson.length; i += 1) {
    hash ^= bodyJson.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
};

const buildCacheKey = (url: string, bodyJson: string): string => {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}${CACHE_KEY_PARAM}=${hashBody(bodyJson)}-${bodyJson.length}`;
};

export const postJson = async (
  url: string,
  body: unknown,
): Promise<unknown> => {
  const bodyJson = JSON.stringify(body);
  const cacheStorage = globalThis.caches;
  let cache: Cache | null = null;
  let cacheKey: string | null = null;

  if (cacheStorage?.open) {
    cacheKey = buildCacheKey(url, bodyJson);
    try {
      cache = await cacheStorage.open(CACHE_NAME);
      const cachedResponse = await cache.match(cacheKey);
      if (cachedResponse) {
        return cachedResponse.json();
      }
    } catch {
      cache = null;
      cacheKey = null;
    }
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: bodyJson,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `StatFin request failed: ${response.status} ${response.statusText} ${text}`,
    );
  }

  const responseClone = cache && cacheKey ? response.clone() : null;
  const data = await response.json();

  if (cache && cacheKey && responseClone) {
    try {
      await cache.put(cacheKey, responseClone);
    } catch {
      // Cache failures should not affect data retrieval.
    }
  }

  return data;
};
