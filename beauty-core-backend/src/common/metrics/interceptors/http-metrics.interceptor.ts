import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { MetricsService } from '../metrics.service';

@Injectable()
export class HttpMetricsInterceptor implements NestInterceptor {
  constructor(private readonly metricsService: MetricsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (context.getType() !== 'http') {
      return next.handle();
    }

    const startedAt = process.hrtime.bigint();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    return next.handle().pipe(
      tap(() => {
        this.record(context, request, startedAt);
      }),
      catchError((error) => {
        this.record(context, request, startedAt, error);

        return throwError(() => error);
      }),
    );
  }

  private record(
    context: ExecutionContext,
    request: any,
    startedAt: bigint,
    error?: any,
  ): void {
    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse();

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

  private resolveStatusCode(response: any, error?: any): number {
    if (error) {
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

  private resolveRoute(request: any): string {
    const baseUrl = request?.baseUrl ?? '';
    const routePath = request?.route?.path;

    if (routePath) {
      return `${baseUrl}${routePath}`;
    }

    return request?.path ?? request?.url ?? 'unknown';
  }
}
