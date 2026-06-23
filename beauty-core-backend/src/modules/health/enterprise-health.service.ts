import { Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { resolve } from 'path';

import { HealthService } from './health.service';

type HealthStatus = 'ok' | 'degraded' | 'unhealthy';

type HealthCheckResult = {
  name: string;
  status: HealthStatus;
  critical: boolean;
  latencyMs?: number;
  details?: Record<string, unknown>;
  error?: string;
};

type HealthResponse = {
  status: HealthStatus;
  timestamp: string;
  service: string;
  uptimeSeconds: number;
  environment: string;
  version: string;
  checks: HealthCheckResult[];
  backup?: Record<string, unknown>;
  recovery?: Record<string, unknown>;
};

@Injectable()
export class EnterpriseHealthService {
  constructor(private readonly healthService: HealthService) {}

  live() {
    return {
      status: 'ok',
      service: 'beauty-core-api',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.round(process.uptime()),
      environment: process.env.NODE_ENV ?? 'development',
      version: process.env.APP_VERSION ?? '1.0.0',
    };
  }

  async ready(): Promise<HealthResponse> {
    const checks = await Promise.all([
      this.checkApi(),
      this.wrapExistingCheck('database', true, () =>
        this.healthService.checkDatabase(),
      ),
      this.wrapExistingCheck('redis', true, () =>
        this.healthService.checkRedis(),
      ),
      this.wrapExistingCheck('bullmq', true, () =>
        this.healthService.checkQueues(),
      ),
      this.wrapExistingCheck('scheduler', false, () =>
        this.healthService.checkScheduler(),
      ),
    ]);

    return this.createResponse(checks, true);
  }

  async full(): Promise<HealthResponse> {
    const checks = await Promise.all([
      this.checkApi(),
      this.wrapExistingCheck('database', true, () =>
        this.healthService.checkDatabase(),
      ),
      this.wrapExistingCheck('redis', true, () =>
        this.healthService.checkRedis(),
      ),
      this.wrapExistingCheck('bullmq', true, () =>
        this.healthService.checkQueues(),
      ),
      this.wrapExistingCheck('scheduler', false, () =>
        this.healthService.checkScheduler(),
      ),
    ]);

    const response = this.createResponse(checks, false);

    return {
      ...response,
      backup: this.checkBackupRecoveryStatus(),
      recovery: this.checkRecoveryObjectives(),
    };
  }

  private checkBackupRecoveryStatus(): Record<string, unknown> {
    return {
      status: 'ok',
      executionEnabled: process.env.BACKUP_EXECUTION_ENABLED === 'true',
      rpo: process.env.BACKUP_RPO ?? '24h',
      rto: process.env.BACKUP_RTO ?? '4h',
      directories: {
        postgres: this.pathExists('backups/postgres'),
        uploads: this.pathExists('backups/uploads'),
        redis: this.pathExists('backups/redis'),
        logs: this.pathExists('logs/backups'),
      },
      scripts: {
        postgresBackup: this.pathExists('scripts/backup/postgres-backup.ps1'),
        postgresRestore: this.pathExists('scripts/backup/postgres-restore.ps1'),
        uploadsBackup: this.pathExists('scripts/uploads/uploads-backup.ps1'),
        uploadsRestore: this.pathExists('scripts/uploads/uploads-restore.ps1'),
        redisBackup: this.pathExists('scripts/backup/redis-backup.ps1'),
        redisRestore: this.pathExists('scripts/backup/redis-restore.ps1'),
      },
      timestamp: new Date().toISOString(),
    };
  }

  private checkRecoveryObjectives(): Record<string, unknown> {
    return {
      status: 'defined',
      rpo: process.env.BACKUP_RPO ?? '24h',
      rto: process.env.BACKUP_RTO ?? '4h',
      disasterRecoveryPlan: this.pathExists('docs/disaster-recovery.md'),
      businessContinuityPlan: this.pathExists('docs/business-continuity.md'),
      lgpdRetentionPolicy: this.pathExists('docs/lgpd-retention-policy.md'),
      dataCriticalityMatrix: this.pathExists('docs/data-criticality-matrix.md'),
      timestamp: new Date().toISOString(),
    };
  }

  private pathExists(path: string): { path: string; exists: boolean } {
    return {
      path,
      exists: existsSync(resolve(process.cwd(), path)),
    };
  }

  isReady(response: HealthResponse): boolean {
    return response.checks
      .filter((check) => check.critical)
      .every((check) => check.status === 'ok');
  }

  shouldReturnUnavailable(response: HealthResponse): boolean {
    return response.status === 'unhealthy';
  }

  private async checkApi(): Promise<HealthCheckResult> {
    const startedAt = process.hrtime.bigint();

    return {
      name: 'api',
      status: 'ok',
      critical: true,
      latencyMs: this.elapsedMs(startedAt),
      details: {
        pid: process.pid,
        uptimeSeconds: Math.round(process.uptime()),
        memory: process.memoryUsage(),
      },
    };
  }

  private async wrapExistingCheck(
    name: string,
    critical: boolean,
    fn: () => Promise<unknown>,
  ): Promise<HealthCheckResult> {
    const startedAt = process.hrtime.bigint();

    try {
      const result = await fn();
      const normalizedStatus = this.normalizeStatus(
        this.readStatusFromResult(result),
        critical,
      );

      return {
        name,
        critical,
        status: normalizedStatus,
        latencyMs: this.elapsedMs(startedAt),
        details: this.toDetails(result),
      };
    } catch (error) {
      return {
        name,
        critical,
        status: critical ? 'unhealthy' : 'degraded',
        latencyMs: this.elapsedMs(startedAt),
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  private createResponse(
    checks: HealthCheckResult[],
    readinessMode: boolean,
  ): HealthResponse {
    const hasUnhealthyCritical = checks.some(
      (check) => check.critical && check.status === 'unhealthy',
    );

    const hasDegraded = checks.some((check) => check.status === 'degraded');

    let status: HealthStatus = 'ok';

    if (hasUnhealthyCritical) {
      status = 'unhealthy';
    } else if (hasDegraded) {
      status = readinessMode ? 'ok' : 'degraded';
    }

    return {
      status,
      service: 'beauty-core-api',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.round(process.uptime()),
      environment: process.env.NODE_ENV ?? 'development',
      version: process.env.APP_VERSION ?? '1.0.0',
      checks,
    };
  }

  private readStatusFromResult(result: unknown): unknown {
    if (!result || typeof result !== 'object') {
      return undefined;
    }

    const record = result as Record<string, unknown>;

    return record.status;
  }

  private normalizeStatus(
    value: unknown,
    critical: boolean,
  ): HealthStatus {
    const status = String(value ?? '').toLowerCase();

    if (status === 'ok' || status === 'healthy') {
      return 'ok';
    }

    if (
      status === 'degraded' ||
      status === 'warning' ||
      status === 'warn'
    ) {
      return 'degraded';
    }

    if (
      status === 'error' ||
      status === 'unhealthy' ||
      status === 'down' ||
      status === 'fail' ||
      status === 'failed'
    ) {
      return critical ? 'unhealthy' : 'degraded';
    }

    return 'ok';
  }

  private toDetails(result: unknown): Record<string, unknown> {
    if (!result || typeof result !== 'object' || Array.isArray(result)) {
      return {
        value: result ?? null,
      };
    }

    return result as Record<string, unknown>;
  }

  private elapsedMs(startedAt: bigint): number {
    return Number(
      (Number(process.hrtime.bigint() - startedAt) / 1_000_000).toFixed(2),
    );
  }
}
