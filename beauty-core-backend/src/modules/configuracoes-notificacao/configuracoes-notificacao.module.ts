import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma/prisma.module';
import { TenantModule } from '../../shared/tenant';

import { ConfiguracoesNotificacaoController } from './configuracoes-notificacao.controller';
import { ConfiguracoesNotificacaoService } from './configuracoes-notificacao.service';

@Module({
  imports: [PrismaModule, TenantModule],

  controllers: [ConfiguracoesNotificacaoController],

  providers: [ConfiguracoesNotificacaoService],

  exports: [ConfiguracoesNotificacaoService],
})
export class ConfiguracoesNotificacaoModule {}
