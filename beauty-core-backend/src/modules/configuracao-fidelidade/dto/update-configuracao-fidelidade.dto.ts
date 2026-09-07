import { PartialType } from '@nestjs/swagger';

import { CreateConfiguracaoFidelidadeDto } from './create-configuracao-fidelidade.dto';

export class UpdateConfiguracaoFidelidadeDto extends PartialType(
  CreateConfiguracaoFidelidadeDto,
) {}