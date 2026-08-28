import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  inativarCliente,
  uploadClienteFoto,
} from "@/features/clientes/services/clientes-api";

type ApiResponse = Promise<{
  data: unknown;
}>;

type ApiPost = (
  url: string,
  payload?: unknown,
) => ApiResponse;

type ApiPatch = (
  url: string,
  payload?: unknown,
) => ApiResponse;

const apiPost = vi.hoisted(
  () => vi.fn<ApiPost>(),
);

const apiPatch = vi.hoisted(
  () => vi.fn<ApiPatch>(),
);

vi.mock(
  "@/services/api/api-client",
  () => ({
    getApiClient: () => ({
      post: apiPost,
      patch: apiPatch,
    }),
  }),
);

const clienteId =
  "550e8400-e29b-41d4-a716-446655440000";

beforeEach(() => {
  apiPost.mockReset();
  apiPatch.mockReset();

  apiPost.mockResolvedValue({
    data: {
      id:
        "550e8400-e29b-41d4-a716-446655440001",
      clienteId,
      tipo:
        "FOTO_CLIENTE",
      url:
        "/uploads/clientes/cliente.png",
    },
  });

  apiPatch.mockResolvedValue({
    data: {
      message:
        "Cliente inativado com sucesso",
    },
  });
});

describe(
  "cliente profile actions api",
  () => {
    it(
      "envia foto no endpoint real usando o campo multipart file",
      async () => {
        const file =
          new File(
            ["foto"],
            "cliente.png",
            {
              type:
                "image/png",
            },
          );

        await uploadClienteFoto(
          clienteId,
          file,
        );

        expect(
          apiPost,
        ).toHaveBeenCalledTimes(1);

        const [
          url,
          payload,
        ] =
          apiPost.mock.calls[0] ??
          [];

        expect(url).toBe(
          `/arquivos/clientes/${clienteId}/foto`,
        );

        expect(
          payload,
        ).toBeInstanceOf(
          FormData,
        );

        const formData =
          payload as FormData;

        expect(
          formData.get("file"),
        ).toBe(file);

        expect(
          formData.has(
            "empresaId",
          ),
        ).toBe(false);
      },
    );

    it(
      "inativa pelo endpoint real sem body de empresa",
      async () => {
        await inativarCliente(
          clienteId,
        );

        expect(
          apiPatch,
        ).toHaveBeenCalledTimes(1);

        expect(
          apiPatch,
        ).toHaveBeenCalledWith(
          `/clientes/${clienteId}/inativar`,
        );
      },
    );
  },
);
