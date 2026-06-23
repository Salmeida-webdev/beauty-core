import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../database/prisma/prisma.service';
import { TenantValidatorService } from '../../shared/tenant';

import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';

@Injectable()
export class ServicosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tenantValidator: TenantValidatorService,
  ) {}

  async create(
    createServicoDto: CreateServicoDto,
    empresaId: string,
  ) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    return this.prisma.servico.create({
      data: {
        empresaId,
        nome: createServicoDto.nome,
        descricao: createServicoDto.descricao,
        duracaoMinutos: createServicoDto.duracaoMinutos,
        preco: createServicoDto.preco,
      },
    });
  }

  async findAll(empresaId: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    return this.prisma.servico.findMany({
      where: {
        empresaId,
        ativo: true,
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
    return this.buscarServicoOuFalhar(empresaId, id);
  }

  async update(
    id: string,
    updateServicoDto: UpdateServicoDto,
    empresaId: string,
  ) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    await this.buscarServicoOuFalhar(empresaId, id);

    const result = await this.prisma.servico.updateMany({
      where: {
        id,
        empresaId,
        ativo: true,
      },
      data: {
        nome: updateServicoDto.nome,
        descricao: updateServicoDto.descricao,
        duracaoMinutos: updateServicoDto.duracaoMinutos,
        preco: updateServicoDto.preco,
      },
    });

    if (result.count === 0) {
      throw new NotFoundException('Serviço não encontrado');
    }

    return this.buscarServicoOuFalhar(empresaId, id);
  }

  async inativar(
    id: string,
    empresaId: string,
  ) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    await this.buscarServicoOuFalhar(empresaId, id);

    const result = await this.prisma.servico.updateMany({
      where: {
        id,
        empresaId,
        ativo: true,
      },
      data: {
        ativo: false,
      },
    });

    if (result.count === 0) {
      throw new NotFoundException('Serviço não encontrado');
    }

    return this.buscarServicoInativoOuAtivoOuFalhar(empresaId, id);
  }

  private async buscarServicoOuFalhar(
    empresaId: string,
    id: string,
  ) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const servico = await this.prisma.servico.findFirst({
      where: {
        id,
        empresaId,
        ativo: true,
      },
    });

    if (!servico) {
      throw new NotFoundException('Serviço não encontrado');
    }

    return servico;
  }

  private async buscarServicoInativoOuAtivoOuFalhar(
    empresaId: string,
    id: string,
  ) {
    const servico = await this.prisma.servico.findFirst({
      where: {
        id,
        empresaId,
      },
    });

    if (!servico) {
      throw new NotFoundException('Serviço não encontrado');
    }

    return servico;
  }
}