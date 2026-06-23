import { Inject, Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { Queue } from 'bullmq';
import IORedis from 'ioredis';

import {
  ANIVERSARIOS_QUEUE_PROVIDER,
  CAMPANHAS_QUEUE_PROVIDER,
  DLQ_QUEUE_PROVIDER,
  NOTIFICACOES_QUEUE_PROVIDER,
  RELATORIOS_QUEUE_PROVIDER,
  WHATSAPP_QUEUE_PROVIDER,
} from '../constants/queue-names';

@Injectable()
export class QueueShutdownService implements OnModuleDestroy {
  private readonly logger = new Logger(QueueShutdownService.name);

  constructor(
    @Inject('REDIS_CONNECTION')
    private readonly redisConnection: IORedis,

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

  async onModuleDestroy(): Promise<void> {
    const queues = [
      this.notificacoesQueue,
      this.whatsappQueue,
      this.campanhasQueue,
      this.aniversariosQueue,
      this.relatoriosQueue,
      this.dlqQueue,
    ];

    await Promise.allSettled(
      queues.map(async (queue) => {
        try {
          await queue.close();
        } catch (error) {
          this.logger.warn(
            `Falha ao fechar fila BullMQ: ${
              error instanceof Error ? error.message : String(error)
            }`,
          );
        }
      }),
    );

    try {
      if (
        this.redisConnection &&
        this.redisConnection.status !== 'end' &&
        this.redisConnection.status !== 'close'
      ) {
        await this.redisConnection.quit();
      }
    } catch (error) {
      this.logger.warn(
        `Falha ao encerrar conexao Redis compartilhada: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );

      try {
        this.redisConnection.disconnect();
      } catch {
        // noop
      }
    }
  }
}