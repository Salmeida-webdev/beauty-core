import { z } from "zod";

import { beneficiosSchema } from "../schemas/fidelidade.schemas";

export type Beneficio = z.infer<
  typeof beneficiosSchema
>[number];
