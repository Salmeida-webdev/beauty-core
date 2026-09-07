import { isAxiosError } from "axios";

export type ArquivoAction = "download" | "remove";

type BackendErrorPayload = {
  message?: string | string[];
};

function getBackendMessage(data: unknown): string | null {
  if (!data || typeof data !== "object") {
    return null;
  }

  const payload = data as BackendErrorPayload;

  if (typeof payload.message === "string") {
    return payload.message;
  }

  if (Array.isArray(payload.message)) {
    const messages = payload.message.filter(
      (message): message is string => typeof message === "string",
    );

    return messages.length > 0 ? messages.join(" ") : null;
  }

  return null;
}

function getDefaultMessage(action: ArquivoAction): string {
  return action === "download"
    ? "Não foi possível baixar o arquivo."
    : "Não foi possível remover o arquivo.";
}

export function getArquivoActionErrorMessage(
  error: unknown,
  action: ArquivoAction,
): string {
  if (!isAxiosError(error)) {
    return getDefaultMessage(action);
  }

  if (!error.response) {
    return "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.";
  }

  const backendMessage = getBackendMessage(error.response.data);

  switch (error.response.status) {
    case 400:
      return backendMessage ?? "A solicitação enviada é inválida.";

    case 403:
      return "Você não possui permissão para executar esta ação.";

    case 404:
      return action === "download"
        ? "O arquivo não foi encontrado."
        : "O arquivo não existe mais ou já foi removido.";

    case 409:
      return (
        backendMessage ??
        "A ação não pôde ser concluída devido ao estado atual do arquivo."
      );

    case 429:
      return "Muitas tentativas. Aguarde um momento e tente novamente.";

    default:
      return backendMessage ?? getDefaultMessage(action);
  }
}
