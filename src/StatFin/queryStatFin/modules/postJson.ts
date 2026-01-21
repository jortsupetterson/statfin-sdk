export const postJson = async (
  url: string,
  body: unknown,
): Promise<unknown> => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `StatFin request failed: ${response.status} ${response.statusText} ${text}`,
    );
  }

  return response.json();
};
