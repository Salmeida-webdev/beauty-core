import Link from "next/link";

import { portalNavigationItems } from "../navigation/portal-navigation-config";
import {
  isPortalNavigationItemActive,
  isSafePortalHref,
  type PortalNavigationItem,
} from "../navigation/portal-navigation";

const navigationLabel = "Navega\u00e7\u00e3o principal";

type PortalNavigationProps = {
  activePath?: string;
  items?: readonly PortalNavigationItem[];
};

export function PortalNavigation({
  activePath = "/portal",
  items = portalNavigationItems,
}: PortalNavigationProps) {
  const safeItems = items.filter(
    (item) => item.enabled !== false && isSafePortalHref(item.href),
  );

  if (safeItems.length === 0) {
    return null;
  }

  return (
    <>
      <nav
        aria-label={navigationLabel}
        className="hidden md:block"
      >
        <ul className="flex items-center gap-1">
          {safeItems.map((item) => {
            const active = isPortalNavigationItemActive(
              item.href,
              activePath,
            );

            return (
              <li key={item.href}>
                <Link
                  aria-current={active ? "page" : undefined}
                  className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors motion-reduce:transition-none hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <nav
        aria-label={navigationLabel}
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] shadow-lg backdrop-blur md:hidden"
      >
        <ul className="mx-auto flex min-h-16 w-full max-w-6xl items-stretch justify-around px-2">
          {safeItems.map((item) => {
            const active = isPortalNavigationItemActive(
              item.href,
              activePath,
            );

            return (
              <li className="flex flex-1" key={item.href}>
                <Link
                  aria-current={active ? "page" : undefined}
                  className="flex min-h-11 flex-1 items-center justify-center rounded-md px-2 text-center text-xs font-medium text-muted-foreground transition-colors motion-reduce:transition-none hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
