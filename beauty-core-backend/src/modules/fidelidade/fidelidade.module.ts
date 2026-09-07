import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma/prisma.module';
import { TenantModule } from '../../shared/tenant';

import { AutomacoesModule } from '../automacoes/automacoes.module';

import { FidelidadeService } from './fidelidade.service';
import { FidelidadeController } from './fidelidade.controller';

@Module({
  imports: [
    PrismaModule,
    TenantModule,
    AutomacoesModule,
  ],

  controllers: [
    FidelidadeController,
  ],

  providers: [
    FidelidadeService,
  ],

  exports: [
    FidelidadeService,
  ],
})
export class FidelidadeModule {}