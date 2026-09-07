import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Injectable()
export class EmpresasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEmpresaDto: CreateEmpresaDto) {
    await this.validarSlugDisponivel(createEmpresaDto.slug);

    if (createEmpresaDto.dominio) {
      await this.validarDominioDisponivel(createEmpresaDto.dominio);
    }

    return this.prisma.empresa.create({
      data: {
        nome: createEmpresaDto.nome,
        slug: createEmpresaDto.slug,
        telefone: createEmpresaDto.telefone,
        email: createEmpresaDto.email,
        logo: createEmpresaDto.logo,
        corPrimaria: createEmpresaDto.corPrimaria,
        dominio: createEmpresaDto.dominio,
        plano: createEmpresaDto.plano,
        ativo: true,
      },
    });
  }

  async findAll() {
    return this.prisma.empresa.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const empresa = await this.prisma.empresa.findUnique({
      where: {
        id,
      },
    });

    if (!empresa) {
      throw new NotFoundException('Empresa não encontrada.');
    }

    return empresa;
  }

  async update(id: string, updateEmpresaDto: UpdateEmpresaDto) {
    await this.findOne(id);

    if (updateEmpresaDto.slug) {
      await this.validarSlugDisponivel(updateEmpresaDto.slug, id);
    }

    if (updateEmpresaDto.dominio) {
      await this.validarDominioDisponivel(updateEmpresaDto.dominio, id);
    }

    return this.prisma.empresa.update({
      where: {
        id,
      },
      data: {
        nome: updateEmpresaDto.nome,
        slug: updateEmpresaDto.slug,
        telefone: updateEmpresaDto.telefone,
        email: updateEmpresaDto.email,
        logo: updateEmpresaDto.logo,
        corPrimaria: updateEmpresaDto.corPrimaria,
        dominio: updateEmpresaDto.dominio,
        plano: updateEmpresaDto.plano,
      },
    });
  }

  async inativar(id: string) {
    await this.findOne(id);

    return this.prisma.empresa.update({
      where: {
        id,
      },
      data: {
        ativo: false,
      },
    });
  }

  private async validarSlugDisponivel(slug: string, empresaIdIgnorado?: string) {
    const empresaExistente = await this.prisma.empresa.findFirst({
      where: {
        slug,
        ...(empresaIdIgnorado
          ? {
              id: {
                not: empresaIdIgnorado,
              },
            }
          : {}),
      },
      select: {
        id: true,
      },
    });

    if (empresaExistente) {
      throw new ConflictException('Já existe uma empresa usando este slug.');
    }
  }

  private async validarDominioDisponivel(
    dominio: string,
    empresaIdIgnorado?: string,
  ) {
    const empresaExistente = await this.prisma.empresa.findFirst({
      where: {
        dominio,
        ...(empresaIdIgnorado
          ? {
              id: {
                not: empresaIdIgnorado,
              },
            }
          : {}),
      },
      select: {
        id: true,
      },
    });

    if (empresaExistente) {
      throw new ConflictException('Já existe uma empresa usando este domínio.');
    }
  }
}