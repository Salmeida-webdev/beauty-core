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
import {} from '@prisma/client';
import { Job, Worker } from 'bullmq';

import { WHATSAPP_QUEUE } from '../constants/queue-names';
import { WhatsappJob } from '../jobs/whatsapp.job';

import { MensagensWhatsappService } from '../../modules/mensagens-whatsapp/mensagens-whatsapp.service';
import { AuditoriaService } from '../../modules/auditoria/auditoria.service';
import { DeadLetterQueueService } from '../services/dead-letter-queue.service';

@Injectable()
export class WhatsappWorker implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(WhatsappWorker.name);
  private worker?: Worker<WhatsappJob>;

  constructor(
    private readonly configService: ConfigService,
    private readonly mensagensWhatsappService: MensagensWhatsappService,
    private readonly auditoriaService: AuditoriaService,
    private readonly deadLetterQueueService: DeadLetterQueueService,
  ) {}

  onModuleInit() {
    this.worker = new Worker<WhatsappJob>(
      WHATSAPP_QUEUE,
      async (job: Job<WhatsappJob>) => this.processar(job),
      {
        connection: {
          host: this.configService.get<string>('REDIS_HOST') || 'localhost',
          port: Number(this.configService.get<string>('REDIS_PORT') || 6379),
          password:
            this.configService.get<string>('REDIS_PASSWORD') || undefined,
          maxRetriesPerRequest: null,
        },

        concurrency: Number(
          this.configService.get('QUEUE_CONCURRENCY_WHATSAPP', 10),
        ),
      },
    );

    this.worker.on('failed', (job, error) => {
      void (async () => {
        if (!job) return;

        await this.deadLetterQueueService.moveToDlq({
          sourceQueue: WHATSAPP_QUEUE,
          job,
          error,
        });
      })();
    });

    this.worker.on('completed', (job) => {
      void (async () => {
        this.logger.log(
          `[BULLMQ] job concluido queue=${WHATSAPP_QUEUE} jobId=${job.id} ${formatQueueTrace(job)} empresaId=${job.data.empresaId}`,
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
            queue: WHATSAPP_QUEUE,
            worker: WhatsappWorker.name,
            jobName: job.name,
            status: 'completed',
            attemptsMade: job.attemptsMade,
            data: this.criarResumoSeguroJob(job),
          },
          mensagem: 'Job de WhatsApp concluido.',
        });
      })();
    });

    this.worker.on('failed', (job, error) => {
      void (async () => {
        this.logger.error(
          `[BULLMQ] job falhou queue=${WHATSAPP_QUEUE} jobId=${
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
            queue: WHATSAPP_QUEUE,
            worker: WhatsappWorker.name,
            jobName: job?.name,
            status: 'failed',
            attemptsMade: job?.attemptsMade,
            error: error.message,
            stack: error.stack,
            data: job ? this.criarResumoSeguroJob(job) : undefined,
          },
          mensagem: 'Job de WhatsApp falhou.',
        });
      })();
    });
  }

  async onModuleDestroy() {
    await this.worker?.close();
  }

  private async processar(job: Job<WhatsappJob>) {
    const startedAt = Date.now();

    this.logger.log(
      `[BULLMQ] job iniciado queue=${WHATSAPP_QUEUE} jobId=${job.id} ${formatQueueTrace(job)} empresaId=${job.data.empresaId}`,
    );

    const {
      empresaId,
      telefone,
      destinatario,
      mensagem,
      clienteId,
      usuarioId,
      tipo,
      metadata,
    } = job.data;

    const numero = telefone ?? destinatario;
    const metadataSegura = this.normalizarMetadata(metadata);

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
        queue: WHATSAPP_QUEUE,
        worker: WhatsappWorker.name,
        jobName: job.name,
        status: 'started',
        attemptsMade: job.attemptsMade,
        startedAt,
        empresaId,
        telefone: numero,
        tipo,
        ...metadataSegura,
      },
      mensagem: 'Job de WhatsApp iniciado.',
    });

    if (!numero || !mensagem) {
      if (this.ehJobGlobalDoScheduler(job)) {
        return this.processarJobGlobalDoScheduler(job, startedAt);
      }

      if (!numero) {
        throw new Error(
          'Telefone/destinatario nÃ£o informado no job de WhatsApp.',
        );
      }

      throw new Error('Mensagem nÃ£o informada no job de WhatsApp.');
    }

    const registro =
      metadataSegura.mensagemId && typeof metadataSegura.mensagemId === 'string'
        ? await this.mensagensWhatsappService.processarMensagemEnfileirada(
            empresaId,
            metadataSegura.mensagemId,
            numero,
            mensagem,
          )
        : await this.mensagensWhatsappService
            .prepararMensagemCampanha(empresaId, numero, mensagem)
            .then((preparada) =>
              this.mensagensWhatsappService.processarMensagemEnfileirada(
                empresaId,
                preparada.id,
                numero,
                mensagem,
              ),
            );

    return {
      status:
        registro.status === 'ENVIADA' ? 'ok' : registro.status.toLowerCase(),
      tipoProcessamento: 'MENSAGEM_WHATSAPP',
      mensagemId: registro.id,
      empresaId,
      telefone: numero,
      clienteId,
      usuarioId,
      tempoMs: Date.now() - startedAt,
    };
  }

  private async processarJobGlobalDoScheduler(
    job: Job<WhatsappJob>,
    startedAt: number,
  ) {
    const { empresaId, tipo, metadata } = job.data;
    const metadataSegura = this.normalizarMetadata(metadata);

    this.logger.log(
      `[BULLMQ] job global de scheduler tratado sem destinatario queue=${WHATSAPP_QUEUE} jobId=${job.id} ${formatQueueTrace(job)} tipo=${tipo}`,
    );

    await this.auditoriaService.registrarJob({
      empresaId,
      tipoUsuario: 'SISTEMA',
      acao: 'PROCESSAR_JOB',
      modulo: 'BULLMQ',
      recurso: 'BullMQJob',
      recursoId: String(job.id),
      metadata: {
        ...getQueueTraceMetadata(job),
        queue: WHATSAPP_QUEUE,
        worker: WhatsappWorker.name,
        jobName: job.name,
        status: 'scheduler_global_processed',
        attemptsMade: job.attemptsMade,
        tipo,
        ...metadataSegura,
      },
      mensagem:
        'Job global de Scheduler para WhatsApp processado sem envio individual.',
    });

    return {
      status: 'ok',
      tipoProcessamento: 'SCHEDULER_GLOBAL',
      mensagem:
        'Job global de Scheduler recebido e processado sem destinatario individual.',
      queue: WHATSAPP_QUEUE,
      jobId: job.id,
      empresaId,
      tipo,
      metadata: metadataSegura,
      tempoMs: Date.now() - startedAt,
    };
  }

  private ehJobGlobalDoScheduler(job: Job<WhatsappJob>): boolean {
    const { empresaId, tipo, metadata } = job.data;
    const metadataSegura = this.normalizarMetadata(metadata);

    const origem =
      typeof metadataSegura.origem === 'string'
        ? metadataSegura.origem.toLowerCase()
        : '';
    const rotina =
      typeof metadataSegura.rotina === 'string'
        ? metadataSegura.rotina.toLowerCase()
        : '';

    const tipoNormalizado = String(tipo ?? '').toUpperCase();

    return (
      empresaId === 'SCHEDULER_GLOBAL' ||
      origem === 'scheduler' ||
      rotina.includes('lembrete') ||
      rotina.includes('agendamento') ||
      tipoNormalizado === 'LEMBRETES_AGENDAMENTO' ||
      tipoNormalizado === 'LEMBRETE_AGENDAMENTO' ||
      tipoNormalizado === 'CAMPANHAS_AGENDADAS' ||
      tipoNormalizado === 'ANIVERSARIOS_DIARIOS' ||
      tipoNormalizado === 'PACOTES_VENCIDOS'
    );
  }

  private normalizarMetadata(metadata: unknown): Record<string, unknown> {
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

  private criarResumoSeguroJob(job: Job<WhatsappJob>) {
    return {
      id: job.id,
      name: job.name,
      queueName: job.queueName,
      attemptsMade: job.attemptsMade,
      data: {
        empresaId: job.data.empresaId,
        usuarioId: job.data.usuarioId,
        clienteId: job.data.clienteId,
        telefone: job.data.telefone,
        destinatario: job.data.destinatario,
        tipo: job.data.tipo,
        metadata: this.normalizarMetadata(job.data.metadata),
      },
    };
  }
}
