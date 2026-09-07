"use client";

import Link from "next/link";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { arquivosKeys } from "@/features/arquivos/queries/arquivos-keys";
import { getArquivoUploadErrorMessage } from "@/features/arquivos/utils/arquivos-api-error";
import { BrandingCapabilitiesCard } from "@/features/configuracoes/components/branding-capabilities-card";
import { BrandingLogoUploadCard } from "@/features/configuracoes/components/branding-logo-upload-card";
import { BrandingPreviewCard } from "@/features/configuracoes/components/branding-preview-card";
import { uploadLogoEmpresa } from "@/features/configuracoes/services/configuracoes-api";
import {
  canAccessBranding,
  canUploadBrandingLogo,
} from "@/features/configuracoes/permissions/configuracoes-permissions";
import { getConfiguracoesBrandingOverview } from "@/features/configuracoes/utils/configuracoes-branding";
import { withUploadedTenantLogo } from "@/features/configuracoes/utils/configuracoes-logo";
import { useTenant } from "@/providers/tenant-provider";
import { useAuthStore } from "@/stores/auth-store";

export function BrandingView() {
  const queryClient = useQueryClient();
  const { tenant, setTenant } = useTenant();

  const status = useAuthStore((state) => state.status);

  const user = useAuthStore((state) => state.user);

  const role = user?.role ?? null;

  const branding = getConfiguracoesBrandingOverview(tenant);

  const uploadLogoMutation = useMutation({
    mutationFn: uploadLogoEmpresa,

    onSuccess: async (arquivo) => {
      await queryClient.invalidateQueries({
        queryKey: arquivosKeys.lists(),
      });

      const nextTenant = withUploadedTenantLogo(tenant, arquivo);

      if (!nextTenant) {
        toast.warning(
          "Logo enviada, mas a resposta não trouxe uma URL pública segura para atualização imediata.",
        );
        return;
      }

      setTenant(nextTenant);

      toast.success("Logo atualizada com sucesso.");
    },

    onError: (error) => {
      toast.error(getArquivoUploadErrorMessage(error));
    },
  });

  const accessDenied = status === "authenticated" && !canAccessBranding(role);

  if (accessDenied) {
    return (
      <main className="min-w-0 space-y-6">
        <section
          className="rounded-xl border border-border bg-card p-6"
          role="alert"
        >
          <h1 className="text-xl font-semibold text-foreground">
            Acesso não disponível
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Branding da empresa está disponível somente para ADMIN e GERENTE.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-w-0 space-y-6">
      <header className="min-w-0 space-y-3">
        <Link
          href="/configuracoes"
          className="inline-flex rounded-md text-sm font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
        >
          Voltar para configurações
        </Link>
        <p className="text-sm font-medium text-muted-foreground">
          Configurações
        </p>

        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Branding e white-label
        </h1>

        <p className="max-w-3xl text-sm text-muted-foreground">
          Consulte e atualize as capacidades de identidade realmente suportadas
          para o tenant autenticado.
        </p>
      </header>

      <BrandingPreviewCard branding={branding} />

      {canUploadBrandingLogo(role) ? (
        <BrandingLogoUploadCard
          onUpload={async (file) => {
            await uploadLogoMutation.mutateAsync(file);
          }}
          isUploading={uploadLogoMutation.isPending}
        />
      ) : null}

      <BrandingCapabilitiesCard />
    </main>
  );
}
