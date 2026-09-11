import {
  AcaoAuditoria,
  StatusAuditoria,
  TipoUsuarioAuditoria,
} from '@prisma/client';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

import { PaginationDto } from '../../../shared/dto/pagination.dto';

export class FiltrosAuditoriaDto extends PaginationDto {
  @ApiPropertyOptional({
    example: 'agendamentos',
    description:
      'Módulo do sistema usado como filtro da auditoria. Exemplo: auth, clientes, agendamentos, financeiro, whatsapp, scheduler ou arquivos.',
  })
  @IsOptional()
  @IsString({
    message: 'O módulo deve ser um texto.',
  })
  modulo?: string;

  @ApiPropertyOptional({
    enum: AcaoAuditoria,
    example: Object.values(AcaoAuditoria)[0],
    description:
      'Ação registrada na auditoria. Os valores disponíveis vêm do enum AcaoAuditoria do Prisma.',
  })
  @IsOptional()
  @IsEnum(AcaoAuditoria, {
    message: 'A ação de auditoria informada é inválida.',
  })
  acao?: AcaoAuditoria;

  @ApiPropertyOptional({
    enum: StatusAuditoria,
    example: Object.values(StatusAuditoria)[0],
    description:
      'Status do registro de auditoria. Os valores disponíveis vêm do enum StatusAuditoria do Prisma.',
  })
  @IsOptional()
  @IsEnum(StatusAuditoria, {
    message: 'O status de auditoria informado é inválido.',
  })
  status?: StatusAuditoria;

  @ApiPropertyOptional({
    enum: TipoUsuarioAuditoria,
    example: Object.values(TipoUsuarioAuditoria)[0],
    description:
      'Tipo de usuário relacionado ao registro de auditoria. Os valores disponíveis vêm do enum TipoUsuarioAuditoria do Prisma.',
  })
  @IsOptional()
  @IsEnum(TipoUsuarioAuditoria, {
    message: 'O tipo de usuário da auditoria informado é inválido.',
  })
  tipoUsuario?: TipoUsuarioAuditoria;

  @ApiPropertyOptional({
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
    description:
      'ID opcional do usuário usado para filtrar os registros de auditoria.',
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
      'ID opcional do cliente usado para filtrar os registros de auditoria.',
  })
  @IsOptional()
  @IsUUID('4', {
    message: 'O clienteId deve ser um UUID válido.',
  })
  clienteId?: string;

  @ApiPropertyOptional({
    example: 'agendamento',
    description:
      'Nome do recurso auditado. Exemplo: cliente, usuario, agendamento, financeiro, pacote, arquivo ou mensagem-whatsapp.',
  })
  @IsOptional()
  @IsString({
    message: 'O recurso deve ser um texto.',
  })
  recurso?: string;

  @ApiPropertyOptional({
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
    description:
      'ID opcional do recurso auditado usado para filtrar os registros de auditoria.',
  })
  @IsOptional()
  @IsUUID('4', {
    message: 'O recursoId deve ser um UUID válido.',
  })
  recursoId?: string;

  @ApiPropertyOptional({
    example: '127.0.0.1',
    description:
      'Endereço IP opcional usado para filtrar registros de auditoria por origem da requisição.',
  })
  @IsOptional()
  @IsString({
    message: 'O IP deve ser um texto.',
  })
  ip?: string;

  @ApiPropertyOptional({
    example: '2026-06-01',
    description:
      'Data inicial opcional para filtrar os registros de auditoria. Pode ser informada em formato de data ou ISO string.',
  })
  @IsOptional()
  @IsString({
    message: 'A data inicial deve ser um texto.',
  })
  dataInicio?: string;

  @ApiPropertyOptional({
    example: '2026-06-30',
    description:
      'Data final opcional para filtrar os registros de auditoria. Pode ser informada em formato de data ou ISO string.',
  })
  @IsOptional()
  @IsString({
    message: 'A data final deve ser um texto.',
  })
  dataFim?: string;
}
