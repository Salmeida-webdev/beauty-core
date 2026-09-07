import type { QueryClient } from "@tanstack/react-query";

export function clearPortalPrivateQueries(queryClient: QueryClient) {
  queryClient.removeQueries({
    predicate: ({ queryKey }) => queryKey[0] === "portal",
  });
}
