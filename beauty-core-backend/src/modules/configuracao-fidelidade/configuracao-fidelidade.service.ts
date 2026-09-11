import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../database/prisma/prisma.service';
import { TenantValidatorService } from '../../shared/tenant';

@Injectable()
export class ConfiguracaoFidelidadeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tenantValidator: TenantValidatorService,
  ) {}

  async create(empresaId: string, dto: any) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const dados = this.sanitizarDto(dto as Record<string, any>);

    return this.prisma.configuracaoFidelidade.upsert({
      where: {
        empresaId,
      },
      update: {
        ...dados,
      },
      create: {
        empresaId,
        ...dados,
      },
    });
  }

  async findOne(empresaId: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    return this.prisma.configuracaoFidelidade.findUnique({
      where: {
        empresaId,
      },
    });
  }

  async update(empresaId: string, dto: any) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const dados = this.sanitizarDto(dto as Record<string, any>);

    return this.prisma.configuracaoFidelidade.upsert({
      where: {
        empresaId,
      },
      update: {
        ...dados,
      },
      create: {
        empresaId,
        ...dados,
      },
    });
  }

  private sanitizarDto(dto: Record<string, any> = {}) {
    const dados = {
      ...dto,
    };

    delete dados.id;
    delete dados.empresaId;
    delete dados.createdAt;
    delete dados.updatedAt;

    return dados;
  }
}
