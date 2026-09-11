import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma/prisma.module';
import { TenantModule } from '../../shared/tenant';

import { ConfiguracaoWhatsappController } from './configuracao-whatsapp.controller';
import { ConfiguracaoWhatsappService } from './configuracao-whatsapp.service';

@Module({
  imports: [PrismaModule, TenantModule],

  controllers: [ConfiguracaoWhatsappController],

  providers: [ConfiguracaoWhatsappService],

  exports: [ConfiguracaoWhatsappService],
})
export class ConfiguracaoWhatsappModule {}
