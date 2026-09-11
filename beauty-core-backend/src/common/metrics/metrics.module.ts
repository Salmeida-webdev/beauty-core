import { Global, Module } from '@nestjs/common';

import { HealthModule } from '../../modules/health/health.module';

import { MetricsController } from './metrics.controller';
import { MetricsMiddleware } from './middleware/metrics.middleware';
import { MetricsService } from './metrics.service';

@Global()
@Module({
  imports: [HealthModule],
  controllers: [MetricsController],
  providers: [MetricsService, MetricsMiddleware],
  exports: [MetricsService, MetricsMiddleware],
})
export class MetricsModule {}
