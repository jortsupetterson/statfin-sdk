export const normalizeUrl = (rawUrl: string): string => {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    throw new Error("StatFin URL is required.");
  }

  try {
    new URL(trimmed);
  } catch {
    throw new Error(`Invalid StatFin URL: ${trimmed}`);
  }

  return trimmed;
};
