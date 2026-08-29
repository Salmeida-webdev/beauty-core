export type Unidade = {
  id: string;
  empresaId: string;
  nome: string;
  telefone: string | null;
  email: string | null;
  endereco: string | null;
  ativa: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateUnidadePayload = {
  nome: string;
  telefone?: string;
  email?: string;
  endereco?: string;
};

export type UpdateUnidadePayload = Partial<CreateUnidadePayload>;
