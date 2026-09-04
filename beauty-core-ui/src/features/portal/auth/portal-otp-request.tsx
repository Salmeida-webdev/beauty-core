"use client";

import type { FormEvent } from "react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTenant } from "@/providers/tenant-provider";

import { portalAuthApi } from "./portal-auth-api";

const phoneHintId = "portal-otp-phone-hint";
const phoneErrorId = "portal-otp-phone-error";

type PortalOtpRequestFormProps = {
  onRequested?: (telefone: string) => void;
};

export function normalizePortalPhone(value: string): string {
  return value.trim().replace(/\D/g, "");
}

export function validatePortalPhone(value: string): string | null {
  const normalizedPhone = normalizePortalPhone(value);

  if (!normalizedPhone) {
    return "Informe seu telefone com DDD.";
  }

  if (normalizedPhone.length < 10 || normalizedPhone.length > 15) {
    return "Informe um telefone válido com DDD.";
  }

  return null;
}

function getHttpStatus(error: unknown): number | undefined {
  if (typeof error !== "object" || error === null) {
    return undefined;
  }

  const response = (error as { response?: unknown }).response;

  if (typeof response !== "object" || response === null) {
    return undefined;
  }

  const status = (response as { status?: unknown }).status;

  return typeof status === "number" ? status : undefined;
}

export function getPortalOtpRequestErrorMessage(error: unknown): string {
  switch (getHttpStatus(error)) {
    case 400:
      return "Confira o telefone informado e tente novamente.";
    case 403:
      return "O acesso ao portal está indisponível para esta empresa.";
    case 404:
      return "Não foi possível concluir a solicitação com os dados informados.";
    case 429:
      return "Muitas solicitações. Aguarde alguns instantes antes de tentar novamente.";
    default:
      return "Não foi possível solicitar o código agora. Tente novamente.";
  }
}

export function PortalOtpRequestForm({
  onRequested,
}: PortalOtpRequestFormProps) {
  const { tenant } = useTenant();
  const [phone, setPhone] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const submittingRef = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submittingRef.current) {
      return;
    }

    const validationError = validatePortalPhone(phone);

    if (validationError) {
      setError(validationError);
      setSuccess(null);
      return;
    }

    const normalizedPhone = normalizePortalPhone(phone);

    submittingRef.current = true;
    setPending(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await portalAuthApi.requestOtp({
        slug: tenant.slug,
        telefone: normalizedPhone,
      });

      setSuccess(
        response.message?.trim() ||
          "Código solicitado. Verifique seu telefone.",
      );

      onRequested?.(normalizedPhone);
    } catch (requestError) {
      setError(getPortalOtpRequestErrorMessage(requestError));
    } finally {
      submittingRef.current = false;
      setPending(false);
    }
  }

  const describedBy = error
    ? `${phoneHintId} ${phoneErrorId}`
    : phoneHintId;

  return (
    <section
      aria-labelledby="portal-otp-request-heading"
      className="space-y-5 border-t border-border/80 pt-6"
    >
      <div className="space-y-2">
        <h2
          className="text-xl font-semibold tracking-tight"
          id="portal-otp-request-heading"
        >
          Acesse com seu telefone
        </h2>

        <p className="text-sm leading-6 text-muted-foreground">
          Enviaremos um código de acesso para continuar.
        </p>
      </div>

      <form
        aria-busy={pending}
        aria-label="Solicitar código de acesso"
        className="space-y-5"
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="space-y-2">
          <label
            className="text-sm font-medium text-foreground"
            htmlFor="portal-otp-phone"
          >
            Telefone com DDD
          </label>

          <Input
            aria-describedby={describedBy}
            aria-invalid={Boolean(error)}
            autoComplete="tel"
            disabled={pending}
            id="portal-otp-phone"
            inputMode="tel"
            maxLength={20}
            name="telefone"
            placeholder="(83) 99999-9999"
            required
            type="tel"
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
              setError(null);
              setSuccess(null);
            }}
          />

          <p
            className="text-xs leading-5 text-muted-foreground"
            id={phoneHintId}
          >
            Informe o número usado no cadastro da empresa.
          </p>

          {error ? (
            <p
              className="text-sm text-destructive"
              id={phoneErrorId}
              role="alert"
            >
              {error}
            </p>
          ) : null}
        </div>

        <Button
          className="min-h-11 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
          disabled={pending}
          type="submit"
        >
          {pending ? "Solicitando..." : "Receber código"}
        </Button>

        {success ? (
          <p
            aria-live="polite"
            className="text-sm text-emerald-700 dark:text-emerald-400"
            role="status"
          >
            {success}
          </p>
        ) : null}
      </form>
    </section>
  );
}
