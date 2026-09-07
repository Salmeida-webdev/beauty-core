import {
  Body,
  Controller,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
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
import { SolicitarCodigoDto } from './dto/solicitar-codigo.dto';
import { VerificarCodigoDto } from './dto/verificar-codigo.dto';

@ApiTags('Auth Cliente Público')
@Controller('public/:slug/auth-cliente')
export class AuthClientePublicoController {
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
    summary: 'Solicitar código OTP do cliente por tenant público',
    description:
      'Endpoint público tenant-aware para portal web, PWA e mobile. O tenant é resolvido pelo slug da URL. O frontend nunca envia empresaId.',
  })
  @ApiParam({
    name: 'slug',
    example: 'beauty-core-demo',
    description: 'Slug público da empresa/tenant.',
  })
  @ApiBody({
    description: 'Telefone do cliente. O slug vem pela URL.',
    schema: {
      type: 'object',
      properties: {
        telefone: {
          type: 'string',
          example: '83999999999',
          description:
            'Telefone do cliente com DDD, usado para autenticação via OTP.',
        },
      },
      required: ['telefone'],
    },
  })
  @ApiCreatedResponse({
    description: 'Código de acesso gerado com sucesso.',
    schema: {
      example: {
        message: 'Código gerado com sucesso.',
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
    description: 'Telefone inválido ou tenant inválido.',
  })
  @ApiNotFoundResponse({
    description:
      'Empresa inativa/inexistente ou cliente não cadastrado no tenant resolvido.',
  })
  @ApiResponse({
    status: 403,
    description: 'Acesso ao portal do cliente está desativado.',
  })
  @ApiResponse({
    status: 429,
    description:
      'Muitas solicitações de código. Aguarde antes de tentar novamente.',
  })
  solicitarCodigoPorSlug(
    @Req() req: any,
    @Param('slug') slug: string,
    @Body() dto: SolicitarCodigoDto,
  ) {
    return this.authClienteService.solicitarCodigo(
      {
        ...dto,
        slug,
        dominio: undefined,
      },
      {
        ip: getRequestIp(req),
        userAgent: getRequestUserAgent(req),
        rota: getRequestRoute(req),
        metodoHttp: getRequestMethod(req),
      },
    );
  }

  @Post('verificar-codigo')
  @Throttle({
    default: {
      limit: 5,
      ttl: 60000,
    },
  })
  @ApiOperation({
    summary: 'Verificar código OTP do cliente por tenant público',
    description:
      'Valida o código OTP usando o slug público da URL e retorna JWT Cliente. O frontend nunca envia empresaId.',
  })
  @ApiParam({
    name: 'slug',
    example: 'beauty-core-demo',
    description: 'Slug público da empresa/tenant.',
  })
  @ApiBody({
    description: 'Telefone e código OTP. O slug vem pela URL.',
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
          description: 'Código OTP temporário do cliente.',
        },
      },
      required: ['telefone', 'codigo'],
    },
  })
  @ApiCreatedResponse({
    description: 'Código validado com sucesso. JWT Cliente gerado.',
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
    description: 'Telefone, código ou tenant inválido.',
  })
  @ApiUnauthorizedResponse({
    description: 'Código inválido ou expirado.',
  })
  @ApiNotFoundResponse({
    description:
      'Empresa inativa/inexistente ou cliente não encontrado no tenant resolvido.',
  })
  @ApiResponse({
    status: 403,
    description: 'Acesso ao portal do cliente está desativado.',
  })
  @ApiResponse({
    status: 429,
    description:
      'Muitas tentativas de verificação. Aguarde antes de tentar novamente.',
  })
  verificarCodigoPorSlug(
    @Req() req: any,
    @Param('slug') slug: string,
    @Body() dto: VerificarCodigoDto,
  ) {
    return this.authClienteService.verificarCodigo(
      {
        ...dto,
        slug,
        dominio: undefined,
      },
      {
        ip: getRequestIp(req),
        userAgent: getRequestUserAgent(req),
        rota: getRequestRoute(req),
        metodoHttp: getRequestMethod(req),
      },
    );
  }
}