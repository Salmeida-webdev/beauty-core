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

export class VerificarCodigoDto {
  @ApiProperty({
    example: '83999999999',
    description:
      'Telefone do cliente com DDD. Usado para localizar o cliente dentro da empresa resolvida por slug ou domÃ­nio.',
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

  @ApiProperty({
    example: '123456',
    description:
      'CÃ³digo OTP de 6 dÃ­gitos gerado para autenticaÃ§Ã£o do cliente final.',
    minLength: 6,
    maxLength: 6,
  })
  @IsString({
    message: 'O cÃ³digo deve ser um texto.',
  })
  @Length(6, 6, {
    message: 'O codigo deve ter exatamente 6 caracteres.',
  })
  @Matches(/^\d{6}$/, {
    message: 'O codigo deve conter apenas numeros.',
  })
  codigo: string;

  @ApiPropertyOptional({
    example: 'beauty-core-demo',
    description:
      'Slug pÃºblico da empresa. Usado para resolver o tenant antes de validar o cÃ³digo OTP.',
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
      'O slug deve conter apenas letras minÃºsculas, nÃºmeros e hÃ­fens.',
  })
  slug?: string;

  @ApiPropertyOptional({
    example: 'beauty-demo.local',
    description:
      'DomÃ­nio pÃºblico da empresa. Alternativa ao slug para resolver o tenant antes de validar o cÃ³digo OTP.',
    minLength: 3,
    maxLength: 120,
  })
  @IsOptional()
  @IsString({
    message: 'O domÃ­nio da empresa deve ser um texto.',
  })
  @Length(3, 120, {
    message: 'O domÃ­nio da empresa deve ter entre 3 e 120 caracteres.',
  })
  dominio?: string;
}
