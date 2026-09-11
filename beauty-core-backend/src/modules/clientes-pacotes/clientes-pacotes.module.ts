import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma/prisma.module';
import { TenantModule } from '../../shared/tenant';

import { AuditoriaModule } from '../auditoria/auditoria.module';
import { AutomacoesModule } from '../automacoes/automacoes.module';

import { ClientesPacotesController } from './clientes-pacotes.controller';
import { ClientesPacotesService } from './clientes-pacotes.service';

@Module({
  imports: [PrismaModule, TenantModule, AutomacoesModule, AuditoriaModule],

  controllers: [ClientesPacotesController],

  providers: [ClientesPacotesService],

  exports: [ClientesPacotesService],
})
export class ClientesPacotesModule {}
