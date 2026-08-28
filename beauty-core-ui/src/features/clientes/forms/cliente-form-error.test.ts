import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  getClienteMutationError,
} from "@/features/clientes/forms/cliente-form-error";

const normalizeApiErrorMock =
  vi.hoisted(
    () => vi.fn(),
  );

vi.mock(
  "@/services/api/normalize-api-error",
  () => ({
    normalizeApiError:
      normalizeApiErrorMock,
  }),
);

beforeEach(() => {
  normalizeApiErrorMock.mockReset();
});

describe("cliente form error", () => {
  it("preserva conflito 409 sem inventar detalhes", () => {
    normalizeApiErrorMock.mockReturnValue({
      statusCode: 409,
      message:
        "Cliente já cadastrado.",
      messages: [
        "Cliente já cadastrado.",
      ],
      error: "Conflict",
      requestId: null,
      correlationId: null,
      isNetworkError: false,
    });

    expect(
      getClienteMutationError(
        new Error("409"),
      ),
    ).toEqual({
      statusCode: 409,
      message:
        "Cliente já cadastrado.",
      isConflict: true,
      isValidationError: false,
      isRateLimited: false,
      isNetworkError: false,
    });
  });

  it("consolida mensagens 422", () => {
    normalizeApiErrorMock.mockReturnValue({
      statusCode: 422,
      message: "Nome inválido.",
      messages: [
        "Nome inválido.",
        "Telefone inválido.",
      ],
      error:
        "Unprocessable Entity",
      requestId: null,
      correlationId: null,
      isNetworkError: false,
    });

    expect(
      getClienteMutationError(
        new Error("422"),
      ).message,
    ).toBe(
      "Nome inválido. Telefone inválido.",
    );
  });

  it("trata 429 sem solicitar retry automático", () => {
    normalizeApiErrorMock.mockReturnValue({
      statusCode: 429,
      message:
        "Too Many Requests",
      messages: [
        "Too Many Requests",
      ],
      error:
        "Too Many Requests",
      requestId: null,
      correlationId: null,
      isNetworkError: false,
    });

    const result =
      getClienteMutationError(
        new Error("429"),
      );

    expect(
      result.isRateLimited,
    ).toBe(true);

    expect(result.message).toMatch(
      /Muitas solicitações/i,
    );
  });

  it("preserva mensagem de erro de rede", () => {
    normalizeApiErrorMock.mockReturnValue({
      statusCode: null,
      message:
        "Não foi possível conectar ao servidor.",
      messages: [
        "Não foi possível conectar ao servidor.",
      ],
      error: null,
      requestId: null,
      correlationId: null,
      isNetworkError: true,
    });

    const result =
      getClienteMutationError(
        new Error("network"),
      );

    expect(
      result.isNetworkError,
    ).toBe(true);

    expect(result.message).toBe(
      "Não foi possível conectar ao servidor.",
    );
  });
});
