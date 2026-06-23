import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class SolicitarCodigoDto {
  @ApiProperty({
    example: '83999999999',
    description:
      'Telefone do cliente com DDD. Usado para localizar o cliente e gerar o código OTP de acesso dentro da empresa resolvida por slug ou domínio.',
    minLength: 10,
    maxLength: 15,
  })
  @IsString({
    message: 'O telefone deve ser um texto.',
  })
  @Length(10, 15, {
    message: 'O telefone deve ter entre 10 e 15 caracteres.',
  })
  telefone: string;

  @ApiPropertyOptional({
    example: 'beauty-core-demo',
    description:
      'Slug público da empresa. Usado para resolver o tenant antes do login do cliente.',
    minLength: 2,
    maxLength: 80,
  })
  @IsOptional()
  @IsString({
    message: 'O slug da empresa deve ser um texto.',
  })
  @Length(2, 80, {
    message: 'O slug da empresa deve ter entre 2 e 80 caracteres.',
  })
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'O slug deve conter apenas letras minúsculas, números e hífens.',
  })
  slug?: string;

  @ApiPropertyOptional({
    example: 'beauty-demo.local',
    description:
      'Domínio público da empresa. Alternativa ao slug para resolver o tenant antes do login do cliente.',
    minLength: 3,
    maxLength: 120,
  })
  @IsOptional()
  @IsString({
    message: 'O domínio da empresa deve ser um texto.',
  })
  @Length(3, 120, {
    message: 'O domínio da empresa deve ter entre 3 e 120 caracteres.',
  })
  dominio?: string;
}