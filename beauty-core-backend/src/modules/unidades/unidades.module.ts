import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma/prisma.module';
import { TenantModule } from '../../shared/tenant';

import { UnidadesService } from './unidades.service';
import { UnidadesController } from './unidades.controller';

@Module({
  imports: [PrismaModule, TenantModule],

  controllers: [UnidadesController],

  providers: [UnidadesService],
})
export class UnidadesModule {}
