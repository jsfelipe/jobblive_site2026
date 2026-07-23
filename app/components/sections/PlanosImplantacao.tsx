"use client";

import React from "react";
import Link from "next/link";
import { UserCheck, ChalkboardTeacher, Rocket, ArrowRight } from "@phosphor-icons/react";
import contactsData from "../../config/contacts.json";

export default function PlanosImplantacao() {
  const whatsappLink = contactsData.whatsappLink || "#";

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
        
        <div className="bg-secondary-900 p-8 md:p-12 lg:p-16 text-white relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Conteúdo Texto */}
          <div className="max-w-2xl space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary-500/20 text-primary-400 text-xs font-sans font-normal uppercase tracking-wider">
              Onboarding & Treinamento
            </span>

            <h2 className="text-3xl md:text-5xl font-display font-medium text-white text-pretty leading-tight tracking-tight">
              Implantação Orientada
            </h2>

            <p className="text-body-md text-white/80 font-sans text-pretty leading-relaxed">
              Nossa equipe de especialistas está pronta para ajudar sua agência a estruturar processos, migrar dados e tornar o uso do Jobb Live altamente estratégico, acelerando os resultados e a produtividade do seu time.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-sans text-sm text-white/90">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <UserCheck className="size-5 text-primary-500 shrink-0" weight="bold" />
                <span>Consultor dedicado</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <ChalkboardTeacher className="size-5 text-primary-500 shrink-0" weight="bold" />
                <span>Treinamento da equipe</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <Rocket className="size-5 text-primary-500 shrink-0" weight="bold" />
                <span>Setup acelerado</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg px-8 flex items-center justify-center gap-2 font-normal w-full sm:w-auto"
              >
                <span>Falar com um consultor</span>
                <ArrowRight className="size-4" weight="bold" />
              </a>
              
              <Link
                href="/teste-gratis"
                className="btn btn-dark btn-lg px-8 bg-white/10 text-white hover:bg-white/20 transition-colors duration-150 flex items-center justify-center font-normal w-full sm:w-auto"
              >
                Conhecer o sistema
              </Link>
            </div>
          </div>

          {/* Destaque Visual em Card de Estatísticas/Benefícios */}
          <div className="w-full lg:w-96 bg-white/5 p-6 space-y-5 text-white/90 font-sans">
            <h3 className="text-lg font-display font-medium text-white pb-3">
              Por que escolher a Implantação?
            </h3>
            
            <div className="space-y-4 text-sm">
              <div className="space-y-1">
                <p className="font-medium text-white">Mapeamento de Processos</p>
                <p className="text-xs text-white/60">Adequação dos fluxos operacionais e financeiros da sua agência.</p>
              </div>

              <div className="space-y-1">
                <p className="font-medium text-white">Migração & Configuração</p>
                <p className="text-xs text-white/60">Auxílio no cadastro de clientes, fornecedores e tabelas de horas.</p>
              </div>

              <div className="space-y-1">
                <p className="font-medium text-white">Engajamento do Time</p>
                <p className="text-xs text-white/60">Sessões práticas para garantir adesão total de todos os colaboradores.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
