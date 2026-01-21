export type PxFilter = "item" | "all" | "top" | "from" | "vs";
export type PxQueryItem<C extends string, V extends string> = {
  code: C;
  selection: {
    filter: PxFilter;
    values: readonly V[];
  };
};

export function q<C extends string, V extends string>(
  code: C,
  values: readonly V[],
  filter: PxFilter = "item",
): PxQueryItem<C, V> {
  return { code, selection: { filter, values } };
}

export function buildJsonQuery<
  T extends readonly PxQueryItem<string, string>[],
>(items: T): string {
  return JSON.stringify({
    query: items,
    response: { format: "json-stat2" as const },
  });
}
