import type { Arquivo } from "@/features/arquivos/types/arquivos.types";

export type ArquivoRelation = {
  key: "cliente" | "usuario" | "servico" | "unidade";
  label: string;
  id: string;
};

export function getArquivoRelations(arquivo: Arquivo): ArquivoRelation[] {
  const relations: ArquivoRelation[] = [];

  if (arquivo.clienteId) {
    relations.push({
      key: "cliente",
      label: "Cliente relacionado",
      id: arquivo.clienteId,
    });
  }

  if (arquivo.usuarioId) {
    relations.push({
      key: "usuario",
      label: "Usuário relacionado",
      id: arquivo.usuarioId,
    });
  }

  if (arquivo.servicoId) {
    relations.push({
      key: "servico",
      label: "Serviço relacionado",
      id: arquivo.servicoId,
    });
  }

  if (arquivo.unidadeId) {
    relations.push({
      key: "unidade",
      label: "Unidade relacionada",
      id: arquivo.unidadeId,
    });
  }

  return relations;
}
