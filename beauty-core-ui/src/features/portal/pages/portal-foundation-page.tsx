import { portalAssets } from "../assets/portal-assets";
import { PortalAssetImage } from "../components/portal-asset-image";
import { PortalPageContainer } from "../components/portal-page-container";

const portalDescription =
  "Acesse futuramente sua experi\u00eancia personalizada com a empresa.";

const portalHeading =
  "Sua experi\u00eancia personalizada come\u00e7a aqui";

export function PortalFoundationPage() {
  return (
    <PortalPageContainer>
      <div className="space-y-6">
        <PortalAssetImage
          alt=""
          asset={portalAssets.identity.keyVisual}
          decorative
          height={1200}
          priority
          sizes="(max-width: 768px) 100vw, 768px"
          width={1800}
          className="h-auto max-h-64 w-full rounded-lg object-cover"
        />

        <div className="space-y-4">
          <p className="text-sm font-medium text-muted-foreground">
            Portal do cliente
          </p>

          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {portalHeading}
          </h1>

          <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            {portalDescription}
          </p>
        </div>
      </div>
    </PortalPageContainer>
  );
}