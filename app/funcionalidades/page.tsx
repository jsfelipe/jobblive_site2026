"use client";

import React, { useState } from "react";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/layout/Footer";
import PageHeader from "../components/ui/PageHeader";
import Link from "next/link";
import contactsData from "../config/contacts.json";
import { funcionalidadesData } from "../config/funcionalidades";
import {
  FolderSimpleUser,
  Compass,
  Calculator,
  Handshake,
  Calendar,
  Target,
  Buildings,
  Users,
  ShieldCheck,
  Package,
  Receipt,
  FilePdf,
  ListChecks,
  Coins,
  Link as LinkIcon,
  TrendDown,
  Bank,
  TrendUp,
  FileText,
  ChartBar,
  Kanban,
  CalendarDots,
  ChartLineUp,
  Hourglass
} from "@phosphor-icons/react";

// Mapa de ícones estático para evitar importações dinâmicas que podem falhar em tempo de execução
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone" }>> = {
  FolderSimpleUser,
  Compass,
  Calculator,
  Handshake,
  Calendar,
  Target,
  Buildings,
  Users,
  ShieldCheck,
  Package,
  Receipt,
  FilePdf,
  ListChecks,
  Coins,
  Link: LinkIcon,
  TrendDown,
  Bank,
  TrendUp,
  FileText,
  ChartBar,
  Kanban,
  CalendarDots,
  ChartLineUp,
  Hourglass
};

export default function FuncionalidadesPage() {
  const [activeTab, setActiveTab] = useState("campanhas");

  const activeCategory = funcionalidadesData.find((cat) => cat.id === activeTab) || funcionalidadesData[0];

  return (
    <div className="flex flex-col min-h-screen bg-white text-foreground">
      <Navbar />

      <main className="flex-1 bg-white">
        {/* Cabeçalho da Página */}
        <PageHeader 
          overline="Recursos do Sistema"
          title="Funcionalidades do JobbLive"
          description="Tudo o que sua agência precisa para planejar, orçar, gerenciar tarefas, faturar e integrar o financeiro em um único ecossistema operacional de ponta a ponta."
        />

        <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 pt-8 md:pt-12">
          {/* Seletor de Abas Horizontal (Scrollável no Mobile) */}
          <div className="flex justify-start md:justify-center mb-16 border-b border-foreground/10 gap-6 md:gap-8 scrollbar-none overflow-x-auto overflow-y-hidden max-w-full py-0.5">
            {funcionalidadesData.map((cat) => {
              const active = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`shrink-0 whitespace-nowrap pb-4 px-2 text-sm md:text-base font-medium transition-all duration-200 cursor-pointer focus:outline-none border-b-2 -mb-px ${active
                    ? "border-primary-500 text-primary-500"
                    : "border-transparent text-secondary-400 hover:text-secondary-600"
                    }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Grid de Cards de Recursos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20 md:pb-28">
            {activeCategory.items.map((item, idx) => {
              const IconComponent = iconMap[item.iconName] || FolderSimpleUser;
              return (
                <div
                  key={idx}
                  className="flex flex-col bg-white p-8 rounded-none transition-all duration-300 hover:translate-y-[-2px] animate-fade-up"
                  style={{ animationDelay: `${(idx % 6) * 50}ms` }}
                >
                  <div className="text-primary-500 mb-6 shrink-0">
                    <IconComponent size={40} weight="light" />
                  </div>
                  <h3 className="text-xl font-display font-normal text-foreground mb-3 text-pretty leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-body-md text-foreground/70 text-pretty leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

        {/* Bloco de CTA de Contato Final (Estilo Home / Dúvidas) */}
        <section className="cta w-full bg-primary-500 py-16 md:py-24 overflow-hidden">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center gap-6 reveal-fade-up">

              {/* Título */}
              <h2 className="text-pretty leading-tight tracking-tightest text-white font-display max-w-3xl">
                Pronto para transformar a gestão da sua agência?
              </h2>

              {/* Subtítulo */}
              <p className="text-lg text-white/80 text-pretty">
                Comece seu teste grátis de 7 dias hoje mesmo ou agende uma demonstração ao vivo com nossos especialistas.
              </p>

              {/* Botões */}
              <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
                <Link
                  href="/teste-gratis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-dark btn-lg px-8 w-full sm:w-auto text-center flex items-center justify-center"
                >
                  Começar teste grátis
                </Link>
                <a
                  href={contactsData.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-lg px-8 bg-white/20 text-white hover:bg-white/30 transition-colors duration-150 w-full sm:w-auto text-center flex items-center justify-center"
                >
                  Agendar demonstração
                </a>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
