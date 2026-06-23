import { PartialType } from '@nestjs/swagger';

import { CreateTemplateWhatsAppDto } from './create-template-whatsapp.dto';

export class UpdateTemplateWhatsAppDto extends PartialType(
  CreateTemplateWhatsAppDto,
) {}