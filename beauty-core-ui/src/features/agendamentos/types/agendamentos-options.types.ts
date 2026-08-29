export type AgendaOption = {
  value: string;
  label: string;
  description?: string;
};

export type AgendaRelatedField =
  | "clienteId"
  | "servicoId"
  | "profissionalId"
  | "unidadeId";

export type AgendaRelatedValues = Partial<
  Record<AgendaRelatedField, string>
>;