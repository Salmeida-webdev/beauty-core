export type ClienteAuthUser = {
  sub: string;
  clienteId?: string;
  empresaId: string;
  telefone: string;
  role: 'CLIENTE';
};
