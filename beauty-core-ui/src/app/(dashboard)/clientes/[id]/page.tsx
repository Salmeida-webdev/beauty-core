import {
  ClienteProfileView,
} from "@/features/clientes/components/cliente-profile-view";

type ClienteProfilePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ClienteProfilePage({
  params,
}: ClienteProfilePageProps) {
  const {
    id,
  } = await params;

  return (
    <ClienteProfileView
      clienteId={id}
    />
  );
}
