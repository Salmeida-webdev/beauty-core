import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma/prisma.module';
import { ClienteAreaController } from './cliente-area.controller';
import { ClienteAreaService } from './cliente-area.service';

@Module({
  imports: [PrismaModule],
  controllers: [ClienteAreaController],
  providers: [ClienteAreaService],
  exports: [ClienteAreaService],
})
export class ClienteAreaModule {}
