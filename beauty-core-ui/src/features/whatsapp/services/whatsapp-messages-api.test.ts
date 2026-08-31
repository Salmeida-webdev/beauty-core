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

const apiGet = vi.hoisted(
  () => vi.fn<ApiGet>(),
);

const apiPost = vi.hoisted(
  () => vi.fn<ApiPost>(),
);

const apiPatch = vi.hoisted(
  () => vi.fn(),
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
  createWhatsappMessage,
  getWhatsappMessage,
  listWhatsappMessages,
  sendWhatsappMessage,
} from "./whatsapp-api";

const mensagem = {
  id: "mensagem-1",
  empresaId: "empresa-interna",
  clienteId: null,
  usuarioId: null,
  templateId: null,
  tipo: "SISTEMA",
  destinatario: "83999999999",
  mensagem: "Mensagem de teste",
  status: "PENDENTE",
  erro: null,
  dataEnvio: null,
  createdAt:
    "2026-08-30T20:00:00.000Z",
  updatedAt:
    "2026-08-30T20:00:00.000Z",
  cliente: null,
  usuario: null,
  template: null,
};

describe("Chat 54 — Mensagens WhatsApp API", () => {
  beforeEach(() => {
    apiGet.mockReset();
    apiPost.mockReset();
    apiPatch.mockReset();
  });

  it("lista com PaginationDto público", async () => {
    apiGet.mockResolvedValue({
      data: {
        data: [mensagem],
        meta: {
          page: 1,
          limit: 20,
          total: 1,
          totalPages: 1,
        },
      },
    });

    await listWhatsappMessages({
      page: 1,
      limit: 20,
      search: "cliente",
      orderBy: "createdAt",
      orderDirection: "desc",
    });

    expect(apiGet).toHaveBeenCalledWith(
      "/mensagens-whatsapp",
      {
        params: {
          page: 1,
          limit: 20,
          search: "cliente",
          orderBy: "createdAt",
          orderDirection: "desc",
        },
      },
    );
  });

  it("busca detalhe e remove empresaId", async () => {
    apiGet.mockResolvedValue({
      data: {
        ...mensagem,
        metadata: {
          origem: "INTERNA",
        },
      },
    });

    const result =
      await getWhatsappMessage(
        "mensagem-1",
      );

    expect(apiGet).toHaveBeenCalledWith(
      "/mensagens-whatsapp/mensagem-1",
    );

    expect(result).not.toHaveProperty(
      "empresaId",
    );

    expect(result).not.toHaveProperty(
      "metadata",
    );
  });

  it("registra mensagem sem empresaId", async () => {
    apiPost.mockResolvedValue({
      data: mensagem,
    });

    const payload = {
      tipo: "SISTEMA" as const,
      destinatario: "83999999999",
      mensagem: "Mensagem de teste",
    };

    await createWhatsappMessage(
      payload,
    );

    expect(apiPost).toHaveBeenCalledWith(
      "/mensagens-whatsapp",
      payload,
    );

    expect(payload).not.toHaveProperty(
      "empresaId",
    );
  });

  it("envia pela rota assíncrona real", async () => {
    apiPost.mockResolvedValue({
      data: {
        processado: true,
        processamento: "assincrono",
        whatsappGerado: true,
        mensagemId: "mensagem-1",
        jobId: "job-1",
        queue: "whatsapp",
      },
    });

    const result =
      await sendWhatsappMessage({
        tipo: "SISTEMA",
        destinatario: "83999999999",
        mensagem: "Mensagem de teste",
      });

    expect(apiPost).toHaveBeenCalledWith(
      "/mensagens-whatsapp/enviar",
      {
        tipo: "SISTEMA",
        destinatario: "83999999999",
        mensagem: "Mensagem de teste",
      },
    );

    expect(result).toEqual({
      processado: true,
      processamento: "assincrono",
      whatsappGerado: true,
      mensagemId: "mensagem-1",
      jobId: "job-1",
      queue: "whatsapp",
    });
  });

  it("não chama PATCH de cancelamento", () => {
    expect(apiPatch).not.toHaveBeenCalled();
  });

  it("rejeita retorno assíncrono incompatível", async () => {
    apiPost.mockResolvedValue({
      data: {
        processado: true,
      },
    });

    await expect(
      sendWhatsappMessage({
        tipo: "SISTEMA",
        destinatario: "83999999999",
        mensagem: "Mensagem de teste",
      }),
    ).rejects.toThrow();
  });
});