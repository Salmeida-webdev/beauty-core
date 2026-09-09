import { Module } from '@nestjs/common';
import { PrismaModule } from '../database/prisma/prisma.module';
import { QueuesModule } from '../queues/queues.module';
import { BackupService } from './backup.service';
import { BackupController } from './backup.controller';

@Module({
  imports: [PrismaModule, QueuesModule],
  providers: [BackupService],
  controllers: [BackupController],
})
export class BackupModule {}
