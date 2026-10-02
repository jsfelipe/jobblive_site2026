"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkle } from "@phosphor-icons/react/dist/ssr";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AI_ICONS = [
  { src: "/images/icon/openIA.png", alt: "OpenAI" },
  { src: "/images/icon/gemini.png", alt: "Gemini" },
  { src: "/images/icon/claude.png", alt: "Claude" },
  { src: "/images/icon/cursor.png", alt: "Cursor" },
  { src: "/images/icon/mcp.png", alt: "MCP" },
  { src: "/images/icon/api.png", alt: "API" },
];

export default function IAChamada() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      [".ia-chamada-tag", ".ia-chamada-title", ".ia-chamada-desc"],
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".ia-chamada-header",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      ".ia-chamada-icon-item",
      { y: 20, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".ia-chamada-icons",
          start: "top 88%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      ".ia-chamada-cta",
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".ia-chamada-cta",
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="ia-chamada w-full relative overflow-hidden py-16 md:py-24 bg-secondary-50"
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 relative z-10">
        {/* Cabeçalho */}
        <div className="ia-chamada-header max-w-4xl mx-auto text-center mb-6 md:mb-8">
          <div className="ia-chamada-tag opacity-0 inline-flex items-center gap-2 px-3 py-1 text-primary-500 text-overline tracking-widest uppercase mb-4 text-pretty">
            <Sparkle size={14} />
            <span>Novidade no JobbLive</span>
          </div>
          <h2 className="ia-chamada-title opacity-0 text-pretty leading-tight tracking-tightest mb-6 font-display text-foreground text-3xl md:text-5xl">
            Acelere sua operação com a nova <br />
            <span className="text-primary-500">Inteligência Artificial.</span>
          </h2>
          <p className="ia-chamada-desc opacity-0 text-lg text-foreground/70 max-w-3xl mx-auto text-pretty">
            Conheça o novo ambiente com IA nativa do JobbLive: acelere a conciliação bancária, monte orçamentos e importe planilhas sem retrabalho, com sua equipe sempre no controle.
          </p>
        </div>

        {/* 6 Ícones da Hero da página de IA posicionados no espaço entre o texto e o banner */}
        <div className="ia-chamada-icons flex items-center justify-center flex-wrap gap-4 sm:gap-6 my-8 md:my-10">
          {AI_ICONS.map((icon) => (
            <div
              key={icon.alt}
              className="ia-chamada-icon-item opacity-0 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center transition-transform hover:scale-105"
            >
              <Image
                src={icon.src}
                alt={icon.alt}
                width={56}
                height={56}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>

        {/* Banner com Chamada de Ação para a Página /ia */}
        <div className="ia-chamada-cta opacity-0 bg-secondary-900 text-white p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-primary-400 mb-2">
              Página de IA Disponível
            </span>
            <h3 className="text-2xl md:text-3xl font-display text-white mb-3 text-pretty">
              Descubra em detalhes como funciona cada fluxo de IA
            </h3>
            <p className="text-white/70 text-pretty text-sm md:text-base mb-6 lg:mb-0">
              Agora com a IA no JobbLive ficou mais fácil de fazer conciliação bancária, elaborar orçamentos, conectar dados reais de fornecedores e importar planilhas, sem retrabalho e com sua equipe sempre no controle. Conecte com ChatGPT, Gemini e Claude.
            </p>
          </div>

          <div className="shrink-0 w-full sm:w-auto flex justify-center lg:justify-end">
            <Link
              href="/ia"
              className="btn-primary btn-lg inline-flex items-center gap-2 group w-full sm:w-auto justify-center"
            >
              <span>Veja mais sobre</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
