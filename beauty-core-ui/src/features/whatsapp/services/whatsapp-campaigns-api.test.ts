import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

type ApiResponse = Promise<{
  data: unknown;
}>;

type ApiGet = (
  url: string,
  config?: unknown,
) => ApiResponse;

type ApiPost = (
  url: string,
  payload?: unknown,
) => ApiResponse;

type ApiPatch = (
  url: string,
  payload?: unknown,
) => ApiResponse;

const apiGet = vi.hoisted(
  () => vi.fn<ApiGet>(),
);

const apiPost = vi.hoisted(
  () => vi.fn<ApiPost>(),
);

const apiPatch = vi.hoisted(
  () => vi.fn<ApiPatch>(),
);

vi.mock(
  "@/services/api/api-client",
  () => ({
    getApiClient: () => ({
      get: apiGet,
      post: apiPost,
      patch: apiPatch,
    }),
  }),
);

import {
  cancelWhatsappCampaign,
  createWhatsappCampaign,
  getWhatsappCampaign,
  listWhatsappCampaigns,
  updateWhatsappCampaign,
} from "./whatsapp-api";

const campanha = {
  id: "campanha-1",
  empresaId: "empresa-interna",
  nome: "Campanha de retorno",
  descricao: "Clientes inativos",
  tipo: "CAMPANHA",
  mensagem: "Temos uma novidade.",
  status: "SIMULADA",
  totalDestinatarios: 10,
  totalEnviadas: 0,
  totalFalhas: 0,
  createdAt:
    "2026-08-30T20:00:00.000Z",
  updatedAt:
    "2026-08-30T20:00:00.000Z",
};

const payload = {
  nome: "Campanha de retorno",
  descricao: "Clientes inativos",
  tipo: "CAMPANHA" as const,
  mensagem: "Temos uma novidade.",
  totalDestinatarios: 10,
};

describe("Chat 54 — Campanhas WhatsApp API", () => {
  beforeEach(() => {
    apiGet.mockReset();
    apiPost.mockReset();
    apiPatch.mockReset();
  });

  it("lista pela rota real sem query inventada", async () => {
    apiGet.mockResolvedValue({
      data: [campanha],
    });

    const result =
      await listWhatsappCampaigns();

    expect(apiGet).toHaveBeenCalledWith(
      "/campanhas-whatsapp",
    );

    expect(result).toHaveLength(1);

    expect(
      result[0],
    ).not.toHaveProperty(
      "empresaId",
    );
  });

  it("busca detalhe pela rota real", async () => {
    apiGet.mockResolvedValue({
      data: campanha,
    });

    await getWhatsappCampaign(
      "campanha-1",
    );

    expect(apiGet).toHaveBeenCalledWith(
      "/campanhas-whatsapp/campanha-1",
    );
  });

  it("cria e valida processamento assíncrono", async () => {
    apiPost.mockResolvedValue({
      data: {
        campanha,
        processamento: "assincrono",
        jobId: "job-1",
        queue: "campanhas",
      },
    });

    const result =
      await createWhatsappCampaign(
        payload,
      );

    expect(apiPost).toHaveBeenCalledWith(
      "/campanhas-whatsapp",
      payload,
    );

    expect(result.processamento).toBe(
      "assincrono",
    );

    expect(result.jobId).toBe(
      "job-1",
    );
  });

  it("edita via PATCH /:id", async () => {
    apiPatch.mockResolvedValue({
      data: {
        ...campanha,
        nome: "Campanha atualizada",
      },
    });

    await updateWhatsappCampaign(
      "campanha-1",
      {
        nome: "Campanha atualizada",
      },
    );

    expect(apiPatch).toHaveBeenCalledWith(
      "/campanhas-whatsapp/campanha-1",
      {
        nome: "Campanha atualizada",
      },
    );
  });

  it("cancela pela rota administrativa real", async () => {
    apiPatch.mockResolvedValue({
      data: {
        ...campanha,
        status: "CANCELADA",
      },
    });

    const result =
      await cancelWhatsappCampaign(
        "campanha-1",
      );

    expect(apiPatch).toHaveBeenCalledWith(
      "/campanhas-whatsapp/campanha-1/cancelar",
    );

    expect(result.status).toBe(
      "CANCELADA",
    );

    expect(result).not.toHaveProperty(
      "empresaId",
    );
  });

  it("não possui envio/agendamento/retry de campanha", () => {
    expect(apiPost).not.toHaveBeenCalledWith(
      expect.stringMatching(
        /campanhas-whatsapp\/(enviar|agendar|retry|reprocess)/,
      ),
      expect.anything(),
    );
  });

  it("rejeita retorno de criação incompatível", async () => {
    apiPost.mockResolvedValue({
      data: {
        campanha,
      },
    });

    await expect(
      createWhatsappCampaign(
        payload,
      ),
    ).rejects.toThrow();
  });
});