import { Request } from 'express';

export function getRequestIp(req: Request): string | null {
  const forwardedFor = req.headers['x-forwarded-for'];

  if (typeof forwardedFor === 'string') {
    return forwardedFor.split(',')[0]?.trim() || null;
  }

  if (Array.isArray(forwardedFor)) {
    return forwardedFor[0]?.split(',')[0]?.trim() || null;
  }

  return req.ip || req.socket?.remoteAddress || null;
}

export function parseUserAgent(userAgent?: string | null) {
  const ua = userAgent || '';

  const sistemaOperacional = ua.includes('Windows')
    ? 'Windows'
    : ua.includes('Android')
      ? 'Android'
      : ua.includes('iPhone') || ua.includes('iPad')
        ? 'iOS'
        : ua.includes('Mac OS')
          ? 'macOS'
          : ua.includes('Linux')
            ? 'Linux'
            : 'Desconhecido';

  const navegador = ua.includes('Edg')
    ? 'Edge'
    : ua.includes('Chrome')
      ? 'Chrome'
      : ua.includes('Firefox')
        ? 'Firefox'
        : ua.includes('Safari')
          ? 'Safari'
          : 'Desconhecido';

  const dispositivo =
    ua.includes('Mobile') || ua.includes('Android') || ua.includes('iPhone')
      ? 'Mobile'
      : 'Desktop';

  return {
    dispositivo,
    sistemaOperacional,
    navegador,
    userAgent: ua || null,
  };
}
