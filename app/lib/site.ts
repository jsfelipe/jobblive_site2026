const DEFAULT_SITE_URL = "https://jobblive.com.br";

export const DEFAULT_OG_IMAGE_PATH = "/assets/img/bg-hero.png";

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return (configuredUrl || DEFAULT_SITE_URL).replace(/\/+$/, "");
}

export function absoluteUrl(pathname: string) {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${getSiteUrl()}${normalizedPath}`;
}
