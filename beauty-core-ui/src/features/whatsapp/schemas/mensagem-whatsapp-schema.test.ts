import {
  describe,
  expect,
  it,
} from "vitest";

import {
  whatsappMensagemSchema,
  whatsappMensagemSendFormSchema,
  whatsappMessagesListParamsSchema,
  whatsappMessagesListResponseSchema,
  whatsappSendResultSchema,
} from "./whatsapp.schemas";

describe("Chat 54 — Mensagens WhatsApp schemas", () => {
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
    metadata: {
      origem: "INTERNA",
    },
    createdAt:
      "2026-08-30T20:00:00.000Z",
    updatedAt:
      "2026-08-30T20:00:00.000Z",
    cliente: null,
    usuario: null,
    template: null,
  };

  it("remove empresaId e metadata da resposta", () => {
    const parsed =
      whatsappMensagemSchema.parse(
        mensagem,
      );

    expect(parsed).not.toHaveProperty(
      "empresaId",
    );

    expect(parsed).not.toHaveProperty(
      "metadata",
    );
  });

  it("não aceita empresaId no envio manual", () => {
    const result =
      whatsappMensagemSendFormSchema.safeParse({
        tipo: "SISTEMA",
        destinatario: "83999999999",
        mensagem: "Teste",
        empresaId: "empresa-arbitraria",
      });

    expect(result.success).toBe(false);
  });

  it("valida paginação pública", () => {
    const parsed =
      whatsappMessagesListParamsSchema.parse(
        {},
      );

    expect(parsed).toEqual({
      page: 1,
      limit: 20,
      orderBy: "createdAt",
      orderDirection: "desc",
    });
  });

  it("não aceita filtro extra não declarado no DTO público", () => {
    const result =
      whatsappMessagesListParamsSchema.safeParse({
        page: 1,
        status: "PENDENTE",
      });

    expect(result.success).toBe(false);
  });

  it("valida resposta paginada", () => {
    const parsed =
      whatsappMessagesListResponseSchema.parse({
        data: [mensagem],
        meta: {
          page: 1,
          limit: 20,
          total: 1,
          totalPages: 1,
        },
      });

    expect(parsed.data).toHaveLength(1);
  });

  it("valida retorno assíncrono do envio", () => {
    const parsed =
      whatsappSendResultSchema.parse({
        processado: true,
        processamento: "assincrono",
        whatsappGerado: true,
        mensagemId: "mensagem-1",
        jobId: "job-1",
        queue: "whatsapp",
      });

    expect(parsed.jobId).toBe("job-1");
  });
});