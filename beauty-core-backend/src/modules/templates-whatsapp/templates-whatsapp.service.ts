import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../database/prisma/prisma.service';
import { TenantValidatorService } from '../../shared/tenant';

import { CreateTemplateWhatsAppDto } from './dto/create-template-whatsapp.dto';
import { UpdateTemplateWhatsAppDto } from './dto/update-template-whatsapp.dto';

@Injectable()
export class TemplatesWhatsappService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tenantValidator: TenantValidatorService,
  ) {}

  async create(empresaId: string, dto: CreateTemplateWhatsAppDto) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const templateExistente = await this.prisma.templateWhatsApp.findFirst({
      where: {
        empresaId,
        nome: dto.nome,
        ativo: true,
      },
    });

    if (templateExistente) {
      throw new BadRequestException(
        'Template WhatsApp já cadastrado com este nome.',
      );
    }

    return this.prisma.templateWhatsApp.create({
      data: {
        empresaId,
        nome: dto.nome,
        tipo: dto.tipo,
        titulo: dto.titulo,
        mensagem: dto.mensagem,
      },
    });
  }

  async findAll(empresaId: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    return this.prisma.templateWhatsApp.findMany({
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
    return this.buscarTemplateOuFalhar(empresaId, id);
  }

  async update(empresaId: string, id: string, dto: UpdateTemplateWhatsAppDto) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const templateAntes = await this.buscarTemplateOuFalhar(empresaId, id);

    if (dto.nome && dto.nome !== templateAntes.nome) {
      const templateComMesmoNome = await this.prisma.templateWhatsApp.findFirst(
        {
          where: {
            empresaId,
            nome: dto.nome,
            ativo: true,
            id: {
              not: id,
            },
          },
        },
      );

      if (templateComMesmoNome) {
        throw new BadRequestException(
          'Já existe outro template WhatsApp com este nome.',
        );
      }
    }

    const result = await this.prisma.templateWhatsApp.updateMany({
      where: {
        id,
        empresaId,
        ativo: true,
      },
      data: {
        nome: dto.nome,
        tipo: dto.tipo,
        titulo: dto.titulo,
        mensagem: dto.mensagem,
      },
    });

    if (result.count === 0) {
      throw new NotFoundException('Template WhatsApp não encontrado.');
    }

    return this.buscarTemplateOuFalhar(empresaId, id);
  }

  async inativar(empresaId: string, id: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    await this.buscarTemplateOuFalhar(empresaId, id);

    const result = await this.prisma.templateWhatsApp.updateMany({
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
      throw new NotFoundException('Template WhatsApp não encontrado.');
    }

    return this.buscarTemplateInativoOuAtivoOuFalhar(empresaId, id);
  }

  private async buscarTemplateOuFalhar(empresaId: string, id: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const template = await this.prisma.templateWhatsApp.findFirst({
      where: {
        id,
        empresaId,
        ativo: true,
      },
    });

    if (!template) {
      throw new NotFoundException('Template WhatsApp não encontrado.');
    }

    return template;
  }

  private async buscarTemplateInativoOuAtivoOuFalhar(
    empresaId: string,
    id: string,
  ) {
    const template = await this.prisma.templateWhatsApp.findFirst({
      where: {
        id,
        empresaId,
      },
    });

    if (!template) {
      throw new NotFoundException('Template WhatsApp não encontrado.');
    }

    return template;
  }
}
