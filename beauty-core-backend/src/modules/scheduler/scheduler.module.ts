import { Module } from '@nestjs/common';

import { SchedulerController } from './scheduler.controller';
import { SchedulerService } from './scheduler.service';

import { QueuesModule } from '../../queues/queues.module';
import { PrismaModule } from '../../database/prisma/prisma.module';
import { AuditoriaModule } from '../auditoria/auditoria.module';
import { SessoesModule } from '../sessoes/sessoes.module';
import { ArquivosModule } from '../arquivos/arquivos.module';

@Module({
  imports: [
    QueuesModule,
    PrismaModule,
    AuditoriaModule,
    SessoesModule,
    ArquivosModule,
  ],
  controllers: [SchedulerController],
  providers: [SchedulerService],
  exports: [SchedulerService],
})
export class SchedulerModule {}