import { AxiosError, AxiosHeaders } from "axios";
import { describe, expect, it } from "vitest";

import { getArquivoUploadErrorMessage } from "@/features/arquivos/utils/arquivos-api-error";

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

describe("arquivo upload error", () => {
  it("trata falha de rede", () => {
    expect(getArquivoUploadErrorMessage(createAxiosError())).toContain(
      "conectar ao servidor",
    );
  });

  it("preserva mensagem backend em 400", () => {
    expect(
      getArquivoUploadErrorMessage(
        createAxiosError(400, {
          message: "Arquivo inválido.",
        }),
      ),
    ).toBe("Arquivo inválido.");
  });

  it("trata 413", () => {
    expect(getArquivoUploadErrorMessage(createAxiosError(413))).toContain(
      "tamanho permitido",
    );
  });

  it("trata 415", () => {
    expect(getArquivoUploadErrorMessage(createAxiosError(415))).toContain(
      "não é suportado",
    );
  });

  it("trata 422", () => {
    expect(getArquivoUploadErrorMessage(createAxiosError(422))).toContain(
      "validação",
    );
  });

  it("trata 429", () => {
    expect(getArquivoUploadErrorMessage(createAxiosError(429))).toContain(
      "Muitas tentativas",
    );
  });

  it("trata erro desconhecido", () => {
    expect(getArquivoUploadErrorMessage(new Error("x"))).toBe(
      "Não foi possível enviar o arquivo. Tente novamente.",
    );
  });
});
