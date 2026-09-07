import { Module } from '@nestjs/common';

import { AreaClienteModule } from '../area-cliente/area-cliente.module';
import { ClienteAreaController } from './cliente-area.controller';
import { ClienteAreaService } from './cliente-area.service';

@Module({
  imports: [AreaClienteModule],
  controllers: [ClienteAreaController],
  providers: [ClienteAreaService],
  exports: [ClienteAreaService],
})
export class ClienteAreaModule {}
