import { ApiPropertyOptional } from '@nestjs/swagger';

import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdatePacoteDto {
  @ApiPropertyOptional({
    example: 'Pacote Limpeza de Pele Premium',
    description:
      'Nome atualizado do pacote de serviços. Campo opcional para atualização parcial.',
    minLength: 2,
    maxLength: 120,
  })
  @IsOptional()
  @IsString({
    message: 'O nome do pacote deve ser um texto.',
  })
  @MinLength(2, {
    message: 'O nome do pacote deve ter no mínimo 2 caracteres.',
  })
  @MaxLength(120, {
    message: 'O nome do pacote deve ter no máximo 120 caracteres.',
  })
  nome?: string;

  @ApiPropertyOptional({
    example: 'Pacote atualizado com 6 sessões de limpeza de pele.',
    description:
      'Descrição opcional atualizada do pacote, usada para explicar serviços inclusos, regras comerciais ou observações internas.',
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

  @ApiPropertyOptional({
    example: 600,
    description:
      'Valor comercial atualizado do pacote. Deve ser maior ou igual a zero.',
    minimum: 0,
  })
  @IsOptional()
  @IsNumber(
    {},
    {
      message: 'O valor do pacote deve ser um número.',
    },
  )
  @Min(0, {
    message: 'O valor do pacote deve ser maior ou igual a 0.',
  })
  valor?: number;

  @ApiPropertyOptional({
    example: 6,
    description: 'Quantidade total atualizada de sessões incluídas no pacote.',
    minimum: 1,
  })
  @IsOptional()
  @IsInt({
    message: 'A quantidade de sessões deve ser um número inteiro.',
  })
  @Min(1, {
    message: 'A quantidade de sessões deve ser no mínimo 1.',
  })
  quantidadeSessoes?: number;

  @ApiPropertyOptional({
    example: 120,
    description:
      'Validade opcional atualizada do pacote em dias. Quando informada, pode ser usada para controlar vencimento do pacote do cliente.',
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
