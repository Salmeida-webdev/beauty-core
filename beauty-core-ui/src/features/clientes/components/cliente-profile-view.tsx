"use client";

import {
  useRef,
  useState,
} from "react";
import {
  ArrowLeft,
  Ban,
  CalendarDays,
  Camera,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  Mail,
  Pencil,
  Phone,
  UserRound,
} from "lucide-react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Link from "next/link";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { toast } from "sonner";

import {
  PageContainer,
} from "@/components/layout/page-container";
import {
  PageHeader,
} from "@/components/layout/page-header";
import {
  PageSection,
} from "@/components/layout/page-section";
import {
  ErrorState,
  LoadingState,
  PermissionState,
} from "@/components/states/feedback-states";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  StatusBadge,
} from "@/components/ui/status-badge";
import {
  ClienteFormDialog,
} from "@/features/clientes/components/cliente-form-dialog";
import {
  ClienteLgpdActions,
} from "@/features/clientes/components/cliente-lgpd-actions";
import {
  ClienteProfileExtras,
} from "@/features/clientes/components/cliente-profile-extras";
import {
  canAccessClientes,
  canManageClientes,
  canUploadClientePhoto,
  canUseClienteLgpd,
} from "@/features/clientes/permissions/clientes-permissions";
import {
  clienteProfileKeys,
} from "@/features/clientes/queries/cliente-profile-keys";
import {
  clientesKeys,
} from "@/features/clientes/queries/clientes-keys";
import {
  clientesQueryOptions,
} from "@/features/clientes/queries/clientes-query-options";
import {
  inativarCliente,
  uploadClienteFoto,
} from "@/features/clientes/services/clientes-api";
import type {
  Cliente,
} from "@/features/clientes/types/clientes.types";
import {
  buildClientesListHref,
  parseClientesListSearchParams,
} from "@/features/clientes/utils/clientes-list-url";
import {
  normalizeApiError,
} from "@/services/api/normalize-api-error";
import {
  useAuthStore,
} from "@/stores/auth-store";

type ClienteProfileViewProps = {
  clienteId: string;
};

type DetailItemProps = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

function DetailItem({
  label,
  value,
  icon,
}: DetailItemProps) {
  return (
    <div className="min-w-0 rounded-medium border border-border-subtle bg-surface-subtle/40 p-3">
      <div className="flex items-center gap-2 text-caption font-medium text-text-muted">
        {icon}
        <span>
          {label}
        </span>
      </div>

      <p className="mt-1 break-words text-body-small font-medium text-text-primary">
        {value}
      </p>
    </div>
  );
}

function getInitials(
  nome: string,
): string {
  const parts = nome
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) {
    return "?";
  }

  if (parts.length === 1) {
    return parts[0]
      .slice(0, 2)
      .toUpperCase();
  }

  return (
    parts[0][0] +
    parts[parts.length - 1][0]
  ).toUpperCase();
}

function ClienteAvatar({
  cliente,
}: {
  cliente: Cliente;
}) {
  const photoUrl = cliente.foto;

  const [
    failedPhotoUrl,
    setFailedPhotoUrl,
  ] = useState<string | null>(null);

  const hasPhoto =
    Boolean(photoUrl) &&
    failedPhotoUrl !== photoUrl;

  return (
    <div
      data-testid="cliente-avatar"
      role="img"
      aria-label={
        hasPhoto
          ? `Foto de ${cliente.nome}`
          : `Iniciais de ${cliente.nome}`
      }
      className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-subtle text-heading-4 font-semibold text-text-primary"
    >
      {hasPhoto ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photoUrl ?? ""}
          alt=""
          className="absolute inset-0 size-full object-cover"
          onError={() => {
            setFailedPhotoUrl(photoUrl);
          }}
        />
      ) : (
        <span>
          {getInitials(
            cliente.nome,
          )}
        </span>
      )}
    </div>
  );
}

function formatDateOnly(
  value: string | null,
): string {
  if (!value) {
    return "Não informado";
  }

  const match =
    /^(\d{4})-(\d{2})-(\d{2})/.exec(
      value,
    );

  if (!match) {
    return "Não informado";
  }

  return `${match[3]}/${match[2]}/${match[1]}`;
}

function formatDateTime(
  value: string | null,
): string {
  if (!value) {
    return "Não informado";
  }

  const date = new Date(value);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return "Não informado";
  }

  return new Intl.DateTimeFormat(
    "pt-BR",
    {
      dateStyle: "short",
      timeStyle: "short",
    },
  ).format(date);
}

function ClienteProfileContent({
  cliente,
  canManage,
  canUploadPhoto,
  onEdit,
  onPhotoSelected,
  photoPending,
  inactivateOpen,
  inactivatePending,
  onInactivate,
  onInactivateOpenChange,
}: {
  cliente: Cliente;
  canManage: boolean;
  canUploadPhoto: boolean;
  onEdit: () => void;
  onPhotoSelected: (file: File) => void;
  photoPending: boolean;
  inactivateOpen: boolean;
  inactivatePending: boolean;
  onInactivate: () => void;
  onInactivateOpenChange: (
    open: boolean,
  ) => void;
}) {
  const photoInputRef =
    useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-section">
      <div className="flex flex-col gap-4 rounded-large border border-border-subtle bg-surface-elevated p-card shadow-subtle sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <ClienteAvatar
            cliente={cliente}
          />

          <div className="min-w-0">
            <h2 className="truncate text-heading-3 font-semibold text-text-primary">
              {cliente.nome}
            </h2>

            <div className="mt-2 flex flex-wrap gap-2">
              <StatusBadge tone="success">
                Cliente ativo
              </StatusBadge>

              <StatusBadge
                tone={
                  cliente.ativoPortal
                    ? "info"
                    : "neutral"
                }
              >
                {cliente.ativoPortal
                  ? "Portal ativo"
                  : "Portal inativo"}
              </StatusBadge>
            </div>

            {canUploadPhoto && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  aria-label="Selecionar foto do cliente"
                  disabled={photoPending}
                  onChange={(event) => {
                    const file =
                      event.currentTarget.files?.[0] ??
                      null;

                    event.currentTarget.value = "";

                    if (file) {
                      onPhotoSelected(file);
                    }
                  }}
                />

                <Button
                  type="button"
                  variant="outline"
                  disabled={photoPending}
                  aria-busy={photoPending}
                  onClick={() => {
                    photoInputRef.current?.click();
                  }}
                >
                  {photoPending ? (
                    <LoaderCircle
                      aria-hidden="true"
                      className="size-4 animate-spin"
                    />
                  ) : (
                    <Camera
                      aria-hidden="true"
                      className="size-4"
                    />
                  )}

                  {photoPending
                    ? "Enviando foto..."
                    : cliente.foto
                      ? "Alterar foto"
                      : "Adicionar foto"}
                </Button>
              </div>
            )}
          </div>
        </div>

        {canManage && (
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onEdit}
            >
              <Pencil
                aria-hidden="true"
              />
              Editar cliente
            </Button>

            <AlertDialog
              open={inactivateOpen}
              onOpenChange={
                onInactivateOpenChange
              }
            >
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant="destructive"
                  disabled={inactivatePending}
                  aria-busy={inactivatePending}
                >
                  <Ban
                    aria-hidden="true"
                  />
                  Inativar cliente
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Inativar cliente?
                  </AlertDialogTitle>

                  <AlertDialogDescription>
                    {cliente.nome} deixará de aparecer na gestão ativa.
                    Os dados cadastrados não serão apagados.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel
                    disabled={inactivatePending}
                  >
                    Cancelar
                  </AlertDialogCancel>

                  <AlertDialogAction asChild>
                    <Button
                      type="button"
                      variant="destructive"
                      disabled={inactivatePending}
                      aria-busy={inactivatePending}
                      onClick={(event) => {
                        event.preventDefault();
                        onInactivate();
                      }}
                    >
                      {inactivatePending ? (
                        <LoaderCircle
                          aria-hidden="true"
                          className="size-4 animate-spin"
                        />
                      ) : (
                        <Ban
                          aria-hidden="true"
                          className="size-4"
                        />
                      )}

                      {inactivatePending
                        ? "Inativando..."
                        : "Confirmar inativação"}
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>

      <PageSection
        title="Dados pessoais"
        description="Informações administrativas registradas para este cliente."
      >
        <div className="grid grid-cols-1 gap-grid md:grid-cols-2 xl:grid-cols-3">
          <DetailItem
            label="Nome"
            value={cliente.nome}
            icon={
              <UserRound
                aria-hidden="true"
                className="size-4"
              />
            }
          />

          <DetailItem
            label="Telefone"
            value={
              cliente.telefone
            }
            icon={
              <Phone
                aria-hidden="true"
                className="size-4"
              />
            }
          />

          <DetailItem
            label="E-mail"
            value={
              cliente.email ??
              "Não informado"
            }
            icon={
              <Mail
                aria-hidden="true"
                className="size-4"
              />
            }
          />

          <DetailItem
            label="Data de nascimento"
            value={formatDateOnly(
              cliente.dataNascimento,
            )}
            icon={
              <CalendarDays
                aria-hidden="true"
                className="size-4"
              />
            }
          />

          <DetailItem
            label="Criado em"
            value={formatDateTime(
              cliente.createdAt,
            )}
            icon={
              <Clock3
                aria-hidden="true"
                className="size-4"
              />
            }
          />

          <DetailItem
            label="Última atualização"
            value={formatDateTime(
              cliente.updatedAt,
            )}
            icon={
              <Clock3
                aria-hidden="true"
                className="size-4"
              />
            }
          />
        </div>
      </PageSection>

      <PageSection
        title="Portal e consentimento"
        description="Estado informativo do acesso do cliente e do aceite de termos."
      >
        <div className="grid grid-cols-1 gap-grid md:grid-cols-3">
          <DetailItem
            label="Portal"
            value={
              cliente.ativoPortal
                ? "Ativo"
                : "Inativo"
            }
            icon={
              <CheckCircle2
                aria-hidden="true"
                className="size-4"
              />
            }
          />

          <DetailItem
            label="Aceite de termos"
            value={
              cliente.aceitouTermos
                ? "Aceito"
                : "Não aceito"
            }
            icon={
              <CheckCircle2
                aria-hidden="true"
                className="size-4"
              />
            }
          />

          <DetailItem
            label="Data do aceite"
            value={formatDateTime(
              cliente.dataAceiteTermos,
            )}
            icon={
              <Clock3
                aria-hidden="true"
                className="size-4"
              />
            }
          />

          <DetailItem
            label="Último acesso ao portal"
            value={formatDateTime(
              cliente.ultimoAcessoPortal,
            )}
            icon={
              <Clock3
                aria-hidden="true"
                className="size-4"
              />
            }
          />
        </div>
      </PageSection>

      <ClienteProfileExtras
        clienteId={cliente.id}
        enabled
      />

      <PageSection
        title="Observações"
        description="Anotações administrativas do cadastro."
      >
        <div className="rounded-large border border-border-subtle bg-surface-elevated p-card shadow-subtle">
          <p className="whitespace-pre-wrap text-body-small text-text-primary">
            {cliente.observacoes ??
              "Nenhuma observação cadastrada."}
          </p>
        </div>
      </PageSection>
    </div>
  );
}

export function ClienteProfileView({
  clienteId,
}: ClienteProfileViewProps) {
  const router = useRouter();
  const queryClient =
    useQueryClient();

  const searchParams =
    useSearchParams();

  const status = useAuthStore(
    (state) => state.status,
  );

  const user = useAuthStore(
    (state) => state.user,
  );

  const [
    editOpen,
    setEditOpen,
  ] = useState(false);

  const [
    inactivateOpen,
    setInactivateOpen,
  ] = useState(false);

  const canAccess =
    status === "authenticated" &&
    user !== null &&
    canAccessClientes(
      user.role,
    );

  const canManage =
    status === "authenticated" &&
    user !== null &&
    canManageClientes(
      user.role,
    );

  const canUploadPhoto =
    status === "authenticated" &&
    user !== null &&
    canUploadClientePhoto(
      user.role,
    );

  const canUseLgpd =
    status === "authenticated" &&
    user !== null &&
    canUseClienteLgpd(
      user.role,
    );

  const clienteQuery = useQuery(
    clientesQueryOptions.detail(
      clienteId,
      canAccess,
    ),
  );

  const returnState =
    parseClientesListSearchParams(
      searchParams,
    );

  const returnHref =
    buildClientesListHref(
      returnState,
    );

  const uploadPhotoMutation =
    useMutation({
      mutationFn: (file: File) =>
        uploadClienteFoto(
          clienteId,
          file,
        ),
      retry: false,
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: clientesKeys.detail(
            clienteId,
          ),
        });

        toast.success(
          "Foto do cliente atualizada com sucesso.",
        );
      },
      onError: (error) => {
        const normalized =
          normalizeApiError(
            error,
          );

        toast.error(
          normalized.message,
        );
      },
    });

  const inactivateMutation =
    useMutation({
      mutationFn: () =>
        inativarCliente(
          clienteId,
        ),
      retry: false,
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: clientesKeys.lists(),
        });

        queryClient.removeQueries({
          queryKey: clientesKeys.detail(
            clienteId,
          ),
          exact: true,
        });

        queryClient.removeQueries({
          queryKey: clienteProfileKeys.cliente(
            clienteId,
          ),
        });

        setInactivateOpen(false);

        toast.success(
          "Cliente inativado com sucesso.",
        );

        router.replace(
          returnHref,
        );
      },
      onError: (error) => {
        const normalized =
          normalizeApiError(
            error,
          );

        toast.error(
          normalized.message,
        );
      },
    });

  const isRestoring =
    status === "idle" ||
    status === "restoring";

  const normalizedError =
    clienteQuery.error
      ? normalizeApiError(
          clienteQuery.error,
        )
      : null;

  const isNotFound =
    normalizedError?.statusCode ===
    404;

  const isForbidden =
    normalizedError?.statusCode ===
    403;

  return (
    <PageContainer
      size="wide"
      data-testid="cliente-profile-page"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button
          asChild
          variant="ghost"
        >
          <Link
            href={returnHref}
            aria-label="Voltar para clientes"
          >
            <ArrowLeft
              aria-hidden="true"
            />
            Voltar para clientes
          </Link>
        </Button>
      </div>

      <PageHeader
        eyebrow="Perfil 360º"
        title={
          clienteQuery.data?.nome ??
          "Cliente"
        }
        description="Visão administrativa centralizada dos dados disponíveis para este cliente."
        meta={
          clienteQuery.data
            ? "Cadastro ativo"
            : "Gestão de clientes"
        }
      />

      {isRestoring ? (
        <LoadingState />
      ) : user === null ||
        !canAccess ||
        isForbidden ? (
        <PermissionState
          description="Seu perfil não possui permissão para acessar este cliente."
        />
      ) : clienteQuery.isPending ? (
        <LoadingState />
      ) : isNotFound ? (
        <ErrorState
          title="Cliente não encontrado"
          description="O cliente informado não existe, está inativo ou não está disponível para esta empresa."
        />
      ) : clienteQuery.isError ? (
        <ErrorState
          title="Não foi possível carregar o cliente"
          description={
            normalizedError?.message ??
            "Não foi possível carregar os dados do cliente."
          }
          onRetry={() => {
            void clienteQuery.refetch();
          }}
        />
      ) : clienteQuery.data ? (
        <>
          <ClienteProfileContent
            cliente={
              clienteQuery.data
            }
            canManage={
              canManage
            }
            canUploadPhoto={
              canUploadPhoto
            }
            onEdit={() => {
              setEditOpen(
                true,
              );
            }}
            onPhotoSelected={(file) => {
              uploadPhotoMutation.mutate(
                file,
              );
            }}
            photoPending={
              uploadPhotoMutation.isPending
            }
            inactivateOpen={
              inactivateOpen
            }
            inactivatePending={
              inactivateMutation.isPending
            }
            onInactivate={() => {
              inactivateMutation.mutate();
            }}
            onInactivateOpenChange={
              setInactivateOpen
            }
          />

          <ClienteLgpdActions
            clienteId={
              clienteQuery.data.id
            }
            clienteNome={
              clienteQuery.data.nome
            }
            returnHref={
              returnHref
            }
            enabled={
              canUseLgpd
            }
          />

          <ClienteFormDialog
            mode="edit"
            cliente={
              clienteQuery.data
            }
            open={editOpen}
            onOpenChange={
              setEditOpen
            }
          />
        </>
      ) : null}
    </PageContainer>
  );
}
