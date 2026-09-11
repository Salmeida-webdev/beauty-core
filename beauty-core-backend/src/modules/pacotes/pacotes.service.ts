import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { TipoUsuarioAuditoria } from '@prisma/client';

import { PrismaService } from '../../database/prisma/prisma.service';
import { TenantValidatorService } from '../../shared/tenant';

import { CreatePacoteDto } from './dto/create-pacote.dto';
import { UpdatePacoteDto } from './dto/update-pacote.dto';

import { AutomacoesService } from '../automacoes/automacoes.service';
import { TipoEventoSistema } from '../automacoes/eventos/tipo-evento-sistema.enum';
import { AuditoriaService } from '../auditoria/auditoria.service';

type PacoteAuditoria = {
  id?: unknown;
  empresaId?: unknown;
  nome?: unknown;
  descricao?: unknown;
  valor?: unknown;
  quantidadeSessoes?: unknown;
  validadeDias?: unknown;
  ativo?: unknown;
  createdAt?: unknown;
  updatedAt?: unknown;
};
@Injectable()
export class PacotesService {
  private readonly logger = new Logger(PacotesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly automacoesService: AutomacoesService,
    private readonly auditoriaService: AuditoriaService,
    private readonly tenantValidator: TenantValidatorService,
  ) {}

  async create(empresaId: string, dto: CreatePacoteDto) {
    const startedAt = Date.now();

    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const pacoteExistente = await this.prisma.pacote.findFirst({
      where: {
        empresaId,
        nome: dto.nome,
      },
    });

    if (pacoteExistente) {
      throw new BadRequestException('Pacote já cadastrado');
    }

    const pacote = await this.prisma.pacote.create({
      data: {
        empresaId,
        nome: dto.nome,
        descricao: dto.descricao,
        valor: dto.valor,
        quantidadeSessoes: dto.quantidadeSessoes,
        validadeDias: dto.validadeDias,
      },
    });

    await this.automacoesService.processarEvento({
      empresaId,
      tipo: TipoEventoSistema.PACOTE_CRIADO,
      modulo: 'PACOTES',
      titulo: 'Novo pacote cadastrado',
      mensagem: `O pacote ${pacote.nome} foi cadastrado com ${pacote.quantidadeSessoes} sessões.`,
      referenciaId: pacote.id,
      dados: {
        pacoteId: pacote.id,
        nome: pacote.nome,
        valor: pacote.valor,
        quantidadeSessoes: pacote.quantidadeSessoes,
        validadeDias: pacote.validadeDias,
      },
    });

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[PACOTES] pacote criado empresaId=${empresaId} pacoteId=${pacote.id} status=SUCESSO tempoMs=${tempoMs}`,
    );

    await this.auditoriaService.registrarCriacao({
      empresaId,
      tipoUsuario: TipoUsuarioAuditoria.SISTEMA,
      modulo: 'PACOTES',
      recurso: 'Pacote',
      recursoId: pacote.id,
      dadosDepois: this.montarDadosAuditoria(pacote),
      metadata: {
        tempoMs,
      },
      mensagem: 'Pacote criado com sucesso.',
    });

    return pacote;
  }

  async findAll(empresaId: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    return this.prisma.pacote.findMany({
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
    return this.buscarPacoteOuFalhar(empresaId, id);
  }

  async update(empresaId: string, id: string, dto: UpdatePacoteDto) {
    const startedAt = Date.now();

    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const pacoteAntes = await this.buscarPacoteOuFalhar(empresaId, id);

    if (dto.nome && dto.nome !== pacoteAntes.nome) {
      const pacoteComMesmoNome = await this.prisma.pacote.findFirst({
        where: {
          empresaId,
          nome: dto.nome,
          id: {
            not: id,
          },
        },
      });

      if (pacoteComMesmoNome) {
        throw new BadRequestException('Já existe outro pacote com este nome');
      }
    }

    const result = await this.prisma.pacote.updateMany({
      where: {
        id,
        empresaId,
        ativo: true,
      },
      data: {
        nome: dto.nome,
        descricao: dto.descricao,
        valor: dto.valor,
        quantidadeSessoes: dto.quantidadeSessoes,
        validadeDias: dto.validadeDias,
      },
    });

    if (result.count === 0) {
      throw new NotFoundException('Pacote não encontrado');
    }

    const pacoteDepois = await this.buscarPacoteOuFalhar(empresaId, id);

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[PACOTES] pacote atualizado empresaId=${empresaId} pacoteId=${id} status=SUCESSO tempoMs=${tempoMs}`,
    );

    await this.auditoriaService.registrarAtualizacao({
      empresaId,
      tipoUsuario: TipoUsuarioAuditoria.SISTEMA,
      modulo: 'PACOTES',
      recurso: 'Pacote',
      recursoId: id,
      dadosAntes: this.montarDadosAuditoria(pacoteAntes),
      dadosDepois: this.montarDadosAuditoria(pacoteDepois),
      metadata: {
        tempoMs,
      },
      mensagem: 'Pacote atualizado com sucesso.',
    });

    return pacoteDepois;
  }

  async inativar(empresaId: string, id: string) {
    const startedAt = Date.now();

    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const pacoteAntes = await this.buscarPacoteOuFalhar(empresaId, id);

    const result = await this.prisma.pacote.updateMany({
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
      throw new NotFoundException('Pacote não encontrado');
    }

    const pacoteDepois = await this.buscarPacoteInativoOuAtivoOuFalhar(
      empresaId,
      id,
    );

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[PACOTES] pacote inativado empresaId=${empresaId} pacoteId=${id} status=SUCESSO tempoMs=${tempoMs}`,
    );

    await this.auditoriaService.registrarInativacao({
      empresaId,
      tipoUsuario: TipoUsuarioAuditoria.SISTEMA,
      modulo: 'PACOTES',
      recurso: 'Pacote',
      recursoId: id,
      dadosAntes: this.montarDadosAuditoria(pacoteAntes),
      dadosDepois: this.montarDadosAuditoria(pacoteDepois),
      metadata: {
        tempoMs,
      },
      mensagem: 'Pacote inativado com sucesso.',
    });

    return pacoteDepois;
  }

  private async buscarPacoteOuFalhar(empresaId: string, id: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const pacote = await this.prisma.pacote.findFirst({
      where: {
        id,
        empresaId,
        ativo: true,
      },
    });

    if (!pacote) {
      throw new NotFoundException('Pacote não encontrado');
    }

    return pacote;
  }

  private async buscarPacoteInativoOuAtivoOuFalhar(
    empresaId: string,
    id: string,
  ) {
    const pacote = await this.prisma.pacote.findFirst({
      where: {
        id,
        empresaId,
      },
    });

    if (!pacote) {
      throw new NotFoundException('Pacote não encontrado');
    }

    return pacote;
  }

  private montarDadosAuditoria(pacote: PacoteAuditoria) {
    return {
      id: pacote.id,
      empresaId: pacote.empresaId,
      nome: pacote.nome,
      descricao: pacote.descricao,
      valor: Number(pacote.valor),
      quantidadeSessoes: pacote.quantidadeSessoes,
      validadeDias: pacote.validadeDias,
      ativo: pacote.ativo,
      createdAt: pacote.createdAt,
      updatedAt: pacote.updatedAt,
    };
  }
}
