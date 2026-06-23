import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
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
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { NiveisFidelidadeService } from './niveis-fidelidade.service';
import { CreateNivelFidelidadeDto } from './dto/create-nivel-fidelidade.dto';
import { UpdateNivelFidelidadeDto } from './dto/update-nivel-fidelidade.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../shared/decorators/roles.decorator';

@ApiTags('Niveis Fidelidade')
@ApiBearerAuth('JWT')
@Controller('niveis-fidelidade')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NiveisFidelidadeController {
  constructor(
    private readonly niveisFidelidadeService: NiveisFidelidadeService,
  ) {}

  @Post()
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Criar nível de fidelidade',
    description:
      'Cria um nível de fidelidade para a empresa autenticada. Endpoint administrativo usado para definir faixas como Bronze, Prata, Ouro ou níveis personalizados conforme pontuação acumulada dos clientes.',
  })
  @ApiBody({
    type: CreateNivelFidelidadeDto,
    description: 'Dados necessários para criação de um nível de fidelidade.',
  })
  @ApiCreatedResponse({
    description: 'Nível de fidelidade criado com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Prata',
        pontosMinimos: 500,
        beneficios: 'Prioridade no atendimento e desconto especial.',
        ativo: true,
        createdAt: '2026-06-14T10:00:00.000Z',
        updatedAt: '2026-06-14T10:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos ou campos obrigatórios ausentes.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  create(
    @Req() req: any,
    @Body() dto: CreateNivelFidelidadeDto,
  ) {
    return this.niveisFidelidadeService.create(req.user.empresaId, dto);
  }

  @Get()
  @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
  @ApiOperation({
    summary: 'Listar níveis de fidelidade',
    description:
      'Lista os níveis de fidelidade cadastrados para a empresa autenticada. Endpoint usado pelo painel administrativo e atendimento para consultar regras de progressão dos clientes.',
  })
  @ApiOkResponse({
    description: 'Níveis de fidelidade retornados com sucesso.',
    schema: {
      example: [
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          empresaId: '550e8400-e29b-41d4-a716-446655440000',
          nome: 'Prata',
          pontosMinimos: 500,
          beneficios: 'Prioridade no atendimento e desconto especial.',
          ativo: true,
          createdAt: '2026-06-14T10:00:00.000Z',
          updatedAt: '2026-06-14T10:00:00.000Z',
        },
      ],
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão. Permitido para ADMIN, GERENTE, RECEPCAO e PROFISSIONAL.',
  })
  findAll(@Req() req: any) {
    return this.niveisFidelidadeService.findAll(req.user.empresaId);
  }

  @Get(':id')
  @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
  @ApiOperation({
    summary: 'Buscar nível de fidelidade por ID',
    description:
      'Busca um nível de fidelidade específico pelo ID, respeitando o isolamento multiempresa da empresa autenticada.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do nível de fidelidade.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Nível de fidelidade encontrado com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Prata',
        pontosMinimos: 500,
        beneficios: 'Prioridade no atendimento e desconto especial.',
        ativo: true,
        createdAt: '2026-06-14T10:00:00.000Z',
        updatedAt: '2026-06-14T10:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'ID inválido. O parâmetro deve ser um UUID válido.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão. Permitido para ADMIN, GERENTE, RECEPCAO e PROFISSIONAL.',
  })
  @ApiNotFoundResponse({
    description:
      'Nível de fidelidade não encontrado para a empresa autenticada.',
  })
  findOne(
    @Req() req: any,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.niveisFidelidadeService.findOne(req.user.empresaId, id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Atualizar nível de fidelidade',
    description:
      'Atualiza parcialmente um nível de fidelidade da empresa autenticada. Endpoint administrativo usado para alterar nome, pontuação mínima e benefícios do nível.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do nível de fidelidade que será atualizado.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiBody({
    type: UpdateNivelFidelidadeDto,
    description:
      'Dados permitidos para atualização parcial do nível de fidelidade.',
  })
  @ApiOkResponse({
    description: 'Nível de fidelidade atualizado com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Ouro',
        pontosMinimos: 1000,
        beneficios: 'Atendimento prioritário, desconto especial e bônus exclusivo.',
        ativo: true,
        createdAt: '2026-06-14T10:00:00.000Z',
        updatedAt: '2026-06-14T11:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'ID inválido, payload inválido ou dados fora das regras permitidas.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  @ApiNotFoundResponse({
    description:
      'Nível de fidelidade não encontrado para a empresa autenticada.',
  })
  update(
    @Req() req: any,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateNivelFidelidadeDto,
  ) {
    return this.niveisFidelidadeService.update(req.user.empresaId, id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Remover nível de fidelidade',
    description:
      'Remove ou inativa um nível de fidelidade da empresa autenticada conforme a regra implementada no serviço. Endpoint administrativo usado para manutenção da estrutura de níveis.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do nível de fidelidade que será removido.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Nível de fidelidade removido com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        removido: true,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'ID inválido ou nível sem permissão de remoção.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  @ApiNotFoundResponse({
    description:
      'Nível de fidelidade não encontrado para a empresa autenticada.',
  })
  remove(
    @Req() req: any,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.niveisFidelidadeService.remove(req.user.empresaId, id);
  }
}