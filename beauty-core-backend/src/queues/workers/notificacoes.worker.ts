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
  TipoNotificacao,
  TipoUsuarioAuditoria,
} from '@prisma/client';
import { Job, Worker } from 'bullmq';

import { NOTIFICACOES_QUEUE } from '../constants/queue-names';
import { NotificacaoJob } from '../jobs/notificacoes.job';

import { NotificacoesService } from '../../modules/notificacoes/notificacoes.service';
import { AuditoriaService } from '../../modules/auditoria/auditoria.service';
import { DeadLetterQueueService } from '../services/dead-letter-queue.service';

@Injectable()
export class NotificacoesWorker
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(NotificacoesWorker.name);
  private worker?: Worker<NotificacaoJob>;

  constructor(
    private readonly configService: ConfigService,
    private readonly notificacoesService: NotificacoesService,
    private readonly auditoriaService: AuditoriaService,
    private readonly deadLetterQueueService: DeadLetterQueueService,
  ) {}

  onModuleInit() {
    this.worker = new Worker<NotificacaoJob>(
      NOTIFICACOES_QUEUE,
      async (job: Job<NotificacaoJob>) => this.processar(job),
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
      
      concurrency: Number(this.configService.get('QUEUE_CONCURRENCY_NOTIFICATIONS', this.configService.get('QUEUE_CONCURRENCY_NOTIFICACOES', 5))),
    },
    );

    this.worker.on('failed', async (job, error) => {
      if (!job) return;

      await this.deadLetterQueueService.moveToDlq({
        sourceQueue: NOTIFICACOES_QUEUE,
        job,
        error,
      });
    });


    this.worker.on('completed', async (job) => {
      this.logger.log(
        `[BULLMQ] job concluido queue=${NOTIFICACOES_QUEUE} jobId=${job.id} ${formatQueueTrace(job)} empresaId=${job.data.empresaId}`,
      );

      await this.auditoriaService.registrarJob({
        empresaId: job.data.empresaId,
        usuarioId: job.data.usuarioId,
        clienteId: job.data.clienteId,
        tipoUsuario: 'SISTEMA' as TipoUsuarioAuditoria,
        acao: 'JOB_CONCLUIDO' as AcaoAuditoria,
        modulo: 'BULLMQ',
        recurso: 'BullMQJob',
        recursoId: String(job.id),
        metadata: {
          ...getQueueTraceMetadata(job),
          queue: NOTIFICACOES_QUEUE,
          worker: NotificacoesWorker.name,
          jobName: job.name,
          status: 'completed',
          attemptsMade: job.attemptsMade,
          data: this.criarResumoSeguroJob(job),
        },
        mensagem: 'Job de notificaÃ§Ã£o concluido.',
      });
    });

    this.worker.on('failed', async (job, error) => {
      this.logger.error(
        `[BULLMQ] job falhou queue=${NOTIFICACOES_QUEUE} jobId=${
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
        tipoUsuario: 'SISTEMA' as TipoUsuarioAuditoria,
        acao: 'JOB_FALHOU' as AcaoAuditoria,
        status: 'FALHA' as StatusAuditoria,
        modulo: 'BULLMQ',
        recurso: 'BullMQJob',
        recursoId: job?.id ? String(job.id) : undefined,
        metadata: {
          ...getQueueTraceMetadata(job),
          queue: NOTIFICACOES_QUEUE,
          worker: NotificacoesWorker.name,
          jobName: job?.name,
          status: 'failed',
          attemptsMade: job?.attemptsMade,
          error: error.message,
          stack: error.stack,
          data: job ? this.criarResumoSeguroJob(job) : undefined,
        },
        mensagem: 'Job de notificaÃ§Ã£o falhou.',
      });
    });
  }

  async onModuleDestroy() {
    await this.worker?.close();
  }

  private async processar(job: Job<NotificacaoJob>) {
    const startedAt = Date.now();

    this.logger.log(
      `[BULLMQ] job iniciado queue=${NOTIFICACOES_QUEUE} jobId=${job.id} ${formatQueueTrace(job)} empresaId=${job.data.empresaId}`,
    );

    const {
      empresaId,
      usuarioId,
      clienteId,
      titulo,
      mensagem,
      metadata,
    } = job.data;

    const tipo = job.data.tipo as TipoNotificacao | undefined;
    const metadataSegura = this.normalizarMetadata(metadata);

    await this.auditoriaService.registrarJob({
      empresaId,
      usuarioId,
      clienteId,
      tipoUsuario: 'SISTEMA' as TipoUsuarioAuditoria,
      acao: 'JOB_INICIADO' as AcaoAuditoria,
      modulo: 'BULLMQ',
      recurso: 'BullMQJob',
      recursoId: String(job.id),
      metadata: {
          ...getQueueTraceMetadata(job),
        queue: NOTIFICACOES_QUEUE,
        worker: NotificacoesWorker.name,
        jobName: job.name,
        status: 'started',
        attemptsMade: job.attemptsMade,
        startedAt,
        empresaId,
        usuarioId,
        clienteId,
        tipo: job.data.tipo,
        ...metadataSegura,
      },
      mensagem: 'Job de notificaÃ§Ã£o iniciado.',
    });

    if (this.ehJobGlobalDoScheduler(job)) {
      return this.processarJobGlobalDoScheduler(
        job,
        startedAt,
      );
    }

    if (!tipo) {
      throw new Error(
        'tipo Ã© obrigatÃ³rio para criar notificaÃ§Ã£o automÃ¡tica.',
      );
    }

    if (!usuarioId) {
      throw new Error(
        'usuarioId Ã© obrigatÃ³rio para criar notificaÃ§Ã£o automÃ¡tica.',
      );
    }

    if (!titulo) {
      throw new Error(
        'titulo Ã© obrigatÃ³rio para criar notificaÃ§Ã£o automÃ¡tica.',
      );
    }

    if (!mensagem) {
      throw new Error(
        'mensagem Ã© obrigatÃ³ria para criar notificaÃ§Ã£o automÃ¡tica.',
      );
    }

    const notificacao =
      await this.notificacoesService.criarAutomatica({
        empresaId,
        usuarioId,
        tipo,
        titulo,
        mensagem,
      });

    return {
      status: 'ok',
      tipoProcessamento: 'NOTIFICACAO_INDIVIDUAL',
      notificacaoId: notificacao?.id ?? null,
      empresaId,
      usuarioId,
      clienteId,
      tempoMs: Date.now() - startedAt,
    };
  }

  private async processarJobGlobalDoScheduler(
    job: Job<NotificacaoJob>,
    startedAt: number,
  ) {
    const {
      empresaId,
      usuarioId,
      clienteId,
      metadata,
    } = job.data;

    const metadataSegura = this.normalizarMetadata(metadata);
    const tipo = String(job.data.tipo ?? '').toUpperCase();

    this.logger.log(
      `[BULLMQ] job global de scheduler tratado sem usuario individual queue=${NOTIFICACOES_QUEUE} jobId=${job.id} ${formatQueueTrace(job)} tipo=${tipo}`,
    );

    await this.auditoriaService.registrarJob({
      empresaId,
      usuarioId,
      clienteId,
      tipoUsuario: 'SISTEMA' as TipoUsuarioAuditoria,
      acao: 'PROCESSAR_JOB' as AcaoAuditoria,
      modulo: 'BULLMQ',
      recurso: 'BullMQJob',
      recursoId: String(job.id),
      metadata: {
          ...getQueueTraceMetadata(job),
        queue: NOTIFICACOES_QUEUE,
        worker: NotificacoesWorker.name,
        jobName: job.name,
        status: 'scheduler_global_processed',
        attemptsMade: job.attemptsMade,
        empresaId,
        usuarioId,
        clienteId,
        tipo,
        ...metadataSegura,
      },
      mensagem:
        'Job global de Scheduler para notificaÃ§Ãµes processado sem criaÃ§Ã£o individual.',
    });

    return {
      status: 'ok',
      tipoProcessamento: 'SCHEDULER_GLOBAL',
      mensagem:
        'Job global de Scheduler recebido e processado sem usuario individual.',
      queue: NOTIFICACOES_QUEUE,
      jobId: job.id,
      empresaId,
      usuarioId,
      clienteId,
      tipo,
      metadata: metadataSegura,
      tempoMs: Date.now() - startedAt,
    };
  }

  private ehJobGlobalDoScheduler(job: Job<NotificacaoJob>): boolean {
    const { empresaId, metadata } = job.data;
    const metadataSegura = this.normalizarMetadata(metadata);

    const origem = String(metadataSegura.origem ?? '').toLowerCase();
    const rotina = String(metadataSegura.rotina ?? '').toLowerCase();
    const tipoNormalizado = String(job.data.tipo ?? '').toUpperCase();

    return (
      empresaId === 'SCHEDULER_GLOBAL' ||
      origem === 'scheduler' ||
      rotina.includes('pacotes') ||
      rotina.includes('vencidos') ||
      rotina.includes('aniversarios') ||
      rotina.includes('aniversÃ¡rios') ||
      rotina.includes('notificacoes') ||
      rotina.includes('notificaÃ§Ãµes') ||
      rotina.includes('relatorios') ||
      rotina.includes('relatÃ³rios') ||
      tipoNormalizado === 'PACOTES_VENCIDOS' ||
      tipoNormalizado === 'ANIVERSARIOS_DIARIOS' ||
      tipoNormalizado === 'ANIVERSARIOS' ||
      tipoNormalizado === 'RELATORIOS_DIARIOS' ||
      tipoNormalizado === 'RELATORIOS' ||
      tipoNormalizado === 'LIMPEZA_NOTIFICACOES' ||
      tipoNormalizado === 'LIMPEZA_NOTIFICAÃ‡Ã•ES'
    );
  }

  private normalizarMetadata(
    metadata: unknown,
  ): Record<string, unknown> {
    if (!metadata || typeof metadata !== 'object') {
      return {};
    }

    if (Array.isArray(metadata)) {
      return {
        itens: metadata,
      };
    }

    return metadata as Record<string, unknown>;
  }

  private criarResumoSeguroJob(job: Job<NotificacaoJob>) {
    return {
      id: job.id,
      name: job.name,
      queueName: job.queueName,
      attemptsMade: job.attemptsMade,
      data: {
        empresaId: job.data.empresaId,
        usuarioId: job.data.usuarioId,
        clienteId: job.data.clienteId,
        tipo: job.data.tipo,
        titulo: job.data.titulo,
        mensagem: job.data.mensagem,
        metadata: this.normalizarMetadata(job.data.metadata),
      },
    };
  }
}
