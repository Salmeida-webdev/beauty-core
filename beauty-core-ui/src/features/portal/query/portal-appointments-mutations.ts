"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { portalClientQueryKeys } from "./portal-client-query-keys";
import {
  portalAppointmentsMutationsApi,
  type CreatePortalAppointmentInput,
  type ReschedulePortalAppointmentInput,
} from "../services/portal-appointments-mutations-api";

export function useCreatePortalAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreatePortalAppointmentInput) =>
      portalAppointmentsMutationsApi.create(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: portalClientQueryKeys.all(),
      });
    },
  });
}

export function useReschedulePortalAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      input,
    }: {
      id: string;
      input: ReschedulePortalAppointmentInput;
    }) => portalAppointmentsMutationsApi.reschedule(id, input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: portalClientQueryKeys.all(),
      });
    },
  });
}

export function useCancelPortalAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      portalAppointmentsMutationsApi.cancel(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: portalClientQueryKeys.all(),
      });
    },
  });
}
