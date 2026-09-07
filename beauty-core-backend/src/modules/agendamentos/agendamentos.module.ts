import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma/prisma.module';
import { TenantModule } from '../../shared/tenant';

import { AuditoriaModule } from '../auditoria/auditoria.module';
import { AutomacoesModule } from '../automacoes/automacoes.module';

import { AgendamentosController } from './agendamentos.controller';
import { AgendamentosService } from './agendamentos.service';

@Module({
  imports: [
    PrismaModule,
    TenantModule,
    AutomacoesModule,
    AuditoriaModule,
  ],

  controllers: [AgendamentosController],

  providers: [AgendamentosService],

  exports: [AgendamentosService],
})
export class AgendamentosModule {}