import { useMutation, useQueryClient } from "@tanstack/react-query";
import { consumePortalPackage } from "../services/portal-packages-api";
import { portalPackagesQueryKey } from "./portal-packages-query";

export function useConsumePortalPackageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (pacoteId: string) => consumePortalPackage(pacoteId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: portalPackagesQueryKey,
      });
    },
  });
}
