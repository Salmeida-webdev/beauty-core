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

import { portalAuthApi } from "./portal-auth-api";
import {
  PortalOtpRequestForm,
  normalizePortalPhone,
  validatePortalPhone,
} from "./portal-otp-request";

vi.mock("./portal-auth-api", () => ({
  portalAuthApi: {
    requestOtp: vi.fn(),
  },
}));

type OtpResponse = Awaited<
  ReturnType<typeof portalAuthApi.requestOtp>
>;

const tenant = {
  ...DEFAULT_TENANT,
  name: "Studio Aurora",
  slug: "studio-aurora",
};

const otpResponse: OtpResponse = {
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

function renderForm() {
  return render(
    <TenantProvider initialTenant={tenant}>
      <PortalOtpRequestForm />
    </TenantProvider>,
  );
}

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  requestOtpMock.mockReset();
});

describe("PortalOtpRequestForm", () => {
  it("normalizes formatted phone numbers according to the backend contract", () => {
    expect(normalizePortalPhone("(83) 99999-9999")).toBe(
      "83999999999",
    );
    expect(validatePortalPhone("83999999999")).toBeNull();
    expect(validatePortalPhone("123")).toBe(
      "Informe um telefone válido com DDD.",
    );
  });

  it("blocks submission when the phone is invalid", () => {
    renderForm();

    fireEvent.change(screen.getByLabelText("Telefone com DDD"), {
      target: { value: "123" },
    });

    fireEvent.submit(
      screen.getByRole("form", {
        name: "Solicitar código de acesso",
      }),
    );

    expect(
      screen.getByRole("alert"),
    ).toHaveTextContent("Informe um telefone válido com DDD.");

    expect(requestOtpMock).not.toHaveBeenCalled();
  });

  it("sends only the tenant slug and normalized phone to the public adapter", async () => {
    requestOtpMock.mockResolvedValue(otpResponse);

    renderForm();

    fireEvent.change(screen.getByLabelText("Telefone com DDD"), {
      target: { value: "(83) 99999-9999" },
    });

    fireEvent.submit(
      screen.getByRole("form", {
        name: "Solicitar código de acesso",
      }),
    );

    await waitFor(() => {
      expect(requestOtpMock).toHaveBeenCalledWith({
        slug: "studio-aurora",
        telefone: "83999999999",
      });
    });

    expect(requestOtpMock.mock.calls[0][0]).not.toHaveProperty(
      "empresaId",
    );

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(
        "Código gerado com sucesso.",
      );
    });
  });

  it("prevents double submit while the request is pending", async () => {
    let resolveRequest: (value: OtpResponse) => void = () => undefined;

    requestOtpMock.mockReturnValue(
      new Promise<OtpResponse>((resolve) => {
        resolveRequest = resolve;
      }),
    );

    renderForm();

    fireEvent.change(screen.getByLabelText("Telefone com DDD"), {
      target: { value: "83999999999" },
    });

    const form = screen.getByRole("form", {
      name: "Solicitar código de acesso",
    });

    fireEvent.submit(form);
    fireEvent.submit(form);

    expect(requestOtpMock).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button")).toBeDisabled();

    resolveRequest(otpResponse);

    await waitFor(() => {
      expect(screen.getByRole("status")).toBeInTheDocument();
    });
  });

  it("maps rate limiting to a safe user-facing message", async () => {
    requestOtpMock.mockRejectedValue({
      response: {
        status: 429,
      },
    });

    renderForm();

    fireEvent.change(screen.getByLabelText("Telefone com DDD"), {
      target: { value: "83999999999" },
    });

    fireEvent.submit(
      screen.getByRole("form", {
        name: "Solicitar código de acesso",
      }),
    );

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Muitas solicitações. Aguarde alguns instantes antes de tentar novamente.",
      );
    });
  });
});
