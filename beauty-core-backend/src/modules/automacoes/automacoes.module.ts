import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma/prisma.module';
import { TenantModule } from '../../shared/tenant';

import { AutomacoesService } from './automacoes.service';
import { AutomacoesController } from './automacoes.controller';

import { NotificacoesModule } from '../notificacoes/notificacoes.module';
import { ConfiguracoesNotificacaoModule } from '../configuracoes-notificacao/configuracoes-notificacao.module';

@Module({
  imports: [
    PrismaModule,
    TenantModule,
    NotificacoesModule,
    ConfiguracoesNotificacaoModule,
  ],

  controllers: [AutomacoesController],

  providers: [AutomacoesService],

  exports: [AutomacoesService],
})
export class AutomacoesModule {}
