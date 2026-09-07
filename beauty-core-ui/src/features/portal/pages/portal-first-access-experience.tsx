"use client";

import { PortalTermsConsent } from "./portal-terms-consent";

type PortalFirstAccessExperienceProps = {
  onComplete: () => Promise<void>;
};

export function PortalFirstAccessExperience({
  onComplete,
}: PortalFirstAccessExperienceProps) {
  return <PortalTermsConsent onAccept={onComplete} submitLabel="Concluir primeiro acesso" errorMessage="Não foi possível concluir o primeiro acesso. Tente novamente." />;
}
