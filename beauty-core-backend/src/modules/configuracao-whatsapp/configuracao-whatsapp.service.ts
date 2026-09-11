import { Injectable, NotFoundException } from '@nestjs/common';
import { CanalWhatsApp } from '@prisma/client';

import { PrismaService } from '../../database/prisma/prisma.service';
import { TenantValidatorService } from '../../shared/tenant';

import { CreateConfiguracaoWhatsAppDto } from './dto/create-configuracao-whatsapp.dto';
import { UpdateConfiguracaoWhatsAppDto } from './dto/update-configuracao-whatsapp.dto';

@Injectable()
export class ConfiguracaoWhatsappService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tenantValidator: TenantValidatorService,
  ) {}

  async createOrUpdate(empresaId: string, dto: CreateConfiguracaoWhatsAppDto) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const dados = this.sanitizarDto(dto);

    const existente = await this.prisma.configuracaoWhatsApp.findUnique({
      where: {
        empresaId,
      },
    });

    if (existente) {
      return this.prisma.configuracaoWhatsApp.update({
        where: {
          empresaId,
        },
        data: {
          ...dados,
        },
      });
    }

    return this.prisma.configuracaoWhatsApp.create({
      data: {
        empresaId,
        ativo: dto.ativo ?? true,
        canal: dto.canal ?? CanalWhatsApp.MODO_DEMONSTRACAO,
        numeroWhatsApp: dto.numeroWhatsApp,
        mensagemSaudacao: dto.mensagemSaudacao,
        mensagemAusencia: dto.mensagemAusencia,
        usarModoDemonstracao: dto.usarModoDemonstracao ?? true,
      },
    });
  }

  async findOne(empresaId: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const configuracao = await this.prisma.configuracaoWhatsApp.findUnique({
      where: {
        empresaId,
      },
    });

    if (!configuracao) {
      throw new NotFoundException('Configuração WhatsApp não encontrada.');
    }

    return configuracao;
  }

  async update(empresaId: string, dto: UpdateConfiguracaoWhatsAppDto) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    await this.findOne(empresaId);

    const dados = this.sanitizarDto(dto);

    return this.prisma.configuracaoWhatsApp.update({
      where: {
        empresaId,
      },
      data: {
        ...dados,
      },
    });
  }

  async gerarLink(empresaId: string, mensagem?: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const configuracao = await this.findOne(empresaId);

    if (!configuracao.numeroWhatsApp) {
      throw new NotFoundException('Número de WhatsApp não configurado.');
    }

    const numeroLimpo = configuracao.numeroWhatsApp.replace(/\D/g, '');

    const texto = encodeURIComponent(
      mensagem ||
        configuracao.mensagemSaudacao ||
        'Olá, gostaria de mais informações.',
    );

    return {
      numero: configuracao.numeroWhatsApp,
      link: `https://wa.me/55${numeroLimpo}?text=${texto}`,
    };
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
