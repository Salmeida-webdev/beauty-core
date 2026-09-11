import { PartialType } from '@nestjs/swagger';

import { CreateCampanhaWhatsAppDto } from './create-campanha-whatsapp.dto';

export class UpdateCampanhaWhatsAppDto extends PartialType(
  CreateCampanhaWhatsAppDto,
) {}
