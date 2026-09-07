import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendPortalWhatsappMessage } from "../services/portal-messages-send-api";

export function useSendPortalWhatsappMessageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendPortalWhatsappMessage,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["portal", "mensagens-whatsapp"],
      });
    },
  });
}
