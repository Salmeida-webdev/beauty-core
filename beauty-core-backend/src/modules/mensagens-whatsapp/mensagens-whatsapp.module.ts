import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma/prisma.module';
import { TenantModule } from '../../shared/tenant';

import { AuditoriaModule } from '../auditoria/auditoria.module';

import { MensagensWhatsappController } from './mensagens-whatsapp.controller';
import { MensagensWhatsappService } from './mensagens-whatsapp.service';

@Module({
  imports: [
    PrismaModule,
    TenantModule,
    AuditoriaModule,
  ],

  controllers: [MensagensWhatsappController],

  providers: [MensagensWhatsappService],

  exports: [MensagensWhatsappService],
})
export class MensagensWhatsappModule {}