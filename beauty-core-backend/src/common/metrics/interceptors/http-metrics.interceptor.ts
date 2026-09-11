import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { MetricsService } from '../metrics.service';

type MetricsRequest = {
  path?: string;
  method?: string;
  baseUrl?: string;
  route?: { path?: string };
  url?: string;
};

type MetricsResponse = {
  statusCode?: number;
  getStatus?: () => number;
};

type MetricsError = {
  getStatus?: () => number;
  status?: number;
  statusCode?: number;
};

function isMetricsError(value: unknown): value is MetricsError {
  return typeof value === 'object' && value !== null;
}
@Injectable()
export class HttpMetricsInterceptor implements NestInterceptor {
  constructor(private readonly metricsService: MetricsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (context.getType() !== 'http') {
      return next.handle();
    }

    const startedAt = process.hrtime.bigint();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<MetricsRequest>();

    return next.handle().pipe(
      tap(() => {
        this.record(context, request, startedAt);
      }),
      catchError((error: unknown) => {
        this.record(context, request, startedAt, error);

        const normalizedMetricsError =
          error instanceof Error
            ? error
            : new Error(
                typeof error === 'string'
                  ? error
                  : 'Falha ao coletar metricas.',
              );
        return throwError(() => normalizedMetricsError);
      }),
    );
  }

  private record(
    context: ExecutionContext,
    request: MetricsRequest,
    startedAt: bigint,
    error?: unknown,
  ): void {
    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse<MetricsResponse>();

    const durationMs = Number(process.hrtime.bigint() - startedAt) / 1_000_000;
    const statusCode = this.resolveStatusCode(response, error);
    const route = this.resolveRoute(request);

    this.metricsService.observeHttpRequest({
      method: request?.method ?? 'UNKNOWN',
      route,
      statusCode,
      durationMs,
    });
  }

  private resolveStatusCode(
    response: MetricsResponse,
    error?: unknown,
  ): number {
    if (isMetricsError(error)) {
      if (typeof error.getStatus === 'function') {
        return Number(error.getStatus());
      }

      if (typeof error.status === 'number') {
        return error.status;
      }

      if (typeof error.statusCode === 'number') {
        return error.statusCode;
      }

      return 500;
    }

    return Number(response?.statusCode ?? 200);
  }

  private resolveRoute(request: MetricsRequest): string {
    const baseUrl = request?.baseUrl ?? '';
    const routePath = request?.route?.path;

    if (routePath) {
      return `${baseUrl}${routePath}`;
    }

    const requestPath = request?.path;
    if (typeof requestPath === 'string') {
      return requestPath;
    }

    const requestUrl = request?.url;
    return typeof requestUrl === 'string' ? requestUrl : 'unknown';
  }
}
