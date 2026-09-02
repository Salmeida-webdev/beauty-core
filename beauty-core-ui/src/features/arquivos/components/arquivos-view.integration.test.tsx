import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ArquivosView } from "@/features/arquivos/components/arquivos-view";
import { QueryProvider } from "@/providers/query-provider";

type ApiConfig = {
  params?: Record<string, string | number>;
};

type ApiGet = (
  url: string,
  config?: ApiConfig,
) => Promise<{
  data: unknown;
}>;

const apiGet = vi.hoisted(() => vi.fn<ApiGet>());

const navigation = vi.hoisted(() => ({
  params: new URLSearchParams(),
  pathname: "/arquivos",
  replace: vi.fn(),
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
    get: apiGet,
  }),
}));

vi.mock("@/stores/auth-store", () => ({
  useAuthStore: (selector: (state: typeof authState.value) => unknown) =>
    selector(authState.value),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: navigation.replace,
  }),
  usePathname: () => navigation.pathname,
  useSearchParams: () => navigation.params,
}));

const empresaId = "550e8400-e29b-41d4-a716-446655440001";

const documento = {
  id: "550e8400-e29b-41d4-a716-446655440010",
  empresaId,
  clienteId: null,
  usuarioId: null,
  servicoId: null,
  unidadeId: null,
  tipo: "DOCUMENTO",
  nomeOriginal: "contrato.pdf",
  nomeArquivo: "contrato-uuid.pdf",
  mimeType: "application/pdf",
  tamanhoBytes: 2048,
  caminho: "documentos/contrato-uuid.pdf",
  url: "/uploads/public/tenant/documentos/contrato-uuid.pdf",
  status: "ATIVO",
  visibilidade: "PUBLICO",
  createdAt: "2026-09-02T10:00:00.000Z",
  updatedAt: "2026-09-02T10:00:00.000Z",
};

const logo = {
  ...documento,
  id: "550e8400-e29b-41d4-a716-446655440011",
  tipo: "LOGO_EMPRESA",
  nomeOriginal: "logo.png",
  nomeArquivo: "logo-uuid.png",
  mimeType: "image/png",
  caminho: "logo/logo-uuid.png",
  url: "/uploads/public/tenant/logo/logo-uuid.png",
};

function installPage(
  arquivo: typeof documento,
  page = 1,
  total = 1,
  totalPages = 1,
) {
  apiGet.mockResolvedValue({
    data: {
      data: [arquivo],
      meta: {
        total,
        page,
        limit: 10,
        totalPages,
      },
    },
  });
}

function renderArquivos() {
  return render(
    <QueryProvider>
      <ArquivosView />
    </QueryProvider>,
  );
}

beforeEach(() => {
  apiGet.mockReset();
  navigation.replace.mockReset();
  navigation.params = new URLSearchParams();
  navigation.pathname = "/arquivos";

  authState.value.status = "authenticated";

  authState.value.user.role = "ADMIN";
});

afterEach(() => {
  cleanup();
});

describe("ArquivosView integration Chat55", () => {
  it("ADMIN carrega listagem pelo endpoint real paginado", async () => {
    installPage(documento);

    renderArquivos();

    expect(await screen.findByText("contrato.pdf")).toBeInTheDocument();

    expect(apiGet).toHaveBeenCalledWith("/arquivos", {
      params: {
        page: 1,
        limit: 10,
      },
    });
  });

  it("tipo na URL seleciona endpoint server-side dedicado", async () => {
    navigation.params = new URLSearchParams("tipo=LOGO_EMPRESA&page=2");

    installPage(logo, 2, 11, 2);

    renderArquivos();

    expect(await screen.findByText("logo.png")).toBeInTheDocument();

    expect(apiGet).toHaveBeenCalledWith("/arquivos/tipo/LOGO_EMPRESA", {
      params: {
        page: 2,
        limit: 10,
      },
    });

    expect(apiGet).not.toHaveBeenCalledWith("/arquivos", expect.anything());
  });

  it("RECEPCAO recebe guard UX sem disparar GET de gestao", async () => {
    authState.value.user.role = "RECEPCAO";

    installPage(documento);

    renderArquivos();

    expect(
      screen.getByRole("heading", {
        name: "Acesso não disponível",
      }),
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(apiGet).not.toHaveBeenCalled();
    });
  });

  it("sessao ainda nao autenticada nao dispara request preventivo", async () => {
    authState.value.status = "restoring";

    installPage(documento);

    renderArquivos();

    await waitFor(() => {
      expect(apiGet).not.toHaveBeenCalled();
    });
  });
});
