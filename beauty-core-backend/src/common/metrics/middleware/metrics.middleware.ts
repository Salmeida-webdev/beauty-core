import { Injectable, NestMiddleware } from '@nestjs/common';

import { MetricsService } from '../metrics.service';

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
  constructor(private readonly metricsService: MetricsService) {}

  use(request: any, response: any, next: () => void): void {
    const startedAt = process.hrtime.bigint();

    response.on('finish', () => {
      const durationMs =
        Number(process.hrtime.bigint() - startedAt) / 1_000_000;

      this.metricsService.observeHttpRequest({
        method: request?.method ?? 'UNKNOWN',
        route: this.resolveRoute(request),
        statusCode: Number(response?.statusCode ?? 0),
        durationMs,
      });
    });

    next();
  }

  private resolveRoute(request: any): string {
    const baseUrl = request?.baseUrl ?? '';
    const routePath = request?.route?.path;

    if (routePath) {
      return `${baseUrl}${routePath}`;
    }

    const originalUrl = String(request?.originalUrl ?? request?.url ?? '');
    const path = String(request?.path ?? originalUrl ?? 'unknown');

    return path.replace(/\?.*$/, '') || 'unknown';
  }
}
