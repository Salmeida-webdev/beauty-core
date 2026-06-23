import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma/prisma.module';
import { SessoesService } from './sessoes.service';

@Module({
  imports: [PrismaModule],
  providers: [SessoesService],
  exports: [SessoesService],
})
export class SessoesModule {}
