import Image from "next/image";

import type { PortalAssetDefinition } from "../assets/portal-assets";

type PortalAssetImageProps = {
  asset: PortalAssetDefinition;
  alt: string;
  decorative?: boolean;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
  loading?: "eager" | "lazy";
  className?: string;
};

export function PortalAssetImage({
  asset,
  alt,
  decorative = false,
  width,
  height,
  sizes,
  priority = false,
  loading,
  className,
}: PortalAssetImageProps) {
  return (
    <Image
      loading={loading}
      alt={decorative ? "" : alt}
      className={className}
      height={height}
      priority={priority}
      sizes={sizes}
      src={asset.src}
      width={width}
    />
  );
}
