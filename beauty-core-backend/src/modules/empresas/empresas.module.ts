import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma/prisma.module';
import { EmpresasController } from './empresas.controller';
import { EmpresasService } from './empresas.service';

@Module({
  imports: [PrismaModule],
  controllers: [EmpresasController],
  providers: [EmpresasService],
  exports: [EmpresasService],
})
export class EmpresasModule {}
