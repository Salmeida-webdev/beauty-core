"use client";

import { useId, type ComponentProps, type ReactNode } from "react";

import { portalAssets } from "../assets/portal-assets";
import { PortalAssetImage } from "../components/portal-asset-image";

export type PortalStateKind =
  | "loading"
  | "empty"
  | "error"
  | "offline"
  | "success"
  | "access-unavailable";

type PortalAsset = ComponentProps<typeof PortalAssetImage>["asset"];

export type PortalStatePanelProps = {
  kind: PortalStateKind;
  title: string;
  description: string;
  asset: PortalAsset;
  assetAlt?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  children?: ReactNode;
};

type PortalStateContentProps = Omit<
  PortalStatePanelProps,
  "kind" | "asset"
>;

export function PortalStatePanel({
  kind,
  title,
  description,
  asset,
  assetAlt,
  action,
  children,
}: PortalStatePanelProps) {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <section
      aria-describedby={descriptionId}
      aria-labelledby={titleId}
      className="mx-auto flex w-full max-w-xl flex-col items-center justify-center gap-5 rounded-xl border border-border/80 bg-card/80 px-5 py-8 text-center shadow-sm sm:px-8 sm:py-10"
      data-portal-state={kind}
    >
      <PortalAssetImage
        alt={assetAlt ?? ""}
        asset={asset}
        decorative={!assetAlt}
        height={220}
        sizes="(max-width: 640px) 80vw, 320px"
        width={320}
      />

      <div className="space-y-2">
        <h2
          className="text-xl font-semibold tracking-tight text-foreground"
          id={titleId}
        >
          {title}
        </h2>

        <p
          className="text-sm leading-6 text-muted-foreground sm:text-base"
          id={descriptionId}
        >
          {description}
        </p>
      </div>

      {children}

      {action ? (
        <button
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors motion-reduce:transition-none hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onClick={action.onClick}
          type="button"
        >
          {action.label}
        </button>
      ) : null}
    </section>
  );
}

export function PortalLoadingState(props: PortalStateContentProps) {
  return (
    <PortalStatePanel
      {...props}
      asset={portalAssets.states.empty}
      kind="loading"
    />
  );
}

export function PortalEmptyState(props: PortalStateContentProps) {
  return (
    <PortalStatePanel
      {...props}
      asset={portalAssets.states.empty}
      kind="empty"
    />
  );
}

export function PortalErrorState(props: PortalStateContentProps) {
  return (
    <PortalStatePanel
      {...props}
      asset={portalAssets.states.error}
      kind="error"
    />
  );
}

export function PortalOfflineState(props: PortalStateContentProps) {
  return (
    <PortalStatePanel
      {...props}
      asset={portalAssets.states.offline}
      kind="offline"
    />
  );
}

export function PortalSuccessState(props: PortalStateContentProps) {
  return (
    <PortalStatePanel
      {...props}
      asset={portalAssets.states.success}
      kind="success"
    />
  );
}

export function PortalAccessUnavailableState(
  props: PortalStateContentProps,
) {
  return (
    <PortalStatePanel
      {...props}
      asset={portalAssets.auth.accessUnavailable}
      kind="access-unavailable"
    />
  );
}
