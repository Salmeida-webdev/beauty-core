import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma/prisma.module';
import { TenantModule } from '../../shared/tenant';

import { PacotesController } from './pacotes.controller';
import { PacotesService } from './pacotes.service';

import { AutomacoesModule } from '../automacoes/automacoes.module';
import { AuditoriaModule } from '../auditoria/auditoria.module';

@Module({
  imports: [PrismaModule, TenantModule, AutomacoesModule, AuditoriaModule],

  controllers: [PacotesController],

  providers: [PacotesService],

  exports: [PacotesService],
})
export class PacotesModule {}
