import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma/prisma.module';
import { HealthController } from './health.controller';
import { EnterpriseHealthController } from './enterprise-health.controller';
import { HealthService } from './health.service';
import { EnterpriseHealthService } from './enterprise-health.service';

@Module({
  imports: [PrismaModule],
  controllers: [HealthController, EnterpriseHealthController],
  providers: [HealthService, EnterpriseHealthService],
  exports: [HealthService],
})
export class HealthModule {}
