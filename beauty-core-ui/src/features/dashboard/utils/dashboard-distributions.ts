export type DashboardDistributionItem = {
  label: string;
  total: number;
};

export function formatDistributionLabel(
  value: string,
): string {
  return value
    .toLocaleLowerCase("pt-BR")
    .split("_")
    .filter(Boolean)
    .map(
      (part) =>
        `${part.charAt(0).toLocaleUpperCase(
          "pt-BR",
        )}${part.slice(1)}`,
    )
    .join(" ");
}

export function buildDistributionRanking(
  distribution: Readonly<
    Record<string, number>
  >,
  limit = 5,
): DashboardDistributionItem[] {
  return Object.entries(distribution)
    .map(([label, total]) => ({
      label:
        formatDistributionLabel(label),
      total,
    }))
    .sort(
      (first, second) =>
        second.total - first.total ||
        first.label.localeCompare(
          second.label,
          "pt-BR",
        ),
    )
    .slice(0, limit);
}
