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
  createTemplateWhatsapp,
  getTemplateWhatsapp,
  inactivateTemplateWhatsapp,
  listTemplatesWhatsapp,
  updateTemplateWhatsapp,
} from "./whatsapp-api";

const template = {
  id: "template-1",
  empresaId: "empresa-interna",
  nome: "Lembrete",
  tipo: "LEMBRETE_AGENDAMENTO",
  titulo: "Lembrete de atendimento",
  mensagem:
    "Seu atendimento está próximo.",
  ativo: true,
  createdAt:
    "2026-08-30T20:00:00.000Z",
  updatedAt:
    "2026-08-30T20:00:00.000Z",
};

const payload = {
  nome: "Lembrete",
  tipo:
    "LEMBRETE_AGENDAMENTO" as const,
  titulo: "Lembrete de atendimento",
  mensagem:
    "Seu atendimento está próximo.",
};

describe("Chat 54 — Templates WhatsApp API", () => {
  beforeEach(() => {
    apiGet.mockReset();
    apiPost.mockReset();
    apiPatch.mockReset();
  });

  it("lista pela rota real", async () => {
    apiGet.mockResolvedValue({
      data: [template],
    });

    const result =
      await listTemplatesWhatsapp();

    expect(apiGet).toHaveBeenCalledWith(
      "/templates-whatsapp",
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
      data: template,
    });

    await getTemplateWhatsapp(
      "template-1",
    );

    expect(apiGet).toHaveBeenCalledWith(
      "/templates-whatsapp/template-1",
    );
  });

  it("cria sem empresaId e sem ativo", async () => {
    apiPost.mockResolvedValue({
      data: template,
    });

    await createTemplateWhatsapp(
      payload,
    );

    expect(apiPost).toHaveBeenCalledWith(
      "/templates-whatsapp",
      payload,
    );

    expect(payload).not.toHaveProperty(
      "empresaId",
    );

    expect(payload).not.toHaveProperty(
      "ativo",
    );
  });

  it("atualiza via PATCH /:id", async () => {
    apiPatch.mockResolvedValue({
      data: template,
    });

    await updateTemplateWhatsapp(
      "template-1",
      payload,
    );

    expect(apiPatch).toHaveBeenCalledWith(
      "/templates-whatsapp/template-1",
      payload,
    );
  });

  it("inativa via PATCH /:id/inativar", async () => {
    apiPatch.mockResolvedValue({
      data: {
        ...template,
        ativo: false,
      },
    });

    const result =
      await inactivateTemplateWhatsapp(
        "template-1",
      );

    expect(apiPatch).toHaveBeenCalledWith(
      "/templates-whatsapp/template-1/inativar",
    );

    expect(result.ativo).toBe(false);
  });

  it("rejeita resposta incompatível", async () => {
    apiGet.mockResolvedValue({
      data: {
        id: "incompleto",
      },
    });

    await expect(
      getTemplateWhatsapp(
        "incompleto",
      ),
    ).rejects.toThrow();
  });
});