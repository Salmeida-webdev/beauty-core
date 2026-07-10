const FOUNDATION_ITEMS = [
  "Next.js App Router",
  "TypeScript estrito",
  "Tailwind CSS e shadcn/ui",
  "TanStack Query e Axios",
  "Autenticação e refresh rotativo",
  "Roles e permissões administrativas",
  "Tenant e white-label",
  "Vitest e Playwright",
] as const;

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6 sm:p-10">
      <section
        aria-labelledby="foundation-title"
        className="w-full max-w-3xl rounded-2xl border bg-card p-6 text-card-foreground shadow-sm sm:p-10"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Beauty Core 1.0
        </p>

        <h1
          id="foundation-title"
          className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          Fundação do frontend pronta
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          Arquitetura administrativa preparada para o desenvolvimento
          progressivo dos módulos do SaaS, sem antecipar o Design System
          definitivo do Chat 45.
        </p>

        <ul
          aria-label="Recursos configurados"
          className="mt-8 grid gap-3 sm:grid-cols-2"
        >
          {FOUNDATION_ITEMS.map((item) => (
            <li
              key={item}
              className="rounded-lg border bg-background px-4 py-3 text-sm font-medium"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
