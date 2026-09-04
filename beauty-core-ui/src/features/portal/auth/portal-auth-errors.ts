import { isAxiosError } from "axios";

export type PortalAuthErrorKind =
  | "validation"
  | "unauthorized"
  | "forbidden"
  | "not-found"
  | "rate-limit"
  | "network"
  | "server"
  | "unknown";

export type PortalAuthError = Readonly<{
  kind: PortalAuthErrorKind;
  status: number | null;
  message: string;
}>;

function getKindFromStatus(status: number | null): PortalAuthErrorKind {
  if (status === 400) {
    return "validation";
  }

  if (status === 401) {
    return "unauthorized";
  }

  if (status === 403) {
    return "forbidden";
  }

  if (status === 404) {
    return "not-found";
  }

  if (status === 429) {
    return "rate-limit";
  }

  if (status !== null && status >= 500) {
    return "server";
  }

  return "unknown";
}

function getSafeMessage(kind: PortalAuthErrorKind): string {
  switch (kind) {
    case "validation":
      return "Confira os dados informados.";
    case "unauthorized":
      return "O código ou a sessão não é válido.";
    case "forbidden":
      return "O acesso ao Portal do cliente está indisponível.";
    case "not-found":
      return "Não foi possível localizar o cliente ou o tenant.";
    case "rate-limit":
      return "Muitas tentativas. Aguarde antes de tentar novamente.";
    case "network":
      return "Não foi possível conectar ao servidor.";
    case "server":
      return "O servidor não conseguiu concluir a operação.";
    default:
      return "Não foi possível concluir a operação.";
  }
}

export function normalizePortalAuthError(
  error: unknown,
): PortalAuthError {
  if (!isAxiosError(error)) {
    return {
      kind: "unknown",
      status: null,
      message: getSafeMessage("unknown"),
    };
  }

  const status = error.response?.status ?? null;
  const kind = status === null
    ? "network"
    : getKindFromStatus(status);

  return {
    kind,
    status,
    message: getSafeMessage(kind),
  };
}