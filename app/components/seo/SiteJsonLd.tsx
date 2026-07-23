import React from "react";
import contactsData from "../../config/contacts.json";
import themeData from "../../config/theme.json";
import { absoluteUrl, getSiteUrl } from "../../lib/site";
import JsonLd from "./JsonLd";

/**
 * Schema global Organization + WebSite + SoftwareApplication (sitewide).
 */
export default function SiteJsonLd() {
  const siteUrl = getSiteUrl();
  const logoPath = themeData.logoLight || "/assets/img/jobb-live-logotipo-light.svg";
  const email = contactsData.email || "contato@jobblive.com.br";
  const sameAs = [
    contactsData.instagram,
    contactsData.linkedin,
    contactsData.facebook,
    contactsData.tiktok,
    contactsData.youtube,
  ].filter((url): url is string => Boolean(url && url.trim()));

  const data = {
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Jobb Live",
        url: siteUrl,
        email,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl(logoPath),
        },
        ...(sameAs.length > 0 ? { sameAs } : {}),
        ...(contactsData.phone
          ? {
              contactPoint: {
                "@type": "ContactPoint",
                telephone: `+55${contactsData.phone}`,
                contactType: "customer support",
                availableLanguage: ["Portuguese"],
              },
            }
          : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Jobb Live",
        description:
          "Software de gestão para agências de marketing, live marketing, publicidade e eventos.",
        inLanguage: "pt-BR",
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/#software`,
        name: "Jobb Live",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: siteUrl,
        description:
          "Sistema de gestão integrado para agências: projetos, orçamentos, tarefas e financeiro.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "BRL",
          description: "Teste grátis de 7 dias",
          url: absoluteUrl("/teste-gratis"),
        },
        provider: {
          "@id": `${siteUrl}/#organization`,
        },
      },
    ],
  };

  return <JsonLd data={data} />;
}
