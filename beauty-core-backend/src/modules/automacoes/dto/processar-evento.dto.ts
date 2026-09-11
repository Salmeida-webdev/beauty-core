import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { TipoEventoSistema } from '../eventos/tipo-evento-sistema.enum';

import {
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class ProcessarEventoDto {
  @ApiPropertyOptional({
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
    description:
      'ID da empresa relacionada ao evento. Normalmente é preenchido automaticamente pelo backend a partir do JWT Admin.',
  })
  @IsOptional()
  @IsUUID('4', {
    message: 'O empresaId deve ser um UUID válido.',
  })
  empresaId?: string;

  @ApiProperty({
    enum: TipoEventoSistema,
    example: Object.values(TipoEventoSistema)[0],
    description:
      'Tipo do evento do sistema que será processado pela camada de automações.',
  })
  @IsEnum(TipoEventoSistema, {
    message: 'O tipo do evento informado é inválido.',
  })
  tipo: TipoEventoSistema;

  @ApiProperty({
    example: 'clientes',
    description: 'Módulo de origem do evento dentro do sistema.',
    maxLength: 80,
  })
  @IsString({
    message: 'O módulo deve ser um texto.',
  })
  @MaxLength(80, {
    message: 'O módulo deve ter no máximo 80 caracteres.',
  })
  modulo: string;

  @ApiPropertyOptional({
    example: 'Evento de automação',
    description: 'Título opcional do evento para identificação administrativa.',
    maxLength: 150,
  })
  @IsOptional()
  @IsString({
    message: 'O título deve ser um texto.',
  })
  @MaxLength(150, {
    message: 'O título deve ter no máximo 150 caracteres.',
  })
  titulo?: string;

  @ApiPropertyOptional({
    example: 'Evento processado pela camada de automações.',
    description: 'Mensagem opcional associada ao evento processado.',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({
    message: 'A mensagem deve ser um texto.',
  })
  @MaxLength(500, {
    message: 'A mensagem deve ter no máximo 500 caracteres.',
  })
  mensagem?: string;

  @ApiPropertyOptional({
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID opcional do usuário administrativo relacionado ao evento.',
  })
  @IsOptional()
  @IsUUID('4', {
    message: 'O usuarioId deve ser um UUID válido.',
  })
  usuarioId?: string;

  @ApiPropertyOptional({
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
    description:
      'ID opcional do recurso de referência do evento, como cliente, agendamento, pacote ou campanha.',
  })
  @IsOptional()
  @IsUUID('4', {
    message: 'O referenciaId deve ser um UUID válido.',
  })
  referenciaId?: string;

  @ApiPropertyOptional({
    type: 'object',
    description:
      'Dados adicionais opcionais do evento. Pode conter informações contextuais usadas pela automação.',
    example: {
      clienteId: '550e8400-e29b-41d4-a716-446655440000',
      clienteNome: 'Maria Silva',
      telefone: '83999999999',
      origem: 'teste-manual',
    },
    additionalProperties: true,
  })
  @IsOptional()
  @IsObject({
    message: 'Os dados adicionais devem ser um objeto.',
  })
  dados?: Record<string, any>;
}
