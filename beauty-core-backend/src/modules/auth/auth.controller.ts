import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LogoutDto } from './dto/logout.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

import {
  getRequestIp,
  getRequestMethod,
  getRequestRoute,
  getRequestUserAgent,
} from '../../common/utils/audit-request.util';

@ApiTags('Auth Admin')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @Throttle({
    default: {
      limit: 5,
      ttl: 60000,
    },
  })
  @ApiOperation({
    summary: 'Login administrativo',
    description:
      'Autentica usuários administrativos do painel Beauty Core e retorna access token, refresh token e dados do usuário.',
  })
  @ApiBody({
    description: 'Credenciais do usuário administrativo.',
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'admin@beautycore.com',
          description: 'E-mail do usuário administrativo.',
        },
        senha: {
          type: 'string',
          example: '123456',
          description: 'Senha do usuário administrativo.',
          minLength: 6,
        },
      },
      required: ['email', 'senha'],
    },
  })
  @ApiCreatedResponse({
    description: 'Login realizado com sucesso.',
    schema: {
      example: {
        access_token: 'jwt.access.token',
        refresh_token: 'jwt.refresh.token',
        expires_in: 28800,
        usuario: {
          id: '550e8400-e29b-41d4-a716-446655440000',
          nome: 'Administrador Beauty Core',
          email: 'admin@beautycore.com',
          role: 'ADMIN',
          empresaId: '550e8400-e29b-41d4-a716-446655440000',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos ou campos obrigatórios ausentes.',
  })
  @ApiUnauthorizedResponse({
    description: 'E-mail ou senha inválidos.',
  })
  @ApiResponse({
    status: 429,
    description: 'Muitas tentativas de login. Aguarde antes de tentar novamente.',
  })
  async login(
    @Body() loginDto: LoginDto,
    @Req() req: any,
  ) {
    return this.authService.login(loginDto, {
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
    summary: 'Renovar token administrativo',
    description:
      'Valida o refresh token Admin, rotaciona a sessão e retorna novo access token e novo refresh token.',
  })
  @ApiBody({
    type: RefreshTokenDto,
  })
  @ApiOkResponse({
    description: 'Token renovado com sucesso.',
    schema: {
      example: {
        access_token: 'novo.jwt.access.token',
        refresh_token: 'novo.jwt.refresh.token',
        expires_in: 28800,
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Refresh token inválido, expirado, revogado ou reutilizado.',
  })
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refresh(dto);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Logout da sessão administrativa atual',
    description:
      'Revoga a sessão administrativa atual. O refresh token não poderá mais ser usado para renovar acesso.',
  })
  @ApiBody({
    type: LogoutDto,
  })
  @ApiOkResponse({
    description: 'Logout realizado com sucesso.',
    schema: {
      example: {
        message: 'Logout realizado com sucesso.',
      },
    },
  })
  logout(
    @Req() req: any,
    @Body() dto: LogoutDto,
  ) {
    return this.authService.logout(req.user, dto);
  }

  @Post('logout-all')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Encerrar todas as sessões administrativas',
    description:
      'Revoga todas as sessões ativas do usuário administrativo autenticado.',
  })
  @ApiOkResponse({
    description: 'Todas as sessões foram encerradas.',
    schema: {
      example: {
        message: 'Todas as sessões foram encerradas com sucesso.',
        totalRevogadas: 3,
      },
    },
  })
  logoutAll(@Req() req: any) {
    return this.authService.logoutAll(req.user);
  }

  @Get('sessoes')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Listar sessões administrativas ativas',
    description:
      'Lista os dispositivos/sessões ativas do usuário administrativo autenticado sem expor hashes ou tokens.',
  })
  @ApiOkResponse({
    description: 'Sessões ativas retornadas com sucesso.',
    schema: {
      example: [
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          ip: '127.0.0.1',
          dispositivo: 'Desktop',
          sistemaOperacional: 'Windows',
          navegador: 'Chrome',
          ultimaAtividade: '2026-06-18T18:00:00.000Z',
          expiraEm: '2026-07-18T18:00:00.000Z',
          createdAt: '2026-06-18T18:00:00.000Z',
        },
      ],
    },
  })
  sessoes(@Req() req: any) {
    return this.authService.listarSessoes(req.user);
  }

  @Delete('sessoes/:sessaoId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Encerrar sessão administrativa específica',
    description:
      'Revoga uma sessão/dispositivo específico pertencente ao usuário administrativo autenticado.',
  })
  @ApiParam({
    name: 'sessaoId',
    description: 'ID da sessão que será revogada.',
  })
  @ApiOkResponse({
    description: 'Sessão encerrada com sucesso.',
    schema: {
      example: {
        message: 'Sessão encerrada com sucesso.',
      },
    },
  })
  revogarSessao(
    @Req() req: any,
    @Param('sessaoId') sessaoId: string,
  ) {
    return this.authService.revogarSessaoEspecifica(req.user, sessaoId);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Usuário administrativo autenticado',
    description:
      'Retorna os dados do usuário administrativo autenticado pelo token JWT Admin.',
  })
  @ApiOkResponse({
    description: 'Usuário autenticado retornado com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        email: 'admin@beautycore.com',
        role: 'ADMIN',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        sessaoId: '550e8400-e29b-41d4-a716-446655440000',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Token ausente, inválido, expirado ou sessão revogada.',
  })
  perfil(@Req() req: any) {
    return req.user;
  }
}
