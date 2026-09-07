import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../database/prisma/prisma.service';
import { TenantValidatorService } from '../../shared/tenant';

import { CreateCupomDto } from './dto/create-cupom.dto';
import { UpdateCupomDto } from './dto/update-cupom.dto';
import { ValidarCupomDto } from './dto/validar-cupom.dto';

@Injectable()
export class CuponsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tenantValidator: TenantValidatorService,
  ) {}

  async create(empresaId: string, dto: CreateCupomDto) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    this.validarPeriodoCupom(dto.dataInicio, dto.dataFim);

    const codigo = dto.codigo.toUpperCase().trim();

    const cupomExistente = await this.prisma.cupom.findFirst({
      where: {
        empresaId,
        codigo,
      },
    });

    if (cupomExistente) {
      throw new BadRequestException('Cupom já cadastrado');
    }

    return this.prisma.cupom.create({
      data: {
        empresaId,
        codigo,
        nome: dto.nome,
        descricao: dto.descricao,
        tipo: dto.tipo,
        valor: dto.valor,
        dataInicio: dto.dataInicio ? new Date(dto.dataInicio) : undefined,
        dataFim: dto.dataFim ? new Date(dto.dataFim) : undefined,
        quantidadeMaxima: dto.quantidadeMaxima,
      },
    });
  }

  async findAll(empresaId: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    return this.prisma.cupom.findMany({
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
    return this.buscarCupomOuFalhar(empresaId, id);
  }

  async update(empresaId: string, id: string, dto: UpdateCupomDto) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    await this.buscarCupomOuFalhar(empresaId, id);

    this.validarPeriodoCupom(dto.dataInicio, dto.dataFim);

    const codigo = dto.codigo
      ? dto.codigo.toUpperCase().trim()
      : undefined;

    if (codigo) {
      const cupomExistente = await this.prisma.cupom.findFirst({
        where: {
          empresaId,
          codigo,
          id: {
            not: id,
          },
        },
      });

      if (cupomExistente) {
        throw new BadRequestException(
          'Já existe outro cupom com este código',
        );
      }
    }

    const result = await this.prisma.cupom.updateMany({
      where: {
        id,
        empresaId,
        ativo: true,
      },
      data: {
        codigo,
        nome: dto.nome,
        descricao: dto.descricao,
        tipo: dto.tipo,
        valor: dto.valor,
        dataInicio: dto.dataInicio ? new Date(dto.dataInicio) : undefined,
        dataFim: dto.dataFim ? new Date(dto.dataFim) : undefined,
        quantidadeMaxima: dto.quantidadeMaxima,
      },
    });

    if (result.count === 0) {
      throw new NotFoundException('Cupom não encontrado');
    }

    return this.buscarCupomOuFalhar(empresaId, id);
  }

  async inativar(empresaId: string, id: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    await this.buscarCupomOuFalhar(empresaId, id);

    const result = await this.prisma.cupom.updateMany({
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
      throw new NotFoundException('Cupom não encontrado');
    }

    return this.buscarCupomInativoOuAtivoOuFalhar(empresaId, id);
  }

  async validar(empresaId: string, dto: ValidarCupomDto) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const codigo = dto.codigo.toUpperCase().trim();

    const cupom = await this.prisma.cupom.findFirst({
      where: {
        empresaId,
        codigo,
      },
    });

    if (!cupom) {
      throw new NotFoundException('Cupom não encontrado');
    }

    if (!cupom.ativo) {
      throw new BadRequestException('Cupom inativo');
    }

    const agora = new Date();

    if (cupom.dataInicio && cupom.dataInicio > agora) {
      throw new BadRequestException('Cupom ainda não está disponível');
    }

    if (cupom.dataFim && cupom.dataFim < agora) {
      throw new BadRequestException('Cupom expirado');
    }

    if (
      cupom.quantidadeMaxima !== null &&
      cupom.quantidadeUtilizada >= cupom.quantidadeMaxima
    ) {
      throw new BadRequestException(
        'Cupom atingiu o limite máximo de uso',
      );
    }

    return {
      valido: true,
      mensagem: 'Cupom válido',
      cupom,
    };
  }

  private async buscarCupomOuFalhar(empresaId: string, id: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const cupom = await this.prisma.cupom.findFirst({
      where: {
        id,
        empresaId,
        ativo: true,
      },
    });

    if (!cupom) {
      throw new NotFoundException('Cupom não encontrado');
    }

    return cupom;
  }

  private async buscarCupomInativoOuAtivoOuFalhar(
    empresaId: string,
    id: string,
  ) {
    const cupom = await this.prisma.cupom.findFirst({
      where: {
        id,
        empresaId,
      },
    });

    if (!cupom) {
      throw new NotFoundException('Cupom não encontrado');
    }

    return cupom;
  }

  private validarPeriodoCupom(
    dataInicio?: string | Date | null,
    dataFim?: string | Date | null,
  ) {
    if (!dataInicio || !dataFim) {
      return;
    }

    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);

    if (inicio > fim) {
      throw new BadRequestException(
        'A data inicial do cupom não pode ser maior que a data final.',
      );
    }
  }
}