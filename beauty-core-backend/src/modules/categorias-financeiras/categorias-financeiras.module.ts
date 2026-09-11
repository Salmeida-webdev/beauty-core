import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma/prisma.module';

import { CategoriasFinanceirasController } from './categorias-financeiras.controller';
import { CategoriasFinanceirasService } from './categorias-financeiras.service';

@Module({
  imports: [PrismaModule],
  controllers: [CategoriasFinanceirasController],
  providers: [CategoriasFinanceirasService],
})
export class CategoriasFinanceirasModule {}
