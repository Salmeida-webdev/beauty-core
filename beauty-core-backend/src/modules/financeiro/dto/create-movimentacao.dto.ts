import { FormaPagamento, TipoMovimentacaoFinanceira } from '@prisma/client';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateMovimentacaoDto {
  @ApiProperty({
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
    description:
      'ID da categoria financeira vinculada à movimentação. Deve pertencer à empresa autenticada.',
  })
  @IsUUID('4', {
    message: 'O categoriaId deve ser um UUID válido.',
  })
  categoriaId: string;

  @ApiPropertyOptional({
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
    description:
      'ID opcional do cliente relacionado à movimentação financeira. Deve pertencer à empresa autenticada quando informado.',
  })
  @IsOptional()
  @IsUUID('4', {
    message: 'O clienteId deve ser um UUID válido.',
  })
  clienteId?: string;

  @ApiPropertyOptional({
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
    description:
      'ID opcional do agendamento relacionado à movimentação financeira. Deve pertencer à empresa autenticada quando informado.',
  })
  @IsOptional()
  @IsUUID('4', {
    message: 'O agendamentoId deve ser um UUID válido.',
  })
  agendamentoId?: string;

  @ApiProperty({
    example: 'Pagamento de procedimento estético',
    description:
      'Descrição da movimentação financeira. Usada para identificação no painel financeiro, relatórios e fluxo de caixa.',
    minLength: 2,
    maxLength: 150,
  })
  @IsString({
    message: 'A descrição deve ser um texto.',
  })
  @MinLength(2, {
    message: 'A descrição deve ter no mínimo 2 caracteres.',
  })
  @MaxLength(150, {
    message: 'A descrição deve ter no máximo 150 caracteres.',
  })
  descricao: string;

  @ApiProperty({
    enum: TipoMovimentacaoFinanceira,
    example: Object.values(TipoMovimentacaoFinanceira)[0],
    description:
      'Tipo da movimentação financeira. Os valores disponíveis vêm do enum TipoMovimentacaoFinanceira do Prisma.',
  })
  @IsEnum(TipoMovimentacaoFinanceira, {
    message: 'O tipo da movimentação financeira informado é inválido.',
  })
  tipo: TipoMovimentacaoFinanceira;

  @ApiProperty({
    example: 250,
    description:
      'Valor da movimentação financeira. Deve ser maior ou igual a zero.',
    minimum: 0,
  })
  @IsNumber(
    {},
    {
      message: 'O valor da movimentação financeira deve ser um número.',
    },
  )
  @Min(0, {
    message: 'O valor da movimentação financeira deve ser maior ou igual a 0.',
  })
  valor: number;

  @ApiProperty({
    enum: FormaPagamento,
    example: Object.values(FormaPagamento)[0],
    description:
      'Forma de pagamento da movimentação financeira. Os valores disponíveis vêm do enum FormaPagamento do Prisma.',
  })
  @IsEnum(FormaPagamento, {
    message: 'A forma de pagamento informada é inválida.',
  })
  formaPagamento: FormaPagamento;

  @ApiPropertyOptional({
    example: 'Pagamento recebido via PIX no balcão.',
    description:
      'Observações opcionais sobre a movimentação financeira. Usadas para contexto administrativo, atendimento e auditoria.',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({
    message: 'As observações devem ser um texto.',
  })
  @MaxLength(500, {
    message: 'As observações devem ter no máximo 500 caracteres.',
  })
  observacoes?: string;
}
