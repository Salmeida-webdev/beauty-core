import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

const mocks = vi.hoisted(() => ({
  apiClient: {
    get: vi.fn(),
    patch: vi.fn(),
  },
}));

vi.mock("@/services/api/api-client", () => ({
  getApiClient: vi.fn(() => mocks.apiClient),
}));

import {
  getPortalDashboard,
  getPortalHistory,
  getPortalProfile,
  updatePortalProfile,
} from "./portal-client-api";

function profileResponse() {
  return {
    id: "cliente-secreto",
    empresaId: "empresa-secreta",
    nome: "Maria",
    telefone: "83999999999",
    email: "maria@example.com",
    foto: null,
    dataNascimento: "1995-08-20T00:00:00.000Z",
    dataCadastro: "2026-09-01T00:00:00.000Z",
    pontosAtuais: 120,
    nivelAtual: {
      id: "nivel-secreto",
      empresaId: "empresa-secreta",
      nome: "Bronze",
    },
    pacotesAtivos: [],
    quantidadeAgendamentos: 2,
    ultimoAcessoPortal: "2026-09-05T10:00:00.000Z",
    aceitouTermos: true,
    dataAceiteTermos: "2026-09-01T10:00:00.000Z",
    ativoPortal: true,
  };
}

function appointmentResponse() {
  return {
    id: "agendamento-secreto",
    empresaId: "empresa-secreta",
    clienteId: "cliente-secreto",
    unidadeId: "unidade-secreta",
    profissionalId: "profissional-secreto",
    servicoId: "servico-secreto",
    dataHoraInicio: "2026-09-06T14:00:00.000Z",
    dataHoraFim: "2026-09-06T15:00:00.000Z",
    status: "CONFIRMADO",
    observacoes: "nota interna",
    servico: {
      id: "servico-secreto",
      nome: "Corte",
      preco: "99.00",
    },
    profissional: {
      id: "profissional-secreto",
      nome: "Ana",
      foto: null,
      email: "ana@example.com",
    },
    unidade: {
      id: "unidade-secreto",
      nome: "Centro",
      endereco: "Endereco interno",
    },
  };
}

describe("portalClientApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("consulta perfil pela rota canonica e retorna somente a allowlist publica", async () => {
    mocks.apiClient.get.mockResolvedValueOnce({
      data: profileResponse(),
    });

    const result = await getPortalProfile();

    expect(mocks.apiClient.get).toHaveBeenCalledWith(
      "/area-cliente/me/perfil",
    );
    expect(result).toEqual({
      nome: "Maria",
      telefone: "83999999999",
      email: "maria@example.com",
      foto: null,
      dataNascimento: "1995-08-20",
    });
    expect(JSON.stringify(result)).not.toContain("empresaId");
    expect(JSON.stringify(result)).not.toContain("ultimoAcessoPortal");
  });

  it("consulta dashboard sem query e remove subobjetos fora da allowlist", async () => {
    mocks.apiClient.get.mockResolvedValueOnce({
      data: {
        perfil: profileResponse(),
        agendamentos: {
          proximos: [appointmentResponse()],
          ultimo: null,
        },
        fidelidade: {
          empresaId: "empresa-secreta",
          saldoPontos: 999,
        },
        pacotes: {
          ativos: [{ empresaId: "empresa-secreta" }],
        },
        beneficios: [{ empresaId: "empresa-secreta" }],
        notificacoes: {
          naoLidas: [{ mensagem: "privada" }],
          totalNaoLidas: 1,
        },
      },
    });

    const result = await getPortalDashboard();

    expect(mocks.apiClient.get).toHaveBeenCalledWith(
      "/area-cliente/me/dashboard",
    );
    expect(result).toEqual({
      perfil: {
        nome: "Maria",
        telefone: "83999999999",
        email: "maria@example.com",
        foto: null,
        dataNascimento: "1995-08-20",
      },
      agendamentos: {
        proximos: [
          {
            dataHoraInicio: "2026-09-06T14:00:00.000Z",
            dataHoraFim: "2026-09-06T15:00:00.000Z",
            status: "CONFIRMADO",
            servicoNome: "Corte",
            profissionalNome: "Ana",
            profissionalFoto: null,
            unidadeNome: "Centro",
          },
        ],
        ultimo: null,
      },
    });
    expect(JSON.stringify(result)).not.toContain("empresaId");
    expect(JSON.stringify(result)).not.toContain("preco");
  });

  it("consulta historico sem query e descarta dados crus e descricao interna", async () => {
    mocks.apiClient.get.mockResolvedValueOnce({
      data: [
        {
          tipo: "AGENDAMENTO",
          data: "2026-09-04T14:00:00.000Z",
          titulo: "Corte",
          descricao: "observacao interna",
          status: "CONCLUIDO",
          dados: {
            id: "agendamento-secreto",
            clienteId: "cliente-secreto",
          },
        },
        {
          tipo: "NOTIFICACAO",
          data: "2026-09-03T10:00:00.000Z",
          titulo: "Aviso",
          descricao: "mensagem privada",
          status: "NAO_LIDA",
          dados: {
            empresaId: "empresa-secreta",
          },
        },
      ],
    });

    const result = await getPortalHistory();

    expect(mocks.apiClient.get).toHaveBeenCalledWith(
      "/area-cliente/me/historico",
    );
    expect(result).toEqual([
      {
        tipo: "AGENDAMENTO",
        data: "2026-09-04T14:00:00.000Z",
        titulo: "Corte",
        status: "CONCLUIDO",
      },
      {
        tipo: "NOTIFICACAO",
        data: "2026-09-03T10:00:00.000Z",
        titulo: "Aviso",
        status: "NAO_LIDA",
      },
    ]);
    expect(JSON.stringify(result)).not.toContain("cliente-secreto");
    expect(JSON.stringify(result)).not.toContain("mensagem privada");
  });

  it("atualiza apenas campos permitidos e normaliza o email", async () => {
    mocks.apiClient.patch.mockResolvedValueOnce({
      data: profileResponse(),
    });

    await updatePortalProfile({
      nome: " Maria ",
      email: " MARIA@EXAMPLE.COM ",
    });

    expect(mocks.apiClient.patch).toHaveBeenCalledWith(
      "/area-cliente/me/perfil",
      {
        nome: "Maria",
        email: "maria@example.com",
      },
    );
    expect(
      JSON.stringify(mocks.apiClient.patch.mock.calls[0][1]),
    ).not.toContain("foto");
    expect(
      JSON.stringify(mocks.apiClient.patch.mock.calls[0][1]),
    ).not.toContain("empresaId");
  });

  it("recusa payload vazio e campos nao pertencentes ao DTO", async () => {
    await expect(
      updatePortalProfile({}),
    ).rejects.toThrow();

    await expect(
      updatePortalProfile({
        foto: "/arbitrary-url.png",
      } as never),
    ).rejects.toThrow();

    expect(mocks.apiClient.patch).not.toHaveBeenCalled();
  });

  it("falha com resposta de perfil que nao atende ao contrato", async () => {
    mocks.apiClient.get.mockResolvedValueOnce({
      data: {
        nome: "Maria",
      },
    });

    await expect(
      getPortalProfile(),
    ).rejects.toThrow();
  });
});
