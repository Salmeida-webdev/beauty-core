export interface RelatorioJob {
  empresaId: string;

  tipo?: string;
  tipoRelatorio?: string;

  usuarioId?: string;

  dataReferencia?: string;
  dataInicio?: string;
  dataFim?: string;

  metadata?: Record<string, any>;
}