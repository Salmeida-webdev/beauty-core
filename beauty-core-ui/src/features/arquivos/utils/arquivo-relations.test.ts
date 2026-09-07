import { describe, expect, it } from "vitest";

import type { Arquivo } from "@/features/arquivos/types/arquivos.types";
import { getArquivoRelations } from "@/features/arquivos/utils/arquivo-relations";

const baseArquivo: Arquivo = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  empresaId: "550e8400-e29b-41d4-a716-446655440001",
  tipo: "DOCUMENTO",
  nomeOriginal: "contrato.pdf",
  nomeArquivo: "uuid.pdf",
  mimeType: "application/pdf",
  tamanhoBytes: 100,
  status: "ATIVO",
  visibilidade: "PUBLICO",
};

describe("arquivo relations", () => {
  it("retorna apenas relacoes existentes", () => {
    expect(
      getArquivoRelations({
        ...baseArquivo,
        clienteId: "550e8400-e29b-41d4-a716-446655440002",
        servicoId: "550e8400-e29b-41d4-a716-446655440003",
      }),
    ).toEqual([
      {
        key: "cliente",
        label: "Cliente relacionado",
        id: "550e8400-e29b-41d4-a716-446655440002",
      },
      {
        key: "servico",
        label: "Serviço relacionado",
        id: "550e8400-e29b-41d4-a716-446655440003",
      },
    ]);
  });

  it("nao inventa relacoes ausentes", () => {
    expect(getArquivoRelations(baseArquivo)).toEqual([]);
  });
});
