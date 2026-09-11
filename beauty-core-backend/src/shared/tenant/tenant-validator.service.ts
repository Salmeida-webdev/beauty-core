import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role, StatusArquivo } from '@prisma/client';

import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class TenantValidatorService {
  constructor(private readonly prisma: PrismaService) {}

  async validarEmpresaAtiva(empresaId: string) {
    this.validarIdObrigatorio(empresaId, 'empresaId');

    const empresa = await this.prisma.empresa.findFirst({
      where: {
        id: empresaId,
        ativo: true,
      },
      select: {
        id: true,
        nome: true,
        slug: true,
        plano: true,
        ativo: true,
      },
    });

    if (!empresa) {
      throw new NotFoundException('Empresa não encontrada ou inativa.');
    }

    return empresa;
  }

  async validarCliente(empresaId: string, clienteId: string) {
    this.validarIdObrigatorio(empresaId, 'empresaId');
    this.validarIdObrigatorio(clienteId, 'clienteId');

    const cliente = await this.prisma.cliente.findFirst({
      where: {
        id: clienteId,
        empresaId,
        ativo: true,
      },
      select: {
        id: true,
        empresaId: true,
        nome: true,
        telefone: true,
        email: true,
        ativo: true,
        ativoPortal: true,
        foto: true,
        dataNascimento: true,
        observacoes: true,
      },
    });

    if (!cliente) {
      throw new NotFoundException(
        'Cliente não encontrado, inativo ou não pertence à empresa informada.',
      );
    }

    return cliente;
  }

  async validarServico(empresaId: string, servicoId: string) {
    this.validarIdObrigatorio(empresaId, 'empresaId');
    this.validarIdObrigatorio(servicoId, 'servicoId');

    const servico = await this.prisma.servico.findFirst({
      where: {
        id: servicoId,
        empresaId,
        ativo: true,
      },
      select: {
        id: true,
        empresaId: true,
        nome: true,
        ativo: true,
      },
    });

    if (!servico) {
      throw new NotFoundException(
        'Serviço não encontrado, inativo ou não pertence à empresa informada.',
      );
    }

    return servico;
  }

  async validarUnidade(empresaId: string, unidadeId: string) {
    this.validarIdObrigatorio(empresaId, 'empresaId');
    this.validarIdObrigatorio(unidadeId, 'unidadeId');

    const unidade = await this.prisma.unidade.findFirst({
      where: {
        id: unidadeId,
        empresaId,
      },
      select: {
        id: true,
        empresaId: true,
        nome: true,
      },
    });

    if (!unidade) {
      throw new NotFoundException(
        'Unidade não encontrada ou não pertence à empresa informada.',
      );
    }

    return unidade;
  }

  async validarUsuario(empresaId: string, usuarioId: string) {
    this.validarIdObrigatorio(empresaId, 'empresaId');
    this.validarIdObrigatorio(usuarioId, 'usuarioId');

    const usuario = await this.prisma.usuario.findFirst({
      where: {
        id: usuarioId,
        empresaId,
        ativo: true,
        role: {
          not: Role.CLIENTE,
        },
      },
      select: {
        id: true,
        empresaId: true,
        nome: true,
        email: true,
        telefone: true,
        role: true,
        ativo: true,
      },
    });

    if (!usuario) {
      throw new NotFoundException(
        'Usuário não encontrado, inativo ou não pertence à empresa informada.',
      );
    }

    return usuario;
  }

  async validarProfissional(empresaId: string, profissionalId: string) {
    this.validarIdObrigatorio(empresaId, 'empresaId');
    this.validarIdObrigatorio(profissionalId, 'profissionalId');

    const profissional = await this.prisma.usuario.findFirst({
      where: {
        id: profissionalId,
        empresaId,
        ativo: true,
        role: Role.PROFISSIONAL,
      },
      select: {
        id: true,
        empresaId: true,
        nome: true,
        email: true,
        telefone: true,
        role: true,
        ativo: true,
      },
    });

    if (!profissional) {
      throw new NotFoundException(
        'Profissional não encontrado, inativo ou não pertence à empresa informada.',
      );
    }

    return profissional;
  }

  async validarAgendamento(empresaId: string, agendamentoId: string) {
    this.validarIdObrigatorio(empresaId, 'empresaId');
    this.validarIdObrigatorio(agendamentoId, 'agendamentoId');

    const agendamento = await this.prisma.agendamento.findFirst({
      where: {
        id: agendamentoId,
        empresaId,
      },
      select: {
        id: true,
        empresaId: true,
        clienteId: true,
        profissionalId: true,
        servicoId: true,
        unidadeId: true,
        status: true,
        dataHoraInicio: true,
        dataHoraFim: true,
      },
    });

    if (!agendamento) {
      throw new NotFoundException(
        'Agendamento não encontrado ou não pertence à empresa informada.',
      );
    }

    return agendamento;
  }

  async validarPacote(empresaId: string, pacoteId: string) {
    this.validarIdObrigatorio(empresaId, 'empresaId');
    this.validarIdObrigatorio(pacoteId, 'pacoteId');

    const pacote = await this.prisma.pacote.findFirst({
      where: {
        id: pacoteId,
        empresaId,
        ativo: true,
      },
      select: {
        id: true,
        empresaId: true,
        nome: true,
        ativo: true,
      },
    });

    if (!pacote) {
      throw new NotFoundException(
        'Pacote não encontrado, inativo ou não pertence à empresa informada.',
      );
    }

    return pacote;
  }

  async validarCupom(empresaId: string, cupomId: string) {
    this.validarIdObrigatorio(empresaId, 'empresaId');
    this.validarIdObrigatorio(cupomId, 'cupomId');

    const cupom = await this.prisma.cupom.findFirst({
      where: {
        id: cupomId,
        empresaId,
        ativo: true,
      },
      select: {
        id: true,
        empresaId: true,
        codigo: true,
        tipo: true,
        valor: true,
        ativo: true,
      },
    });

    if (!cupom) {
      throw new NotFoundException(
        'Cupom não encontrado, inativo ou não pertence à empresa informada.',
      );
    }

    return cupom;
  }

  async validarArquivo(empresaId: string, arquivoId: string) {
    this.validarIdObrigatorio(empresaId, 'empresaId');
    this.validarIdObrigatorio(arquivoId, 'arquivoId');

    const arquivo = await this.prisma.arquivo.findFirst({
      where: {
        id: arquivoId,
        empresaId,
        status: {
          not: StatusArquivo.EXCLUIDO,
        },
      },
      select: {
        id: true,
        empresaId: true,
        clienteId: true,
        usuarioId: true,
        servicoId: true,
        tipo: true,
        nomeOriginal: true,
        nomeArquivo: true,
        caminho: true,
        mimeType: true,
        status: true,
      },
    });

    if (!arquivo) {
      throw new NotFoundException(
        'Arquivo não encontrado, excluído ou não pertence à empresa informada.',
      );
    }

    return arquivo;
  }

  async validarCategoriaFinanceira(
    empresaId: string,
    categoriaFinanceiraId: string,
  ) {
    this.validarIdObrigatorio(empresaId, 'empresaId');
    this.validarIdObrigatorio(categoriaFinanceiraId, 'categoriaFinanceiraId');

    const categoria = await this.prisma.categoriaFinanceira.findFirst({
      where: {
        id: categoriaFinanceiraId,
        empresaId,
        ativo: true,
      },
      select: {
        id: true,
        empresaId: true,
        nome: true,
        tipo: true,
        ativo: true,
      },
    });

    if (!categoria) {
      throw new NotFoundException(
        'Categoria financeira não encontrada, inativa ou não pertence à empresa informada.',
      );
    }

    return categoria;
  }

  private validarIdObrigatorio(
    valor: string | null | undefined,
    nomeCampo: string,
  ) {
    if (!valor || valor.trim().length === 0) {
      throw new BadRequestException(`${nomeCampo} é obrigatório.`);
    }
  }
}
