"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}


import { CheckCircle, FileText, Bank, ChartPieSlice } from "@phosphor-icons/react/dist/ssr";

export default function Modulos() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Revelar cabeçalho
    gsap.fromTo([".modulos-header-tag", ".modulos-header-title", ".modulos-header-desc"],
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".modulos-header",
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );

    // 2. Revelar as 3 colunas com stagger
    gsap.fromTo(".modulos-col",
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".modulos-cols-grid",
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: containerRef });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px"
      }
    );

    if (boxRef.current) {
      observer.observe(boxRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const projectManagementFeatures = [
    "1. Detalhes da Campanha",
    "5. Relatórios e Gráficos de Orçamento",
    "2. Orçamento Detalhado",
    "6. Quadro (Kanban)",
    "3. Cálculo do Orçamento",
    "7. Gantt",
    "4. Aprovar Pagamento com BV",
    "8. Lista de Tarefas"
  ];

  const proposalsFeatures = [
    "Envio de proposta via link",
    "Envio de propostas em PDF",
    "Envio de propostas em PDF"
  ];

  const financialFeatures = [
    "Controle de entradas e saídas",
    "Conciliação bancária",
    "Emissão de notas fiscais"
  ];

  const reportFeatures = [
    "Relatórios financeiros",
    "Lucro por projeto",
    "Performance da agência"
  ];

  return (
    <section ref={containerRef} className="modulos w-full relative overflow-hidden py-16 md:py-24 bg-neutral-50">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 relative z-10">

        {/* Bloco de Cabeçalho Centralizado */}
        <div className="modulos-header max-w-4xl mx-auto text-center mb-12 md:mb-16">
          <p className="modulos-header-tag opacity-0 text-overline text-primary-500 font-regular tracking-widest uppercase mb-4 text-pretty">
            Nossos Módulos
          </p>
          <h2 className="modulos-header-title opacity-0 text-pretty leading-tight tracking-tightest mb-6 font-display text-foreground">
            Tudo que sua agência precisa para <br className="hidden md:block" />
            <span className="text-primary-500">operar de ponta a ponta.</span>
          </h2>
          <p className="modulos-header-desc opacity-0 text-lg text-foreground/70 max-w-3xl mx-auto text-pretty">
            Sem planilhas, sem informações perdidas, tudo centralizado.
          </p>
        </div>

        <div ref={boxRef} className={`relative w-full overflow-hidden bg-secondary-900 text-white rounded-none p-6 md:p-12 lg:p-16 mb-16 transition-all duration-[400ms] ease-out ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-[0.60]"}`}>

          {/* Imagem de Fundo Nativa do Next.js */}
          <Image
            src="/assets/img/bg-modulos.png"
            alt="Interface de gestão de projetos do Jobb Live"
            width={900}
            height={500}
            className="opacity-50 w-auto object-cover object-left"
            style={{ position: 'absolute', inset: 0 }}
            priority={false}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
            {/* Esquerda: Detalhes do Módulo */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <h3 className="text-heading-3 md:text-heading-2 font-display text-white mb-4 tracking-tight text-pretty">
                Gestão de projetos
              </h3>
              <p className="text-lg text-white/80 leading-relaxed text-pretty">
                Todas as informações reunidas, chega de pagar caro por sistemas complexos e com funções que você nunca usa.
              </p>
            </div>

            {/* Direita: Grid de Funcionalidades */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                {projectManagementFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-primary-500 shrink-0">
                      <CheckCircle size={24} />
                    </span>
                    <span className="text-body-lg text-white/90 font-normal">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Linha Divisória de Três Colunas Inferiores */}
        <div className="modulos-cols-grid grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8">

          {/* Coluna 1: Propostas e contratos */}
          <div className="modulos-col opacity-0 flex flex-col md:px-4 lg:px-8 border-b md:border-b-0 md:border-r border-foreground/10 pb-8 md:pb-0 last:border-0 last:pb-0">
            {/* Ícone */}
            <div className="text-primary-500 mb-6">
              <FileText size={32} />
            </div>

            {/* Título */}
            <h4 className="text-lg font-display text-foreground mb-6 text-pretty">
              Propostas e contratos
            </h4>

            {/* Lista */}
            <div className="flex flex-col gap-4">
              {proposalsFeatures.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-primary-500 shrink-0">
                    <CheckCircle size={24} />
                  </span>
                  <span className="text-body-lg text-foreground/80">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Coluna 2: Financeiro inteligente */}
          <div className="modulos-col opacity-0 flex flex-col md:px-4 lg:px-8 border-b md:border-b-0 md:border-r border-foreground/10 pb-8 md:pb-0 last:border-0 last:pb-0">
            {/* Ícone */}
            <div className="text-primary-500 mb-6">
              <Bank size={32} />
            </div>

            {/* Título */}
            <h4 className="text-lg font-display text-foreground mb-6 text-pretty">
              Financeiro inteligente
            </h4>

            {/* Lista */}
            <div className="flex flex-col gap-4">
              {financialFeatures.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-primary-500 shrink-0">
                    <CheckCircle size={24} />
                  </span>
                  <span className="text-body-lg text-foreground/80">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Coluna 3: Relatórios estratégicos */}
          <div className="modulos-col opacity-0 flex flex-col md:px-4 lg:px-8 pb-8 md:pb-0 last:border-0 last:pb-0">
            {/* Ícone */}
            <div className="text-primary-500 mb-6">
              <ChartPieSlice size={32} />
            </div>

            {/* Título */}
            <h4 className="text-lg font-display text-foreground mb-6 text-pretty">
              Relatórios estratégicos
            </h4>

            {/* Lista */}
            <div className="flex flex-col gap-4">
              {reportFeatures.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-primary-500 shrink-0">
                    <CheckCircle size={24} />
                  </span>
                  <span className="text-body-lg text-foreground/80">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section >
  );
}
