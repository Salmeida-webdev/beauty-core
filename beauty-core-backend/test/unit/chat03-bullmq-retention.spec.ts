import { ConfigService } from '@nestjs/config';
import { Queue } from 'bullmq';

import { BackupService } from '../../src/backup/backup.service';
import { PrismaService } from '../../src/database/prisma/prisma.service';
import { QueuesService } from '../../src/queues/services/queues.service';
import { RequestContextService } from '../../src/common/context/request-context.service';

describe('Chat 03 - retencao fisica BullMQ', () => {
  it('limpa jobs completed/failed por fila com limites definidos', async () => {
    const clean = jest.fn().mockResolvedValue(['job-id']);
    const queue = { clean } as unknown as Queue;
    const context = {
      getContext: jest.fn().mockReturnValue(undefined),
    } as unknown as RequestContextService;
    const queues = new QueuesService(
      queue,
      queue,
      queue,
      queue,
      queue,
      {} as ConfigService,
      context,
    );

    const result = await queues.limparJobsAntigos();

    expect(result.status).toBe('SUCESSO');
    expect(result.retentionCompletedJobsDays).toBe(30);
    expect(result.retentionFailedJobsDays).toBe(90);
    expect(result.completedRemoved).toBe(5);
    expect(result.failedRemoved).toBe(5);
    expect(clean).toHaveBeenCalledTimes(10);
    expect(clean).toHaveBeenCalledWith(
      30 * 24 * 60 * 60 * 1000,
      10000,
      'completed',
    );
    expect(clean).toHaveBeenCalledWith(
      90 * 24 * 60 * 60 * 1000,
      10000,
      'failed',
    );
  });

  it('integra a limpeza fisica ao job operacional do BackupService', async () => {
    const prisma = {
      sessao: {
        deleteMany: jest.fn().mockResolvedValue({ count: 0 }),
      },
      auditoriaSistema: {
        create: jest.fn().mockResolvedValue({ id: 'audit-id' }),
      },
    } as unknown as PrismaService;
    const queues = {
      limparJobsAntigos: jest.fn().mockResolvedValue({
        status: 'SUCESSO' as const,
        retentionCompletedJobsDays: 30,
        retentionFailedJobsDays: 90,
        cleanLimitPerQueueAndStatus: 10000,
        completedRemoved: 2,
        failedRemoved: 1,
        queues: [],
      }),
    } as unknown as QueuesService;
    const service = new BackupService(prisma, queues);

    const result = await service.executarLimpezaOperacional();
    const jobs = result.results.find(
      (item) => item.job === 'limpeza_jobs_antigos',
    );

    expect(queues.limparJobsAntigos).toHaveBeenCalledTimes(1);
    expect(jobs?.status).toBe('SUCESSO');
    expect(jobs?.completedRemoved).toBe(2);
    expect(jobs?.failedRemoved).toBe(1);
  });
});
