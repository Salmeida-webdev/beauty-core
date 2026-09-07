import {
  describe,
  expect,
  it,
} from "vitest";

import {
  templateWhatsappFormSchema,
  templateWhatsappSchema,
} from "./whatsapp.schemas";

describe("Chat 54 — Template WhatsApp schema", () => {
  const response = {
    id: "template-1",
    empresaId: "empresa-interna",
    nome: "Lembrete de Agendamento",
    tipo: "LEMBRETE_AGENDAMENTO",
    titulo: "Lembrete",
    mensagem:
      "Seu atendimento está próximo.",
    ativo: true,
    createdAt:
      "2026-08-30T20:00:00.000Z",
    updatedAt:
      "2026-08-30T20:00:00.000Z",
  };

  it("valida resposta e remove empresaId", () => {
    const parsed =
      templateWhatsappSchema.parse(
        response,
      );

    expect(parsed.id).toBe(
      "template-1",
    );

    expect(parsed.titulo).toBe(
      "Lembrete",
    );

    expect(parsed).not.toHaveProperty(
      "empresaId",
    );
  });

  it("aceita os campos reais do Create DTO", () => {
    const result =
      templateWhatsappFormSchema.safeParse({
        nome: "Lembrete de Agendamento",
        tipo: "LEMBRETE_AGENDAMENTO",
        titulo: "Lembrete",
        mensagem:
          "Seu atendimento está próximo.",
      });

    expect(result.success).toBe(true);
  });

  it("rejeita ativo no payload", () => {
    const result =
      templateWhatsappFormSchema.safeParse({
        nome: "Lembrete",
        tipo: "LEMBRETE_AGENDAMENTO",
        titulo: "Lembrete",
        mensagem: "Mensagem",
        ativo: false,
      });

    expect(result.success).toBe(false);
  });

  it("rejeita empresaId arbitrário", () => {
    const result =
      templateWhatsappFormSchema.safeParse({
        nome: "Lembrete",
        tipo: "LEMBRETE_AGENDAMENTO",
        titulo: "Lembrete",
        mensagem: "Mensagem",
        empresaId: "empresa-arbitraria",
      });

    expect(result.success).toBe(false);
  });

  it("respeita limites mínimos reais", () => {
    expect(
      templateWhatsappFormSchema.safeParse({
        nome: "A",
        tipo: "LEMBRETE_AGENDAMENTO",
        titulo: "Título",
        mensagem: "Mensagem",
      }).success,
    ).toBe(false);

    expect(
      templateWhatsappFormSchema.safeParse({
        nome: "Template",
        tipo: "LEMBRETE_AGENDAMENTO",
        titulo: "A",
        mensagem: "Mensagem",
      }).success,
    ).toBe(false);
  });
});