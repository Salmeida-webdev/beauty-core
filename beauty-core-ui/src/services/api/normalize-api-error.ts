import axios from "axios";

import type {
  ApiErrorPayload,
  NormalizedApiError,
} from "@/services/api/api.types";

const DEFAULT_ERROR_MESSAGE =
  "Não foi possível concluir a operação. Tente novamente.";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isApiErrorPayload(value: unknown): value is ApiErrorPayload {
  if (!isRecord(value)) {
    return false;
  }

  const message = value.message;

  return (
    typeof value.statusCode === "number" &&
    (typeof message === "string" ||
      (Array.isArray(message) &&
        message.every((item) => typeof item === "string")))
  );
}

function normalizeMessages(
  message: string | string[] | undefined,
): string[] {
  if (Array.isArray(message)) {
    return message
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  if (typeof message === "string" && message.trim().length > 0) {
    return [message.trim()];
  }

  return [];
}

export function normalizeApiError(
  error: unknown,
): NormalizedApiError {
  if (!axios.isAxiosError(error)) {
    return {
      statusCode: null,
      message: DEFAULT_ERROR_MESSAGE,
      messages: [DEFAULT_ERROR_MESSAGE],
      error: null,
      requestId: null,
      correlationId: null,
      isNetworkError: false,
    };
  }

  if (!error.response) {
    const networkMessage =
      "Não foi possível conectar ao servidor. Verifique sua conexão.";

    return {
      statusCode: null,
      message: networkMessage,
      messages: [networkMessage],
      error: null,
      requestId: null,
      correlationId: null,
      isNetworkError: true,
    };
  }

  const payload = isApiErrorPayload(error.response.data)
    ? error.response.data
    : null;

  const messages = normalizeMessages(payload?.message);
  const fallbackMessage =
    messages[0] ?? DEFAULT_ERROR_MESSAGE;

  const requestIdHeader = error.response.headers["x-request-id"];
  const correlationIdHeader =
    error.response.headers["x-correlation-id"];

  return {
    statusCode: payload?.statusCode ?? error.response.status,
    message: fallbackMessage,
    messages: messages.length > 0
      ? messages
      : [DEFAULT_ERROR_MESSAGE],
    error: payload?.error ?? null,
    requestId:
      payload?.requestId ??
      (typeof requestIdHeader === "string" ? requestIdHeader : null),
    correlationId:
      payload?.correlationId ??
      (typeof correlationIdHeader === "string"
        ? correlationIdHeader
        : null),
    isNetworkError: false,
  };
}
