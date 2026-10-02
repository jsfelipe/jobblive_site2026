'use client';

import React from "react";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/layout/Footer";
import { IAHero } from "../components/ia/IAHero";
import { IAControleHumano } from "../components/ia/IAControleHumano";
import { IAStickyFeatures } from "../components/ia/IAStickyFeatures";
import { IAMCPIntegration } from "../components/ia/IAMCPIntegration";
import { IAAPIBanner } from "../components/ia/IAAPIBanner";

export default function IAPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-secondary-50 pt-24 md:pt-32 pb-16 md:pb-24 border-b border-foreground/10 overflow-hidden relative">
          <IAHero />
        </section>

        {/* Seção: Controle Humano em Cada Etapa */}
        <IAControleHumano />

        {/* Seção Stacking: Conciliação, Crie orçamentos, Importe orçamentos com IA */}
        <IAStickyFeatures />

        {/* Seção: Model Context Protocol (MCP) */}
        <IAMCPIntegration />

        {/* Última Seção: API JobbLive CTA Banner */}
        <IAAPIBanner />
      </main>

      <Footer />
    </div>
  );
}
