import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma/prisma.module';
import { TenantModule } from '../../shared/tenant';

import { NiveisFidelidadeService } from './niveis-fidelidade.service';
import { NiveisFidelidadeController } from './niveis-fidelidade.controller';

@Module({
  imports: [
    PrismaModule,
    TenantModule,
  ],

  controllers: [
    NiveisFidelidadeController,
  ],

  providers: [
    NiveisFidelidadeService,
  ],

  exports: [
    NiveisFidelidadeService,
  ],
})
export class NiveisFidelidadeModule {}