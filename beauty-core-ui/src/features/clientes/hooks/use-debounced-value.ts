"use client";

import {
  useEffect,
  useState,
} from "react";

export const CLIENTES_SEARCH_DEBOUNCE_MS =
  350;

export function useDebouncedValue<T>(
  value: T,
  delayMs: number = CLIENTES_SEARCH_DEBOUNCE_MS,
): T {
  const [
    debouncedValue,
    setDebouncedValue,
  ] = useState(value);

  useEffect(() => {
    const timeoutId = window.setTimeout(
      () => {
        setDebouncedValue(value);
      },
      delayMs,
    );

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    delayMs,
    value,
  ]);

  return debouncedValue;
}
