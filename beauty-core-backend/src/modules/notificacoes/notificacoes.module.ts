import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma/prisma.module';
import { TenantModule } from '../../shared/tenant';

import { NotificacoesController } from './notificacoes.controller';
import { NotificacoesService } from './notificacoes.service';

@Module({
  imports: [
    PrismaModule,
    TenantModule,
  ],

  controllers: [
    NotificacoesController,
  ],

  providers: [
    NotificacoesService,
  ],

  exports: [
    NotificacoesService,
  ],
})
export class NotificacoesModule {}