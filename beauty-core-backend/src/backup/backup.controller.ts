import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';

import { BackupService } from './backup.service';
import { JwtAuthGuard } from '../modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../modules/auth/guards/roles.guard';
import { Roles } from '../shared/decorators/roles.decorator';

@ApiTags('Backup & Recovery')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller('backup')
export class BackupController {
  constructor(private readonly backupService: BackupService) {}

  @Get('status')
  @ApiOperation({ summary: 'Consultar status operacional de backup e recovery' })
  @ApiOkResponse({ description: 'Status operacional retornado com sucesso.' })
  status() {
    return this.backupService.getStatus();
  }

  @Post('executar/postgres')
  @ApiOperation({ summary: 'Registrar rotina de backup PostgreSQL' })
  @ApiOkResponse({ description: 'Rotina PostgreSQL registrada em modo seguro.' })
  executarPostgres() {
    return this.backupService.executarBackupPostgres();
  }

  @Post('executar/uploads')
  @ApiOperation({ summary: 'Registrar rotina de backup de uploads' })
  @ApiOkResponse({ description: 'Rotina de uploads registrada em modo seguro.' })
  executarUploads() {
    return this.backupService.executarBackupUploads();
  }

  @Post('executar/completo')
  @ApiOperation({ summary: 'Registrar rotina de backup completo' })
  @ApiOkResponse({ description: 'Rotina completa registrada em modo seguro.' })
  executarCompleto() {
    return this.backupService.executarBackupCompleto();
  }  
  @Post('limpeza')
  @ApiOperation({ summary: 'Executar limpeza operacional de retenção' })
  @ApiOkResponse({ description: 'Limpeza operacional executada.' })
  executarLimpeza() {
    return this.backupService.executarLimpezaOperacional();
  }
}
