import { ClientesPacotesView } from "@/features/pacotes/clientes-pacotes/clientes-pacotes-view";
import { PacotesCatalogoView } from "@/features/pacotes/catalogo/pacotes-catalogo-view";

export default function PacotesPage() {
  return (
    <div className="grid gap-8">
      <PacotesCatalogoView />
      <ClientesPacotesView />
    </div>
  );
}