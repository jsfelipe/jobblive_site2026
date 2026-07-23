import { Metadata } from "next";
import seoData from "../config/seo.json";
import { absoluteUrl, DEFAULT_OG_IMAGE_PATH, getSiteUrl } from "./site";

interface PageSeo {
  title: string;
  description: string;
  keywords: string[];
}

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
    "Software de gestao para agencias de marketing.";
  const imageUrl = absoluteUrl(DEFAULT_OG_IMAGE_PATH);

  return {
    title,
    description,
    keywords: pageSeo?.keywords || [],
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
          width: 1200,
          height: 630,
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
