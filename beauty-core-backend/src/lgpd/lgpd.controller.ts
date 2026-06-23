import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import type { Request } from 'express';
import { Role } from '@prisma/client';

import { LgpdService } from './lgpd.service';
import {
  LgpdAnonimizacaoResponseDto,
  LgpdClienteExportResponseDto,
} from './dto/lgpd-cliente-export-response.dto';
import { JwtAuthGuard } from '../modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../modules/auth/guards/roles.guard';
import { Roles } from '../shared/decorators/roles.decorator';

@ApiTags('LGPD')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller('lgpd')
export class LgpdController {
  constructor(private readonly lgpdService: LgpdService) {}

  @Get('exportar-cliente/:clienteId')
  @ApiOperation({
    summary: 'Exportar dados LGPD de um cliente',
    description:
      'Exporta dados pessoais e relacionamentos operacionais do cliente autenticado no contexto administrativo. Permitido para ADMIN e SUPER_ADMIN.',
  })
  @ApiOkResponse({
    type: LgpdClienteExportResponseDto,
    description: 'Dados LGPD do cliente exportados com sucesso.',
  })
  exportarCliente(
    @Param('clienteId') clienteId: string,
    @Req() request: Request,
  ) {
    return this.lgpdService.exportarCliente(clienteId, request as any);
  }

  @Post('anonimizar-cliente/:clienteId')
  @ApiOperation({
    summary: 'Anonimizar dados pessoais de um cliente',
    description:
      'Anonimiza nome, telefone e email do cliente preservando integridade financeira, vínculos técnicos e auditoria histórica. Permitido para ADMIN e SUPER_ADMIN.',
  })
  @ApiOkResponse({
    type: LgpdAnonimizacaoResponseDto,
    description: 'Cliente anonimizado com sucesso.',
  })
  anonimizarCliente(
    @Param('clienteId') clienteId: string,
    @Req() request: Request,
  ) {
    return this.lgpdService.anonimizarCliente(clienteId, request as any);
  }
}
