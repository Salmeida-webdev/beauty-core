import { ConfigService } from '@nestjs/config';
import { createQueueJobId } from '../../src/queues/utils/queue-job-id.util';
import { getEnterpriseJobOptions } from '../../src/queues/utils/queue-options.util';

describe('Queue utilities', () => {
  describe('createQueueJobId', () => {
    it('creates a deterministic tenant-scoped identifier', () => {
      const params = {
        empresaId: ' empresa-á ',
        tipo: 'Relatório Diário',
        referenciaId: 'registro/42',
        dataReferencia: '2026-09-22',
        extra: 'turno manhã',
      };

      const firstId = createQueueJobId(params);
      const secondId = createQueueJobId({ ...params });

      expect(firstId).toBe(secondId);
      expect(firstId).toMatch(/^bc-empresa-a-relatorio-diario-registro-42-/);
      expect(firstId).toMatch(/[0-9a-f]{24}$/);
      expect(firstId.length).toBeLessThanOrEqual(180);
    });

    it('uses global scope for an absent tenant and separates references', () => {
      const globalId = createQueueJobId({ tipo: 'NOTIFICACAO' });
      const firstReference = createQueueJobId({
        empresaId: 'empresa-a',
        tipo: 'NOTIFICACAO',
        referenciaId: 'cliente-1',
      });
      const secondReference = createQueueJobId({
        empresaId: 'empresa-a',
        tipo: 'NOTIFICACAO',
        referenciaId: 'cliente-2',
      });

      expect(globalId).toContain('bc-global-notificacao');
      expect(firstReference).not.toBe(secondReference);
      expect(firstReference).toContain('empresa-a-notificacao-cliente-1');
      expect(secondReference).toContain('empresa-a-notificacao-cliente-2');
    });
  });

  describe('getEnterpriseJobOptions', () => {
    it('returns configured BullMQ options with retention policies', () => {
      const configService = new ConfigService({
        QUEUE_ATTEMPTS: '4',
        QUEUE_BACKOFF_MS: '2500',
      });

      expect(getEnterpriseJobOptions(configService, 'job-42')).toEqual({
        jobId: 'job-42',
        attempts: 4,
        backoff: { type: 'exponential', delay: 2500 },
        removeOnComplete: { age: 604800, count: 1000 },
        removeOnFail: { age: 2592000, count: 5000 },
      });
    });

    it('uses production defaults when queue settings are absent', () => {
      const configService = new ConfigService();
      const options = getEnterpriseJobOptions(configService, 'job-default');

      expect(options.jobId).toBe('job-default');
      expect(options.attempts).toBe(5);
      expect(options.backoff).toEqual({ type: 'exponential', delay: 10000 });
    });
  });
});
