import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma/prisma.module';
import { TenantModule } from '../../shared/tenant';

import { AreaClienteController } from './area-cliente.controller';
import { AreaClienteService } from './area-cliente.service';

@Module({
  imports: [
    PrismaModule,
    TenantModule,
  ],

  controllers: [
    AreaClienteController,
  ],

  providers: [
    AreaClienteService,
  ],

  exports: [
    AreaClienteService,
  ],
})
export class AreaClienteModule {}