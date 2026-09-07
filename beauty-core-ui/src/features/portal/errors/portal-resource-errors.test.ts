import {
  describe,
  expect,
  it,
} from "vitest";

import {
  getPortalResourceErrorStatus,
  isPortalResourceAccessError,
  normalizePortalResourceError,
} from "./portal-resource-errors";

describe("portal resource errors", () => {
  it.each([
    [400, "validation"],
    [401, "unauthorized"],
    [403, "forbidden"],
    [404, "not-found"],
    [429, "rate-limit"],
    [500, "server"],
  ] as const)(
    "reutiliza a classificacao segura para status %s",
    (status, expectedKind) => {
      const result = normalizePortalResourceError({
        isAxiosError: true,
        response: {
          status,
        },
      });

      expect(result).toMatchObject({
        kind: expectedKind,
        status,
      });
    },
  );

  it("identifica somente 401 e 403 como perda de acesso", () => {
    expect(
      isPortalResourceAccessError({
        isAxiosError: true,
        response: { status: 401 },
      }),
    ).toBe(true);
    expect(
      isPortalResourceAccessError({
        isAxiosError: true,
        response: { status: 403 },
      }),
    ).toBe(true);
    expect(
      isPortalResourceAccessError({
        isAxiosError: true,
        response: { status: 404 },
      }),
    ).toBe(false);
    expect(
      getPortalResourceErrorStatus({
        isAxiosError: true,
        response: { status: 404 },
      }),
    ).toBe(404);
  });

  it("nao replica payload bruto ou PII na mensagem", () => {
    const result = normalizePortalResourceError({
      isAxiosError: true,
      response: {
        status: 401,
        data: {
          clienteId: "cliente-secreto",
          telefone: "83999999999",
        },
      },
    });

    expect(result.message).not.toContain("cliente-secreto");
    expect(result.message).not.toContain("83999999999");
  });
});
