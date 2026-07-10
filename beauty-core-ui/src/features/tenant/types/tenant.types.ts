export type TenantBranding = {
  logoUrl: string | null;
  faviconUrl: string | null;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
};

export type TenantPublicSettings = {
  allowDarkMode: boolean;
  showPoweredByBeautyCore: boolean;
};

export type TenantPublicConfig = {
  id: string | null;
  name: string;
  slug: string;
  domain: string | null;
  locale: "pt-BR";
  branding: TenantBranding;
  settings: TenantPublicSettings;
};
