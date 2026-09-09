import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma/prisma.module';
import { TenantModule } from '../../shared/tenant';

import { AuditoriaModule } from '../auditoria/auditoria.module';

import { MensagensWhatsappController } from './mensagens-whatsapp.controller';
import { MensagensWhatsappService } from './mensagens-whatsapp.service';
import { MetaWhatsappCloudProvider } from './providers/meta-whatsapp-cloud.provider';
import { MetaWhatsappWebhookController } from './meta-whatsapp-webhook.controller';
import { MetaWhatsappWebhookService } from './meta-whatsapp-webhook.service';

@Module({
  imports: [PrismaModule, TenantModule, AuditoriaModule],

  controllers: [MensagensWhatsappController, MetaWhatsappWebhookController],

  providers: [
    MensagensWhatsappService,
    MetaWhatsappCloudProvider,
    MetaWhatsappWebhookService,
  ],

  exports: [MensagensWhatsappService],
})
export class MensagensWhatsappModule {}
