import { Module } from '@nestjs/common';

import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';

import { PrismaModule } from '../../database/prisma/prisma.module';
import { TenantModule } from '../../shared/tenant';

import { AutomacoesModule } from '../automacoes/automacoes.module';
import { AuditoriaModule } from '../auditoria/auditoria.module';

@Module({
  imports: [
    PrismaModule,
    TenantModule,
    AutomacoesModule,
    AuditoriaModule,
  ],

  controllers: [ClientesController],

  providers: [ClientesService],

  exports: [ClientesService],
})
export class ClientesModule {}