"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Sparkle, ArrowRight, UserCheck, ChalkboardTeacher, Rocket } from "@phosphor-icons/react";
import contactsData from "../../config/contacts.json";

export default function PlanosCards() {
  const [billingCycle, setBillingCycle] = useState<"anual" | "mensal">("anual");
  const isAnual = billingCycle === "anual";

  const whatsappLink = contactsData.whatsappLink || "#";

  return (
    <section className="w-full bg-white py-12 md:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">

        {/* Toggle de Ciclo de Cobrança (Anual x Mensal) */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center p-1.5 bg-secondary-50">
            <button
              type="button"
              onClick={() => setBillingCycle("anual")}
              className={`px-5 py-2 text-sm font-sans font-normal transition-all duration-200 cursor-pointer ${isAnual
                  ? "bg-primary-500 text-white"
                  : "text-foreground/70 hover:text-foreground"
                }`}
            >
              Plano Anual <span className="text-xs bg-white/20 text-white px-2 py-0.5 ml-1 font-normal">Economize 18%</span>
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("mensal")}
              className={`px-5 py-2 text-sm font-sans font-normal transition-all duration-200 cursor-pointer ${!isAnual
                  ? "bg-primary-500 text-white"
                  : "text-foreground/70 hover:text-foreground"
                }`}
            >
              Plano Mensal
            </button>
          </div>
        </div>

        {/* Grid de 3 Colunas: Plano Start, Plano Enterprise e Onboarding */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">

          {/* Coluna 1: Plano Start (Cor Clara) */}
          <div className="relative flex flex-col justify-between p-8 bg-secondary-50 text-foreground transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mt-2 mb-4">
                <div>
                  <h3 className="text-2xl font-display font-medium text-foreground">
                    Plano Start
                  </h3>
                  <span className="text-xs font-sans text-foreground/60 block mt-1">
                    {isAnual ? "Plano Anual" : "Plano Mensal"}
                  </span>
                </div>
              </div>

              <p className="text-sm font-sans mb-6 text-foreground/70 text-pretty">
                Ideal para agências que buscam organizar o financeiro, projetos e orçamentos em 1 unidade.
              </p>

              {/* Preço */}
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-sm font-sans text-foreground/60">R$</span>
                <span className="text-5xl font-display font-semibold tracking-tight text-foreground">
                  {isAnual ? "98" : "120"}
                </span>
                <span className="text-sm font-sans text-foreground/70">/ mês*</span>
              </div>

              <div className="space-y-3 mb-8 pt-4 font-sans text-sm text-foreground/80">
                <div className="flex items-start gap-2.5">
                  <Check className="size-5 shrink-0 mt-0.5 text-primary-500" weight="bold" />
                  <span><strong>2 usuários</strong> inclusos</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="size-5 shrink-0 mt-0.5 text-primary-500" weight="bold" />
                  <span><strong>1 Unidade</strong> (Gerenciar apenas 1 CNPJ)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="size-5 shrink-0 mt-0.5 text-primary-500" weight="bold" />
                  <span>Campanhas / projetos ilimitados</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="size-5 shrink-0 mt-0.5 text-primary-500" weight="bold" />
                  <span>Orçamentos ilimitados</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="size-5 shrink-0 mt-0.5 text-primary-500" weight="bold" />
                  <span>Financeiro completo</span>
                </div>
              </div>
            </div>

            <div>
              <Link
                href="/teste-gratis"
                className="w-full btn btn-lg btn-primary flex items-center justify-center gap-2 font-normal border-0 transition-colors duration-200"
              >
                <span>Assinar agora</span>
                <ArrowRight className="size-4" weight="bold" />
              </Link>
              <p className="text-xs text-center mt-3 font-sans text-foreground/50">
                {isAnual ? "*Valor faturado anualmente (R$ 1.176/ano)" : "*Valor cobrado mensalmente"}
              </p>
            </div>
          </div>

          {/* Coluna 2: Plano Enterprise (Cor Vermelha) */}
          <div className="relative flex flex-col justify-between p-8 bg-primary-500 text-white transition-all duration-300">
            {/* Badge Recomendado */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-normal px-4 py-1 uppercase tracking-wider flex items-center gap-1.5 bg-secondary-900 text-white">
              <Sparkle className="size-3.5" weight="fill" />
              Recomendado
            </div>

            <div>
              <div className="flex items-center justify-between mt-2 mb-4">
                <div>
                  <h3 className="text-2xl font-display font-medium text-white">
                    Plano Enterprise
                  </h3>
                  <span className="text-xs font-sans text-white/80 block mt-1">
                    {isAnual ? "Plano Anual" : "Plano Mensal"}
                  </span>
                </div>
              </div>

              <p className="text-sm font-sans mb-6 text-white/80 text-pretty">
                Solução completa para agências que precisam de gestão de tarefas avançada e unidades ilimitadas.
              </p>

              {/* Preço */}
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-sm font-sans text-white/80">R$</span>
                <span className="text-5xl font-display font-semibold tracking-tight text-white">
                  {isAnual ? "79,90" : "99,00"}
                </span>
                <span className="text-sm font-sans text-white/80">/ usuário / mês*</span>
              </div>

              <div className="space-y-3 mb-8 pt-4 font-sans text-sm text-white/90">
                <div className="flex items-start gap-2.5">
                  <Check className="size-5 shrink-0 mt-0.5 text-white" weight="bold" />
                  <span>A partir de <strong>3 usuários</strong></span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="size-5 shrink-0 mt-0.5 text-white" weight="bold" />
                  <span><strong>Unidades ilimitadas</strong> (Múltiplos CNPJs)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="size-5 shrink-0 mt-0.5 text-white" weight="bold" />
                  <span>Campanhas / projetos ilimitados</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="size-5 shrink-0 mt-0.5 text-white" weight="bold" />
                  <span>Orçamentos ilimitados</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="size-5 shrink-0 mt-0.5 text-white" weight="bold" />
                  <span>Financeiro completo</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="size-5 shrink-0 mt-0.5 text-white" weight="bold" />
                  <span>Módulo Gestão de Tarefas</span>
                </div>
              </div>
            </div>

            <div>
              <Link
                href="/teste-gratis"
                className="w-full btn btn-lg bg-secondary-900 text-white hover:bg-secondary-800 flex items-center justify-center gap-2 font-normal border-0 transition-colors duration-200"
              >
                <span>Assinar agora</span>
                <ArrowRight className="size-4" weight="bold" />
              </Link>
              <p className="text-xs text-center mt-3 font-sans text-white/70">
                {isAnual ? "*Valor cobrado anualmente por licença contratada" : "*Valor cobrado mensalmente por licença contratada"}
              </p>
            </div>
          </div>

          {/* Coluna 3: Onboarding & Treinamento (Cor Preta) */}
          <div className="relative flex flex-col justify-between p-8 bg-secondary-900 text-white transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mt-2 mb-4">
                <h3 className="text-2xl font-display font-medium text-white text-pretty">
                  Onboarding & Treinamento
                </h3>
              </div>

              <p className="text-sm font-sans mb-6 text-white/80 leading-relaxed text-pretty">
                Nossa equipe de especialistas está pronta para ajudar sua agência a estruturar processos, migrar dados e tornar o uso do Jobb Live altamente estratégico, acelerando os resultados e a produtividade do seu time.
              </p>

              <div className="space-y-3 mb-8 pt-2 font-sans text-sm text-white/90">
                <div className="flex items-center gap-2.5">
                  <UserCheck className="size-5 text-primary-500 shrink-0" weight="bold" />
                  <span>Consultor dedicado</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ChalkboardTeacher className="size-5 text-primary-500 shrink-0" weight="bold" />
                  <span>Treinamento da equipe</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Rocket className="size-5 text-primary-500 shrink-0" weight="bold" />
                  <span>Setup acelerado</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn btn-lg bg-primary-500 text-white hover:bg-primary-600 flex items-center justify-center gap-2 font-normal border-0 transition-colors duration-200"
              >
                <span>Falar com um consultor</span>
                <ArrowRight className="size-4" weight="bold" />
              </a>

              <Link
                href="/teste-gratis"
                className="w-full btn btn-lg bg-[#262626] hover:bg-[#333333] text-white flex items-center justify-center font-normal border-0 transition-colors duration-200"
              >
                Conhecer o sistema
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}


