import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class TenantPublicService {
  constructor(private readonly prisma: PrismaService) {}

  async resolverPorSlug(slug: string) {
    const slugNormalizado = this.normalizarSlug(slug);

    const empresa = await this.prisma.empresa.findFirst({
      where: {
        slug: slugNormalizado,
        ativo: true,
      },
      select: {
        id: true,
        nome: true,
        slug: true,
        dominio: true,
        logo: true,
        plano: true,
        ativo: true,
      },
    });

    if (!empresa) {
      throw new NotFoundException(
        'Empresa não encontrada ou inativa.',
      );
    }

    return this.montarTenantPublico(empresa);
  }

  async resolverPorDominio(dominio: string) {
    const dominioNormalizado = this.normalizarDominio(dominio);

    const empresa = await this.prisma.empresa.findFirst({
      where: {
        dominio: dominioNormalizado,
        ativo: true,
      },
      select: {
        id: true,
        nome: true,
        slug: true,
        dominio: true,
        logo: true,
        plano: true,
        ativo: true,
      },
    });

    if (!empresa) {
      throw new NotFoundException(
        'Empresa não encontrada ou inativa.',
      );
    }

    return this.montarTenantPublico(empresa);
  }

  async resolverTenantPublico(params: {
    slug?: string;
    dominio?: string;
  }) {
    if (params.slug) {
      return this.resolverPorSlug(params.slug);
    }

    if (params.dominio) {
      return this.resolverPorDominio(params.dominio);
    }

    throw new BadRequestException(
      'Informe o slug ou domínio da empresa.',
    );
  }

  private normalizarSlug(slug: string): string {
    if (!slug || typeof slug !== 'string') {
      throw new BadRequestException('Slug da empresa é obrigatório.');
    }

    const slugNormalizado = slug.trim().toLowerCase();

    if (!slugNormalizado) {
      throw new BadRequestException('Slug da empresa é obrigatório.');
    }

    return slugNormalizado;
  }

  private normalizarDominio(dominio: string): string {
    if (!dominio || typeof dominio !== 'string') {
      throw new BadRequestException(
        'Domínio da empresa é obrigatório.',
      );
    }

    const dominioNormalizado = dominio
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .split('/')[0]
      .split(':')[0];

    if (!dominioNormalizado) {
      throw new BadRequestException(
        'Domínio da empresa é obrigatório.',
      );
    }

    return dominioNormalizado;
  }

  private montarTenantPublico(empresa: {
    id: string;
    nome: string;
    slug: string | null;
    dominio: string | null;
    logo: string | null;
    plano: unknown;
    ativo: boolean;
  }) {
    return {
      empresaId: empresa.id,
      nome: empresa.nome,
      slug: empresa.slug,
      dominio: empresa.dominio,
      logo: empresa.logo,
      plano: empresa.plano,
      ativo: empresa.ativo,
    };
  }
}