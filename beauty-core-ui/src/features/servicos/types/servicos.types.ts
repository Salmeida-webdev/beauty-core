export type Servico = {
  id: string;
  empresaId: string;
  nome: string;
  descricao: string | null;
  duracaoMinutos: number;
  preco: number;
  imagem: string | null;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateServicoPayload = {
  nome: string;
  descricao?: string;
  duracaoMinutos: number;
  preco: number;
};

export type UpdateServicoPayload = Partial<CreateServicoPayload>;
