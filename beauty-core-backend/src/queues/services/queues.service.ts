import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bullmq';

import { RequestContextService } from '../../common/context/request-context.service';
import {
  ANIVERSARIOS_QUEUE_PROVIDER,
  CAMPANHAS_QUEUE_PROVIDER,
  NOTIFICACOES_QUEUE_PROVIDER,
  RELATORIOS_QUEUE_PROVIDER,
  WHATSAPP_QUEUE_PROVIDER,
} from '../constants/queue-names';
import { createQueueJobId } from '../utils/queue-job-id.util';
import { getEnterpriseJobOptions } from '../utils/queue-options.util';

type QueueJobPayload = Record<string, any>;

type AddJobResult = {
  /**
   * Alias compatível com retornos antigos do BullMQ Job.
   * Mantém módulos existentes que usam job.id sem quebrar.
   */
  id: string | number | undefined;

  /**
   * Chave idempotente oficial do job.
   */
  jobId: string | number | undefined;

  duplicated: boolean;
  state?: string;
};

type QueueTraceMetadata = {
  requestId: string | null;
  correlationId: string | null;
};

@Injectable()
export class QueuesService {
  private readonly logger = new Logger(QueuesService.name);

  constructor(
    @Inject(NOTIFICACOES_QUEUE_PROVIDER)
    private readonly notificacoesQueue: Queue,

    @Inject(WHATSAPP_QUEUE_PROVIDER)
    private readonly whatsappQueue: Queue,

    @Inject(CAMPANHAS_QUEUE_PROVIDER)
    private readonly campanhasQueue: Queue,

    @Inject(ANIVERSARIOS_QUEUE_PROVIDER)
    private readonly aniversariosQueue: Queue,

    @Inject(RELATORIOS_QUEUE_PROVIDER)
    private readonly relatoriosQueue: Queue,

    private readonly configService: ConfigService,
    private readonly requestContext: RequestContextService,
  ) {}

  private normalizarData(data?: QueueJobPayload): QueueJobPayload {
    return data && typeof data === 'object' ? data : {};
  }

  private normalizarMetadata(
    metadata: unknown,
  ): Record<string, any> {
    if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) {
      return {};
    }

    return metadata as Record<string, any>;
  }

  private toNullableString(value: unknown): string | null {
    if (typeof value === 'string' && value.trim().length > 0) {
      return value.trim();
    }

    if (typeof value === 'number' && Number.isFinite(value)) {
      return String(value);
    }

    return null;
  }

  private resolverTraceMetadata(
    payload: QueueJobPayload,
  ): QueueTraceMetadata {
    const metadata = this.normalizarMetadata(payload.metadata);
    const contextData = this.requestContext.getContext();

    const requestId =
      this.toNullableString(metadata.requestId) ??
      this.toNullableString(payload.requestId) ??
      this.toNullableString(contextData?.requestId);

    const correlationId =
      this.toNullableString(metadata.correlationId) ??
      this.toNullableString(payload.correlationId) ??
      this.toNullableString(contextData?.correlationId) ??
      requestId;

    return {
      requestId,
      correlationId,
    };
  }

  private getReferenciaId(data: QueueJobPayload): string | null {
    return (
      data.referenciaId ??
      data.notificacaoId ??
      data.mensagemId ??
      data.whatsappId ??
      data.campanhaId ??
      data.clienteId ??
      data.agendamentoId ??
      data.relatorioId ??
      data.pacoteId ??
      data.metadata?.referenciaId ??
      data.metadata?.rotina ??
      data.dataReferencia ??
      null
    );
  }

  private getDataReferencia(data: QueueJobPayload): string | null {
    return (
      data.dataReferencia ??
      data.data ??
      data.competencia ??
      data.metadata?.dataReferencia ??
      null
    );
  }

  private createIdempotencyKey(
    data: QueueJobPayload,
    fallbackTipo: string,
  ): string {
    return createQueueJobId({
      empresaId: data.empresaId,
      tipo: data.tipo ?? fallbackTipo,
      referenciaId: this.getReferenciaId(data),
      dataReferencia: this.getDataReferencia(data),
      extra: data.metadata?.extra,
    });
  }

  private async addDeduplicatedJob(
    queue: Queue,
    queueLabel: string,
    jobName: string,
    data: QueueJobPayload | undefined,
    fallbackTipo: string,
  ): Promise<AddJobResult> {
    const payload = this.normalizarData(data);
    const metadataOriginal = this.normalizarMetadata(payload.metadata);
    const traceMetadata = this.resolverTraceMetadata(payload);
    const jobId = this.createIdempotencyKey(payload, fallbackTipo);

    const existingJob = await queue.getJob(jobId);

    if (existingJob) {
      const state = await existingJob.getState();

      this.logger.warn(
        `[${queueLabel}] job duplicado ignorado jobId=${jobId} state=${state} requestId=${
          traceMetadata.requestId ?? '-'
        } correlationId=${traceMetadata.correlationId ?? '-'}`,
      );

      return {
        id: jobId,
        duplicated: true,
        jobId,
        state,
      };
    }

    const job = await queue.add(
      jobName,
      {
        ...payload,
        requestId: traceMetadata.requestId,
        correlationId: traceMetadata.correlationId,
        jobId,
        metadata: {
          ...metadataOriginal,
          requestId: traceMetadata.requestId,
          correlationId: traceMetadata.correlationId,
          jobId,
          idempotencyKey: jobId,
          queueLabel,
          createdBy: 'QueuesService',
          createdAt: new Date().toISOString(),
        },
      },
      getEnterpriseJobOptions(this.configService, jobId),
    );

    this.logger.log(
      `[${queueLabel}] job adicionado jobName=${jobName} jobId=${job.id} requestId=${
        traceMetadata.requestId ?? '-'
      } correlationId=${traceMetadata.correlationId ?? '-'}`,
    );

    return {
      id: job.id,
      duplicated: false,
      jobId: job.id,
    };
  }

  adicionarNotificacao(data: QueueJobPayload) {
    return this.addDeduplicatedJob(
      this.notificacoesQueue,
      'NOTIFICACOES',
      'notificacao',
      data,
      'NOTIFICACAO',
    );
  }

  adicionarWhatsapp(data: QueueJobPayload) {
    return this.addDeduplicatedJob(
      this.whatsappQueue,
      'WHATSAPP',
      'whatsapp',
      data,
      'WHATSAPP',
    );
  }

  adicionarCampanha(data: QueueJobPayload) {
    return this.addDeduplicatedJob(
      this.campanhasQueue,
      'CAMPANHAS',
      'campanha',
      data,
      'CAMPANHA',
    );
  }

  adicionarAniversario(data: QueueJobPayload) {
    return this.addDeduplicatedJob(
      this.aniversariosQueue,
      'ANIVERSARIOS',
      'aniversario',
      data,
      'ANIVERSARIO',
    );
  }

  adicionarRelatorio(data: QueueJobPayload) {
    return this.addDeduplicatedJob(
      this.relatoriosQueue,
      'RELATORIOS',
      'relatorio',
      data,
      'RELATORIO',
    );
  }

  adicionarNotificacaoScheduler(data: QueueJobPayload) {
    return this.adicionarNotificacao({
      ...this.normalizarData(data),
      empresaId: data?.empresaId ?? 'SCHEDULER_GLOBAL',
      referenciaId:
        data?.referenciaId ??
        data?.metadata?.rotina ??
        data?.tipo ??
        'NOTIFICACAO_SCHEDULER',
    });
  }

  adicionarWhatsappScheduler(data: QueueJobPayload) {
    return this.adicionarWhatsapp({
      ...this.normalizarData(data),
      empresaId: data?.empresaId ?? 'SCHEDULER_GLOBAL',
      referenciaId:
        data?.referenciaId ??
        data?.metadata?.rotina ??
        data?.tipo ??
        'WHATSAPP_SCHEDULER',
    });
  }

  adicionarCampanhaScheduler(data: QueueJobPayload) {
    return this.adicionarCampanha({
      ...this.normalizarData(data),
      empresaId: data?.empresaId ?? 'SCHEDULER_GLOBAL',
      referenciaId:
        data?.referenciaId ??
        data?.metadata?.rotina ??
        data?.campanhaId ??
        data?.tipo ??
        'CAMPANHA_SCHEDULER',
    });
  }

  adicionarAniversarioScheduler(data: QueueJobPayload) {
    return this.adicionarAniversario({
      ...this.normalizarData(data),
      empresaId: data?.empresaId ?? 'SCHEDULER_GLOBAL',
      referenciaId:
        data?.referenciaId ??
        data?.metadata?.rotina ??
        data?.clienteId ??
        data?.tipo ??
        'ANIVERSARIO_SCHEDULER',
    });
  }

  adicionarRelatorioScheduler(data: QueueJobPayload) {
    return this.adicionarRelatorio({
      ...this.normalizarData(data),
      empresaId: data?.empresaId ?? 'SCHEDULER_GLOBAL',
      referenciaId:
        data?.referenciaId ??
        data?.metadata?.rotina ??
        data?.tipo ??
        'RELATORIO_SCHEDULER',
    });
  }

  // Aliases defensivos para compatibilidade com chamadas antigas/futuras.
  adicionarJobNotificacao(data: QueueJobPayload) {
    return this.adicionarNotificacao(data);
  }

  adicionarJobWhatsapp(data: QueueJobPayload) {
    return this.adicionarWhatsapp(data);
  }

  adicionarJobCampanha(data: QueueJobPayload) {
    return this.adicionarCampanha(data);
  }

  adicionarJobAniversario(data: QueueJobPayload) {
    return this.adicionarAniversario(data);
  }

  adicionarJobRelatorio(data: QueueJobPayload) {
    return this.adicionarRelatorio(data);
  }
}
