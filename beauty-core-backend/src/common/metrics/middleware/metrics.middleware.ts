import type { NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

import { MetricsService } from '../metrics.service';

type MetricsMiddlewareRequest = {
  method?: string;
  baseUrl?: string;
  route?: { path?: string };
  originalUrl?: string;
  url?: string;
  path?: string;
};

type MetricsMiddlewareResponse = {
  statusCode?: number;
  on: (event: 'finish', listener: () => void) => void;
};

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
  constructor(private readonly metricsService: MetricsService) {}

  use(
    request: MetricsMiddlewareRequest,
    response: MetricsMiddlewareResponse,
    next: NextFunction,
  ): void {
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

  private resolveRoute(request: MetricsMiddlewareRequest): string {
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
