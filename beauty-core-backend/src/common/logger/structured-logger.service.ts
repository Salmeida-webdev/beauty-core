import { Injectable, LoggerService } from '@nestjs/common';

import { RequestContextService } from '../context/request-context.service';

type StructuredLogLevel =
  | 'info'
  | 'error'
  | 'warn'
  | 'debug'
  | 'verbose'
  | 'fatal';

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

@Injectable()
export class StructuredLoggerService implements LoggerService {
  constructor(private readonly requestContext: RequestContextService) {}

  log(message: unknown, context?: string): void {
    this.write('info', message, context);
  }

  error(message: unknown, trace?: string, context?: string): void {
    this.write('error', message, context, trace);
  }

  warn(message: unknown, context?: string): void {
    this.write('warn', message, context);
  }

  debug(message: unknown, context?: string): void {
    this.write('debug', message, context);
  }

  verbose(message: unknown, context?: string): void {
    this.write('verbose', message, context);
  }

  fatal(message: unknown, context?: string): void {
    this.write('fatal', message, context);
  }

  private write(
    level: StructuredLogLevel,
    message: unknown,
    context?: string,
    trace?: string,
  ): void {
    const requestContext = this.requestContext.getContext();

    const payload: Record<string, JsonValue | undefined> = {
      timestamp: new Date().toISOString(),
      level,
      service: 'beauty-core-api',
      environment: process.env.NODE_ENV ?? 'development',
      context: context ?? null,
      message: this.normalizeMessage(message),
      requestId: requestContext?.requestId ?? null,
      correlationId: requestContext?.correlationId ?? null,
      empresaId: requestContext?.empresaId ?? null,
      usuarioId: requestContext?.usuarioId ?? null,
      clienteId: requestContext?.clienteId ?? null,
      role: requestContext?.role ?? null,
      method: requestContext?.method ?? null,
      route: requestContext?.route ?? null,
      ip: requestContext?.ip ?? null,
      userAgent: requestContext?.userAgent ?? null,
      pid: process.pid,
    };

    if (trace) {
      payload.trace = trace;
    }

    const line = JSON.stringify(this.removeUndefined(payload));

    if (level === 'error' || level === 'fatal') {
      console.error(line);
      return;
    }

    if (level === 'warn') {
      console.warn(line);
      return;
    }

    console.log(line);
  }

  private normalizeMessage(message: unknown): JsonValue {
    if (message instanceof Error) {
      return {
        name: message.name,
        message: message.message,
        stack: message.stack ?? null,
      };
    }

    if (typeof message === 'string') {
      return message;
    }

    return this.safeJson(message);
  }

  private safeJson(
    value: unknown,
    depth = 0,
    seen = new WeakSet<object>(),
  ): JsonValue {
    if (value === null || value === undefined) {
      return null;
    }

    if (typeof value === 'string') {
      return value;
    }

    if (typeof value === 'number') {
      return Number.isFinite(value) ? value : String(value);
    }

    if (typeof value === 'boolean') {
      return value;
    }

    if (typeof value === 'bigint') {
      return value.toString();
    }

    if (typeof value === 'symbol') {
      return String(value);
    }

    if (typeof value === 'function') {
      return `[Function ${value.name || 'anonymous'}]`;
    }

    if (depth >= 4) {
      return '[MaxDepth]';
    }

    if (Array.isArray(value)) {
      return value.map((item) => this.safeJson(item, depth + 1, seen));
    }

    if (typeof value === 'object') {
      if (seen.has(value)) {
        return '[Circular]';
      }

      seen.add(value);

      const record = value as Record<string, unknown>;
      const result: Record<string, JsonValue> = {};

      for (const [key, item] of Object.entries(record)) {
        result[key] = this.safeJson(item, depth + 1, seen);
      }

      seen.delete(value);

      return result;
    }

    return String(value);
  }

  private removeUndefined(
    payload: Record<string, JsonValue | undefined>,
  ): Record<string, JsonValue> {
    const cleanPayload: Record<string, JsonValue> = {};

    for (const [key, value] of Object.entries(payload)) {
      if (value !== undefined) {
        cleanPayload[key] = value;
      }
    }

    return cleanPayload;
  }
}
