import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma/prisma.module';
import { TenantModule } from '../../shared/tenant';

import { ServicosService } from './servicos.service';
import { ServicosController } from './servicos.controller';

@Module({
  imports: [
    PrismaModule,
    TenantModule,
  ],

  controllers: [
    ServicosController,
  ],

  providers: [
    ServicosService,
  ],
})
export class ServicosModule {}