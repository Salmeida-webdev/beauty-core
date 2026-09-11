import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Job, Queue } from 'bullmq';

import { AuditoriaService } from '../../modules/auditoria/auditoria.service';
import {
  ANIVERSARIOS_QUEUE_PROVIDER,
  CAMPANHAS_QUEUE_PROVIDER,
  DLQ_QUEUE_PROVIDER,
  NOTIFICACOES_QUEUE_PROVIDER,
  RELATORIOS_QUEUE_PROVIDER,
  WHATSAPP_QUEUE_PROVIDER,
} from '../constants/queue-names';
import { getEnterpriseJobOptions } from '../utils/queue-options.util';

type JobData = {
  [key: string]: unknown;
  empresaId?: string;
  usuarioId?: string;
  clienteId?: string;
  metadata?: Record<string, unknown>;
};

type DeadLetterJobData = JobData & {
  originalQueue: string;
  originalJobId: string;
  originalName: string;
  originalData: JobData;
  originalOpts?: unknown;
  failedReason: string;
  stacktrace?: string[];
  attemptsMade: number;
  movedToDlqAt: string;
};

type AuditoriaCompat = {
  registrarJob?: (payload: Record<string, unknown>) => Promise<unknown>;
  registrar?: (payload: Record<string, unknown>) => Promise<unknown>;
  criar?: (payload: Record<string, unknown>) => Promise<unknown>;
  registrarAuditoria?: (payload: Record<string, unknown>) => Promise<unknown>;
};

@Injectable()
export class DeadLetterQueueService {
  private readonly logger = new Logger(DeadLetterQueueService.name);

  constructor(
    @Inject(DLQ_QUEUE_PROVIDER)
    private readonly dlqQueue: Queue<DeadLetterJobData>,

    @Inject(NOTIFICACOES_QUEUE_PROVIDER)
    private readonly notificacoesQueue: Queue<JobData>,

    @Inject(WHATSAPP_QUEUE_PROVIDER)
    private readonly whatsappQueue: Queue<JobData>,

    @Inject(CAMPANHAS_QUEUE_PROVIDER)
    private readonly campanhasQueue: Queue<JobData>,

    @Inject(ANIVERSARIOS_QUEUE_PROVIDER)
    private readonly aniversariosQueue: Queue<JobData>,

    @Inject(RELATORIOS_QUEUE_PROVIDER)
    private readonly relatoriosQueue: Queue<JobData>,

    private readonly auditoriaService: AuditoriaService,
    private readonly configService: ConfigService,
  ) {}

  private getQueueByName(queueName: string): Queue<JobData> {
    const queues: Record<string, Queue> = {
      notificacoes: this.notificacoesQueue,
      whatsapp: this.whatsappQueue,
      campanhas: this.campanhasQueue,
      aniversarios: this.aniversariosQueue,
      relatorios: this.relatoriosQueue,
    };

    const queue = queues[queueName];

    if (!queue) {
      throw new BadRequestException(`Fila original inválida: ${queueName}`);
    }

    const typedQueue = queue as unknown as Queue<JobData>;
    return typedQueue;
  }

  private async registrarAuditoriaSegura(payload: Record<string, unknown>) {
    try {
      const service = this.auditoriaService as unknown as AuditoriaCompat;

      if (typeof service.registrarJob === 'function') {
        await service.registrarJob(payload);
        return;
      }

      if (typeof service.registrar === 'function') {
        await service.registrar(payload);
        return;
      }

      if (typeof service.criar === 'function') {
        await service.criar(payload);
        return;
      }

      if (typeof service.registrarAuditoria === 'function') {
        await service.registrarAuditoria(payload);
      }
    } catch (error) {
      this.logger.warn(
        `[AUDITORIA_DLQ] falha ao registrar auditoria: ${
          error instanceof Error ? error.message : 'erro_desconhecido'
        }`,
      );
    }
  }

  async moveToDlq<T extends object>(params: {
    sourceQueue: string;
    job: Job<T>;
    error: Error;
  }) {
    const { sourceQueue, job, error } = params;

    const attempts = Number(job.opts.attempts ?? 1);
    const attemptsMade = Number(job.attemptsMade ?? 0);

    if (attemptsMade < attempts) {
      return null;
    }

    const dlqJobId = `dlq:${sourceQueue}:${job.id}`;
    const exists = await this.dlqQueue.getJob(dlqJobId);

    if (exists) {
      return exists;
    }

    const jobData = job.data as unknown as JobData;

    const payload = {
      originalQueue: sourceQueue,
      originalJobId: String(job.id),
      originalName: job.name,
      originalData: jobData,
      originalOpts: job.opts,
      failedReason: error.message,
      stacktrace: job.stacktrace ?? undefined,
      attemptsMade,
      movedToDlqAt: new Date().toISOString(),
    };

    const dlqJob = await this.dlqQueue.add(
      'dead-letter-job',
      payload,
      getEnterpriseJobOptions(this.configService, dlqJobId),
    );

    this.logger.error(
      `[DLQ] job movido sourceQueue=${sourceQueue} originalJobId=${job.id} dlqJobId=${dlqJob.id}`,
    );

    await this.registrarAuditoriaSegura({
      empresaId: jobData?.empresaId,
      usuarioId: jobData?.usuarioId,
      clienteId: jobData?.clienteId,
      acao: 'JOB_DLQ',
      status: 'FALHA',
      modulo: 'BULLMQ_DLQ',
      recurso: 'BullMQJob',
      recursoId: String(job.id),
      mensagem: 'Job movido para DLQ após esgotar tentativas.',
      metadata: payload,
    });

    return dlqJob;
  }

  async listarDlq(limit = 50) {
    const safeLimit = Math.min(Math.max(Number(limit) || 50, 1), 200);

    const jobs = await this.dlqQueue.getJobs(
      ['waiting', 'delayed', 'failed', 'completed'],
      0,
      safeLimit - 1,
      false,
    );

    return jobs.map((job) => ({
      id: job.id,
      name: job.name,
      data: job.data,
      attemptsMade: job.attemptsMade,
      failedReason: job.failedReason,
      timestamp: job.timestamp,
      processedOn: job.processedOn,
      finishedOn: job.finishedOn,
    }));
  }

  async reprocessar(jobId: string) {
    const dlqJob = await this.dlqQueue.getJob(jobId);

    if (!dlqJob) {
      throw new NotFoundException('Job não encontrado na DLQ.');
    }

    const data = dlqJob.data;

    const sourceQueue = this.getQueueByName(data.originalQueue);
    const originalJobId = String(data.originalJobId);

    const originalJob = await sourceQueue.getJob(originalJobId);

    if (originalJob) {
      const state = await originalJob.getState();

      if (['active', 'waiting', 'delayed'].includes(state)) {
        throw new BadRequestException(
          `Job original ainda está em estado ${state}. Reprocessamento bloqueado para evitar duplicidade.`,
        );
      }

      await originalJob.remove();
    }

    const newJob = await sourceQueue.add(
      data.originalName,
      {
        ...data.originalData,
        metadata: {
          ...(data.originalData?.metadata ?? {}),
          reprocessado: true,
          dlqJobId: jobId,
          reprocessadoEm: new Date().toISOString(),
        },
      },
      getEnterpriseJobOptions(this.configService, originalJobId),
    );

    await dlqJob.remove();

    await this.registrarAuditoriaSegura({
      empresaId: data.originalData?.empresaId,
      usuarioId: data.originalData?.usuarioId,
      clienteId: data.originalData?.clienteId,
      acao: 'JOB_REPROCESSADO',
      status: 'SUCESSO',
      modulo: 'BULLMQ_DLQ',
      recurso: 'BullMQJob',
      recursoId: String(newJob.id),
      mensagem: 'Job reprocessado a partir da DLQ.',
      metadata: {
        dlqJobId: jobId,
        originalQueue: data.originalQueue,
        originalJobId,
      },
    });

    return {
      message: 'Job reprocessado com sucesso.',
      originalQueue: data.originalQueue,
      jobId: newJob.id,
    };
  }
}
