import { describe, expect, it } from "vitest";

import {
  normalizePortalAuthError,
} from "./portal-auth-errors";

describe("normalizePortalAuthError", () => {
  it.each([
    [400, "validation"],
    [401, "unauthorized"],
    [403, "forbidden"],
    [404, "not-found"],
    [429, "rate-limit"],
    [500, "server"],
  ] as const)(
    "classifica status %s como %s",
    (status, expectedKind) => {
      const error = {
        isAxiosError: true,
        response: {
          status,
        },
      };

      expect(
        normalizePortalAuthError(error),
      ).toMatchObject({
        kind: expectedKind,
        status,
      });
    },
  );

  it("classifica falha sem resposta como network", () => {
    const error = {
      isAxiosError: true,
      message: "Network Error",
    };

    expect(
      normalizePortalAuthError(error),
    ).toMatchObject({
      kind: "network",
      status: null,
    });
  });

  it("não expõe payload bruto ou PII na mensagem normalizada", () => {
    const error = {
      isAxiosError: true,
      response: {
        status: 401,
        data: {
          telefone: "83999999999",
          clienteId: "cliente-secreto",
          access_token: "token-secreto",
        },
      },
    };

    const result = normalizePortalAuthError(error);

    expect(result.message).not.toContain("83999999999");
    expect(result.message).not.toContain("cliente-secreto");
    expect(result.message).not.toContain("token-secreto");
  });
});