import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { TenantPublicService } from '../../shared/tenant';

@ApiTags('Tenant Público')
@Controller('tenant-publico')
export class TenantPublicoController {
  constructor(
    private readonly tenantPublicService: TenantPublicService,
  ) {}

  @Get('slug/:slug')
  @ApiOperation({
    summary: 'Resolver empresa pública por slug',
    description:
      'Retorna os dados públicos de uma empresa ativa a partir do slug. Usado por frontend, PWA, app mobile e portal do cliente antes do login.',
  })
  @ApiParam({
    name: 'slug',
    example: 'clinica-bella',
    description: 'Slug público da empresa.',
  })
  resolverPorSlug(@Param('slug') slug: string) {
    return this.tenantPublicService.resolverPorSlug(slug);
  }

  @Get('dominio')
  @ApiOperation({
    summary: 'Resolver empresa pública por domínio',
    description:
      'Retorna os dados públicos de uma empresa ativa a partir de um domínio personalizado ou subdomínio.',
  })
  @ApiQuery({
    name: 'dominio',
    example: 'clinicabella.com.br',
    description: 'Domínio público da empresa.',
  })
  resolverPorDominio(@Query('dominio') dominio: string) {
    return this.tenantPublicService.resolverPorDominio(dominio);
  }

  @Get('resolver')
  @ApiOperation({
    summary: 'Resolver empresa pública por slug ou domínio',
    description:
      'Endpoint flexível para resolver tenant público usando slug ou domínio.',
  })
  @ApiQuery({
    name: 'slug',
    required: false,
    example: 'clinica-bella',
  })
  @ApiQuery({
    name: 'dominio',
    required: false,
    example: 'clinicabella.com.br',
  })
  resolverTenantPublico(
    @Query('slug') slug?: string,
    @Query('dominio') dominio?: string,
  ) {
    return this.tenantPublicService.resolverTenantPublico({
      slug,
      dominio,
    });
  }
}