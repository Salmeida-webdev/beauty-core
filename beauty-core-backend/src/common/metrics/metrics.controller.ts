function stringifyLintValue(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  }

  if (value === null || value === undefined) {
    return '';
  }

  if (
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'bigint'
  ) {
    return value.toString();
  }

  if (typeof value === 'symbol') {
    return value.description ?? '';
  }

  if (typeof value === 'object') {
    try {
      return JSON.stringify(value) ?? '';
    } catch {
      return '[unserializable]';
    }
  }

  return '';
}

import { Controller, Get, Header, UseGuards } from '@nestjs/common';

import { HealthService } from '../../modules/health/health.service';
import { MetricsService } from './metrics.service';
import { MetricsAuthGuard } from './guards/metrics-auth.guard';

type DependencyMetric = {
  name: string;
  critical: boolean;
  healthy: number;
  latencySeconds: number;
  status: string;
  details?: Record<string, unknown>;
};

@Controller()
export class MetricsController {
  constructor(
    private readonly metricsService: MetricsService,
    private readonly healthService: HealthService,
  ) {}

  @UseGuards(MetricsAuthGuard)
  @Get('metrics')
  @Header('Content-Type', 'text/plain; version=0.0.4; charset=utf-8')
  async getMetrics(): Promise<string> {
    const baseMetrics = this.metricsService.renderPrometheusMetrics();
    const dependencyMetrics = await this.renderDependencyMetrics();

    return `${baseMetrics}\n${dependencyMetrics}\n`;
  }

  private async renderDependencyMetrics(): Promise<string> {
    const checks = await Promise.all([
      this.runDependencyCheck('database', true, () =>
        this.healthService.checkDatabase(),
      ),
      this.runDependencyCheck('redis', true, () =>
        this.healthService.checkRedis(),
      ),
      this.runDependencyCheck('bullmq', true, () =>
        this.healthService.checkQueues(),
      ),
      this.runDependencyCheck('scheduler', false, () =>
        this.healthService.checkScheduler(),
      ),
    ]);

    const lines: string[] = [];

    lines.push(
      '# HELP beauty_core_dependency_health Dependency health status. 1 means healthy, 0 means unhealthy.',
    );
    lines.push('# TYPE beauty_core_dependency_health gauge');

    for (const check of checks) {
      lines.push(
        `beauty_core_dependency_health{${this.formatLabels({
          dependency: check.name,
          critical: String(check.critical),
          status: check.status,
        })}} ${check.healthy}`,
      );
    }

    lines.push('');
    lines.push(
      '# HELP beauty_core_dependency_latency_seconds Dependency health check latency in seconds.',
    );
    lines.push('# TYPE beauty_core_dependency_latency_seconds gauge');

    for (const check of checks) {
      lines.push(
        `beauty_core_dependency_latency_seconds{${this.formatLabels({
          dependency: check.name,
          critical: String(check.critical),
        })}} ${check.latencySeconds}`,
      );
    }

    lines.push('');

    const bullmq = checks.find((check) => check.name === 'bullmq');

    if (bullmq?.details) {
      lines.push(
        '# HELP beauty_core_queue_jobs BullMQ jobs by queue and state.',
      );
      lines.push('# TYPE beauty_core_queue_jobs gauge');

      const queues = this.readQueuesFromDetails(bullmq.details);

      for (const [queueName, counts] of Object.entries(queues)) {
        for (const [state, value] of Object.entries(counts)) {
          if (typeof value !== 'number') {
            continue;
          }

          lines.push(
            `beauty_core_queue_jobs{${this.formatLabels({
              queue: queueName,
              state,
            })}} ${value}`,
          );
        }
      }
    }

    return lines.join('\n');
  }

  private async runDependencyCheck(
    name: string,
    critical: boolean,
    fn: () => Promise<unknown>,
  ): Promise<DependencyMetric> {
    const startedAt = process.hrtime.bigint();

    try {
      const result = await fn();
      const status = this.readStatus(result);
      const healthy = this.isHealthyStatus(status) ? 1 : 0;

      return {
        name,
        critical,
        healthy,
        status,
        latencySeconds: this.elapsedSeconds(startedAt),
        details: this.toRecord(result),
      };
    } catch (error) {
      return {
        name,
        critical,
        healthy: 0,
        status: 'error',
        latencySeconds: this.elapsedSeconds(startedAt),
        details: {
          error: error instanceof Error ? error.message : String(error),
        },
      };
    }
  }

  private readStatus(result: unknown): string {
    if (!result || typeof result !== 'object') {
      return 'unknown';
    }

    const status = (result as Record<string, unknown>).status;

    return stringifyLintValue(status ?? 'unknown').toLowerCase();
  }

  private isHealthyStatus(status: string): boolean {
    return status === 'ok' || status === 'healthy';
  }

  private toRecord(value: unknown): Record<string, unknown> {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return {
        value: value ?? null,
      };
    }

    return value as Record<string, unknown>;
  }

  private readQueuesFromDetails(
    details: Record<string, unknown>,
  ): Record<string, Record<string, number>> {
    const queues = details.queues;

    if (!queues || typeof queues !== 'object' || Array.isArray(queues)) {
      return {};
    }

    return queues as Record<string, Record<string, number>>;
  }

  private elapsedSeconds(startedAt: bigint): number {
    return Number(
      (Number(process.hrtime.bigint() - startedAt) / 1_000_000_000).toFixed(6),
    );
  }

  private formatLabels(labels: Record<string, string>): string {
    return Object.entries(labels)
      .map(([key, value]) => `${key}="${this.escapeLabelValue(value)}"`)
      .join(',');
  }

  private escapeLabelValue(value: string): string {
    return value
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n');
  }
}
