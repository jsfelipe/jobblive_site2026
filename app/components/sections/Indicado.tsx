"use client";

import React, { useRef } from "react";
import Link from "next/link";
import contactsData from "../../config/contacts.json";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Ícones SVG do Phosphor Icons (Regular weight)
const TargetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-8 h-8 fill-current">
    <path d="M221.87,83.16A104.1,104.1,0,1,1,195.67,49l22.67-22.68a8,8,0,0,1,11.32,11.32l-96,96a8,8,0,0,1-11.32-11.32l27.72-27.72a40,40,0,1,0,17.87,31.09,8,8,0,1,1,16-.9,56,56,0,1,1-22.38-41.65L184.3,60.39a87.88,87.88,0,1,0,23.13,29.67,8,8,0,0,1,14.44-6.9Z" />
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-8 h-8 fill-current">
    <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z" />
  </svg>
);

const MegaphoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-8 h-8 fill-current">
    <path d="M248,120a48.05,48.05,0,0,0-48-48H160.2c-2.91-.17-53.62-3.74-101.91-44.24A16,16,0,0,0,32,40V200a16,16,0,0,0,26.29,12.25c37.77-31.68,77-40.76,93.71-43.3v31.72A16,16,0,0,0,159.12,214l11,7.33A16,16,0,0,0,194.5,212l11.77-44.36A48.07,48.07,0,0,0,248,120ZM48,199.93V40h0c42.81,35.91,86.63,45,104,47.24v65.48C134.65,155,90.84,164.07,48,199.93Zm131,8,0,.11-11-7.33V168h21.6ZM200,152H168V88h32a32,32,0,1,1,0,64Z" />
  </svg>
);

const MonitorPlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-8 h-8 fill-current">
    <path d="M208,40H48A24,24,0,0,0,24,64V176a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V64A24,24,0,0,0,208,40Zm8,136a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V64a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8Zm-48,48a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,224Zm-3.56-110.66-48-32A8,8,0,0,0,104,88v64a8,8,0,0,0,12.44,6.66l48-32a8,8,0,0,0,0-13.32ZM120,137.05V103l25.58,17Z" />
  </svg>
);

const StorefrontIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-8 h-8 fill-current">
    <path d="M232,96a7.89,7.89,0,0,0-.3-2.2L217.35,43.6A16.07,16.07,0,0,0,202,32H54A16.07,16.07,0,0,0,38.65,43.6L24.31,93.8A7.89,7.89,0,0,0,24,96h0v16a40,40,0,0,0,16,32v72a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V144a40,40,0,0,0,16-32V96ZM54,48H202l11.42,40H42.61Zm50,56h48v8a24,24,0,0,1-48,0Zm-16,0v8a24,24,0,0,1-35.12,21.26,7.88,7.88,0,0,0-1.82-1.06A24,24,0,0,1,40,112v-8ZM200,208H56V151.2a40.57,40.57,0,0,0,8,.8,40,40,0,0,0,32-16,40,40,0,0,0,64,0,40,40,0,0,0,32,16,40.57,40.57,0,0,0,8-.8Zm4.93-75.8a8.08,8.08,0,0,0-1.8,1.05A24,24,0,0,1,168,112v-8h48v8A24,24,0,0,1,204.93,132.2Z" />
  </svg>
);

const ChartBarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-8 h-8 fill-current">
    <path d="M224,200h-8V40a8,8,0,0,0-8-8H152a8,8,0,0,0-8,8V80H96a8,8,0,0,0-8,8v40H48a8,8,0,0,0-8,8v64H32a8,8,0,0,0,0,16H224a8,8,0,0,0,0-16ZM160,48h40V200H160ZM104,96h40V200H104ZM56,144H88v56H56Z" />
  </svg>
);

const PresentationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-8 h-8 fill-current">
    <path d="M216,40H136V24a8,8,0,0,0-16,0V40H40A16,16,0,0,0,24,56V176a16,16,0,0,0,16,16H79.36L57.75,219a8,8,0,0,0,12.5,10l29.59-37h56.32l29.59,37a8,8,0,1,0,12.5-10l-21.61-27H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,136H40V56H216V176Z" />
  </svg>
);

const TicketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-8 h-8 fill-current">
    <path d="M232,104a8,8,0,0,0,8-8V64a16,16,0,0,0-16-16H32A16,16,0,0,0,16,64V96a8,8,0,0,0,8,8,24,24,0,0,1,0,48,8,8,0,0,0-8,8v32a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V160a8,8,0,0,0-8-8,24,24,0,0,1,0-48ZM32,167.2a40,40,0,0,0,0-78.4V64H88V192H32Zm192,0V192H104V64H224V88.8a40,40,0,0,0,0,78.4Z" />
  </svg>
);

export default function Indicado() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Revelar cabeçalho
    gsap.fromTo([".indicado-header-tag", ".indicado-header-title", ".indicado-header-desc"],
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".indicado-header",
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );

    // 2. Revelar os 8 cards de baixo para cima com stagger
    gsap.fromTo(".indicado-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".indicado-cards-grid",
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );

    // 3. Revelar o footer
    gsap.fromTo(".indicado-footer",
      { y: 15, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".indicado-footer",
          start: "top 95%",
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: containerRef });

  const targetCards = [
    {
      title: "Agência de marketing",
      icon: <TargetIcon />,
      slug: "agencia-de-marketing",
    },
    {
      title: "Agência de live marketing",
      icon: <EyeIcon />,
      slug: "agencia-de-live-marketing",
    },
    {
      title: "Agências de publicidade",
      icon: <MegaphoneIcon />,
      slug: "agencia-de-publicidade",
    },
    {
      title: "Agências de conteúdo digital",
      icon: <MonitorPlayIcon />,
      slug: "agencia-de-conteudo-digital",
    },
    {
      title: "Agências de ativações de marca",
      icon: <StorefrontIcon />,
      slug: "agencia-de-ativacao-de-marca",
    },
    {
      title: "Agências de trade marketing",
      icon: <ChartBarIcon />,
      slug: "agencia-de-trade-marketing",
    },
    {
      title: "Organizadores de feiras e congressos",
      icon: <PresentationIcon />,
      slug: "organizador-de-feiras-e-congressos",
    },
    {
      title: "Organizadores de festivais e shows",
      icon: <TicketIcon />,
      slug: "organizador-de-festivais-e-shows",
    },
  ];

  return (
    <section ref={containerRef} className="indicado w-full relative overflow-hidden py-16 md:py-24 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 relative z-10">

        {/* Bloco de Cabeçalho Centralizado */}
        <div className="indicado-header max-w-full mx-auto text-center mb-12 md:mb-16">
          <p className="indicado-header-tag opacity-0 text-overline text-primary-500 font-normal tracking-widest uppercase mb-4 text-pretty">
            Para quem é indicado
          </p>
          <h2 className="indicado-header-title opacity-0 text-pretty leading-tight tracking-tightest mb-6 font-display text-foreground">
            Empresas atuantes no ramo de agências e eventos, <br className="hidden md:block" />
            <span className="text-primary-500">o JobbLive é a ferramenta que você precisa.</span>
          </h2>
          <p className="indicado-header-desc opacity-0 text-lg text-foreground/70 max-w-3xl mx-auto text-pretty">
            Cada tipo de agência tem um fluxo diferente. O JobbLive se adapta ao seu, não o contrário.
          </p>
        </div>

        {/* Grid de Cards Vermelhos Sem Arredondamento */}
        <div className="indicado-cards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 ">
          {targetCards.map((card, index) => {
            return (
              <Link
                href={`/segmentos/${card.slug}`}
                key={index}
                className="indicado-card opacity-0 flex flex-col items-center justify-center bg-primary-500 text-white py-12 px-6 rounded-none transition-all hover:bg-primary-600 duration-200 cursor-pointer"
              >
                {/* Ícone */}
                <div className="mb-4 text-white">
                  {card.icon}
                </div>

                {/* Título */}
                <span className="text-center text-lg font-normal tracking-tight text-white text-pretty max-w-[200px]">
                  {card.title}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Link / CTA Inferior */}
        <div className="indicado-footer opacity-0 mt-12 md:mt-16 text-center">
          <p className="text-body-md text-foreground/60 text-pretty">
            Nossa equipe está a disposição,{" "}
            <a
              href={contactsData.whatsappLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 font-semibold inline-flex items-center gap-1 hover:underline"
            >
              solicite uma apresentação <span className="text-xs">↗</span>
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
