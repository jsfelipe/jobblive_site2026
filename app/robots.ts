import { MetadataRoute } from "next";
import { getSiteUrl } from "./lib/site";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/teste-gratis/sucesso",
          "/segmentos/agencia-de-publicidade",
          "/segmentos/agencia-de-trade-marketing",
        ],
      },
      {
        userAgent: [
          "GPTBot",
          "ClaudeBot",
          "Google-Extended",
          "Applebot-Extended",
        ],
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/teste-gratis/sucesso",
          "/segmentos/agencia-de-publicidade",
          "/segmentos/agencia-de-trade-marketing",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
