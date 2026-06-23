import {
  ApiPropertyOptional,
} from '@nestjs/swagger';

import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateBeneficioDto {
  @ApiPropertyOptional({
    example: 'Desconto VIP',
    description:
      'Novo nome do benefício de fidelidade. Campo opcional para atualização parcial.',
    minLength: 2,
    maxLength: 120,
  })
  @IsOptional()
  @IsString({
    message: 'O nome deve ser um texto.',
  })
  @MinLength(2, {
    message: 'O nome deve ter no mínimo 2 caracteres.',
  })
  @MaxLength(120, {
    message: 'O nome deve ter no máximo 120 caracteres.',
  })
  nome?: string;

  @ApiPropertyOptional({
    example: 'Benefício atualizado para clientes fidelizados.',
    description:
      'Nova descrição opcional do benefício, explicando sua regra ou vantagem para o cliente.',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({
    message: 'A descrição deve ser um texto.',
  })
  @MaxLength(500, {
    message: 'A descrição deve ter no máximo 500 caracteres.',
  })
  descricao?: string;

  @ApiPropertyOptional({
    example: 150,
    description:
      'Nova quantidade mínima de pontos necessária para o cliente resgatar este benefício.',
    minimum: 1,
  })
  @IsOptional()
  @IsInt({
    message: 'Os pontos necessários devem ser um número inteiro.',
  })
  @Min(1, {
    message: 'Os pontos necessários devem ser no mínimo 1.',
  })
  pontosNecessarios?: number;
}