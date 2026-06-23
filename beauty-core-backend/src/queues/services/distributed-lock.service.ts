import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import Redis from 'ioredis';

@Injectable()
export class DistributedLockService {
  private readonly logger = new Logger(DistributedLockService.name);

  constructor(
    @Inject('REDIS_CONNECTION')
    private readonly redis: Redis,
    private readonly configService: ConfigService,
  ) {}

  private getDefaultTtl(): number {
    return Number(this.configService.get('QUEUE_LOCK_TTL', 600000));
  }

  async acquireLock(
    key: string,
    ttlMs = this.getDefaultTtl(),
  ): Promise<string | null> {
    const token = randomUUID();
    const result = await this.redis.set(key, token, 'PX', ttlMs, 'NX');

    if (result !== 'OK') {
      this.logger.warn(`[LOCK] lock já existente key=${key}`);
      return null;
    }

    this.logger.log(`[LOCK] adquirido key=${key} ttlMs=${ttlMs}`);
    return token;
  }

  async releaseLock(key: string, token: string): Promise<boolean> {
    const script = `
      if redis.call("get", KEYS[1]) == ARGV[1] then
        return redis.call("del", KEYS[1])
      else
        return 0
      end
    `;

    const result = await this.redis.eval(script, 1, key, token);
    const released = result === 1;

    if (released) {
      this.logger.log(`[LOCK] liberado key=${key}`);
    } else {
      this.logger.warn(
        `[LOCK] não liberado key=${key} motivo=token_invalido_ou_expirado`,
      );
    }

    return released;
  }

  async withLock<T>(
    key: string,
    callback: () => Promise<T>,
    ttlMs = this.getDefaultTtl(),
  ): Promise<T | { skipped: true; reason: 'LOCKED'; key: string }> {
    const token = await this.acquireLock(key, ttlMs);

    if (!token) {
      return {
        skipped: true,
        reason: 'LOCKED',
        key,
      };
    }

    try {
      return await callback();
    } finally {
      await this.releaseLock(key, token);
    }
  }

  async isLocked(key: string): Promise<boolean> {
    const exists = await this.redis.exists(key);
    return exists === 1;
  }
}
