import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  anonimizarCliente,
  exportarClienteDados,
} from "@/features/clientes/services/clientes-lgpd-api";

type ApiResponse = Promise<{
  data: unknown;
}>;

type ApiRequest = (
  url: string,
) => ApiResponse;

const apiGet = vi.hoisted(
  () => vi.fn<ApiRequest>(),
);

const apiPost = vi.hoisted(
  () => vi.fn<ApiRequest>(),
);

vi.mock(
  "@/services/api/api-client",
  () => ({
    getApiClient: () => ({
      get: apiGet,
      post: apiPost,
    }),
  }),
);

const clienteId =
  "550e8400-e29b-41d4-a716-446655440000";

const empresaId =
  "550e8400-e29b-41d4-a716-446655440001";

const exportPayload = {
  exportadoEm:
    "2026-08-28T12:00:00.000Z",
  clienteId,
  empresaId,
  perfil: {
    id: clienteId,
    nome: "Maria Silva",
  },
  agendamentos: [],
  pontos: {},
  pacotes: {},
  notificacoes: [],
  mensagensWhatsApp: [],
  financeiro: [],
  arquivos: [],
  sessoes: [],
};

const anonymizationPayload = {
  success: true,
  clienteId,
  empresaId,
  anonimizadoEm:
    "2026-08-28T12:05:00.000Z",
  camposAnonimizados: [
    "nome",
    "telefone",
    "email",
  ],
  observacao:
    "Movimentacoes financeiras e auditoria historica foram preservadas.",
};

beforeEach(() => {
  apiGet.mockReset();
  apiPost.mockReset();

  apiGet.mockResolvedValue({
    data: exportPayload,
  });

  apiPost.mockResolvedValue({
    data: anonymizationPayload,
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe(
  "clientes-lgpd-api",
  () => {
    it(
      "exporta dados pelo endpoint LGPD real",
      async () => {
        const result =
          await exportarClienteDados(
            clienteId,
          );

        expect(
          apiGet,
        ).toHaveBeenCalledWith(
          `/lgpd/exportar-cliente/${clienteId}`,
        );

        expect(result).toEqual(
          exportPayload,
        );
      },
    );

    it(
      "anonimiza pelo endpoint LGPD real sem body",
      async () => {
        const result =
          await anonimizarCliente(
            clienteId,
          );

        expect(
          apiPost,
        ).toHaveBeenCalledWith(
          `/lgpd/anonimizar-cliente/${clienteId}`,
        );

        expect(result).toEqual(
          anonymizationPayload,
        );
      },
    );
  },
);
