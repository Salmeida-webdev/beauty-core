import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ConfiguracaoFidelidadeService } from './configuracao-fidelidade.service';

import { CreateConfiguracaoFidelidadeDto } from './dto/create-configuracao-fidelidade.dto';
import { UpdateConfiguracaoFidelidadeDto } from './dto/update-configuracao-fidelidade.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

import { Roles } from '../../shared/decorators/roles.decorator';

type CompanyAuthenticatedRequest = {
  user: { empresaId: string };
};
@ApiTags('Configuracao Fidelidade')
@ApiBearerAuth('JWT')
@Controller('configuracao-fidelidade')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ConfiguracaoFidelidadeController {
  constructor(private readonly service: ConfiguracaoFidelidadeService) {}

  @Post()
  @Roles('ADMIN')
  @ApiOperation({
    summary: 'Criar configuração de fidelidade',
    description:
      'Cria a configuração de fidelidade da empresa autenticada. Endpoint administrativo usado para definir regras globais de pontos, benefícios e funcionamento do programa de fidelidade.',
  })
  @ApiBody({
    type: CreateConfiguracaoFidelidadeDto,
    description:
      'Dados necessários para criação da configuração de fidelidade.',
  })
  @ApiCreatedResponse({
    description: 'Configuração de fidelidade criada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        ativo: true,
        pontosPorReal: 1,
        pontosAniversario: 50,
        validadePontosDias: 365,
        permitirResgateAutomatico: false,
        createdAt: '2026-06-14T10:00:00.000Z',
        updatedAt: '2026-06-14T10:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description:
      'Dados inválidos, campos obrigatórios ausentes ou configuração já existente.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Usuário sem permissão. Permitido apenas para ADMIN.',
  })
  create(
    @Req() req: CompanyAuthenticatedRequest,
    @Body() dto: CreateConfiguracaoFidelidadeDto,
  ) {
    return this.service.create(req.user.empresaId, dto);
  }

  @Get()
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Buscar configuração de fidelidade',
    description:
      'Retorna a configuração de fidelidade da empresa autenticada. Endpoint usado pelo painel administrativo para exibir regras atuais do programa de fidelidade.',
  })
  @ApiOkResponse({
    description: 'Configuração de fidelidade retornada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        ativo: true,
        pontosPorReal: 1,
        pontosAniversario: 50,
        validadePontosDias: 365,
        permitirResgateAutomatico: false,
        createdAt: '2026-06-14T10:00:00.000Z',
        updatedAt: '2026-06-14T10:00:00.000Z',
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
  @ApiNotFoundResponse({
    description:
      'Configuração de fidelidade não encontrada para a empresa autenticada.',
  })
  findOne(@Req() req: CompanyAuthenticatedRequest) {
    return this.service.findOne(req.user.empresaId);
  }

  @Patch()
  @Roles('ADMIN')
  @ApiOperation({
    summary: 'Atualizar configuração de fidelidade',
    description:
      'Atualiza a configuração de fidelidade da empresa autenticada. Endpoint administrativo usado para ajustar regras de pontuação, aniversário, validade e comportamento do programa.',
  })
  @ApiBody({
    type: UpdateConfiguracaoFidelidadeDto,
    description:
      'Dados permitidos para atualização parcial da configuração de fidelidade.',
  })
  @ApiOkResponse({
    description: 'Configuração de fidelidade atualizada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        ativo: true,
        pontosPorReal: 2,
        pontosAniversario: 100,
        validadePontosDias: 365,
        permitirResgateAutomatico: true,
        createdAt: '2026-06-14T10:00:00.000Z',
        updatedAt: '2026-06-14T11:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Payload inválido ou valores fora das regras permitidas.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Usuário sem permissão. Permitido apenas para ADMIN.',
  })
  @ApiNotFoundResponse({
    description:
      'Configuração de fidelidade não encontrada para a empresa autenticada.',
  })
  update(
    @Req() req: CompanyAuthenticatedRequest,
    @Body() dto: UpdateConfiguracaoFidelidadeDto,
  ) {
    return this.service.update(req.user.empresaId, dto);
  }
}
