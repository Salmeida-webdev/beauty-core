import type { Job } from 'bullmq';

type TraceableJobData = {
  requestId?: unknown;
  correlationId?: unknown;
  metadata?: unknown;
};

export type QueueTrace = {
  requestId: string | null;
  correlationId: string | null;
};

function toNullableString(value: unknown): string | null {
  if (typeof value === 'string' && value.trim().length > 0) {
    return value.trim();
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value);
  }

  return null;
}

function toRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {};
  }

  return value as Record<string, unknown>;
}

export function getQueueTrace(
  job?: Pick<Job, 'data'> | { data?: unknown } | null,
): QueueTrace {
  const data = toRecord(job?.data) as TraceableJobData;
  const metadata = toRecord(data.metadata);

  const requestId =
    toNullableString(data.requestId) ?? toNullableString(metadata.requestId);

  const correlationId =
    toNullableString(data.correlationId) ??
    toNullableString(metadata.correlationId) ??
    requestId;

  return {
    requestId,
    correlationId,
  };
}

export function getQueueTraceMetadata(
  job?: Pick<Job, 'data'> | { data?: unknown } | null,
): QueueTrace {
  return getQueueTrace(job);
}

export function formatQueueTrace(
  job?: Pick<Job, 'data'> | { data?: unknown } | null,
): string {
  const trace = getQueueTrace(job);

  return `requestId=${trace.requestId ?? '-'} correlationId=${
    trace.correlationId ?? '-'
  }`;
}
