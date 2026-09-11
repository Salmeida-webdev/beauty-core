export interface NotificacaoJob {
  empresaId: string;

  usuarioId?: string;
  clienteId?: string;

  titulo: string;
  mensagem: string;

  tipo?: string;

  dataReferencia?: string;

  metadata?: Record<string, any>;
}
