import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../database/prisma/prisma.service';
import { TenantValidatorService } from '../../shared/tenant';

import { CreateBeneficioDto } from './dto/create-beneficio.dto';
import { UpdateBeneficioDto } from './dto/update-beneficio.dto';

@Injectable()
export class BeneficiosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tenantValidator: TenantValidatorService,
  ) {}

  async create(empresaId: string, dto: CreateBeneficioDto) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const beneficioExistente = await this.prisma.beneficio.findFirst({
      where: {
        empresaId,
        nome: dto.nome,
        ativo: true,
      },
    });

    if (beneficioExistente) {
      throw new BadRequestException('Benefício já cadastrado');
    }

    return this.prisma.beneficio.create({
      data: {
        empresaId,
        nome: dto.nome,
        descricao: dto.descricao,
        pontosNecessarios: dto.pontosNecessarios,
      },
    });
  }

  async findAll(empresaId: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    return this.prisma.beneficio.findMany({
      where: {
        empresaId,
        ativo: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(empresaId: string, id: string) {
    return this.buscarBeneficioOuFalhar(empresaId, id);
  }

  async update(
    empresaId: string,
    id: string,
    dto: UpdateBeneficioDto,
  ) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const beneficioAntes = await this.buscarBeneficioOuFalhar(
      empresaId,
      id,
    );

    if (dto.nome && dto.nome !== beneficioAntes.nome) {
      const beneficioComMesmoNome =
        await this.prisma.beneficio.findFirst({
          where: {
            empresaId,
            nome: dto.nome,
            ativo: true,
            id: {
              not: id,
            },
          },
        });

      if (beneficioComMesmoNome) {
        throw new BadRequestException(
          'Já existe outro benefício com este nome',
        );
      }
    }

    const result = await this.prisma.beneficio.updateMany({
      where: {
        id,
        empresaId,
        ativo: true,
      },
      data: {
        nome: dto.nome,
        descricao: dto.descricao,
        pontosNecessarios: dto.pontosNecessarios,
      },
    });

    if (result.count === 0) {
      throw new NotFoundException('Benefício não encontrado');
    }

    return this.buscarBeneficioOuFalhar(empresaId, id);
  }

  async inativar(empresaId: string, id: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    await this.buscarBeneficioOuFalhar(empresaId, id);

    const result = await this.prisma.beneficio.updateMany({
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
      throw new NotFoundException('Benefício não encontrado');
    }

    return this.buscarBeneficioInativoOuAtivoOuFalhar(
      empresaId,
      id,
    );
  }

  private async buscarBeneficioOuFalhar(
    empresaId: string,
    id: string,
  ) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const beneficio = await this.prisma.beneficio.findFirst({
      where: {
        id,
        empresaId,
        ativo: true,
      },
    });

    if (!beneficio) {
      throw new NotFoundException('Benefício não encontrado');
    }

    return beneficio;
  }

  private async buscarBeneficioInativoOuAtivoOuFalhar(
    empresaId: string,
    id: string,
  ) {
    const beneficio = await this.prisma.beneficio.findFirst({
      where: {
        id,
        empresaId,
      },
    });

    if (!beneficio) {
      throw new NotFoundException('Benefício não encontrado');
    }

    return beneficio;
  }
}