import { beforeEach, describe, expect, it, vi } from "vitest";

import { getApiClient } from "@/services/api/api-client";

import {
  getPortalWhatsappMessages,
  PORTAL_MESSAGES_ENDPOINTS,
} from "./portal-messages-api";

vi.mock("@/services/api/api-client", () => ({
  getApiClient: vi.fn(),
}));

describe("portal-messages-api", () => {
  const getMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(getApiClient).mockReturnValue({
      get: getMock,
    } as never);
  });

  it("consulta somente o endpoint read-only do Portal", async () => {
    getMock.mockResolvedValue({
      data: {
        data: [
          {
            id: "message-1",
            clienteId: "client-1",
            usuarioId: null,
            templateId: null,
            tipo: "SISTEMA",
            destinatario: "5511999999999",
            mensagem: "Mensagem de teste",
            status: "ENVIADA",
            erro: null,
            dataEnvio: "2026-09-06T00:00:00.000Z",
            createdAt: "2026-09-06T00:00:00.000Z",
            updatedAt: "2026-09-06T00:00:00.000Z",
          },
        ],
        page: 1,
        limit: 20,
        total: 1,
        orderBy: "createdAt",
        orderDirection: "desc",
      },
    });

    const result = await getPortalWhatsappMessages({
      page: 1,
      limit: 20,
    });

    expect(getMock).toHaveBeenCalledWith(
      PORTAL_MESSAGES_ENDPOINTS.list,
      {
        params: {
          page: 1,
          limit: 20,
        },
      },
    );

    expect(result.data).toHaveLength(1);
    expect(result.total).toBe(1);
  });

  it("rejeita paginação inválida", async () => {
    await expect(
      getPortalWhatsappMessages({
        page: 0,
        limit: 20,
      }),
    ).rejects.toThrow();

    expect(getMock).not.toHaveBeenCalled();
  });
});
