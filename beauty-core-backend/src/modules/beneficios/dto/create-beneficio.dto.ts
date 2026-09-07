import {
  ApiProperty,
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

export class CreateBeneficioDto {
  @ApiProperty({
    example: 'Desconto especial',
    description:
      'Nome do benefício de fidelidade que será exibido no sistema.',
    minLength: 2,
    maxLength: 120,
  })
  @IsString({
    message: 'O nome deve ser um texto.',
  })
  @MinLength(2, {
    message: 'O nome deve ter no mínimo 2 caracteres.',
  })
  @MaxLength(120, {
    message: 'O nome deve ter no máximo 120 caracteres.',
  })
  nome: string;

  @ApiPropertyOptional({
    example: 'Benefício liberado para clientes fidelizados.',
    description:
      'Descrição opcional do benefício, explicando sua regra ou vantagem para o cliente.',
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

  @ApiProperty({
    example: 100,
    description:
      'Quantidade mínima de pontos necessária para o cliente resgatar este benefício.',
    minimum: 1,
  })
  @IsInt({
    message: 'Os pontos necessários devem ser um número inteiro.',
  })
  @Min(1, {
    message: 'Os pontos necessários devem ser no mínimo 1.',
  })
  pontosNecessarios: number;
}