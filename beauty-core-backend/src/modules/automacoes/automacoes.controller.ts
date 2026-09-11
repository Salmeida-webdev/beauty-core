import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AutomacoesService } from './automacoes.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

import { Roles } from '../../shared/decorators/roles.decorator';

import { ProcessarEventoDto } from './dto/processar-evento.dto';

type CompanyAuthenticatedRequest = {
  user: {
    empresaId: string;
    sub?: string;
    id?: string;
    usuarioId?: string;
    clienteId?: string;
    role?: import('@prisma/client').Role;
  };
};

@ApiTags('Automacoes')
@ApiBearerAuth('JWT')
@Controller('automacoes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AutomacoesController {
  constructor(private readonly automacoesService: AutomacoesService) {}

  @Post('eventos')
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Processar evento de automação',
    description:
      'Processa manualmente um evento interno de automação dentro do contexto da empresa autenticada. Endpoint administrativo para execução controlada de eventos do sistema.',
  })
  @ApiBody({
    type: ProcessarEventoDto,
    description:
      'Dados do evento que será processado pela camada de automações.',
  })
  @ApiCreatedResponse({
    description: 'Evento de automação processado com sucesso.',
    schema: {
      example: {
        message: 'Evento processado com sucesso.',
        evento: {
          id: '550e8400-e29b-41d4-a716-446655440000',
          empresaId: '550e8400-e29b-41d4-a716-446655440000',
          tipo: 'ANIVERSARIO_CLIENTE',
          status: 'PROCESSADO',
          createdAt: '2026-06-14T10:00:00.000Z',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Payload inválido ou dados obrigatórios ausentes.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  processarEvento(
    @Req() req: CompanyAuthenticatedRequest,
    @Body() dto: ProcessarEventoDto,
  ) {
    return this.automacoesService.processarEvento({
      ...dto,
      empresaId: req.user.empresaId,
    });
  }

  @Post('teste-aniversario')
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Testar automação de aniversário',
    description:
      'Executa manualmente a rotina de teste de aniversário para a empresa autenticada. Endpoint administrativo usado para validação operacional das automações.',
  })
  @ApiCreatedResponse({
    description: 'Teste de automação de aniversário executado com sucesso.',
    schema: {
      example: {
        message: 'Teste de aniversário executado com sucesso.',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  testarAniversario(@Req() req: CompanyAuthenticatedRequest) {
    return this.automacoesService.testarAniversario(req.user.empresaId);
  }

  @Post('teste-relatorio')
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Testar automação de relatório',
    description:
      'Executa manualmente a rotina de teste de relatório para a empresa autenticada. Endpoint administrativo usado para validar geração/processamento de relatórios automatizados.',
  })
  @ApiCreatedResponse({
    description: 'Teste de automação de relatório executado com sucesso.',
    schema: {
      example: {
        message: 'Teste de relatório executado com sucesso.',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  testarRelatorio(@Req() req: CompanyAuthenticatedRequest) {
    return this.automacoesService.testarRelatorio(req.user.empresaId);
  }

  @Get('eventos')
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Listar eventos de automação',
    description:
      'Lista os eventos de automação registrados para a empresa autenticada. Endpoint administrativo para acompanhamento e diagnóstico das automações.',
  })
  @ApiOkResponse({
    description: 'Eventos de automação retornados com sucesso.',
    schema: {
      example: [
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          empresaId: '550e8400-e29b-41d4-a716-446655440000',
          tipo: 'ANIVERSARIO_CLIENTE',
          status: 'PROCESSADO',
          createdAt: '2026-06-14T10:00:00.000Z',
        },
      ],
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  listarEventos(@Req() req: CompanyAuthenticatedRequest) {
    return this.automacoesService.listarEventos(req.user.empresaId);
  }
}
