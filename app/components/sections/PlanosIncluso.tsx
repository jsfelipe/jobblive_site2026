"use client";

import React from "react";
import {
  HardDrives,
  GraduationCap,
  Headphones,
  Database,
  Folders,
  ShieldCheck,
} from "@phosphor-icons/react";

interface BenefitItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

const benefits: BenefitItem[] = [
  {
    icon: HardDrives,
    title: "5GB de espaço para anexos",
    description:
      "A conta da sua agência terá 5GB de espaço compartilhado para anexar briefings, peças e documentos em tarefas e projetos, com opção de contratação de espaço extra a qualquer momento.",
  },
  {
    icon: GraduationCap,
    title: "Treinamentos online e webinars",
    description:
      "Acesse treinamentos práticos, tutoriais gravados e webinars para capacitar sua equipe e extrair o máximo potencial do sistema na rotina de trabalhos da agência.",
  },
  {
    icon: Headphones,
    title: "Melhorias contínuas e suporte",
    description:
      "O Jobb Live recebe atualizações frequentes sem custo adicional. Nossa equipe de suporte está pronta para atender você via chat, e-mail e canal de dúvidas.",
  },
  {
    icon: Database,
    title: "Backup diário seguro",
    description:
      "Backups automáticos realizados diariamente para garantir total proteção. Além disso, você pode baixar o backup navegável da sua conta quando desejar.",
  },
  {
    icon: Folders,
    title: "Projetos e jobs ilimitados",
    description:
      "Sem limite de criação de projetos, demandas ou jobs. Mantenha todo o histórico de entregas anteriores organizado e acessível sem restrições.",
  },
  {
    icon: ShieldCheck,
    title: "Infraestrutura Google Cloud & SSL",
    description:
      "Hospedagem de alta estabilidade e velocidade na nuvem do Google Cloud com certificação SSL de 256 bits, garantindo criptografia de ponta a ponta para seus dados.",
  },
];

export default function PlanosIncluso() {
  return (
    <section className="w-full bg-secondary-50 py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
        
        {/* Cabeçalho do Bloco */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-medium text-foreground text-pretty">
            Incluso em todos os planos
          </h2>
          <p className="mt-3 text-body-md text-foreground/70 font-sans text-pretty">
            Tudo o que sua agência precisa para escalar a gestão com total segurança, estabilidade e suporte especializado.
          </p>
        </div>

        {/* Grid 3x2 de Benefícios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 md:p-8 flex flex-col justify-start space-y-4"
              >
                <IconComponent className="size-8 text-primary-500 shrink-0" weight="regular" />

                <div className="space-y-2">
                  <h3 className="text-xl font-display font-medium text-foreground text-pretty">
                    {item.title}
                  </h3>
                  <p className="text-sm font-sans text-foreground/70 leading-relaxed text-pretty">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
