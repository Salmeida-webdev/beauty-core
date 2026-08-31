import {
  describe,
  expect,
  it,
} from "vitest";

import {
  campanhaWhatsappCreateResultSchema,
  campanhaWhatsappFormSchema,
  campanhaWhatsappResumoSchema,
} from "./whatsapp.schemas";

const campanha = {
  id: "campanha-1",
  empresaId: "empresa-interna",
  nome: "Campanha de retorno",
  descricao: "Clientes inativos",
  tipo: "CAMPANHA",
  mensagem: "Temos uma novidade para você.",
  status: "PENDENTE",
  totalDestinatarios: 10,
  totalEnviadas: 0,
  totalFalhas: 0,
  createdAt:
    "2026-08-30T20:00:00.000Z",
  updatedAt:
    "2026-08-30T20:00:00.000Z",
};

describe("Chat 54 — Campanhas WhatsApp schemas", () => {
  it("valida campanha e remove empresaId", () => {
    const parsed =
      campanhaWhatsappResumoSchema.parse(
        campanha,
      );

    expect(parsed.id).toBe(
      "campanha-1",
    );

    expect(parsed.status).toBe(
      "PENDENTE",
    );

    expect(parsed).not.toHaveProperty(
      "empresaId",
    );
  });

  it("aceita payload real de criação", () => {
    const result =
      campanhaWhatsappFormSchema.safeParse({
        nome: "Campanha de retorno",
        descricao: "Clientes inativos",
        tipo: "CAMPANHA",
        mensagem: "Mensagem",
        totalDestinatarios: 10,
      });

    expect(result.success).toBe(true);
  });

  it("rejeita empresaId no payload", () => {
    const result =
      campanhaWhatsappFormSchema.safeParse({
        nome: "Campanha",
        descricao: "",
        tipo: "CAMPANHA",
        mensagem: "Mensagem",
        totalDestinatarios: 0,
        empresaId: "empresa-arbitraria",
      });

    expect(result.success).toBe(false);
  });

  it("rejeita status e contadores autoritativos", () => {
    const result =
      campanhaWhatsappFormSchema.safeParse({
        nome: "Campanha",
        descricao: "",
        tipo: "CAMPANHA",
        mensagem: "Mensagem",
        totalDestinatarios: 0,
        status: "ENVIADA",
        totalEnviadas: 50,
      });

    expect(result.success).toBe(false);
  });

  it("valida retorno assíncrono real da criação", () => {
    const parsed =
      campanhaWhatsappCreateResultSchema.parse({
        campanha,
        processamento: "assincrono",
        jobId: "job-1",
        queue: "campanhas",
      });

    expect(parsed.processamento).toBe(
      "assincrono",
    );

    expect(parsed.jobId).toBe(
      "job-1",
    );

    expect(
      parsed.campanha,
    ).not.toHaveProperty(
      "empresaId",
    );
  });
});