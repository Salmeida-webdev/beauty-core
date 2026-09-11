export interface CampanhaJob {
  empresaId: string;
  campanhaId?: string;

  tipo?: string;
  mensagem?: string;

  usuarioId?: string;
  clienteId?: string;

  dataReferencia?: string;

  metadata?: Record<string, any>;
}
