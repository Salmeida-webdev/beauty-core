import type { Metadata } from "next";
import Image from "next/image";

import {
  AdminLoginBoundary,
} from "@/features/auth/components/admin-login-boundary";
import {
  AdminLoginForm,
} from "@/features/auth/components/admin-login-form";
import {
  BeautyCoreAuthLogo,
} from "@/features/auth/components/beauty-core-auth-logo";
import {
  normalizeAdminLoginReason,
} from "@/features/auth/navigation/admin-return-to";

export const metadata: Metadata = {
  title: "Acesso administrativo | Beauty Core",
  description: "Acesso seguro ao painel administrativo Beauty Core.",
};

type LoginPageProps = {
  searchParams: Promise<{
    reason?: string | string[];
  }>;
};

export default async function LoginPage({
  searchParams,
}: LoginPageProps) {
  const params = await searchParams;

  const rawReason =
    Array.isArray(params.reason)
      ? params.reason[0]
      : params.reason;

  const loginReason =
    normalizeAdminLoginReason(
      rawReason,
    );

  return (
    <AdminLoginBoundary>
      <main
        aria-labelledby="login-title"
        className="grid min-h-dvh bg-background lg:grid-cols-[minmax(0,1.08fr)_minmax(26rem,0.92fr)]"
      >
        <section
          aria-label="Apresentação Beauty Core"
          className="relative hidden min-h-dvh overflow-hidden bg-slate-950 lg:flex"
        >
          <Image
            src="/images/auth/beauty-core-login-background.webp"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 54vw, 0px"
            className="object-cover object-center opacity-80"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-950/65 to-primary/35" />

          <div className="relative z-10 flex min-h-dvh w-full flex-col justify-between p-10 xl:p-16">
            <BeautyCoreAuthLogo
              tone="inverse"
              width={220}
              height={58}
              priority
              className="h-auto w-52"
            />

            <div className="mt-auto max-w-xl pt-16">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                Beauty Core 1.0
              </p>

              <h2 className="mt-4 max-w-lg text-4xl font-semibold tracking-tight text-white xl:text-5xl">
                Gestão inteligente para negócios de beleza.
              </h2>

              <p className="mt-5 max-w-lg text-base leading-7 text-white/75">
                Um ambiente administrativo seguro para organizar operações,
                equipes, clientes e resultados em um único lugar.
              </p>

              <div className="relative mt-10 h-64 max-w-xl">
                <Image
                  src="/images/auth/beauty-core-login-illustration.webp"
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 34rem, 42vw"
                  className="object-contain object-left-bottom"
                />
              </div>
            </div>

            <p className="pt-8 text-xs text-white/55">
              Plataforma administrativa Beauty Core.
            </p>
          </div>
        </section>

        <section className="flex min-h-dvh items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            <div className="mb-12 lg:hidden">
              <BeautyCoreAuthLogo
                tone="adaptive"
                width={220}
                height={58}
                priority
                className="h-auto w-48"
              />
            </div>

            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                Acesso administrativo
              </p>

              <h1
                id="login-title"
                className="mt-3 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl"
              >
                Acesse sua conta
              </h1>

              <p className="mt-3 text-body-small leading-6 text-text-muted">
                Entre com suas credenciais para continuar.
              </p>
            </div>

            {loginReason ===
              "session-expired" && (
              <div
                role="status"
                aria-live="polite"
                className="mb-5 rounded-lg border border-warning/25 bg-warning/10 px-4 py-3"
              >
                <p className="text-sm font-semibold text-text-primary">
                  Sua sessão expirou
                </p>

                <p className="mt-1 text-body-small leading-6 text-text-muted">
                  Entre novamente para continuar de onde parou.
                </p>
              </div>
            )}

            <AdminLoginForm />

            <p className="mt-8 text-center text-caption text-text-muted">
              Beauty Core 1.0 · Ambiente administrativo seguro
            </p>
          </div>
        </section>
      </main>
    </AdminLoginBoundary>
  );
}
