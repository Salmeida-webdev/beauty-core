import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";

type PortalPageContainerProps = {
  children: ReactNode;
};

export function PortalPageContainer({
  children,
}: PortalPageContainerProps) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 items-start justify-center">
      <Card className="w-full border-border/80 bg-card/95 shadow-sm">
        <CardContent className="p-6 sm:p-8 lg:p-10">
          {children}
        </CardContent>
      </Card>
    </div>
  );
}