import axios from "axios";

function readHeader(
  headers: unknown,
  name: string,
): string | undefined {
  if (
    typeof headers !== "object" ||
    headers === null
  ) {
    return undefined;
  }

  if (
    "get" in headers &&
    typeof headers.get === "function"
  ) {
    const value = headers.get(name);

    return typeof value === "string"
      ? value
      : undefined;
  }

  const record =
    headers as Record<
      string,
      unknown
    >;

  const value =
    record[name] ??
    record[name.toLowerCase()];

  return typeof value === "string"
    ? value
    : undefined;
}

export function getDashboardErrorReference(
  error: unknown,
): string | undefined {
  if (!axios.isAxiosError(error)) {
    return undefined;
  }

  const headers =
    error.response?.headers;

  return (
    readHeader(
      headers,
      "x-correlation-id",
    ) ??
    readHeader(
      headers,
      "x-request-id",
    )
  );
}
