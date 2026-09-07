import { normalizeApiError } from "@/services/api/normalize-api-error";

export function getUnidadeMutationErrorMessage(error: unknown): string {
  const normalized = normalizeApiError(error);

  if (normalized.statusCode === 422) {
    const validationMessage = normalized.messages
      .filter((message) => message.trim().length > 0)
      .join(" ");

    return validationMessage || normalized.message;
  }

  if (normalized.statusCode === 429) {
    return "Muitas solicitações foram enviadas. Aguarde um momento e tente novamente.";
  }

  return normalized.message;
}
