import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { timingSafeEqual } from 'crypto';

@Injectable()
export class MetricsAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const nodeEnv = process.env.NODE_ENV || 'development';
    const metricsPublic = process.env.METRICS_PUBLIC === 'true';

    if (nodeEnv !== 'production' && metricsPublic) {
      return true;
    }

    const expectedToken = process.env.METRICS_TOKEN;

    if (!expectedToken) {
      throw new UnauthorizedException('METRICS_TOKEN nao configurado.');
    }

    const headerToken = request.headers?.['x-metrics-token'];
    const authorization = request.headers?.authorization;

    const bearerToken =
      typeof authorization === 'string' && authorization.startsWith('Bearer ')
        ? authorization.slice('Bearer '.length).trim()
        : undefined;

    const receivedToken =
      typeof headerToken === 'string'
        ? headerToken
        : Array.isArray(headerToken)
          ? headerToken[0]
          : bearerToken;

    if (!receivedToken || !this.safeTokenEquals(receivedToken, expectedToken)) {
      throw new UnauthorizedException('Token de metricas invalido.');
    }

    return true;
  }

  private safeTokenEquals(receivedToken: string, expectedToken: string): boolean {
    const received = Buffer.from(receivedToken);
    const expected = Buffer.from(expectedToken);

    if (received.length !== expected.length) {
      return false;
    }

    return timingSafeEqual(received, expected);
  }
}
