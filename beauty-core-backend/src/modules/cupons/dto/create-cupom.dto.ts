import { TipoCupom } from '@prisma/client';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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

export class CreateCupomDto {
  @ApiProperty({
    example: 'BEAUTY20',
    description:
      'Código do cupom que será informado no momento da validação ou aplicação do desconto.',
    minLength: 2,
    maxLength: 40,
  })
  @IsString({
    message: 'O código do cupom deve ser um texto.',
  })
  @MinLength(2, {
    message: 'O código do cupom deve ter no mínimo 2 caracteres.',
  })
  @MaxLength(40, {
    message: 'O código do cupom deve ter no máximo 40 caracteres.',
  })
  codigo: string;

  @ApiProperty({
    example: 'Cupom de boas-vindas',
    description:
      'Nome interno do cupom para identificação administrativa no painel.',
    minLength: 2,
    maxLength: 120,
  })
  @IsString({
    message: 'O nome do cupom deve ser um texto.',
  })
  @MinLength(2, {
    message: 'O nome do cupom deve ter no mínimo 2 caracteres.',
  })
  @MaxLength(120, {
    message: 'O nome do cupom deve ter no máximo 120 caracteres.',
  })
  nome: string;

  @ApiPropertyOptional({
    example: 'Cupom promocional para novos clientes.',
    description:
      'Descrição opcional do cupom, usada para explicar a campanha, regra comercial ou condição de uso.',
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

  @ApiProperty({
    enum: TipoCupom,
    example: Object.values(TipoCupom)[0],
    description:
      'Tipo do cupom. Os valores disponíveis vêm do enum TipoCupom do Prisma.',
  })
  @IsEnum(TipoCupom, {
    message: 'O tipo do cupom informado é inválido.',
  })
  tipo: TipoCupom;

  @ApiProperty({
    example: 20,
    description:
      'Valor do desconto do cupom. Pode representar percentual ou valor fixo, conforme o tipo do cupom.',
    minimum: 0,
  })
  @IsNumber(
    {},
    {
      message: 'O valor do cupom deve ser um número.',
    },
  )
  @Min(0, {
    message: 'O valor do cupom deve ser maior ou igual a 0.',
  })
  valor: number;

  @ApiPropertyOptional({
    example: '2026-06-14T00:00:00.000Z',
    description:
      'Data opcional de início da validade do cupom em formato ISO 8601.',
  })
  @IsOptional()
  @IsDateString(
    {},
    {
      message: 'A data de início deve estar em formato de data válido.',
    },
  )
  dataInicio?: string;

  @ApiPropertyOptional({
    example: '2026-06-30T23:59:59.000Z',
    description:
      'Data opcional de término da validade do cupom em formato ISO 8601.',
  })
  @IsOptional()
  @IsDateString(
    {},
    {
      message: 'A data de fim deve estar em formato de data válido.',
    },
  )
  dataFim?: string;

  @ApiPropertyOptional({
    example: 100,
    description:
      'Quantidade máxima opcional de vezes que o cupom poderá ser utilizado.',
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
