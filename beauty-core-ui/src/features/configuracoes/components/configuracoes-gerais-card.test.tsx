import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { ConfiguracoesGeraisCard } from "@/features/configuracoes/components/configuracoes-gerais-card";
import type { TenantPublicConfig } from "@/features/tenant/types/tenant.types";

afterEach(() => {
  cleanup();
});

const tenant: TenantPublicConfig = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  name: "Clínica Aurora",
  slug: "clinica-aurora",
  domain: null,
  locale: "pt-BR",
  branding: {
    logoUrl: null,
    faviconUrl: null,
    primaryColor: "#18181B",
    secondaryColor: "#E4E4E7",
    accentColor: "#A1A1AA",
  },
  settings: {
    allowDarkMode: true,
    showPoweredByBeautyCore: true,
  },
};

describe("ConfiguracoesGeraisCard", () => {
  it("renderiza dados reais do tenant", () => {
    render(<ConfiguracoesGeraisCard tenant={tenant} />);

    expect(screen.getByText("Clínica Aurora")).toBeInTheDocument();

    expect(screen.getByText("clinica-aurora")).toBeInTheDocument();

    expect(screen.getByText("pt-BR")).toBeInTheDocument();

    expect(screen.getByText("Não informado")).toBeInTheDocument();
  });

  it("nao renderiza campos sensiveis ou nao comprovados", () => {
    render(<ConfiguracoesGeraisCard tenant={tenant} />);

    expect(screen.queryByText(/JWT/i)).not.toBeInTheDocument();

    expect(screen.queryByText(/Redis/i)).not.toBeInTheDocument();

    expect(screen.queryByText(/senha/i)).not.toBeInTheDocument();

    expect(screen.queryByText(/token/i)).not.toBeInTheDocument();
  });
});
