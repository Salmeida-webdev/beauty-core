import { CategoriaFinanceiraTipo } from '@prisma/client';

import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoriaFinanceiraDto {
  @ApiProperty({
    example: 'Procedimentos Estéticos',
    description:
      'Nome da categoria financeira. Usado para classificar receitas ou despesas no módulo financeiro.',
  })
  @IsString({
    message: 'O nome da categoria financeira deve ser um texto.',
  })
  @IsNotEmpty({
    message: 'O nome da categoria financeira é obrigatório.',
  })
  nome: string;

  @ApiProperty({
    enum: CategoriaFinanceiraTipo,
    example: Object.values(CategoriaFinanceiraTipo)[0],
    description:
      'Tipo da categoria financeira. Define se a categoria será usada para receitas, despesas ou outro tipo previsto no enum CategoriaFinanceiraTipo.',
  })
  @IsEnum(CategoriaFinanceiraTipo, {
    message: 'O tipo da categoria financeira informado é inválido.',
  })
  tipo: CategoriaFinanceiraTipo;
}
