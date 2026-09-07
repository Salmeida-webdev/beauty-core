import { normalizeApiError } from "@/services/api/normalize-api-error";

export function getUsuarioMutationError(error: unknown): string {
  const normalized = normalizeApiError(error);

  if (normalized.statusCode === 422) {
    const message = normalized.messages
      .filter((item) => item.trim().length > 0)
      .join(" ");

    return message || normalized.message;
  }

  if (normalized.statusCode === 429) {
    return "Muitas solicitações foram enviadas. Aguarde um momento e tente novamente.";
  }

  return normalized.message;
}
