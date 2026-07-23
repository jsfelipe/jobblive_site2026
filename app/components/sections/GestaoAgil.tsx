"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StorytellingItem {
  id: number;
  label: string;
  title: string;
  description: string;
  image: string;
  icons: string[];
}

const storytellingItems: StorytellingItem[] = [
  {
    id: 0,
    label: "Campanhas com visão 360°",
    title: "Campanhas com visão 360°",
    description: "Briefing, orçamentos, tarefas, pedidos de produção e financeiro no mesmo job. Sua equipe enxerga o projeto inteiro sem trocar de planilha.",
    image: "/assets/img/bg-modulos.png",
    icons: ["/assets/icons/icon-link.svg"]
  },
  {
    id: 1,
    label: "Orçamentos pensados para agência",
    title: "Orçamentos pensados para agência",
    description: "Modelos prontos, cálculo com markup e custos de fornecedores. Monte a proposta, envie ao cliente e acompanhe do orçado ao executado.",
    image: "/assets/img/contratos-pdf.jpg",
    icons: ["/assets/icons/icon-pdf.svg"]
  },
  {
    id: 2,
    label: "Tarefas e cronograma",
    title: "Tarefas e cronograma ligados à campanha",
    description: "Organize a entrega em Kanban, Gantt e listas com responsáveis e prazos. Tudo conectado ao job — sem tarefas soltas fora do contexto.",
    image: "/assets/img/bg-conectado.png",
    icons: ["/assets/icons/icon-link.svg"]
  },
  {
    id: 3,
    label: "Cadastro de fornecedores por link",
    title: "Cadastro de fornecedores por link",
    description: "Envie um link e o fornecedor preenche os próprios dados. Menos retrabalho interno, cadastro completo e pronto para o orçamento e o financeiro.",
    image: "/assets/img/fornecedores-link.jpg",
    icons: ["/assets/icons/icon-link.svg"]
  },
  {
    id: 4,
    label: "Propostas e assinatura digital",
    title: "Propostas e assinatura digital",
    description: "Gere contratos em PDF e envie para assinatura com D4Sign ou DocuSign. Do orçamento à assinatura do cliente, no mesmo fluxo da agência.",
    image: "/assets/img/integracao-d4sign-docusign.jpg",
    icons: ["/assets/icons/icon-d4sign.svg", "/assets/icons/icon-docusign.svg"]
  }
];

export default function GestaoAgil() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    gsap.fromTo([".gestao-tag", ".gestao-title", ".gestao-text"],
      { y: 25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".gestao-texts-container",
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: containerRef });

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const containerHeight = rect.height;
      const containerTop = window.scrollY + rect.top;

      // Executa a lógica de storytelling no scroll em telas maiores
      if (window.innerWidth >= 1024) {
        if (rect.top <= 0 && rect.bottom >= windowHeight) {
          const scrolled = window.scrollY - containerTop;
          const scrollableDist = containerHeight - windowHeight;
          const progress = scrolled / scrollableDist;
          const index = Math.min(
            storytellingItems.length - 1,
            Math.max(0, Math.floor(progress * storytellingItems.length))
          );
          setActiveIndex(index);
        } else if (rect.top > 0) {
          setActiveIndex(0);
        } else if (rect.bottom < windowHeight) {
          setActiveIndex(storytellingItems.length - 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToItem = (index: number) => {
    if (window.innerWidth < 1024) {
      setActiveIndex(index);
      return;
    }

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const containerHeight = rect.height;
    const containerTop = window.scrollY + rect.top;
    const scrollableDist = containerHeight - windowHeight;

    // Calcula a posição do scroll correspondente à faixa do item clicado
    const targetScroll =
      containerTop + (index / (storytellingItems.length - 0.7)) * scrollableDist;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth"
    });
  };

  const getCardStyles = (idx: number) => {
    // Para telas menores, comportamento padrão (opacidade total do ativo, ocultar outros)
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      const isActive = activeIndex === idx;
      return {
        transform: "translateY(0px) scale(1)",
        opacity: isActive ? 1 : 0,
        zIndex: isActive ? 30 : 0,
        pointerEvents: isActive ? ("auto" as const) : ("none" as const)
      };
    }

    const diff = idx - activeIndex;

    // Card Ativo (no topo do baralho)
    if (diff === 0) {
      return {
        transform: "translateY(0px) scale(1)",
        opacity: 1,
        zIndex: 30,
        pointerEvents: "auto" as const
      };
    }

    // Cards Anteriores (retraídos e deslocados para trás/cima)
    if (diff < 0) {
      const stepsBack = Math.abs(diff);
      if (stepsBack === 1) {
        return {
          transform: "translateY(-24px) scale(0.94)",
          opacity: 0.6,
          zIndex: 20,
          pointerEvents: "none" as const
        };
      }
      if (stepsBack === 2) {
        return {
          transform: "translateY(-48px) scale(0.88)",
          opacity: 0.25,
          zIndex: 10,
          pointerEvents: "none" as const
        };
      }
      // Outros anteriores ficam totalmente invisíveis
      return {
        transform: "translateY(-60px) scale(0.82)",
        opacity: 0,
        zIndex: 0,
        pointerEvents: "none" as const
      };
    }

    // Cards Futuros (aguardando para entrar, vindo de baixo)
    if (diff > 0) {
      return {
        transform: "translateY(48px) scale(1.03)",
        opacity: 0,
        zIndex: 40 + idx,
        pointerEvents: "none" as const
      };
    }

    return {};
  };

  return (
    <section
      ref={containerRef}
      className="gestao-agil w-full relative bg-white lg:h-[300vh]"
    >
      {/* Container Sticky para Desktop e Normal para Mobile */}
      <div className="lg:sticky lg:top-0 lg:h-screen flex items-center overflow-hidden py-16 lg:py-0">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Lado Esquerdo: Textos do Cabeçalho e Lista de Facilidades */}
            <div className="gestao-texts-container lg:col-span-7 flex flex-col justify-center">
              <span className="gestao-tag opacity-0 text-overline text-primary-500 font-normal tracking-widest uppercase mb-4 text-pretty">
                Operação de agência
              </span>
              <h2 className="gestao-title opacity-0 text-pretty leading-tight tracking-tightest mb-6 font-display text-foreground text-3xl md:text-5xl">
                Agilize os processos com o JobbLive <br />
                e <span className="text-primary-500">economize horas de trabalho.</span>
              </h2>
              <p className="gestao-text opacity-0 text-body-lg text-foreground/70 text-pretty mb-8">
                Facilidades pensadas para o dia a dia da agência — do job à entrega.
              </p>

              {/* Lista Interativa */}
              <ul className="flex flex-col gap-4 pl-0 list-none">
                {storytellingItems.map((item, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollToItem(idx)}
                        className={`flex items-center gap-3 text-left font-sans text-body-md transition-all duration-300 group cursor-pointer border-none bg-transparent p-0 ${isActive
                          ? "text-primary-500 font-medium translate-x-2"
                          : "text-foreground/50 hover:text-foreground/80"
                          }`}
                      >
                        <ArrowRight
                          size={18}
                          className={`shrink-0 transition-transform duration-300 ${isActive ? "text-primary-500 scale-110" : "text-foreground/40 group-hover:translate-x-1"
                            }`}
                        />
                        <span className="leading-snug">{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Lado Direito: Preview do Sistema com Efeito Pilha de Cartas de Baralho (3:4) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end w-full relative pt-12 pb-4 lg:py-12">
              <div className="relative w-full max-w-[480px] aspect-[3/4]">
                {storytellingItems.map((item, idx) => {
                  const cardStyle = getCardStyles(idx);

                  return (
                    <div
                      key={item.id}
                      style={cardStyle}
                      className="absolute inset-0 w-full h-full overflow-hidden bg-neutral-900 rounded-none border border-neutral-200 transition-all duration-500 ease-out flex flex-col justify-end shadow-md"
                    >
                      {/* Imagem de Fundo do Card */}
                      <div className="absolute inset-0 w-full h-full z-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover object-center"
                        />
                      </div>

                      {/* Overlay de Gradiente Escuro para legibilidade */}
                      <div
                        className="absolute inset-0 z-10 pointer-events-none"
                        style={{
                          background: "linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.6) 40%, rgba(0, 0, 0, 0.1) 80%, transparent 100%)"
                        }}
                        aria-hidden="true"
                      />

                      {/* Textos e Ícones do Card */}
                      <div className="relative p-6 md:p-12 z-20 flex flex-col justify-end min-h-[40%] text-white">
                        {/* Ícones da Funcionalidade */}
                        <div className="flex items-center gap-3 mb-4">
                          {item.icons.map((iconPath, iconIdx) => (
                            <div key={iconIdx} className="relative w-14 h-14 shrink-0">
                              <Image
                                src={iconPath}
                                alt={`Ícone ${item.title}`}
                                fill
                                className="object-contain"
                              />
                            </div>
                          ))}
                        </div>

                        {/* Título */}
                        <h3 className="text-xl md:text-2xl font-display text-white font-normal mb-3 leading-tight text-pretty">
                          {item.title}
                        </h3>

                        {/* Parágrafo/Descrição */}
                        <p className="text-sm text-neutral-300 font-sans text-pretty leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
