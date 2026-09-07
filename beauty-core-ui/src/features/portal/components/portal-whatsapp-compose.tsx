"use client";

import { FormEvent, useState } from "react";
import { useSendPortalWhatsappMessageMutation } from "@/features/portal/query/portal-messages-mutations";

export function PortalWhatsappCompose() {
  const mutation = useSendPortalWhatsappMessageMutation();
  const [tipo, setTipo] = useState("LEMBRETE_AGENDAMENTO");
  const [mensagem, setMensagem] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = mensagem.trim();

    if (!trimmed) {
      return;
    }

    mutation.mutate(
      {
        tipo,
        mensagem: trimmed,
      },
      {
        onSuccess: () => {
          setMensagem("");
        },
      },
    );
  }

  return (
    <form
      onSubmit={submit}
      className="mb-6 rounded-2xl border border-border bg-card p-5"
    >
      <h2 className="font-semibold">Enviar mensagem</h2>

      <p className="mt-2 text-sm text-muted-foreground">
        A mensagem será enviada para o telefone cadastrado no seu perfil.
      </p>

      <label className="mt-4 block text-sm font-medium" htmlFor="portal-tipo">
        Tipo
      </label>
      <input
        id="portal-tipo"
        value={tipo}
        onChange={(event) => setTipo(event.target.value)}
        className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
        required
      />

      <label
        className="mt-4 block text-sm font-medium"
        htmlFor="portal-mensagem"
      >
        Mensagem
      </label>
      <textarea
        id="portal-mensagem"
        value={mensagem}
        onChange={(event) => setMensagem(event.target.value)}
        minLength={1}
        maxLength={1000}
        rows={4}
        className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
        required
      />

      {mutation.isError ? (
        <p role="alert" className="mt-3 text-sm text-destructive">
          Não foi possível preparar o envio da mensagem.
        </p>
      ) : null}

      {mutation.isSuccess ? (
        <p className="mt-3 text-sm text-muted-foreground">
          Mensagem registrada para envio.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={mutation.isPending || !mensagem.trim()}
        className="mt-4 rounded-xl bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50"
      >
        {mutation.isPending ? "Enviando..." : "Enviar mensagem"}
      </button>
    </form>
  );
}
