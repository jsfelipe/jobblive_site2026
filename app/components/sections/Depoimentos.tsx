"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Ícones Phosphor Icons
const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-5 h-5 fill-current">
    <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-5 h-5 fill-current">
    <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,62.34a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-5 h-5 fill-current">
    <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z" />
  </svg>
);

interface Depoimento {
  nome: string;
  empresa: string;
  avatar: string;
  texto: string;
  estrelas: number;
}

const depoimentos: Depoimento[] = [
  {
    nome: "Alfredo Valtier",
    empresa: "Sanfona Filmes",
    avatar: "https://i.pravatar.cc/80?img=51",
    texto:
      "Hoje sabemos exatamente quanto lucramos em cada projeto, o financeiro do JobbLive facilita muito a nossa vida.",
    estrelas: 5,
  },
  {
    nome: "Carla Mendes",
    empresa: "Studio CM Eventos",
    avatar: "https://i.pravatar.cc/80?img=47",
    texto:
      "Antes do JobbLive, a gente se perdia em planilhas e e-mails. Hoje tudo está num só lugar e o time ganhou muito tempo.",
    estrelas: 5,
  },
  {
    nome: "Rafael Souza",
    empresa: "RS Produções",
    avatar: "https://i.pravatar.cc/80?img=12",
    texto:
      "A visão do Kanban e o Gantt integrado ao orçamento mudaram a forma como gerimos nossos projetos. Recomendo demais.",
    estrelas: 5,
  },
  {
    nome: "Juliana Rios",
    empresa: "Agência Vibe",
    avatar: "https://i.pravatar.cc/80?img=23",
    texto:
      "Conseguimos fechar propostas muito mais rápido com o link de envio. Os clientes adoram a experiência profissional.",
    estrelas: 5,
  },
];

export default function Depoimentos() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useGSAP(() => {
    // 1. Revelar cabeçalho
    gsap.fromTo(".depoimentos-header",
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".depoimentos-header",
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );

    // 2. Revelar carrossel e dots
    gsap.fromTo([".depoimentos-carousel", ".depoimentos-dots"],
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".depoimentos-carousel",
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: containerRef });

  const goTo = (index: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 200);
  };

  const prev = () => goTo((current - 1 + depoimentos.length) % depoimentos.length);
  const next = () => goTo((current + 1) % depoimentos.length);

  const dep = depoimentos[current];

  return (
    <section ref={containerRef} className="depoimentos w-full py-16 md:py-24 bg-background overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">

        {/* Cabeçalho */}
        <div className="depoimentos-header opacity-0 text-center mb-12 md:mb-16">
          <h2 className="text-pretty leading-tight tracking-tightest mb-4 font-display text-foreground">
            <span className="text-primary-500">Quem usa,</span> não volta atrás.
          </h2>
          <p className="text-lg text-foreground/60 text-pretty">
            O que nossos clientes falam sobre o JobbLive
          </p>
        </div>

        {/* Carrossel */}
        <div className="depoimentos-carousel opacity-0 relative flex items-center justify-center gap-4 md:gap-8">
          {/* Seta Esquerda */}
          <button
            id="depoimentos-prev"
            onClick={prev}
            aria-label="Depoimento anterior"
            className="shrink-0 w-10 h-10 flex items-center justify-center text-foreground/50 hover:text-primary-500 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md"
          >
            <ArrowLeftIcon />
          </button>

          {/* Card do Depoimento */}
          <div
            className="flex-1 max-w-2xl text-center"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? "translateY(8px)" : "translateY(0)",
              transition: "opacity 200ms ease, transform 200ms ease",
            }}
          >
            {/* Avatar + Estrelas + Nome */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="shrink-0 w-14 h-14 overflow-hidden rounded-none bg-secondary-100">
                <Image
                  src={dep.avatar}
                  alt={`Foto de ${dep.nome}`}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                {/* Estrelas */}
                <div className="flex items-center gap-0.5 mb-1" aria-label={`${dep.estrelas} estrelas`}>
                  {Array.from({ length: dep.estrelas }).map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      <StarIcon />
                    </span>
                  ))}
                </div>
                {/* Nome */}
                <p className="text-body-lg font-normal text-primary-500 leading-tight">
                  {dep.nome}
                </p>
                {/* Empresa */}
                <p className="text-body-md text-foreground/50 leading-tight">
                  {dep.empresa}
                </p>
              </div>
            </div>

            {/* Citação */}
            <blockquote>
              <p className="text-heading-4 font-display italic text-foreground/80 leading-snug text-pretty tracking-tight">
                &ldquo;{dep.texto}&rdquo;
              </p>
            </blockquote>
          </div>

          {/* Seta Direita */}
          <button
            id="depoimentos-next"
            onClick={next}
            aria-label="Próximo depoimento"
            className="shrink-0 w-10 h-10 flex items-center justify-center text-foreground/50 hover:text-primary-500 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md"
          >
            <ArrowRightIcon />
          </button>
        </div>

        {/* Indicadores (dots) */}
        <div className="depoimentos-dots opacity-0 flex items-center justify-center gap-2 mt-10">
          {depoimentos.map((_, i) => (
            <button
              key={i}
              id={`depoimentos-dot-${i}`}
              onClick={() => goTo(i)}
              aria-label={`Ir para depoimento ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                i === current
                  ? "bg-primary-500 w-5"
                  : "bg-foreground/20 hover:bg-foreground/40"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
