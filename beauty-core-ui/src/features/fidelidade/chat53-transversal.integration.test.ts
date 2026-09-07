import {
  readFileSync,
} from "node:fs";
import {
  join,
} from "node:path";

import {
  describe,
  expect,
  it,
} from "vitest";

const root =
  process.cwd();

function source(
  relativePath: string,
): string {
  return readFileSync(
    join(
      root,
      relativePath,
    ),
    "utf8",
  );
}

const fidelidadePage =
  source(
    "src/app/(dashboard)/fidelidade/page.tsx",
  );

const fidelidadeOperationalView =
  source(
    "src/features/fidelidade/components/fidelidade-operacional-view.tsx",
  );

const pacotesPage =
  source(
    "src/app/(dashboard)/pacotes/page.tsx",
  );

const navigation =
  source(
    "src/config/admin-navigation.ts",
  );

const profileKeys =
  source(
    "src/features/clientes/queries/cliente-profile-keys.ts",
  );

const profileQueryOptions =
  source(
    "src/features/clientes/queries/cliente-profile-query-options.ts",
  );

const profileApi =
  source(
    "src/features/clientes/services/cliente-profile-extras-api.ts",
  );

const profileSchemas =
  source(
    "src/features/clientes/schemas/cliente-profile-extras.schemas.ts",
  );

const fidelidadeView =
  source(
    "src/features/fidelidade/components/fidelidade-operacional-view.tsx",
  );

const fidelidadeApi =
  source(
    "src/features/fidelidade/services/fidelidade-api.ts",
  );

const fidelidadeOperationsApi =
  source(
    "src/features/fidelidade/operacoes/fidelidade-operacoes-api.ts",
  );

const fidelidadeOperationsHook =
  source(
    "src/features/fidelidade/operacoes/use-fidelidade-operacoes.ts",
  );

const fidelidadePermissions =
  source(
    "src/features/fidelidade/permissions/fidelidade-permissions.ts",
  );

const clientePacotesApi =
  source(
    "src/features/pacotes/clientes-pacotes/clientes-pacotes-api.ts",
  );

const clientePacotesView =
  source(
    "src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx",
  );

const clientePacotesHook =
  source(
    "src/features/pacotes/clientes-pacotes/use-clientes-pacotes.ts",
  );

const clientePacotesOptions =
  source(
    "src/features/pacotes/clientes-pacotes/use-clientes-pacotes-options.ts",
  );

const clientePacotesUrl =
  source(
    "src/features/pacotes/clientes-pacotes/clientes-pacotes-url-state.ts",
  );

const pacotesPermissions =
  source(
    "src/features/pacotes/permissions/pacotes-permissions.ts",
  );

describe(
  "Chat53 integração transversal",
  () => {
    it(
      "compõe todos os domínios reais pela árvore de Fidelidade",
      () => {
        expect(
          fidelidadePage,
        ).toContain(
          "FidelidadeOperacionalView",
        );

        expect(
          fidelidadeOperationalView,
        ).toContain(
          "FidelidadeProgramaView",
        );

        expect(
          fidelidadeOperationalView,
        ).toContain(
          "BeneficiosView",
        );

        expect(
          fidelidadeOperationalView,
        ).toContain(
          "CuponsView",
        );

        expect(
          fidelidadeOperationalView,
        ).toContain(
          "FidelidadeOperacoesView",
        );
      },
    );

    it(
      "compõe catálogo e vínculos na rota de Pacotes",
      () => {
        expect(
          pacotesPage,
        ).toContain(
          "PacotesCatalogoView",
        );

        expect(
          pacotesPage,
        ).toContain(
          "ClientesPacotesView",
        );
      },
    );

    it(
      "leva o mesmo cliente de Pacotes para Fidelidade pela URL",
      () => {
        expect(
          clientePacotesView,
        ).toContain(
          "/fidelidade?clienteId=",
        );

        expect(
          clientePacotesView,
        ).toContain(
          "effectiveCliente.id",
        );

        expect(
          clientePacotesUrl,
        ).toContain(
          "clienteId",
        );
      },
    );

    it(
      "restaura o cliente da URL pela infraestrutura real de Clientes",
      () => {
        expect(
          clientePacotesOptions,
        ).toContain(
          "clientesQueryOptions.detail",
        );

        expect(
          clientePacotesOptions,
        ).toContain(
          "useDebouncedValue",
        );

        expect(
          clientePacotesView,
        ).toContain(
          "useSearchParams",
        );
      },
    );

    it(
      "reutiliza o mesmo contrato ClientePacote do Perfil 360",
      () => {
        expect(
          clientePacotesApi,
        ).toContain(
          "@/features/clientes/schemas/cliente-profile-extras.schemas",
        );

        expect(
          clientePacotesApi,
        ).toContain(
          "clientePacoteSchema",
        );

        expect(
          clientePacotesApi,
        ).toContain(
          "clientesPacotesSchema",
        );

        expect(
          profileSchemas,
        ).toContain(
          "clientePacoteSchema",
        );
      },
    );

    it(
      "compartilha a mesma query key de pacotes entre Pacotes e Perfil 360",
      () => {
        expect(
          clientePacotesHook,
        ).toContain(
          "clienteProfileKeys.pacotes",
        );

        expect(
          profileQueryOptions,
        ).toContain(
          "clienteProfileKeys.pacotes",
        );

        expect(
          profileKeys,
        ).toContain(
          '"pacotes"',
        );
      },
    );

    it(
      "usa o mesmo endpoint de pacotes por cliente no módulo e no Perfil 360",
      () => {
        expect(
          clientePacotesApi,
        ).toContain(
          "/clientes-pacotes/cliente/",
        );

        expect(
          profileApi,
        ).toContain(
          "/clientes-pacotes/cliente/",
        );
      },
    );

    it(
      "mantém saldo e histórico de fidelidade vindos dos endpoints autoritativos",
      () => {
        expect(
          fidelidadeApi,
        ).toContain(
          "/fidelidade/cliente/",
        );

        expect(
          fidelidadeApi,
        ).toContain(
          "/fidelidade/historico/",
        );

        expect(
          profileApi,
        ).toContain(
          "/fidelidade/cliente/",
        );

        expect(
          profileApi,
        ).toContain(
          "/fidelidade/historico/",
        );

        expect(
          fidelidadeView,
        ).toContain(
          "saldo",
        );
      },
    );

    it(
      "mantém operações de pontos ligadas apenas aos endpoints reais",
      () => {
        expect(
          fidelidadeOperationsApi,
        ).toContain(
          "/fidelidade/adicionar-pontos",
        );

        expect(
          fidelidadeOperationsApi,
        ).toContain(
          "/fidelidade/resgatar-pontos",
        );

        expect(
          fidelidadeOperationsApi,
        ).toContain(
          "/fidelidade/pontuar-por-valor",
        );

        expect(
          fidelidadeOperationsApi,
        ).not.toContain(
          "estornar",
        );

        expect(
          fidelidadeOperationsApi,
        ).not.toContain(
          "reverter",
        );
      },
    );

    it(
      "mantém consumo de sessão autoritativo sem sessão paralela",
      () => {
        expect(
          clientePacotesApi,
        ).toContain(
          "/usar-sessao",
        );

        expect(
          clientePacotesApi,
        ).not.toContain(
          "estornar-sessao",
        );

        expect(
          clientePacotesApi,
        ).not.toContain(
          "reverter-sessao",
        );

        expect(
          clientePacotesHook,
        ).not.toContain(
          "setQueryData",
        );
      },
    );

    it(
      "invalida seletivamente caches em vez de limpar o QueryClient",
      () => {
        expect(
          clientePacotesHook,
        ).toContain(
          "invalidateQueries",
        );

        expect(
          clientePacotesHook,
        ).not.toContain(
          "queryClient.clear",
        );

        expect(
          fidelidadeOperationsHook,
        ).toContain(
          "invalidateQueries",
        );

        expect(
          fidelidadeOperationsHook,
        ).not.toContain(
          "queryClient.clear",
        );
      },
    );

    it(
      "mantém RBAC transversal sem incluir SUPER_ADMIN automaticamente",
      () => {
        expect(
          fidelidadePermissions,
        ).toContain(
          "canAccessLoyalty",
        );

        expect(
          pacotesPermissions,
        ).toContain(
          "canAccessPackages",
        );

        expect(
          pacotesPermissions,
        ).toContain(
          "canConsumePackageSession",
        );

        const loyaltyStart =
          navigation.indexOf(
            'id: "loyalty"',
          );

        const packagesStart =
          navigation.indexOf(
            'id: "packages"',
          );

        expect(
          loyaltyStart,
        ).toBeGreaterThanOrEqual(
          0,
        );

        expect(
          packagesStart,
        ).toBeGreaterThanOrEqual(
          0,
        );

        const loyaltySegment =
          navigation.slice(
            loyaltyStart,
            packagesStart,
          );

        const nextItemStart =
          navigation.indexOf(
            "id:",
            packagesStart +
              'id: "packages"'.length,
          );

        const packagesSegment =
          navigation.slice(
            packagesStart,
            nextItemStart >= 0
              ? nextItemStart
              : undefined,
          );

        for (
          const segment of [
            loyaltySegment,
            packagesSegment,
          ]
        ) {
          expect(
            segment,
          ).toContain(
            '"ADMIN"',
          );

          expect(
            segment,
          ).toContain(
            '"GERENTE"',
          );

          expect(
            segment,
          ).toContain(
            '"RECEPCAO"',
          );

          expect(
            segment,
          ).toContain(
            '"PROFISSIONAL"',
          );

          expect(
            segment,
          ).not.toContain(
            '"SUPER_ADMIN"',
          );
        }
      },
    );

    it(
      "não introduz empresaId, clientes HTTP paralelos ou optimistic update transversal",
      () => {
        const productionFlow =
          [
            fidelidadeApi,
            fidelidadeOperationsApi,
            fidelidadeOperationsHook,
            clientePacotesApi,
            clientePacotesHook,
            clientePacotesOptions,
            clientePacotesView,
          ].join(
            "\n",
          );

        expect(
          productionFlow,
        ).not.toMatch(
          /\bempresaId\b/,
        );

        expect(
          productionFlow,
        ).not.toContain(
          "axios.create",
        );

        expect(
          productionFlow,
        ).not.toContain(
          "new QueryClient",
        );

        expect(
          productionFlow,
        ).not.toContain(
          "setQueryData",
        );
      },
    );
  },
);
