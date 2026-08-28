import {
  normalizeApiError,
} from "@/services/api/normalize-api-error";

export type ClienteMutationError = {
  statusCode: number | null;
  message: string;
  isConflict: boolean;
  isValidationError: boolean;
  isRateLimited: boolean;
  isNetworkError: boolean;
};

export function getClienteMutationError(
  error: unknown,
): ClienteMutationError {
  const normalized =
    normalizeApiError(error);

  if (normalized.statusCode === 422) {
    const validationMessage =
      normalized.messages
        .filter(
          (message) =>
            message.trim().length > 0,
        )
        .join(" ");

    return {
      statusCode:
        normalized.statusCode,
      message:
        validationMessage ||
        normalized.message,
      isConflict: false,
      isValidationError: true,
      isRateLimited: false,
      isNetworkError:
        normalized.isNetworkError,
    };
  }

  if (normalized.statusCode === 409) {
    return {
      statusCode:
        normalized.statusCode,
      message:
        normalized.message,
      isConflict: true,
      isValidationError: false,
      isRateLimited: false,
      isNetworkError:
        normalized.isNetworkError,
    };
  }

  if (normalized.statusCode === 429) {
    return {
      statusCode:
        normalized.statusCode,
      message:
        "Muitas solicitações foram enviadas. Aguarde um momento e tente novamente.",
      isConflict: false,
      isValidationError: false,
      isRateLimited: true,
      isNetworkError: false,
    };
  }

  return {
    statusCode:
      normalized.statusCode,
    message:
      normalized.message,
    isConflict: false,
    isValidationError: false,
    isRateLimited: false,
    isNetworkError:
      normalized.isNetworkError,
  };
}
