import { TipoUsuarioAuditoria } from '@prisma/client';

export function getRequestIp(req: any): string | undefined {
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
    req.connection?.remoteAddress
  );
}

export function getRequestUserAgent(
  req: any,
): string | undefined {
  return req.headers?.['user-agent'];
}

export function getRequestRoute(req: any): string {
  return req.originalUrl || req.url || '';
}

export function getRequestMethod(req: any): string {
  return String(req.method || '').toUpperCase();
}

export function getRequestUser(req: any) {
  return req.user || null;
}

export function getTipoUsuarioAuditoria(
  user: any,
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