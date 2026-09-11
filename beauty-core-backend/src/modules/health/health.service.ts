import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

import { PrismaService } from '../../database/prisma/prisma.service';
import { REDIS_CONNECTION } from '../../queues/queues.module';
import { QueueMonitorService } from '../../queues/services/queue-monitor.service';

export type HealthStatus = 'ok' | 'error' | 'disabled';

export interface HealthCheckResponse {
  status: HealthStatus;
  message?: string;
}

@Injectable()
export class HealthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,

    @Inject(REDIS_CONNECTION)
    private readonly redis: Redis,
    private readonly queueMonitorService: QueueMonitorService,
  ) {}

  async checkApi(): Promise<HealthCheckResponse> {
    await Promise.resolve();
    return {
      status: 'ok',
    };
  }

  async checkDatabase(): Promise<HealthCheckResponse> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;

      return {
        status: 'ok',
      };
    } catch {
      return {
        status: 'error',
        message: 'Database indisponível',
      };
    }
  }

  async checkRedis(): Promise<HealthCheckResponse> {
    try {
      const response = await this.redis.ping();

      return {
        status: response === 'PONG' ? 'ok' : 'error',
      };
    } catch {
      return {
        status: 'error',
        message: 'Redis indisponível',
      };
    }
  }

  async checkScheduler(): Promise<HealthCheckResponse> {
    await Promise.resolve();
    const schedulerEnabled =
      this.configService.get<string>('SCHEDULER_ENABLED') ?? 'true';

    if (schedulerEnabled === 'false') {
      return {
        status: 'disabled',
        message: 'Scheduler desativado por variável de ambiente',
      };
    }

    return {
      status: 'ok',
    };
  }

  async checkBullMq(): Promise<HealthCheckResponse> {
    try {
      const response = await this.redis.ping();

      return {
        status: response === 'PONG' ? 'ok' : 'error',
      };
    } catch {
      return {
        status: 'error',
        message: 'BullMQ/Redis indisponível',
      };
    }
  }

  async checkHealth() {
    const [api, database, redis, scheduler, bullmq] = await Promise.all([
      this.checkApi(),
      this.checkDatabase(),
      this.checkRedis(),
      this.checkScheduler(),
      this.checkBullMq(),
    ]);

    return {
      api: api.status,
      database: database.status,
      redis: redis.status,
      scheduler: scheduler.status,
      bullmq: bullmq.status,
      timestamp: new Date().toISOString(),
    };
  }

  async checkFullHealth() {
    const [api, database, redis, scheduler, bullmq] = await Promise.all([
      this.checkApi(),
      this.checkDatabase(),
      this.checkRedis(),
      this.checkScheduler(),
      this.checkBullMq(),
    ]);

    const status = [
      api.status,
      database.status,
      redis.status,
      scheduler.status,
      bullmq.status,
    ].every((item) => item === 'ok' || item === 'disabled')
      ? 'ok'
      : 'error';

    return {
      status,
      services: {
        api,
        database,
        redis,
        scheduler,
        bullmq,
      },
      timestamp: new Date().toISOString(),
    };
  }

  async checkQueues(): Promise<any> {
    const startedAt = Date.now();

    try {
      const queues = await this.queueMonitorService.getStatus();

      return {
        status: 'ok',
        latencyMs: Date.now() - startedAt,
        queues,
      };
    } catch (error) {
      return {
        status: 'error',
        latencyMs: Date.now() - startedAt,
        message: 'Falha ao consultar filas BullMQ.',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      };
    }
  }
}
