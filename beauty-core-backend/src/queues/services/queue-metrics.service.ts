import { Injectable } from '@nestjs/common';
import { QueueMonitorService } from './queue-monitor.service';

@Injectable()
export class QueueMetricsService {
  constructor(private readonly queueMonitorService: QueueMonitorService) {}

  async getMetrics() {
    const status = await this.queueMonitorService.getStatus();

    return Object.entries(status).reduce(
      (acc, [queueName, queueStatus]: [string, any]) => {
        const completed = Number(queueStatus.completed ?? 0);
        const failed = Number(queueStatus.failed ?? 0);
        const dlq = queueName === 'dlq' ? Number(queueStatus.total ?? 0) : 0;
        const finalized = completed + failed + dlq;

        acc[queueName] = {
          processed: completed + failed,
          completed,
          failed,
          dlq,
          successRate:
            finalized > 0
              ? Number(((completed / finalized) * 100).toFixed(2))
              : 100,
          failureRate:
            finalized > 0
              ? Number((((failed + dlq) / finalized) * 100).toFixed(2))
              : 0,
        };

        return acc;
      },
      {} as Record<string, any>,
    );
  }
}
