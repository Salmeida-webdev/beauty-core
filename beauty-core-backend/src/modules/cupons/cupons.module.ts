import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma/prisma.module';
import { TenantModule } from '../../shared/tenant';

import { CuponsService } from './cupons.service';
import { CuponsController } from './cupons.controller';

@Module({
  imports: [
    PrismaModule,
    TenantModule,
  ],

  controllers: [
    CuponsController,
  ],

  providers: [
    CuponsService,
  ],

  exports: [
    CuponsService,
  ],
})
export class CuponsModule {}