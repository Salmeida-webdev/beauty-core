import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma/prisma.module';
import { TenantModule } from '../../shared/tenant';

import { ConfiguracaoFidelidadeController } from './configuracao-fidelidade.controller';
import { ConfiguracaoFidelidadeService } from './configuracao-fidelidade.service';

@Module({
  imports: [
    PrismaModule,
    TenantModule,
  ],

  controllers: [
    ConfiguracaoFidelidadeController,
  ],

  providers: [
    ConfiguracaoFidelidadeService,
  ],

  exports: [
    ConfiguracaoFidelidadeService,
  ],
})
export class ConfiguracaoFidelidadeModule {}