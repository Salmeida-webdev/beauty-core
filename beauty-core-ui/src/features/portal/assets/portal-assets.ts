export type PortalAssetDefinition = {
  src: string;
};

export const portalAssets = {
  appointments: {
    illustration: {
      src: "/images/portal/appointments/portal-appointments.webp",
    },
  },
  auth: {
    accessUnavailable: {
      src: "/images/portal/auth/portal-access-unavailable.webp",
    },
    firstAccess: {
      src: "/images/portal/auth/portal-first-access.webp",
    },
    otpIllustration: {
      src: "/images/portal/auth/portal-otp-illustration.webp",
    },
  },
  backgrounds: {
    portal: {
      src: "/images/portal/backgrounds/portal-background.webp",
    },
  },
  benefits: {
    illustration: {
      src: "/images/portal/benefits/portal-benefits.webp",
    },
  },
  dashboard: {
    illustration: {
      src: "/images/portal/dashboard/portal-dashboard.webp",
    },
  },
  hero: {
    illustration: {
      src: "/images/portal/hero/portal-hero.webp",
    },
  },
  history: {
    illustration: {
      src: "/images/portal/history/portal-history.webp",
    },
  },
  identity: {
    keyVisual: {
      src: "/images/portal/identity/portal-key-visual.webp",
    },
  },
  legal: {
    privacy: {
      src: "/images/portal/legal/portal-privacy.webp",
    },
    terms: {
      src: "/images/portal/legal/portal-terms.webp",
    },
  },
  loyalty: {
    illustration: {
      src: "/images/portal/loyalty/portal-loyalty.webp",
    },
  },
  messages: {
    illustration: {
      src: "/images/portal/messages/portal-messages.webp",
    },
  },
  notifications: {
    illustration: {
      src: "/images/portal/notifications/portal-notifications.webp",
    },
  },
  onboarding: {
    illustration: {
      src: "/images/portal/onboarding/portal-onboarding.webp",
    },
  },
  packages: {
    illustration: {
      src: "/images/portal/packages/portal-packages.webp",
    },
  },
  placeholders: {
    default: {
      src: "/images/portal/placeholders/portal-placeholder.webp",
    },
  },
  profile: {
    illustration: {
      src: "/images/portal/profile/portal-profile.webp",
    },
  },
  pwa: {
    appIcon: {
      src: "/images/portal/pwa/portal-app-icon.png",
    },
    splash: {
      src: "/images/portal/pwa/portal-pwa-splash.webp",
    },
  },
  states: {
    empty: {
      src: "/images/portal/states/portal-empty-state.webp",
    },
    error: {
      src: "/images/portal/states/portal-error-state.webp",
    },
    offline: {
      src: "/images/portal/states/portal-offline.webp",
    },
    success: {
      src: "/images/portal/states/portal-success.webp",
    },
  },
} as const satisfies Record<string, unknown>;

export type PortalAssetKey = keyof typeof portalAssets;

export type PortalAsset =
  | (typeof portalAssets)["appointments"]["illustration"]
  | (typeof portalAssets)["auth"][keyof (typeof portalAssets)["auth"]]
  | (typeof portalAssets)["backgrounds"]["portal"]
  | (typeof portalAssets)["benefits"]["illustration"]
  | (typeof portalAssets)["dashboard"]["illustration"]
  | (typeof portalAssets)["hero"]["illustration"]
  | (typeof portalAssets)["history"]["illustration"]
  | (typeof portalAssets)["identity"]["keyVisual"]
  | (typeof portalAssets)["legal"][keyof (typeof portalAssets)["legal"]]
  | (typeof portalAssets)["loyalty"]["illustration"]
  | (typeof portalAssets)["messages"]["illustration"]
  | (typeof portalAssets)["notifications"]["illustration"]
  | (typeof portalAssets)["onboarding"]["illustration"]
  | (typeof portalAssets)["packages"]["illustration"]
  | (typeof portalAssets)["placeholders"]["default"]
  | (typeof portalAssets)["profile"]["illustration"]
  | (typeof portalAssets)["pwa"][keyof (typeof portalAssets)["pwa"]]
  | (typeof portalAssets)["states"][keyof (typeof portalAssets)["states"]];