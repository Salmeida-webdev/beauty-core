import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { TenantPublicService } from '../../shared/tenant';

@ApiTags('Tenant Público')
@Controller('public/tenant')
export class PublicTenantController {
  constructor(
    private readonly tenantPublicService: TenantPublicService,
  ) {}

  @Get(':slug')
  @ApiOperation({
    summary: 'Resolver tenant público para portal do cliente',
    description:
      'Retorna apenas dados públicos e seguros do tenant para uso em portal web, PWA, app Android, app iOS e white-label mobile. Não expõe empresaId, plano, status interno, tokens ou dados administrativos.',
  })
  @ApiParam({
    name: 'slug',
    example: 'beauty-core-demo',
    description: 'Slug público da empresa/tenant.',
  })
  @ApiOkResponse({
    description: 'Tenant público resolvido com sucesso.',
    schema: {
      example: {
        data: {
          nome: 'Beauty Core Demo',
          slug: 'beauty-core-demo',
          logo: null,
          corPrimaria: '#7C3AED',
          corSecundaria: null,
          dominio: null,
          whatsapp: '83999999999',
          portalClienteAtivo: true,
        },
        meta: {},
      },
    },
  })
  async resolverTenantPorSlug(@Param('slug') slug: string) {
    const tenant = await this.tenantPublicService.resolverPorSlug(slug);

    const dados = tenant as any;

    return {
      data: {
        nome: dados?.nome ?? null,
        slug: dados?.slug ?? slug,
        logo: dados?.logo ?? null,
        corPrimaria: dados?.corPrimaria ?? null,
        corSecundaria: dados?.corSecundaria ?? null,
        dominio: dados?.dominio ?? null,
        whatsapp:
          dados?.whatsapp ??
          dados?.telefone ??
          dados?.configuracaoWhatsApp?.numeroWhatsApp ??
          null,
        portalClienteAtivo:
          dados?.portalClienteAtivo ??
          dados?.ativoPortal ??
          true,
      },
      meta: {},
    };
  }
}