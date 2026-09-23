import { HttpException, HttpStatus } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import express from 'express';
import request from 'supertest';
import { HttpExceptionFilter } from '../../src/common/filters/http-exception.filter';
import { createSwaggerConfig } from '../../src/config/swagger.config';
import { PaginationDto } from '../../src/shared/dto/pagination.dto';
import { ROLES_KEY, Roles } from '../../src/shared/decorators/roles.decorator';
import { mapRole } from '../../src/shared/enums/role-mapper';
import { getEmpresaId } from '../../src/shared/utils/get-empresa-id';
import {
  buildPaginatedResponse,
  getPaginationParams,
} from '../../src/shared/utils/pagination.util';
import {
  getRequestIp,
  parseUserAgent,
} from '../../src/shared/utils/device.util';
import {
  durationToDate,
  durationToSeconds,
} from '../../src/shared/utils/duration.util';
import {
  createExecutionContextLike,
  installCoverageSmokeSilencer,
} from './helpers/coverage-smoke.helper';

type FilterResponse = {
  getHeader(name: string): string | undefined;
  setHeader(name: string, value: string | number | string[]): FilterResponse;
  status(code: number): FilterResponse;
  json(body: unknown): FilterResponse;
};

function createFilterResponse(initialHeaders: Map<string, string> = new Map()) {
  let statusCode: number | undefined;
  let responseBody: unknown;

  const getHeader = jest.fn((name: string) => initialHeaders.get(name));
  const setHeader = jest.fn(
    (name: string, value: string | number | string[]) => {
      initialHeaders.set(name, String(value));
      return response;
    },
  );
  const status = jest.fn((code: number) => {
    statusCode = code;
    return response;
  });
  const json = jest.fn((body: unknown) => {
    responseBody = body;
    return response;
  });
  const response: FilterResponse = {
    getHeader,
    setHeader,
    status,
    json,
  };

  return {
    response,
    headers: initialHeaders,
    spies: { getHeader, setHeader, status, json },
    getStatus: () => statusCode,
    getBody: () => responseBody,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

installCoverageSmokeSilencer();

describe('Chat 33.3.1 - Micro boost coverage', () => {
  it('builds the Swagger document with the API metadata and JWT scheme', () => {
    const document = createSwaggerConfig();

    expect(document.info.title).toBe('Beauty Core API');
    expect(document.info.version).toBe('1.0.0');
    expect(document.servers).toContainEqual(
      expect.objectContaining({ url: 'http://localhost:3000' }),
    );
    expect(document.components?.securitySchemes?.JWT).toEqual(
      expect.objectContaining({ scheme: 'bearer', type: 'http' }),
    );
  });

  it('maps an HTTP exception into status, body, and request headers', () => {
    const filter = new HttpExceptionFilter();
    const response = createFilterResponse();
    const req = {
      url: '/teste',
      method: 'GET',
      headers: {},
      requestId: 'request-123',
      correlationId: 'correlation-123',
    };
    const host = new ExecutionContextHost([req, response.response]);

    filter.catch(
      new HttpException(
        { message: 'Entrada inválida', error: 'Bad Request' },
        HttpStatus.BAD_REQUEST,
      ),
      host,
    );

    expect(response.getStatus()).toBe(HttpStatus.BAD_REQUEST);
    expect(response.spies.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(response.spies.json).toHaveBeenCalledTimes(1);
    expect(response.headers.get('x-request-id')).toBe('request-123');
    expect(response.headers.get('x-correlation-id')).toBe('correlation-123');
    expect(response.spies.setHeader).toHaveBeenCalledWith(
      'x-request-id',
      'request-123',
    );
    expect(response.spies.setHeader).toHaveBeenCalledWith(
      'x-correlation-id',
      'correlation-123',
    );
    const body = response.getBody();
    expect(isRecord(body)).toBe(true);
    if (!isRecord(body))
      throw new Error('Filter did not produce a response body');
    expect(body.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(body.message).toBe('Entrada inválida');
    expect(body.error).toBe('Bad Request');
    expect(body.path).toBe('/teste');
    expect(body.requestId).toBe('request-123');
    expect(body.correlationId).toBe('correlation-123');
    expect(typeof body.timestamp).toBe('string');
    if (typeof body.timestamp !== 'string') {
      throw new Error('Filter response timestamp is not a string');
    }
    expect(Number.isNaN(Date.parse(body.timestamp))).toBe(false);
  });

  it('maps an unexpected exception to 500 and propagates existing response headers', () => {
    const filter = new HttpExceptionFilter();
    const response = createFilterResponse(
      new Map([
        ['x-request-id', 'request-from-response'],
        ['x-correlation-id', 'correlation-from-response'],
      ]),
    );
    const req = { url: '/erro', method: 'GET', headers: {} };
    const host = new ExecutionContextHost([req, response.response]);

    filter.catch(new Error('Erro interno de teste'), host);

    expect(response.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(response.spies.status).toHaveBeenCalledWith(
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    expect(response.spies.json).toHaveBeenCalledTimes(1);
    expect(response.spies.setHeader).toHaveBeenCalledWith(
      'x-request-id',
      'request-from-response',
    );
    expect(response.spies.setHeader).toHaveBeenCalledWith(
      'x-correlation-id',
      'correlation-from-response',
    );
    const body = response.getBody();
    expect(isRecord(body)).toBe(true);
    if (!isRecord(body))
      throw new Error('Filter did not produce a response body');
    expect(body.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(body.message).toBe('Erro interno do servidor.');
    expect(body.error).toBe('Internal Server Error');
    expect(body.path).toBe('/erro');
    expect(body.requestId).toBe('request-from-response');
    expect(body.correlationId).toBe('correlation-from-response');
    expect(typeof body.timestamp).toBe('string');
    if (typeof body.timestamp !== 'string') {
      throw new Error('Filter response timestamp is not a string');
    }
    expect(Number.isNaN(Date.parse(body.timestamp))).toBe(false);
  });

  it('checks shared decorators, role mapping, and tenant extraction contracts', () => {
    const handler = () => undefined;
    Roles('ADMIN', 'GERENTE')(handler);

    expect(Reflect.getMetadata(ROLES_KEY, handler)).toEqual([
      'ADMIN',
      'GERENTE',
    ]);
    expect(mapRole('OWNER')).toBe('ADMIN');
    expect(mapRole('MANAGER')).toBe('GERENTE');
    expect(mapRole('CLIENTE')).toBe('CLIENTE');
    expect(getEmpresaId({ user: { empresaId: 'empresa-123' } })).toBe(
      'empresa-123',
    );
    expect(() => getEmpresaId({ user: {} })).toThrow(
      'Empresa não identificada no token',
    );
  });

  it('checks pagination helpers using the PaginationDto contract', () => {
    const query = new PaginationDto();
    query.page = 2;
    query.limit = 10;

    expect(getPaginationParams(query)).toEqual({
      page: 2,
      limit: 10,
      skip: 10,
      take: 10,
    });
    expect(buildPaginatedResponse([{ id: 'item-1' }], 21, 2, 10)).toEqual({
      data: [{ id: 'item-1' }],
      meta: { total: 21, page: 2, limit: 10, totalPages: 3 },
    });
  });

  it('parses user agents and reads the IP from a real Express request', async () => {
    const parsedAgent = parseUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
    );
    const app = express();
    let resolvedIp: string | null = null;

    app.get('/request-ip', (req, res) => {
      resolvedIp = getRequestIp(req);
      res.sendStatus(HttpStatus.NO_CONTENT);
    });

    await request(app)
      .get('/request-ip')
      .set('x-forwarded-for', '203.0.113.10, 198.51.100.20')
      .expect(HttpStatus.NO_CONTENT);

    expect(parsedAgent).toEqual({
      dispositivo: 'Desktop',
      sistemaOperacional: 'Windows',
      navegador: 'Chrome',
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
    });
    expect(resolvedIp).toBe('203.0.113.10');
  });

  it('converts valid durations and rejects invalid formats', () => {
    expect(durationToSeconds('2m')).toBe(120);
    expect(durationToSeconds('1h')).toBe(3600);

    const now = Date.now();
    const result = durationToDate('1s').getTime();
    expect(result).toBeGreaterThanOrEqual(now + 1000);
    expect(result).toBeLessThanOrEqual(Date.now() + 1000);
    expect(() => durationToSeconds('60')).toThrow(
      'Formato de duração inválido: 60',
    );
    expect(() => durationToDate('invalid')).toThrow(
      'Formato de duração inválido: invalid',
    );
  });

  it('keeps the shared ExecutionContext mock functional', () => {
    const context = createExecutionContextLike();

    expect(context.switchToHttp().getRequest()).toBeDefined();
    expect(context.switchToHttp().getResponse()).toBeDefined();
    expect(context.getHandler()).toBeDefined();
    expect(context.getClass()).toBeDefined();
  });
});
