import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma/prisma.module';
import { TenantModule } from '../../shared/tenant';

import { BeneficiosService } from './beneficios.service';
import { BeneficiosController } from './beneficios.controller';

@Module({
  imports: [PrismaModule, TenantModule],

  controllers: [BeneficiosController],

  providers: [BeneficiosService],

  exports: [BeneficiosService],
})
export class BeneficiosModule {}
