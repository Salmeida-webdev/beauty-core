import axios from "axios";
import { ZodError } from "zod";

export const DASHBOARD_STALE_TIME = {
  summary: 60_000,
  operational: 60_000,
  rankings: 120_000,
  snapshot: 120_000,
} as const;

export function shouldRetryDashboardQuery(
  failureCount: number,
  error: unknown,
): boolean {
  if (error instanceof ZodError) {
    return false;
  }

  if (axios.isAxiosError(error)) {
    const status = error.response?.status;

    if (
      status &&
      status >= 400 &&
      status < 500 &&
      status !== 408 &&
      status !== 429
    ) {
      return false;
    }
  }

  return failureCount < 1;
}
