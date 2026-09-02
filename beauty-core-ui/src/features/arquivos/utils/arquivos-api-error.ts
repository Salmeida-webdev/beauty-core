import { isAxiosError } from "axios";

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

export function getArquivoUploadErrorMessage(error: unknown): string {
  if (!isAxiosError(error)) {
    return "Não foi possível enviar o arquivo. Tente novamente.";
  }

  if (!error.response) {
    return "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.";
  }

  const backendMessage = getBackendMessage(error.response.data);

  switch (error.response.status) {
    case 400:
      return backendMessage ?? "O arquivo enviado é inválido.";

    case 413:
      return "O arquivo excede o tamanho permitido pelo servidor.";

    case 415:
      return "O tipo do arquivo não é suportado pelo servidor.";

    case 422:
      return backendMessage ?? "O arquivo não atende às regras de validação.";

    case 429:
      return "Muitas tentativas de envio. Aguarde um momento e tente novamente.";

    default:
      return (
        backendMessage ?? "Não foi possível enviar o arquivo. Tente novamente."
      );
  }
}
