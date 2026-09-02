import type { AdminRole } from "@/constants/roles";
import { canAccessArquivos } from "@/features/arquivos/permissions/arquivos-permissions";

export function canRunArquivosQueries(
  authStatus: string,
  role: AdminRole | null | undefined,
): boolean {
  return authStatus === "authenticated" && canAccessArquivos(role);
}
