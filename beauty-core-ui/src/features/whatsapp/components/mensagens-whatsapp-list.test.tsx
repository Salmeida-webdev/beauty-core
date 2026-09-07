import {
  cleanup,
  render,
  screen,
} from "@testing-library/react";
import {
  afterEach,
  describe,
  expect,
  it,
} from "vitest";

import {
  MensagensWhatsappList,
} from "./mensagens-whatsapp-list";

const mensagem = {
  id: "mensagem-1",
  clienteId: null,
  usuarioId: null,
  templateId: null,
  tipo: "SISTEMA" as const,
  destinatario: "83999999999",
  mensagem: "Mensagem operacional",
  status: "PENDENTE" as const,
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

afterEach(() => {
  cleanup();
});

describe("Chat 54 — MensagensWhatsappList", () => {
  it("mascara o destinatário", () => {
    render(
      <MensagensWhatsappList
        mensagens={[mensagem]}
      />,
    );

    expect(
      screen.getByText("••••••9999"),
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        "83999999999",
      ),
    ).not.toBeInTheDocument();
  });

  it("exibe status por texto", () => {
    render(
      <MensagensWhatsappList
        mensagens={[mensagem]}
      />,
    );

    expect(
      screen.getByText("Pendente"),
    ).toBeInTheDocument();
  });

  it("exibe mensagem autorizada no histórico", () => {
    render(
      <MensagensWhatsappList
        mensagens={[mensagem]}
      />,
    );

    expect(
      screen.getByText(
        "Mensagem operacional",
      ),
    ).toBeInTheDocument();
  });

  it("renderiza empty state", () => {
    render(
      <MensagensWhatsappList
        mensagens={[]}
      />,
    );

    expect(
      screen.getByText(
        "Nenhuma mensagem encontrada",
      ),
    ).toBeInTheDocument();
  });
});