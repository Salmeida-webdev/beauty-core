"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTenant } from "@/providers/tenant-provider";

function subscribeToClient() {
  return () => undefined;
}

export function ThemeToggle() {
  const mounted = useSyncExternalStore(
    subscribeToClient,
    () => true,
    () => false,
  );

  const { resolvedTheme, setTheme } = useTheme();
  const { tenant } = useTenant();

  if (!tenant.settings.allowDarkMode) {
    return null;
  }

  const isDark = resolvedTheme === "dark";
  const accessibleLabel = mounted
    ? isDark
      ? "Ativar tema claro"
      : "Ativar tema escuro"
    : "Alternar tema";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={!mounted}
          aria-label={accessibleLabel}
          onClick={() => {
            setTheme(isDark ? "light" : "dark");
          }}
        >
          {mounted && isDark ? (
            <Sun aria-hidden="true" />
          ) : (
            <Moon aria-hidden="true" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={8}>
        {accessibleLabel}
      </TooltipContent>
    </Tooltip>
  );
}
