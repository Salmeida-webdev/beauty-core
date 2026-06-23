import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { NextFunction, Request, Response } from 'express';
import { RequestContextService } from '../context/request-context.service';

type RequestWithIds = Request & {
  requestId?: string;
  correlationId?: string;
};

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  constructor(private readonly requestContext: RequestContextService) {}

  use(req: RequestWithIds, res: Response, next: NextFunction): void {
    const requestId = this.getHeaderValue(req, 'x-request-id') ?? randomUUID();

    const correlationId =
      this.getHeaderValue(req, 'x-correlation-id') ?? requestId;

    req.requestId = requestId;
    req.correlationId = correlationId;

    res.setHeader('x-request-id', requestId);
    res.setHeader('x-correlation-id', correlationId);

    this.requestContext.run(
      {
        requestId,
        correlationId,
        method: req.method,
        route: req.originalUrl ?? req.url,
        ip: req.ip,
        userAgent: req.get('user-agent'),
      },
      () => next(),
    );
  }

  private getHeaderValue(req: Request, headerName: string): string | undefined {
    const value = req.headers[headerName];

    if (Array.isArray(value)) {
      return value[0];
    }

    if (typeof value === 'string' && value.trim().length > 0) {
      return value.trim();
    }

    return undefined;
  }
}
