import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../database/prisma/prisma.service';
import { TenantValidatorService } from '../../shared/tenant';

import { CreateNivelFidelidadeDto } from './dto/create-nivel-fidelidade.dto';
import { UpdateNivelFidelidadeDto } from './dto/update-nivel-fidelidade.dto';

@Injectable()
export class NiveisFidelidadeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tenantValidator: TenantValidatorService,
  ) {}

  async create(empresaId: string, dto: CreateNivelFidelidadeDto) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    await this.validarNivelDuplicado(empresaId, {
      nome: dto.nome,
      pontosMinimos: dto.pontosMinimos,
    });

    return this.prisma.nivelFidelidade.create({
      data: {
        empresaId,
        nome: dto.nome,
        pontosMinimos: dto.pontosMinimos,
        beneficios: dto.beneficios,
      },
    });
  }

  async findAll(empresaId: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    return this.prisma.nivelFidelidade.findMany({
      where: {
        empresaId,
      },
      orderBy: {
        pontosMinimos: 'asc',
      },
    });
  }

  async findOne(empresaId: string, id: string) {
    return this.buscarNivelOuFalhar(empresaId, id);
  }

  async update(empresaId: string, id: string, dto: UpdateNivelFidelidadeDto) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const nivelAntes = await this.buscarNivelOuFalhar(empresaId, id);

    if (
      (dto.nome && dto.nome !== nivelAntes.nome) ||
      (dto.pontosMinimos !== undefined &&
        dto.pontosMinimos !== nivelAntes.pontosMinimos)
    ) {
      await this.validarNivelDuplicado(empresaId, {
        nome: dto.nome,
        pontosMinimos: dto.pontosMinimos,
        ignorarId: id,
      });
    }

    const result = await this.prisma.nivelFidelidade.updateMany({
      where: {
        id,
        empresaId,
      },
      data: {
        nome: dto.nome,
        pontosMinimos: dto.pontosMinimos,
        beneficios: dto.beneficios,
      },
    });

    if (result.count === 0) {
      throw new NotFoundException('Nível de fidelidade não encontrado');
    }

    return this.buscarNivelOuFalhar(empresaId, id);
  }

  async remove(empresaId: string, id: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const nivelAntes = await this.buscarNivelOuFalhar(empresaId, id);

    const result = await this.prisma.nivelFidelidade.deleteMany({
      where: {
        id,
        empresaId,
      },
    });

    if (result.count === 0) {
      throw new NotFoundException('Nível de fidelidade não encontrado');
    }

    return nivelAntes;
  }

  private async buscarNivelOuFalhar(empresaId: string, id: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const nivel = await this.prisma.nivelFidelidade.findFirst({
      where: {
        id,
        empresaId,
      },
    });

    if (!nivel) {
      throw new NotFoundException('Nível de fidelidade não encontrado');
    }

    return nivel;
  }

  private async validarNivelDuplicado(
    empresaId: string,
    params: {
      nome?: string;
      pontosMinimos?: number;
      ignorarId?: string;
    },
  ) {
    if (params.nome) {
      const nivelComMesmoNome = await this.prisma.nivelFidelidade.findFirst({
        where: {
          empresaId,
          nome: params.nome,
          ...(params.ignorarId
            ? {
                id: {
                  not: params.ignorarId,
                },
              }
            : {}),
        },
      });

      if (nivelComMesmoNome) {
        throw new BadRequestException(
          'Já existe outro nível de fidelidade com este nome',
        );
      }
    }

    if (params.pontosMinimos !== undefined) {
      const nivelComMesmaPontuacao =
        await this.prisma.nivelFidelidade.findFirst({
          where: {
            empresaId,
            pontosMinimos: params.pontosMinimos,
            ...(params.ignorarId
              ? {
                  id: {
                    not: params.ignorarId,
                  },
                }
              : {}),
          },
        });

      if (nivelComMesmaPontuacao) {
        throw new BadRequestException(
          'Já existe outro nível de fidelidade com esta pontuação mínima',
        );
      }
    }
  }
}
