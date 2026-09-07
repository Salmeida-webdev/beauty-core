"use client";

import { useSearchParams } from "next/navigation";

import { FidelidadeOperacionalView } from "@/features/fidelidade/components/fidelidade-operacional-view";

export default function FidelidadePage() {
  const searchParams = useSearchParams();

  return (
    <FidelidadeOperacionalView
      clienteId={searchParams.get("clienteId")}
    />
  );
}
