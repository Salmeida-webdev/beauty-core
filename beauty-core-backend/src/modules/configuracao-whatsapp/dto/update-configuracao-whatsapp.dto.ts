import { PartialType } from '@nestjs/swagger';

import { CreateConfiguracaoWhatsAppDto } from './create-configuracao-whatsapp.dto';

export class UpdateConfiguracaoWhatsAppDto extends PartialType(
  CreateConfiguracaoWhatsAppDto,
) {}
