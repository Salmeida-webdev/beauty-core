import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma/prisma.module';
import { TenantModule } from '../../shared/tenant';

import { AuditoriaModule } from '../auditoria/auditoria.module';
import { AutomacoesModule } from '../automacoes/automacoes.module';

import { FinanceiroController } from './financeiro.controller';
import { FinanceiroService } from './financeiro.service';

@Module({
  imports: [PrismaModule, TenantModule, AutomacoesModule, AuditoriaModule],

  controllers: [FinanceiroController],

  providers: [FinanceiroService],

  exports: [FinanceiroService],
})
export class FinanceiroModule {}
