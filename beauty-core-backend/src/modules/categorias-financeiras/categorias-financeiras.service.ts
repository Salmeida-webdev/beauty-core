import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';

import { CreateCategoriaFinanceiraDto } from './dto/create-categoria-financeira.dto';
import { UpdateCategoriaFinanceiraDto } from './dto/update-categoria-financeira.dto';

@Injectable()
export class CategoriasFinanceirasService {
  constructor(private readonly prisma: PrismaService) {}

  create(empresaId: string, dto: CreateCategoriaFinanceiraDto) {
    return this.prisma.categoriaFinanceira.create({
      data: {
        empresaId,
        ...dto,
      },
    });
  }

  findAll(empresaId: string) {
    return this.prisma.categoriaFinanceira.findMany({
      where: {
        empresaId,
      },
      orderBy: {
        nome: 'asc',
      },
    });
  }

  async findOne(empresaId: string, id: string) {
    const categoria = await this.prisma.categoriaFinanceira.findFirst({
      where: {
        id,
        empresaId,
      },
    });

    if (!categoria) {
      throw new NotFoundException('Categoria financeira não encontrada');
    }

    return categoria;
  }

  async update(
    empresaId: string,
    id: string,
    dto: UpdateCategoriaFinanceiraDto,
  ) {
    await this.findOne(empresaId, id);

    return this.prisma.categoriaFinanceira.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async inativar(empresaId: string, id: string) {
    await this.findOne(empresaId, id);

    return this.prisma.categoriaFinanceira.update({
      where: {
        id,
      },
      data: {
        ativo: false,
      },
    });
  }
}
