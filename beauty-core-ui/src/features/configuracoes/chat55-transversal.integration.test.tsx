import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { BrandingView } from "@/features/configuracoes/components/branding-view";
import { ConfiguracoesView } from "@/features/configuracoes/components/configuracoes-view";
import type { TenantPublicConfig } from "@/features/tenant/types/tenant.types";
import { QueryProvider } from "@/providers/query-provider";
import { TenantProvider } from "@/providers/tenant-provider";

type ApiPost = (
  url: string,
  payload?: unknown,
  config?: unknown,
) => Promise<{
  data: unknown;
}>;

const apiPost = vi.hoisted(() => vi.fn<ApiPost>());

const toast = vi.hoisted(() => ({
  success: vi.fn(),
  warning: vi.fn(),
  error: vi.fn(),
}));

const authState = vi.hoisted(() => ({
  value: {
    status: "authenticated",
    user: {
      id: "admin-1",
      nome: "Admin",
      email: "admin@beautycore.test",
      role: "ADMIN",
      empresaId: "550e8400-e29b-41d4-a716-446655440001",
    },
  },
}));

vi.mock("@/services/api/api-client", () => ({
  getApiClient: () => ({
    post: apiPost,
  }),
}));

vi.mock("@/stores/auth-store", () => ({
  useAuthStore: (selector: (state: typeof authState.value) => unknown) =>
    selector(authState.value),
}));

vi.mock("sonner", () => ({
  toast,
}));

const tenant: TenantPublicConfig = {
  id: "550e8400-e29b-41d4-a716-446655440001",
  name: "Clínica Aurora",
  slug: "clinica-aurora",
  domain: null,
  locale: "pt-BR",
  branding: {
    logoUrl: null,
    faviconUrl: null,
    primaryColor: "#7A1234",
    secondaryColor: "#ABCDEF",
    accentColor: "#FEDCBA",
  },
  settings: {
    allowDarkMode: true,
    showPoweredByBeautyCore: true,
  },
};

const logoArquivo = {
  id: "550e8400-e29b-41d4-a716-446655440010",
  empresaId: "550e8400-e29b-41d4-a716-446655440001",
  clienteId: null,
  usuarioId: null,
  servicoId: null,
  unidadeId: null,
  tipo: "LOGO_EMPRESA",
  nomeOriginal: "logo.png",
  nomeArquivo: "logo-uuid.png",
  mimeType: "image/png",
  tamanhoBytes: 1024,
  caminho: "logo/logo-uuid.png",
  url: "/uploads/public/tenant/logo/logo-uuid.png",
  status: "ATIVO",
  visibilidade: "PUBLICO",
  createdAt: "2026-09-02T10:00:00.000Z",
  updatedAt: "2026-09-02T10:00:00.000Z",
};

function renderTenantUi(element: React.ReactNode) {
  return render(
    <TenantProvider initialTenant={tenant}>
      <QueryProvider>{element}</QueryProvider>
    </TenantProvider>,
  );
}

beforeEach(() => {
  apiPost.mockReset();
  toast.success.mockReset();
  toast.warning.mockReset();
  toast.error.mockReset();

  authState.value.status = "authenticated";

  authState.value.user.role = "ADMIN";

  document.documentElement.style.removeProperty("--tenant-primary");

  document.documentElement.style.removeProperty("--tenant-secondary");

  document.documentElement.style.removeProperty("--tenant-accent");

  document.documentElement.removeAttribute("data-tenant");
});

afterEach(() => {
  cleanup();

  document.documentElement.style.removeProperty("--tenant-primary");

  document.documentElement.style.removeProperty("--tenant-secondary");

  document.documentElement.style.removeProperty("--tenant-accent");

  document.documentElement.removeAttribute("data-tenant");
});

describe("Chat55 transversal integration", () => {
  it("Configuracoes conecta Branding e Arquivos por contratos reais", () => {
    renderTenantUi(<ConfiguracoesView />);

    expect(
      screen.getByRole("heading", {
        name: "Configurações",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: /Branding e white-label/i,
      }),
    ).toHaveAttribute("href", "/configuracoes/branding");

    expect(
      screen.getByRole("link", {
        name: /Logos em Arquivos/i,
      }),
    ).toHaveAttribute("href", "/arquivos?tipo=LOGO_EMPRESA");
  });

  it("upload de logo percorre UI -> service -> POST -> TenantProvider", async () => {
    apiPost.mockResolvedValue({
      data: logoArquivo,
    });

    renderTenantUi(<BrandingView />);

    expect(
      screen.getByText("Usando fallback visual do Beauty Core"),
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(document.documentElement.dataset.tenant).toBe("clinica-aurora");
    });

    expect(
      document.documentElement.style.getPropertyValue("--tenant-primary"),
    ).toBe("#7A1234");

    const file = new File(["logo"], "logo.png", {
      type: "image/png",
    });

    fireEvent.change(screen.getByLabelText("Arquivo da logo"), {
      target: {
        files: [file],
      },
    });

    const submit = screen.getByRole("button", {
      name: "Enviar logo",
    });

    expect(submit).toBeEnabled();

    fireEvent.click(submit);

    expect(
      await screen.findByText("Logo personalizada configurada"),
    ).toBeInTheDocument();

    expect(apiPost).toHaveBeenCalledTimes(1);

    const call = apiPost.mock.calls[0];

    expect(call?.[0]).toBe("/arquivos/logo");

    const payload = call?.[1];

    expect(payload).toBeInstanceOf(FormData);

    if (!(payload instanceof FormData)) {
      throw new Error("Payload multipart esperado.");
    }

    expect(payload.get("file")).toBe(file);

    expect(payload.has("empresaId")).toBe(false);

    expect(
      document.documentElement.style.getPropertyValue("--tenant-primary"),
    ).toBe("#7A1234");

    expect(toast.success).toHaveBeenCalledWith("Logo atualizada com sucesso.");
  });

  it("RECEPCAO nao acessa Branding nem recebe controle de upload", () => {
    authState.value.user.role = "RECEPCAO";

    renderTenantUi(<BrandingView />);

    expect(
      screen.getByRole("heading", {
        name: "Acesso não disponível",
      }),
    ).toBeInTheDocument();

    expect(screen.queryByLabelText("Arquivo da logo")).not.toBeInTheDocument();

    expect(apiPost).not.toHaveBeenCalled();
  });

  it("SUPER_ADMIN nao herda configuracao tenant automaticamente", () => {
    authState.value.user.role = "SUPER_ADMIN";

    renderTenantUi(<ConfiguracoesView />);

    expect(
      screen.getByRole("heading", {
        name: "Acesso não disponível",
      }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("link", {
        name: /Branding e white-label/i,
      }),
    ).not.toBeInTheDocument();
  });
});
