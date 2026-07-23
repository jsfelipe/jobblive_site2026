"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import contactsData from "../../config/contacts.json";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const CLIENT_LOGOS = [
  {
    name: "2say",
    src: "/assets/clientes/2say.svg",
    width: 120,
    height: 75,
  },
  {
    name: "Agência Live Mkt",
    src: "/assets/clientes/agencia-live-mkt.svg",
    width: 199,
    height: 72,
  },
  {
    name: "Grupo Coonecta",
    src: "/assets/clientes/grupo-coonecta.svg",
    width: 299,
    height: 74,
  },
  {
    name: "Jokerman",
    src: "/assets/clientes/jokerman.svg",
    width: 268,
    height: 59,
  },
  {
    name: "Trendsy",
    src: "/assets/clientes/trendsy.svg",
    width: 209,
    height: 43,
  },
  {
    name: "Infinita",
    src: "/assets/clientes/infinita-inspitration.svg",
    width: 95,
    height: 73,
  },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.6 } });
    
    tl.fromTo(".hero-badge", { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4 })
      .fromTo(".hero-title", { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.25")
      .fromTo(".hero-subtitle", { y: 15, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.3")
      .fromTo(".hero-buttons", { y: 12, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.3")
      .fromTo(".hero-info", { y: 10, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.3")
      .fromTo(".hero-logos-wrapper", { y: 10, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.25");
  }, { scope: containerRef });

  return (
    <section id="hero" ref={containerRef} className="full relative overflow-hidden pt-32 pb-16 md:pt-44 md:pb-24 lg:pt-52 lg:pb-16 bg-background flex flex-col items-center justify-center">
      {/* Imagem de Fundo */}
      <Image
        src="/assets/img/bg-hero.png"
        alt=""
        fill
        className="hero-animation object-fill"
        priority
        aria-hidden="true"
      />

      {/* Gradiente sobre a imagem para legibilidade */}
      <div className="absolute inset-0 z-0 hero-bg-gradient pointer-events-none opacity-80" aria-hidden="true" />


      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">

        {/* Badge / Tag Superior */}
        <div className="hero-badge opacity-0 inline-flex items-center rounded-full border border-white px-4 py-1.5 text-xs text-white mb-6">
          Agências <span className="mx-2 opacity-50">|</span> Marketing <span className="mx-2 opacity-50">|</span> Eventos
        </div>

        {/* Título Principal */}
        <h1 className="hero-title opacity-0 max-w-4xl text-foreground text-pretty tracking-tightest leading-tightest mb-6">
          Software de gestão para <br className="hidden md:block" />
          <span className="text-primary-500">agência de marketing.</span>
        </h1>

        {/* Subtítulo / Descrição */}
        <p className="hero-subtitle opacity-0 text-lg text-foreground/70 max-w-2xl text-pretty mb-10">
          Gerencie campanhas, orçamentos, tarefas e financeiro em um único sistema — sem planilhas, sem retrabalho.
        </p>

        {/* Botões de Ação */}
        <div className="hero-buttons opacity-0 flex flex-col sm:flex-row items-center gap-4 mb-5 w-full sm:w-auto">
          <Link href="/teste-gratis" target="_blank" rel="noopener noreferrer" className="btn-primary btn-lg w-full sm:w-auto px-8 text-center flex items-center justify-center">
            Teste e conheça o JobbLive
          </Link>
          <a href={contactsData.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-lg w-full sm:w-auto px-8 bg-white text-foreground hover:bg-secondary-50 text-center flex items-center justify-center">
            Agendar demo
          </a>
        </div>

        {/* Tags de Segurança / Info */}
        <p className="hero-info opacity-0 text-body-sm text-foreground/50 mb-16 md:mb-20">
          Sem cartão de crédito <span className="mx-1.5 opacity-50">|</span> Teste por 7 dias grátis
        </p>

        {/* Seção de Logos com Slider Marquee Infinito */}
        <div className="hero-logos-wrapper opacity-0 w-full max-w-5xl flex flex-col items-center pt-8 border-t border-foreground/10 select-none">
          <p className="text-body-lg text-foreground/50 mb-8 text-pretty">
            Estamos presente no dia a dia das maiores agências do mercado.
          </p>

          {/* Marquee Wrapper com Máscara de Degradê Lateral */}
          <div className="relative w-full overflow-hidden py-2">
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <div className="flex w-max gap-24 animate-marquee">
              {/* Via Principal */}
              <div className="flex shrink-0 items-center justify-around gap-24 ">
                {CLIENT_LOGOS.map((client) => (
                  <div
                    key={client.name}
                    className="transition duration-300 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 flex items-center justify-center"
                  >
                    <Image
                      src={client.src}
                      alt={`Logotipo da agência ${client.name}`}
                      width={client.width}
                      height={client.height}
                      className="h-8 md:h-10 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
              {/* Via Duplicada para Loop Infinito */}
              <div className="flex shrink-0 items-center justify-around gap-24" aria-hidden="true">
                {CLIENT_LOGOS.map((client) => (
                  <div
                    key={`${client.name}-dup`}
                    className="transition duration-300 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 flex items-center justify-center"
                  >
                    <Image
                      src={client.src}
                      alt={`Logotipo da agência ${client.name}`}
                      width={client.width}
                      height={client.height}
                      className="h-8 md:h-10 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
