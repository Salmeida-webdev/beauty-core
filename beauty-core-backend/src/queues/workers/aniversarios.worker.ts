import { formatQueueTrace, getQueueTraceMetadata } from '../utils/queue-trace.util';
import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AcaoAuditoria,
  StatusAuditoria,
  TipoUsuarioAuditoria,
} from '@prisma/client';
import { Job, Worker } from 'bullmq';

import { ANIVERSARIOS_QUEUE } from '../constants/queue-names';
import { AniversarioJob } from '../jobs/aniversarios.job';

import { AuditoriaService } from '../../modules/auditoria/auditoria.service';
import { DeadLetterQueueService } from '../services/dead-letter-queue.service';

@Injectable()
export class AniversariosWorker
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(
    AniversariosWorker.name,
  );

  private worker?: Worker<AniversarioJob>;

  constructor(
    private readonly configService: ConfigService,
    private readonly auditoriaService: AuditoriaService,
    private readonly deadLetterQueueService: DeadLetterQueueService,
  ) {}

  onModuleInit() {
    this.worker = new Worker<AniversarioJob>(
      ANIVERSARIOS_QUEUE,
      async (job: Job<AniversarioJob>) =>
        this.processar(job),
      {
        connection: {
          host:
            this.configService.get<string>(
              'REDIS_HOST',
            ) || 'localhost',

          port: Number(
            this.configService.get<string>(
              'REDIS_PORT',
            ) || 6379,
          ),

          password:
            this.configService.get<string>(
              'REDIS_PASSWORD',
            ) || undefined,

          maxRetriesPerRequest: null,
        },
      
      concurrency: Number(this.configService.get('QUEUE_CONCURRENCY_ANIVERSARIOS', 3)),
    },
    );

    this.worker.on('failed', async (job, error) => {
      if (!job) return;

      await this.deadLetterQueueService.moveToDlq({
        sourceQueue: ANIVERSARIOS_QUEUE,
        job,
        error,
      });
    });


    this.worker.on(
      'completed',
      async (job) => {
        this.logger.log(
          `[BULLMQ] job concluido queue=${ANIVERSARIOS_QUEUE} jobId=${job.id} ${formatQueueTrace(job)} empresaId=${job.data.empresaId}`,
        );

        await this.auditoriaService.registrarJob({
          empresaId: job.data.empresaId,

          usuarioId: job.data.usuarioId,

          clienteId: job.data.clienteId,

          tipoUsuario:
            'SISTEMA' as TipoUsuarioAuditoria,

          acao:
            'JOB_CONCLUIDO' as AcaoAuditoria,

          modulo: 'BULLMQ',

          recurso: 'BullMQJob',

          recursoId: String(job.id),

          metadata: {
          ...getQueueTraceMetadata(job),
            queue: ANIVERSARIOS_QUEUE,
            worker: AniversariosWorker.name,
            jobName: job.name,
            status: 'completed',
            attemptsMade: job.attemptsMade,
            dataReferencia:
              job.data.dataReferencia,
          },

          mensagem:
            'Job de aniversÃ¡rios concluido.',
        });
      },
    );

    this.worker.on(
      'failed',
      async (job, error) => {
        this.logger.error(
          `[BULLMQ] job falhou queue=${ANIVERSARIOS_QUEUE} jobId=${
            job?.id ?? '-'
          } empresaId=${
            job?.data?.empresaId ?? '-'
          } erro=${error.message}`,
          error.stack,
        );

        await this.auditoriaService.registrarJob({
          empresaId: job?.data?.empresaId,

          usuarioId: job?.data?.usuarioId,

          clienteId: job?.data?.clienteId,

          tipoUsuario:
            'SISTEMA' as TipoUsuarioAuditoria,

          acao:
            'JOB_FALHOU' as AcaoAuditoria,

          status:
            'FALHA' as StatusAuditoria,

          modulo: 'BULLMQ',

          recurso: 'BullMQJob',

          recursoId: job?.id
            ? String(job.id)
            : undefined,

          metadata: {
          ...getQueueTraceMetadata(job),
            queue: ANIVERSARIOS_QUEUE,
            worker: AniversariosWorker.name,
            jobName: job?.name,
            status: 'failed',
            attemptsMade: job?.attemptsMade,
            error: error.message,
            dataReferencia:
              job?.data?.dataReferencia,
          },

          mensagem:
            'Job de aniversÃ¡rios falhou.',
        });
      },
    );
  }

  async onModuleDestroy() {
    await this.worker?.close();
  }

  private async processar(
    job: Job<AniversarioJob>,
  ) {
    const startedAt = Date.now();

    const {
      empresaId,
      clienteId,
      usuarioId,
      dataReferencia,
      nome,
      telefone,
      mensagem,
      metadata,
    } = job.data;

    this.logger.log(
      `[BULLMQ] job iniciado queue=${ANIVERSARIOS_QUEUE} jobId=${job.id} ${formatQueueTrace(job)} empresaId=${empresaId}`,
    );

    await this.auditoriaService.registrarJob({
      empresaId,

      usuarioId,

      clienteId,

      tipoUsuario:
        'SISTEMA' as TipoUsuarioAuditoria,

      acao:
        'JOB_INICIADO' as AcaoAuditoria,

      modulo: 'BULLMQ',

      recurso: 'BullMQJob',

      recursoId: String(job.id),

      metadata: {
          ...getQueueTraceMetadata(job),
        queue: ANIVERSARIOS_QUEUE,
        worker: AniversariosWorker.name,
        jobName: job.name,
        status: 'started',
        attemptsMade: job.attemptsMade,
        startedAt,
        dataReferencia,
        nome,
        telefone,
        ...metadata,
      },

      mensagem:
        'Job de aniversÃ¡rios iniciado.',
    });

    return {
      status: 'ok',
      empresaId,
      clienteId,
      usuarioId,
      dataReferencia,
      nome,
      telefone,
      mensagem,
      tempoMs:
        Date.now() - startedAt,
    };
  }
}
