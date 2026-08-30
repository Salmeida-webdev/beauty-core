import { ApiPropertyOptional } from '@nestjs/swagger';
import { StatusPagamento, TipoMovimentacaoFinanceira } from '@prisma/client';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';

import { PaginationDto } from '../../../shared/dto/pagination.dto';

export class ListMovimentacoesQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    format: 'uuid',
    description:
      'Filtra movimentações pela categoria financeira da empresa autenticada.',
  })
  @IsOptional()
  @IsUUID('4', {
    message: 'O categoriaId deve ser um UUID válido.',
  })
  categoriaId?: string;

  @ApiPropertyOptional({
    format: 'uuid',
    description: 'Filtra movimentações pelo cliente da empresa autenticada.',
  })
  @IsOptional()
  @IsUUID('4', {
    message: 'O clienteId deve ser um UUID válido.',
  })
  clienteId?: string;

  @ApiPropertyOptional({
    format: 'uuid',
    description:
      'Filtra movimentações pelo agendamento da empresa autenticada.',
  })
  @IsOptional()
  @IsUUID('4', {
    message: 'O agendamentoId deve ser um UUID válido.',
  })
  agendamentoId?: string;

  @ApiPropertyOptional({
    enum: TipoMovimentacaoFinanceira,
    description: 'Filtra pelo tipo financeiro real da movimentação.',
  })
  @IsOptional()
  @IsEnum(TipoMovimentacaoFinanceira, {
    message: 'O tipo de movimentação financeira informado é inválido.',
  })
  tipo?: TipoMovimentacaoFinanceira;

  @ApiPropertyOptional({
    enum: StatusPagamento,
    description: 'Filtra pelo status financeiro real da movimentação.',
  })
  @IsOptional()
  @IsEnum(StatusPagamento, {
    message: 'O status financeiro informado é inválido.',
  })
  status?: StatusPagamento;
}
