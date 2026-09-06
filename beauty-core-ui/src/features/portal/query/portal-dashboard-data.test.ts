import { describe, expect, it } from "vitest";

import type { PortalDashboard } from "../contracts/portal-client-contracts";
import {
  isPortalDashboardEmpty,
  mapPortalDashboardToViewModel,
} from "./portal-dashboard-data";

const dashboard: PortalDashboard = {
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
};

describe("portal dashboard data mapping", () => {
  it("projects only the safe dashboard view model", () => {
    const result = mapPortalDashboardToViewModel(dashboard);

    expect(result).toEqual({
      nome: "Maria",
      foto: null,
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
    });

    expect(JSON.stringify(result)).not.toContain("empresaId");
    expect(JSON.stringify(result)).not.toContain("preco");
    expect(JSON.stringify(result)).not.toContain("observacoes");
  });

  it("classifica dashboard sem atendimentos como vazio", () => {
    const empty = mapPortalDashboardToViewModel({
      ...dashboard,
      agendamentos: {
        proximos: [],
        ultimo: null,
      },
    });

    expect(isPortalDashboardEmpty(empty)).toBe(true);
    expect(isPortalDashboardEmpty(mapPortalDashboardToViewModel(dashboard))).toBe(false);
  });
});