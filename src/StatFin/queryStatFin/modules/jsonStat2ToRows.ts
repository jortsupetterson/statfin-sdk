export type JsonStat2CategoryIndex = Record<string, number> | string[];

export interface JsonStat2DimensionCategory {
  index: JsonStat2CategoryIndex;
  label?: Record<string, string>;
}

export interface JsonStat2Dimension {
  category: JsonStat2DimensionCategory;
}

export interface JsonStat2Dataset {
  id: string[];
  size: number[];
  dimension: Record<string, JsonStat2Dimension>;
  value: Array<number | null>;
}

export type JsonStat2Input = JsonStat2Dataset | { dataset: JsonStat2Dataset };

export type JsonStat2Row = Record<string, string | number | null | undefined>;

const getDataset = (input: unknown): JsonStat2Dataset => {
  const wrapped = (input as { dataset?: JsonStat2Dataset }).dataset;
  return wrapped ?? (input as JsonStat2Dataset);
};

const buildIndex = (index: JsonStat2CategoryIndex, size: number): string[] => {
  if (Array.isArray(index)) {
    return index;
  }

  const keys = new Array<string>(size);
  for (const [key, position] of Object.entries(index)) {
    if (typeof position === "number") {
      keys[position] = key;
    }
  }

  return keys;
};

export const jsonStat2ToRows = (jsonStat2: unknown): JsonStat2Row[] => {
  const dataset = getDataset(jsonStat2);
  const ids = dataset.id;
  const sizes = dataset.size;

  if (!Array.isArray(ids) || !Array.isArray(sizes)) {
    throw new Error("json-stat2 dataset is missing id or size.");
  }
  if (!Array.isArray(dataset.value)) {
    throw new Error("json-stat2 dataset value must be an array.");
  }

  const dimensions = ids.map((id, index) => {
    const dimension = dataset.dimension?.[id];
    if (!dimension?.category?.index) {
      throw new Error(`json-stat2 dimension missing category index: ${id}`);
    }
    return {
      id,
      keys: buildIndex(dimension.category.index, sizes[index] ?? 0),
      labels: dimension.category.label ?? {},
    };
  });

  const rows: JsonStat2Row[] = [];
  for (let flat = 0; flat < dataset.value.length; flat++) {
    let remainder = flat;
    const row: JsonStat2Row = {};

    // JSON-stat2 uses row-major order where the last dimension varies fastest.
    for (let dimIndex = sizes.length - 1; dimIndex >= 0; dimIndex--) {
      const size = sizes[dimIndex];
      const idx = size > 0 ? remainder % size : 0;
      remainder = size > 0 ? Math.floor(remainder / size) : remainder;

      const dimension = dimensions[dimIndex];
      const key = dimension.keys[idx];
      row[dimension.id] = key;
      row[`${dimension.id}_label`] = key ? (dimension.labels[key] ?? key) : key;
    }

    row.value = dataset.value[flat];
    rows.push(row);
  }

  return rows;
};
