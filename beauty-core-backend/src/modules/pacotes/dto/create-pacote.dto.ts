import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreatePacoteDto {
  @ApiProperty({
    example: 'Pacote Limpeza de Pele',
    description:
      'Nome do pacote de serviços. Usado para identificação comercial no painel administrativo e na venda para clientes.',
    minLength: 2,
    maxLength: 120,
  })
  @IsString({
    message: 'O nome do pacote deve ser um texto.',
  })
  @MinLength(2, {
    message: 'O nome do pacote deve ter no mínimo 2 caracteres.',
  })
  @MaxLength(120, {
    message: 'O nome do pacote deve ter no máximo 120 caracteres.',
  })
  nome: string;

  @ApiPropertyOptional({
    example: 'Pacote com 5 sessões de limpeza de pele.',
    description:
      'Descrição opcional do pacote, usada para explicar os serviços inclusos, regras comerciais ou observações internas.',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({
    message: 'A descrição do pacote deve ser um texto.',
  })
  @MaxLength(500, {
    message: 'A descrição do pacote deve ter no máximo 500 caracteres.',
  })
  descricao?: string;

  @ApiProperty({
    example: 500,
    description: 'Valor comercial do pacote. Deve ser maior ou igual a zero.',
    minimum: 0,
  })
  @IsNumber(
    {},
    {
      message: 'O valor do pacote deve ser um número.',
    },
  )
  @Min(0, {
    message: 'O valor do pacote deve ser maior ou igual a 0.',
  })
  valor: number;

  @ApiProperty({
    example: 5,
    description: 'Quantidade total de sessões incluídas no pacote.',
    minimum: 1,
  })
  @IsInt({
    message: 'A quantidade de sessões deve ser um número inteiro.',
  })
  @Min(1, {
    message: 'A quantidade de sessões deve ser no mínimo 1.',
  })
  quantidadeSessoes: number;

  @ApiPropertyOptional({
    example: 90,
    description:
      'Validade opcional do pacote em dias. Quando informado, pode ser usado para controlar vencimento do pacote do cliente.',
    minimum: 1,
  })
  @IsOptional()
  @IsInt({
    message: 'A validade em dias deve ser um número inteiro.',
  })
  @Min(1, {
    message: 'A validade em dias deve ser no mínimo 1.',
  })
  validadeDias?: number;
}
