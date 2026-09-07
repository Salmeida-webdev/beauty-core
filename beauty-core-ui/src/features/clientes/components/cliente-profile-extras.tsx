"use client";

import type {
  ReactNode,
} from "react";
import {
  Gift,
  History,
  PackageCheck,
  Sparkles,
  Star,
} from "lucide-react";
import {
  useQuery,
} from "@tanstack/react-query";

import {
  PageSection,
} from "@/components/layout/page-section";
import {
  ErrorState,
  LoadingState,
} from "@/components/states/feedback-states";
import {
  StatusBadge,
} from "@/components/ui/status-badge";
import {
  clienteFidelidadeBeneficioQueryOptions,
  clienteFidelidadeHistoricoQueryOptions,
  clienteFidelidadeNivelQueryOptions,
  clienteFidelidadeSaldoQueryOptions,
  clientePacotesQueryOptions,
} from "@/features/clientes/queries/cliente-profile-query-options";
import type {
  StatusClientePacote,
} from "@/features/clientes/types/cliente-profile-extras.types";
import {
  normalizeApiError,
} from "@/services/api/normalize-api-error";

type ClienteProfileExtrasProps = {
  clienteId: string;
  enabled: boolean;
};

type ProfileMetricProps = {
  label: string;
  value: string;
  description?: string;
  icon: ReactNode;
};

function ProfileMetric({
  label,
  value,
  description,
  icon,
}: ProfileMetricProps) {
  return (
    <div className="rounded-large border border-border-subtle bg-surface-elevated p-card shadow-subtle">
      <div className="flex items-center gap-2 text-caption font-medium text-text-muted">
        {icon}
        <span>
          {label}
        </span>
      </div>

      <p className="mt-2 text-heading-3 font-semibold text-text-primary">
        {value}
      </p>

      {description && (
        <p className="mt-1 text-body-small text-text-muted">
          {description}
        </p>
      )}
    </div>
  );
}

function CompactEmpty({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-large border border-dashed border-border-subtle bg-surface-subtle/40 p-card text-center">
      <p className="font-medium text-text-primary">
        {title}
      </p>

      <p className="mt-1 text-body-small text-text-muted">
        {description}
      </p>
    </div>
  );
}

function formatPoints(
  value: number,
): string {
  return `${new Intl.NumberFormat(
    "pt-BR",
  ).format(value)} pontos`;
}

function formatMovementPoints(
  value: number,
): string {
  const formatted =
    new Intl.NumberFormat(
      "pt-BR",
    ).format(
      Math.abs(value),
    );

  if (value > 0) {
    return `+${formatted}`;
  }

  if (value < 0) {
    return `-${formatted}`;
  }

  return "0";
}

function formatMoney(
  value: number,
): string {
  return new Intl.NumberFormat(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    },
  ).format(value);
}

function formatDateTime(
  value: string,
): string {
  const date = new Date(value);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return "Data indisponível";
  }

  return new Intl.DateTimeFormat(
    "pt-BR",
    {
      dateStyle: "short",
      timeStyle: "short",
    },
  ).format(date);
}

function formatDate(
  value: string | null,
): string {
  if (!value) {
    return "Sem validade definida";
  }

  const date = new Date(value);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return "Validade indisponível";
  }

  return new Intl.DateTimeFormat(
    "pt-BR",
    {
      dateStyle: "short",
    },
  ).format(date);
}

function humanizeMovementType(
  value: string,
): string {
  return value
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(
      /(^|\s)\S/g,
      (letter) =>
        letter.toUpperCase(),
    );
}

function pacoteTone(
  status: StatusClientePacote,
):
  | "success"
  | "warning"
  | "neutral"
  | "danger" {
  switch (status) {
    case "ATIVO":
      return "success";

    case "VENCIDO":
      return "warning";

    case "FINALIZADO":
      return "neutral";

    case "CANCELADO":
      return "danger";
  }
}

function pacoteStatusLabel(
  status: StatusClientePacote,
): string {
  switch (status) {
    case "ATIVO":
      return "Ativo";

    case "VENCIDO":
      return "Vencido";

    case "FINALIZADO":
      return "Finalizado";

    case "CANCELADO":
      return "Cancelado";
  }
}

function isNotFound(
  error: unknown,
): boolean {
  return (
    normalizeApiError(error)
      .statusCode === 404
  );
}

export function ClienteProfileExtras({
  clienteId,
  enabled,
}: ClienteProfileExtrasProps) {
  const saldoQuery = useQuery(
    clienteFidelidadeSaldoQueryOptions(
      clienteId,
      enabled,
    ),
  );

  const beneficioQuery = useQuery(
    clienteFidelidadeBeneficioQueryOptions(
      clienteId,
      enabled,
    ),
  );

  const nivelQuery = useQuery(
    clienteFidelidadeNivelQueryOptions(
      clienteId,
      enabled,
    ),
  );

  const historicoQuery = useQuery(
    clienteFidelidadeHistoricoQueryOptions(
      clienteId,
      enabled,
    ),
  );

  const pacotesQuery = useQuery(
    clientePacotesQueryOptions(
      clienteId,
      enabled,
    ),
  );

  return (
    <>
      <PageSection
        title="Fidelidade"
        description="Saldo, nível e benefícios calculados pelo programa de fidelidade da empresa."
      >
        <div className="grid grid-cols-1 gap-grid lg:grid-cols-3">
          <div>
            {saldoQuery.isPending ? (
              <LoadingState />
            ) : saldoQuery.isError ? (
              isNotFound(
                saldoQuery.error,
              ) ? (
                <CompactEmpty
                  title="Fidelidade ainda não iniciada"
                  description="Este cliente ainda não possui um cadastro de fidelidade disponível."
                />
              ) : (
                <ErrorState
                  title="Não foi possível carregar o saldo"
                  description={
                    normalizeApiError(
                      saldoQuery.error,
                    ).message
                  }
                  onRetry={() => {
                    void saldoQuery.refetch();
                  }}
                />
              )
            ) : (
              <ProfileMetric
                label="Saldo atual"
                value={formatPoints(
                  saldoQuery.data
                    .saldoPontos,
                )}
                description="Pontos atualmente disponíveis no cadastro de fidelidade."
                icon={
                  <Star
                    aria-hidden="true"
                    className="size-4"
                  />
                }
              />
            )}
          </div>

          <div>
            {nivelQuery.isPending ? (
              <LoadingState />
            ) : nivelQuery.isError ? (
              <ErrorState
                title="Nível indisponível"
                description={
                  normalizeApiError(
                    nivelQuery.error,
                  ).message
                }
                onRetry={() => {
                  void nivelQuery.refetch();
                }}
              />
            ) : nivelQuery.data
                .nivelAtual ? (
              <ProfileMetric
                label="Nível atual"
                value={
                  nivelQuery.data
                    .nivelAtual.nome
                }
                description={
                  nivelQuery.data
                    .nivelAtual
                    .beneficios ??
                  `A partir de ${formatPoints(
                    nivelQuery.data
                      .nivelAtual
                      .pontosMinimos,
                  )}.`
                }
                icon={
                  <Sparkles
                    aria-hidden="true"
                    className="size-4"
                  />
                }
              />
            ) : (
              <CompactEmpty
                title="Sem nível atual"
                description="O saldo atual ainda não corresponde a um nível de fidelidade cadastrado."
              />
            )}
          </div>

          <div>
            {beneficioQuery.isPending ? (
              <LoadingState />
            ) : beneficioQuery.isError ? (
              <ErrorState
                title="Benefício indisponível"
                description={
                  normalizeApiError(
                    beneficioQuery.error,
                  ).message
                }
                onRetry={() => {
                  void beneficioQuery.refetch();
                }}
              />
            ) : (
              <ProfileMetric
                label="Valor disponível"
                value={formatMoney(
                  beneficioQuery.data
                    .valorDisponivel,
                )}
                description={`${beneficioQuery.data.quantidadeResgates} resgate(s) disponível(is) · ${beneficioQuery.data.pontosParaResgate} pontos por resgate · ${formatMoney(
                  beneficioQuery.data
                    .valorPorResgate,
                )} cada`}
                icon={
                  <Gift
                    aria-hidden="true"
                    className="size-4"
                  />
                }
              />
            )}
          </div>
        </div>
      </PageSection>

      <PageSection
        title="Histórico de fidelidade"
        description="Movimentações de pontos registradas para este cliente."
      >
        {historicoQuery.isPending ? (
          <LoadingState />
        ) : historicoQuery.isError ? (
          <ErrorState
            title="Não foi possível carregar o histórico"
            description={
              normalizeApiError(
                historicoQuery.error,
              ).message
            }
            onRetry={() => {
              void historicoQuery.refetch();
            }}
          />
        ) : historicoQuery.data
            .length === 0 ? (
          <CompactEmpty
            title="Nenhuma movimentação de pontos"
            description="Quando houver adições, resgates ou outras movimentações, elas aparecerão aqui."
          />
        ) : (
          <div className="divide-y divide-border-subtle rounded-large border border-border-subtle bg-surface-elevated shadow-subtle">
            {historicoQuery.data.map(
              (item) => (
                <article
                  key={item.id}
                  className="flex flex-col gap-3 p-card sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <History
                        aria-hidden="true"
                        className="size-4 shrink-0 text-text-muted"
                      />

                      <p className="font-medium text-text-primary">
                        {humanizeMovementType(
                          item.tipo,
                        )}
                      </p>
                    </div>

                    <p className="mt-1 text-body-small text-text-muted">
                      {item.descricao ??
                        "Movimentação sem descrição adicional."}
                    </p>

                    <p className="mt-1 text-caption text-text-muted">
                      {formatDateTime(
                        item.createdAt,
                      )}
                    </p>
                  </div>

                  <div
                    className="shrink-0 text-heading-4 font-semibold text-text-primary"
                    aria-label={`${item.pontos} pontos`}
                  >
                    {formatMovementPoints(
                      item.pontos,
                    )}
                  </div>
                </article>
              ),
            )}
          </div>
        )}
      </PageSection>

      <PageSection
        title="Pacotes"
        description="Pacotes vinculados ao cliente e controle atual das sessões."
      >
        {pacotesQuery.isPending ? (
          <LoadingState />
        ) : pacotesQuery.isError ? (
          <ErrorState
            title="Não foi possível carregar os pacotes"
            description={
              normalizeApiError(
                pacotesQuery.error,
              ).message
            }
            onRetry={() => {
              void pacotesQuery.refetch();
            }}
          />
        ) : pacotesQuery.data
            .length === 0 ? (
          <CompactEmpty
            title="Nenhum pacote vinculado"
            description="Este cliente ainda não possui pacotes registrados."
          />
        ) : (
          <div className="grid grid-cols-1 gap-grid xl:grid-cols-2">
            {pacotesQuery.data.map(
              (clientePacote) => (
                <article
                  key={
                    clientePacote.id
                  }
                  className="rounded-large border border-border-subtle bg-surface-elevated p-card shadow-subtle"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <PackageCheck
                          aria-hidden="true"
                          className="size-5 shrink-0 text-text-muted"
                        />

                        <h3 className="truncate font-semibold text-text-primary">
                          {
                            clientePacote
                              .pacote.nome
                          }
                        </h3>
                      </div>

                      {clientePacote
                        .pacote
                        .descricao && (
                        <p className="mt-2 text-body-small text-text-muted">
                          {
                            clientePacote
                              .pacote
                              .descricao
                          }
                        </p>
                      )}
                    </div>

                    <StatusBadge
                      tone={pacoteTone(
                        clientePacote.status,
                      )}
                    >
                      {pacoteStatusLabel(
                        clientePacote.status,
                      )}
                    </StatusBadge>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-3">
                    <div className="rounded-medium bg-surface-subtle p-3">
                      <p className="text-caption text-text-muted">
                        Total
                      </p>

                      <p className="mt-1 font-semibold text-text-primary">
                        {
                          clientePacote
                            .sessoesTotal
                        }
                      </p>
                    </div>

                    <div className="rounded-medium bg-surface-subtle p-3">
                      <p className="text-caption text-text-muted">
                        Usadas
                      </p>

                      <p className="mt-1 font-semibold text-text-primary">
                        {
                          clientePacote
                            .sessoesUsadas
                        }
                      </p>
                    </div>

                    <div className="rounded-medium bg-surface-subtle p-3">
                      <p className="text-caption text-text-muted">
                        Restantes
                      </p>

                      <p className="mt-1 font-semibold text-text-primary">
                        {
                          clientePacote
                            .sessoesRestantes
                        }
                      </p>
                    </div>
                  </div>

                  <dl className="mt-4 grid grid-cols-1 gap-2 text-body-small sm:grid-cols-2">
                    <div>
                      <dt className="text-text-muted">
                        Compra
                      </dt>

                      <dd className="font-medium text-text-primary">
                        {formatDate(
                          clientePacote
                            .dataCompra,
                        )}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-text-muted">
                        Validade
                      </dt>

                      <dd className="font-medium text-text-primary">
                        {formatDate(
                          clientePacote
                            .dataValidade,
                        )}
                      </dd>
                    </div>
                  </dl>
                </article>
              ),
            )}
          </div>
        )}
      </PageSection>
    </>
  );
}
