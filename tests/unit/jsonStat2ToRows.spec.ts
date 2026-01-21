import { test, expect } from "@playwright/test";
import { jsonStat2ToRows } from "../../src/StatFin/queryStatFin/modules/jsonStat2ToRows.js";

test.describe("jsonStat2ToRows", () => {
  test("converts root dataset to rows with labels", () => {
    const data = {
      id: ["A", "B"],
      size: [2, 2],
      dimension: {
        A: {
          category: {
            index: { a1: 0, a2: 1 },
            label: { a1: "A1", a2: "A2" },
          },
        },
        B: {
          category: {
            index: ["b1", "b2"],
            label: { b1: "B1", b2: "B2" },
          },
        },
      },
      value: [1, 2, 3, 4],
    };

    const rows = jsonStat2ToRows(data);
    expect(rows).toHaveLength(4);
    expect(rows[0]).toEqual({
      A: "a1",
      A_label: "A1",
      B: "b1",
      B_label: "B1",
      value: 1,
    });
    expect(rows[3]).toEqual({
      A: "a2",
      A_label: "A2",
      B: "b2",
      B_label: "B2",
      value: 4,
    });
  });

  test("handles wrapped dataset and sparse index", () => {
    const data = {
      dataset: {
        id: ["A"],
        size: [3],
        dimension: {
          A: {
            category: {
              index: { first: 0, third: 2 },
              label: { first: "First", third: "Third" },
            },
          },
        },
        value: [10, 11, 12],
      },
    };

    const rows = jsonStat2ToRows(data);
    expect(rows[0].A).toBe("first");
    expect(rows[0].A_label).toBe("First");
    expect(rows[1].A).toBeUndefined();
    expect(rows[1].A_label).toBeUndefined();
    expect(rows[2].A).toBe("third");
    expect(rows[2].A_label).toBe("Third");
  });

  test("uses key when label is missing", () => {
    const data = {
      id: ["A"],
      size: [1],
      dimension: {
        A: {
          category: {
            index: ["x"],
          },
        },
      },
      value: [1],
    };

    const rows = jsonStat2ToRows(data);
    expect(rows[0]).toEqual({ A: "x", A_label: "x", value: 1 });
  });

  test("handles size 0 dimensions", () => {
    const data = {
      id: ["A"],
      size: [0],
      dimension: {
        A: {
          category: {
            index: [],
          },
        },
      },
      value: [99],
    };

    const rows = jsonStat2ToRows(data);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toEqual({ A: undefined, A_label: undefined, value: 99 });
  });

  test("uses size fallback when size is missing", () => {
    const data = {
      id: ["A"],
      size: [],
      dimension: {
        A: {
          category: {
            index: ["x"],
          },
        },
      },
      value: [1],
    };

    const rows = jsonStat2ToRows(data);
    expect(rows).toEqual([{ value: 1 }]);
  });

  test("throws when id or size are missing", () => {
    expect(() => jsonStat2ToRows({})).toThrow(
      "json-stat2 dataset is missing id or size.",
    );
  });

  test("throws when value is not an array", () => {
    expect(() =>
      jsonStat2ToRows({
        id: [],
        size: [],
        dimension: {},
        value: "nope",
      }),
    ).toThrow("json-stat2 dataset value must be an array.");
  });

  test("throws when dimension index is missing", () => {
    expect(() =>
      jsonStat2ToRows({
        id: ["A"],
        size: [1],
        dimension: { A: { category: {} } },
        value: [1],
      }),
    ).toThrow("json-stat2 dimension missing category index: A");
  });

  test("throws when dimension is missing", () => {
    expect(() =>
      jsonStat2ToRows({
        id: ["A"],
        size: [1],
        value: [1],
      }),
    ).toThrow("json-stat2 dimension missing category index: A");
  });
});
