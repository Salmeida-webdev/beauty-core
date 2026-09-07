"use client";

import { useState } from "react";
import {
  Eye,
  EyeOff,
  LoaderCircle,
  LogIn,
} from "lucide-react";

import {
  FormField,
} from "@/components/forms/form-foundation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLoginForm } from "@/features/auth/forms/use-login-form";
import {
  loginFormValuesToRequest,
  type LoginFormValues,
} from "@/features/auth/schemas/login.schema";
import {
  authenticateAdmin,
} from "@/features/auth/services/auth-session";
import { normalizeApiError } from "@/services/api/normalize-api-error";

export function AdminLoginForm() {
  const [showPassword, setShowPassword] =
    useState(false);

  const [serverError, setServerError] =
    useState<string | null>(null);

  const form = useLoginForm();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = form;

  async function onSubmit(
    values: LoginFormValues,
  ) {
    setServerError(null);

    try {
      await authenticateAdmin(
        loginFormValuesToRequest(values),
      );
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        error.message.includes(
          "não possui acesso ao painel administrativo",
        )
      ) {
        setServerError(
          "Este usuário não possui acesso ao painel administrativo.",
        );

        return;
      }

      const normalizedError =
        normalizeApiError(error);

      if (
        normalizedError.statusCode === 401
      ) {
        setServerError(
          "E-mail ou senha inválidos.",
        );

        return;
      }

      if (
        normalizedError.statusCode === 429
      ) {
        setServerError(
          "Muitas tentativas de login. Aguarde alguns instantes e tente novamente.",
        );

        return;
      }

      if (normalizedError.isNetworkError) {
        setServerError(
          "Não foi possível conectar ao servidor. Verifique sua conexão.",
        );

        return;
      }

      setServerError(
        normalizedError.message,
      );
    }
  }

  const emailErrorId = errors.email
    ? "login-email-error"
    : undefined;

  const passwordErrorId = errors.senha
    ? "login-password-error"
    : undefined;

  return (
    <form
      noValidate
      aria-label="Formulário de acesso administrativo"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {serverError && (
        <div
          role="alert"
          aria-live="assertive"
          className="rounded-lg border border-danger/25 bg-danger/10 px-3 py-3 text-sm font-medium text-danger"
        >
          {serverError}
        </div>
      )}

      <FormField
        id="login-email"
        label="E-mail"
        required
        error={errors.email?.message}
      >
        <Input
          id="login-email"
          type="email"
          inputMode="email"
          autoComplete="username"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          placeholder="seu@email.com"
          aria-invalid={
            errors.email
              ? "true"
              : undefined
          }
          aria-describedby={emailErrorId}
          disabled={isSubmitting}
          {...register("email")}
        />
      </FormField>

      <FormField
        id="login-password"
        label="Senha"
        required
        error={errors.senha?.message}
      >
        <div className="relative">
          <Input
            id="login-password"
            type={
              showPassword
                ? "text"
                : "password"
            }
            autoComplete="current-password"
            placeholder="Digite sua senha"
            className="pr-11"
            aria-invalid={
              errors.senha
                ? "true"
                : undefined
            }
            aria-describedby={
              passwordErrorId
            }
            disabled={isSubmitting}
            {...register("senha")}
          />

          <button
            type="button"
            className="absolute right-1 top-1/2 inline-flex size-6 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={
              showPassword
                ? "Ocultar senha"
                : "Mostrar senha"
            }
            aria-pressed={showPassword}
            disabled={isSubmitting}
            onClick={() => {
              setShowPassword(
                (current) => !current,
              );
            }}
          >
            {showPassword ? (
              <EyeOff
                aria-hidden="true"
                className="size-4"
              />
            ) : (
              <Eye
                aria-hidden="true"
                className="size-4"
              />
            )}
          </button>
        </div>
      </FormField>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? (
          <LoaderCircle
            aria-hidden="true"
            className="size-4 animate-spin"
          />
        ) : (
          <LogIn
            aria-hidden="true"
            className="size-4"
          />
        )}

        <span>
          {isSubmitting
            ? "Entrando..."
            : "Entrar"}
        </span>
      </Button>
    </form>
  );
}
