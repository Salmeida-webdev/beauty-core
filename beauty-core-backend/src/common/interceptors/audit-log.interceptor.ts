import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';

import type { Request } from 'express';
import { Observable, catchError, tap, throwError } from 'rxjs';

import { AuditoriaService } from '../../modules/auditoria/auditoria.service';
import { RequestContextService } from '../context/request-context.service';

import {
  getRequestIp,
  getRequestMethod,
  getRequestRoute,
  getRequestUser,
  getRequestUserAgent,
  getTipoUsuarioAuditoria,
} from '../utils/audit-request.util';

type RequestWithContextIds = Request & {
  requestId?: string;
  correlationId?: string;
};

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  private readonly logger = new Logger(AuditLogInterceptor.name);

  constructor(
    private readonly auditoriaService: AuditoriaService,
    private readonly requestContext: RequestContextService,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest<RequestWithContextIds>();

    const startedAt = Date.now();

    const user = getRequestUser(request);

    const rota = getRequestRoute(request);
    const metodoHttp = getRequestMethod(request);
    const ip = getRequestIp(request);
    const userAgent = getRequestUserAgent(request);

    const empresaId = user?.empresaId;
    const tipoUsuario = getTipoUsuarioAuditoria(user);
    const isCliente = tipoUsuario === 'CLIENTE' || user?.role === 'CLIENTE';

    const usuarioId = isCliente ? undefined : user?.sub || user?.id;
    const clienteId = isCliente
      ? user?.clienteId ?? user?.sub ?? user?.id
      : user?.clienteId;

    const contextData = this.requestContext.getContext();

    const requestId =
      contextData?.requestId ??
      request.requestId;

    const correlationId =
      contextData?.correlationId ??
      request.correlationId ??
      requestId;

    this.requestContext.setContextData({
      requestId,
      correlationId,
      empresaId,
      usuarioId,
      clienteId,
      role: user?.role,
      method: metodoHttp,
      route: rota,
      ip,
      userAgent,
    });

    return next.handle().pipe(
      tap(() => {
        const tempoMs = Date.now() - startedAt;

        this.logger.log(
          `[HTTP] requestId=${requestId ?? '-'} correlationId=${
            correlationId ?? '-'
          } metodo=${metodoHttp} rota=${rota} empresaId=${
            empresaId ?? '-'
          } usuarioId=${usuarioId ?? '-'} clienteId=${
            clienteId ?? '-'
          } status=SUCESSO tempoMs=${tempoMs}`,
        );

        if (this.deveAuditar(rota, metodoHttp)) {
          void this.auditoriaService.registrarSucesso({
            empresaId,
            usuarioId,
            clienteId,
            tipoUsuario,
            acao: this.mapearAcao(metodoHttp, rota),
            modulo: this.mapearModulo(rota),
            rota,
            metodoHttp,
            ip,
            userAgent,
            metadata: {
              requestId: requestId ?? null,
              correlationId: correlationId ?? null,
              tempoMs,
            },
            tempoMs,
            mensagem: 'Requisição HTTP executada com sucesso.',
          });
        }
      }),

      catchError((error) => {
        const tempoMs = Date.now() - startedAt;

        this.logger.error(
          `[HTTP] requestId=${requestId ?? '-'} correlationId=${
            correlationId ?? '-'
          } metodo=${metodoHttp} rota=${rota} empresaId=${
            empresaId ?? '-'
          } usuarioId=${usuarioId ?? '-'} clienteId=${
            clienteId ?? '-'
          } status=FALHA tempoMs=${tempoMs} erro=${
            error?.message ?? 'Erro desconhecido'
          }`,
        );

        if (this.deveAuditar(rota, metodoHttp)) {
          void this.auditoriaService.registrarFalha({
            empresaId,
            usuarioId,
            clienteId,
            tipoUsuario,
            acao: this.mapearAcao(metodoHttp, rota),
            modulo: this.mapearModulo(rota),
            rota,
            metodoHttp,
            ip,
            userAgent,
            metadata: {
              requestId: requestId ?? null,
              correlationId: correlationId ?? null,
              tempoMs,
              statusCode: error?.status,
            },
            tempoMs,
            mensagem:
              error?.message ??
              'Falha durante requisição HTTP.',
          });
        }

        return throwError(() => error);
      }),
    );
  }

  private deveAuditar(
    rota: string,
    metodoHttp: string,
  ): boolean {
    if (!rota) return false;

    if (rota.startsWith('/health')) return false;

    if (rota.startsWith('/auditoria')) return false;

    if (rota.startsWith('/scheduler/status')) return false;

    if (metodoHttp === 'GET') return false;

    return true;
  }

  private mapearModulo(rota: string): string {
    const partes = rota.split('/').filter(Boolean);

    if (!partes.length) {
      return 'SISTEMA';
    }

    if (partes[0] === 'auth-cliente') {
      return 'AUTH_CLIENTE';
    }

    if (partes[0] === 'auth') {
      return 'AUTH';
    }

    if (partes[0] === 'mensagens-whatsapp') {
      return 'WHATSAPP';
    }

    if (partes[0] === 'campanhas-whatsapp') {
      return 'WHATSAPP';
    }

    return partes[0].replace(/-/g, '_').toUpperCase();
  }

  private mapearAcao(
    metodoHttp: string,
    rota: string,
  ): any {
    if (rota.includes('/auth-cliente/verificar-codigo')) {
      return 'LOGIN_CLIENTE';
    }

    if (rota.includes('/auth/login')) {
      return 'LOGIN_ADMIN';
    }

    if (rota.includes('/solicitar-codigo')) {
      return 'SOLICITAR_CODIGO';
    }

    if (rota.includes('/verificar-codigo')) {
      return 'VERIFICAR_CODIGO';
    }

    if (rota.includes('/aceitar-termos')) {
      return 'ACEITAR_TERMOS';
    }

    if (rota.includes('/cancelar')) {
      return 'CANCELAR';
    }

    if (rota.includes('/concluir')) {
      return 'CONCLUIR';
    }

    if (rota.includes('/pagar')) {
      return 'PAGAR';
    }

    if (rota.includes('/inativar')) {
      return 'INATIVAR';
    }

    if (rota.includes('/upload') || rota.includes('/arquivos')) {
      return 'UPLOAD';
    }

    if (metodoHttp === 'POST') {
      return 'CRIAR';
    }

    if (metodoHttp === 'PATCH' || metodoHttp === 'PUT') {
      return 'ATUALIZAR';
    }

    if (metodoHttp === 'DELETE') {
      return 'EXCLUIR';
    }

    return 'OUTRO';
  }
}
