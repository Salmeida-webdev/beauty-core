import {
  describe,
  expect,
  it,
} from "vitest";

import {
  buildDistributionRanking,
  formatDistributionLabel,
} from "@/features/dashboard/utils/dashboard-distributions";

describe("dashboard distributions", () => {
  it("ordena e limita distribuições reais", () => {
    expect(
      buildDistributionRanking(
        {
          TIPO_C: 2,
          TIPO_A: 10,
          TIPO_B: 5,
        },
        2,
      ),
    ).toEqual([
      {
        label: "Tipo A",
        total: 10,
      },
      {
        label: "Tipo B",
        total: 5,
      },
    ]);
  });

  it("formata apenas a apresentação do identificador", () => {
    expect(
      formatDistributionLabel(
        "AGENDAMENTO_CONCLUIDO",
      ),
    ).toBe(
      "Agendamento Concluido",
    );
  });
});
