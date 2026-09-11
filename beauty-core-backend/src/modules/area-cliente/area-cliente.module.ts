import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma/prisma.module';
import { TenantModule } from '../../shared/tenant';
import { AgendamentosModule } from '../agendamentos/agendamentos.module';
import { MensagensWhatsappModule } from '../mensagens-whatsapp/mensagens-whatsapp.module';
import { ArquivosModule } from '../arquivos/arquivos.module';
import { ClientesPacotesModule } from '../clientes-pacotes/clientes-pacotes.module';

import { AreaClienteController } from './area-cliente.controller';
import { AreaClienteService } from './area-cliente.service';

@Module({
  imports: [
    MensagensWhatsappModule,
    ArquivosModule,
    ClientesPacotesModule,
    PrismaModule,
    TenantModule,
    AgendamentosModule,
  ],

  controllers: [AreaClienteController],

  providers: [AreaClienteService],

  exports: [AreaClienteService],
})
export class AreaClienteModule {}
