import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageContainerSize =
  | "default"
  | "wide"
  | "full";

type PageContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  size?: PageContainerSize;
};

const SIZE_CLASSES: Record<PageContainerSize, string> = {
  default: "max-w-6xl",
  wide: "max-w-7xl",
  full: "max-w-none",
};

export function PageContainer({
  children,
  className,
  size = "wide",
  ...props
}: PageContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 py-page-y sm:px-page-x lg:px-8",
        SIZE_CLASSES[size],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}