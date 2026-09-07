import {
  act,
  renderHook,
} from "@testing-library/react";
import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  CLIENTES_SEARCH_DEBOUNCE_MS,
  useDebouncedValue,
} from "@/features/clientes/hooks/use-debounced-value";

afterEach(() => {
  vi.useRealTimers();
});

describe("useDebouncedValue", () => {
  it("mantém o valor inicial imediatamente", () => {
    const { result } = renderHook(
      () =>
        useDebouncedValue(
          "Maria",
        ),
    );

    expect(result.current).toBe(
      "Maria",
    );
  });

  it("aguarda o debounce antes de publicar a mudança", () => {
    vi.useFakeTimers();

    const { result, rerender } =
      renderHook(
        ({ value }) =>
          useDebouncedValue(value),
        {
          initialProps: {
            value: "Maria",
          },
        },
      );

    rerender({
      value: "Mariana",
    });

    expect(result.current).toBe(
      "Maria",
    );

    act(() => {
      vi.advanceTimersByTime(
        CLIENTES_SEARCH_DEBOUNCE_MS - 1,
      );
    });

    expect(result.current).toBe(
      "Maria",
    );

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(result.current).toBe(
      "Mariana",
    );
  });

  it("cancela atualização anterior quando o valor muda novamente", () => {
    vi.useFakeTimers();

    const { result, rerender } =
      renderHook(
        ({ value }) =>
          useDebouncedValue(value),
        {
          initialProps: {
            value: "M",
          },
        },
      );

    rerender({
      value: "Ma",
    });

    act(() => {
      vi.advanceTimersByTime(200);
    });

    rerender({
      value: "Maria",
    });

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current).toBe(
      "M",
    );

    act(() => {
      vi.advanceTimersByTime(
        CLIENTES_SEARCH_DEBOUNCE_MS - 200,
      );
    });

    expect(result.current).toBe(
      "Maria",
    );
  });
});
