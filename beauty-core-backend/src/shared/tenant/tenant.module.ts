import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma/prisma.module';

import { TenantValidatorService } from './tenant-validator.service';
import { TenantPublicService } from './tenant-public.service';

@Module({
  imports: [PrismaModule],

  providers: [TenantValidatorService, TenantPublicService],

  exports: [TenantValidatorService, TenantPublicService],
})
export class TenantModule {}
