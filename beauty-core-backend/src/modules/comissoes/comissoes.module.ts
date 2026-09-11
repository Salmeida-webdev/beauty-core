import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma/prisma.module';
import { TenantModule } from '../../shared/tenant';

import { AuditoriaModule } from '../auditoria/auditoria.module';
import { AutomacoesModule } from '../automacoes/automacoes.module';

import { ComissoesController } from './comissoes.controller';
import { ComissoesService } from './comissoes.service';

@Module({
  imports: [PrismaModule, TenantModule, AutomacoesModule, AuditoriaModule],

  controllers: [ComissoesController],

  providers: [ComissoesService],

  exports: [ComissoesService],
})
export class ComissoesModule {}
