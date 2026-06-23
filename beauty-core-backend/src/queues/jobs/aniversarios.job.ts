export interface AniversarioJob {
  empresaId: string;

  clienteId?: string;
  usuarioId?: string;

  dataReferencia?: string;

  tipo?:
    | 'ANIVERSARIANTES_DIA'
    | 'ANIVERSARIO_CLIENTE'
    | 'ANIVERSARIO_USUARIO';

  nome?: string;
  telefone?: string;
  mensagem?: string;

  metadata?: Record<string, any>;
}