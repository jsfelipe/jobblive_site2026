import { Metadata } from "next";
import seoData from "../config/seo.json";
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_PATH,
  DEFAULT_OG_IMAGE_WIDTH,
  getSiteUrl,
} from "./site";

interface PageSeo {
  title: string;
  description: string;
  keywords: string[];
}

const NOINDEX_PATHS = new Set(["/teste-gratis/sucesso"]);

const typedSeoData = seoData as Record<string, PageSeo>;

export function getMetadataForPath(pathname: string): Metadata {
  const homeSeo = typedSeoData["/"];
  const pageSeo = typedSeoData[pathname] || homeSeo;
  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}${pathname === "/" ? "" : pathname}`;
  const title = pageSeo?.title || homeSeo?.title || "Jobb Live";
  const description =
    pageSeo?.description ||
    homeSeo?.description ||
    "Software de gestão para agências de marketing.";
  const imageUrl = absoluteUrl(DEFAULT_OG_IMAGE_PATH);
  const noindex = NOINDEX_PATHS.has(pathname);

  return {
    title,
    description,
    keywords: pageSeo?.keywords || [],
    ...(noindex
      ? {
          robots: {
            index: false,
            follow: false,
            googleBot: {
              index: false,
              follow: false,
            },
          },
        }
      : {}),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: canonicalUrl,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: DEFAULT_OG_IMAGE_WIDTH,
          height: DEFAULT_OG_IMAGE_HEIGHT,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
