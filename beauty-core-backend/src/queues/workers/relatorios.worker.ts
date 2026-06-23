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

import { RELATORIOS_QUEUE } from '../constants/queue-names';
import { RelatorioJob } from '../jobs/relatorios.job';

import { AuditoriaService } from '../../modules/auditoria/auditoria.service';
import { DeadLetterQueueService } from '../services/dead-letter-queue.service';

@Injectable()
export class RelatoriosWorker
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(RelatoriosWorker.name);
  private worker?: Worker<RelatorioJob>;

  constructor(
    private readonly configService: ConfigService,
    private readonly auditoriaService: AuditoriaService,
    private readonly deadLetterQueueService: DeadLetterQueueService,
  ) {}

  onModuleInit() {
    this.worker = new Worker<RelatorioJob>(
      RELATORIOS_QUEUE,
      async (job: Job<RelatorioJob>) => this.processar(job),
      {
        connection: {
          host:
            this.configService.get<string>('REDIS_HOST') ||
            'localhost',
          port: Number(
            this.configService.get<string>('REDIS_PORT') ||
              6379,
          ),
          password:
            this.configService.get<string>('REDIS_PASSWORD') ||
            undefined,
          maxRetriesPerRequest: null,
        },
      
      concurrency: Number(this.configService.get('QUEUE_CONCURRENCY_RELATORIOS', 1)),
    },
    );

    this.worker.on('failed', async (job, error) => {
      if (!job) return;

      await this.deadLetterQueueService.moveToDlq({
        sourceQueue: RELATORIOS_QUEUE,
        job,
        error,
      });
    });


    this.worker.on('completed', async (job) => {
      this.logger.log(
        `[BULLMQ] job concluido queue=${RELATORIOS_QUEUE} jobId=${job.id} ${formatQueueTrace(job)} empresaId=${job.data.empresaId}`,
      );

      await this.auditoriaService.registrarJob({
        empresaId: job.data.empresaId,
        usuarioId: job.data.usuarioId,
        tipoUsuario: 'SISTEMA' as TipoUsuarioAuditoria,
        acao: 'JOB_CONCLUIDO' as AcaoAuditoria,
        modulo: 'BULLMQ',
        recurso: 'BullMQJob',
        recursoId: String(job.id),
        metadata: {
          ...getQueueTraceMetadata(job),
          queue: RELATORIOS_QUEUE,
          worker: RelatoriosWorker.name,
          jobName: job.name,
          status: 'completed',
          attemptsMade: job.attemptsMade,
          tipo: job.data.tipo,
          tipoRelatorio: job.data.tipoRelatorio,
        },
        mensagem: 'Job de relatÃ³rio concluido.',
      });
    });

    this.worker.on('failed', async (job, error) => {
      this.logger.error(
        `[BULLMQ] job falhou queue=${RELATORIOS_QUEUE} jobId=${
          job?.id ?? '-'
        } empresaId=${
          job?.data?.empresaId ?? '-'
        } erro=${error.message}`,
        error.stack,
      );

      await this.auditoriaService.registrarJob({
        empresaId: job?.data?.empresaId,
        usuarioId: job?.data?.usuarioId,
        tipoUsuario: 'SISTEMA' as TipoUsuarioAuditoria,
        acao: 'JOB_FALHOU' as AcaoAuditoria,
        status: 'FALHA' as StatusAuditoria,
        modulo: 'BULLMQ',
        recurso: 'BullMQJob',
        recursoId: job?.id ? String(job.id) : undefined,
        metadata: {
          ...getQueueTraceMetadata(job),
          queue: RELATORIOS_QUEUE,
          worker: RelatoriosWorker.name,
          jobName: job?.name,
          status: 'failed',
          attemptsMade: job?.attemptsMade,
          error: error.message,
          tipo: job?.data?.tipo,
          tipoRelatorio: job?.data?.tipoRelatorio,
        },
        mensagem: 'Job de relatÃ³rio falhou.',
      });
    });
  }

  async onModuleDestroy() {
    await this.worker?.close();
  }

  private async processar(job: Job<RelatorioJob>) {
    const startedAt = Date.now();

    const {
      empresaId,
      usuarioId,
      tipo,
      tipoRelatorio,
      dataInicio,
      dataFim,
      metadata,
    } = job.data;

    const tipoFinal = tipoRelatorio ?? tipo ?? 'GERAL';

    this.logger.log(
      `[BULLMQ] job iniciado queue=${RELATORIOS_QUEUE} jobId=${job.id} ${formatQueueTrace(job)} empresaId=${empresaId} tipo=${tipoFinal}`,
    );

    await this.auditoriaService.registrarJob({
      empresaId,
      usuarioId,
      tipoUsuario: 'SISTEMA' as TipoUsuarioAuditoria,
      acao: 'JOB_INICIADO' as AcaoAuditoria,
      modulo: 'BULLMQ',
      recurso: 'BullMQJob',
      recursoId: String(job.id),
      metadata: {
          ...getQueueTraceMetadata(job),
        queue: RELATORIOS_QUEUE,
        worker: RelatoriosWorker.name,
        jobName: job.name,
        status: 'started',
        attemptsMade: job.attemptsMade,
        startedAt,
        tipo: tipoFinal,
        dataInicio,
        dataFim,
        ...metadata,
      },
      mensagem: 'Job de relatÃ³rio iniciado.',
    });

    return {
      status: 'ok',
      empresaId,
      usuarioId,
      tipo: tipoFinal,
      dataInicio,
      dataFim,
      tempoMs: Date.now() - startedAt,
    };
  }
}
