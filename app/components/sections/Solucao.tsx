"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { FileText, ClipboardText, Wrench, TrendUp, CurrencyDollar, ArrowUpRight } from "@phosphor-icons/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Solucao() {
  const steps = [
    {
      id: "01",
      title: "Abra a campanha",
      description: "Cliente, briefing, objetivos e prazos do job num só lugar.",
      icon: <FileText className="w-6 h-6" />,
      margin: "md:mt-[160px]",
    },
    {
      id: "02",
      title: "Monte o orçamento",
      description: "Modelos de agência, markups e custos de fornecedores.",
      icon: <ClipboardText className="w-6 h-6" />,
      margin: "md:mt-[120px]",
    },
    {
      id: "03",
      title: "Execute as tarefas",
      description: "Kanban, Gantt e listas com responsáveis e prazos.",
      icon: <Wrench className="w-6 h-6" />,
      margin: "md:mt-[80px]",
    },
    {
      id: "04",
      title: "Aprove e pague",
      description: "Custos do orçamento viram contas a pagar e pedidos de produção.",
      icon: <TrendUp className="w-6 h-6" />,
      margin: "md:mt-[40px]",
    },
    {
      id: "05",
      title: "Veja o resultado",
      description: "Previsto vs realizado e lucro por campanha.",
      icon: <CurrencyDollar className="w-6 h-6" />,
      margin: "md:mt-0",
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Revelar cabeçalho esquerdo
    gsap.fromTo(".solucao-header", 
      { x: -30, opacity: 0 }, 
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".solucao-header",
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );

    // 2. Revelar os 5 cards com stagger
    gsap.fromTo(".solucao-card",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".solucao-card-grid",
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );

    // 3. Revelar o footer
    gsap.fromTo(".solucao-footer",
      { y: 15, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".solucao-footer",
          start: "top 95%",
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="solucao w-full relative overflow-hidden py-16 md:py-24">
      {/* Imagem de Fundo */}
      <Image
        src="/assets/img/bg-conectado.png"
        alt=""
        fill
        className="object-cover object-center"
        style={{ position: 'absolute', inset: 0 }}
        priority={false}
        aria-hidden="true"
      />

      {/* Overlay para garantir legibilidade */}
      <div className="absolute inset-0 z-0 bg-surface/80 pointer-events-none" />
      <div
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 0% 100%, var(--color-primary-100) 0%, transparent 60%), radial-gradient(circle at 100% 50%, var(--color-primary-50) 0%, transparent 50%)"
        }}
      />

      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 relative z-10">

        {/* Bloco de Título Superior Esquerdo */}
        <div className="solucao-header opacity-0 max-w-2xl mb-12 md:mb-0 text-left">
          <h2 className="text-pretty leading-tight tracking-tightest mb-4">
            Tudo conectado. <span className="text-primary-500">Finalmente.</span>
          </h2>
          <p className="text-lg text-foreground/70 text-pretty mb-8">
            Com o JobbLive, você conecta campanha, orçamento, tarefas e <br className="hidden md:block" /> financeiro em um único fluxo.
          </p>
          <p className="text-primary-500 text-body-md font-semibold tracking-wide uppercase hover:opacity-80 transition-opacity">
            Como funciona?
          </p>
        </div>

        {/* Grid de Cards Escalonados */}
        <div className="solucao-card-grid grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6 mt-8 md:mt-0 items-start -mt-4">
          {steps.map((step) => {
            return (
              <div
                key={step.id}
                className={`solucao-card opacity-0 flex flex-col bg-white p-6 lg:p-8 rounded-none relative ${step.margin}`}
              >
                {/* Número do Card */}
                <div className="step-number font-sofia text-8xl text-foreground/10 leading-none mb-8" aria-hidden="true">
                  {step.id}
                </div>

                {/* Ícone */}
                <div className="text-primary-500 mb-4">
                  {step.icon}
                </div>

                {/* Título e Descrição */}
                <h3 className="text-body-lg text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-body-md text-foreground/60 text-pretty">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Texto Extra Inferior Direito */}
        <div className="solucao-footer opacity-0 mt-12 md:mt-16 flex justify-end items-center gap-1 text-foreground/60 text-body-md">
          <span>Mais controle do fluxo da agência — do briefing ao caixa.</span>
          <ArrowUpRight className="w-5 h-5 text-primary-500" />
          <ArrowUpRight className="w-5 h-5 text-primary-500" />
          <ArrowUpRight className="w-5 h-5 text-primary-500" />
        </div>

      </div>
    </section>
  );
}
