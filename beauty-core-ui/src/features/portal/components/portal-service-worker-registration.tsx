"use client";

import { useEffect } from "react";

export function PortalServiceWorkerRegistration() {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !("serviceWorker" in navigator)
    ) {
      return;
    }

    let cancelled = false;

    void navigator.serviceWorker
      .register("/sw.js", {
        scope: "/portal/",
        updateViaCache: "none",
      })
      .then((registration) => {
        if (cancelled) {
          return;
        }

        void registration.update();
        const updateTimer = window.setInterval(() => {
          void registration.update();
        }, 60 * 60 * 1000);
        window.addEventListener("beforeunload", () => {
          window.clearInterval(updateTimer);
        });
      })
      .catch(() => {
        // PWA is an enhancement; Portal auth must continue without SW.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
