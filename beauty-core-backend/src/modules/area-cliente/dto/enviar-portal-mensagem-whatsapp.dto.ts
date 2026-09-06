import { TipoMensagemWhatsApp } from "@prisma/client";
import { IsEnum, IsString, MaxLength, MinLength } from "class-validator";

export class EnviarPortalMensagemWhatsAppDto {
  @IsEnum(TipoMensagemWhatsApp)
  tipo: TipoMensagemWhatsApp;

  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  mensagem: string;
}
