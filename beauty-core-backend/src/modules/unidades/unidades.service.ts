import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../database/prisma/prisma.service';
import { TenantValidatorService } from '../../shared/tenant';

import { CreateUnidadeDto } from './dto/create-unidade.dto';
import { UpdateUnidadeDto } from './dto/update-unidade.dto';

@Injectable()
export class UnidadesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tenantValidator: TenantValidatorService,
  ) {}

  async create(
    createUnidadeDto: CreateUnidadeDto,
    empresaId: string,
  ) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    return this.prisma.unidade.create({
      data: {
        ...createUnidadeDto,
        empresaId,
      },
    });
  }

  async findAll(empresaId: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    return this.prisma.unidade.findMany({
      where: {
        empresaId,
        ativa: true,
      },
      orderBy: {
        nome: 'asc',
      },
    });
  }

  async findOne(
    id: string,
    empresaId: string,
  ) {
    return this.buscarUnidadeOuFalhar(empresaId, id);
  }

  async update(
    id: string,
    updateUnidadeDto: UpdateUnidadeDto,
    empresaId: string,
  ) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    await this.buscarUnidadeOuFalhar(empresaId, id);

    const result = await this.prisma.unidade.updateMany({
      where: {
        id,
        empresaId,
        ativa: true,
      },
      data: updateUnidadeDto,
    });

    if (result.count === 0) {
      throw new NotFoundException(
        'Unidade não encontrada',
      );
    }

    return this.buscarUnidadeOuFalhar(empresaId, id);
  }

  async inativar(
    id: string,
    empresaId: string,
  ) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    await this.buscarUnidadeOuFalhar(empresaId, id);

    const result = await this.prisma.unidade.updateMany({
      where: {
        id,
        empresaId,
        ativa: true,
      },
      data: {
        ativa: false,
      },
    });

    if (result.count === 0) {
      throw new NotFoundException(
        'Unidade não encontrada',
      );
    }

    return this.buscarUnidadeInativaOuAtivaOuFalhar(
      empresaId,
      id,
    );
  }

  private async buscarUnidadeOuFalhar(
    empresaId: string,
    id: string,
  ) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const unidade = await this.prisma.unidade.findFirst({
      where: {
        id,
        empresaId,
        ativa: true,
      },
    });

    if (!unidade) {
      throw new NotFoundException(
        'Unidade não encontrada',
      );
    }

    return unidade;
  }

  private async buscarUnidadeInativaOuAtivaOuFalhar(
    empresaId: string,
    id: string,
  ) {
    const unidade = await this.prisma.unidade.findFirst({
      where: {
        id,
        empresaId,
      },
    });

    if (!unidade) {
      throw new NotFoundException(
        'Unidade não encontrada',
      );
    }

    return unidade;
  }
}