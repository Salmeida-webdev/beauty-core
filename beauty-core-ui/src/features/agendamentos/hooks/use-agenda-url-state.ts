"use client";

import {
  useCallback,
  useMemo,
} from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import type { AgendaUrlState } from "@/features/agendamentos/types/agendamentos-types";
import {
  buildAgendaSearchParams,
  parseAgendaUrlState,
} from "@/features/agendamentos/utils/agenda-url";

export function useAgendaUrlState() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const state = useMemo(
    () =>
      parseAgendaUrlState(
        searchParams,
      ),
    [searchParams],
  );

  const replaceState = useCallback(
    (nextState: AgendaUrlState) => {
      const params =
        buildAgendaSearchParams(
          nextState,
        );

      const query =
        params.toString();

      router.replace(
        query
          ? `${pathname}?${query}`
          : pathname,
        {
          scroll: false,
        },
      );
    },
    [pathname, router],
  );

  const updateState = useCallback(
    (
      patch: Partial<AgendaUrlState>,
    ) => {
      replaceState({
        ...state,
        ...patch,
      });
    },
    [replaceState, state],
  );

  return {
    state,
    replaceState,
    updateState,
  };
}