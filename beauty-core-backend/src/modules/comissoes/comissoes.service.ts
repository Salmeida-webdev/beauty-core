import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { StatusPagamento, TipoUsuarioAuditoria } from '@prisma/client';

import { PrismaService } from '../../database/prisma/prisma.service';
import { TenantValidatorService } from '../../shared/tenant';

import { CreateComissaoDto } from './dto/create-comissao.dto';

import { AutomacoesService } from '../automacoes/automacoes.service';
import { TipoEventoSistema } from '../automacoes/eventos/tipo-evento-sistema.enum';
import { AuditoriaService } from '../auditoria/auditoria.service';

@Injectable()
export class ComissoesService {
  private readonly logger = new Logger(ComissoesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly automacoesService: AutomacoesService,
    private readonly auditoriaService: AuditoriaService,
    private readonly tenantValidator: TenantValidatorService,
  ) {}

  async create(empresaId: string, dto: CreateComissaoDto) {
    const startedAt = Date.now();

    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const profissional = await this.tenantValidator.validarProfissional(
      empresaId,
      dto.profissionalId,
    );

    const agendamento = await this.tenantValidator.validarAgendamento(
      empresaId,
      dto.agendamentoId,
    );

    if (agendamento.profissionalId !== dto.profissionalId) {
      throw new BadRequestException(
        'O agendamento informado não pertence ao profissional informado.',
      );
    }

    const valorComissao = (dto.valorServico * dto.percentual) / 100;

    const comissao = await this.prisma.comissaoProfissional.create({
      data: {
        empresaId,
        profissionalId: dto.profissionalId,
        agendamentoId: dto.agendamentoId,
        valorServico: dto.valorServico,
        percentual: dto.percentual,
        valorComissao,
      },
      include: {
        profissional: true,
        agendamento: true,
      },
    });

    await this.automacoesService.processarEvento({
      empresaId,
      tipo: TipoEventoSistema.COMISSAO_GERADA,
      modulo: 'COMISSOES',
      titulo: 'Comissão gerada',
      mensagem: `Comissão de R$ ${Number(comissao.valorComissao).toFixed(
        2,
      )} gerada para o profissional.`,
      referenciaId: comissao.id,
      dados: {
        comissaoId: comissao.id,
        profissionalId: comissao.profissionalId,
        profissionalNome: profissional.nome,
        agendamentoId: comissao.agendamentoId,
        valorServico: comissao.valorServico,
        percentual: comissao.percentual,
        valorComissao: comissao.valorComissao,
        status: comissao.status,
      },
    });

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[COMISSOES] comissão criada empresaId=${empresaId} comissaoId=${comissao.id} profissionalId=${comissao.profissionalId} status=SUCESSO tempoMs=${tempoMs}`,
    );

    await this.auditoriaService.registrarCriacao({
      empresaId,
      usuarioId: comissao.profissionalId,
      tipoUsuario: TipoUsuarioAuditoria.SISTEMA,
      modulo: 'COMISSOES',
      recurso: 'ComissaoProfissional',
      recursoId: comissao.id,
      dadosDepois: {
        id: comissao.id,
        profissionalId: comissao.profissionalId,
        profissionalNome: comissao.profissional?.nome,
        agendamentoId: comissao.agendamentoId,
        valorServico: Number(comissao.valorServico),
        percentual: Number(comissao.percentual),
        valorComissao: Number(comissao.valorComissao),
        status: comissao.status,
      },
      metadata: {
        tempoMs,
      },
      mensagem: 'Comissão criada com sucesso.',
    });

    return comissao;
  }

  async findAll(empresaId: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    return this.prisma.comissaoProfissional.findMany({
      where: {
        empresaId,
      },
      include: {
        profissional: true,
        agendamento: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(empresaId: string, id: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const comissao = await this.prisma.comissaoProfissional.findFirst({
      where: {
        id,
        empresaId,
      },
      include: {
        profissional: true,
        agendamento: true,
      },
    });

    if (!comissao) {
      throw new NotFoundException('Comissão não encontrada');
    }

    return comissao;
  }

  async pagar(empresaId: string, id: string) {
    const startedAt = Date.now();

    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const comissaoAtual = await this.findOne(empresaId, id);

    await this.tenantValidator.validarProfissional(
      empresaId,
      comissaoAtual.profissionalId,
    );

    await this.tenantValidator.validarAgendamento(
      empresaId,
      comissaoAtual.agendamentoId,
    );

    const dadosAntes = {
      id: comissaoAtual.id,
      profissionalId: comissaoAtual.profissionalId,
      profissionalNome: comissaoAtual.profissional?.nome,
      agendamentoId: comissaoAtual.agendamentoId,
      valorServico: Number(comissaoAtual.valorServico),
      percentual: Number(comissaoAtual.percentual),
      valorComissao: Number(comissaoAtual.valorComissao),
      status: comissaoAtual.status,
    };

    const result = await this.prisma.comissaoProfissional.updateMany({
      where: {
        id,
        empresaId,
      },
      data: {
        status: StatusPagamento.PAGO,
      },
    });

    if (result.count === 0) {
      throw new NotFoundException('Comissão não encontrada');
    }

    const comissaoPaga = await this.findOne(empresaId, id);

    if (comissaoAtual.status !== StatusPagamento.PAGO) {
      await this.automacoesService.processarEvento({
        empresaId,
        tipo: TipoEventoSistema.COMISSAO_PAGA,
        modulo: 'COMISSOES',
        titulo: 'Comissão paga',
        mensagem: `Comissão de R$ ${Number(comissaoPaga.valorComissao).toFixed(
          2,
        )} foi paga.`,
        referenciaId: comissaoPaga.id,
        dados: {
          comissaoId: comissaoPaga.id,
          profissionalId: comissaoPaga.profissionalId,
          agendamentoId: comissaoPaga.agendamentoId,
          valorServico: comissaoPaga.valorServico,
          percentual: comissaoPaga.percentual,
          valorComissao: comissaoPaga.valorComissao,
          statusAnterior: comissaoAtual.status,
          statusAtual: comissaoPaga.status,
        },
      });
    }

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[COMISSOES] comissão paga empresaId=${empresaId} comissaoId=${comissaoPaga.id} profissionalId=${comissaoPaga.profissionalId} status=SUCESSO tempoMs=${tempoMs}`,
    );

    await this.auditoriaService.registrarPagamento({
      empresaId,
      usuarioId: comissaoPaga.profissionalId,
      tipoUsuario: TipoUsuarioAuditoria.SISTEMA,
      modulo: 'COMISSOES',
      recurso: 'ComissaoProfissional',
      recursoId: comissaoPaga.id,
      dadosAntes,
      dadosDepois: {
        id: comissaoPaga.id,
        profissionalId: comissaoPaga.profissionalId,
        profissionalNome: comissaoPaga.profissional?.nome,
        agendamentoId: comissaoPaga.agendamentoId,
        valorServico: Number(comissaoPaga.valorServico),
        percentual: Number(comissaoPaga.percentual),
        valorComissao: Number(comissaoPaga.valorComissao),
        status: comissaoPaga.status,
      },
      metadata: {
        tempoMs,
        statusAnterior: comissaoAtual.status,
        statusAtual: comissaoPaga.status,
      },
      mensagem: 'Comissão paga com sucesso.',
    });

    return comissaoPaga;
  }
}
