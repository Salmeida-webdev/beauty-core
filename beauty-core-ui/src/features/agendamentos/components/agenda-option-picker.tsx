"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { AgendaOption } from "@/features/agendamentos/types/agendamentos-options.types";

type AgendaOptionPickerProps = {
  id: string;
  label: string;
  value?: string;
  options: AgendaOption[];
  searchValue: string;
  onSearchChange: (value: string) => void;
  onChange: (value: string) => void;
  placeholder: string;
  searchPlaceholder: string;
  isLoading?: boolean;
  isFetching?: boolean;
  errorMessage?: string;
  onRetry?: () => void;
  disabled?: boolean;
};

export function AgendaOptionPicker({
  id,
  label,
  value,
  options,
  searchValue,
  onSearchChange,
  onChange,
  placeholder,
  searchPlaceholder,
  isLoading = false,
  isFetching = false,
  errorMessage,
  onRetry,
  disabled = false,
}: AgendaOptionPickerProps) {
  const [open, setOpen] = useState(false);

  const selectedOption = options.find(
    (option) => option.value === value,
  );

  const listboxId = `${id}-options`;

  return (
    <div className="relative min-w-0 space-y-2">
      <label
        className="text-sm font-medium text-foreground"
        htmlFor={`${id}-trigger`}
      >
        {label}
      </label>

      <Button
        id={`${id}-trigger`}
        type="button"
        variant="outline"
        className="w-full justify-between font-normal"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        disabled={disabled}
        onClick={() => {
          setOpen((current) => !current);
        }}
      >
        <span className="truncate">
          {selectedOption?.label ??
            (value
              ? "Item selecionado"
              : placeholder)}
        </span>

        <span aria-hidden="true">
          {open ? "\u25b2" : "\u25bc"}
        </span>
      </Button>

      {open ? (
        <div className="absolute z-50 mt-1 w-full rounded-xl border bg-popover p-2 text-popover-foreground shadow-lg">
          <Input
            value={searchValue}
            aria-label={`${label} - buscar`}
            placeholder={searchPlaceholder}
            disabled={disabled}
            onChange={(event) => {
              onSearchChange(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setOpen(false);
              }
            }}
          />

          <div
            id={listboxId}
            role="listbox"
            aria-label={`${label} - opcoes`}
            className="mt-2 max-h-56 space-y-1 overflow-y-auto"
          >
            {isLoading || isFetching ? (
              <p className="px-2 py-3 text-sm text-muted-foreground">
                {"Carregando op\u00e7\u00f5es..."}
              </p>
            ) : null}

            {!isLoading &&
            !isFetching &&
            errorMessage ? (
              <div className="space-y-2 px-2 py-3">
                <p className="text-sm text-destructive">
                  {errorMessage}
                </p>

                {onRetry ? (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={onRetry}
                  >
                    Tentar novamente
                  </Button>
                ) : null}
              </div>
            ) : null}

            {!isLoading &&
            !isFetching &&
            !errorMessage &&
            options.length === 0 ? (
              <p className="px-2 py-3 text-sm text-muted-foreground">
                {"Nenhuma op\u00e7\u00e3o encontrada."}
              </p>
            ) : null}

            {!isLoading &&
            !isFetching &&
            !errorMessage
              ? options.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={
                      option.value === value
                    }
                    className="flex w-full flex-col rounded-lg px-3 py-2 text-left hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                  >
                    <span className="text-sm font-medium">
                      {option.label}
                    </span>

                    {option.description ? (
                      <span className="text-xs text-muted-foreground">
                        {option.description}
                      </span>
                    ) : null}
                  </button>
                ))
              : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}