import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/layout/Footer";
import SegmentHero from "../../components/ui/SegmentHero";
import { segmentosData } from "../../config/segmentos";
import JsonLd from "../../components/seo/JsonLd";
import contactsData from "../../config/contacts.json";
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_PATH,
  DEFAULT_OG_IMAGE_WIDTH,
  getSiteUrl,
} from "../../lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

// Gera os parâmetros estáticos para compilação prévia das 8 páginas (SEO/GEO instantâneo)
export async function generateStaticParams() {
  return Object.keys(segmentosData).map((slug) => ({
    slug,
  }));
}

// Gera metadados dinâmicos de SEO baseados no segmento
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = segmentosData[slug];

  if (!data) {
    return {
      title: "Segmento não encontrado | Jobb Live",
    };
  }

  const siteUrl = getSiteUrl();
  const imageUrl = absoluteUrl(DEFAULT_OG_IMAGE_PATH);

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: {
      canonical: `${siteUrl}/segmentos/${slug}`,
    },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: `${siteUrl}/segmentos/${slug}`,
      title: data.metaTitle,
      description: data.metaDescription,
      images: [
        {
          url: imageUrl,
          width: DEFAULT_OG_IMAGE_WIDTH,
          height: DEFAULT_OG_IMAGE_HEIGHT,
          alt: data.metaTitle,
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: data.metaTitle,
      description: data.metaDescription,
      images: [imageUrl],
    }
  };
}

// Ícone X de Alerta para Dores
const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-6 h-6 text-primary-500 fill-current">
    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm37.66-133.66a8,8,0,0,1,0,11.32L139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35A8,8,0,0,1,165.66,82.34Z" />
  </svg>
);

// Ícone de Check para Benefícios
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-6 h-6 text-primary-500 fill-current">
    <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
  </svg>
);

// Ícone de Estrela para Funcionalidades
const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-6 h-6 text-primary-500 fill-current">
    <path d="M234.5,114.85l-45,38.89,13.51,58.63a16,16,0,0,1-23.84,17.34l-51.17-31-51.17,31a16,16,0,0,1-23.84-17.34L66.5,153.74l-45-38.89A16,16,0,0,1,30.49,87.48l59.83-5.18L113.63,27a16,16,0,0,1,28.74,0l23.31,55.27,59.83,5.18A16,16,0,0,1,234.5,114.85Zm-14.89-13.06-59.83-5.18a8,8,0,0,1-6.73-4.89L130,36.45a.15.15,0,0,0-.07-.09h0a.14.14,0,0,0-.07.09L106.51,91.72a8,8,0,0,1-6.73,4.89l-59.83,5.18a.14.14,0,0,0-.09.07h0a.15.15,0,0,0,.09.07l45,38.89a8,8,0,0,1,2.5,7.71L73.89,207.18a.15.15,0,0,0,.08.15h0a.15.15,0,0,0,.15,0l51.17-31a8,8,0,0,1,8.42,0l51.17,31a.15.15,0,0,0,.15,0h0a.15.15,0,0,0,.08-.15l-13.51-58.63a8,8,0,0,1,2.5-7.71l45-38.89a.15.15,0,0,0,.09-.07h0A.14.14,0,0,0,219.61,101.79Z" />
  </svg>
);

export default async function SegmentoPage({ params }: Props) {
  const { slug } = await params;
  const data = segmentosData[slug];

  if (!data) {
    notFound();
  }

  // Gera o Schema de Produto focado no segmento para motores de IA (GEO)
  const productSchema = {
    "@type": "Product",
    "name": `JobbLive — Sistema de Gestão para ${data.name}`,
    "description": data.metaDescription,
    "category": "Software de Gestão / ERP",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "BRL",
      "price": "0.00",
      "priceValuedOnly": "false"
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-foreground">
      {/* Injeta dados estruturados */}
      <JsonLd data={productSchema} />

      <Navbar />

      {/* Hero Section */}
      <SegmentHero
        name={data.name}
        heroTitle={data.heroTitle}
        heroSubtitle={data.heroSubtitle}
        whatsappLink={contactsData.whatsappLink}
      />

      {/* Seção Dores / Desafios */}
      <section className="py-20 md:py-28 bg-secondary-50">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-overline text-primary-500 font-normal tracking-widest uppercase mb-4 text-pretty">
              Desafios Diários
            </p>
            <h2 className="text-2xl md:text-4xl lg:text-4xl font-display font-normal text-foreground text-pretty tracking-tightest mb-4">
              Gerenciar uma {data.name} sem o sistema correto é um desafio constante
            </h2>
            <p className="text-body-lg text-foreground/60 text-pretty">
              Se a sua rotina operacional é engolida por planilhas e processos manuais, você provavelmente enfrenta estes problemas:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {data.painPoints.map((point, idx) => (
              <div key={idx} className="flex flex-col bg-white p-8 rounded-none">
                <div className="text-primary-500 mb-4 shrink-0">
                  <XIcon />
                </div>
                <h3 className="text-xl font-display font-normal text-foreground mb-3 text-pretty leading-snug">
                  {point.title}
                </h3>
                <p className="text-body-md text-foreground/70 text-pretty leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Como Resolvemos / Benefícios */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-overline text-primary-500 font-normal tracking-widest uppercase mb-4 text-pretty">
              A Solução Integrada
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-normal text-foreground text-pretty tracking-tightest mb-4">
              Como a JobbLive transforma a sua rotina operacional
            </h2>
            <p className="text-body-lg text-foreground/60 text-pretty">
              Substitua dezenas de ferramentas desconectadas por um único sistema centralizado focado na sua rentabilidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {data.benefits.map((benefit, idx) => (
              <div key={idx} className="flex flex-col p-6 rounded-none">
                <div className="text-primary-500 mb-4 shrink-0">
                  <CheckIcon />
                </div>
                <h3 className="text-xl font-display font-normal text-foreground mb-3 text-pretty leading-snug">
                  {benefit.title}
                </h3>
                <p className="text-body-md text-foreground/70 text-pretty leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Funcionalidades Focadas */}
      <section className="py-20 md:py-28 bg-secondary-50">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-overline text-primary-500 font-normal tracking-widest uppercase mb-4 text-pretty">
              Recursos de Destaque
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-normal text-foreground text-pretty tracking-tightest mb-4">
              Desenvolvido sob medida para suas necessidades operacionais
            </h2>
            <p className="text-body-lg text-foreground/60 text-pretty">
              Funcionalidades pensadas especificamente para resolver os gargalos de um(a) {data.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {data.features.map((feature, idx) => (
              <div key={idx} className="flex flex-col bg-white p-8 rounded-none">
                <div className="text-primary-500 mb-4 shrink-0">
                  <StarIcon />
                </div>
                <h3 className="text-xl font-display font-normal text-foreground mb-3 text-pretty leading-snug">
                  {feature.title}
                </h3>
                <p className="text-body-md text-foreground/70 text-pretty leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção CTA Final */}
      <section className="cta w-full bg-primary-500 py-16 md:py-24 overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center gap-6 animate-fade-up">
            <h2 className="text-pretty leading-tight tracking-tightest text-white font-display max-w-3xl text-3xl md:text-4xl lg:text-5xl font-normal">
              {data.ctaTitle}
            </h2>
            <p className="text-lg text-white/80 text-pretty">
              {data.ctaSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
              <Link
                href="/teste-gratis"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-dark btn-lg px-8 text-center flex items-center justify-center"
              >
                Começar teste grátis
              </Link>
              <a
                href={contactsData.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lg px-8 bg-white/20 text-white hover:bg-white/30 transition-colors duration-150 text-center flex items-center justify-center"
              >
                Falar com consultor
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
