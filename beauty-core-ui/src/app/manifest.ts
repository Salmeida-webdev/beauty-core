import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Portal do Cliente",
    short_name: "Portal",
    description:
      "Portal seguro para o cliente consultar seus dados, histórico, notificações e comunicações.",
    start_url: "/portal",
    scope: "/portal/",
    display: "standalone",
    background_color: "#F8F5F0",
    theme_color: "#8B6F47",
    icons: [
      {
        src: "/images/portal/pwa/portal-app-icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/portal/pwa/portal-app-icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/portal/pwa/portal-app-icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
