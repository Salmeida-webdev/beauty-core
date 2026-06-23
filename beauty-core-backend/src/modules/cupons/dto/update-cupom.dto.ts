import { TipoCupom } from '@prisma/client';

import {
  ApiPropertyOptional,
} from '@nestjs/swagger';

import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateCupomDto {
  @ApiPropertyOptional({
    example: 'BEAUTY30',
    description:
      'Código atualizado do cupom. Campo opcional para atualização parcial.',
    minLength: 2,
    maxLength: 40,
  })
  @IsOptional()
  @IsString({
    message: 'O código do cupom deve ser um texto.',
  })
  @MinLength(2, {
    message: 'O código do cupom deve ter no mínimo 2 caracteres.',
  })
  @MaxLength(40, {
    message: 'O código do cupom deve ter no máximo 40 caracteres.',
  })
  codigo?: string;

  @ApiPropertyOptional({
    example: 'Cupom especial atualizado',
    description:
      'Nome atualizado do cupom para identificação administrativa no painel.',
    minLength: 2,
    maxLength: 120,
  })
  @IsOptional()
  @IsString({
    message: 'O nome do cupom deve ser um texto.',
  })
  @MinLength(2, {
    message: 'O nome do cupom deve ter no mínimo 2 caracteres.',
  })
  @MaxLength(120, {
    message: 'O nome do cupom deve ter no máximo 120 caracteres.',
  })
  nome?: string;

  @ApiPropertyOptional({
    example: 'Cupom atualizado para campanha especial de retorno.',
    description:
      'Descrição opcional atualizada do cupom, usada para explicar a campanha, regra comercial ou condição de uso.',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({
    message: 'A descrição do cupom deve ser um texto.',
  })
  @MaxLength(500, {
    message: 'A descrição do cupom deve ter no máximo 500 caracteres.',
  })
  descricao?: string;

  @ApiPropertyOptional({
    enum: TipoCupom,
    example: Object.values(TipoCupom)[0],
    description:
      'Tipo atualizado do cupom. Os valores disponíveis vêm do enum TipoCupom do Prisma.',
  })
  @IsOptional()
  @IsEnum(TipoCupom, {
    message: 'O tipo do cupom informado é inválido.',
  })
  tipo?: TipoCupom;

  @ApiPropertyOptional({
    example: 30,
    description:
      'Valor atualizado do desconto do cupom. Pode representar percentual ou valor fixo, conforme o tipo do cupom.',
    minimum: 0,
  })
  @IsOptional()
  @IsNumber({}, {
    message: 'O valor do cupom deve ser um número.',
  })
  @Min(0, {
    message: 'O valor do cupom deve ser maior ou igual a 0.',
  })
  valor?: number;

  @ApiPropertyOptional({
    example: '2026-06-14T00:00:00.000Z',
    description:
      'Data opcional atualizada de início da validade do cupom em formato ISO 8601.',
  })
  @IsOptional()
  @IsDateString({}, {
    message: 'A data de início deve estar em formato de data válido.',
  })
  dataInicio?: string;

  @ApiPropertyOptional({
    example: '2026-07-01T23:59:59.000Z',
    description:
      'Data opcional atualizada de término da validade do cupom em formato ISO 8601.',
  })
  @IsOptional()
  @IsDateString({}, {
    message: 'A data de fim deve estar em formato de data válido.',
  })
  dataFim?: string;

  @ApiPropertyOptional({
    example: 150,
    description:
      'Quantidade máxima opcional atualizada de vezes que o cupom poderá ser utilizado.',
    minimum: 1,
  })
  @IsOptional()
  @IsInt({
    message: 'A quantidade máxima deve ser um número inteiro.',
  })
  @Min(1, {
    message: 'A quantidade máxima deve ser no mínimo 1.',
  })
  quantidadeMaxima?: number;
}