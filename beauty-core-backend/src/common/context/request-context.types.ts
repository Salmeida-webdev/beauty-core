export interface RequestContextData {
  requestId: string;
  correlationId: string;
  empresaId?: string;
  usuarioId?: string;
  clienteId?: string;
  role?: string;
  method?: string;
  route?: string;
  ip?: string;
  userAgent?: string;
}

export interface RequestWithContextIds {
  requestId?: string;
  correlationId?: string;
}
