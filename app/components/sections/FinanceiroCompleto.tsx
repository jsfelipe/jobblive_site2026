"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { CheckCircle, Bank } from "@phosphor-icons/react/dist/ssr";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  "Custos de fornecedores no orçamento (orçado × executado)",
  "Aprovar pagamento gera conta a pagar vinculada ao job",
  "Pedidos de produção (PP) com fornecedor, arquivo e rastreio",
  "Contas a pagar/receber, conciliação OFX e emissão de NF-e",
  "Visão de resultado por campanha (previsto vs realizado)",
];

export default function FinanceiroCompleto() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      [".fin-tag", ".fin-title", ".fin-lead"],
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".fin-header",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      ".fin-block",
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".fin-block",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="financeiro-completo w-full relative overflow-hidden py-16 md:py-24 bg-background"
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 relative z-10">
        <div className="fin-header max-w-4xl mx-auto text-center mb-12 md:mb-16">
          <p className="fin-tag opacity-0 text-overline text-primary-500 font-normal tracking-widest uppercase mb-4 text-pretty">
            Financeiro Completo
          </p>
          <h2 className="fin-title opacity-0 text-pretty leading-tight tracking-tightest mb-6 font-display text-foreground">
            Do custo do fornecedor no orçamento ao pagamento —{" "}
            <span className="text-primary-500">sem digitar de novo.</span>
          </h2>
          <p className="fin-lead opacity-0 text-lg text-foreground/70 max-w-3xl mx-auto text-pretty">
            O financeiro da agência nasce no orçamento: cada linha com fornecedor e valor vira lançamento, PP e controle de caixa.
          </p>
        </div>

        <div className="fin-block opacity-0 relative w-full overflow-hidden bg-secondary-900 text-white rounded-none p-6 md:p-12 lg:p-16">
          <Image
            src="/assets/img/conciliacao-bancaria.jpg"
            alt="Conciliação e financeiro integrado ao orçamento no JobbLive"
            width={900}
            height={500}
            className="opacity-30 w-auto object-cover object-right"
            style={{ position: "absolute", inset: 0 }}
            priority={false}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="text-primary-500 mb-6">
                <Bank size={32} />
              </div>
              <h3 className="text-heading-3 md:text-heading-2 font-display text-white mb-4 tracking-tight text-pretty">
                Orçamento e financeiro no mesmo fluxo
              </h3>
              <p className="text-lg text-white/80 leading-relaxed text-pretty">
                Aprove o custo do fornecedor no orçamento e o JobbLive gera o pagamento vinculado ao job — sem retrabalho de digitação.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="flex flex-col gap-4">
                {features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <span className="text-primary-500 shrink-0 mt-0.5">
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
      </div>
    </section>
  );
}
