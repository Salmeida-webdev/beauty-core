import { ConflictException, Injectable } from '@nestjs/common';

import { PrismaService } from '../../database/prisma/prisma.service';
import { TenantValidatorService } from '../../shared/tenant';

import { CreateConfiguracaoNotificacaoDto } from './dto/create-configuracao-notificacao.dto';
import { UpdateConfiguracaoNotificacaoDto } from './dto/update-configuracao-notificacao.dto';

@Injectable()
export class ConfiguracoesNotificacaoService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tenantValidator: TenantValidatorService,
  ) {}

  async create(
    empresaId: string,
    dto: CreateConfiguracaoNotificacaoDto,
  ) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const existente =
      await this.prisma.configuracaoNotificacao.findUnique({
        where: {
          empresaId,
        },
      });

    if (existente) {
      throw new ConflictException(
        'Configuração de notificações já existe para esta empresa.',
      );
    }

    const dados = this.sanitizarDto(dto);

    return this.prisma.configuracaoNotificacao.create({
      data: {
        empresaId,
        ...dados,
      },
    });
  }

  async findOne(empresaId: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    let configuracao =
      await this.prisma.configuracaoNotificacao.findUnique({
        where: {
          empresaId,
        },
      });

    if (!configuracao) {
      configuracao =
        await this.prisma.configuracaoNotificacao.create({
          data: {
            empresaId,
          },
        });
    }

    return configuracao;
  }

  async update(
    empresaId: string,
    dto: UpdateConfiguracaoNotificacaoDto,
  ) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    await this.findOne(empresaId);

    const dados = this.sanitizarDto(dto);

    return this.prisma.configuracaoNotificacao.update({
      where: {
        empresaId,
      },
      data: {
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