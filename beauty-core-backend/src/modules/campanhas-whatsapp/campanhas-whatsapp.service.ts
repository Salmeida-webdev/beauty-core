import {
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import {
  StatusMensagemWhatsApp,
  TipoUsuarioAuditoria,
} from '@prisma/client';

import { PrismaService } from '../../database/prisma/prisma.service';
import { TenantValidatorService } from '../../shared/tenant';

import { QueuesService } from '../../queues/services/queues.service';

import { CreateCampanhaWhatsAppDto } from './dto/create-campanha-whatsapp.dto';
import { UpdateCampanhaWhatsAppDto } from './dto/update-campanha-whatsapp.dto';

import { AuditoriaService } from '../auditoria/auditoria.service';

@Injectable()
export class CampanhasWhatsappService {
  private readonly logger = new Logger(CampanhasWhatsappService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly queuesService: QueuesService,
    private readonly auditoriaService: AuditoriaService,
    private readonly tenantValidator: TenantValidatorService,
  ) {}

  async create(
    empresaId: string,
    dto: CreateCampanhaWhatsAppDto,
  ) {
    const startedAt = Date.now();

    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const totalDestinatarios =
      dto.totalDestinatarios ?? 0;

    const campanha =
      await this.prisma.campanhaWhatsApp.create({
        data: {
          empresaId,
          nome: dto.nome,
          descricao: dto.descricao,
          tipo: dto.tipo,
          mensagem: dto.mensagem,
          status: StatusMensagemWhatsApp.PENDENTE,
          totalDestinatarios,
          totalEnviadas: 0,
          totalFalhas: 0,
        },
      });

    const job =
      await this.queuesService.adicionarCampanha({
        campanhaId: campanha.id,
        empresaId,
        mensagem: dto.mensagem,
        tipo: dto.tipo,
      });

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[CAMPANHAS_WHATSAPP] campanha criada empresaId=${empresaId} campanhaId=${campanha.id} status=SUCESSO tempoMs=${tempoMs}`,
    );

    await this.auditoriaService.registrarCriacao({
      empresaId,
      tipoUsuario: TipoUsuarioAuditoria.SISTEMA,
      modulo: 'CAMPANHAS_WHATSAPP',
      recurso: 'CampanhaWhatsApp',
      recursoId: campanha.id,
      dadosDepois: this.montarDadosAuditoria(campanha),
      metadata: {
        tempoMs,
        processamento: 'assincrono',
        jobId: job.id,
        queue: 'campanhas',
      },
      mensagem: 'Campanha WhatsApp criada com sucesso.',
    });

    return {
      campanha,
      processamento: 'assincrono',
      jobId: job.id,
      queue: 'campanhas',
    };
  }

  async findAll(empresaId: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    return this.prisma.campanhaWhatsApp.findMany({
      where: {
        empresaId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(
    empresaId: string,
    id: string,
  ) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    return this.buscarCampanhaOuFalhar(empresaId, id);
  }

  async update(
    empresaId: string,
    id: string,
    dto: UpdateCampanhaWhatsAppDto,
  ) {
    const startedAt = Date.now();

    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const campanhaAntes = await this.buscarCampanhaOuFalhar(
      empresaId,
      id,
    );

    const result =
      await this.prisma.campanhaWhatsApp.updateMany({
        where: {
          id,
          empresaId,
        },
        data: dto,
      });

    if (result.count === 0) {
      throw new NotFoundException(
        'Campanha WhatsApp não encontrada.',
      );
    }

    const campanhaDepois = await this.buscarCampanhaOuFalhar(
      empresaId,
      id,
    );

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[CAMPANHAS_WHATSAPP] campanha atualizada empresaId=${empresaId} campanhaId=${id} status=SUCESSO tempoMs=${tempoMs}`,
    );

    await this.auditoriaService.registrarAtualizacao({
      empresaId,
      tipoUsuario: TipoUsuarioAuditoria.SISTEMA,
      modulo: 'CAMPANHAS_WHATSAPP',
      recurso: 'CampanhaWhatsApp',
      recursoId: id,
      dadosAntes: this.montarDadosAuditoria(campanhaAntes),
      dadosDepois: this.montarDadosAuditoria(campanhaDepois),
      metadata: {
        tempoMs,
      },
      mensagem: 'Campanha WhatsApp atualizada com sucesso.',
    });

    return campanhaDepois;
  }

  async cancelar(
    empresaId: string,
    id: string,
  ) {
    const startedAt = Date.now();

    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const campanhaAntes = await this.buscarCampanhaOuFalhar(
      empresaId,
      id,
    );

    const result =
      await this.prisma.campanhaWhatsApp.updateMany({
        where: {
          id,
          empresaId,
        },
        data: {
          status: StatusMensagemWhatsApp.CANCELADA,
        },
      });

    if (result.count === 0) {
      throw new NotFoundException(
        'Campanha WhatsApp não encontrada.',
      );
    }

    const campanhaDepois = await this.buscarCampanhaOuFalhar(
      empresaId,
      id,
    );

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[CAMPANHAS_WHATSAPP] campanha cancelada empresaId=${empresaId} campanhaId=${id} status=SUCESSO tempoMs=${tempoMs}`,
    );

    await this.auditoriaService.registrarCancelamento({
      empresaId,
      tipoUsuario: TipoUsuarioAuditoria.SISTEMA,
      modulo: 'CAMPANHAS_WHATSAPP',
      recurso: 'CampanhaWhatsApp',
      recursoId: id,
      dadosAntes: this.montarDadosAuditoria(campanhaAntes),
      dadosDepois: this.montarDadosAuditoria(campanhaDepois),
      metadata: {
        tempoMs,
        statusAnterior: campanhaAntes.status,
        statusAtual: campanhaDepois.status,
      },
      mensagem: 'Campanha WhatsApp cancelada com sucesso.',
    });

    return campanhaDepois;
  }

  private async buscarCampanhaOuFalhar(
    empresaId: string,
    id: string,
  ) {
    const campanha =
      await this.prisma.campanhaWhatsApp.findFirst({
        where: {
          id,
          empresaId,
        },
      });

    if (!campanha) {
      throw new NotFoundException(
        'Campanha WhatsApp não encontrada.',
      );
    }

    return campanha;
  }

  private montarDadosAuditoria(campanha: any) {
    return {
      id: campanha.id,
      empresaId: campanha.empresaId,
      nome: campanha.nome,
      descricao: campanha.descricao,
      tipo: campanha.tipo,
      status: campanha.status,
      totalDestinatarios: campanha.totalDestinatarios,
      totalEnviadas: campanha.totalEnviadas,
      totalFalhas: campanha.totalFalhas,
      createdAt: campanha.createdAt,
      updatedAt: campanha.updatedAt,
    };
  }
}