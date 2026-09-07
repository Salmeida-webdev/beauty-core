import { LogoutClienteDto } from './dto/logout-cliente.dto';
import { RefreshClienteTokenDto } from './dto/refresh-cliente-token.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { Throttle } from '@nestjs/throttler';

import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import {
  getRequestIp,
  getRequestMethod,
  getRequestRoute,
  getRequestUserAgent,
} from '../../common/utils/audit-request.util';

import { AuthClienteService } from './auth-cliente.service';
import { AceitarTermosDto } from './dto/aceitar-termos.dto';
import { SolicitarCodigoDto } from './dto/solicitar-codigo.dto';
import { VerificarCodigoDto } from './dto/verificar-codigo.dto';
import { ClienteAuthGuard } from './guards/cliente-auth.guard';

@ApiTags('Auth Cliente')
@Controller('auth-cliente')
export class AuthClienteController {
  constructor(
    private readonly authClienteService: AuthClienteService,
  ) {}

  @Post('solicitar-codigo')
  @Throttle({
    default: {
      limit: 3,
      ttl: 60000,
    },
  })
  @ApiOperation({
    summary: 'Solicitar cÃ³digo OTP do cliente',
    description:
      'Endpoint pÃºblico para gerar cÃ³digo de acesso temporÃ¡rio do cliente final. A empresa Ã© resolvida por slug ou domÃ­nio antes da geraÃ§Ã£o do OTP, sem expor empresaId ao cliente.',
  })
  @ApiBody({
    description:
      'Telefone do cliente e identificaÃ§Ã£o pÃºblica da empresa por slug ou domÃ­nio.',
    schema: {
      type: 'object',
      properties: {
        telefone: {
          type: 'string',
          example: '83999999999',
          description:
            'Telefone do cliente com DDD, usado para autenticaÃ§Ã£o via OTP.',
        },
        slug: {
          type: 'string',
          example: 'beauty-core-demo',
          description:
            'Slug pÃºblico da empresa. Informe slug ou domÃ­nio.',
        },
        dominio: {
          type: 'string',
          example: 'beauty-demo.local',
          description:
            'DomÃ­nio pÃºblico da empresa. Informe domÃ­nio ou slug.',
        },
      },
      required: ['telefone'],
    },
  })
  @ApiCreatedResponse({
    description: 'CÃ³digo de acesso gerado com sucesso.',
    schema: {
      example: {
        message: 'CÃ³digo gerado com sucesso.',
        empresa: {
          empresaId: '112edaa6-4b46-416e-b090-c0c3e8be98f6',
          nome: 'Beauty Core Demo',
          slug: 'beauty-core-demo',
          dominio: null,
          logo: null,
        },
        codigoDesenvolvimento: '123456',
      },
    },
  })
  @ApiBadRequestResponse({
    description:
      'Telefone invÃ¡lido, slug/domÃ­nio ausente ou slug e domÃ­nio enviados simultaneamente.',
  })
  @ApiNotFoundResponse({
    description:
      'Empresa inativa/inexistente ou cliente nÃ£o cadastrado no tenant resolvido.',
  })
  @ApiResponse({
    status: 403,
    description: 'Acesso ao portal do cliente estÃ¡ desativado.',
  })
  @ApiResponse({
    status: 429,
    description:
      'Muitas solicitaÃ§Ãµes de cÃ³digo. Aguarde antes de tentar novamente.',
  })
  solicitarCodigo(
    @Req() req: any,
    @Body() dto: SolicitarCodigoDto,
  ) {
    return this.authClienteService.solicitarCodigo(dto, {
      ip: getRequestIp(req),
      userAgent: getRequestUserAgent(req),
      rota: getRequestRoute(req),
      metodoHttp: getRequestMethod(req),
    });
  }

  @Post('verificar-codigo')
  @Throttle({
    default: {
      limit: 5,
      ttl: 60000,
    },
  })
  @ApiOperation({
    summary: 'Verificar cÃ³digo OTP do cliente',
    description:
      'Endpoint pÃºblico para validar o cÃ³digo OTP do cliente final e retornar um JWT Cliente. A empresa Ã© resolvida por slug ou domÃ­nio antes da validaÃ§Ã£o do cÃ³digo.',
  })
  @ApiBody({
    description:
      'Telefone, cÃ³digo OTP e identificaÃ§Ã£o pÃºblica da empresa por slug ou domÃ­nio.',
    schema: {
      type: 'object',
      properties: {
        telefone: {
          type: 'string',
          example: '83999999999',
          description: 'Telefone do cliente com DDD.',
        },
        codigo: {
          type: 'string',
          example: '123456',
          description:
            'CÃ³digo OTP temporÃ¡rio enviado ou gerado para o cliente.',
        },
        slug: {
          type: 'string',
          example: 'beauty-core-demo',
          description:
            'Slug pÃºblico da empresa. Informe slug ou domÃ­nio.',
        },
        dominio: {
          type: 'string',
          example: 'beauty-demo.local',
          description:
            'DomÃ­nio pÃºblico da empresa. Informe domÃ­nio ou slug.',
        },
      },
      required: ['telefone', 'codigo'],
    },
  })
  @ApiCreatedResponse({
    description: 'CÃ³digo validado com sucesso. JWT Cliente gerado.',
    schema: {
      example: {
        access_token: 'jwt.cliente.token.exemplo',
        primeiroAcesso: true,
        empresa: {
          empresaId: '112edaa6-4b46-416e-b090-c0c3e8be98f6',
          nome: 'Beauty Core Demo',
          slug: 'beauty-core-demo',
          dominio: null,
          logo: null,
        },
        cliente: {
          id: '550e8400-e29b-41d4-a716-446655440000',
          nome: 'Maria Silva',
          telefone: '83999999999',
          empresaId: '112edaa6-4b46-416e-b090-c0c3e8be98f6',
          aceitouTermos: false,
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description:
      'Telefone, cÃ³digo, slug/domÃ­nio invÃ¡lido ou cÃ³digo jÃ¡ utilizado.',
  })
  @ApiUnauthorizedResponse({
    description: 'CÃ³digo invÃ¡lido ou expirado.',
  })
  @ApiNotFoundResponse({
    description:
      'Empresa inativa/inexistente ou cliente nÃ£o encontrado no tenant resolvido.',
  })
  @ApiResponse({
    status: 403,
    description: 'Acesso ao portal do cliente estÃ¡ desativado.',
  })
  @ApiResponse({
    status: 429,
    description:
      'Muitas tentativas de verificaÃ§Ã£o. Aguarde antes de tentar novamente.',
  })
  verificarCodigo(
    @Req() req: any,
    @Body() dto: VerificarCodigoDto,
  ) {
    return this.authClienteService.verificarCodigo(dto, {
      ip: getRequestIp(req),
      userAgent: getRequestUserAgent(req),
      rota: getRequestRoute(req),
      metodoHttp: getRequestMethod(req),
    });
  }


  @Throttle({
    default: {
      limit: 10,
      ttl: 60000,
    },
  })
  @Post('refresh')
  @ApiOperation({
    summary: 'Renovar token do cliente',
    description:
      'Valida o refresh token Cliente, rotaciona a sessÃ£o e retorna novo access token e novo refresh token.',
  })
  @ApiBody({
    type: RefreshClienteTokenDto,
  })
  @ApiOkResponse({
    description: 'Token do cliente renovado com sucesso.',
  })
  @ApiUnauthorizedResponse({
    description: 'Refresh token invÃ¡lido, expirado, revogado ou reutilizado.',
  })
  refresh(@Body() dto: RefreshClienteTokenDto) {
    return this.authClienteService.refreshCliente(dto);
  }

  @UseGuards(ClienteAuthGuard)
  @Post('logout')
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Logout da sessÃ£o atual do cliente',
  })
  @ApiBody({
    type: LogoutClienteDto,
  })
  logout(
    @Req() req: any,
    @Body() dto: LogoutClienteDto,
  ) {
    return this.authClienteService.logoutCliente(req.user, dto);
  }

  @UseGuards(ClienteAuthGuard)
  @Post('logout-all')
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Encerrar todas as sessÃµes do cliente',
  })
  logoutAll(@Req() req: any) {
    return this.authClienteService.logoutAllCliente(req.user);
  }

  @UseGuards(ClienteAuthGuard)
  @Get('sessoes')
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Listar sessÃµes ativas do cliente',
  })
  sessoes(@Req() req: any) {
    return this.authClienteService.listarSessoesCliente(req.user);
  }

  @UseGuards(ClienteAuthGuard)
  @Get('me')
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Cliente autenticado',
    description:
      'Retorna os dados do cliente final autenticado pelo JWT Cliente. Endpoint preparado para portal web e aplicativo mobile.',
  })
  @ApiOkResponse({
    description: 'Cliente autenticado retornado com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Maria Silva',
        telefone: '83999999999',
        email: 'maria@email.com',
        empresaId: '112edaa6-4b46-416e-b090-c0c3e8be98f6',
        primeiroAcesso: false,
        aceitouTermos: true,
        dataAceiteTermos: '2026-06-14T10:00:00.000Z',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Token Cliente ausente, invÃ¡lido ou expirado.',
  })
  @ApiNotFoundResponse({
    description: 'Cliente autenticado nÃ£o encontrado.',
  })
  me(@Req() req: any) {
    return this.authClienteService.me(
      req.user.clienteId ?? req.user.sub,
      req.user.empresaId,
    );
  }

  @UseGuards(ClienteAuthGuard)
  @Post('aceitar-termos')
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Aceitar termos de uso do cliente',
    description:
      'Registra o aceite dos termos pelo cliente final autenticado. ApÃ³s este processo, o cliente deixa de estar em primeiro acesso e pode acessar normalmente o portal/app.',
  })
  @ApiBody({
    description: 'ConfirmaÃ§Ã£o de aceite dos termos de uso.',
    schema: {
      type: 'object',
      properties: {
        aceitouTermos: {
          type: 'boolean',
          example: true,
          description:
            'Confirma se o cliente aceitou os termos de uso.',
        },
      },
      required: ['aceitouTermos'],
    },
  })
  @ApiOkResponse({
    description: 'Termos aceitos com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Maria Silva',
        telefone: '83999999999',
        empresaId: '112edaa6-4b46-416e-b090-c0c3e8be98f6',
        aceitouTermos: true,
        dataAceiteTermos: '2026-06-14T10:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Payload invÃ¡lido ou aceite nÃ£o confirmado.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Cliente ausente, invÃ¡lido ou expirado.',
  })
  @ApiNotFoundResponse({
    description: 'Cliente autenticado nÃ£o encontrado.',
  })
  aceitarTermos(
    @Req() req: any,
    @Body() dto: AceitarTermosDto,
  ) {
    return this.authClienteService.aceitarTermos(
      req.user.clienteId ?? req.user.sub,
      req.user.empresaId,
      dto,
      {
        ip: getRequestIp(req),
        userAgent: getRequestUserAgent(req),
        rota: getRequestRoute(req),
        metodoHttp: getRequestMethod(req),
      },
    );
  }
}
