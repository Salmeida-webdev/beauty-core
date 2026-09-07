import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { DEFAULT_TENANT } from "@/features/tenant/config/default-tenant";
import { TenantProvider } from "@/providers/tenant-provider";

import { usePortalAuth } from "./portal-auth-context";
import { portalAuthApi } from "./portal-auth-api";
import {
  PortalOtpVerificationForm,
  normalizePortalOtpCode,
  validatePortalOtpCode,
} from "./portal-otp-verification";
import { startPortalSession } from "./portal-auth-session";

vi.mock("./portal-auth-api", () => ({
  portalAuthApi: {
    requestOtp: vi.fn(),
    verifyOtp: vi.fn(),
  },
}));

vi.mock("./portal-auth-context", () => ({
  usePortalAuth: vi.fn(),
}));

vi.mock("./portal-auth-session", () => ({
  startPortalSession: vi.fn(),
}));

type VerifyResponse = Awaited<
  ReturnType<typeof portalAuthApi.verifyOtp>
>;

type RequestResponse = Awaited<
  ReturnType<typeof portalAuthApi.requestOtp>
>;

const tenant = {
  ...DEFAULT_TENANT,
  name: "Studio Aurora",
  slug: "studio-aurora",
};

const verifyResponse: VerifyResponse = {
  access_token: "access-token-real",
  refresh_token: "refresh-token-real",
  primeiroAcesso: false,
  empresa: {
    empresaId: "empresa-real",
    nome: "Studio Aurora",
    slug: "studio-aurora",
    dominio: null,
    logo: null,
  },
  cliente: {
    id: "cliente-real",
    nome: "Cliente Real",
    telefone: "83999999999",
    empresaId: "empresa-real",
    aceitouTermos: true,
  },
};

const requestResponse: RequestResponse = {
  message: "Código gerado com sucesso.",
  empresa: {
    empresaId: "empresa-real",
    nome: "Studio Aurora",
    slug: "studio-aurora",
    dominio: null,
    logo: null,
  },
};

const requestOtpMock = vi.mocked(portalAuthApi.requestOtp);
const verifyOtpMock = vi.mocked(portalAuthApi.verifyOtp);
const usePortalAuthMock = vi.mocked(usePortalAuth);
const startPortalSessionMock = vi.mocked(startPortalSession);
const restoreSessionMock = vi.fn();

function renderForm() {
  return render(
    <TenantProvider initialTenant={tenant}>
      <PortalOtpVerificationForm
        telefone="83999999999"
        onRestart={vi.fn()}
      />
    </TenantProvider>,
  );
}

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  requestOtpMock.mockReset();
  verifyOtpMock.mockReset();
  startPortalSessionMock.mockReset();
  restoreSessionMock.mockReset();
  restoreSessionMock.mockResolvedValue(undefined);

  usePortalAuthMock.mockReturnValue({
    restoreSession: restoreSessionMock,
  } as unknown as ReturnType<typeof usePortalAuth>);

  startPortalSessionMock.mockReturnValue({
    clienteId: "cliente-real",
    empresaId: "empresa-real",
    sid: "sessao-real",
  });
});

describe("PortalOtpVerificationForm", () => {
  it("supports numeric filtering, paste and one-time-code autofill", () => {
    renderForm();

    const input = screen.getByLabelText("Código de acesso");

    expect(input).toHaveAttribute("autoComplete", "one-time-code");
    expect(input).toHaveAttribute("inputMode", "numeric");
    expect(input).toHaveAttribute("maxLength", "6");

    fireEvent.change(input, {
      target: {
        value: "12a 345678",
      },
    });

    expect(input).toHaveValue("123456");
    expect(normalizePortalOtpCode("12a 345678")).toBe("123456");
    expect(validatePortalOtpCode("12345")).toBe(
      "O código deve ter 6 dígitos.",
    );
  });

  it("blocks verification when the code is incomplete", () => {
    renderForm();

    fireEvent.change(screen.getByLabelText("Código de acesso"), {
      target: { value: "12345" },
    });

    fireEvent.submit(
      screen.getByRole("form", {
        name: "Verificar código de acesso",
      }),
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "O código deve ter 6 dígitos.",
    );

    expect(verifyOtpMock).not.toHaveBeenCalled();
  });

  it("verifies the real contract and restores the authenticated session", async () => {
    verifyOtpMock.mockResolvedValue(verifyResponse);

    renderForm();

    fireEvent.change(screen.getByLabelText("Código de acesso"), {
      target: { value: "123456" },
    });

    fireEvent.submit(
      screen.getByRole("form", {
        name: "Verificar código de acesso",
      }),
    );

    await waitFor(() => {
      expect(verifyOtpMock).toHaveBeenCalledWith({
        slug: "studio-aurora",
        telefone: "83999999999",
        codigo: "123456",
      });
    });

    expect(startPortalSessionMock).toHaveBeenCalledWith(
      verifyResponse,
    );

    await waitFor(() => {
      expect(restoreSessionMock).toHaveBeenCalledTimes(1);
      expect(screen.getByRole("status")).toHaveTextContent(
        "Acesso confirmado.",
      );
    });
  });

  it("prevents double verification while the request is pending", async () => {
    let resolveVerification: (value: VerifyResponse) => void = () => undefined;

    verifyOtpMock.mockReturnValue(
      new Promise<VerifyResponse>((resolve) => {
        resolveVerification = resolve;
      }),
    );

    renderForm();

    fireEvent.change(screen.getByLabelText("Código de acesso"), {
      target: { value: "123456" },
    });

    const form = screen.getByRole("form", {
      name: "Verificar código de acesso",
    });

    fireEvent.submit(form);
    fireEvent.submit(form);

    expect(verifyOtpMock).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", {
      name: "Verificando...",
    })).toBeDisabled();

    resolveVerification(verifyResponse);

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(
        "Acesso confirmado.",
      );
    });
  });

  it("shows a safe message for invalid or expired codes", async () => {
    verifyOtpMock.mockRejectedValue({
      response: {
        status: 401,
      },
    });

    renderForm();

    fireEvent.change(screen.getByLabelText("Código de acesso"), {
      target: { value: "123456" },
    });

    fireEvent.submit(
      screen.getByRole("form", {
        name: "Verificar código de acesso",
      }),
    );

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "O código informado é inválido ou expirou.",
      );
    });
  });

  it("resends through the public tenant-aware endpoint without cooldown invention", async () => {
    requestOtpMock.mockResolvedValue(requestResponse);

    renderForm();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Enviar novo código",
      }),
    );

    await waitFor(() => {
      expect(requestOtpMock).toHaveBeenCalledWith({
        slug: "studio-aurora",
        telefone: "83999999999",
      });
    });

    expect(
      screen.getByRole("status"),
    ).toHaveTextContent("Código gerado com sucesso.");

    expect(
      screen.getByRole("button", {
        name: "Enviar novo código",
      }),
    ).not.toBeDisabled();
  });

  it("handles resend rate limiting and unavailable access safely", async () => {
    requestOtpMock.mockRejectedValue({
      response: {
        status: 429,
      },
    });

    renderForm();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Enviar novo código",
      }),
    );

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Muitas solicitações. Aguarde alguns instantes antes de tentar novamente.",
      );
    });

    cleanup();

    verifyOtpMock.mockResolvedValue(verifyResponse);
    restoreSessionMock.mockRejectedValue({
      response: {
        status: 403,
      },
    });

    renderForm();

    fireEvent.change(screen.getByLabelText("Código de acesso"), {
      target: { value: "123456" },
    });

    fireEvent.submit(
      screen.getByRole("form", {
        name: "Verificar código de acesso",
      }),
    );

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "O acesso ao portal está indisponível para esta empresa.",
      );
    });
  });
});
