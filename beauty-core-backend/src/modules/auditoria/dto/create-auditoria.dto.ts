import {
  AcaoAuditoria,
  StatusAuditoria,
  TipoUsuarioAuditoria,
} from '@prisma/client';

export class CreateAuditoriaDto {
  empresaId?: string | null;
  usuarioId?: string | null;
  clienteId?: string | null;

  tipoUsuario?: TipoUsuarioAuditoria | null;

  /**
   * Opcional porque métodos auxiliares como registrarCriacao,
   * registrarAtualizacao, registrarUpload, registrarCancelamento,
   * registrarLoginAdmin etc. podem definir a ação internamente.
   */
  acao?: AcaoAuditoria;

  modulo: string;

  rota?: string | null;
  metodoHttp?: string | null;
  ip?: string | null;
  userAgent?: string | null;

  recurso?: string | null;
  recursoId?: string | null;

  dadosAntes?: unknown;
  dadosDepois?: unknown;
  metadata?: unknown;

  /**
   * Usado pelo AuditLogInterceptor para medir duração da requisição.
   * A persistência pode ser feita dentro de metadata no AuditoriaService.
   */
  tempoMs?: number | null;

  status?: StatusAuditoria;
  mensagem?: string | null;
}