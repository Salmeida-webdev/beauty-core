import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma/prisma.module';
import { TenantModule } from '../../shared/tenant';

import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';

@Module({
  imports: [
    PrismaModule,
    TenantModule,
  ],

  controllers: [
    AnalyticsController,
  ],

  providers: [
    AnalyticsService,
  ],

  exports: [
    AnalyticsService,
  ],
})
export class AnalyticsModule {}