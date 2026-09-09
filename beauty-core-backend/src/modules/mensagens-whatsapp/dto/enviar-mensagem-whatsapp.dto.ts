import { ApiExtraModels } from '@nestjs/swagger';

import { CreateMensagemWhatsAppDto } from './create-mensagem-whatsapp.dto';

@ApiExtraModels(CreateMensagemWhatsAppDto)
export class EnviarMensagemWhatsAppDto extends CreateMensagemWhatsAppDto {}
