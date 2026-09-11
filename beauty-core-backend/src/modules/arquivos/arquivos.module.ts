import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma/prisma.module';
import { TenantModule } from '../../shared/tenant';

import { ArquivosController } from './arquivos.controller';
import { ArquivosService } from './arquivos.service';

import { LocalStorageService } from './storage/local-storage.service';

import { AuditoriaModule } from '../auditoria/auditoria.module';
import { StorageFactory } from './storage/storage.factory';
import { ArquivosDownloadController } from './arquivos-download.controller';
import { ArquivosDownloadService } from './arquivos-download.service';
import { ArquivoAccessPolicyService } from './arquivo-access-policy.service';
import { ArquivosCleanupService } from './arquivos-cleanup.service';

@Module({
  imports: [PrismaModule, TenantModule, AuditoriaModule],

  controllers: [ArquivosController, ArquivosDownloadController],

  providers: [
    ArquivosService,
    LocalStorageService,
    StorageFactory,
    ArquivosDownloadService,
    ArquivoAccessPolicyService,
    ArquivosCleanupService,
  ],

  exports: [ArquivosDownloadService, ArquivosService, ArquivosCleanupService],
})
export class ArquivosModule {}
