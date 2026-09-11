import { TipoUsuarioAuditoria } from '@prisma/client';

type AuditRequestUser = {
  role?: string;
  tipoUsuario?: string;
  clienteId?: string;
  usuarioId?: string;
};

type AuditRequest = {
  headers?: Record<string, string | string[] | undefined>;
  ip?: string;
  socket?: { remoteAddress?: string | null };
  connection?: { remoteAddress?: string | null };
  originalUrl?: string;
  url?: string;
  method?: string;
  user?: AuditRequestUser | null;
};
export function getRequestIp(req: AuditRequest): string | undefined {
  const forwardedFor = req.headers?.['x-forwarded-for'];
  const realIp = req.headers?.['x-real-ip'];

  if (typeof forwardedFor === 'string' && forwardedFor.trim()) {
    return forwardedFor.split(',')[0].trim();
  }

  if (Array.isArray(forwardedFor) && forwardedFor.length > 0) {
    return forwardedFor[0];
  }

  if (typeof realIp === 'string' && realIp.trim()) {
    return realIp.trim();
  }

  return (
    req.ip ||
    req.socket?.remoteAddress ||
    req.connection?.remoteAddress ||
    undefined
  );
}

export function getRequestUserAgent(req: AuditRequest): string | undefined {
  const userAgent = req.headers?.['user-agent'];
  return typeof userAgent === 'string' ? userAgent : undefined;
}

export function getRequestRoute(req: AuditRequest): string {
  return req.originalUrl || req.url || '';
}

export function getRequestMethod(req: AuditRequest): string {
  return String(req.method || '').toUpperCase();
}

export function getRequestUser(req: AuditRequest) {
  return req.user || null;
}

export function getTipoUsuarioAuditoria(
  user: AuditRequestUser,
): TipoUsuarioAuditoria | undefined {
  if (!user) {
    return undefined;
  }

  if (user.role === 'CLIENTE') {
    return TipoUsuarioAuditoria.CLIENTE;
  }

  if (user.tipoUsuario === 'CLIENTE') {
    return TipoUsuarioAuditoria.CLIENTE;
  }

  if (user.clienteId && !user.usuarioId) {
    return TipoUsuarioAuditoria.CLIENTE;
  }

  if (user.role === 'ADMIN') {
    return TipoUsuarioAuditoria.ADMIN;
  }

  if (user.role === 'GERENTE') {
    return TipoUsuarioAuditoria.GERENTE;
  }

  if (user.role === 'RECEPCAO') {
    return TipoUsuarioAuditoria.RECEPCAO;
  }

  if (user.role === 'PROFISSIONAL') {
    return TipoUsuarioAuditoria.PROFISSIONAL;
  }

  if (user.tipoUsuario === 'SISTEMA') {
    return TipoUsuarioAuditoria.SISTEMA;
  }

  return undefined;
}
