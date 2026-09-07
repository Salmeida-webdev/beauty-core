import {
  Global,
  Module,
  Provider,
  } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bullmq';
import IORedis from 'ioredis';

import { NotificacoesModule } from '../modules/notificacoes/notificacoes.module';
import { MensagensWhatsappModule } from '../modules/mensagens-whatsapp/mensagens-whatsapp.module';
import { AuditoriaModule } from '../modules/auditoria/auditoria.module';

import {
  ANIVERSARIOS_QUEUE,
  CAMPANHAS_QUEUE,
  NOTIFICACOES_QUEUE,
  RELATORIOS_QUEUE,
  WHATSAPP_QUEUE,
  DLQ_QUEUE,
  DLQ_QUEUE_PROVIDER,
} from './constants/queue-names';

import { QueuesService } from './services/queues.service';

import { NotificacoesWorker } from './workers/notificacoes.worker';
import { WhatsappWorker } from './workers/whatsapp.worker';
import { CampanhasWorker } from './workers/campanhas.worker';
import { AniversariosWorker } from './workers/aniversarios.worker';
import { RelatoriosWorker } from './workers/relatorios.worker';
import { QueuesController } from './queues.controller';
import { DistributedLockService } from './services/distributed-lock.service';
import { DeadLetterQueueService } from './services/dead-letter-queue.service';
import { QueueMonitorService } from './services/queue-monitor.service';
import { QueueMetricsService } from './services/queue-metrics.service';
import { QueueShutdownService } from './services/queue-shutdown.service';

const dlqQueueProvider: Provider = {
  provide: DLQ_QUEUE_PROVIDER,
  useFactory: (connection: any) => {
    return new Queue(DLQ_QUEUE, {
      connection,
    });
  },
  inject: ['REDIS_CONNECTION'],
};

export const REDIS_CONNECTION = 'REDIS_CONNECTION';

export const NOTIFICACOES_QUEUE_PROVIDER =
  'NOTIFICACOES_QUEUE_PROVIDER';

export const WHATSAPP_QUEUE_PROVIDER =
  'WHATSAPP_QUEUE_PROVIDER';

export const CAMPANHAS_QUEUE_PROVIDER =
  'CAMPANHAS_QUEUE_PROVIDER';

export const ANIVERSARIOS_QUEUE_PROVIDER =
  'ANIVERSARIOS_QUEUE_PROVIDER';

export const RELATORIOS_QUEUE_PROVIDER =
  'RELATORIOS_QUEUE_PROVIDER';

function getRedisOptions(configService: ConfigService) {
  return {
    host:
      configService.get<string>('REDIS_HOST') ||
      'localhost',

    port: Number(
      configService.get<string>('REDIS_PORT') ||
        6379,
    ),

    password:
      configService.get<string>('REDIS_PASSWORD') ||
      undefined,

    maxRetriesPerRequest: null,
  };
}

@Global()

@Module({
  controllers: [
    QueuesController,
  ],
  imports: [
    NotificacoesModule,
    MensagensWhatsappModule,
    AuditoriaModule,
  ],

  providers: [
    {
      provide: REDIS_CONNECTION,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        new IORedis(getRedisOptions(configService)),
    },

    {
      provide: NOTIFICACOES_QUEUE_PROVIDER,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        new Queue(NOTIFICACOES_QUEUE, {
          connection: getRedisOptions(configService),
        }),
    },

    {
      provide: WHATSAPP_QUEUE_PROVIDER,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        new Queue(WHATSAPP_QUEUE, {
          connection: getRedisOptions(configService),
        }),
    },

    {
      provide: CAMPANHAS_QUEUE_PROVIDER,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        new Queue(CAMPANHAS_QUEUE, {
          connection: getRedisOptions(configService),
        }),
    },

    {
      provide: ANIVERSARIOS_QUEUE_PROVIDER,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        new Queue(ANIVERSARIOS_QUEUE, {
          connection: getRedisOptions(configService),
        }),
    },

    {
      provide: RELATORIOS_QUEUE_PROVIDER,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        new Queue(RELATORIOS_QUEUE, {
          connection: getRedisOptions(configService),
        }),
    },

    QueuesService,

    NotificacoesWorker,
    WhatsappWorker,
    CampanhasWorker,
    AniversariosWorker,
    RelatoriosWorker,
  ,
    dlqQueueProvider,
    DistributedLockService,
    DeadLetterQueueService,
    QueueMonitorService,
    QueueShutdownService,
    QueueMetricsService
  ].filter(Boolean) as Provider[],

  exports: [
    QueuesService,
    REDIS_CONNECTION,
  ,
    DistributedLockService,
    DeadLetterQueueService,
    QueueMonitorService,
    QueueShutdownService,
    QueueMetricsService
  ].filter(Boolean) as any[],
})
export class QueuesModule {}