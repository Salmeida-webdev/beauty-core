import { Suspense } from "react";

import { LoadingState } from "@/components/states/feedback-states";
import { AgendaView } from "@/features/agendamentos/components/agenda-view";

export default function AgendaPage() {
  return (
    <Suspense
      fallback={
        <div className="p-page">
          <LoadingState />
        </div>
      }
    >
      <AgendaView />
    </Suspense>
  );
}