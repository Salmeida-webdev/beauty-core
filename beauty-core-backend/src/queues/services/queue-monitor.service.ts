import { Inject, Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import {
  ANIVERSARIOS_QUEUE_PROVIDER,
  CAMPANHAS_QUEUE_PROVIDER,
  DLQ_QUEUE_PROVIDER,
  NOTIFICACOES_QUEUE_PROVIDER,
  RELATORIOS_QUEUE_PROVIDER,
  WHATSAPP_QUEUE_PROVIDER,
} from '../constants/queue-names';

@Injectable()
export class QueueMonitorService {
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

    @Inject(DLQ_QUEUE_PROVIDER)
    private readonly dlqQueue: Queue,
  ) {}

  private async getQueueStatus(queue: Queue) {
    const counts = await queue.getJobCounts(
      'waiting',
      'active',
      'delayed',
      'completed',
      'failed',
      'paused',
      'prioritized',
      'waiting-children',
    );

    const total = Object.values(counts).reduce(
      (sum, value) => sum + Number(value ?? 0),
      0,
    );

    return {
      total,
      ...counts,
    };
  }

  async getStatus() {
    return {
      notificacoes: await this.getQueueStatus(this.notificacoesQueue),
      whatsapp: await this.getQueueStatus(this.whatsappQueue),
      campanhas: await this.getQueueStatus(this.campanhasQueue),
      aniversarios: await this.getQueueStatus(this.aniversariosQueue),
      relatorios: await this.getQueueStatus(this.relatoriosQueue),
      dlq: await this.getQueueStatus(this.dlqQueue),
    };
  }

  async isHealthy() {
    const queues = await this.getStatus();

    return {
      status: 'ok',
      queues,
    };
  }

  getQueuesMap() {
    return {
      notificacoes: this.notificacoesQueue,
      whatsapp: this.whatsappQueue,
      campanhas: this.campanhasQueue,
      aniversarios: this.aniversariosQueue,
      relatorios: this.relatoriosQueue,
      dlq: this.dlqQueue,
    };
  }
}
