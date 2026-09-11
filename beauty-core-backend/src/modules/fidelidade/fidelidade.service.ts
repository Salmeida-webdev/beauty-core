import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../database/prisma/prisma.service';
import { TenantValidatorService } from '../../shared/tenant';

import { CreateFidelidadeDto } from './dto/create-fidelidade.dto';
import { AdicionarPontosDto } from './dto/adicionar-pontos.dto';
import { ResgatarPontosDto } from './dto/resgatar-pontos.dto';
import { PontuarPorValorDto } from './dto/pontuar-por-valor.dto';

import { AutomacoesService } from '../automacoes/automacoes.service';
import { TipoEventoSistema } from '../automacoes/eventos/tipo-evento-sistema.enum';

@Injectable()
export class FidelidadeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly automacoesService: AutomacoesService,
    private readonly tenantValidator: TenantValidatorService,
  ) {}

  async create(empresaId: string, dto: CreateFidelidadeDto) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);
    await this.tenantValidator.validarCliente(empresaId, dto.clienteId);

    const existente = await this.prisma.fidelidade.findFirst({
      where: {
        clienteId: dto.clienteId,
        empresaId,
      },
    });

    if (existente) {
      throw new BadRequestException('Fidelidade já cadastrada');
    }

    return this.prisma.fidelidade.create({
      data: {
        clienteId: dto.clienteId,
        empresaId,
      },
    });
  }

  async saldo(empresaId: string, clienteId: string) {
    return this.buscarFidelidadeOuFalhar(empresaId, clienteId);
  }

  async adicionarPontos(empresaId: string, dto: AdicionarPontosDto) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);
    await this.tenantValidator.validarCliente(empresaId, dto.clienteId);

    const fidelidade = await this.buscarFidelidadeOuFalhar(
      empresaId,
      dto.clienteId,
    );

    const saldoAnterior = fidelidade.saldoPontos;

    const result = await this.prisma.fidelidade.updateMany({
      where: {
        id: fidelidade.id,
        empresaId,
        clienteId: dto.clienteId,
      },
      data: {
        saldoPontos: {
          increment: dto.pontos,
        },
      },
    });

    if (result.count === 0) {
      throw new NotFoundException('Cadastro de fidelidade não encontrado');
    }

    const atualizado = await this.buscarFidelidadeOuFalhar(
      empresaId,
      dto.clienteId,
    );

    const movimentacao = await this.prisma.movimentacaoPontos.create({
      data: {
        clienteId: dto.clienteId,
        empresaId,
        tipo: 'GANHO',
        pontos: dto.pontos,
        descricao: dto.descricao,
      },
    });

    await this.automacoesService.processarEvento({
      empresaId,
      tipo: TipoEventoSistema.PONTOS_ADICIONADOS,
      modulo: 'FIDELIDADE',
      titulo: 'Pontos adicionados',
      mensagem: `Cliente recebeu ${dto.pontos} pontos de fidelidade.`,
      referenciaId: movimentacao.id,
      dados: {
        clienteId: dto.clienteId,
        fidelidadeId: atualizado.id,
        movimentacaoId: movimentacao.id,
        pontosAdicionados: dto.pontos,
        saldoAnterior,
        saldoAtual: atualizado.saldoPontos,
        descricao: dto.descricao,
      },
    });

    await this.verificarNivelAlterado(
      empresaId,
      dto.clienteId,
      saldoAnterior,
      atualizado.saldoPontos,
    );

    await this.verificarBeneficioLiberado(
      empresaId,
      dto.clienteId,
      atualizado.saldoPontos,
    );

    return atualizado;
  }

  async resgatarPontos(empresaId: string, dto: ResgatarPontosDto) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);
    await this.tenantValidator.validarCliente(empresaId, dto.clienteId);

    const fidelidade = await this.buscarFidelidadeOuFalhar(
      empresaId,
      dto.clienteId,
    );

    if (fidelidade.saldoPontos < dto.pontos) {
      throw new BadRequestException('Saldo insuficiente');
    }

    const saldoAnterior = fidelidade.saldoPontos;

    const result = await this.prisma.fidelidade.updateMany({
      where: {
        id: fidelidade.id,
        empresaId,
        clienteId: dto.clienteId,
      },
      data: {
        saldoPontos: {
          decrement: dto.pontos,
        },
      },
    });

    if (result.count === 0) {
      throw new NotFoundException('Cadastro de fidelidade não encontrado');
    }

    const atualizado = await this.buscarFidelidadeOuFalhar(
      empresaId,
      dto.clienteId,
    );

    const movimentacao = await this.prisma.movimentacaoPontos.create({
      data: {
        clienteId: dto.clienteId,
        empresaId,
        tipo: 'RESGATE',
        pontos: dto.pontos,
        descricao: dto.descricao,
      },
    });

    await this.automacoesService.processarEvento({
      empresaId,
      tipo: TipoEventoSistema.PONTOS_RESGATADOS,
      modulo: 'FIDELIDADE',
      titulo: 'Pontos resgatados',
      mensagem: `Cliente resgatou ${dto.pontos} pontos de fidelidade.`,
      referenciaId: movimentacao.id,
      dados: {
        clienteId: dto.clienteId,
        fidelidadeId: atualizado.id,
        movimentacaoId: movimentacao.id,
        pontosResgatados: dto.pontos,
        saldoAnterior,
        saldoAtual: atualizado.saldoPontos,
        descricao: dto.descricao,
      },
    });

    return atualizado;
  }

  async historico(empresaId: string, clienteId: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);
    await this.tenantValidator.validarCliente(empresaId, clienteId);

    return this.prisma.movimentacaoPontos.findMany({
      where: {
        clienteId,
        empresaId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async pontuarPorValor(empresaId: string, dto: PontuarPorValorDto) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);
    await this.tenantValidator.validarCliente(empresaId, dto.clienteId);

    const configuracao = await this.prisma.configuracaoFidelidade.findUnique({
      where: {
        empresaId,
      },
    });

    if (!configuracao || !configuracao.fidelidadeAtiva) {
      throw new BadRequestException(
        'Programa de fidelidade não está ativo para esta empresa',
      );
    }

    if (!configuracao.pontuacaoAutomatica) {
      throw new BadRequestException(
        'Pontuação automática não está ativa para esta empresa',
      );
    }

    let fidelidade = await this.prisma.fidelidade.findFirst({
      where: {
        clienteId: dto.clienteId,
        empresaId,
      },
    });

    if (!fidelidade) {
      fidelidade = await this.prisma.fidelidade.create({
        data: {
          clienteId: dto.clienteId,
          empresaId,
        },
      });
    }

    const saldoAnterior = fidelidade.saldoPontos;

    const pontosCalculados = Math.floor(
      dto.valorGasto * configuracao.pontosPorReal,
    );

    if (pontosCalculados <= 0) {
      throw new BadRequestException(
        'Valor gasto insuficiente para gerar pontos',
      );
    }

    const result = await this.prisma.fidelidade.updateMany({
      where: {
        id: fidelidade.id,
        empresaId,
        clienteId: dto.clienteId,
      },
      data: {
        saldoPontos: {
          increment: pontosCalculados,
        },
      },
    });

    if (result.count === 0) {
      throw new NotFoundException('Cadastro de fidelidade não encontrado');
    }

    const atualizado = await this.buscarFidelidadeOuFalhar(
      empresaId,
      dto.clienteId,
    );

    const movimentacao = await this.prisma.movimentacaoPontos.create({
      data: {
        clienteId: dto.clienteId,
        empresaId,
        tipo: 'GANHO',
        pontos: pontosCalculados,
        descricao: dto.descricao,
      },
    });

    await this.automacoesService.processarEvento({
      empresaId,
      tipo: TipoEventoSistema.PONTOS_ADICIONADOS,
      modulo: 'FIDELIDADE',
      titulo: 'Pontos adicionados automaticamente',
      mensagem: `Cliente recebeu ${pontosCalculados} pontos por valor gasto.`,
      referenciaId: movimentacao.id,
      dados: {
        clienteId: dto.clienteId,
        fidelidadeId: atualizado.id,
        movimentacaoId: movimentacao.id,
        valorGasto: dto.valorGasto,
        pontosGerados: pontosCalculados,
        saldoAnterior,
        saldoAtual: atualizado.saldoPontos,
        configuracaoUsada: {
          pontosPorReal: configuracao.pontosPorReal,
          pontuacaoAutomatica: configuracao.pontuacaoAutomatica,
        },
      },
    });

    await this.verificarNivelAlterado(
      empresaId,
      dto.clienteId,
      saldoAnterior,
      atualizado.saldoPontos,
    );

    await this.verificarBeneficioLiberado(
      empresaId,
      dto.clienteId,
      atualizado.saldoPontos,
    );

    return {
      valorGasto: dto.valorGasto,
      pontosGerados: pontosCalculados,
      saldoAtual: atualizado.saldoPontos,
      configuracaoUsada: {
        pontosPorReal: configuracao.pontosPorReal,
        pontuacaoAutomatica: configuracao.pontuacaoAutomatica,
      },
    };
  }

  async beneficioDisponivel(empresaId: string, clienteId: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);
    await this.tenantValidator.validarCliente(empresaId, clienteId);

    const configuracao = await this.prisma.configuracaoFidelidade.findUnique({
      where: {
        empresaId,
      },
    });

    if (!configuracao || !configuracao.fidelidadeAtiva) {
      throw new BadRequestException(
        'Programa de fidelidade não está ativo para esta empresa',
      );
    }

    const fidelidade = await this.buscarFidelidadeOuFalhar(
      empresaId,
      clienteId,
    );

    const quantidadeResgates = Math.floor(
      fidelidade.saldoPontos / configuracao.pontosParaResgate,
    );

    const valorDisponivel = quantidadeResgates * configuracao.valorResgate;

    return {
      clienteId,
      saldoPontos: fidelidade.saldoPontos,
      pontosParaResgate: configuracao.pontosParaResgate,
      valorPorResgate: configuracao.valorResgate,
      quantidadeResgates,
      valorDisponivel,
    };
  }

  async nivelAtual(empresaId: string, clienteId: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);
    await this.tenantValidator.validarCliente(empresaId, clienteId);

    const configuracao = await this.prisma.configuracaoFidelidade.findUnique({
      where: {
        empresaId,
      },
    });

    if (!configuracao || !configuracao.niveisAtivos) {
      throw new BadRequestException(
        'Níveis de fidelidade não estão ativos para esta empresa',
      );
    }

    const fidelidade = await this.buscarFidelidadeOuFalhar(
      empresaId,
      clienteId,
    );

    const nivel = await this.prisma.nivelFidelidade.findFirst({
      where: {
        empresaId,
        pontosMinimos: {
          lte: fidelidade.saldoPontos,
        },
      },
      orderBy: {
        pontosMinimos: 'desc',
      },
    });

    if (!nivel) {
      return {
        clienteId,
        saldoPontos: fidelidade.saldoPontos,
        nivelAtual: null,
      };
    }

    return {
      clienteId,
      saldoPontos: fidelidade.saldoPontos,
      nivelAtual: nivel,
    };
  }

  private async buscarFidelidadeOuFalhar(empresaId: string, clienteId: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);
    await this.tenantValidator.validarCliente(empresaId, clienteId);

    const fidelidade = await this.prisma.fidelidade.findFirst({
      where: {
        clienteId,
        empresaId,
      },
    });

    if (!fidelidade) {
      throw new NotFoundException('Cadastro de fidelidade não encontrado');
    }

    return fidelidade;
  }

  private async verificarNivelAlterado(
    empresaId: string,
    clienteId: string,
    saldoAnterior: number,
    saldoAtual: number,
  ) {
    const configuracao = await this.prisma.configuracaoFidelidade.findUnique({
      where: {
        empresaId,
      },
    });

    if (!configuracao || !configuracao.niveisAtivos) {
      return;
    }

    const nivelAnterior = await this.prisma.nivelFidelidade.findFirst({
      where: {
        empresaId,
        pontosMinimos: {
          lte: saldoAnterior,
        },
      },
      orderBy: {
        pontosMinimos: 'desc',
      },
    });

    const nivelAtual = await this.prisma.nivelFidelidade.findFirst({
      where: {
        empresaId,
        pontosMinimos: {
          lte: saldoAtual,
        },
      },
      orderBy: {
        pontosMinimos: 'desc',
      },
    });

    if (!nivelAtual) {
      return;
    }

    if (nivelAnterior?.id === nivelAtual.id) {
      return;
    }

    await this.automacoesService.processarEvento({
      empresaId,
      tipo: TipoEventoSistema.NIVEL_ALTERADO,
      modulo: 'FIDELIDADE',
      titulo: 'Nível de fidelidade alterado',
      mensagem: `Cliente atingiu o nível ${nivelAtual.nome}.`,
      referenciaId: nivelAtual.id,
      dados: {
        clienteId,
        nivelAnterior,
        nivelAtual,
        saldoAnterior,
        saldoAtual,
      },
    });
  }

  private async verificarBeneficioLiberado(
    empresaId: string,
    clienteId: string,
    saldoAtual: number,
  ) {
    const configuracao = await this.prisma.configuracaoFidelidade.findUnique({
      where: {
        empresaId,
      },
    });

    if (!configuracao || !configuracao.fidelidadeAtiva) {
      return;
    }

    if (saldoAtual < configuracao.pontosParaResgate) {
      return;
    }

    const quantidadeResgates = Math.floor(
      saldoAtual / configuracao.pontosParaResgate,
    );

    const valorDisponivel = quantidadeResgates * configuracao.valorResgate;

    await this.automacoesService.processarEvento({
      empresaId,
      tipo: TipoEventoSistema.BENEFICIO_LIBERADO,
      modulo: 'FIDELIDADE',
      titulo: 'Benefício liberado',
      mensagem: `Cliente desbloqueou ${quantidadeResgates} benefício(s), totalizando R$ ${valorDisponivel}.`,
      dados: {
        clienteId,
        saldoAtual,
        pontosParaResgate: configuracao.pontosParaResgate,
        valorPorResgate: configuracao.valorResgate,
        quantidadeResgates,
        valorDisponivel,
      },
    });
  }
}
