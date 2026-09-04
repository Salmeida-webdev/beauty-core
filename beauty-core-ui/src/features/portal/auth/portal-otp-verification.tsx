"use client";

import type { FormEvent } from "react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTenant } from "@/providers/tenant-provider";

import { usePortalAuth } from "./portal-auth-context";
import { portalAuthApi } from "./portal-auth-api";
import { startPortalSession } from "./portal-auth-session";

const codeHintId = "portal-otp-code-hint";
const codeErrorId = "portal-otp-code-error";

type PortalOtpVerificationFormProps = {
  telefone: string;
  onRestart: () => void;
};

export function normalizePortalOtpCode(value: string): string {
  return value.replace(/\D/g, "").slice(0, 6);
}

export function validatePortalOtpCode(value: string): string | null {
  const normalizedCode = normalizePortalOtpCode(value);

  if (!normalizedCode) {
    return "Informe o código recebido.";
  }

  if (normalizedCode.length !== 6) {
    return "O código deve ter 6 dígitos.";
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

export function getPortalOtpVerificationErrorMessage(
  error: unknown,
): string {
  switch (getHttpStatus(error)) {
    case 400:
    case 401:
      return "O código informado é inválido ou expirou. Solicite um novo código.";
    case 403:
      return "O acesso ao portal está indisponível para esta empresa.";
    case 404:
      return "Não foi possível validar o código com os dados informados.";
    case 429:
      return "Muitas solicitações. Aguarde alguns instantes antes de tentar novamente.";
    default:
      return "Não foi possível validar o código agora. Tente novamente.";
  }
}

function getPortalOtpResendErrorMessage(error: unknown): string {
  switch (getHttpStatus(error)) {
    case 400:
      return "Confira os dados informados e tente novamente.";
    case 403:
      return "O acesso ao portal está indisponível para esta empresa.";
    case 404:
      return "Não foi possível solicitar um novo código.";
    case 429:
      return "Muitas solicitações. Aguarde alguns instantes antes de tentar novamente.";
    default:
      return "Não foi possível solicitar um novo código agora. Tente novamente.";
  }
}

export function PortalOtpVerificationForm({
  telefone,
  onRestart,
}: PortalOtpVerificationFormProps) {
  const { tenant } = useTenant();
  const { restoreSession } = usePortalAuth();

  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const verifyingRef = useRef(false);
  const resendingRef = useRef(false);

  async function handleVerify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (verifyingRef.current || resendingRef.current) {
      return;
    }

    const validationError = validatePortalOtpCode(code);

    if (validationError) {
      setError(validationError);
      setFeedback(null);
      setSuccess(null);
      return;
    }

    const normalizedCode = normalizePortalOtpCode(code);

    verifyingRef.current = true;
    setVerifying(true);
    setError(null);
    setFeedback(null);
    setSuccess(null);

    try {
      const response = await portalAuthApi.verifyOtp({
        slug: tenant.slug,
        telefone,
        codigo: normalizedCode,
      });

      await startPortalSession(response);
      await restoreSession();

      setSuccess("Acesso confirmado.");
    } catch (verificationError) {
      setError(
        getPortalOtpVerificationErrorMessage(verificationError),
      );
    } finally {
      verifyingRef.current = false;
      setVerifying(false);
    }
  }

  async function handleResend() {
    if (verifyingRef.current || resendingRef.current) {
      return;
    }

    resendingRef.current = true;
    setResending(true);
    setError(null);
    setFeedback(null);
    setSuccess(null);

    try {
      const response = await portalAuthApi.requestOtp({
        slug: tenant.slug,
        telefone,
      });

      setCode("");
      setFeedback(
        response.message?.trim() ||
          "Novo código solicitado. Verifique seu telefone.",
      );
    } catch (resendError) {
      setError(getPortalOtpResendErrorMessage(resendError));
    } finally {
      resendingRef.current = false;
      setResending(false);
    }
  }

  const isBusy = verifying || resending;
  const describedBy = error
    ? `${codeHintId} ${codeErrorId}`
    : codeHintId;

  return (
    <section
      aria-labelledby="portal-otp-verification-heading"
      className="space-y-5 border-t border-border/80 pt-6"
    >
      <div className="space-y-2">
        <h2
          className="text-xl font-semibold tracking-tight"
          id="portal-otp-verification-heading"
        >
          Digite o código recebido
        </h2>

        <p className="text-sm leading-6 text-muted-foreground">
          Informe os 6 dígitos para confirmar seu acesso ao portal.
        </p>
      </div>

      <form
        aria-busy={isBusy}
        aria-label="Verificar código de acesso"
        className="space-y-5"
        noValidate
        onSubmit={handleVerify}
      >
        <div className="space-y-2">
          <label
            className="text-sm font-medium text-foreground"
            htmlFor="portal-otp-code"
          >
            Código de acesso
          </label>

          <Input
            aria-describedby={describedBy}
            aria-invalid={Boolean(error)}
            autoComplete="one-time-code"
            disabled={isBusy}
            id="portal-otp-code"
            inputMode="numeric"
            maxLength={6}
            name="codigo"
            pattern="[0-9]*"
            required
            type="text"
            value={code}
            onChange={(event) => {
              setCode(normalizePortalOtpCode(event.target.value));
              setError(null);
              setFeedback(null);
              setSuccess(null);
            }}
          />

          <p
            className="text-xs leading-5 text-muted-foreground"
            id={codeHintId}
          >
            Você pode colar o código ou usar o preenchimento automático do aparelho.
          </p>

          {error ? (
            <p
              className="text-sm text-destructive"
              id={codeErrorId}
              role="alert"
            >
              {error}
            </p>
          ) : null}
        </div>

        <Button
          className="min-h-11 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
          disabled={isBusy}
          type="submit"
        >
          {verifying ? "Verificando..." : "Verificar código"}
        </Button>

        <Button
          className="min-h-11 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
          disabled={isBusy}
          type="button"
          onClick={handleResend}
        >
          {resending ? "Solicitando novo código..." : "Enviar novo código"}
        </Button>

        {feedback ? (
          <p
            aria-live="polite"
            className="text-sm text-muted-foreground"
            role="status"
          >
            {feedback}
          </p>
        ) : null}

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

      <Button
        className="min-h-11 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
        disabled={isBusy}
        type="button"
        onClick={onRestart}
      >
        Usar outro telefone
      </Button>
    </section>
  );
}
