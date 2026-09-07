import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'admin@beautycore.com',
    description: 'E-mail do usuário administrativo.',
  })
  @IsEmail({}, { message: 'E-mail inválido.' })
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Senha do usuário administrativo.',
    minLength: 6,
  })
  @IsString({ message: 'A senha deve ser um texto.' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  senha: string;
}