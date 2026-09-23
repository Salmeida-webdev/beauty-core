import { ConfigService } from '@nestjs/config';
import { createQueueJobId } from '../../src/queues/utils/queue-job-id.util';
import { getEnterpriseJobOptions } from '../../src/queues/utils/queue-options.util';

describe('Beauty Core queues utilities', () => {
  describe('createQueueJobId', () => {
    it('normalizes all identity parts and produces a stable bounded id', () => {
      const params = {
        empresaId: ' empresa-á ',
        tipo: 'Relatório Diário',
        referenciaId: 'registro/42',
        dataReferencia: '2026-09-22',
        extra: 'turno manhã',
      };

      const jobId = createQueueJobId(params);

      expect(jobId).toMatch(/^bc-empresa-a-relatorio-diario-registro-42-/);
      expect(jobId).toMatch(/[0-9a-f]{24}$/);
      expect(jobId.length).toBeLessThanOrEqual(180);
      expect(createQueueJobId({ ...params })).toBe(jobId);
    });

    it('uses global scope when empresaId is absent and separates references', () => {
      const globalJobId = createQueueJobId({ tipo: 'NOTIFICACAO' });
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

      expect(globalJobId).toContain('bc-global-notificacao');
      expect(firstReference).toContain('empresa-a-notificacao-cliente-1');
      expect(secondReference).toContain('empresa-a-notificacao-cliente-2');
      expect(firstReference).not.toBe(secondReference);
    });
  });

  describe('getEnterpriseJobOptions', () => {
    it('maps queue configuration and retention policies to BullMQ options', () => {
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

    it('uses the production defaults when queue settings are absent', () => {
      const options = getEnterpriseJobOptions(
        new ConfigService(),
        'job-default',
      );

      expect(options.jobId).toBe('job-default');
      expect(options.attempts).toBe(5);
      expect(options.backoff).toEqual({ type: 'exponential', delay: 10000 });
    });
  });
});
