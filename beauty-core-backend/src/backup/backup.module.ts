import { Module } from '@nestjs/common';
import { PrismaModule } from '../database/prisma/prisma.module';
import { BackupService } from './backup.service';
import { BackupController } from './backup.controller';

@Module({
  imports: [PrismaModule],
  providers: [BackupService],
  controllers: [BackupController]
})
export class BackupModule {}
