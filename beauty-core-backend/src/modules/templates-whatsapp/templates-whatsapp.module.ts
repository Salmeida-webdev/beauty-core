import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma/prisma.module';
import { TenantModule } from '../../shared/tenant';

import { TemplatesWhatsappController } from './templates-whatsapp.controller';
import { TemplatesWhatsappService } from './templates-whatsapp.service';

@Module({
  imports: [
    PrismaModule,
    TenantModule,
  ],

  controllers: [
    TemplatesWhatsappController,
  ],

  providers: [
    TemplatesWhatsappService,
  ],

  exports: [
    TemplatesWhatsappService,
  ],
})
export class TemplatesWhatsappModule {}