export const parseJsonQuery = (rawJson: string): unknown => {
  const trimmed = rawJson.trim();
  if (!trimmed) {
    throw new Error("JSON query is required.");
  }

  try {
    return JSON.parse(trimmed);
  } catch {
    throw new Error("JSON query must be valid JSON.");
  }
};
