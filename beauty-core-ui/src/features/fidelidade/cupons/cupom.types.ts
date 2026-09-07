import { z } from "zod";

import { cuponsSchema } from "../schemas/fidelidade.schemas";

export type Cupom = z.infer<
  typeof cuponsSchema
>[number];
