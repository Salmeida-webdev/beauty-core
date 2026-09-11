import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
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

import { FidelidadeService } from './fidelidade.service';
import { CreateFidelidadeDto } from './dto/create-fidelidade.dto';
import { AdicionarPontosDto } from './dto/adicionar-pontos.dto';
import { ResgatarPontosDto } from './dto/resgatar-pontos.dto';
import { PontuarPorValorDto } from './dto/pontuar-por-valor.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../shared/decorators/roles.decorator';

type AuthenticatedControllerUser = {
  id?: string;
  sub: string;
  empresaId: string;
  usuarioId?: string;
  clienteId?: string;
  role?: string;
  tipoUsuario?: string;
};

type AuthenticatedControllerRequest = {
  headers?: Record<string, string | string[] | undefined>;
  ip?: string;
  socket?: { remoteAddress?: string | null };
  connection?: { remoteAddress?: string | null };
  originalUrl?: string;
  url?: string;
  method?: string;
  user: AuthenticatedControllerUser;
};

@ApiTags('Fidelidade')
@ApiBearerAuth('JWT')
@Controller('fidelidade')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FidelidadeController {
  constructor(private readonly fidelidadeService: FidelidadeService) {}

  @Post()
  @Roles('ADMIN', 'GERENTE', 'RECEPCAO')
  @ApiOperation({
    summary: 'Criar fidelidade para cliente',
    description:
      'Cria ou inicializa o registro de fidelidade de um cliente dentro da empresa autenticada. Endpoint usado pelo painel administrativo para ativar controle de pontos, saldo e histórico de fidelidade.',
  })
  @ApiBody({
    type: CreateFidelidadeDto,
    description: 'Dados necessários para criar o registro de fidelidade.',
  })
  @ApiCreatedResponse({
    description: 'Fidelidade criada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        clienteId: '550e8400-e29b-41d4-a716-446655440000',
        pontos: 0,
        pontosTotais: 0,
        nivelAtual: 'BRONZE',
        ativo: true,
        createdAt: '2026-06-14T10:00:00.000Z',
        updatedAt: '2026-06-14T10:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos ou fidelidade já existente para o cliente.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão. Permitido apenas para ADMIN, GERENTE e RECEPCAO.',
  })
  create(
    @Req() req: AuthenticatedControllerRequest,
    @Body() dto: CreateFidelidadeDto,
  ) {
    return this.fidelidadeService.create(req.user.empresaId, dto);
  }

  @Get('cliente/:id')
  @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
  @ApiOperation({
    summary: 'Consultar saldo de fidelidade do cliente',
    description:
      'Consulta o saldo de pontos de fidelidade de um cliente específico da empresa autenticada. Endpoint usado pelo painel administrativo, atendimento e futura área mobile do cliente.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do cliente.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Saldo de fidelidade retornado com sucesso.',
    schema: {
      example: {
        clienteId: '550e8400-e29b-41d4-a716-446655440000',
        pontos: 250,
        pontosTotais: 850,
        nivelAtual: 'PRATA',
        beneficiosDisponiveis: 2,
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
      'Cliente ou fidelidade não encontrada para a empresa autenticada.',
  })
  saldo(
    @Req() req: AuthenticatedControllerRequest,
    @Param('id', ParseUUIDPipe) clienteId: string,
  ) {
    return this.fidelidadeService.saldo(req.user.empresaId, clienteId);
  }

  @Post('adicionar-pontos')
  @Roles('ADMIN', 'GERENTE', 'RECEPCAO')
  @ApiOperation({
    summary: 'Adicionar pontos de fidelidade',
    description:
      'Adiciona pontos manualmente ao saldo de fidelidade de um cliente da empresa autenticada. Endpoint usado para ajustes administrativos, bonificações, campanhas e operações internas.',
  })
  @ApiBody({
    type: AdicionarPontosDto,
    description: 'Dados necessários para adicionar pontos ao cliente.',
  })
  @ApiCreatedResponse({
    description: 'Pontos adicionados com sucesso.',
    schema: {
      example: {
        clienteId: '550e8400-e29b-41d4-a716-446655440000',
        pontosAdicionados: 100,
        saldoAtual: 350,
        motivo: 'Bônus promocional',
        createdAt: '2026-06-14T10:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Payload inválido, pontos inválidos ou cliente não elegível.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão. Permitido apenas para ADMIN, GERENTE e RECEPCAO.',
  })
  @ApiNotFoundResponse({
    description:
      'Cliente ou fidelidade não encontrada para a empresa autenticada.',
  })
  adicionarPontos(
    @Req() req: AuthenticatedControllerRequest,
    @Body() dto: AdicionarPontosDto,
  ) {
    return this.fidelidadeService.adicionarPontos(req.user.empresaId, dto);
  }

  @Post('resgatar-pontos')
  @Roles('ADMIN', 'GERENTE', 'RECEPCAO')
  @ApiOperation({
    summary: 'Resgatar pontos de fidelidade',
    description:
      'Resgata pontos do saldo de fidelidade de um cliente da empresa autenticada. Endpoint usado para troca por benefícios, descontos ou vantagens configuradas.',
  })
  @ApiBody({
    type: ResgatarPontosDto,
    description: 'Dados necessários para resgatar pontos do cliente.',
  })
  @ApiCreatedResponse({
    description: 'Pontos resgatados com sucesso.',
    schema: {
      example: {
        clienteId: '550e8400-e29b-41d4-a716-446655440000',
        pontosResgatados: 100,
        saldoAtual: 250,
        beneficioId: '550e8400-e29b-41d4-a716-446655440000',
        createdAt: '2026-06-14T10:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description:
      'Payload inválido, pontos insuficientes, benefício inválido ou regra de resgate não atendida.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão. Permitido apenas para ADMIN, GERENTE e RECEPCAO.',
  })
  @ApiNotFoundResponse({
    description:
      'Cliente, fidelidade ou benefício não encontrado para a empresa autenticada.',
  })
  resgatarPontos(
    @Req() req: AuthenticatedControllerRequest,
    @Body() dto: ResgatarPontosDto,
  ) {
    return this.fidelidadeService.resgatarPontos(req.user.empresaId, dto);
  }

  @Get('historico/:clienteId')
  @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
  @ApiOperation({
    summary: 'Histórico de fidelidade do cliente',
    description:
      'Lista o histórico de movimentações de pontos de um cliente da empresa autenticada, incluindo adições, resgates, bonificações e pontuações por valor.',
  })
  @ApiParam({
    name: 'clienteId',
    description: 'ID do cliente.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Histórico de fidelidade retornado com sucesso.',
    schema: {
      example: [
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          clienteId: '550e8400-e29b-41d4-a716-446655440000',
          tipo: 'ADICAO',
          pontos: 100,
          descricao: 'Pontos adicionados por compra de serviço.',
          createdAt: '2026-06-14T10:00:00.000Z',
        },
      ],
    },
  })
  @ApiBadRequestResponse({
    description: 'clienteId inválido. O parâmetro deve ser um UUID válido.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão. Permitido para ADMIN, GERENTE, RECEPCAO e PROFISSIONAL.',
  })
  @ApiNotFoundResponse({
    description: 'Cliente não encontrado para a empresa autenticada.',
  })
  historico(
    @Req() req: AuthenticatedControllerRequest,
    @Param('clienteId', ParseUUIDPipe) clienteId: string,
  ) {
    return this.fidelidadeService.historico(req.user.empresaId, clienteId);
  }

  @Post('pontuar-por-valor')
  @Roles('ADMIN', 'GERENTE', 'RECEPCAO')
  @ApiOperation({
    summary: 'Pontuar cliente por valor gasto',
    description:
      'Calcula e adiciona pontos de fidelidade com base em um valor financeiro informado, seguindo a configuração de fidelidade da empresa autenticada.',
  })
  @ApiBody({
    type: PontuarPorValorDto,
    description:
      'Dados necessários para calcular e aplicar pontuação com base em valor gasto.',
  })
  @ApiCreatedResponse({
    description: 'Pontuação por valor aplicada com sucesso.',
    schema: {
      example: {
        clienteId: '550e8400-e29b-41d4-a716-446655440000',
        valor: 200,
        pontosGerados: 20,
        saldoAtual: 370,
        createdAt: '2026-06-14T10:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description:
      'Payload inválido, valor inválido ou configuração de fidelidade ausente.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão. Permitido apenas para ADMIN, GERENTE e RECEPCAO.',
  })
  @ApiNotFoundResponse({
    description:
      'Cliente ou fidelidade não encontrada para a empresa autenticada.',
  })
  pontuarPorValor(
    @Req() req: AuthenticatedControllerRequest,
    @Body() dto: PontuarPorValorDto,
  ) {
    return this.fidelidadeService.pontuarPorValor(req.user.empresaId, dto);
  }

  @Get('beneficio-disponivel/:clienteId')
  @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
  @ApiOperation({
    summary: 'Consultar benefícios disponíveis do cliente',
    description:
      'Consulta quais benefícios estão disponíveis para um cliente com base no saldo de pontos, regras de fidelidade e benefícios cadastrados na empresa autenticada.',
  })
  @ApiParam({
    name: 'clienteId',
    description: 'ID do cliente.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Benefícios disponíveis retornados com sucesso.',
    schema: {
      example: [
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          nome: 'Desconto especial',
          descricao: 'Benefício para clientes fidelizados.',
          pontosNecessarios: 100,
          disponivel: true,
        },
      ],
    },
  })
  @ApiBadRequestResponse({
    description: 'clienteId inválido. O parâmetro deve ser um UUID válido.',
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
      'Cliente ou fidelidade não encontrada para a empresa autenticada.',
  })
  beneficioDisponivel(
    @Req() req: AuthenticatedControllerRequest,
    @Param('clienteId', ParseUUIDPipe) clienteId: string,
  ) {
    return this.fidelidadeService.beneficioDisponivel(
      req.user.empresaId,
      clienteId,
    );
  }

  @Get('nivel-atual/:clienteId')
  @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
  @ApiOperation({
    summary: 'Consultar nível atual do cliente',
    description:
      'Consulta o nível atual de fidelidade do cliente dentro da empresa autenticada, considerando pontuação acumulada e regras de níveis cadastradas.',
  })
  @ApiParam({
    name: 'clienteId',
    description: 'ID do cliente.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Nível atual do cliente retornado com sucesso.',
    schema: {
      example: {
        clienteId: '550e8400-e29b-41d4-a716-446655440000',
        nivelAtual: {
          id: '550e8400-e29b-41d4-a716-446655440000',
          nome: 'Prata',
          pontosMinimos: 500,
          beneficios: ['Prioridade no atendimento', 'Desconto especial'],
        },
        pontosTotais: 850,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'clienteId inválido. O parâmetro deve ser um UUID válido.',
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
      'Cliente ou fidelidade não encontrada para a empresa autenticada.',
  })
  nivelAtual(
    @Req() req: AuthenticatedControllerRequest,
    @Param('clienteId', ParseUUIDPipe) clienteId: string,
  ) {
    return this.fidelidadeService.nivelAtual(req.user.empresaId, clienteId);
  }
}
