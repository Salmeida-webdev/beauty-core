import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  getClienteFidelidadeBeneficio,
  getClienteFidelidadeHistorico,
  getClienteFidelidadeNivel,
  getClienteFidelidadeSaldo,
  getClientePacotes,
} from "@/features/clientes/services/cliente-profile-extras-api";

type ApiResponse = Promise<{
  data: unknown;
}>;

type ApiGet = (
  url: string,
) => ApiResponse;

const apiGet = vi.hoisted(
  () => vi.fn<ApiGet>(),
);

vi.mock(
  "@/services/api/api-client",
  () => ({
    getApiClient: () => ({
      get: apiGet,
    }),
  }),
);

const clienteId =
  "550e8400-e29b-41d4-a716-446655440000";

beforeEach(() => {
  apiGet.mockReset();
});

describe(
  "cliente profile extras api",
  () => {
    it(
      "consulta saldo pelo endpoint real",
      async () => {
        apiGet.mockResolvedValue({
          data: {
            clienteId,
            saldoPontos: 250,
          },
        });

        await getClienteFidelidadeSaldo(
          clienteId,
        );

        expect(
          apiGet,
        ).toHaveBeenCalledWith(
          `/fidelidade/cliente/${clienteId}`,
        );
      },
    );

    it(
      "consulta historico pelo endpoint real",
      async () => {
        apiGet.mockResolvedValue({
          data: [],
        });

        await getClienteFidelidadeHistorico(
          clienteId,
        );

        expect(
          apiGet,
        ).toHaveBeenCalledWith(
          `/fidelidade/historico/${clienteId}`,
        );
      },
    );

    it(
      "consulta beneficio pelo endpoint real",
      async () => {
        apiGet.mockResolvedValue({
          data: {
            clienteId,
            saldoPontos: 250,
            pontosParaResgate:
              100,
            valorPorResgate: 10,
            quantidadeResgates: 2,
            valorDisponivel: 20,
          },
        });

        await getClienteFidelidadeBeneficio(
          clienteId,
        );

        expect(
          apiGet,
        ).toHaveBeenCalledWith(
          `/fidelidade/beneficio-disponivel/${clienteId}`,
        );
      },
    );

    it(
      "consulta nivel pelo endpoint real",
      async () => {
        apiGet.mockResolvedValue({
          data: {
            clienteId,
            saldoPontos: 250,
            nivelAtual: null,
          },
        });

        await getClienteFidelidadeNivel(
          clienteId,
        );

        expect(
          apiGet,
        ).toHaveBeenCalledWith(
          `/fidelidade/nivel-atual/${clienteId}`,
        );
      },
    );

    it(
      "consulta somente pacotes do cliente",
      async () => {
        apiGet.mockResolvedValue({
          data: [],
        });

        await getClientePacotes(
          clienteId,
        );

        expect(
          apiGet,
        ).toHaveBeenCalledWith(
          `/clientes-pacotes/cliente/${clienteId}`,
        );
      },
    );

    it(
      "nunca envia empresaId",
      async () => {
        apiGet.mockResolvedValue({
          data: [],
        });

        await getClientePacotes(
          clienteId,
        );

        const calledUrl =
          apiGet.mock.calls[0]?.[0];

        expect(
          calledUrl,
        ).not.toContain(
          "empresaId",
        );
      },
    );
  },
);
