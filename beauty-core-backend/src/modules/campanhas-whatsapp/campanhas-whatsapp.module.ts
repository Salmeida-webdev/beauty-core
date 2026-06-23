import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma/prisma.module';
import { TenantModule } from '../../shared/tenant';

import { QueuesModule } from '../../queues/queues.module';

import { AuditoriaModule } from '../auditoria/auditoria.module';

import { CampanhasWhatsappController } from './campanhas-whatsapp.controller';
import { CampanhasWhatsappService } from './campanhas-whatsapp.service';

@Module({
  imports: [
    PrismaModule,
    TenantModule,
    QueuesModule,
    AuditoriaModule,
  ],

  controllers: [
    CampanhasWhatsappController,
  ],

  providers: [
    CampanhasWhatsappService,
  ],

  exports: [
    CampanhasWhatsappService,
  ],
})
export class CampanhasWhatsappModule {}