import { describe, expect, it } from "vitest";

import {
  configuracaoFidelidadeFormSchema,
  emptyConfiguracaoFidelidadeFormValues,
  toConfiguracaoFidelidadePayload,
} from "./configuracao-fidelidade-form.schema";

describe("configuracao fidelidade form", () => {
  it("não inventa defaults no cadastro", () => {
    const values = emptyConfiguracaoFidelidadeFormValues();

    expect(values).toEqual({
      fidelidadeAtiva: "",
      pontuacaoAutomatica: "",
      reaisPorPonto: "",
      niveisAtivos: "",
      beneficiosAutomaticos: "",
      bonusAniversarioAtivo: "",
      bonusAniversarioPontos: "",
    });

    expect(
      configuracaoFidelidadeFormSchema.safeParse(values).success,
    ).toBe(false);
  });

  it("gera payload explícito sem empresaId", () => {
    const parsed = configuracaoFidelidadeFormSchema.parse({
      fidelidadeAtiva: "true",
      pontuacaoAutomatica: "false",
      reaisPorPonto: "0.1",
      niveisAtivos: "true",
      beneficiosAutomaticos: "false",
      bonusAniversarioAtivo: "true",
      bonusAniversarioPontos: "",
      empresaId: "nao-enviar",
    });

    expect(
      toConfiguracaoFidelidadePayload(parsed),
    ).toEqual({
      fidelidadeAtiva: true,
      pontuacaoAutomatica: false,
      reaisPorPonto: 0.1,
      niveisAtivos: true,
      beneficiosAutomaticos: false,
      bonusAniversarioAtivo: true,
    });
  });

  it("inclui o bônus somente quando informado", () => {
    const parsed = configuracaoFidelidadeFormSchema.parse({
      fidelidadeAtiva: "true",
      pontuacaoAutomatica: "false",
      reaisPorPonto: "1",
      niveisAtivos: "false",
      beneficiosAutomaticos: "false",
      bonusAniversarioAtivo: "true",
      bonusAniversarioPontos: "25",
    });

    expect(
      toConfiguracaoFidelidadePayload(parsed),
    ).toHaveProperty("bonusAniversarioPontos", 25);
  });
});
