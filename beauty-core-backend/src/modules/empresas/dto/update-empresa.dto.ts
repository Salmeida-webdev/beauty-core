import { ApiPropertyOptional } from '@nestjs/swagger';
import { PlanoEmpresa } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsHexColor,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateEmpresaDto {
  @ApiPropertyOptional({
    example: 'Clínica Beauty Core Premium',
    description: 'Nome comercial da empresa/clínica.',
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  nome?: string;

  @ApiPropertyOptional({
    example: 'clinica-beauty-core',
    description:
      'Slug público e único da empresa. Alterar este campo pode impactar portal, frontend white-label e links públicos.',
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'O slug deve conter apenas letras minúsculas, números e hífens, sem espaços.',
  })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  slug?: string;

  @ApiPropertyOptional({
    example: '83999999999',
    description: 'Telefone/WhatsApp principal da empresa.',
  })
  @IsOptional()
  @IsString()
  @Length(8, 20)
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  telefone?: string;

  @ApiPropertyOptional({
    example: 'contato@beautycore.com',
    description: 'E-mail principal da empresa.',
  })
  @IsOptional()
  @IsEmail()
  @MaxLength(120)
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  email?: string;

  @ApiPropertyOptional({
    example: 'https://cdn.beautycore.com/logos/clinica.png',
    description: 'URL ou caminho da logo da empresa.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  logo?: string;

  @ApiPropertyOptional({
    example: '#111827',
    description: 'Cor primária da identidade visual da empresa em hexadecimal.',
  })
  @IsOptional()
  @IsHexColor()
  corPrimaria?: string;

  @ApiPropertyOptional({
    example: 'clinicaexemplo.com.br',
    description: 'Domínio customizado da empresa, sem protocolo http/https.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(180)
  @Matches(/^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/, {
    message: 'O domínio deve ser válido e informado sem http:// ou https://.',
  })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string'
      ? value
          .trim()
          .toLowerCase()
          .replace(/^https?:\/\//, '')
          .replace(/\/$/, '')
      : value,
  )
  dominio?: string;

  @ApiPropertyOptional({
    enum: PlanoEmpresa,
    example: PlanoEmpresa.PREMIUM,
    description:
      'Plano contratado pela empresa. Campo sensível, permitido apenas para SUPER_ADMIN.',
  })
  @IsOptional()
  @IsEnum(PlanoEmpresa)
  plano?: PlanoEmpresa;
}
