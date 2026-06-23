import { JobsOptions } from 'bullmq';
import { ConfigService } from '@nestjs/config';

export function getEnterpriseJobOptions(
  configService: ConfigService,
  jobId: string,
): JobsOptions {
  const attempts = Number(configService.get('QUEUE_ATTEMPTS', 5));
  const backoffDelay = Number(configService.get('QUEUE_BACKOFF_MS', 10000));

  return {
    jobId,
    attempts,
    backoff: {
      type: 'exponential',
      delay: backoffDelay,
    },
    removeOnComplete: {
      age: 60 * 60 * 24 * 7,
      count: 1000,
    },
    removeOnFail: {
      age: 60 * 60 * 24 * 30,
      count: 5000,
    },
  };
}
