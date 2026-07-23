"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Sparkle, ArrowRight } from "@phosphor-icons/react";

export default function PlanosCards() {
  const [billingCycle, setBillingCycle] = useState<"anual" | "mensal">("anual");

  const isAnual = billingCycle === "anual";
  const isMensal = billingCycle === "mensal";

  return (
    <section className="w-full bg-white py-12 md:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Descrição Introdutória */}
        <div className="mx-auto max-w-3xl text-center mb-10 md:mb-14">
          <p className="text-body-lg text-foreground/80 leading-relaxed text-pretty font-sans">
            Ao contratar o Jobb Live, você torna sua agência ou produtora mais efetiva e estratégica.
            Conte com todos os recursos a favor da sua operação, com um custo-benefício que cabe no seu orçamento.
            Confira abaixo nossas opções de planos!
          </p>

          {/* Toggle de Ciclo de Cobrança */}
          <div className="mt-8 inline-flex items-center p-1.5 bg-secondary-50">
            <button
              type="button"
              onClick={() => setBillingCycle("anual")}
              className={`px-5 py-2 text-sm font-sans font-normal transition-all duration-200 cursor-pointer ${
                isAnual
                  ? "bg-primary-500 text-white"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              Plano Anual <span className="text-xs bg-white/20 text-white px-2 py-0.5 ml-1 font-normal">18% OFF</span>
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("mensal")}
              className={`px-5 py-2 text-sm font-sans font-normal transition-all duration-200 cursor-pointer ${
                isMensal
                  ? "bg-primary-500 text-white"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              Plano Mensal
            </button>
          </div>
        </div>

        {/* Grid de Cards de Planos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          
          {/* Card Plano Anual */}
          <div
            className={`relative flex flex-col justify-between p-8 transition-all duration-300 ${
              isAnual
                ? "bg-primary-500 text-white"
                : "bg-secondary-50 text-foreground"
            }`}
          >
            {/* Badge Recomendado */}
            <div
              className={`absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-normal px-4 py-1 uppercase tracking-wider flex items-center gap-1.5 ${
                isAnual
                  ? "bg-secondary-900 text-white"
                  : "bg-primary-500 text-white"
              }`}
            >
              <Sparkle className="size-3.5" weight="fill" />
              Recomendado
            </div>

            <div>
              <div className="flex items-center justify-between mt-2 mb-4">
                <h3 className={`text-2xl font-display font-medium ${isAnual ? "text-white" : "text-foreground"}`}>
                  Plano Anual
                </h3>
                <span
                  className={`text-xs font-normal px-3 py-1 ${
                    isAnual
                      ? "bg-white/20 text-white"
                      : "bg-primary-50 text-primary-600"
                  }`}
                >
                  Economize 18%
                </span>
              </div>

              <p className={`text-sm font-sans mb-6 ${isAnual ? "text-white/80" : "text-foreground/70"}`}>
                Ideal para agências que buscam estabilidade, melhor valor por usuário e crescimento contínuo.
              </p>

              {/* Preço */}
              <div className="mb-6 flex items-baseline gap-1">
                <span className={`text-sm font-sans ${isAnual ? "text-white/80" : "text-foreground/60"}`}>R$</span>
                <span className={`text-5xl font-display font-semibold tracking-tight ${isAnual ? "text-white" : "text-foreground"}`}>57</span>
                <span className={`text-sm font-sans ${isAnual ? "text-white/80" : "text-foreground/70"}`}>/ usuário / mês*</span>
              </div>

              <div className={`space-y-3 mb-8 pt-4 font-sans text-sm ${isAnual ? "text-white/90" : "text-foreground/80"}`}>
                <div className="flex items-start gap-2.5">
                  <Check className={`size-5 shrink-0 mt-0.5 ${isAnual ? "text-white" : "text-primary-500"}`} weight="bold" />
                  <span>Acesso completo a todos os módulos de gestão</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className={`size-5 shrink-0 mt-0.5 ${isAnual ? "text-white" : "text-primary-500"}`} weight="bold" />
                  <span>Contratação a partir de <strong>1 usuário</strong></span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className={`size-5 shrink-0 mt-0.5 ${isAnual ? "text-white" : "text-primary-500"}`} weight="bold" />
                  <span>Opção de <strong>+ Implantação Orientada</strong></span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className={`size-5 shrink-0 mt-0.5 ${isAnual ? "text-white" : "text-primary-500"}`} weight="bold" />
                  <span>Faturamento anual facilitado</span>
                </div>
              </div>
            </div>

            <div>
              <Link
                href="/teste-gratis"
                className={`w-full btn btn-lg flex items-center justify-center gap-2 font-normal border-0 transition-colors duration-200 ${
                  isAnual
                    ? "bg-secondary-900 text-white hover:bg-secondary-800"
                    : "bg-white text-primary-500 hover:bg-primary-500 hover:text-white"
                }`}
              >
                <span>Assinar agora</span>
                <ArrowRight className="size-4" weight="bold" />
              </Link>
              <p className={`text-xs text-center mt-3 font-sans ${isAnual ? "text-white/70" : "text-foreground/50"}`}>
                *Valor cobrado anualmente por licença contratada
              </p>
            </div>
          </div>

          {/* Card Plano Mensal */}
          <div
            className={`relative flex flex-col justify-between p-8 transition-all duration-300 ${
              isMensal
                ? "bg-primary-500 text-white"
                : "bg-secondary-50 text-foreground"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mt-2 mb-4">
                <h3 className={`text-2xl font-display font-medium ${isMensal ? "text-white" : "text-foreground"}`}>
                  Plano Mensal
                </h3>
                <span
                  className={`text-xs font-normal px-3 py-1 ${
                    isMensal
                      ? "bg-white/20 text-white"
                      : "bg-secondary-100 text-secondary-700"
                  }`}
                >
                  Sem fidelidade
                </span>
              </div>

              <p className={`text-sm font-sans mb-6 ${isMensal ? "text-white/80" : "text-foreground/70"}`}>
                Perfeito para agências que preferem flexibilidade total no fluxo de caixa mês a mês.
              </p>

              {/* Preço */}
              <div className="mb-6 flex items-baseline gap-1">
                <span className={`text-sm font-sans ${isMensal ? "text-white/80" : "text-foreground/60"}`}>R$</span>
                <span className={`text-5xl font-display font-semibold tracking-tight ${isMensal ? "text-white" : "text-foreground"}`}>70</span>
                <span className={`text-sm font-sans ${isMensal ? "text-white/80" : "text-foreground/70"}`}>/ usuário / mês*</span>
              </div>

              <div className={`space-y-3 mb-8 pt-4 font-sans text-sm ${isMensal ? "text-white/90" : "text-foreground/80"}`}>
                <div className="flex items-start gap-2.5">
                  <Check className={`size-5 shrink-0 mt-0.5 ${isMensal ? "text-white" : "text-primary-500"}`} weight="bold" />
                  <span>Acesso completo a todos os módulos de gestão</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className={`size-5 shrink-0 mt-0.5 ${isMensal ? "text-white" : "text-primary-500"}`} weight="bold" />
                  <span>Contratação a partir de <strong>3 usuários</strong></span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className={`size-5 shrink-0 mt-0.5 ${isMensal ? "text-white" : "text-primary-500"}`} weight="bold" />
                  <span>Opção de <strong>+ Implantação Orientada</strong></span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className={`size-5 shrink-0 mt-0.5 ${isMensal ? "text-white" : "text-primary-500"}`} weight="bold" />
                  <span>Renovação mensal sem contrato de permanência</span>
                </div>
              </div>
            </div>

            <div>
              <Link
                href="/teste-gratis"
                className={`w-full btn btn-lg flex items-center justify-center gap-2 font-normal border-0 transition-colors duration-200 ${
                  isMensal
                    ? "bg-secondary-900 text-white hover:bg-secondary-800"
                    : "bg-white text-primary-500 hover:bg-primary-500 hover:text-white"
                }`}
              >
                <span>Assinar agora</span>
                <ArrowRight className="size-4" weight="bold" />
              </Link>
              <p className={`text-xs text-center mt-3 font-sans ${isMensal ? "text-white/70" : "text-foreground/50"}`}>
                *Valor cobrado mensalmente via cartão ou boleto
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
