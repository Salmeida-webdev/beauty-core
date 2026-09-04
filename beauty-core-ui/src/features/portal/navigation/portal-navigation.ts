export type PortalNavigationItem = {
  href: string;
  label: string;
  enabled?: boolean;
};

export function isSafePortalHref(href: string): boolean {
  return href === "/portal" || href.startsWith("/portal/");
}

export function isPortalNavigationItemActive(
  href: string,
  activePath: string,
): boolean {
  if (href === "/portal") {
    return activePath === "/portal";
  }

  return activePath === href || activePath.startsWith(`${href}/`);
}