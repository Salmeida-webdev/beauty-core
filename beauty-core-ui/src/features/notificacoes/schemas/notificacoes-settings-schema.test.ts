import {
  describe,
  expect,
  it,
} from "vitest";

import {
  configuracaoNotificacaoFormSchema,
  configuracaoNotificacaoSchema,
} from "./notificacoes.schemas";

const configuracao = {
  id: "config-1",
  empresaId: "empresa-interna",
  notificarAgendamentos: true,
  notificarFinanceiro: true,
  notificarFidelidade: true,
  notificarPacotes: true,
  notificarClientes: true,
  notificarMarketing: false,
  createdAt:
    "2026-08-30T20:00:00.000Z",
  updatedAt:
    "2026-08-30T20:00:00.000Z",
};

describe("Chat 54 — configurações de notificações", () => {
  it("valida os seis campos reais", () => {
    const parsed =
      configuracaoNotificacaoSchema.parse(
        configuracao,
      );

    expect(
      parsed.notificarAgendamentos,
    ).toBe(true);

    expect(
      parsed.notificarMarketing,
    ).toBe(false);
  });

  it("remove empresaId e metadados não usados", () => {
    const parsed =
      configuracaoNotificacaoSchema.parse(
        configuracao,
      );

    expect(parsed).not.toHaveProperty(
      "empresaId",
    );

    expect(parsed).not.toHaveProperty(
      "createdAt",
    );

    expect(parsed).not.toHaveProperty(
      "updatedAt",
    );
  });

  it("aceita formulário completo", () => {
    const result =
      configuracaoNotificacaoFormSchema.safeParse({
        notificarAgendamentos: true,
        notificarFinanceiro: true,
        notificarFidelidade: true,
        notificarPacotes: true,
        notificarClientes: true,
        notificarMarketing: false,
      });

    expect(result.success).toBe(true);
  });

  it("rejeita campos fictícios do Swagger antigo", () => {
    const result =
      configuracaoNotificacaoFormSchema.safeParse({
        notificarAgendamentos: true,
        notificarFinanceiro: true,
        notificarFidelidade: true,
        notificarPacotes: true,
        notificarClientes: true,
        notificarMarketing: false,
        notificacoesAtivas: true,
      });

    expect(result.success).toBe(false);
  });

  it("rejeita empresaId no payload", () => {
    const result =
      configuracaoNotificacaoFormSchema.safeParse({
        notificarAgendamentos: true,
        notificarFinanceiro: true,
        notificarFidelidade: true,
        notificarPacotes: true,
        notificarClientes: true,
        notificarMarketing: false,
        empresaId: "empresa-arbitraria",
      });

    expect(result.success).toBe(false);
  });
});