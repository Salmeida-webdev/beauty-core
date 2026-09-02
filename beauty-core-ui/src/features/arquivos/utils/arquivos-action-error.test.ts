import { AxiosError, AxiosHeaders } from "axios";
import { describe, expect, it } from "vitest";

import { getArquivoActionErrorMessage } from "@/features/arquivos/utils/arquivos-action-error";

function createAxiosError(status?: number, data?: unknown): AxiosError {
  if (status === undefined) {
    return new AxiosError("Network Error");
  }

  return new AxiosError("Request failed", undefined, undefined, undefined, {
    data,
    status,
    statusText: "Error",
    headers: new AxiosHeaders(),
    config: {
      headers: new AxiosHeaders(),
    },
  });
}

describe("arquivo action error", () => {
  it("trata rede", () => {
    expect(
      getArquivoActionErrorMessage(createAxiosError(), "download"),
    ).toContain("conectar ao servidor");
  });

  it("trata 403", () => {
    expect(
      getArquivoActionErrorMessage(createAxiosError(403), "remove"),
    ).toContain("permissão");
  });

  it("trata 404 de download", () => {
    expect(
      getArquivoActionErrorMessage(createAxiosError(404), "download"),
    ).toBe("O arquivo não foi encontrado.");
  });

  it("trata 404 de remocao", () => {
    expect(
      getArquivoActionErrorMessage(createAxiosError(404), "remove"),
    ).toContain("já foi removido");
  });

  it("preserva mensagem backend em conflito", () => {
    expect(
      getArquivoActionErrorMessage(
        createAxiosError(409, {
          message: "Arquivo vinculado.",
        }),
        "remove",
      ),
    ).toBe("Arquivo vinculado.");
  });

  it("trata 429", () => {
    expect(
      getArquivoActionErrorMessage(createAxiosError(429), "remove"),
    ).toContain("Muitas tentativas");
  });
});
