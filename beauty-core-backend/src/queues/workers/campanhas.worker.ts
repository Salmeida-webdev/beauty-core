import {
  formatQueueTrace,
  getQueueTraceMetadata,
} from '../utils/queue-trace.util';
import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Job, Worker } from 'bullmq';

import { CAMPANHAS_QUEUE } from '../constants/queue-names';
import { CampanhaJob } from '../jobs/campanhas.job';

import { AuditoriaService } from '../../modules/auditoria/auditoria.service';
import { DeadLetterQueueService } from '../services/dead-letter-queue.service';

@Injectable()
export class CampanhasWorker implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(CampanhasWorker.name);
  private worker?: Worker<CampanhaJob>;

  constructor(
    private readonly configService: ConfigService,
    private readonly auditoriaService: AuditoriaService,
    private readonly deadLetterQueueService: DeadLetterQueueService,
  ) {}

  onModuleInit() {
    this.worker = new Worker<CampanhaJob>(
      CAMPANHAS_QUEUE,
      async (job: Job<CampanhaJob>) => this.processar(job),
      {
        connection: {
          host: this.configService.get<string>('REDIS_HOST') || 'localhost',

          port: Number(this.configService.get<string>('REDIS_PORT') || 6379),

          password:
            this.configService.get<string>('REDIS_PASSWORD') || undefined,

          maxRetriesPerRequest: null,
        },

        concurrency: Number(
          this.configService.get('QUEUE_CONCURRENCY_CAMPANHAS', 3),
        ),
      },
    );

    this.worker.on('failed', (job, error) => {
      void (async () => {
        if (!job) return;

        await this.deadLetterQueueService.moveToDlq({
          sourceQueue: CAMPANHAS_QUEUE,
          job,
          error,
        });
      })();
    });

    this.worker.on('completed', (job) => {
      void (async () => {
        this.logger.log(
          `[BULLMQ] job concluido queue=${CAMPANHAS_QUEUE} jobId=${job.id} ${formatQueueTrace(job)} empresaId=${job.data.empresaId}`,
        );

        await this.auditoriaService.registrarJob({
          empresaId: job.data.empresaId,
          usuarioId: job.data.usuarioId,
          clienteId: job.data.clienteId,
          tipoUsuario: 'SISTEMA',
          acao: 'JOB_CONCLUIDO',
          modulo: 'BULLMQ',
          recurso: 'BullMQJob',
          recursoId: String(job.id),
          metadata: {
            ...getQueueTraceMetadata(job),
            queue: CAMPANHAS_QUEUE,
            worker: CampanhasWorker.name,
            jobName: job.name,
            status: 'completed',
            attemptsMade: job.attemptsMade,
            campanhaId: job.data.campanhaId,
            tipo: job.data.tipo,
          },
          mensagem: 'Job de campanha concluido.',
        });
      })();
    });

    this.worker.on('failed', (job, error) => {
      void (async () => {
        this.logger.error(
          `[BULLMQ] job falhou queue=${CAMPANHAS_QUEUE} jobId=${
            job?.id ?? '-'
          } empresaId=${job?.data?.empresaId ?? '-'} erro=${error.message}`,
          error.stack,
        );

        await this.auditoriaService.registrarJob({
          empresaId: job?.data?.empresaId,
          usuarioId: job?.data?.usuarioId,
          clienteId: job?.data?.clienteId,
          tipoUsuario: 'SISTEMA',
          acao: 'JOB_FALHOU',
          status: 'FALHA',
          modulo: 'BULLMQ',
          recurso: 'BullMQJob',
          recursoId: job?.id ? String(job.id) : undefined,
          metadata: {
            ...getQueueTraceMetadata(job),
            queue: CAMPANHAS_QUEUE,
            worker: CampanhasWorker.name,
            jobName: job?.name,
            status: 'failed',
            attemptsMade: job?.attemptsMade,
            campanhaId: job?.data?.campanhaId,
            tipo: job?.data?.tipo,
            error: error.message,
          },
          mensagem: 'Job de campanha falhou.',
        });
      })();
    });
  }

  async onModuleDestroy() {
    await this.worker?.close();
  }

  private async processar(job: Job<CampanhaJob>) {
    const startedAt = Date.now();

    const {
      empresaId,
      campanhaId,
      usuarioId,
      clienteId,
      tipo,
      mensagem,
      metadata,
    } = job.data;

    this.logger.log(
      `[BULLMQ] job iniciado queue=${CAMPANHAS_QUEUE} jobId=${job.id} ${formatQueueTrace(job)} campanhaId=${campanhaId}`,
    );

    await this.auditoriaService.registrarJob({
      empresaId,
      usuarioId,
      clienteId,
      tipoUsuario: 'SISTEMA',
      acao: 'JOB_INICIADO',
      modulo: 'BULLMQ',
      recurso: 'BullMQJob',
      recursoId: String(job.id),
      metadata: {
        ...getQueueTraceMetadata(job),
        queue: CAMPANHAS_QUEUE,
        worker: CampanhasWorker.name,
        jobName: job.name,
        status: 'started',
        attemptsMade: job.attemptsMade,
        startedAt,
        campanhaId,
        tipo,
        ...metadata,
      },
      mensagem: 'Job de campanha iniciado.',
    });

    this.logger.debug({
      campanhaId,
      tipo,
      mensagem,
    });

    return {
      status: 'ok',
      empresaId,
      campanhaId,
      usuarioId,
      clienteId,
      tempoMs: Date.now() - startedAt,
    };
  }
}
