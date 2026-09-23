import { UnauthorizedException } from '@nestjs/common';
import express from 'express';
import request from 'supertest';
import { PaginationDto } from '../../src/shared/dto/pagination.dto';
import {
  durationToDate,
  durationToSeconds,
} from '../../src/shared/utils/duration.util';
import {
  getRequestIp,
  parseUserAgent,
} from '../../src/shared/utils/device.util';
import { getEmpresaId } from '../../src/shared/utils/get-empresa-id';
import {
  buildPaginatedResponse,
  getPaginationParams,
} from '../../src/shared/utils/pagination.util';

describe('Shared utility contracts', () => {
  describe('duration utilities', () => {
    it('converts each supported duration unit to seconds', () => {
      expect(durationToSeconds('30s')).toBe(30);
      expect(durationToSeconds('5m')).toBe(300);
      expect(durationToSeconds('2h')).toBe(7200);
      expect(durationToSeconds('1d')).toBe(86400);
    });

    it('creates a date after the requested duration and rejects invalid values', () => {
      const startedAt = Date.now();
      const result = durationToDate('2s').getTime();

      expect(result).toBeGreaterThanOrEqual(startedAt + 2000);
      expect(result).toBeLessThanOrEqual(Date.now() + 2000);
      expect(() => durationToSeconds('60')).toThrow(
        'Formato de duração inválido: 60',
      );
      expect(() => durationToDate('invalid')).toThrow(
        'Formato de duração inválido: invalid',
      );
    });
  });

  describe('pagination utilities', () => {
    it('uses PaginationDto defaults and normalizes invalid query values', () => {
      expect(getPaginationParams(new PaginationDto())).toEqual({
        page: 1,
        limit: 20,
        skip: 0,
        take: 20,
      });

      const invalidQuery = new PaginationDto();
      invalidQuery.page = -3;
      invalidQuery.limit = 0;

      expect(getPaginationParams(invalidQuery)).toEqual({
        page: 1,
        limit: 20,
        skip: 0,
        take: 20,
      });
    });

    it('calculates offsets, caps page size, and returns response metadata', () => {
      const query = new PaginationDto();
      query.page = 3;
      query.limit = 250;

      expect(getPaginationParams(query)).toEqual({
        page: 3,
        limit: 100,
        skip: 200,
        take: 100,
      });
      expect(
        buildPaginatedResponse([{ id: 'a' }, { id: 'b' }], 201, 3, 100),
      ).toEqual({
        data: [{ id: 'a' }, { id: 'b' }],
        meta: { total: 201, page: 3, limit: 100, totalPages: 3 },
      });
    });
  });

  describe('tenant extraction', () => {
    it('returns the authenticated tenant id and rejects a missing tenant', () => {
      expect(getEmpresaId({ user: { empresaId: 'empresa-test-id' } })).toBe(
        'empresa-test-id',
      );
      expect(() => getEmpresaId({ user: {} })).toThrow(UnauthorizedException);
      expect(() => getEmpresaId({})).toThrow(UnauthorizedException);
    });
  });

  describe('device utilities', () => {
    it('parses a browser user agent and handles an absent user agent', () => {
      expect(
        parseUserAgent(
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
        ),
      ).toEqual({
        dispositivo: 'Desktop',
        sistemaOperacional: 'Windows',
        navegador: 'Chrome',
        userAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
      });
      expect(parseUserAgent(null)).toEqual({
        dispositivo: 'Desktop',
        sistemaOperacional: 'Desconhecido',
        navegador: 'Desconhecido',
        userAgent: null,
      });
    });

    it('prefers the forwarded IP and falls back to the Express request IP', async () => {
      const app = express();
      const resolvedIps: Array<string | null> = [];

      app.get('/forwarded', (req, res) => {
        resolvedIps.push(getRequestIp(req));
        res.sendStatus(204);
      });
      app.get('/fallback', (req, res) => {
        resolvedIps.push(getRequestIp(req));
        res.sendStatus(204);
      });

      await request(app)
        .get('/forwarded')
        .set('x-forwarded-for', '203.0.113.10, 198.51.100.20')
        .expect(204);
      await request(app).get('/fallback').expect(204);

      expect(resolvedIps[0]).toBe('203.0.113.10');
      expect(resolvedIps[1]).not.toBeNull();
      expect(typeof resolvedIps[1]).toBe('string');
    });
  });
});
