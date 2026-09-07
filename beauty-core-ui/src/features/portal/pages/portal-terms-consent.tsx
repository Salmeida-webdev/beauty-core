"use client";

import { useId, useRef, useState, type FormEvent } from "react";

import { portalAssets } from "../assets/portal-assets";
import { PortalAssetImage } from "../components/portal-asset-image";
import { PortalBranding } from "../components/portal-branding";
import { PortalPageContainer } from "../components/portal-page-container";

type PortalTermsConsentProps = {
  onAccept: () => Promise<void>;
  submitLabel?: string;
  errorMessage?: string;
};;

export function PortalTermsConsent({
  onAccept,
  submitLabel = "Aceitar e continuar",
  errorMessage = "Não foi possível registrar o aceite dos termos. Tente novamente.",
}: PortalTermsConsentProps) {
  const checkboxId = useId();
  const termsHeadingId = useId();
  const submittingRef = useRef(false);

  const [accepted, setAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submittingRef.current || success) {
      return;
    }

    if (!accepted) {
      setError("Aceite os termos de uso para continuar.");
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);
    setError(null);

    try {
      await onAccept();
      setSuccess(true);
    } catch {
      submittingRef.current = false;
      setSubmitting(false);
      setError(errorMessage);
    }
  }

  if (success) {
    return (
      <PortalPageContainer>
        <section
          aria-live="polite"
          className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center"
          role="status"
        >
          <div className="order-2 lg:order-1">
            <PortalAssetImage
              alt="Ilustração do primeiro acesso"
              asset={portalAssets.legal.terms}
              className="mx-auto h-auto w-full max-w-md"
              height={520}
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              width={720}
            />
          </div>

          <div className="order-1 space-y-5 lg:order-2">
            <PortalBranding />
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Termos e consentimento
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              Primeiro acesso concluído
            </h1>
            <p className="text-base leading-7 text-muted-foreground">
              Seu aceite foi registrado. Você será direcionado para o Portal.
            </p>
          </div>
        </section>
      </PortalPageContainer>
    );
  }

  return (
    <PortalPageContainer>
      <div
        className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center"
        data-testid="portal-terms-consent"
      >
        <div className="order-2 lg:order-1">
          <PortalAssetImage
            alt="Ilustração do primeiro acesso"
            asset={portalAssets.legal.terms}
            className="mx-auto h-auto w-full max-w-md"
            height={520}
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            width={720}
          />
        </div>

        <div className="order-1 space-y-6 lg:order-2">
          <PortalBranding />

          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Termos e consentimento
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              Primeiro acesso obrigatório
            </h1>
            <p className="text-base leading-7 text-muted-foreground">
              Leia a confirmação abaixo e aceite os termos de uso para liberar
              o acesso ao Portal.
            </p>
          </div>

          <section
            aria-labelledby={termsHeadingId}
            className="space-y-3 rounded-xl border border-border bg-muted/30 p-4 text-sm leading-6 text-foreground"
          >
            <h2
              className="font-semibold"
              id={termsHeadingId}
            >
              Termos de uso
            </h2>
            <p>
              O aceite registra sua concordância com os termos aplicáveis ao
              uso do Portal Cliente.
            </p>
            <p className="text-muted-foreground">
              O backend não fornece versão ou documento de privacidade
              separado para este fluxo.
            </p>
          </section>

          <form
            aria-label="Aceite dos termos de uso"
            className="space-y-5"
            noValidate
            onSubmit={handleSubmit}
          >
            <fieldset className="space-y-3" disabled={submitting}>
              <legend className="sr-only">
                Confirmação obrigatória dos termos de uso
              </legend>

              <label
                className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-4 text-sm leading-6 text-foreground"
                htmlFor={checkboxId}
              >
                <input
                  checked={accepted}
                  className="mt-1 h-4 w-4 shrink-0 accent-primary"
                  id={checkboxId}
                  onChange={(event) => {
                    setAccepted(event.target.checked);
                    setError(null);
                  }}
                  required
                  type="checkbox"
                />
                <span>Li e aceito os termos de uso.</span>
              </label>
            </fieldset>

            {error ? (
              <p
                aria-live="assertive"
                className="text-sm font-medium text-destructive"
                role="alert"
              >
                {error}
              </p>
            ) : null}

            <button
              aria-busy={submitting}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={submitting}
              type="submit"
            >
              {submitting ? "Registrando aceite..." : submitLabel}
            </button>
          </form>
        </div>
      </div>
    </PortalPageContainer>
  );
}
