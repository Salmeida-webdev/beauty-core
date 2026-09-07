import Image from "next/image";

type AgendaCalendarEmptyProps = {
  filtered?: boolean;
};

export function AgendaCalendarEmpty({
  filtered = false,
}: AgendaCalendarEmptyProps) {
  return (
    <div
      data-testid="agenda-calendar-empty"
      className="flex min-h-80 flex-col items-center justify-center gap-4 px-6 py-10 text-center"
    >
      <Image
        src="/images/empty-states/beauty-core-agendamentos-empty.webp"
        alt=""
        width={240}
        height={180}
        className="h-auto w-44 sm:w-52"
      />

      <div className="max-w-md">
        <h3 className="font-semibold text-foreground">
          {filtered
            ? "Nenhum resultado para os filtros"
            : "Nenhum agendamento neste periodo"}
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          {filtered
            ? "Altere os filtros para consultar outros agendamentos."
            : "Quando houver agendamentos neste periodo, eles aparecerao aqui."}
        </p>
      </div>
    </div>
  );
}