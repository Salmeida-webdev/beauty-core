import type {
  CreateUsuarioPayload,
  UpdateUsuarioPayload,
  UsuarioAdministrativo,
  UsuariosListParams,
  UsuariosPaginationMeta,
} from "@/features/usuarios/types/usuarios.types";

export type Profissional = Omit<UsuarioAdministrativo, "role"> & {
  role: "PROFISSIONAL";
};

export type CreateProfissionalPayload = Omit<CreateUsuarioPayload, "role">;

export type UpdateProfissionalPayload = Omit<UpdateUsuarioPayload, "role">;

export type ProfissionaisListParams = Omit<UsuariosListParams, "role">;

export type ProfissionaisListResponse = {
  data: Profissional[];
  meta: UsuariosPaginationMeta;
};
